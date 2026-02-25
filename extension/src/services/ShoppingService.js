import { LLMClient } from './LLMClient';
import { StorageService } from './StorageService';
import { SearchService } from './SearchService';
import { SwarmService } from './SwarmService';
export class ShoppingService {
    static conversationContext = [];

    static async getApiKeys() {
        const providers = await StorageService.get('llm_providers') || [];
        const typegpt = providers.find(p => p.id === 'typegpt') || providers[0];

        // DuckDuckGo doesn't require keys. Just return what is needed.
        return {
            typegptKey: typegpt?.apiKey
        };
    }

    static async process(query, onProgress, profile = '', forceSearch = false, signal, checkStop) {
        const keys = await this.getApiKeys();

        // Ensure checkStop is passed down; if not, create a dummy to prevent crashes
        const safeCheckStop = checkStop || (() => { });

        const contextString = this.conversationContext.map(m => `${m.role}: ${m.content}`).join('\n');

        if (!forceSearch) {
            safeCheckStop();
            onProgress({ status: 'thinking', message: 'Analyzing user constraints...' });

            const validationPrompt = `Evaluate this user shopping request: "${query}". 
Recent Conversation Context: 
${contextString}

You are in the "Information Gathering" phase. You DO NOT HAVE WEB ACCESS YET.
CRITICAL RULES:
1. DOES THIS QUERY NEED CLARIFICATION? If it's too broad (e.g. "gaming smartphone"), you must ask 1 short question to narrow it down (budget, brand, etc).
2. HAS THE USER PROVIDED ENOUGH DETAILS? If they already gave budget or specific features, or if you already asked 1-2 questions, YOU MUST PROCEED.
3. DO NOT HALLUCINATE PRODUCTS. NEVER GIVE RECOMMENDATIONS HERE.

Return ONLY a valid JSON object matching this schema, nothing else:
{
  "shouldProceed": true or false,
  "replyToUser": "Your short 1-sentence question to the user (leave EMPTY if shouldProceed is true)"
}`;

            const validationResult = await LLMClient.chatCompletion([{ role: 'user', content: validationPrompt }], 'openai/gpt-oss-120b', { temperature: 0.1, signal: signal });
            safeCheckStop();

            let needsProceed = true;
            let validationMessage = "";
            try {
                const match = validationResult.match(/\{[\s\S]*\}/);
                const parsed = JSON.parse(match ? match[0] : validationResult);
                needsProceed = !parsed.shouldProceed;
                validationMessage = parsed.replyToUser || "";
            } catch (e) {
                needsProceed = !validationResult.includes('PROCEED');
                validationMessage = validationResult;
            }

            if (needsProceed && validationMessage && validationMessage.trim() !== '') {
                this.conversationContext.push({ role: 'user', content: query });
                this.conversationContext.push({ role: 'assistant', content: validationMessage });
                if (this.conversationContext.length > 6) this.conversationContext = this.conversationContext.slice(-6);

                return { isShopping: false, message: validationMessage, needsProceed: true };
            }
        }

        safeCheckStop();
        onProgress({ status: 'thinking', message: 'Expanding query for product search...' });

        const expansionPrompt = `Convert the tracking context and query into a highly optimized product search term.
Recent Context:
${contextString}
Query: "${query}"

Return ONLY a valid JSON object matching this schema, nothing else:
{
  "searchString": "highly optimized search keywords that look for the best products, including 2026 models, specific prices, and brands"
}
${profile ? '\nUser profile/preferences: ' + profile : ''}`;

        const llmExpansion = await LLMClient.chatCompletion([{ role: 'user', content: expansionPrompt }], 'openai/gpt-oss-120b', { temperature: 0.3, signal: signal });
        safeCheckStop();

        let searchString = query;
        try {
            const match = llmExpansion.match(/\{[\s\S]*\}/);
            const parsed = JSON.parse(match ? match[0] : llmExpansion);
            if (parsed.searchString) searchString = parsed.searchString;
        } catch (e) {
            console.warn("Failed to parse expansion JSON, using default", e);
        }

        onProgress({ status: 'navigating', message: `Searching the web via DuckDuckGo...` });

        let searchData = "";
        try {
            safeCheckStop();
            const results = await SearchService.search(searchString);
            safeCheckStop();
            if (!results || results.length === 0) throw new Error("DuckDuckGo returned no results.");

            // Get top 6 URLs for broader product link discovery
            const topUrls = results.slice(0, 6).map(r => r.link);
            onProgress({ status: 'navigating', message: `Analyzing Page Metadata from ${topUrls.length} pages...` });

            // DOM content extractor for shopping — specifically harvests direct product URLs
            const contentExtractor = () => {
                try {
                    // Harvest ALL e-commerce links from the page
                    const allLinks = Array.from(document.querySelectorAll('a'))
                        .filter(a => a.href && (a.href.includes('amazon.in') || a.href.includes('flipkart.com') || a.href.includes('croma.com') || a.href.includes('reliancedigital.in') || a.href.includes('myntra.com')))
                        .map(a => ({ text: (a.innerText || '').trim(), href: a.href }));

                    // Separate DIRECT product links from search/listing links
                    const directProductLinks = allLinks.filter(l =>
                        l.href.includes('/dp/') || l.href.includes('/product/') || l.href.includes('/p/') ||
                        l.href.includes('/itm/') || l.href.match(/\/[A-Z0-9]{10}(?:\/|$)/)
                    ).map(l => `[DIRECT PRODUCT] ${l.text}: ${l.href}`);

                    const otherLinks = allLinks.filter(l =>
                        !l.href.includes('/dp/') && !l.href.includes('/product/') && !l.href.includes('/p/') &&
                        !l.href.includes('/itm/') && !l.href.match(/\/[A-Z0-9]{10}(?:\/|$)/)
                    ).map(l => `[OTHER] ${l.text}: ${l.href}`);

                    const text = document.body.innerText || '';
                    const cleaned = text.replace(/\s+/g, ' ').substring(0, 4000);
                    const linksSection = [...directProductLinks, ...otherLinks.slice(0, 5)].join('\n');
                    return { url: window.location.href, title: document.title, content: cleaned + '\n\n=== PRODUCT LINKS FOUND ON PAGE ===\n' + linksSection.substring(0, 2500) };
                } catch (e) {
                    return { url: window.location.href, title: document.title, content: '', error: e.message };
                }
            };

            const tabResults = await SwarmService.spawnWithConcurrency(
                topUrls,
                contentExtractor,
                3,      // 3 concurrent
                15000,  // 15s timeout
                (tabIndex, status) => {
                    const messages = ["Comparing Price Points...", "Verifying Seller Rating...", "Locating Add-to-Cart Selectors..."];
                    const subtask = messages[tabIndex % messages.length];
                    // safeCheckStop(); // Can't easily checkStop inside the callback synchronously without risking unhandled promise rejection state mapping errors, but we can pass signal to SwarmService down the line if needed.
                    onProgress({ status: 'thinking', message: subtask });
                }
            );
            safeCheckStop();

            // Combine successful extractions
            const validExtractions = tabResults.filter(r => r.status === 'success' && r.result?.content?.length > 100);

            if (validExtractions.length > 0) {
                searchData = validExtractions.map(r => `=== SOURCE: ${r.result.title} (${r.result.url}) ===\n${r.result.content}`).join('\n\n');
            } else {
                searchData = results.map(r => `Title: ${r.title}\nURL: ${r.link}\nSnippet: ${r.snippet}`).join('\n\n---\n\n');
            }

        } catch (err) {
            console.warn("DDG search failed:", err);
            return { isShopping: false, message: `Web Search failed: ${err.message}. Please try a slightly different query.` };
        }

        safeCheckStop();
        onProgress({ status: 'thinking', message: 'Reading through products and reasoning out the best option...' });

        const analysisSystemPrompt = `
<Context>
You are an expert human Procurement Agent named Nova. You have been given live web data from DuckDuckGo.
Your goal: Help the user BUY the best product, not just read about it.
User Profile/Preferences: ${profile || 'None'}
</Context>

<Rules>
1. IDENTIFY: What is the user's hidden need? (e.g. "Gaming" means low latency is prioritized over battery).
2. It's okay to read reviews and listicles! Extract the absolute best products that exactly match the budget/criteria.
3. CRITICAL URL RULES — READ CAREFULLY:
   a. You MUST look at the "=== PRODUCT LINKS FOUND ON PAGE ===" sections in the data. Lines marked [DIRECT PRODUCT] are DIRECT product page URLs — USE THESE.
   b. Direct product URLs contain patterns like: /dp/, /product/, /p/, /itm/ — these are VALID.
   c. NEVER use search/listing URLs that contain: /s?k=, /search, /s/, /browse/ — these are INVALID.
   d. If you cannot find a direct product URL for a product, put "Check Site" in the url field. Do NOT construct a /s?k= search URL.
   e. DuckDuckGo links are NEVER valid product URLs.
4. Do not blindly refuse a good product just to reach a high arbitrary count. Try to extract 4-5 products if available.
5. IF a direct product page on Flipkart or Amazon lacks a clear price tag in the scraped text, DO NOT discard it! Just estimate the price or put "Check Site" and include it anyway. Direct product URLs are incredibly valuable.
</Rules>

<Data>
${searchData.substring(0, 50000)}
</Data>

<Task>
Identify the absolute Winners for: "${query}". 
CRITICAL RULE FOR PRODUCT COUNT: You MUST extract AT LEAST 5 highly qualified products from the provided text! Do not stop at just 1. It is absolutely unacceptable to return only 1 product.

CRITICAL RULE FOR DUPLICATES: You MUST extract 5 DISTINCT product models/brands (e.g. OnePlus 15, iQOO 15, Samsung S25, Vivo X200, Xiaomi 15). DO NOT extract the exact same product 5 times with different colors or storage capacities! Every item in your array must be a completely different product model from the others.

If you cannot find 5 products, you MUST return at least 1 or 2 products that loosely fit the criteria. NEVER return an empty array [].

Make sure you output a purely valid JSON structure (DO NOT WRAP IN MARKDOWN) like this:
{
  "thought_process": "Explain your detailed human-like trade-offs and reasoning here out loud",
  "products": [
    {
      "name": "Product Name",
      "price": "Current Price in INR (e.g. ₹4,999)",
      "specs": ["spec 1", "spec 2", "spec 3"],
      "explanation": "A concise explanation of why it fits user preferences.",
      "url": "CRITICAL: ONLY use [DIRECT PRODUCT] URLs from the data containing /dp/ or /product/ or /p/. NEVER construct /s?k= search URLs!",
      "image": "Image URL if found",
      "score": "Overall Score 1-10",
      "badge": "best or premium"
    }
  ]
}
</Task>
`;

        const responseJSONStr = await LLMClient.chatCompletion([{ role: 'user', content: analysisSystemPrompt }], 'openai/gpt-oss-120b', { temperature: 0.3, signal: signal });
        safeCheckStop();

        let products = [];
        let thoughts = "";
        try {
            const cleanJsonStr = responseJSONStr.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
            const jsonMatch = cleanJsonStr.match(/\{[\s\S]*\}/);
            const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : cleanJsonStr);
            products = parsed.products || [];
            thoughts = parsed.thought_process || "";

            // POST-PROCESSING: Sanitize URLs — strip any search/listing URLs the LLM constructed
            products = products.map(p => {
                let url = p.url;
                if (url && url !== 'Check Site') {
                    const lower = url.toLowerCase();
                    if (lower.includes('/s?k=') || lower.includes('/s/ref=') || lower.includes('/search?') || lower.includes('/browse/') || lower.includes('duckduckgo.com')) {
                        url = null;
                    }
                } else {
                    url = null;
                }
                return { ...p, url };
            });

            // PHASE 2: Resolve direct product URLs via fetch() — not tabs, pure HTML parsing
            const productsNeedingUrl = products.filter(p => !p.url && p.name);
            if (productsNeedingUrl.length > 0) {
                safeCheckStop();
                onProgress({ status: 'navigating', message: `Resolving direct product links for ${productsNeedingUrl.length} products...` });

                // Fetch Amazon search HTML and extract /dp/ link for a single product
                const resolveAmazonUrl = async (productName) => {
                    try {
                        const searchUrl = `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`;
                        const response = await fetch(searchUrl, {
                            headers: {
                                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                                'Accept-Language': 'en-IN,en;q=0.9'
                            }
                        });
                        if (!response.ok) return null;
                        const html = await response.text();

                        // Extract all /dp/ASIN links from raw HTML using regex
                        const dpPattern = /href="\/([^"]*\/dp\/([A-Z0-9]{10})[^"]*)"/gi;
                        const matches = [...html.matchAll(dpPattern)];

                        // Filter out sponsored results (/sspa/) and dedup by ASIN
                        const seen = new Set();
                        const validLinks = [];
                        for (const m of matches) {
                            const fullPath = m[1];
                            const asin = m[2];
                            if (!seen.has(asin) && !fullPath.includes('/sspa/') && !fullPath.includes('gp/slredirect')) {
                                seen.add(asin);
                                validLinks.push(`https://www.amazon.in/${fullPath.split('?')[0]}`);
                            }
                            if (validLinks.length >= 3) break; // Top 3 is enough
                        }

                        return validLinks.length > 0 ? validLinks[0] : null;
                    } catch (e) {
                        console.warn(`Failed to resolve URL for ${productName}:`, e);
                        return null;
                    }
                };

                // Resolve all products in parallel
                const resolvePromises = productsNeedingUrl.map(p => resolveAmazonUrl(p.name));
                const resolvedUrls = await Promise.allSettled(resolvePromises);

                // Map resolved URLs back to products
                let resolveIndex = 0;
                products = products.map(p => {
                    if (!p.url && p.name) {
                        const result = resolvedUrls[resolveIndex];
                        resolveIndex++;
                        if (result.status === 'fulfilled' && result.value) {
                            return { ...p, url: result.value };
                        }
                    }
                    return p;
                });

                onProgress({ status: 'thinking', message: `Resolved ${resolvedUrls.filter(r => r.status === 'fulfilled' && r.value).length} direct product links.` });
            }

            if (products.length > 0) {
                const memoryStr = products.map(p => `${p.name} - ${p.price}`).join(', ');
                this.conversationContext.push({ role: 'user', content: query });
                this.conversationContext.push({ role: 'assistant', content: `I found and recommended these products to the user based on their query: ${memoryStr}` });
                if (this.conversationContext.length > 6) this.conversationContext = this.conversationContext.slice(-6);
            }

        } catch (e) {
            console.error("Failed to parse LLM JSON:", e, responseJSONStr);
            return { isShopping: false, message: "Failed to parse product data from LLM." };
        }

        const winnerUrl = products.length > 0 ? products[0].url : null;
        const winnerProduct = products.length > 0 ? products[0].name : null;

        return {
            isShopping: true,
            products: products,
            thought_process: thoughts,
            message: `Here are the top recommendations based on your request. Do you have any specific questions about these, or should I add the best one to your cart?`,
            winnerUrl: winnerUrl,
            winnerProduct: winnerProduct
        };
    }

    static async comparePrices(productUrl, productName, onProgress) {
        onProgress({ status: 'navigating', message: `Opening Flash.co and comparing prices for ${productName}...` });

        return new Promise((resolve, reject) => {
            chrome.tabs.create({ url: 'https://flash.co', active: true }, (tab) => {
                const tabId = tab.id;

                chrome.tabs.onUpdated.addListener(function listener(tId, changeInfo) {
                    if (tId === tabId && changeInfo.status === 'complete') {
                        chrome.tabs.onUpdated.removeListener(listener);
                        onProgress({ status: 'navigating', message: `Injecting automation script into Flash.co...` });

                        setTimeout(() => {
                            chrome.scripting.executeScript({
                                target: { tabId: tabId },
                                files: ['flashco-automation.js'] // Relies on build moving it to root
                            }, () => {
                                if (chrome.runtime.lastError) {
                                    return resolve({ isShopping: false, message: 'Failed to inject script: ' + chrome.runtime.lastError.message });
                                }

                                onProgress({ status: 'thinking', message: `Running search on Flash.co...` });
                                chrome.tabs.sendMessage(tabId, { action: 'startComparison', url: productUrl }, async (response) => {
                                    if (!response) return resolve({ isShopping: false, message: 'Failed to communicate with Flash.co automation.' });
                                    if (response.error) return resolve({ isShopping: false, message: response.error });

                                    onProgress({ status: 'thinking', message: `Analyzing comparison results...` });
                                    const storesData = response.data.storesData || response.data;
                                    const aiSummary = response.data.aiSummary || "";

                                    const comparePrompt = `You are an elite conversational Indian shopping assistant. I searched Flash.co for pricing and specs on ${productName}.
Here are the store prices I found:
${JSON.stringify(storesData, null, 2)}

${aiSummary ? `\nHere are the actual product specs, pros, and cons I scraped:\n${aiSummary}\n` : ''}

Compare these prices in INR. Identify the absolute best deal considering price and store reputation.
If I provided specs and pros above, you MUST organically weave them into your recommendation to explain WHY this product is good! Do not just list prices. Mention the key specs and why it fits their needs.
Output a nice, conversational PLAIN TEXT summary of your recommendation. At the end, ask if they would like you to add the winning item to their cart!
CRITICAL RULE: DO NOT use markdown tables or complex markdown structures. Use ONLY simple bolding (**) and basic bullet points (-) for the formatting!`;

                                    const llmResponse = await LLMClient.chatCompletion([{ role: 'user', content: comparePrompt }], 'openai/gpt-oss-120b', { temperature: 0.3 });

                                    ShoppingService.conversationContext.push({ role: 'user', content: `Can you compare prices and give me the specs for ${productName}?` });
                                    ShoppingService.conversationContext.push({ role: 'assistant', content: llmResponse });
                                    if (ShoppingService.conversationContext.length > 6) ShoppingService.conversationContext = ShoppingService.conversationContext.slice(-6);

                                    resolve({
                                        isShopping: false,
                                        message: `### AI Recommendation\n\n${llmResponse}`,
                                        extraData: storesData // To be handled by UI if needed
                                    });
                                });
                            });
                        }, 1500);
                    }
                });
            });
        });
    }

    static async startCartAutomation(productUrl, onProgress) {
        onProgress({ status: 'navigating', message: `Opening product page...` });

        return new Promise((resolve) => {
            chrome.tabs.create({ url: productUrl, active: true }, (tab) => {
                const tabId = tab.id;

                chrome.tabs.onUpdated.addListener(function listener(tId, changeInfo) {
                    if (tId === tabId && changeInfo.status === 'complete') {
                        chrome.tabs.onUpdated.removeListener(listener);
                        onProgress({ status: 'thinking', message: `Injecting cart automation script...` });

                        // Wait for page DOM to fully settle (Amazon is heavy)
                        setTimeout(() => {
                            chrome.scripting.executeScript({
                                target: { tabId: tabId },
                                files: ['cart-automation.js']
                            }, () => {
                                if (chrome.runtime.lastError) {
                                    return resolve({ isShopping: false, message: `Error injecting script: ${chrome.runtime.lastError.message}` });
                                }

                                onProgress({ status: 'thinking', message: `Clicking "Add to Cart" button...` });

                                // Directly click Add to Cart — no questions, no LLM
                                chrome.tabs.sendMessage(tabId, { action: 'executeClicks', clicks: ['Add to Cart'] }, (resp) => {
                                    const executionLog = resp ? resp.log : "No response from tab.";
                                    const success = executionLog.toLowerCase().includes('clicked');
                                    resolve({
                                        isShopping: false,
                                        message: success
                                            ? `✅ Done! I've added the item to your cart.\n\n**Automation Log:**\n${executionLog}`
                                            : `⚠️ I opened the product page but couldn't find the Add to Cart button. You can add it manually from the open tab.\n\n**Log:**\n${executionLog}`
                                    });
                                });
                            });
                        }, 5000); // 5s wait for Amazon's heavy DOM
                    }
                });
            });
        });
    }

}
