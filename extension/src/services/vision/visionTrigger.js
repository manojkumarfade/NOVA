/**
 * @file visionTrigger.js
 * @description Logic to detect if a user's prompt triggers the vision feature.
 */

export const VisionTrigger = {
    // Keywords indicating visual context reference
    keywords: [
        "reference",
        "refer",
        "based on this",
        "use this image",
        "take this page image",
        "use this as inspiration",
        "from this page",
        "use this"
    ],

    /**
     * Evaluates whether the prompt demands Vision Reference Mode.
     * Only returns true if image mode is enabled and a keyword is found.
     */
    shouldTrigger(prompt, isImageMode) {
        if (!isImageMode) return false;

        const lowerPrompt = prompt.toLowerCase();
        return this.keywords.some(keyword => lowerPrompt.includes(keyword.toLowerCase()));
    }
};
