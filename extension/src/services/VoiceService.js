/**
 * VoiceService.js
 * 
 * Central controller for Voice Mode.
 * - Handles Microphone Input (STT) via WebSpeech API
 * - Handles Audio Output (TTS) via SpeechEngine
 * - Manages "Turn-taking" (Mic -> Processing -> Speaker -> Mic)
 */

import { SpeechEngine } from './SpeechEngine';

import AudioReactiveEngine from './AudioReactiveEngine';

let recognition = null;
let isListening = false;
let shouldKeepListening = false; // "Voice Mode" active state
let mediaStream = null; // [NEW] Keep track of stream

// Events
let onTranscriptCallback = null;
let onStateChangeCallback = null; // 'listening', 'processing', 'speaking', 'idle'

export const VoiceService = {
    currentLang: 'en-US', // Default language

    setLanguage(lang) {
        console.log(`[VoiceService] Setting language to: ${lang}`);
        this.currentLang = lang;
        // If we are currently listening, we might need to restart to apply language
        if (isListening) {
            this.stopListening();
            setTimeout(() => this.startListening(), 100);
        }
    },

    async init() {
        // Pre-load logic if needed
    },

    /**
     * Start Voice Mode
     * @param {Function} onTranscript - (text, isFinal) => void
     * @param {Function} onStateChange - (state) => void
     */
    async startVoiceMode(onTranscript, onStateChange) {
        onTranscriptCallback = onTranscript;
        onStateChangeCallback = onStateChange;
        shouldKeepListening = true;

        // [NEW] Get Stream for VAD & Visualization
        try {
            if (!mediaStream) {
                mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                await AudioReactiveEngine.init(mediaStream);

                // Configure VAD Callback
                AudioReactiveEngine.setOnSilence(() => {
                    console.log("[VoiceService] VAD Silence Detected -> Stopping Listening");
                    if (isListening && shouldKeepListening) {
                        // We detected silence while listening.
                        // Force a stop to process what we have.
                        this.stopListeningForProcessing();
                    }
                });
            }
        } catch (e) {
            console.error("[VoiceService] Failed to get Mic Stream:", e);
            // Fallback: We can still use STT without Viz if browser allows?
            // tailored for "Extension Only", assume we need permissions.
        }

        this.startListening();
    },

    stopVoiceMode() {
        shouldKeepListening = false;
        this.stopListening();
        SpeechEngine.stop();
        AudioReactiveEngine.stopSilenceDetection();
        AudioReactiveEngine.setMode('idle');
        if (onStateChangeCallback) onStateChangeCallback('idle');
    },

    /**
     * Temporarily pause listening (e.g., for Song Detection)
     * prevents auto-restart in onend
     */
    pause() {
        shouldKeepListening = false;
        this.stopListening();
    },

    /**
     * Resume listening after pause
     */
    resume() {
        shouldKeepListening = true;
        this.startListening();
    },

    getStream() {
        return mediaStream;
    },

    // ... (Lang and other methods) ...

    startListening() {
        if (!shouldKeepListening) return;
        if (isListening) return;

        if (!('webkitSpeechRecognition' in window)) {
            console.error("Browser does not support Speech Recognition");
            return;
        }

        if (onStateChangeCallback) onStateChangeCallback(SpeechEngine.isPlaying ? 'speaking' : 'listening');

        // [NEW] Visuals & VAD
        AudioReactiveEngine.setMode('listening');
        AudioReactiveEngine.startSilenceDetection();

        // Initialize Recognition
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = this.currentLang;

        recognition.onstart = () => {
            isListening = true;
            console.log("[VoiceService] Listening started...");
        };
        // ... (rest of onresult/onerror/onend) ...


        recognition.onresult = (event) => {
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    final += event.results[i][0].transcript;
                } else {
                    interim += event.results[i][0].transcript;
                }
            }

            const currentTranscript = (final + interim).toLowerCase();

            // [BARGE-IN LOGIC]
            // If AI is speaking, check if the user is saying something meaningful to interrupt
            if (SpeechEngine.isPlaying) {
                const interruptKeywords = ['stop', 'nova', 'hey nova', 'wait', 'quiet', 'stfu', 'shush'];
                const hasInterruptKeyword = interruptKeywords.some(kw => currentTranscript.includes(kw));

                // If they say a keyword or just say anything longer than ~5 chars (general barge-in)
                if (hasInterruptKeyword || currentTranscript.trim().length > 6) {
                    console.log("[VoiceService] Barge-In Detected! Interrupting speech.");
                    SpeechEngine.stop();
                    if (onStateChangeCallback) onStateChangeCallback('listening');

                    // Clear the transcript we just heard so it doesn't process the "Stop" as a command if possible
                    // However, we still want to broadcast it to the UI for feedback
                }
            }

            // Broadcast partials (for UI "Listening..." feedback)
            if (onTranscriptCallback) {
                onTranscriptCallback(final + interim, false);
            }

            // Handle Final
            if (final.trim()) {
                console.log("[VoiceService] Final Transcript:", final);
                if (onTranscriptCallback) {
                    onTranscriptCallback(final, true);
                }
            }
        };

        recognition.onerror = (event) => {
            if (event.error === 'no-speech') {
                console.debug("[VoiceService] No speech detected (retrying...)");
                return;
            }
            if (event.error === 'aborted') {
                console.debug("[VoiceService] Recognition aborted (benign)");
                return;
            }
            console.warn("[VoiceService] STT Error:", event.error);
        };

        recognition.onend = () => {
            isListening = false;
            console.log("[VoiceService] Recognition ended.");

            // Auto-restart if we are still in listening mode (and not speaking)
            // But NOT if we explicitly stopped it for processing
            if (shouldKeepListening && !SpeechEngine.isPlaying) {
                // Restart with slight delay
                setTimeout(() => {
                    if (shouldKeepListening && !isListening) {
                        this.startListening();
                    }
                }, 100);
            }
        };

        try {
            recognition.start();
        } catch (e) {
            console.error("Failed to start recognition:", e);
        }
    },

    stopListening() {
        // [NEW] Stop VAD
        AudioReactiveEngine.stopSilenceDetection();

        if (recognition) {
            recognition.stop();
            recognition = null;
        }
        isListening = false;
    },

    /**
     * Called when we have a full command and are waiting for Agent
     */
    stopListeningForProcessing() {
        this.stopListening();
        if (onStateChangeCallback) onStateChangeCallback('processing');
    },

    /**
     * Speak text using the Engine
     */
    speak(text) {
        if (!text) return;

        // [BARGE-IN ENABLED]
        // Do NOT stop listening. We want to hear interruptions.
        // this.stopListening(); 

        if (onStateChangeCallback) onStateChangeCallback('speaking');

        // [NEW] If we are NOT listening, start listening now 
        // (This covers cases where we stopped for processing but now need to listen for barge-in)
        if (!isListening && shouldKeepListening) {
            this.startListening();
        }

        // [IMPORTANT] Disable VAD during speech to prevent "Silence" triggers cutting us off
        // We rely on 'recognition.onresult' for Barge-in, not silence.
        AudioReactiveEngine.setMode('speaking');
        SpeechEngine.speak(text, this.currentLang);

        // Monitor for end of speech to switch state back to 'listening' (visual only)
        this.monitorSpeechEnd();
    },

    monitorSpeechEnd() {
        if (this.speechMonitor) clearInterval(this.speechMonitor);

        this.speechMonitor = setInterval(() => {
            if (!SpeechEngine.isPlaying) {
                clearInterval(this.speechMonitor);
                this.speechMonitor = null;

                // State revert
                if (shouldKeepListening && onStateChangeCallback) {
                    onStateChangeCallback('listening');
                    // [RESUME] VAD
                    AudioReactiveEngine.startSilenceDetection();
                    AudioReactiveEngine.setMode('listening');
                }
            }
        }, 100);
    },

    /**
     * Interrupt current speech
     */
    interrupt() {
        SpeechEngine.stop();
        if (shouldKeepListening) {
            this.startListening();
        }
    },

    // Alias for backward compatibility
    stop() {
        this.stopVoiceMode();
    }
};

