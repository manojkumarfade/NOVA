
import { LLMClient } from './LLMClient';

export const VisionService = {
    /**
     * Captures the visible area of the active tab.
     * @param {number} windowId - (Optional) Window ID
     * @returns {Promise<string>} Base64 Data URL of the screenshot (JPEG)
     */
    lastCaptureTime: 0,
    minCaptureInterval: 1000, // 1 second throttle to avoid MAX_CAPTURE quota

    async captureScreen(windowId) {
        console.log(`[VisionService] 📸 Capturing screen for Window: ${windowId || 'Current'}...`);
        const now = Date.now();
        if (now - this.lastCaptureTime < this.minCaptureInterval) {
            console.warn("[VisionService] ⏳ Throttled capture. Returning null.");
            return null; // Return null if too fast
        }

        try {
            // captureVisibleTab defaults to the current window if null
            const dataUrl = await chrome.tabs.captureVisibleTab(windowId, {
                format: 'jpeg',
                quality: 60
            });

            if (dataUrl) {
                console.log(`[VisionService] ✅ Capture Success! Size: ${dataUrl.length} chars.`);
                this.lastCaptureTime = Date.now();
                return dataUrl;
            } else {
                console.error("[VisionService] ❌ Capture returned undefined/null.");
                return null;
            }
        } catch (error) {
            // Handle common errors without crashing
            if (error.message.includes("MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND")) {
                console.warn("[VisionService] ⚠️ Quota exceeded, backing off.");
            } else if (error.message.includes("activeTab")) {
                console.warn("[VisionService] ⚠️ No activeTab permission. User must interact with page first.");
            } else {
                console.error("[VisionService] 💥 Screenshot failed:", error);
            }
            return null;
        }
    },

    /**
     * Prepares a Vision-Ready message for the LLM.
     * @param {string} textPrompt - The user's goal or system prompt
     * @param {string} base64Image - The screenshot
     * @returns {object} Message object formatted for OpenAI/Claude Vision
     */
    /**
     * Prepares a Vision-Ready message for the LLM.
     * @param {string} role - 'user' or 'system'
     * @param {string} textPrompt - The user's goal or system prompt
     * @param {string} base64Image - The screenshot
     * @returns {object} Message object formatted for OpenAI/Claude Vision
     */
    constructVisionMessage(role, textPrompt, base64Image) {
        if (!base64Image) {
            return { role, content: textPrompt };
        }

        return {
            role,
            content: [
                {
                    type: "text",
                    text: textPrompt
                },
                {
                    type: "image_url",
                    image_url: {
                        url: base64Image,
                        detail: "high"
                    }
                }
            ]
        };
    },

    /**
     * Asks the Vision Model to find the coordinates of a specific element.
     * @param {string} targetDescription - "The blue 'Sign Up' button"
     * @param {string} base64Image - The screenshot
     * @returns {Promise<{x: number, y: number} | null>} Coordinates or null
     */
    async getCoordinates(targetDescription, base64Image) {
        if (!base64Image) return null;

        const systemPrompt = `
        You are a Visual Coordinate Locator. 
        I will give you a screenshot and a description of a UI element.
        You must return the EXACT (x,y) coordinates of the CENTER of that element.
        
        The image usually represents the full viewport.
        
        Output JSON ONLY: { "x": 123, "y": 456 }
        If not found, return { "error": "not_found" }
        `;

        const userPrompt = `Find the center coordinates of: "${targetDescription}"`;

        try {
            const messages = [
                this.constructVisionMessage('system', systemPrompt, null), // System instruction (no image needed here technically, but some APIs prefer image in user msg)
                this.constructVisionMessage('user', userPrompt, base64Image)
            ];

            // We use a high-intelligence model for this (GPT-4o or equivalent)
            const response = await LLMClient.chatCompletion(messages, null, { temperature: 0 });

            // Parse JSON
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (!jsonMatch) return null;

            const result = JSON.parse(jsonMatch[0]);
            if (result.error) return null;
            if (typeof result.x === 'number' && typeof result.y === 'number') {
                return { x: result.x, y: result.y };
            }
            return null;

        } catch (e) {
            console.error("VisionService: getCoordinates failed", e);
            return null;
        }
    },

    /**
     * Extracts text from an image using Vision LLM.
     * @param {string} prompt - "What is the OTP code?" or "Read the error message"
     * @param {string} base64Image - The screenshot
     * @param {RegExp} [regex] - Optional regex to validate output
     * @returns {Promise<string>} Extracted text
     */
    async extractText(prompt, base64Image, regex = null) {
        if (!base64Image) return null;

        const systemPrompt = `
        You are a Visual Text Extractor.
        I will provide a screenshot and a question about text on the screen.
        You must EXTRACT the text exactly as it appears.
        Do not add commentary. Just return the text.
        If the text is not found, return "NOT_FOUND".
        `;

        try {
            const messages = [
                this.constructVisionMessage('system', systemPrompt, null),
                this.constructVisionMessage('user', prompt, base64Image)
            ];

            const response = await LLMClient.chatCompletion(messages, null, { temperature: 0 });
            const text = response.trim();

            if (text.includes("NOT_FOUND")) return null;

            if (regex) {
                // If regex is provided, try to find it in the response
                const match = text.match(regex);
                return match ? match[0] : null;
            }

            return text;

        } catch (e) {
            console.error("VisionService: extractText failed", e);
            return null;
        }
    },

    /**
     * Compares two screenshots to detect meaningful visual changes.
     * @param {string} img1 - Base64 first image
     * @param {string} img2 - Base64 second image
     * @returns {Promise<boolean>} True if changed physically
     */
    async detectChange(img1, img2) {
        if (!img1 || !img2) return false;
        if (img1 === img2) return false; // Byte exact match

        // Simple length check is often enough for "did something happen?"
        // A more robust check could use a pixel diff library if added later.
        return Math.abs(img1.length - img2.length) > 100;
    }
};
