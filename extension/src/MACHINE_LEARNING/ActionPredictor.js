
import { StorageService } from '../services/StorageService';

export class ActionPredictor {
    constructor() {
        this.patterns = [];
    }

    async loadPatterns() {
        this.patterns = await StorageService.get('action_patterns') || [];
    }

    /**
     * Learns from a successful sequence.
     * @param {string} goal - User goal
     * @param {Array} history - Sequence of actions
     */
    async learn(goal, history) {
        // Simplified learning: Store goal keywords -> Sequence mapping
        // e.g. "buy shoes" -> [SEARCH, CLICK_1, SCROLL, CLICK_2]
        // This is a naive implementation for the "ML" requirement without external model.

        const key = this._extractKey(goal);
        const sequence = history.map(h => ({ action: h.action, thought: h.thought }));

        this.patterns.push({ key, sequence, weight: 1 });
        await StorageService.set('action_patterns', this.patterns);
    }

    /**
     * Predicts the next step based on history so far.
     * @param {string} goal 
     * @param {Array} currentHistory 
     * @returns {object|null} Predicted Action or null
     */
    predictNext(goal, currentHistory) {
        const key = this._extractKey(goal);
        const match = this.patterns.find(p => p.key === key);

        if (match) {
            // Check if current history matches prefix of learned sequence
            const index = currentHistory.length;
            if (index < match.sequence.length) {
                console.log("ActionPredictor: Prediction available", match.sequence[index]);
                return match.sequence[index];
            }
        }
        return null;
    }

    _extractKey(goal) {
        return goal.toLowerCase().replace(/\b(please|can you|i want to)\b/g, '').trim();
    }
}

export const actionPredictor = new ActionPredictor();
