/**
 * @file ImageAgent.js
 * @description Core functionality for ImageAgent.
 * Handles the primary logic and responsibilities designated for this module.
 * 
 * @context Autonomous Agent Logic (LLM execution boundary)
 */



import { ImageService } from '../services/ImageService';
import { LLMClient } from '../services/LLMClient'; // Assuming we can use this
import { ContentReader } from '../services/ContentReader';
import { StorageService } from '../services/StorageService';

export const ImageAgent = {
    async execute(plan, onProgress) {
        console.log("ImageAgent: Executing Plan", plan);

        // 1. Get Settings & Provider
        const settings = await StorageService.get('image_settings');
        const provider = settings?.activeProvider || 'a4f';

        // 2. Resolve Prompt
        let finalPrompt = plan.goal || "";

        // Check if the prompt has pre-extracted vision details (from ChatPage -> visionClient)
        if (finalPrompt.includes("=== EXTRACTED VISUAL DETAILS ===")) {
            console.log("[ImageAgent] Detected Vision Context from Client. Fusing via LLM...");
            if (onProgress) onProgress({ status: 'generating_image', message: 'Fusing visual details with your prompt...' });

            try {
                const llmResponse = await LLMClient.chatCompletion([
                    {
                        role: 'system',
                        content: `You are an expert Visual Prompt Engineer for Generative AI.
The user has provided extracted visual details from an image AND their own specific instructions.
Your task is to merge them into ONE cohesive, detailed, and highly descriptive prompt for an image generation model.

CRITICAL RULES:
1. If the extracted details contain "Text to include:", you MUST ensure that text is explicitly written in quotes in your final prompt.
2. Ensure the overall subject and mood align perfectly with the user's instructions.
3. Output ONLY the final prompt text. Do not include introductory phrases.`
                    }, {
                        role: 'user',
                        content: finalPrompt
                    }
                ]);

                // LLMClient returns a string directly
                if (typeof llmResponse === 'string' && llmResponse.length > 0) {
                    finalPrompt = llmResponse;
                } else if (llmResponse && llmResponse.content) {
                    finalPrompt = llmResponse.content;
                }
                console.log("[ImageAgent] LLM Fused Prompt:", finalPrompt);
            } catch (e) {
                console.warn("[ImageAgent] Failed to fuse prompt via LLM, falling back to raw.", e);
            }
        }

        // TEXT_TO_IMAGE constraints append
        if (plan.image_constraints?.style) {
            finalPrompt += `. ${plan.image_constraints.style} style.`;
        }
        if (plan.image_constraints?.intended_use) {
            finalPrompt += ` ${plan.image_constraints.intended_use}`;
        }

        console.log("ImageAgent: Final Prompt", finalPrompt);

        // 3. Call Service
        try {
            const result = await ImageService.generate({
                prompt: finalPrompt,
                provider: provider,
            });

            return {
                status: 'SUCCESS',
                result: {
                    message: `Generated image: ${finalPrompt}`,
                    images: [result],
                    summary: `Created image with ${result.provider}`
                }
            };
        } catch (e) {
            return {
                status: 'FAILED',
                result: {
                    message: `Image Generation Failed: ${e.message}`,
                    error: e.message
                }
            };
        }
    },

    async generateImage(prompt, onProgress) {
        const needsContext = /(this|page|here|reference|context|screen|site|scan|analyze|read)/i.test(prompt);

        console.log(`[ImageAgent] Smart Mode: ${needsContext ? 'PAGE_AWARE_IMAGE' : 'TEXT_TO_IMAGE'} (Prompt: "${prompt.slice(0, 60)}...")`);

        if (needsContext && onProgress) {
            onProgress({ status: 'generating_image', message: 'Processing image context...' });
        }

        const response = await this.execute({
            goal: prompt,
            mode: 'TEXT_TO_IMAGE',
            image_constraints: { style: 'vibrant', intended_use: 'chat' }
        }, onProgress);

        if (response.status === 'SUCCESS') {
            const imgUrl = response.result.images[0];
            return {
                imageUrl: imgUrl,
                revisedPrompt: response.result.message
            };
        } else {
            throw new Error(response.result.error || "Generation Failed");
        }
    }
};
