// Flash.co Automation Protocol

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startComparison') {
        runFlashAutomation(request.url)
            .then(data => sendResponse({ data }))
            .catch(err => sendResponse({ error: err.message }));

        return true; // Keep channel open
    }
});

async function runFlashAutomation(productUrl) {
    try {
        // 1. Find input
        const input = document.querySelector('input[type="url"], input[placeholder*="link"], input[type="text"]');
        if (!input) throw new Error("Could not find input field on Flash.co");

        // 2. Inject
        input.value = productUrl;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));

        // 3. Submit
        let submitBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.toLowerCase().includes('analyse') || b.innerText.toLowerCase().includes('analyze'));
        if (submitBtn) {
            submitBtn.click();
        } else {
            const form = input.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit', { bubbles: true }));
            } else {
                const btn = document.querySelector('button[type="submit"], button');
                if (btn) btn.click();
                else input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
            }
        }

        // 4. Wait for Loading States to finish (can take 30s+)
        await waitForResults();

        // 4.5. Scroll down to trigger lazy loading of stores and the 'View more' button
        window.scrollBy(0, 800);
        await sleep(2000);

        // 5. Click "View more stores" if exists (e.g. "View 5 more stores")
        const moreBtnText = ['view', 'more', 'store'];
        const moreBtn = Array.from(document.querySelectorAll('button, a, div[role="button"], div.cursor-pointer'))
            .find(el => {
                const text = el.innerText?.toLowerCase() || '';
                return (moreBtnText.every(word => text.includes(word)) || text.includes('load more')) && el.offsetHeight > 0;
            });

        if (moreBtn) {
            moreBtn.click();
            await sleep(3000); // give it time to load dynamic data
        }

        // 6. Extract Data robustly (looking for Buy Now buttons and their containers)
        const results = [];
        const seenUrls = new Set();

        // Grab elements containing price patterns
        const pricePattern = /\b(₹|Rs\.?|INR)\s*[\d,]+/;
        const elementsWithPrice = Array.from(document.querySelectorAll('*'))
            .filter(el => el.children.length === 0 && pricePattern.test(el.innerText));

        elementsWithPrice.forEach(priceEl => {
            let container = priceEl.parentElement;
            for (let i = 0; i < 5; i++) { // go up to 5 levels to find the whole store row
                if (!container) break;

                // Try to find the link within this container
                let linkEl = container.querySelector('a');

                if (linkEl && linkEl.href && !linkEl.href.includes('flash.co')) {
                    if (!seenUrls.has(linkEl.href)) {
                        // Attempt to parse out store name
                        const img = container.querySelector('img');
                        let storeName = img && img.alt ? img.alt : "Store";

                        if (storeName.toLowerCase() === 'logo' || storeName === 'store' || storeName === '') {
                            try {
                                storeName = new URL(linkEl.href).hostname.replace('www.', '').split('.')[0];
                                storeName = storeName.charAt(0).toUpperCase() + storeName.slice(1);
                            } catch (e) { storeName = 'Store'; }
                        }

                        results.push({
                            store: storeName,
                            price: priceEl.innerText.trim(),
                            url: linkEl.href
                        });
                        seenUrls.add(linkEl.href);
                    }
                    break;
                }
                container = container.parentElement;
            }
        });

        // Backup plan: Look specifically for Buy Now buttons text directly if the previous DOM walk failed
        if (results.length === 0) {
            const buyNowBtns = Array.from(document.querySelectorAll('a, button, div[role="button"]'))
                .filter(el => el.innerText.toLowerCase().includes('buy now') || el.innerText.toLowerCase().includes('buy'));

            buyNowBtns.forEach(btn => {
                let link = btn.href ? btn.href : (btn.closest('a') ? btn.closest('a').href : null);
                if (link && !link.includes('flash.co') && !seenUrls.has(link)) {
                    let container = btn.parentElement?.parentElement;
                    let price = "Check Store";
                    if (container) {
                        let priceMatch = container.innerText.match(/\b(₹|Rs\.?|INR)\s*[\d,]+/);
                        if (priceMatch) price = priceMatch[0];
                    }

                    let storeName = 'Store';
                    try {
                        storeName = new URL(link).hostname.replace('www.', '').split('.')[0];
                        storeName = storeName.charAt(0).toUpperCase() + storeName.slice(1);
                    } catch (e) { }

                    results.push({ store: storeName, price, url: link });
                    seenUrls.add(link);
                }
            });
        }

        // Extract AI Summary (Specs, Pros, Cons) if available
        let aiSummaryText = "";
        const aiSummaryContainers = Array.from(document.querySelectorAll('div'))
            .filter(el => el.innerText && el.innerText.includes('AI Recommendation') && el.innerText.includes('Key Strengths'));

        if (aiSummaryContainers.length > 0) {
            // Get the most specific container that holds the summary to avoid grabbing the whole page
            const summaryNode = aiSummaryContainers.sort((a, b) => a.innerText.length - b.innerText.length)[0];
            aiSummaryText = summaryNode.innerText.substring(0, 3000); // cap to 3000 chars to avoid token bloat
        }

        if (results.length === 0) {
            // Fallback: just scrape all text on the page as raw context
            return { raw: document.body.innerText.substring(0, 5000), aiSummary: aiSummaryText, note: "Could not neatly parse Flash.co elements" };
        }

        return { storesData: results, aiSummary: aiSummaryText };

    } catch (error) {
        throw error;
    }
}

function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

// Polling function to wait until loading indicators disappear
async function waitForResults() {
    const maxWait = 90000; // Increased to 90 seconds
    const start = Date.now();

    // CRITICAL FIX: Flash.co has a slight delay before the "Analyzing..." state begins.
    // Give it 10 seconds to definitely enter the loading state before we start checking if it's "done".
    await sleep(10000);

    while (Date.now() - start < maxWait) {
        const text = document.body.innerText.toLowerCase();
        const isLoading = text.includes('estimated time') ||
            text.includes('research progress') ||
            text.includes('checking') ||
            text.includes('fetching') ||
            text.includes('analysing') ||
            document.querySelector('.spinner, .loader, [role="progressbar"]');

        const hasLinks = document.querySelectorAll('a[href*="amazon"], a[href*="flipkart"], div[class*="Store"]').length > 0;

        // Ensure we actually see the stores and that we've waited at least 15 seconds!
        if (!isLoading && hasLinks && text.includes('₹') && (Date.now() - start > 15000)) {
            // Looks like results have genuinely finished loading
            await sleep(3000); // Give DOM a moment to settle
            return true;
        }

        await sleep(3000);
    }

    // Timeout reached, just try extracting whatever is there
    return true;
}
