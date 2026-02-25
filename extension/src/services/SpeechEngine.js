/**
 * SpeechEngine.js
 * 
 * Handles text-to-speech with "Humanization" techniques:
 * - Chunking text by punctuation
 * - Varying pitch and rate per chunk
 * - Managing a playback queue
 */

import { VoiceSelector } from './VoiceSelector';

export const SpeechEngine = {
    queue: [],
    isPlaying: false,
    currentUtterance: null,
    monitorInterval: null,

    // Configuration for "human" simulation
    config: {
        basePitch: 1.0,
        baseRate: 1.05, // Slightly faster than default
        pitchVariance: 0.05, // +/- 5%
        rateVariance: 0.05,  // +/- 5%
    },

    /**
     * Splits text into semantic chunks for natural pausing.
     * @param {string} text 
     * @returns {string[]}
     */
    /**
     * Splits text into semantic chunks for natural pausing.
     * @param {string} text 
     * @returns {string[]}
     */
    chunkText(text) {
        // [FIX] Improved Chunking to prevent long-text timeouts
        // 1. Split by major punctuation (., ?, !, :, ;, newline)
        // 2. If chunk > 150 chars, split by comma
        // 3. If still > 150 chars, split by space

        const roughChunks = text.split(/([.?!:\n;])\s*/);
        const refinedChunks = [];

        for (let i = 0; i < roughChunks.length; i += 2) {
            const sentence = roughChunks[i];
            const punctuation = roughChunks[i + 1] || '';
            const fullSentence = (sentence + punctuation).trim();

            if (!fullSentence) continue;

            if (fullSentence.length < 200) {
                refinedChunks.push(fullSentence);
            } else {
                // Split long sentence by commas
                const commaSplits = fullSentence.split(/([,])\s*/);
                let buffer = "";
                for (let j = 0; j < commaSplits.length; j += 2) {
                    const part = commaSplits[j];
                    const punct = commaSplits[j + 1] || '';
                    const combined = (part + punct).trim();

                    if ((buffer + combined).length < 200) {
                        buffer += (buffer ? " " : "") + combined;
                    } else {
                        if (buffer) refinedChunks.push(buffer);
                        buffer = combined;
                    }
                }
                if (buffer) refinedChunks.push(buffer);
            }
        }
        return refinedChunks;
    },

    /**
     * Adds text to the speech queue.
     * @param {string} text 
     */
    async speak(text, lang = 'en-US') {
        if (!text) return;
        console.log(`[SpeechEngine] Queueing text (${lang}):`, text);

        // Cancel any pending timeout to avoid gaps
        if (this.queueTimeout) clearTimeout(this.queueTimeout);

        const chunks = this.chunkText(text);

        // Voice selection is now handled in processQueue for each chunk
        chunks.forEach(chunk => {
            if (chunk.trim()) this.queue.push({ text: chunk.trim(), lang: lang });
        });

        if (!this.isPlaying) {
            this.processQueue();
        }
    },

    /**
     * Processes the next item in the queue.
     */
    async processQueue() {
        if (this.queue.length === 0) {
            this.isPlaying = false;
            console.log("[SpeechEngine] Queue empty, playback finished.");
            return;
        }

        this.isPlaying = true;
        const item = this.queue.shift();
        console.log("[SpeechEngine] Processing queue, item:", item);

        const voice = await VoiceSelector.getBestVoice(item.lang || 'en-US'); // Use getBestVoice as it's async

        if (!voice) {
            console.warn("[SpeechEngine] No suitable voice found! Retrying...");
            setTimeout(() => this.processQueue(), 500); // Retry waiting for voices
            return;
        }

        // Randomize prosody
        const randomPitch = this.config.basePitch + (Math.random() * this.config.pitchVariance * 2 - this.config.pitchVariance);
        const randomRate = this.config.baseRate + (Math.random() * this.config.rateVariance * 2 - this.config.rateVariance);

        const utterance = new SpeechSynthesisUtterance(item.text);
        utterance.voice = voice;
        utterance.pitch = parseFloat(randomPitch.toFixed(2));
        utterance.rate = parseFloat(randomRate.toFixed(2));
        utterance.volume = 1.0;

        utterance.onend = () => {
            console.log("[SpeechEngine] Utterance ended.");
            this.currentUtterance = null;
            // Small pause between chunks
            this.queueTimeout = setTimeout(() => {
                this.processQueue();
            }, this.config.pauseBetweenChunks || 50); // Default 50ms pause
        };

        utterance.onerror = (e) => {
            if (e.error === 'interrupted' || e.error === 'canceled') {
                this.currentUtterance = null;
                return;
            }
            console.warn("[SpeechEngine] TTS Error:", e.error, e);
            this.currentUtterance = null;
            setTimeout(() => this.processQueue(), 50);
        };

        this.currentUtterance = utterance;

        try {
            // [FIX] Explicit resume before speaking to wake up engine
            if (window.speechSynthesis.paused) window.speechSynthesis.resume();
            window.speechSynthesis.speak(utterance);

            // [FIX] Infinite loop fix for Chrome: toggle pause/resume periodically for long chunks
            this.keepAlive();
        } catch (err) {
            console.error("[SpeechEngine] Failed to call speak:", err);
        }
    },

    keepAliveTimer: null,

    keepAlive() {
        if (this.keepAliveTimer) clearInterval(this.keepAliveTimer);
        this.keepAliveTimer = setInterval(() => {
            if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
                window.speechSynthesis.pause();
                window.speechSynthesis.resume();
            } else {
                clearInterval(this.keepAliveTimer);
            }
        }, 10000); // Toggle every 10s to reset browser timeout
    },

    /**
     * Stops all speech and clears the queue.
     */
    stop() {
        this.queue = [];
        this.isPlaying = false;
        if (this.keepAliveTimer) clearInterval(this.keepAliveTimer);
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        if (this.monitorInterval) {
            clearInterval(this.monitorInterval);
            this.monitorInterval = null;
        }
        this.currentUtterance = null;
    },

    /**
     * Watchdog to detect stuck synthesis
     */
    startMonitor() {
    }
};
