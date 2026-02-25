/**
 * @file SearchService.js
 * @description Core functionality for SearchService.
 * Handles the primary logic and responsibilities designated for this module.
 * 
 * @context Core Service (Background/Agent Logic provider)
 */

export const SearchService = {
    async search(query, signal) {
        let results = [];
        try {
            console.log("SearchService: Searching DDG HTML for", query);
            const response = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
                method: 'GET',
                signal: signal,
                headers: {
                    // Update User-Agent to look more like a standard browser request
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Sec-Ch-Ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
                    'Sec-Ch-Ua-Mobile': '?0',
                    'Sec-Ch-Ua-Platform': '"Windows"'
                }
            });

            if (response.ok) {
                const text = await response.text();
                results = this.parseDuckDuckGoHTML(text);
            } else {
                console.warn(`[SearchService] DDG HTML returned status: ${response.status}`);
            }
        } catch (error) {
            console.error("SearchService HTML Error:", error);
        }

        // Fallback: DuckDuckGo API (Instant Answer)
        if (results.length === 0) {
            try {
                console.log("SearchService: Falling back to DDG API");
                const apiResponse = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`, { signal: signal });
                if (apiResponse.ok) {
                    const text = await apiResponse.text();

                    // Guard against non-JSON or partial responses
                    if (!text || text.trim() === '' || text.startsWith('<')) {
                        console.warn("SearchService: DDG API returned invalid/empty response. Skipping.");
                    } else {
                        try {
                            const data = JSON.parse(text);
                            if (data.Abstract || data.Heading) {
                                results.push({
                                    title: data.Heading || query,
                                    link: data.AbstractURL || data.Image || 'https://duckduckgo.com',
                                    snippet: data.Abstract || data.Answer || 'Instant Answer found.'
                                });
                            }
                            if (data.RelatedTopics) {
                                data.RelatedTopics.slice(0, 3).forEach(topic => {
                                    if (topic.Text && topic.FirstURL) {
                                        results.push({
                                            title: topic.Text.split('-')[0].trim(),
                                            link: topic.FirstURL,
                                            snippet: topic.Text
                                        });
                                    }
                                });
                            }
                        } catch (parseError) {
                            console.error("SearchService API Parse Error:", parseError, text.substring(0, 50));
                        }
                    }
                }
            } catch (e) {
                console.error("SearchService API Network Error:", e);
            }
        }

        return results;
    },

    parseDuckDuckGoHTML(html) {
        const results = [];

        // Robust Regex: Scan for links with class "result__a"
        const linkPattern = /<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi;
        const links = [...html.matchAll(linkPattern)];

        for (const match of links.slice(0, 8)) { // Get top 8, filter later
            try {
                const rawLink = match[1];
                let link = rawLink;

                if (link.startsWith('//duckduckgo.com/l/')) {
                    const urlParams = new URLSearchParams(link.split('?')[1]);
                    link = decodeURIComponent(urlParams.get('uddg'));
                }

                // FILTER: Skip DuckDuckGo ad/tracking links
                if (!link || link.includes('duckduckgo.com/y.js') ||
                    link.includes('duckduckgo.com/l/?') ||
                    link.includes('/ad_click') ||
                    link.includes('ad_provider=') ||
                    link.includes('ad_domain=') ||
                    link.startsWith('//duckduckgo.com') ||
                    link.startsWith('https://duckduckgo.com/y.js')) {
                    continue;
                }

                // FILTER: Skip non-http links
                if (!link.startsWith('http://') && !link.startsWith('https://')) {
                    continue;
                }

                const title = this.decodeHtml(match[2]);

                // Try to find a snippet after this link match
                const restOfHtml = html.substring(match.index + match[0].length);
                const snippetMatch = restOfHtml.match(/<a[^>]*class="[^"]*result__snippet[^"]*"[^>]*>(.*?)<\/a>/);
                const snippet = snippetMatch ? this.decodeHtml(snippetMatch[1]) : '';

                results.push({ title, link, snippet });

                if (results.length >= 6) break; // Cap at 6 clean results
            } catch (e) {
                // skip bad result
            }
        }

        return results;
    },

    decodeHtml(html) {
        return html
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&#39;/g, "'")
            .replace(/<b>/g, "")
            .replace(/<\/b>/g, "")
            .replace(/<[^>]*>/g, ""); // Strip other tags
    },

    async fetchPageContent(url) {
        try {
            // Skip known bad URLs
            if (url.includes('duckduckgo.com') || url.includes('y.js') || url.includes('ad_provider=')) {
                console.warn("[SearchService] Skipping fetch for ad/tracker URL:", url);
                return null;
            }

            console.log("SearchService: Fetching content for Deep Research", url);
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 5000); // 5s timeout

            const response = await fetch(url, {
                signal: controller.signal,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; NovaAgent/1.0)'
                }
            });
            clearTimeout(id);

            if (!response.ok) return null;

            const contentType = response.headers.get('content-type') || '';
            if (!contentType.includes('text/html') && !contentType.includes('text/plain')) {
                console.warn("[SearchService] Skipping non-text content:", contentType);
                return null;
            }

            const html = await response.text();

            // Naive Text Extraction (Script/Style removal)
            const cleanText = html
                .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, " ")
                .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, " ")
                .replace(/<[^>]+>/g, "\n") // Replace tags with newlines
                .replace(/\s+/g, " ") // Collapse whitespace
                .trim()
                .substring(0, 15000); // Limit context

            return cleanText;
        } catch (e) {
            console.warn("Deep Fetch Failed:", url, e.message);
            return null;
        }
    }
};
