
import { StorageService } from './StorageService';

export const ImageService = {
    async generate({ prompt, provider, model, size }) {
        const settings = await StorageService.get('image_settings');
        const config = settings?.providers?.[provider];

        if (!settings?.enabled) {
            // [FIX] Auto-enable fallback if key is present but switch is off
            if (config && config.apiKey) {
                console.log("ImageService: Auto-enabling image generation as valid key is present.");
            } else if (provider === 'pico') {
                console.log("ImageService: Auto-enabling Pico (Free tier).");
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
                case 'a4f':
                    return await this.generateA4F(apiKey, prompt, activeModel, activeSize);
                case 'infip':
                    return await this.generateInfip(apiKey, prompt, activeModel, activeSize);
                case 'pico':
                    return await this.generatePico(apiKey, prompt, activeModel);
                default:
                    throw new Error(`Unknown provider: ${provider}`);
            }
        } catch (error) {
            console.error("ImageService Error:", error);
            throw error;
        }
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
        const response = await fetch("https://api.infip.pro/v1/images/generations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                prompt: prompt,
                n: 1,
                size: size,
                response_format: "url"
            })
        });

        if (!response.ok) {
            throw new Error(`Infip Failed: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return {
            url: data.data[0].url,
            provider: 'Infip',
            model: model,
            size: size
        };
    },

    async generatePico(apiKey, prompt, model) {
        // PicoApps Backend Proxy (No API Key Required for user)
        const apiUrl = "https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=v1-Z0FBQUFBQnBieTUwS0t3d19jLW9EY1Q4UDU2RXdpWFMtUzFWV2Y5WjRTenRhNUZHaWpVZWN6WVQxYV95ZUpyMjlYbFVzZHZwd0I1dGdVb1h2TExpOXV3d01RLTRMdXFnUWc9PQ==";

        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt
            })
        });

        if (!response.ok) {
            throw new Error("PicoApps Generation Failed");
        }

        const data = await response.json();

        if (data.status === 'success') {
            return {
                url: data.imageUrl,
                provider: 'PicoApps',
                model: 'Default',
                size: '1024x1024'
            };
        } else {
            throw new Error(data.error || "PicoApps returned error status");
        }
    }
};
