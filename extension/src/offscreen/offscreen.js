
// offscreen.js - Minimal Placeholder
// This file is currently kept to satisfy manifest definitions but performs no active logic
// for the new Extension-only Voice Mode.

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Legacy handler or future background audio tasks
    if (request.type === 'PING') {
        sendResponse({ pong: true });
    }
});

