
import { SearchService } from '../services/SearchService';
import { LLMClient } from '../services/LLMClient';

export class ValidatorPlus {

    /**
     * Verifies a claim or price by cross-referencing multiple sources.
     * @param {string} claim - e.g. "Nike Air Max price is $120"
     * @param {string} context - Original context
     * @returns {Promise<object>} { confidence: number, verification: string }
     */
    async verify(claim, context) {
        // 1. Search for corroboration
        const query = `verify ${claim}`;
        const results = await SearchService.search(query);
        const snippets = results.slice(0, 3).map(r => r.snippet).join('\n');

        // 2. LLM Judge
        const prompt = `
        Claim to Verify: "${claim}"
        
        Original Context: "${context.substring(0, 200)}"
        
        External Evidence:
        ${snippets}

        TASK:
        Verify if the claim is accurate based on evidence.
        Assign a Confidence Score (0-100%).
        
        OUTPUT JSON:
        {
            "confidence": 85,
            "reason": "Found matching price on 2 other major retailers."
        }
        `;

        try {
            const response = await LLMClient.chatCompletion([
                { role: 'system', content: "You are a Fact Checker." },
                { role: 'user', content: prompt }
            ], null, { temperature: 0.1 });

            const jsonStr = response.match(/\{[\s\S]*\}/)?.[0];
            if (!jsonStr) return { confidence: 50, reason: "Verification inconclusive (Parse Error)" };

            return JSON.parse(jsonStr);
        } catch (e) {
            console.warn("Validator Failed", e);
            return { confidence: 0, reason: "Verification Service Failed" };
        }
    }
}

export const validatorPlus = new ValidatorPlus();
