/**
 * @file promptComposer.js
 * @description Merges vision JSON output with the user's original image generation request.
 */

export const PromptComposer = {
    /**
     * Constructs the final prompt for the image generation model.
     * @param {Object} visionData JSON output extracted from the screenshot
     * @param {String} originalPrompt User's original prompt
     * @returns {String} Enriched prompt ready for the image model
     */
    composeFinalPrompt(visionData, originalPrompt) {
        if (!visionData) return originalPrompt;

        if (visionData.isRawText && visionData.content) {
            return `=== EXTRACTED VISUAL DETAILS ===\n${visionData.content}\n\n=== USER PROMPT ===\n${originalPrompt}`;
        }

        let composed = `=== EXTRACTED VISUAL DETAILS ===\n`;
        if (visionData.image_subject) composed += `- Subject: ${visionData.image_subject}\n`;
        if (visionData.text_inside_image) composed += `- Text to include: "${visionData.text_inside_image}"\n`;
        if (visionData.visual_mood) composed += `- Mood: ${visionData.visual_mood}\n`;
        if (visionData.lighting_style) composed += `- Lighting: ${visionData.lighting_style}\n`;

        composed += `\n=== USER PROMPT ===\n${originalPrompt}`;

        return composed;
    }
};
