
import { navigator } from '../agents/Navigator';

export class HybridCore {
    constructor() {
        // Configuration for deterministic behaviors
        this.config = {
            scrollSteps: 3,
            defaultWait: 2000
        };
    }

    /**
     * Executes an action deterministically.
     * Handles specific logic like "Scroll to find", "Click and Wait", etc.
     * @param {object} action - { action, id, value }
     * @param {Array} interactives - Current interactive elements
     * @param {number} tabId
     */
    async executeAction(action, interactives, tabId) {
        console.log("HybridCore: Dispatching", action.action);

        // 1. Pre-execution enhancements
        if (action.action === 'NAVIGATE') {
            // Standard navigation
            return await navigator.executeStep(action, interactives, tabId);
        }

        if (action.action === 'CLICK' || action.action === 'TYPE') {
            // Smart Element resolution is handled in Navigator (ID or fuzzy text)
            // We can add "Retry Stale" logic here if needed, but Navigator has it.

            const result = await navigator.executeStep(action, interactives, tabId);

            // 2. Post-action deterministic behaviors
            // e.g. If CLICK, we usually want to wait for network/DOM change.
            // We can check execution result to see if we should wait more.

            return result;
        }

        if (action.action === 'SCROLL') {
            // We can handle "Scroll until X" here if the action supported it.
            // For now, pass through.
            return await navigator.executeStep(action, interactives, tabId);
        }

        return await navigator.executeStep(action, interactives, tabId);
    }
}

export const hybridCore = new HybridCore();
