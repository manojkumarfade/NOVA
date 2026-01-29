
import { LLMClient } from '../services/LLMClient';
import { Observer } from '../services/Observer';

export class RecoveryEngine {
    constructor() {
        this.maxRetries = 2; // Hard constraint from requirements
        this.retryCounts = {}; // Track retries per goal/step
    }

    /**
     * Verifies if the last action had the desired effect.
     * @param {object} previousState - State before action
     * @param {object} currentState - State after action
     * @param {object} lastAction - Action that was executed
     * @returns {object} { success: boolean, errorType: string, reason: string }
     */
    static verifyOutcome(previousState, currentState, lastAction) {
        // 1. Trivial Check: Did URL change for NAVIGATE?
        if (lastAction.action === 'NAVIGATE') {
            if (previousState.url === currentState.url && !currentState.url.includes(lastAction.value)) {
                return { success: false, errorType: 'navigation_failed', reason: 'URL did not change after navigation.' };
            }
        }

        // 2. Trivial Check: Did Input value change for TYPE?
        if (lastAction.action === 'TYPE' && lastAction.id) {
            // We would need to re-find the element to check its value.
            // This is hard to do purely from state comparisons unless state includes all values.
            // For now, we rely on the fact that if it didn't crash, it likely typed.
            // A more robust check would be to read the element value in currentState.
            const el = currentState.interactives?.find(i => i.id === lastAction.id);
            if (el && el.value !== lastAction.value && el.tagName === 'INPUT') {
                // Weak check, might be partial type or formatted.
                // return { success: false, errorType: 'typing_failed', reason: 'Input value mismatch.' };
            }
        }

        // 3. Error Page Detection
        const lowerText = (currentState.textContext || "").toLowerCase();
        if (lowerText.includes("404 not found") ||
            lowerText.includes("this site can't be reached") ||
            lowerText.includes("access denied")) {
            return { success: false, errorType: 'navigation_blocked', reason: 'Browser shows error page.' };
        }

        // 4. Captcha Detection
        if (lowerText.includes("verify you are human") ||
            lowerText.includes("captcha") ||
            lowerText.includes("robot check")) {
            return { success: false, errorType: 'captcha_detected', reason: 'CAPTCHA detected.' };
        }

        // 5. Popup blocking view (Simple heuristic: heavy overlay or modal keywords)
        // This is tricky without visual model. We'll rely on semantic checks later.

        return { success: true };
    }

    /**
     * Orchestrates the recovery process.
     * @param {string} errorType - Type of failure
     * @param {string} userGoal - Original user request
     * @param {object} lastAction - Failed action
     * @param {string} currentUrl - Current URL
     * @param {string} pageContext - Text content of page
     * @returns {Promise<object>} New Plan / Action
     */
    async recover(errorType, userGoal, lastAction, currentUrl, pageContext) {
        console.warn(`RecoveryEngine: Recovering from ${errorType}`);

        // 1. Check retry limits
        const key = `${currentUrl}-${lastAction.action}`;
        this.retryCounts[key] = (this.retryCounts[key] || 0) + 1;

        if (this.retryCounts[key] > this.maxRetries) {
            throw new Error(`Recovery failed twice for ${lastAction.action}. Aborting task.`);
        }

        // 2. Construct Prompt for LLM Recovery
        const recoveryPrompt = `
        CRITICAL FAILURE DETECTED.
        The Agent failed to execute an action. You must propose a fix.

        User Goal: "${userGoal}"
        Last Action: ${JSON.stringify(lastAction)}
        Failure Type: "${errorType}"
        Current URL: "${currentUrl}"
        Page Context Snippet: "${pageContext.substring(0, 500)}..."

        RECOVERY STRATEGIES:
        - element_not_found: The ID might have changed. Suggest looking for the element by TEXT or using a specific selector if you know one. OR suggest scrolling.
        - selector_changed: Suggest finding by text content.
        - navigation_blocked: Suggest a different site or search command.
        - timeout: Suggest refreshing or checking internet.
        - captcha_detected: Suggest "WAIT" to let user solve it, or "fail" if impossible.
        - site_interstitial: Suggest looking for "Close" or "X" button.

        OUTPUT:
        Provide the NEXT JSON Action to recover.
        Example: { "thought": "Selector failed, trying by text.", "action": "CLICK_TEXT", "text": "Add to Cart" }
        `;

        try {
            const response = await LLMClient.chatCompletion([
                { role: 'system', content: "You are a Recovery Specialist. Fix the broken agent execution." },
                { role: 'user', content: recoveryPrompt }
            ], null, { temperature: 0.1 });

            // Parse JSON
            const json = this._extractJSON(response);
            if (!json) throw new Error("LLM failed to provide valid recovery JSON");

            return JSON.parse(json);

        } catch (e) {
            console.error("Recovery Planning Failed", e);
            throw new Error("Self-healing system halted.");
        }
    }

    _extractJSON(str) {
        const match = str.match(/\{[\s\S]*\}/);
        return match ? match[0] : null;
    }
}

export const recoveryEngine = new RecoveryEngine();
