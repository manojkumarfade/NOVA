/**
 * @file LLMClient.js
 * @description Core functionality for LLMClient.
 * Handles the primary logic and responsibilities designated for this module.
 * 
 * @context Core Service (Background/Agent Logic provider)
 */

import { StorageService } from './StorageService';

export class LLMClient {
    static async chatCompletion(messages, model = null, options = {}) {
        const providers = await StorageService.get('llm_providers') || [];
        const settings = await StorageService.get('model_settings');
        let enabledProviders = providers.filter(p => p.isEnabled);

        // [FIX] Fallback: If no providers are explicitly "enabled" via UI toggle, 
        // but we have providers with API keys, use them. 
        // This prevents the "No enabled providers" error when users forget to toggle the switch.
        if (enabledProviders.length === 0) {
            console.warn("LLMClient: No enabled providers found. checking for any providers with keys...");
            const validProviders = providers.filter(p => p.apiKey && p.apiKey.length > 0);
            if (validProviders.length > 0) {
                console.log("LLMClient: Found valid providers. Auto-enabling for this session.");
                enabledProviders = validProviders;
            } else {
                throw new Error("No LLM providers configured. Please go to Settings > LLM Providers and add an API Key.");
            }
        }

        // Default to first enabled if no model specified or model not found
        let provider = enabledProviders[0];
        let selectedModel = model || provider.models[0];

        // Try to find the specific provider for the requested model
        const specificProvider = enabledProviders.find(p => p.models.includes(model));
        if (specificProvider) {
            provider = specificProvider;
            selectedModel = model;
        } else {
            // Fallback: Use planner model from settings if available and valid, otherwise first available
            const defaultModel = settings?.plannerModel;
            const defaultProvider = enabledProviders.find(p => p.models.includes(defaultModel));
            if (defaultProvider) {
                provider = defaultProvider;
                selectedModel = defaultModel;
            }
        }

        if (!provider.apiKey) {
            throw new Error(`API Key missing for provider: ${provider.name}`);
        }

        // [UPDATED] Dynamic Endpoint Logic
        const defaultEndpoint = "https://api.typegpt.net/v1/chat/completions";
        const endpoint = provider.endpoint || defaultEndpoint;

        console.log(`[LLMClient] Using ${provider.name} with model ${selectedModel} at ${endpoint}`);

        if (provider.id === 'google') {
            return this.callGoogle(provider.apiKey, selectedModel, messages, options);
        }

        if (provider.id === 'anthropic') {
            return this.callAnthropic(provider.apiKey, selectedModel, messages, options);
        }

        // OpenAI, xAI, TypeGPT, DeepSeek share the OpenAI-Compatible Schema
        return this.callOpenAICompatible(provider.apiKey, selectedModel, messages, { ...options, endpoint });
    }

    static async callGoogle(apiKey, model, messages, options = {}) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        // Convert messages to Gemini format (contents: [{role, parts: [{text}]}])
        // Handle multi-part content (vision)
        const contents = messages.map(m => {
            const role = m.role === 'assistant' ? 'model' : 'user';

            // Handle multi-part content (vision messages)
            if (Array.isArray(m.content)) {
                const parts = m.content.map(part => {
                    if (part.type === 'image_url') {
                        // Convert base64 data URL to Gemini inline data format
                        const imageUrl = part.image_url?.url || part.image_url;
                        if (imageUrl && imageUrl.startsWith('data:')) {
                            const match = imageUrl.match(/^data:([^;]+);base64,(.+)$/);
                            if (match) {
                                return {
                                    inlineData: {
                                        mimeType: match[1],
                                        data: match[2]
                                    }
                                };
                            }
                        }
                        // Fallback: if it's a URL, we can't use it directly in Gemini inlineData
                        return { text: `[Image: ${imageUrl}]` };
                    }
                    return { text: part.text || '' };
                });
                return { role, parts };
            }

            // Standard text-only message
            return {
                role: role,
                parts: [{ text: m.content }]
            };
        });

        // Handle System Prompt if present (Gemini 1.5 supports system_instruction)
        let systemInstruction = undefined;
        if (contents.length > 0 && contents[0].role === 'system') {
            const sysMsg = contents.shift(); // Remove from contents
            systemInstruction = { parts: [{ text: sysMsg.parts[0].text }] };
        } else if (messages.length > 0 && messages[0].role === 'system') {
            // Fallback if mapping logic missed it
            const sysText = messages[0].content;
            systemInstruction = { parts: [{ text: sysText }] };
            // Filter out system from contents if it was mapped to 'user' incorrectly above
            if (contents[0].parts[0].text === sysText) contents.shift();
        }

        const body = {
            contents,
            generationConfig: {
                temperature: options.temperature || 0.7,
                maxOutputTokens: options.max_tokens || 8192
            }
        };

        if (systemInstruction) {
            body.systemInstruction = systemInstruction;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Google API Error ${response.status}: ${err}`);
        }

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    }

    static async callAnthropic(apiKey, model, messages, options = {}) {
        const url = 'https://api.anthropic.com/v1/messages';

        // Extract System Prompt
        let system = "";
        const anthropicMessages = messages.filter(m => {
            if (m.role === 'system') {
                system += m.content + "\n";
                return false;
            }
            return true;
        }).map(m => {
            // Handle multi-part content (vision) for Anthropic
            if (Array.isArray(m.content)) {
                return {
                    role: m.role,
                    content: m.content.map(part => {
                        if (part.type === 'image_url') {
                            const imageUrl = part.image_url?.url || part.image_url;
                            if (imageUrl && imageUrl.startsWith('data:')) {
                                const match = imageUrl.match(/^data:([^;]+);base64,(.+)$/);
                                if (match) {
                                    return {
                                        type: 'image',
                                        source: {
                                            type: 'base64',
                                            media_type: match[1],
                                            data: match[2]
                                        }
                                    };
                                }
                            }
                            // Fallback for non-base64 URLs
                            return {
                                type: 'text',
                                text: `[Image: ${imageUrl}]`
                            };
                        }
                        return {
                            type: 'text',
                            text: part.text || ''
                        };
                    })
                };
            }
            // Standard text-only message
            return m;
        });

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json',
                'dangerously-allow-browser': 'true' // Needed for extension context sometimes
            },
            body: JSON.stringify({
                model,
                max_tokens: options.max_tokens || 4096,
                temperature: options.temperature || 0.7,
                system: system.trim(),
                messages: anthropicMessages
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(`Anthropic API Error ${response.status}: ${err}`);
        }

        const data = await response.json();
        return data.content?.[0]?.text || "";
    }

    static async callOpenAICompatible(apiKey, model, messages, options = {}) {
        // [UPDATED] Use provided endpoint or fallback to TypeGPT default
        const url = options.endpoint || "https://api.typegpt.net/v1/chat/completions";

        const maxRetries = 3;
        let attempt = 0;

        // Normalize messages for OpenAI-compatible API
        // Multi-part content (vision) is already in the correct format for OpenAI
        const normalizedMessages = messages.map(m => {
            if (Array.isArray(m.content)) {
                // Multi-part content (vision) - pass through as-is
                return m;
            }
            // Standard text-only message
            return m;
        });

        while (attempt < maxRetries) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey.replace(/^Bearer\s+/i, '').trim()}`
                    },
                    signal: options.signal, // [NEW] Link AbortSignal to fetch
                    body: JSON.stringify({
                        model: model,
                        messages: normalizedMessages,
                        temperature: options.temperature !== undefined ? options.temperature : 0.7
                    })
                });

                if (!response.ok) {
                    const errText = await response.text();
                    let errorMessage = `API Request Failed: ${response.status}`;
                    let isRetryable = response.status >= 500 || response.status === 429;

                    try {
                        // Try to parse nested error object
                        const jsonErr = JSON.parse(errText);
                        if (jsonErr.error && jsonErr.error.message) {
                            errorMessage += ` - ${jsonErr.error.message}`;
                            if (jsonErr.error.message.includes("422")) {
                                errorMessage = "Model Context Limit Exceeded. The conversation is too long. Please clear history or try a simpler task.";
                                isRetryable = false; // 422 is never retryable
                            }
                        } else {
                            errorMessage += ` - ${errText.substring(0, 200)}`;
                        }
                    } catch (e) {
                        errorMessage += ` - ${errText.substring(0, 200)}`;
                    }

                    if (response.status === 422) {
                        errorMessage = "Model Context Limit Exceeded OR Invalid Request. Please try a shorter prompt or simpler task.";
                        isRetryable = false;
                    } else if (response.status === 401 || response.status === 403) {
                        errorMessage = "Invalid API Key or Not Authorized. Please check your Settings.";
                        isRetryable = false;
                    }

                    if (isRetryable && attempt < maxRetries - 1) {
                        const delay = 500 * (attempt + 1); // Reduced: 500ms, 1000ms
                        console.warn(`[LLMClient] Error ${response.status}. Retrying in ${delay}ms...`);
                        await new Promise(r => setTimeout(r, delay));
                        attempt++;
                        continue; // Retry loop
                    }

                    // Final Failure
                    throw new Error(errorMessage);
                }

                const data = await response.json();
                return data.choices[0].message.content;

            } catch (error) {
                // Network errors (fetch failed) are retryable unless it's AbortError
                if (error.name === 'AbortError') {
                    console.log('[LLMClient] Request aborted by user');
                    throw new Error('Request cancelled');
                }

                if (attempt < maxRetries - 1) {
                    const delay = 500 * (attempt + 1); // Reduced: 500ms, 1000ms, 1500ms
                    console.warn(`[LLMClient] Network Error: ${error.message}. Retrying in ${delay}ms...`);
                    await new Promise(r => setTimeout(r, delay));
                    attempt++;
                } else {
                    console.error("LLM Call Failed after retries:", error);
                    throw new Error(`LLM request failed: ${error.message || 'Network error'}`);
                }
            }
        }
    }
}
