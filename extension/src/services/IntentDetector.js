
export const IntentDetector = {
    // Keywords Configuration
    KEYWORDS: {
        STRONG: [
            'best', 'top', 'top-rated', 'best overall', 'best product', 'best option',
            'best choice', 'best value', 'best quality', 'best in class', 'best available',
            'best model', 'best brand', 'worth buying', 'worth it', 'good to buy',
            'should i buy', 'is it good', 'is it worth', 'safe to buy', 'reliable',
            'trusted', 'compare', 'comparison', 'vs', 'versus', 'which is better',
            'which is best', 'difference between', 'pros and cons', 'advantages and disadvantages',
            'recommended', 'most recommended', 'expert recommended', 'user recommended',
            'popular', 'most popular', 'trending'
        ],
        QUALITY: [
            'good', 'better', 'excellent', 'high quality', 'premium', 'budget friendly',
            'value for money', 'long lasting', 'durable', 'comfortable', 'effective',
            'rating', 'reviews', 'review based', 'highly rated', 'best rated',
            'customer feedback', 'real reviews'
        ],
        FILTER: [
            'under budget', 'under price', 'below', 'within budget', 'cheap but good',
            'affordable', 'mid range', 'premium option', 'latest', 'new model',
            'updated version', '2024', '2025', 'current best', 'for daily use',
            'for beginners', 'for professionals', 'for students', 'for office',
            'for gaming', 'for travel'
        ],
        NEGATIVE: [
            'scam', 'fake', 'avoid', 'bad', 'worst', 'issues', 'problems',
            'complaints', 'not working', 'overpriced', 'low quality'
        ]
    },

    analyze(query) {
        const lowerQuery = query.toLowerCase();
        let score = 0;
        let deepAnalysis = false;
        let shouldSearch = false;
        let detectedIntents = [];

        // 1. STRONG Matches (Deep Analysis + Force Search)
        const strongMatches = this.KEYWORDS.STRONG.filter(k => lowerQuery.includes(k));
        if (strongMatches.length > 0) {
            score += 10;
            deepAnalysis = true;
            shouldSearch = true;
            detectedIntents.push('STRONG_INTENT');
        }

        // 2. QUALITY Matches (Search needed if product context exists)
        const qualityMatches = this.KEYWORDS.QUALITY.filter(k => lowerQuery.includes(k));
        if (qualityMatches.length > 0) {
            // Heuristic: "Good" alone is weak. "Good T-shirt" is strong.
            // Check if "good" is followed by words (not just "good morning")
            // For now, if other keywords exist or query length > 3 words, assume product intent.
            if (lowerQuery.split(' ').length > 2 || qualityMatches.some(k => k !== 'good')) {
                score += 5;
                shouldSearch = true; // Quality usually implies researching
                detectedIntents.push('QUALITY_INTENT');
            }
        }

        // 3. FILTER Matches (Ranking/Scoring)
        const filterMatches = this.KEYWORDS.FILTER.filter(k => lowerQuery.includes(k));
        if (filterMatches.length > 0) {
            score += 3;
            detectedIntents.push('FILTER_INTENT');
        }

        // 4. NEGATIVE Matches (Force Validation)
        const negativeMatches = this.KEYWORDS.NEGATIVE.filter(k => lowerQuery.includes(k));
        if (negativeMatches.length > 0) {
            score += 5;
            deepAnalysis = true; // Need to verify if it's actually bad
            shouldSearch = true;
            detectedIntents.push('NEGATIVE_INTENT');
        }

        // 5. Greeting Exclusion
        // Prevent "Good Morning", "Good Night" from triggering search
        if (lowerQuery.startsWith('good morning') || lowerQuery.startsWith('good night') || lowerQuery.startsWith('hello') || lowerQuery === 'hi') {
            shouldSearch = false;
            deepAnalysis = false;
            score = 0;
        }

        return {
            shouldSearch,
            deepAnalysis,
            score,
            keywords: [...strongMatches, ...qualityMatches, ...filterMatches, ...negativeMatches],
            intents: detectedIntents
        };
    }
};
