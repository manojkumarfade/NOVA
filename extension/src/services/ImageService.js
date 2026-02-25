/**
 * @file ImageService.js
 * @description Core functionality for ImageService.
 * Handles the primary logic and responsibilities designated for this module.
 * 
 * @context Core Service (Background/Agent Logic provider)
 */


import { StorageService } from './StorageService';

export const ImageService = {
    async generate({ prompt, provider, model, size }) {
        const settings = await StorageService.get('image_settings');
        const config = settings?.providers?.[provider];

        if (!settings?.enabled) {
            // [FIX] Auto-enable fallback if key is present but switch is off
            if (config && config.apiKey) {
                console.log("ImageService: Auto-enabling image generation as valid key is present.");
            } else {
                throw new Error("Image generation is disabled in settings. Please enable it in Settings > Image Generation.");
            }
        }
        if (!config || !config.apiKey) {
            throw new Error(`Provider '${provider}' not configured or missing API key.`);
        }

        const { apiKey } = config;
        const activeModel = model || config.model;
        const activeSize = size || config.size;

        console.log(`ImageService: Generating with ${provider} (${activeModel})`);

        try {
            switch (provider) {
                case 'openai':
                    return await this.generateOpenAI(apiKey, prompt, activeModel, activeSize);
                case 'google':
                    return await this.generateGoogle(apiKey, prompt, activeModel, activeSize);
                case 'xai':
                    return await this.generateXAI(apiKey, prompt, activeModel, activeSize);
                case 'a4f':
                    return await this.generateA4F(apiKey, prompt, activeModel, activeSize);
                case 'infip':
                    return await this.generateInfip(apiKey, prompt, activeModel, activeSize);
                default:
                    throw new Error(`Unknown provider: ${provider}`);
            }
        } catch (error) {
            console.error("ImageService Error:", error);
            throw error;
        }
    },

    async generateOpenAI(apiKey, prompt, model, size) {
        // [NATIVE] OpenAI Image API
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model, // e.g. "dall-e-3" or "gpt-image-1.5"
                prompt: prompt,
                n: 1,
                size: size
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error?.message || `OpenAI Error: ${response.status}`);
        }

        const data = await response.json();
        return {
            url: data.data[0].url,
            provider: 'OpenAI',
            model: model,
            size: size
        };
    },

    async generateGoogle(apiKey, prompt, model, size) {
        // [NATIVE] Google Gemini/Imagen API
        // For vision/image generation, Google uses standard generateContent but with specific model headers or protocols
        // NOTE: As of now, Imagen 3 on API might require specific beta endpoints or Vertex AI wrappers.
        // User provided: https://generativelanguage.googleapis.com{model}:generateContent

        // This is tricky as "generateContent" usually returns text/multimodal response, not a direct image URL like DALL-E.
        // However, some versions return Base64 images in the parts.

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }], // Prompting for image
                // generationConfig might need specific fields for image output if supported by model
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error?.message || `Google Error: ${response.status}`);
        }

        const data = await response.json();
        // Assuming the model returns inline data for images or a link
        // Check for images in candidates
        const parts = data.candidates?.[0]?.content?.parts || [];
        const imagePart = parts.find(p => p.inline_data || p.file_data); // Looking for binary return

        if (imagePart && imagePart.inline_data) {
            const base64 = imagePart.inline_data.data;
            const mime = imagePart.inline_data.mime_type;
            return {
                url: `data:${mime};base64,${base64}`,
                provider: 'Google',
                model: model,
                size: size
            };
        }

        // Fallback: It might have returned text refusing or describing image
        const textParam = parts[0]?.text;
        if (textParam) throw new Error(`Google returned text instead of image: "${textParam.substring(0, 50)}..."`);

        throw new Error("No image data returned from Google API.");
    },

    async generateXAI(apiKey, prompt, model, size) {
        // [NATIVE] xAI (Grok) Image API
        // OpenAI Compatible endpoint
        const response = await fetch("https://api.x.ai/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                prompt: prompt,
                n: 1,
                size: size
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error?.message || `xAI Error: ${response.status}`);
        }

        const data = await response.json();
        return {
            url: data.data[0].url,
            provider: 'xAI',
            model: model,
            size: size
        };
    },

    async generateA4F(apiKey, prompt, model, size) {
        const response = await fetch("https://api.a4f.co/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                prompt: prompt,
                n: 1,
                size: size
            })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            if (response.status === 429) {
                throw new Error("A4F Rate Limit Exceeded. You have used your daily free tier requests for this model.");
            }
            throw new Error(err.error?.message || "A4F Generation Failed");
        }

        const data = await response.json();
        return {
            url: data.data[0].url,
            provider: 'A4F',
            model: model,
            size: size
        };
    },

    async generateInfip(apiKey, prompt, model, size) {
        const url = "https://api.infip.pro/v1/images/generations";
        console.log(`ImageService: Infip Request to ${url} with model ${model}`);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model, // e.g. "img4"
                prompt: prompt,
                n: 1,
                size: size
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Infip Failed: ${response.status} ${response.statusText} - ${errText}`);
        }

        let data = await response.json();

        // Handle async polling tasks
        if (data.status === "pending" || data.status === "processing" || data.task_id) {
            const pollUrl = data.poll_url || `https://api.infip.pro/v1/tasks/${data.task_id}`;
            let attempts = 0;
            const maxAttempts = 30; // up to 1m

            while (attempts < maxAttempts) {
                await new Promise(r => setTimeout(r, 2000));

                try {
                    console.log(`[ImageService] Polling Infip... attempt ${attempts + 1}/${maxAttempts}`);
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s fetch timeout

                    const pollRes = await fetch(pollUrl, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${apiKey}`
                        },
                        signal: controller.signal
                    });

                    clearTimeout(timeoutId);

                    if (!pollRes.ok) {
                        console.warn(`[ImageService] Polling failed HTTP ${pollRes.status}`);
                        attempts++;
                        continue;
                    }

                    const pollData = await pollRes.json();
                    const status = (pollData.status || "").toLowerCase();
                    console.log(`[ImageService] Polling status: ${status}`, pollData);

                    if (status === "completed" || status === "success" || status === "succeeded") {
                        data = pollData;
                        break;
                    } else if (status === "failed" || status === "error") {
                        throw new Error(`Infip Task Failed: ${pollData.error || JSON.stringify(pollData)}`);
                    }
                } catch (e) {
                    console.warn(`[ImageService] Polling iteration error:`, e.message);
                    if (e.message.includes("Infip Task Failed")) throw e;
                }
                attempts++;
            }

            if (attempts >= maxAttempts) throw new Error("Infip Image Generation timed out after 60 seconds of polling.");
        }

        let imageUrl = null;
        if (data.data && data.data.length > 0 && data.data[0].url) {
            imageUrl = data.data[0].url;
        } else if (data.data && data.data.url) {
            imageUrl = data.data.url;
        } else if (data.choices && data.choices.length > 0 && data.choices[0].message?.content) {
            // OpenAI chat compatibility fallback
            imageUrl = data.choices[0].message.content;
        } else if (data.url) {
            imageUrl = data.url;
        } else if (data.image_url) {
            imageUrl = data.image_url;
        } else if (data.images && data.images.length > 0) {
            imageUrl = data.images[0].url || data.images[0];
        }

        if (!imageUrl) {
            console.error("Infip Full Response:", JSON.stringify(data));
            throw new Error("Infip response missing image URL");
        }

        return {
            url: imageUrl,
            provider: 'Infip',
            model: model,
            size: size
        };
    }
};
