/**
 * VoiceSelector.js
 * 
 * enhanced voice selection logic to find the most "human-sounding" 
 * system voice available in the browser.
 */

export const VoiceSelector = {
    _cachedVoice: null,

    /**
     * Scores a voice based on quality keywords and locality.
     * @param {SpeechSynthesisVoice} voice 
     * @returns {number} Score (higher is better)
     */
    scoreVoice(voice) {
        let score = 0;

        // 1. Prefer Local Service (lower latency)
        if (voice.localService) score += 10;

        // 2. Keywords for Neural/High-Quality voices
        const name = voice.name.toLowerCase();

        if (name.includes('neural')) score += 50;
        if (name.includes('natural')) score += 40;
        if (name.includes('premium')) score += 30;
        if (name.includes('enhanced')) score += 20;
        if (name.includes('google')) score += 15; // Google voices are usually decent
        if (name.includes('samantha')) score += 25; // macOS premium default
        if (name.includes('ava')) score += 25; // macOS premium

        // 3. Penalize robotic/old voices
        if (name.includes('desktop')) score -= 10;
        if (name.includes('mobile')) score -= 5;

        return score;
    },

    /**
     * Gets the best available voice for the specified language.
     * @param {string} lang - ISO language code (default 'en-US')
     * @returns {Promise<SpeechSynthesisVoice>}
     */
    async getBestVoice(lang = 'en-US') {
        // Voices might not be loaded yet
        let voices = window.speechSynthesis.getVoices();
        if (voices.length === 0) {
            await new Promise(resolve => {
                const onVoicesChanged = () => {
                    voices = window.speechSynthesis.getVoices();
                    window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
                    resolve();
                };
                window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
                // Safety timeout
                setTimeout(resolve, 1000);
            });
            voices = window.speechSynthesis.getVoices();
        }

        const baseLang = lang.split('-')[0]; // 'en', 'hi', 'te'

        // Filter by language
        let candidates = voices.filter(v => v.lang.startsWith(baseLang));

        if (candidates.length === 0) {
            // Fallback to English if target not found (better than silence)
            console.warn(`[VoiceSelector] No voice found for ${lang}, falling back to English`);
            candidates = voices.filter(v => v.lang.startsWith('en'));
        }

        if (candidates.length === 0) return null;

        // Scoring Logic
        candidates.sort((a, b) => this.scoreVoice(b) - this.scoreVoice(a));

        const best = candidates[0];
        console.log(`[VoiceSelector] Selected for ${lang}: ${best.name} (Score: ${this.scoreVoice(best)})`);

        return best;
    }
};
