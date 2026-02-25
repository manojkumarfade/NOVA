/**
 * @file Observer.js
 * @description Core functionality for Observer.
 * Handles the primary logic and responsibilities designated for this module.
 * 
 * @context Core Service (Background/Agent Logic provider)
 */


// Observer Service - Injected into the page to extract state with "Set-of-Mark" tags
export const Observer = {
    getBrowserState: function () {
        // 1. Cleanup old attributes/tags
        document.querySelectorAll('[data-nova-id]').forEach(el => el.removeAttribute('data-nova-id'));
        const tags = document.querySelectorAll('.agent-id-tag');
        tags.forEach(e => e.remove());

        // 2. Find all interactive elements (Aligned with domOverlay.js)
        // Explicitly include checkbox and radio inputs for better vision support
        const elements = document.querySelectorAll("button,a,input,textarea,select,[role='button'],[role='link'],[onclick],input[type='checkbox'],input[type='radio']");
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
                el.setAttribute('data-nova-id', idCounter);

                interactiveMap.push({
                    id: idCounter,
                    tagName: el.tagName.toLowerCase(),
                    text: (el.innerText || el.placeholder || el.value || el.getAttribute('aria-label') || "").substring(0, 100).replace(/\s+/g, ' ').trim(),
                    rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
                    attributes: {
                        href: el.getAttribute('href'),
                        type: el.getAttribute('type'),
                        value: (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') ? (el.value || '') : undefined, // [FIX] Expose current field value so LLM can see typed text
                        role: el.getAttribute('role'),
                        name: el.getAttribute('name'),
                        placeholder: el.getAttribute('placeholder'),
                        eId: el.id, // [NEW] Expose element ID (e.g. "video-title") for better targeting
                        checked: el.tagName.toLowerCase() === 'input' ? el.checked : undefined // [NEW] Include checked state for checkboxes/radio buttons
                    }
                });
                idCounter++;
            }
        });

        // [NEW] 3. Detect Code Editors (CodeMirror, Monaco, Ace, contenteditable)
        // These use non-standard elements that the normal selector misses
        const editorSelectors = [
            '.CodeMirror',           // CodeMirror v5 (Programiz, JSFiddle, etc.)
            '.cm-editor',            // CodeMirror v6
            '.monaco-editor',        // Monaco (VS Code web, StackBlitz)
            '.ace_editor',           // Ace Editor (CodePen, Cloud9)
            '[contenteditable="true"]' // Generic contenteditable
        ];

        editorSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                // Skip if already tagged
                if (el.getAttribute('data-nova-id')) return;
                const rect = el.getBoundingClientRect();
                if (rect.width >= 50 && rect.height >= 30 &&
                    rect.bottom > 0 && rect.right > 0 &&
                    rect.top < window.innerHeight && rect.left < window.innerWidth) {

                    el.setAttribute('data-nova-id', idCounter);

                    // Get current code content (truncated)
                    let codeContent = '';
                    if (el.classList.contains('CodeMirror') && el.CodeMirror) {
                        codeContent = el.CodeMirror.getValue().substring(0, 200);
                    } else if (el.querySelector('.cm-content')) {
                        codeContent = el.querySelector('.cm-content').textContent.substring(0, 200);
                    } else if (el.env && el.env.editor) {
                        codeContent = el.env.editor.getValue().substring(0, 200);
                    } else {
                        codeContent = (el.textContent || '').substring(0, 200);
                    }

                    interactiveMap.push({
                        id: idCounter,
                        tagName: 'editor',  // Special tag so the LLM knows it's a code editor
                        text: codeContent.replace(/\s+/g, ' ').trim() || '[empty editor]',
                        rect: { x: rect.left, y: rect.top, w: rect.width, h: rect.height },
                        attributes: {
                            type: 'code-editor',
                            editorType: el.classList.contains('CodeMirror') ? 'codemirror5' :
                                el.classList.contains('cm-editor') ? 'codemirror6' :
                                    el.classList.contains('monaco-editor') ? 'monaco' :
                                        el.classList.contains('ace_editor') ? 'ace' : 'contenteditable',
                            value: codeContent.replace(/\s+/g, ' ').trim(),
                            eId: el.id || ''
                        }
                    });
                    idCounter++;
                }
            });
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
        document.querySelectorAll('[data-nova-id]').forEach(el => el.removeAttribute('data-nova-id'));
        const tags = document.querySelectorAll('.agent-id-tag');
        tags.forEach(e => e.remove());
    }
};
