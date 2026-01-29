
export const SearchService = {
    async search(query) {
        let results = [];
        try {
            console.log("SearchService: Searching DDG HTML for", query);
            const response = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
                method: 'GET',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });

            if (response.ok) {
                const text = await response.text();
                results = this.parseDuckDuckGoHTML(text);
            }
        } catch (error) {
            console.error("SearchService HTML Error:", error);
        }

        // Fallback: DuckDuckGo API (Instant Answer)
        if (results.length === 0) {
            try {
                console.log("SearchService: Falling back to DDG API");
                const apiResponse = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
                if (apiResponse.ok) {
                    const data = await apiResponse.json();
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
                }
            } catch (e) {
                console.error("SearchService API Error:", e);
            }
        }

        return results;
    },

    parseDuckDuckGoHTML(html) {
        const results = [];

        // Robust Regex: Scan for links with class "result__a"
        // Then try to find the snippet close to it.
        const linkPattern = /<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi;
        const links = [...html.matchAll(linkPattern)];

        for (const match of links.slice(0, 5)) { // Top 5
            try {
                const rawLink = match[1];
                let link = rawLink;
                if (link.startsWith('//duckduckgo.com/l/')) {
                    const urlParams = new URLSearchParams(link.split('?')[1]);
                    link = decodeURIComponent(urlParams.get('uddg'));
                }

                const title = this.decodeHtml(match[2]);

                // Try to find a snippet after this link match
                // We look ahead in the HTML string for class="result__snippet"
                // This is a naive heuristic but works if structure is sequential
                const restOfHtml = html.substring(match.index + match[0].length);
                const snippetMatch = restOfHtml.match(/<a[^>]*class="[^"]*result__snippet[^"]*"[^>]*>(.*?)<\/a>/);
                const snippet = snippetMatch ? this.decodeHtml(snippetMatch[1]) : '';

                results.push({ title, link, snippet });
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
