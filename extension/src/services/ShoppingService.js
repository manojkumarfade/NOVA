import { SearchService } from './SearchService';
import { LLMClient } from './LLMClient';
import { StorageService } from './StorageService';

// ==========================================
// 1. CANONICAL DATA MODELS
// ==========================================

export class Product {
    constructor({ id, name, brand, model, category, launchYear, msrp, link }) {
        this.id = id || Math.random().toString(36).substr(2, 9);
        this.name = name;
        this.brand = brand || 'Unknown';
        this.model = model || '';
        this.category = category || '';
        this.launchYear = launchYear || new Date().getFullYear();
        this.msrp = msrp || 0;
        this.link = link || ''; // Added link for navigation
    }
}

export class PriceSnapshot {
    constructor({ site, basePrice, offers, stock, fetchedAt, link }) {
        this.site = site;
        this.basePrice = basePrice;
        this.offers = offers || []; // Array of {type: 'bank'|'coupon', discount: number, maxCap: number}
        this.stock = stock;
        this.fetchedAt = fetchedAt || Date.now();
        this.link = link;
    }
}

export class EffectivePrice {
    constructor({ site, basePrice, effectivePrice, breakdown, confidence, link }) {
        this.site = site;
        this.basePrice = basePrice;
        this.effectivePrice = effectivePrice;
        this.breakdown = breakdown; // Explain how we got here
        this.confidence = confidence;
        this.link = link;
    }
}

// ==========================================
// 2. SHOPPING ENGINE
// ==========================================

export const ShoppingService = {

    // --- A. Constraint Parser ---
    async parseCommand(command) {
        // [Existing logic remains same]
        console.log(`🧠 [Shopping] Parsing intent: "${command}"...`);
        const systemPrompt = `
        You are a Shopping Intent Parser.
        Extract parameters from the user's request.
        
        Output JSON ONLY:
        {
          "category": "headphones" | "laptop" | "shoes" | "saree" | "etc",
          "brand": "Sony" | "Apple" | null,
          "budget": number | null,
          "year": 2024 | 2025 | 2026 | null,
          "query": "The optimized search query to find these items"
        }
        `;

        try {
            const response = await LLMClient.chatCompletion([
                { role: 'system', content: systemPrompt },
                { role: 'user', content: command }
            ], null, { temperature: 0.1 });
            return JSON.parse(response.replace(/```json/g, '').replace(/```/g, '').trim());
        } catch (e) {
            console.error("[Shopping] Parse Error", e);
            return { query: command, category: 'general', budget: null };
        }
    },

    // --- B. Product Universe Builder (DEEP READ V2) ---
    async buildProductUniverse({ category, brand, budget, query, year }) {
        console.log(`🌌 [Shopping] Building universe via Deep Research for: ${query}`);

        // 1. Search for "Best [Category] 2026" lists
        const searchResults = await SearchService.search(query + " best review list");

        // 2. DEEP READ: Fetch content of Top 2 Review Articles
        let combinedContext = "";
        let sourcesRead = 0;

        for (const res of searchResults.slice(0, 3)) { // Read top 3 articles
            // Skip generic e-commerce listings, look for blogs/reviews
            if (sourcesRead >= 2) break;

            console.log(`📖 [Shopping] Reading Article: ${res.title}`);
            const content = await SearchService.fetchPageContent(res.link);

            if (content && content.length > 500) {
                combinedContext += `\n\n=== SOURCE: ${res.title} ===\n${content.substring(0, 15000)}`;
                sourcesRead++;
            }
        }

        if (!combinedContext) {
            console.warn("Could not fetch article content, falling back to snippets.");
            combinedContext = searchResults.map(r => r.snippet).join('\n');
        }

        // 3. LLM Extraction of Candidates
        console.log(`🧠 [Shopping] Extracting Top Candidates from ${sourcesRead} articles...`);

        // FALLBACK: If we couldn't read full articles (e.g. anti-bot blocks), use snippets.
        const useSnippets = sourcesRead === 0 || !combinedContext;
        const contextToUse = useSnippets ?
            searchResults.map(r => `Title: ${r.title}\nSnippet: ${r.snippet}`).join('\n\n') :
            combinedContext;

        if (useSnippets) console.warn("[Shopping] Deep Read failed/empty. Using Search Snippets as fallback.");

        const extractionPrompt = `
        Context: ${useSnippets ? 'Search Results Snippets' : 'Full Review Articles'} for ${query}.
        
        Task: Identify the Top 3-5 BEST products mentioned that match the criteria.
        Criteria:
        - Category: ${category}
        - Budget: ${budget ? `Strictly under ${budget} INR` : 'Reasonable price'}
        
        Rules:
        1. **Strict Budget**: If a budget is set (${budget}), DO NOT suggest items significantly above it (max +10% tolerance).
        2. **Diversity**: Suggest 3 DISTINCT models (different brands if possible).
        3. **Specifics**: Use exact Model Names (e.g. "Samsung Galaxy S25").
        4. **Extract "Why to Buy"**: A persuasive one-liner.
        5. **Extract "Key Features"**: 2-3 highlights.

        Output JSON:
        [
          { "name": "Model Name", "reason": "Why it is a winner", "features": ["Feature 1", "Feature 2"] }
        ]
        `;

        let candidates = [];
        try {
            const response = await LLMClient.chatCompletion([
                { role: 'system', content: `Context:\n${contextToUse}` }, // Use dynamic context
                { role: 'user', content: extractionPrompt }
            ], null, { temperature: 0.1 });

            const raw = JSON.parse(response.replace(/```json/g, '').replace(/```/g, '').trim());
            candidates = raw.map(c => {
                const p = new Product({
                    name: c.name,
                    brand: brand || 'Unknown',
                    category: category,
                    launchYear: year,
                    msrp: 0
                });
                p.reason = c.reason;
                p.features = c.features || [];
                return p;
            });
        } catch (e) {
            console.warn("Candidate extraction failed", e);
        }

        // [FALLBACK] If LLM returned empty list (strict budget?) or error occurred
        if (candidates.length === 0) {
            console.warn("LLM returned 0 candidates. Using Search Results as Fallback.");
            return searchResults.slice(0, 3).map(r => new Product({
                name: r.title.replace(/\|.*/, '').replace(/\.\.\./, '').trim(),
                category: category || 'General',
                brand: brand || 'Unknown'
            }));
        }

        return candidates;

        // [POST-FILTER] Logic check for duplicates or budget
        // ... (Optional additional filter logic if needed)

        return candidates;
    },

    // --- C. Scoring Engine ---
    async scoreAndShortlist(products) {
        // Since we already filtered via LLM, we trust these are good candidates.
        return products.slice(0, 3);
    },

    // --- D. Price Resolution (MULTI-SITE + LLM V2) ---
    async resolvePrices(product) {
        console.log(`🕵️ [Shopping] Hunting prices for: ${product.name}`);

        // Multi-Site Search
        const storeQuery = `buy ${product.name} price india`;
        const storeResults = await SearchService.search(storeQuery + " site:amazon.in OR site:flipkart.com OR site:croma.com");

        const snapshots = [];
        const seenSites = new Set();

        for (const res of storeResults.slice(0, 5)) {
            let site = 'Unknown';
            if (res.link.includes('amazon')) site = 'Amazon';
            else if (res.link.includes('flipkart')) site = 'Flipkart';
            else if (res.link.includes('croma')) site = 'Croma';
            else if (res.link.includes('reliance')) site = 'Reliance';

            if (seenSites.has(site) && site !== 'Unknown') continue; // One per site

            console.log(`   > Checking ${site}: ${res.link}`);
            let price = 0;
            let source = 'page';

            // 1. TRY SNIPPET EXTRACTION (Fastest & avoids blocking)
            // Look for patterns like "₹1,299" or "Rs. 1,299" in the snippet
            const snippetPriceMatch = res.snippet?.match(/(?:₹|Rs\.?)\s?([\d,]+)/i);
            if (snippetPriceMatch) {
                const raw = snippetPriceMatch[1].replace(/,/g, '');
                const val = parseInt(raw, 10);
                if (!isNaN(val) && val > 100) {
                    price = val;
                    source = 'snippet';
                    console.log(`   >> Found Snippet Price: ${price}`);
                }
            }

            // 2. TRY PAGE CONTENT (Deep Verification)
            // Only if snippet failed or we want to double check (but here we prioritize coverage)
            // Amazon/Flipkart usually block fetchPageContent, so we proceed if snippet worked.

            if (price === 0) { // Only fetch if we didn't find in snippet
                const content = await SearchService.fetchPageContent(res.link);
                if (content) {
                    const pricePrompt = `
                     Extract the CURRENT BUYING PRICE for: "${product.name}" from this text.
                     Text: ${content.substring(0, 1000)}
                     Ignore "EMI" or "Exchange". Return integer only. If missing return 0.
                     Output JSON: { "price": 24999 }
                     `;

                    try {
                        const priceRes = await LLMClient.chatCompletion([
                            { role: 'user', content: pricePrompt }
                        ], null, { temperature: 0 });
                        const data = JSON.parse(priceRes.replace(/```json/g, '').replace(/```/g, '').trim());
                        if (data.price > 100) {
                            price = data.price;
                            source = 'llm';
                        }
                    } catch (e) { }
                }
            }

            if (price > 100) {
                snapshots.push(new PriceSnapshot({
                    site,
                    basePrice: price,
                    offers: [],
                    stock: true,
                    link: res.link
                }));
                if (site !== 'Unknown') seenSites.add(site);
            }
        }

        return snapshots;
    },

    // --- E. Effective Price Calculation ---
    computeEffectivePrice(snapshot) {
        let finalPrice = snapshot.basePrice;
        const applied = [];

        // Apply logic: max 1 bank + 1 coupon
        const bankOffer = snapshot.offers.find(o => o.type === 'bank');
        if (bankOffer) {
            finalPrice -= bankOffer.discount;
            applied.push(`Bank Offer: -₹${bankOffer.discount}`);
        }

        const coupon = snapshot.offers.find(o => o.type === 'coupon');
        if (coupon) {
            finalPrice -= coupon.discount;
            applied.push(`Coupon: -₹${coupon.discount}`);
        }

        return new EffectivePrice({
            site: snapshot.site,
            basePrice: snapshot.basePrice,
            effectivePrice: finalPrice,
            breakdown: applied,
            confidence: snapshot.stock ? 0.9 : 0.4,
            link: snapshot.link
        });
    },

    // --- F. Orchestrator (COMPARISON MODE) ---
    async process(userRequest, onProgress) {
        onProgress({ status: 'planning', message: 'Shopping Agent: Parsing & Researching (Deep Read)...' });

        // 1. Constraints
        const constraints = await this.parseCommand(userRequest);

        // 2. Universe (Deep)
        onProgress({ status: 'thinking', message: `Reading Reviews to find best "${constraints.category}"... (This may take 10s)` });
        const candidates = await this.buildProductUniverse(constraints);

        if (candidates.length === 0) return { message: "Could not identify specific top products from reviews." };

        // 3. Resolve All Candidates (Compare)
        const results = [];

        // Parallel-ish processing (sequential for now to avoid rate limits)
        for (const p of candidates.slice(0, 3)) { // Force Top 3
            onProgress({ status: 'navigating', message: `Comparing prices for ${p.name}...` });
            const snapshots = await this.resolvePrices(p);

            if (snapshots.length > 0) {
                // Find best among snapshots
                snapshots.sort((a, b) => a.basePrice - b.basePrice);
                results.push({
                    product: p,
                    bestDeal: snapshots[0],
                    alternatives: snapshots.slice(1)
                });
            }
        }

        // 4. Final Comparison Table via LLM
        onProgress({ status: 'thinking', message: 'Generating Comparison Table...' });

        if (results.length === 0) return { message: "Found products but could not verify live Indian prices." };

        // Sort results by price or relevance
        results.sort((a, b) => a.bestDeal.basePrice - b.bestDeal.basePrice);

        return {
            results,
            message: `Identified ${results.length} top options.`,
            summary: "Shopping Task Complete"
        };
    }
};
