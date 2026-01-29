
import { supabase } from '../services/supabase';

export class SiteMemory {
    constructor() {
        this.memoryCache = new Map();
    }

    /**
     * Loads the site profile for a given domain.
     * @param {string} url 
     * @returns {Promise<object>} Site Profile
     */
    async loadProfile(url) {
        try {
            const domain = new URL(url).hostname;
            if (this.memoryCache.has(domain)) {
                return this.memoryCache.get(domain);
            }

            const { data, error } = await supabase
                .from('site_profiles')
                .select('*')
                .eq('domain', domain)
                .single();

            if (error || !data) {
                return null;
            }

            this.memoryCache.set(domain, data);
            return data;
        } catch (e) {
            console.warn("SiteMemory Load Failed", e);
            return null;
        }
    }

    /**
     * Updates the site profile with new learnings.
     * @param {string} url 
     * @param {object} learning - e.g. { closed_popup: true, effective_selector: '#foo' }
     */
    async updateProfile(url, learning) {
        try {
            const domain = new URL(url).hostname;
            const current = await this.loadProfile(url) || { domain, learnings: {} };

            // Merge learnings
            const newLearnings = { ...current.learnings, ...learning };

            const { error } = await supabase
                .from('site_profiles')
                .upsert({
                    domain: domain,
                    learnings: newLearnings,
                    updated_at: new Date()
                }, { onConflict: 'domain' });

            if (!error) {
                this.memoryCache.set(domain, { ...current, learnings: newLearnings });
            }
        } catch (e) {
            console.error("SiteMemory Update Failed", e);
        }
    }

    /**
     * Returns a system prompt hint based on memory.
     */
    getMemoryHint(profile) {
        if (!profile || !profile.learnings) return "";

        let hint = "\n[MEMORY ACTIVATED]:\n";
        if (profile.learnings.known_popup) {
            hint += "- ALERT: This site has a popup. Look for a close button early.\n";
        }
        if (profile.learnings.stable_search_selector) {
            hint += `- PREFERRED SEARCH: Use selector '${profile.learnings.stable_search_selector}'\n`;
        }
        return hint;
    }
}

export const siteMemory = new SiteMemory();
