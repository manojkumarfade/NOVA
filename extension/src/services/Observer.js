
// Observer Service - Injected into the page to extract state with "Set-of-Mark" tags
export const Observer = {
    getBrowserState: function () {
        // 1. Cleanup old attributes/tags
        document.querySelectorAll('[data-rockett-id]').forEach(el => el.removeAttribute('data-rockett-id'));
        const tags = document.querySelectorAll('.agent-id-tag');
        tags.forEach(e => e.remove());

        // 2. Find all interactive elements (Aligned with domOverlay.js)
        const elements = document.querySelectorAll("button,a,input,textarea,select,[role='button'],[role='link'],[onclick]");
        const interactiveMap = [];
        let idCounter = 1; // Start at 1 to match domOverlay.js

        elements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            // Only tag elements that are actually visible on screen (Aligned with domOverlay.js logic)
            if (
                rect.width >= 10 &&
                rect.height >= 10 &&
                rect.bottom > 0 &&
                rect.right > 0 &&
                rect.top < window.innerHeight &&
                rect.left < window.innerWidth &&
                getComputedStyle(el).visibility !== 'hidden' &&
                getComputedStyle(el).display !== 'none'
            ) {
                // Mark the element reliably
                el.setAttribute('data-rockett-id', idCounter);

                interactiveMap.push({
                    id: idCounter,
                    tagName: el.tagName.toLowerCase(),
                    text: (el.innerText || el.placeholder || el.value || el.getAttribute('aria-label') || "").substring(0, 100).replace(/\s+/g, ' ').trim(),
                    rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
                    attributes: {
                        href: el.getAttribute('href'),
                        type: el.getAttribute('type'),
                        role: el.getAttribute('role'),
                        name: el.getAttribute('name'),
                        placeholder: el.getAttribute('placeholder'),
                        eId: el.id // [NEW] Expose element ID (e.g. "video-title") for better targeting
                    }
                });
                idCounter++;
            }
        });

        // Current Scroll Position
        const scrollInfo = {
            x: window.scrollX,
            y: window.scrollY,
            totalHeight: document.body.scrollHeight,
            viewportHeight: window.innerHeight
        };

        // [NEW] Media State Detection (For YouTube/Netflix etc)
        let mediaState = { isPlaying: false, title: "" };
        const media = document.querySelector('video, audio');
        if (media) {
            mediaState.isPlaying = !media.paused && !media.ended && media.readyState > 2;
            mediaState.title = document.title; // Default to page title
            // Try to find a specific video title if possible (YouTube specific)
            const ytTitle = document.querySelector('h1.ytd-video-primary-info-renderer');
            if (ytTitle) mediaState.title = ytTitle.innerText;
        }

        return {
            url: window.location.href,
            title: document.title,
            textContext: document.body.innerText.substring(0, 15000).replace(/\s+/g, ' '), // Full page reading
            interactives: interactiveMap,
            scroll: scrollInfo,
            media: mediaState // [NEW]
        };
    },
    cleanup: function () {
        document.querySelectorAll('[data-rockett-id]').forEach(el => el.removeAttribute('data-rockett-id'));
        const tags = document.querySelectorAll('.agent-id-tag');
        tags.forEach(e => e.remove());
    }
};
