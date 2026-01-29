
import { StorageService } from './StorageService';

export const FirewallService = {
    async init() {
        await this.updateRules();

        // Listen for storage changes to update rules dynamically
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
            chrome.storage.onChanged.addListener((changes, area) => {
                if (area === 'local' && (changes.firewall_settings || changes.firewall_active)) {
                    this.updateRules();
                }
            });
        }
    },

    async updateRules() {
        if (typeof chrome === 'undefined' || !chrome.declarativeNetRequest) return;

        const settings = await StorageService.getGlobal('firewall_settings') || {
            mode: 'off', // off, allow_only, block_list
            blockList: [],
            allowList: []
        };

        const mode = settings.mode || 'off';
        const blockList = settings.blockList || [];
        const allowList = settings.allowList || [];

        console.log('[Firewall] Updating rules. Mode:', mode);

        // Clear existing dynamic rules
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
        const existingRuleIds = existingRules.map(rule => rule.id);
        await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds: existingRuleIds });

        if (mode === 'off') return;

        let newRules = [];
        let idCounter = 1;

        if (mode === 'block_list') {
            // Block domains in list
            for (const domain of blockList) {
                if (!domain) continue;
                newRules.push({
                    id: idCounter++,
                    priority: 1,
                    action: { type: 'block' },
                    condition: {
                        urlFilter: `||${domain}`,
                        resourceTypes: ['main_frame', 'sub_frame', 'xmlhttprequest']
                    }
                });
            }
        } else if (mode === 'allow_only') {
            // 1. Block Everything (Low Priority)
            newRules.push({
                id: idCounter++,
                priority: 1,
                action: { type: 'block' },
                condition: { urlFilter: "*" }
            });

            // 2. Allow List (High Priority)
            for (const domain of allowList) {
                if (!domain) continue;
                newRules.push({
                    id: idCounter++,
                    priority: 2, // Higher priority overrides block
                    action: { type: 'allow' },
                    condition: {
                        urlFilter: `||${domain}`,
                        resourceTypes: ['main_frame', 'sub_frame', 'xmlhttprequest']
                    }
                });
            }
        }

        if (newRules.length > 0) {
            await chrome.declarativeNetRequest.updateDynamicRules({ addRules: newRules });
            console.log(`[Firewall] Applied ${newRules.length} rules.`);
        }
    },
    async checkUrl(url) {
        if (!url) return true;
        const settings = await StorageService.getGlobal('firewall_settings');
        if (!settings || !settings.mode || settings.mode === 'off') return true;

        let hostname;
        try {
            hostname = new URL(url).hostname;
        } catch (e) {
            return false; // Invalid URL
        }

        if (settings.mode === 'block_list') {
            const blockList = settings.blockList || [];
            // If hostname contains any blocked domain
            return !blockList.some(domain => hostname.includes(domain));
        }

        if (settings.mode === 'allow_only') {
            const allowList = settings.allowList || [];
            // Must match one allowed domain
            return allowList.some(domain => hostname.includes(domain));
        }

        return true;
    }
};
