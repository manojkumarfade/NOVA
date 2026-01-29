
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
        let finalPrompt = "";

        if (plan.mode === 'PAGE_AWARE_IMAGE') {
            let pageContext = plan.source_context?.summary_of_page;

            if (!pageContext) {
                try {
                    // [NEW] Real-time Page Context Extraction
                    console.log("[ImageAgent] Scanning active tab for visual context...");
                    if (onProgress) onProgress({ status: 'generating_image', message: 'Analyzing page structure...' });

                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    if (tab && tab.id) {
                        const extraction = await chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            func: () => {
                                // 1. Try OpenGraph Image (Most reliable for products)
                                const ogImage = document.querySelector('meta[property="og:image"]')?.content;

                                // 2. Try JSON-LD Product Image
                                let jsonLdImage = "";
                                try {
                                    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
                                    for (const s of scripts) {
                                        const json = JSON.parse(s.innerText);
                                        if (json.image) {
                                            jsonLdImage = Array.isArray(json.image) ? json.image[0] : json.image;
                                            break;
                                        }
                                        if (json['@graph']) {
                                            const product = json['@graph'].find(i => i['@type'] === 'Product');
                                            if (product && product.image) {
                                                jsonLdImage = Array.isArray(product.image) ? product.image[0] : product.image;
                                                break;
                                            }
                                        }
                                    }
                                } catch (e) { }

                                // 3. Fallback to largest visible images
                                const getImages = () => {
                                    return Array.from(document.images)
                                        .map(img => ({
                                            src: img.src,
                                            alt: img.alt || img.title || '',
                                            width: img.naturalWidth || img.width,
                                            height: img.naturalHeight || img.height,
                                            area: (img.naturalWidth || img.width) * (img.naturalHeight || img.height)
                                        }))
                                        .filter(img => img.width > 200 && img.height > 200) // Stricter filter
                                        .sort((a, b) => b.area - a.area)
                                        .slice(0, 3);
                                };

                                return {
                                    title: document.title,
                                    description: document.querySelector('meta[name="description"]')?.content || "",
                                    h1: document.querySelector('h1')?.innerText || "",
                                    ogImage: ogImage,
                                    jsonLdImage: jsonLdImage,
                                    mainText: document.body.innerText.slice(0, 800).replace(/\s+/g, ' ').trim(), // More text
                                    images: getImages()
                                };
                            }
                        });

                        if (extraction && extraction[0] && extraction[0].result) {
                            const data = extraction[0].result;

                            // [SMART SUMMARY] Construct a focused context
                            const subject = data.h1 || data.title || "Unknown Subject";
                            const description = data.description || data.mainText.substring(0, 200);

                            pageContext = `
                            *** VISUAL CONTEXT ***
                            SUBJECT: ${subject}
                            DESCRIPTION: ${description}
                            VISUAL DETAILS: ${data.ogImage ? "Main Image: " + data.ogImage : "See visible images"}
                            IMAGE ALT TEXT: ${data.images.map(i => i.alt).join(', ')}
                            RAW CONTENT: ${data.mainText}
                            `;

                            console.log("ImageAgent: Extracted Robust Context", pageContext);
                            if (onProgress) onProgress({ status: 'generating_image', message: `Found Subject: "${subject.substring(0, 30)}..."` });
                        }
                    }
                } catch (e) {
                    console.warn("ImageAgent: Could not read page, falling back to goal", e);
                    if (onProgress) onProgress({ status: 'generating_image', message: 'Could not read page. Using text only.' });
                }
            }

            // SYNC PROMPT GENERATION
            // We need to convert page context -> Visual Prompt.
            // We'll call the LLM to do this "Translation".
            const llmResponse = await LLMClient.chatCompletion([
                {
                    role: 'system',
                    content: `You are an expert Visual Prompt Engineer for Generative AI.
                
                YOUR GOAL: Create a detailed image generation prompt based on the User's Goal and the Page Context.
                
                CRITICAL RULES:
                1. **IDENTIFY THE SUBJECT**: Look at the 'SUBJECT' and 'DESCRIPTION' fields in the Page Context.
                   - If the page is about a "Puma Shoe", the image MUST be of a Puma Shoe. 
                   - Do NOT hallucinate a different object (e.g. do not make a phone if the page is about shoes).
                2. **INTEGRATE VISUALS**: Use descriptors from the 'IMAGE ALT TEXT' or 'DESCRIPTION' to describe the object (color, shape, material).
                3. **STYLE**: If the user asks for "Marketing Style", ensure professional lighting, studio background, and high resolution.
                
                Output ONLY the raw prompt text. Do not include "Here is the prompt" or quotes.`
                }, {
                    role: 'user',
                    content: `User Goal: ${plan.goal}\n\n${pageContext || "No Page Context Available."}`
                }
            ]);

            finalPrompt = llmResponse.content || plan.goal;

            // [CRITICAL FIX] Force the Subject into the prompt if LLM missed it
            // The user complained that even if we identified "Jeans", it made a "Phone".
            // So we blindly append the subject to ensure the model knows what to draw.
            if (pageContext.includes("SUBJECT:")) {
                const subjectMatch = pageContext.match(/SUBJECT: (.*)/);
                if (subjectMatch && subjectMatch[1]) {
                    const detectedSubject = subjectMatch[1].trim();
                    if (!finalPrompt.toLowerCase().includes(detectedSubject.toLowerCase())) {
                        console.log(`[ImageAgent] Enforcing missed subject: ${detectedSubject}`);
                        finalPrompt = `Subject: ${detectedSubject}. ${finalPrompt}`;
                    }
                }
            }
        } else {
            // TEXT_TO_IMAGE
            finalPrompt = `${plan.goal}. ${plan.image_constraints?.style || ''} style. ${plan.image_constraints?.intended_use || ''}`;
        }

        console.log("ImageAgent: Final Prompt", finalPrompt);

        // 3. Call Service
        // Notify UI of "Generating..." state (Handled by AgentService state machine usually, but we can emit)

        try {
            const result = await ImageService.generate({
                prompt: finalPrompt,
                provider: provider,
                // Model/Size handled by Service defaults or overridden by plan if allowed
            });

            return {
                status: 'SUCCESS',
                result: {
                    message: `Generated image: ${finalPrompt.slice(0, 50)}...`,
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
        // [FIX] Smart Mode Switching
        // If the prompt contains "this", "page", "here", "reference", attempt PAGE_AWARE.
        // Otherwise, use standard TEXT_TO_IMAGE for speed.
        const needsContext = /(this|page|here|reference|context|screen|site|scan|analyze|read)/i.test(prompt);

        console.log(`[ImageAgent] Smart Mode: ${needsContext ? 'PAGE_AWARE_IMAGE' : 'TEXT_TO_IMAGE'} (Prompt: "${prompt}")`);

        if (needsContext && onProgress) {
            onProgress({ status: 'generating_image', message: 'Scanning page for visual references...' });
        }

        const response = await this.execute({
            goal: prompt,
            mode: needsContext ? 'PAGE_AWARE_IMAGE' : 'TEXT_TO_IMAGE',
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
