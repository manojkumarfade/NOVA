
import { StorageService } from '../services/StorageService';

export class AgentReplay {
    constructor() {
        this.currentRun = [];
        this.runId = null;
    }

    startRun() {
        this.runId = Date.now().toString();
        this.currentRun = [];
        console.log("AgentReplay: Recording started", this.runId);
    }

    logStep(stepData) {
        // stepData: { action, stateHash, thought, timestamp, screenshot? }
        const entry = {
            ...stepData,
            timestamp: Date.now()
        };
        this.currentRun.push(entry);
    }

    async saveRun() {
        if (!this.runId || this.currentRun.length === 0) return;

        try {
            // Persist to Local Storage for "Time Travel" UI
            // We keep last 5 runs
            const history = await StorageService.get('replay_history') || [];
            history.unshift({
                id: this.runId,
                date: new Date().toISOString(),
                steps: this.currentRun
            });

            // Limit to 5
            if (history.length > 5) history.pop();

            await StorageService.set('replay_history', history);
            console.log("AgentReplay: Run saved.");
        } catch (e) {
            console.error("AgentReplay: Save Failed", e);
        }
    }

    async getHistory() {
        return await StorageService.get('replay_history') || [];
    }
}

export const agentReplay = new AgentReplay();
