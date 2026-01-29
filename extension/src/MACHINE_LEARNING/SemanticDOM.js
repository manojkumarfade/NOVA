
import { LLMClient } from '../services/LLMClient';
import { supabase } from '../services/supabase';

export class SemanticDOM {
    constructor() {
        this.cache = new Map(); // Simple in-memory cache for session
    }

    /**
     * Analyzes the current page to extract a semantic map.
     * @param {string} url - Current Page URL
     * @param {string} textContext - Simplified text content of the page
     * @param {Array} interactives - List of interactive elements
     * @returns {Promise<object>} Semantic Map { product_cards: [], navigation: [], prices: [] }
     */
    async analyzePage(url, textContext, interactives) {
        const domain = new URL(url).hostname;

        // 1. Check Cache / Supabase (simulated persistence for now)
        if (this.cache.has(domain)) {
            console.log("SemanticDOM: Using cached map for", domain);
            return this.cache.get(domain);
        }

        console.log("SemanticDOM: Analyzing fresh page...");

        // 2. Prepare Data for LLM (Chunking Lite)
        // We take the top 50 interactives and first 2000 chars of text to identify the "Type" of page and "Patterns"
        const previewInteractives = interactives.slice(0, 40).map(i =>
            `<${i.tagName} id="${i.id}" class="${i.className || ''}">${i.text?.substring(0, 30)}</${i.tagName}>`
        ).join('\n');

        const analysisPrompt = `
        Analyze this DOM snapshot to understand the Semantic Structure.
        
        Domain: ${domain}
        Text Snippet: ${textContext.substring(0, 1000)}...
        Interactive Elements Sample:
        ${previewInteractives}

        TASK:
        1. Identify the Page Type (e.g. Product Listing, Single Product, Homepage, Article).
        2. Identify SEMANTIC CLUSTERS (groups of elements that form a logical unit, like a "Product Card").
        3. Identify PATTERNS (common class names or structures for "Price", "Title", "Add to Cart").

        OUTPUT JSON:
        {
            "pageType": "Product Listing",
            "clusters": [
                { "role": "product_card", "description": "Contains image, title, price", "selector_hint": "div.product-item" },
                { "role": "navigation", "description": "Top menu", "selector_hint": "nav" }
            ],
            "selectors": {
                "price": "regex or class hint",
                "title": "regex or class hint"
            }
        }
        `;

        try {
            const response = await LLMClient.chatCompletion([
                { role: 'system', content: "You are a Semantic DOM Analyzer." },
                { role: 'user', content: analysisPrompt }
            ], null, { temperature: 0.1 });

            // Robust JSON extraction
            const jsonStr = response.match(/\{[\s\S]*\}/)?.[0];
            if (!jsonStr) throw new Error("No JSON in Semantic Analysis");

            const semanticMap = JSON.parse(jsonStr);
            this.cache.set(domain, semanticMap);

            // Async Store to Supabase (Fire and Forget)
            this._persistToSupabase(domain, semanticMap);

            return semanticMap;

        } catch (e) {
            console.warn("Semantic Analysis Failed", e);
            return null;
        }
    }

    async _persistToSupabase(domain, map) {
        try {
            const { error } = await supabase
                .from('semantic_maps')
                .upsert({
                    domain: domain,
                    map_data: map,
                    updated_at: new Date()
                }, { onConflict: 'domain' });

            if (error) console.error("Supabase Save Failed:", error);
        } catch (e) {
            // Supabase might not have the table yet, ignore error to prevent crash
            console.warn("Supabase persistence skipped (Table 'semantic_maps' might be missing).");
        }
    }
}

export const semanticDOM = new SemanticDOM();
