// Cart DOM Automation Protocol — Enhanced for Amazon, Flipkart, and generic e-commerce

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'scanOptions') {
        const optionsText = scanPageForOptions();
        sendResponse({ data: optionsText });
        return true;
    } else if (request.action === 'executeClicks') {
        const result = clickElements(request.clicks);
        sendResponse({ success: true, log: result });
        return true;
    }
});

function scanPageForOptions() {
    let data = [];

    // Scan generic option-looking elements (colors, sizes, storage, checkboxes, coupons)
    const selectors = [
        'button', 'label', 'select', '.swatch', '[role="button"]',
        '.a-button-text', '[class*="coupon"]', '[id*="coupon"]',
        '[class*="Color"]', '[class*="Size"]',
        '#add-to-cart-button', '#buy-now-button',
        'input[type="submit"]', 'span.a-button-inner'
    ];

    const nodes = document.querySelectorAll(selectors.join(', '));
    nodes.forEach(n => {
        let text = n.innerText || n.value || n.getAttribute('title') || "";
        text = text.trim();
        if (text && text.length > 1 && text.length < 50 && !data.includes(text)) {
            data.push(text);
        }
    });

    return data.join(' | ').substring(0, 3000);
}

function clickElements(clickTexts) {
    let log = [];
    let clickedCart = false;

    clickTexts.forEach(textToFind => {
        const searchTerm = textToFind.toLowerCase().trim();

        // PRIORITY 1: Amazon-specific known IDs for Add to Cart / Buy Now
        if (searchTerm.includes('add to cart') || searchTerm.includes('cart')) {
            const amazonCartBtn = document.querySelector('#add-to-cart-button') ||
                document.querySelector('input[name="submit.add-to-cart"]') ||
                document.querySelector('#submit\\.add-to-cart');
            if (amazonCartBtn) {
                forceClick(amazonCartBtn);
                log.push(`Clicked Amazon "Add to Cart" button (#add-to-cart-button)`);
                clickedCart = true;
                return;
            }
        }
        if (searchTerm.includes('buy now') || searchTerm.includes('buy')) {
            const amazonBuyBtn = document.querySelector('#buy-now-button') ||
                document.querySelector('input[name="submit.buy-now"]');
            if (amazonBuyBtn) {
                forceClick(amazonBuyBtn);
                log.push(`Clicked Amazon "Buy Now" button (#buy-now-button)`);
                clickedCart = true;
                return;
            }
        }

        // PRIORITY 2: Flipkart-specific
        if (searchTerm.includes('add to cart') || searchTerm.includes('cart')) {
            const flipkartCartBtn = Array.from(document.querySelectorAll('button'))
                .find(b => b.innerText.toLowerCase().includes('add to cart'));
            if (flipkartCartBtn) {
                forceClick(flipkartCartBtn);
                log.push(`Clicked Flipkart "Add to Cart" button`);
                clickedCart = true;
                return;
            }
        }

        // PRIORITY 3: Generic text match (for all other options like color, size, coupon)
        const allElements = Array.from(document.querySelectorAll(
            'button, a, label, input, .a-button-text, .swatch, div[role="button"], span.a-button-inner, [class*="box"], input[type="submit"]'
        ));
        const target = allElements.find(el => {
            const elText = (el.innerText || el.value || el.getAttribute('title') || "").toLowerCase().trim();
            return elText === searchTerm || elText.includes(searchTerm);
        });

        if (target) {
            forceClick(target);
            log.push(`Clicked: "${textToFind}"`);
            if (searchTerm.includes('cart') || searchTerm.includes('buy')) clickedCart = true;
        } else {
            log.push(`Failed to find: "${textToFind}"`);
        }
    });

    // FALLBACK: Auto-click Add to Cart if nothing else triggered it
    if (!clickedCart) {
        const atcButton = findAddToCartButton();
        if (atcButton) {
            forceClick(atcButton);
            log.push("Auto-clicked 'Add to Cart' button.");
        } else {
            log.push("Could not find any 'Add to Cart' or 'Buy Now' button on this page.");
        }
    }

    return log.join('\n');
}

// Find the Add to Cart / Buy Now button on the page using multiple strategies
function findAddToCartButton() {
    // Strategy 1: Known Amazon IDs
    const amazonBtn = document.querySelector('#add-to-cart-button') ||
        document.querySelector('#buy-now-button') ||
        document.querySelector('input[name="submit.add-to-cart"]');
    if (amazonBtn) return amazonBtn;

    // Strategy 2: inputs with cart/buy value
    const inputs = Array.from(document.querySelectorAll('input[type="submit"], input[type="button"]'));
    const cartInput = inputs.find(el => {
        const val = (el.value || "").toLowerCase();
        return val.includes('add to cart') || val.includes('add to bag') || val.includes('buy now');
    });
    if (cartInput) return cartInput;

    // Strategy 3: buttons with cart/buy text
    const buttons = Array.from(document.querySelectorAll('button, a, [role="button"]'));
    const cartButton = buttons.find(el => {
        const text = (el.innerText || "").toLowerCase().trim();
        return text === 'add to cart' || text === 'buy now' || text === 'add to bag' || text.includes('add to cart');
    });
    if (cartButton) return cartButton;

    return null;
}

// Force click: uses multiple methods to ensure the click registers
function forceClick(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Wait a tiny bit for scroll, then click with multiple methods
    setTimeout(() => {
        // Method 1: Native click
        element.click();

        // Method 2: Dispatch MouseEvent (for elements that use addEventListener)
        element.dispatchEvent(new MouseEvent('click', {
            view: window, bubbles: true, cancelable: true
        }));

        // Method 3: For input[type="submit"], also try form submission
        if (element.tagName === 'INPUT' && element.type === 'submit') {
            const form = element.closest('form');
            if (form) {
                try {
                    form.submit();
                } catch (e) {
                    // Form might have validation, ignore
                }
            }
        }
    }, 300);
}
