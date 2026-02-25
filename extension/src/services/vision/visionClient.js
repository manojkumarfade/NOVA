/**
 * @file visionClient.js
 * @description Logic for sending the base64 screenshot to the LLM (A4F/TypeGPT API).
 */

import { StorageService } from '../StorageService';

export const VisionClient = {
    // Simple in-memory cache for spam protection
    debounceCache: {
        lastAnalyzedUrl: null,
        lastVisionTimestamp: 0
    },

    /**
     * Captures the visible tab and compresses it.
     */
    async captureAndProcessScreenshot() {
        return new Promise((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (!tabs || tabs.length === 0) {
                    resolve(null);
                    return;
                }

                const activeTab = tabs[0];
                const tabUrl = activeTab.url;
                const now = Date.now();

                // 10-second debounce check
                if (this.debounceCache.lastAnalyzedUrl === tabUrl && (now - this.debounceCache.lastVisionTimestamp < 10000)) {
                    console.log("VisionClient: Debounce active, skipping capture.");
                    resolve(null);
                    return;
                }

                chrome.tabs.captureVisibleTab(activeTab.windowId, { format: 'jpeg', quality: 50 }, (dataUrl) => {
                    if (chrome.runtime.lastError || !dataUrl) {
                        console.error("VisionClient capture error:", chrome.runtime.lastError);
                        resolve(null);
                        return;
                    }

                    // Update cache
                    this.debounceCache.lastAnalyzedUrl = tabUrl;
                    this.debounceCache.lastVisionTimestamp = now;

                    // Compression via Offscreen Canvas (Max 1024px)
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const maxW = 1024;
                        const maxH = 1024;
                        let width = img.width;
                        let height = img.height;

                        if (width > height && width > maxW) {
                            height *= maxW / width;
                            width = maxW;
                        } else if (height > maxH) {
                            width *= maxH / height;
                            height = maxH;
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        resolve(canvas.toDataURL('image/jpeg', 0.8));
                    };
                    img.onerror = () => resolve(dataUrl); // fallback to raw string
                    img.src = dataUrl;
                });
            });
        });
    },

    /**
     * Calls the A4F compatible API with the vision prompt.
     * Target < 4 seconds with timeout.
     */
    async analyzeScreenshot(base64Image) {
        if (!base64Image) return null;

        const imageSettings = await StorageService.get('image_settings');
        const a4fConfig = imageSettings?.providers?.a4f;

        if (!a4fConfig || !a4fConfig.apiKey) {
            console.warn("VisionClient: A4F API key not found in image settings.");
            return null;
        }

        const apiKey = a4fConfig.apiKey;
        const url = "https://api.a4f.co/v1/chat/completions";

        const systemPrompt = `You are an expert image content extractor.
CRITICAL INSTRUCTION: You are looking at a screenshot of a webpage. Do NOT extract, read, or output any text from headers, sidebars, navigation menus, or body paragraphs on the page.
ONLY describe the content of the main IMAGE (or images) shown in the screenshot. If there is text mathematically rendered *inside* the photograph or artwork itself, extract that.
Return your description as a raw string prompt suitable for an image generation model. Do NOT use JSON formatting or arrays.`;

        const userPrompt = `Extract ONLY the image content from the screenshot below and describe it in high detail so it can be sent to an image generation model.
Ignore all the surrounding UI, text, and headers on the page.`;

        const primaryModel = 'provider-6/llama-4-scout-17b-16e-instruct';
        const fallbackModel = 'provider-6/llama-4-maverick-17b-128e-instruct';

        const tryFetch = async (modelName) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 sec timeout

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: modelName,
                        messages: [
                            { role: "system", content: systemPrompt },
                            {
                                role: "user",
                                content: [
                                    { type: "text", text: userPrompt },
                                    { type: "image_url", image_url: { url: base64Image } }
                                ]
                            }
                        ]
                    }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) return null;

                const data = await response.json();
                const content = data.choices[0]?.message?.content?.trim();
                return { isRawText: true, content: content }; // Change to return generic object to satisfy PromptComposer or modify PromptComposer
            } catch (err) {
                clearTimeout(timeoutId);
                return null; // Silent fail on timeout or error
            }
        };

        // Try primary
        let result = await tryFetch(primaryModel);

        // Try fallback
        if (!result) {
            console.log("VisionClient: Primary model failed or timed out. Falling back to maverick...");
            result = await tryFetch(fallbackModel);
        }

        return result; // May still be null, which tells the caller to use normal flow
    },

    /**
     * [NEW] High-End Feature: Reverse Engineer Reality
     * Analyzes an image and deduces the exact generative prompt recipe.
     */
    async reverseEngineerImage(base64Image) {
        if (!base64Image) return null;

        const imageSettings = await StorageService.get('image_settings');
        const a4fConfig = imageSettings?.providers?.a4f;

        if (!a4fConfig || !a4fConfig.apiKey) {
            console.warn("VisionClient: A4F API key not found in image settings for Reverse Engineering.");
            return null;
        }

        const apiKey = a4fConfig.apiKey;
        const url = "https://api.a4f.co/v1/chat/completions";

        const systemPrompt = `You are a world-class prompt engineer and professional photographer.
Your goal is to look at the main image within the user's screenshot and reverse-engineer it into the PERFECT highly-detailed text-to-image prompt.
Ignore all website navigation, text, or UI surrounding the image. Focus only on the photograph or artwork itself.

Return ONLY the raw prompt string. Do NOT format as JSON. Do NOT include introductory text like "Here is the prompt:".`;

        const userPrompt = `Deduce the EXACT "Prompt Recipe" required to generate the main image visible in this screenshot.
If it is a photograph, specify: Camera gear, lens (e.g., 35mm), aperture (e.g., f/1.8), lighting setup (e.g., volumetric, softbox), subject details, background, and mood.
If it is artwork/3D, specify: Art style, rendering engine (e.g., Octane, Unreal Engine 5), artist influences, mood, and visual details.

Example Output format:
"Product shot of [item], shot on [camera], [lens], [aperture], [lighting], [background style], [resolution], [vibe keywords]"`;

        const primaryModel = 'provider-6/llama-4-scout-17b-16e-instruct';
        const fallbackModel = 'provider-6/llama-4-maverick-17b-128e-instruct';

        const tryFetch = async (modelName) => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 sec timeout (might need more thought)

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: modelName,
                        messages: [
                            { role: "system", content: systemPrompt },
                            {
                                role: "user",
                                content: [
                                    { type: "text", text: userPrompt },
                                    { type: "image_url", image_url: { url: base64Image } }
                                ]
                            }
                        ]
                    }),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) return null;

                const data = await response.json();
                return data.choices[0]?.message?.content?.trim();
            } catch (err) {
                clearTimeout(timeoutId);
                return null;
            }
        };

        let result = await tryFetch(primaryModel);
        if (!result) result = await tryFetch(fallbackModel);

        return result;
    }
};
