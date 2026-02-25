/**
 * SongService.js
 * 
 * Handles audio capture and song identification.
 * Uses a combination of audio fingerprinting (stub) and lyric-based detection.
 */

import { LLMClient } from './LLMClient';
import { SearchService } from './SearchService';

export const SongService = {
    isDetecting: false,
    shouldStop: false, // Added for continuous detection

    /**
     * Start continuous song detection
     * @param {string} lang - Language code
     * @param {function} onResult - Callback when song is found
     * @param {function} onError - Callback for errors
     * @param {function} onInterimResult - Callback for live lyrics
     */
    startContinuousDetection(lang = 'en-US', onResult, onError, onInterimResult) {
        if (this.isDetecting) return;
        this.isDetecting = true;
        this.shouldStop = false;
        console.log(`[SongService] Starting CONTINUOUS song detection (${lang})...`);

        const runDetection = () => {
            if (this.shouldStop) {
                this.isDetecting = false;
                return;
            }

            // 1. Listen for lyrics
            const recognition = new webkitSpeechRecognition();
            recognition.lang = lang;
            recognition.continuous = false;
            recognition.interimResults = true;

            let capturedText = "";
            let silenceTimer = null;

            recognition.onresult = (event) => {
                let interim = "";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        capturedText += event.results[i][0].transcript + " ";
                    } else {
                        interim += event.results[i][0].transcript;
                    }
                }

                // [NEW] Send interim results to UI
                if (onInterimResult) onInterimResult(capturedText + interim);

                // Reset silence timer
                if (silenceTimer) clearTimeout(silenceTimer);
                silenceTimer = setTimeout(() => recognition.stop(), 3000); // Shorter timeout for faster loops
            };

            recognition.onerror = (e) => {
                if (e.error === 'no-speech' || e.error === 'aborted' || e.error === 'network') {
                    // Benign errors in continuous mode - just retry
                    return;
                }
                console.warn("[SongService] Speech Error:", e.error);
                // For other errors, we might want to wait a bit before retrying
            };

            recognition.onend = async () => {
                const lyrics = capturedText.trim();

                if (lyrics.length > 8) { // Minimum length to be useful
                    console.log("[SongService] Captured potential lyrics:", lyrics);
                    try {
                        // Attempt 1: Zero-shot Identification
                        let response = await LLMClient.chatCompletion([
                            { role: "system", content: "Identify the song from lyrics. Return JSON: {\"title\": \"Title\", \"artist\": \"Artist\"}. If unsure, return null." },
                            { role: "user", content: `Lyrics: "${lyrics}"` }
                        ], null, { temperature: 0 });

                        let jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
                        let result = JSON.parse(jsonStr);

                        // Attempt 2: Web Search Fallback (for latest songs)
                        if (!result || !result.title) {
                            console.log("[SongService] LLM uncertain. Searching DuckDuckGo...");

                            // [NEW] Notify UI that we are searching the web
                            if (onInterimResult) onInterimResult("🔎 Searching web for lyrics...");

                            const query = `song lyrics "${lyrics}"`;
                            const searchResults = await SearchService.search(query);

                            if (searchResults && searchResults.length > 0) {
                                const snippets = searchResults.map(r => r.title + ": " + r.snippet).join("\n");
                                console.log("[SongService] Search Context:", snippets);

                                response = await LLMClient.chatCompletion([
                                    { role: "system", content: "Identify the song from these search results. Return JSON: {\"title\": \"Title\", \"artist\": \"Artist\"}. If still unknown, return null." },
                                    { role: "user", content: `Search Results for lyrics "${lyrics}":\n${snippets}` }
                                ], null, { temperature: 0 });

                                jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
                                result = JSON.parse(jsonStr);
                            }
                        }

                        if (result && result.title) {
                            onResult(result);
                            // Stop?
                        }
                    } catch (e) {
                        console.error("[SongService] Identification error:", e);
                        if (onError) onError(e);
                    }
                }

                // Loop if not stopped
                if (!this.shouldStop) {
                    setTimeout(runDetection, 500); // Brief pause before restarting
                } else {
                    this.isDetecting = false;
                }
            };

            try {
                recognition.start();
                // Safety timeout
                setTimeout(() => {
                    if (this.isDetecting && !this.shouldStop) recognition.stop();
                }, 8000);
            } catch (e) {
                console.error("Start error:", e);
                if (!this.shouldStop) setTimeout(runDetection, 1000);
            }
        };

        runDetection();
    },

    stopDetection() {
        this.shouldStop = true;
        this.isDetecting = false;
        console.log("[SongService] Stopping detection loop.");
    },

    /* Legacy single-shot (kept for reference if needed, but unused) */
    /**
     * Start song detection
     * @param {string} lang - Language code for lyric recognition (default: 'en-US')
     * @returns {Promise<{title: string, artist: string} | null>}
     */
    async identifySong(lang = 'en-US') {
        if (this.isDetecting) return null;
        this.isDetecting = true;
        console.log(`[SongService] Starting lyric-based song identification (${lang})...`);

        return new Promise((resolve) => {
            // 1. Listen for lyrics using Web Speech API
            const recognition = new webkitSpeechRecognition();
            recognition.lang = lang; // Use selected language
            recognition.continuous = false;
            recognition.interimResults = true;

            let capturedText = "";
            let silenceTimer = null;

            recognition.onresult = (event) => {
                let interim = "";
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        capturedText += event.results[i][0].transcript + " ";
                    } else {
                        interim += event.results[i][0].transcript;
                    }
                }
                console.log("[SongService] Hearing:", capturedText + interim);

                // Reset silence timer on new input
                if (silenceTimer) clearTimeout(silenceTimer);
                silenceTimer = setTimeout(() => recognition.stop(), 4000); // Stop after 4s silence
            };

            recognition.onend = async () => {
                this.isDetecting = false;
                const lyrics = capturedText.trim();
                console.log("[SongService] Captured Lyrics:", lyrics);

                if (lyrics.length < 5) {
                    resolve(null); // Not enough text
                    return;
                }

                // 2. Ask LLM to identify
                try {
                    const response = await LLMClient.chatCompletion([
                        { role: "system", content: "You are a music expert. Identify the song from the provided lyrics. Return ONLY a JSON object: {\"title\": \"Song Name\", \"artist\": \"Artist Name\"}. If unknown, return null." },
                        { role: "user", content: `Identify this song from these lyrics: "${lyrics}"` }
                    ], null, { temperature: 0 });

                    // Clean JSON
                    const jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
                    const result = JSON.parse(jsonStr);
                    resolve(result);
                } catch (e) {
                    console.error("[SongService] Identification failed:", e);
                    resolve(null);
                }
            };

            recognition.onerror = (e) => {
                if (e.error === 'aborted') {
                    console.log("[SongService] Recognition aborted (benign).");
                    return; // Ignore
                }
                console.error("[SongService] Speech Error:", e.error);

                if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
                    resolve(null);
                }

                if (e.error !== 'no-speech') {
                    recognition.stop();
                }
            };

            recognition.start();

            // Hard stop after 10 seconds if no silence detected
            setTimeout(() => {
                if (this.isDetecting) recognition.stop();
            }, 10000);
        });
    }
};
