import { supabase } from './supabase';

let currentPrefix = 'guest_';

export const StorageService = {
    setPrefix(prefix) {
        currentPrefix = prefix || 'guest_';
        console.log('[StorageService] Switched prefix to:', currentPrefix);
    },

    getPrefix() {
        return currentPrefix;
    },

    /**
     * Helper to check if user is logged in and get user ID
     */
    async _getUser() {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            return session?.user || null;
        } catch (e) {
            return null;
        }
    },

    // Standard methods - apply prefix
    async get(key, defaultValue) {
        const user = await this._getUser();

        // 1. Try Supabase (Priority: Cloud Account)
        if (user) {
            try {
                const { data, error } = await supabase
                    .from('user_data')
                    .select('value')
                    .eq('user_id', user.id)
                    .eq('key', key)
                    .single();

                if (data?.value !== undefined) return data.value;
            } catch (e) {
                console.error('[StorageService] Supabase get error:', e);
            }
        }

        // 2. Try Chrome Sync (Extension Sync) - [NEW] Backup for multi-device sync without specific login
        // Only for specific keys to avoid quota limits
        if (key === 'llm_providers' || key === 'model_settings' || key === 'image_settings') {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                try {
                    const result = await chrome.storage.sync.get(key);
                    if (result[key] !== undefined) {
                        console.log(`[StorageService] Recovered ${key} from Chrome Sync`);
                        return result[key];
                    }
                } catch (e) { /* ignore */ }
            }
        }

        // 3. Fallback: Guest / Local
        const prefixedKey = currentPrefix + key;
        return this.getGlobal(prefixedKey, defaultValue);
    },

    async set(key, value) {
        // [NEW] Always save to Chrome Sync for critical settings (Best Effort)
        if (key === 'llm_providers' || key === 'model_settings' || key === 'image_settings') {
            if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
                try {
                    // Check size to avoid quota errors (8KB limit per item usually)
                    const size = new Blob([JSON.stringify(value)]).size;
                    if (size < 8000) {
                        chrome.storage.sync.set({ [key]: value });
                        console.log(`[StorageService] Synced ${key} to Chrome Storage`);
                    } else {
                        console.warn(`[StorageService] ${key} too large for Chrome Sync (${size} bytes)`);
                    }
                } catch (e) { console.warn("Chrome Sync set failed", e); }
            }
        }

        const user = await this._getUser();
        if (user) {
            // Logged in: Save to Supabase
            try {
                const { error } = await supabase
                    .from('user_data')
                    .upsert({
                        user_id: user.id,
                        key: key,
                        value: value,
                        updated_at: new Date()
                    }, { onConflict: 'user_id,key' });

                if (error) {
                    console.error('[StorageService] Supabase set error:', error);
                    return false;
                }
                return true;
            } catch (e) {
                console.error('[StorageService] Supabase set exception:', e);
                return false;
            }
        } else {
            // Guest: Save to Local Storage
            const prefixedKey = currentPrefix + key;
            return this.setGlobal(prefixedKey, value);
        }
    },

    async remove(key) {
        const user = await this._getUser();
        if (user) {
            // Logged in: Delete from Supabase
            try {
                const { error } = await supabase
                    .from('user_data')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('key', key);

                if (error) console.error('[StorageService] Supabase remove error:', error);
                return !error;
            } catch (e) {
                return false;
            }
        } else {
            // Guest: Remove from Local
            const prefixedKey = currentPrefix + key;
            return this.removeGlobal(prefixedKey);
        }
    },

    async clear() {
        // Caution: Clearing valid cloud data might be dangerous. 
        // For now, let's implement it as clearing the current context's data if possible.
        // But typically 'clear' in extensions was for local cleanup.
        // We will skip implementing cloud-wipe for safety unless explicitly requested.

        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            const all = await chrome.storage.local.get(null);
            const keysToRemove = Object.keys(all).filter(k => k.startsWith(currentPrefix));
            await chrome.storage.local.remove(keysToRemove);
            return true;
        }
        return false;
    },

    // Global methods - ignore prefix (for Auth, Settings that are shared)
    // NOTE: Global methods might still want to use Supabase if they are user-specific settings?
    // But usually 'Global' implied 'Device Specific' or 'Shared across profiles'.
    // We'll keep Global as Local-Only for now (e.g., ensuring auth tokens are stored locally by Supabase client itself).
    async getGlobal(key, defaultValue) {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            try {
                const result = await chrome.storage.local.get(key);
                return result[key] !== undefined ? result[key] : defaultValue;
            } catch (e) {
                console.error('Storage get error:', e);
                return defaultValue;
            }
        }
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch {
            return defaultValue;
        }
    },

    async setGlobal(key, value) {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            try {
                await chrome.storage.local.set({ [key]: value });
                return true;
            } catch (e) {
                console.error('Storage set error:', e);
                return false;
            }
        }
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },

    async removeGlobal(key) {
        if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
            await chrome.storage.local.remove(key);
            return true;
        }
        localStorage.removeItem(key);
        return true;
    }
};
