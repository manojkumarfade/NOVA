console.log('Nova Browser Content Script Loaded');

import { enableDomOverlay, disableDomOverlay } from './domOverlay';

// Will accept messages from Navigator agent
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'EXECUTE_DOM_ACTION') {
        console.log('Executing DOM Action:', request.action);
        // TODO: Implement actual DOM manipulation
        sendResponse({ status: 'completed' });
    }
    else if (request.type === 'ENABLE_DOM_OVERLAY') {
        enableDomOverlay();
        sendResponse({ status: 'enabled' });
    }
    else if (request.type === 'DISABLE_DOM_OVERLAY') {
        disableDomOverlay();
        sendResponse({ status: 'disabled' });
    }
});
