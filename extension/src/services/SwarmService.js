
export const SwarmService = {
    // Track active swarm tabs
    _activeTabs: [],

    /**
     * Spawns tabs with concurrency control. Does NOT auto-close tabs.
     * @param {string[]} urls - List of URLs to visit
     * @param {Function} extractorFunc - Function to execute on each page
     * @param {number} maxConcurrent - Max tabs loading simultaneously (default 3)
     * @param {number} timeoutMs - Max time to wait for each page load (default 20s)
     * @param {Function} onTabProgress - Callback for per-tab status updates
     * @returns {Promise<Array<{url, result, status, tabId}>>}
     */
    async spawnWithConcurrency(urls, extractorFunc, maxConcurrent = 3, timeoutMs = 20000, onTabProgress = null) {
        console.log(`[Swarm] Spawning ${urls.length} workers (max ${maxConcurrent} concurrent)...`);
        const results = [];
        const queue = [...urls];
        const activeWorkers = new Set();

        const processNext = async () => {
            if (queue.length === 0) return;
            const url = queue.shift();
            const tabIndex = urls.indexOf(url);

            try {
                // Report: creating tab
                onTabProgress?.(tabIndex, 'loading', { url });

                const tab = await this._createTab(url);
                this._activeTabs.push(tab.id);
                activeWorkers.add(tab.id);

                // Wait for load
                onTabProgress?.(tabIndex, 'loading', { url, tabId: tab.id });
                await this._waitForLoad(tab.id, timeoutMs);

                // Extract data
                onTabProgress?.(tabIndex, 'extracting', { url, tabId: tab.id });
                const result = await this._processTab(tab, extractorFunc, 5000);

                results.push({
                    url: tab.url || url,
                    result: result.result,
                    status: result.status,
                    tabId: tab.id
                });

                onTabProgress?.(tabIndex, result.status === 'success' ? 'done' : 'failed', {
                    url: tab.url || url,
                    tabId: tab.id,
                    data: result.result
                });

            } catch (e) {
                console.warn(`[Swarm] Worker for ${url} failed:`, e.message);
                results.push({
                    url,
                    error: e.message,
                    status: 'failed',
                    tabId: null
                });
                onTabProgress?.(tabIndex, 'failed', { url, error: e.message });
            } finally {
                activeWorkers.delete(urls.indexOf(url));
            }
        };

        // Process with concurrency limit
        const workers = [];
        for (let i = 0; i < Math.min(maxConcurrent, urls.length); i++) {
            workers.push(this._runWorkerChain(queue, urls, extractorFunc, timeoutMs, onTabProgress, results));
        }
        await Promise.all(workers);

        console.log(`[Swarm] Harvest complete. Success: ${results.filter(r => r.status === 'success').length}/${results.length}. Tabs kept alive.`);
        return results;
    },

    /**
     * Worker chain: processes URLs sequentially from the queue
     */
    async _runWorkerChain(queue, allUrls, extractorFunc, timeoutMs, onTabProgress, results) {
        while (queue.length > 0) {
            const url = queue.shift();
            const tabIndex = allUrls.indexOf(url);

            try {
                onTabProgress?.(tabIndex, 'loading', { url });
                const tab = await this._createTab(url);
                this._activeTabs.push(tab.id);

                await this._waitForLoad(tab.id, timeoutMs);
                onTabProgress?.(tabIndex, 'extracting', { url, tabId: tab.id });

                const result = await this._processTab(tab, extractorFunc, 5000);
                results.push({
                    url: tab.url || url,
                    result: result.result,
                    status: result.status,
                    tabId: tab.id
                });

                onTabProgress?.(tabIndex, result.status === 'success' ? 'done' : 'failed', {
                    url: tab.url || url,
                    tabId: tab.id,
                    data: result.result
                });
            } catch (e) {
                results.push({ url, error: e.message, status: 'failed', tabId: null });
                onTabProgress?.(tabIndex, 'failed', { url, error: e.message });
            }
        }
    },

    /**
     * Legacy: Spawns all tabs at once and auto-terminates (backward compat)
     */
    async spawn(urls, extractorFunc, timeoutMs = 15000) {
        console.log(`[Swarm] Spawning ${urls.length} workers...`);
        const tabPromises = urls.map(url => this._createTab(url));
        const tabs = await Promise.all(tabPromises);
        const harvestPromises = tabs.map(tab => this._processTab(tab, extractorFunc, timeoutMs));
        const results = await Promise.all(harvestPromises);
        // NOTE: No longer auto-terminates tabs
        this._activeTabs.push(...tabs.map(t => t.id));
        console.log(`[Swarm] Harvest complete. Success: ${results.filter(r => r.status === 'success').length}/${results.length}`);
        return results;
    },

    async _createTab(url) {
        return await chrome.tabs.create({ url, active: false });
    },

    async _processTab(tab, extractorFunc, timeout) {
        const tabId = tab.id;
        try {
            // Check if tab URL is valid for scripting
            const tabInfo = await chrome.tabs.get(tabId);
            if (!tabInfo || !tabInfo.url || tabInfo.url.startsWith('chrome://') || tabInfo.url.startsWith('chrome-extension://') || tabInfo.url.startsWith('about:')) {
                return { url: tabInfo?.url, result: null, status: 'failed' };
            }

            const result = await chrome.scripting.executeScript({
                target: { tabId },
                func: extractorFunc
            });

            return {
                url: tab.url || "unknown",
                result: result[0]?.result,
                status: 'success'
            };
        } catch (e) {
            console.warn(`[Swarm] Worker ${tabId} failed:`, e.message);
            return {
                url: tab.url,
                error: e.message,
                status: e.message.includes("Timeout") ? 'timeout' : 'failed'
            };
        }
    },

    _waitForLoad(tabId, timeout) {
        return new Promise((resolve, reject) => {
            let isResolved = false;
            const timer = setTimeout(() => {
                if (!isResolved) {
                    isResolved = true;
                    chrome.tabs.onUpdated.removeListener(listener);
                    reject(new Error("Timeout waiting for page load"));
                }
            }, timeout);

            const listener = (tid, changeInfo, tab) => {
                if (tid === tabId && changeInfo.status === 'complete') {
                    isResolved = true;
                    clearTimeout(timer);
                    chrome.tabs.onUpdated.removeListener(listener);
                    resolve(tab);
                }
            };

            chrome.tabs.onUpdated.addListener(listener);

            chrome.tabs.get(tabId, (t) => {
                if (t && t.status === 'complete') {
                    if (!isResolved) {
                        isResolved = true;
                        clearTimeout(timer);
                        chrome.tabs.onUpdated.removeListener(listener);
                        resolve(t);
                    }
                }
            });
        });
    },

    /**
     * Returns list of currently managed swarm tab IDs (alive)
     */
    getOpenTabs() {
        return [...this._activeTabs];
    },

    /**
     * Manually close all swarm tabs (user-triggered cleanup)
     */
    async terminateAll() {
        if (this._activeTabs.length > 0) {
            try {
                await chrome.tabs.remove(this._activeTabs);
            } catch (e) { /* ignore if already closed */ }
            this._activeTabs = [];
        }
    }
};
