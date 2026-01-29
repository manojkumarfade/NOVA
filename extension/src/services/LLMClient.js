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

        if (provider.id === 'typegpt' || provider.id === 'openai' || true) { // Treat ALL as OpenAI Compatible (Universal)
            return this.callOpenAICompatible(provider.apiKey, selectedModel, messages, { ...options, endpoint });
        }

        throw new Error(`Provider ${provider.name} not yet supported.`);
    }

    static async callOpenAICompatible(apiKey, model, messages, options = {}) {
        // [UPDATED] Use provided endpoint or fallback to TypeGPT default
        const url = options.endpoint || "https://api.typegpt.net/v1/chat/completions";

        const maxRetries = 3;
        let attempt = 0;

        while (attempt < maxRetries) {
            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`
                    },
                    signal: options.signal, // [NEW] Link AbortSignal to fetch
                    body: JSON.stringify({
                        model: model,
                        messages: messages,
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
                    } else if (response.status === 401) {
                        errorMessage = "Invalid API Key. Please check your Settings.";
                        isRetryable = false;
                    }

                    if (isRetryable && attempt < maxRetries - 1) {
                        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
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
                if (error.name === 'AbortError') throw error; // Don't retry user cancellation

                if (attempt < maxRetries - 1) {
                    const delay = Math.pow(2, attempt) * 1000;
                    console.warn(`[LLMClient] Network Error: ${error.message}. Retrying...`);
                    await new Promise(r => setTimeout(r, delay));
                    attempt++;
                } else {
                    console.error("LLM Call Failed after retries:", error);
                    throw error;
                }
            }
        }
    }
}
