
import { navigator } from '../agents/Navigator';
import { LLMClient } from './LLMClient';
import { Observer } from './Observer';
import { ImageAgent } from '../agents/ImageAgent';
import { StorageService } from './StorageService';
import { SearchService } from './SearchService';
import { IntentDetector } from './IntentDetector';
import { ShoppingService } from './ShoppingService';
// import { personaManager } from './voice/PersonaManager';
import { recoveryEngine } from '../MACHINE_LEARNING/RecoveryEngine';
import { siteMemory } from '../MACHINE_LEARNING/SiteMemory';
import { agentReplay } from '../MACHINE_LEARNING/AgentReplay';
import { hybridCore } from '../MACHINE_LEARNING/HybridCore';
import { actionPredictor } from '../MACHINE_LEARNING/ActionPredictor';

class AgentService {
    constructor() {
        this.abortController = null;
        this.isAgentic = false;

        // Listen for start messages
        if (typeof chrome !== 'undefined' && chrome.runtime) {
            chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
                if (request.type === 'START_AGENT_TASK') {
                    // Start with passed flags (isWebSearchEnabled, isShoppingMode, history, isImageGen)
                    this.runTask(request.prompt, request.history || [], request.isAgentic, request.isWebSearchEnabled, request.isShoppingMode || false, request.isImageGen || false, (data) => {
                        chrome.runtime.sendMessage({
                            type: 'AGENT_PROGRESS',
                            data
                        }).catch(() => { });
                    });
                } else if (request.type === 'STOP_AGENT') {
                    this.handleStop();
                } else if (request.type === 'CONFIRM_ACTION') {
                    this.handleConfirmation(true);
                } else if (request.type === 'REJECT_ACTION') {
                    this.handleConfirmation(false);
                } else if (request.type === 'ENHANCE_PROMPT') {
                    this.enhancePrompt(request.prompt).then(data => sendResponse(data));
                    return true; // Async response
                }
            });
        }

        this.confirmationResolver = null;
    }

    async enhancePrompt(userPrompt) {
        try {
            const systemPrompt = `
            You are a Prompt Engineering Expert.
            Your goal is to optimize the user's request for an AI Agent.
            
            1. DETECT INTENT:
               - "Generate image..." -> Image Generation Prompt (Descriptive, stylistic).
               - "Buy/Shop/Price..." -> Shopping Search Query (Specific, includes current year, specs).
               - "Go to/Navigate..." -> Navigation Command (Clear, direct).
               - General -> Detailed AI Request.

            2. ACTION:
               - Rewrite the prompt to be more effective, precise, and detailed.
               - maintain the core meaning but boost the quality.
               - JUST RETURN THE REWRITTEN TEXT. NO QUOTES.
            `;

            const enhanced = await LLMClient.chatCompletion([
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ], null, { temperature: 0.3 });

            return { enhancedPrompt: enhanced.trim() };
        } catch (error) {
            console.error("Prompt Enhancement Failed", error);
            return { enhancedPrompt: userPrompt }; // Fallback
        }
    }

    handleConfirmation(approved) {
        if (this.confirmationResolver) {
            this.confirmationResolver(approved);
            this.confirmationResolver = null;
        }
    }

    async waitForConfirmation(signal) {
        return new Promise((resolve, reject) => {
            if (signal.aborted) {
                reject(new Error("STOP_SIGNAL"));
                return;
            }
            this.confirmationResolver = resolve;

            // Auto-reject after 60 seconds to prevent hanging
            setTimeout(() => {
                if (this.confirmationResolver === resolve) {
                    this.confirmationResolver(false); // Reject
                    this.confirmationResolver = null;
                }
            }, 60000);
        });
    }

    handleStop() {
        if (this.abortController) {
            this.abortController.abort();
            this.abortController = null;
        }
    }

    async runTask(userRequest, history, isAgentic, isWebSearchEnabled, isShoppingMode, isImageGen, onProgress) {
        console.log('AgentService: Starting Task', userRequest, 'History Len:', history.length, 'Img:', isImageGen);
        this.abortController = new AbortController();
        const signal = this.abortController.signal;

        const checkStop = () => {
            if (signal.aborted) throw new Error("STOP_SIGNAL");
        };

        try {
            // Intent Analysis
            const intent = IntentDetector.analyze(userRequest);
            console.log("AgentService: Intent Analysis", intent);

            const currentDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' });

            // 0. IMAGE GENERATION MODE
            if (isImageGen) {
                onProgress({ status: 'generating_image', message: 'Generating Image...' });

                try {
                    // Use ImageAgent to generate
                    const { imageUrl, revisedPrompt } = await ImageAgent.generateImage(userRequest, onProgress);

                    checkStop();
                    onProgress({
                        status: 'completed',
                        message: 'Image Generated',
                        result: {
                            message: revisedPrompt ? `Generated: ${revisedPrompt}` : 'Here is your image:',
                            images: [imageUrl]
                        }
                    });
                } catch (err) {
                    console.error("Image Gen Failed:", err);
                    onProgress({
                        status: 'completed', // Complete with error message instead of 'error' state to keep chat flow
                        result: { message: `Failed to generate image: ${err.message}. Please check your API Key in Settings.` }
                    });
                }
                return;
            }

            // 1. STRICT MODE ENFORCEMENT (Simple Mode)
            if (!isAgentic && !isWebSearchEnabled && !isShoppingMode) {
                // ... (Strict checks)
                // ...
                onProgress({ status: 'thinking', message: 'Generating response...' });

                // Use History for Context
                const messages = [
                    { role: 'system', content: `You are Nova, a helpful AI assistant. Current Date: ${currentDate}. Maintain conversation context.` },
                    ...history,
                    { role: 'user', content: userRequest }
                ];

                const response = await LLMClient.chatCompletion(messages);
                checkStop();
                onProgress({ status: 'completed', message: 'Response ready', result: { message: response } });
                return;
            }

            // 2. WEB SEARCH MODE
            if (isWebSearchEnabled) {
                onProgress({ status: 'planning', message: 'Searching web...' });
                const searchResults = await SearchService.search(userRequest);

                let searchContext = "No results found.";
                if (searchResults.length > 0) {
                    searchContext = searchResults.map((r, i) => `${i + 1}. [${r.title}](${r.link}): ${r.snippet}`).join('\n');
                }
                onProgress({ status: 'thinking', message: 'Synthesizing answer...' });
                const summaryPrompt = `
                User Question: "${userRequest}"
                Current Date: ${currentDate}
                
                Web Search Results:
                ${searchContext}

                Instructions:
                - Answer the user's question based ONLY on the search results.
                - PRIORITIZE results from ${new Date().getFullYear()}.
                - IMPORTANT: Ignore your internal training data cut-off. TRUST the Search Results dates.
                - Provide citations if possible (e.g. [Source Title]).
                - Be concise and helpful.
                - DO NOT USE MARKDOWN TABLES. Use bulleted lists or bold text.
                `;

                const response = await LLMClient.chatCompletion([
                    { role: 'system', content: `You are Nova, a helpful research assistant. Current Date: ${currentDate}` },
                    { role: 'user', content: summaryPrompt }
                ]);
                // ...
                checkStop();
                onProgress({ status: 'completed', message: 'Search Completed', result: { message: response } });
                return;
            }

            // 3. AGENTIC / SHOPPING MODE
            if (isAgentic || isShoppingMode) {
                await this.startAgenticTask(userRequest, history, isAgentic, isShoppingMode, onProgress, signal, checkStop);
            }

        } catch (error) {
            if (error.message === 'STOP_SIGNAL') {
                console.log("Task stopped by user");
                onProgress({ status: 'idle', message: 'Task Stopped' });
                return;
            }
            console.error('Agent execution failed:', error);
            onProgress({ status: 'error', message: error.message });
        } finally {
            this.abortController = null;
            try {
                const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                if (tab) {
                    chrome.tabs.sendMessage(tab.id, { type: 'DISABLE_DOM_OVERLAY' }).catch(() => { });
                    await chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: Observer.cleanup
                    });
                }
            } catch (e) { /* ignore cleanup error */ }
        }


    }

    async startAgenticTask(userRequest, history, isAgentic, isShoppingMode, onProgress, signal, checkStop) {
        onProgress({ status: 'thinking', message: 'Initializing Agent...' });

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) throw new Error("No active tab found");

        // Restricted Page Check
        if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || !tab.url) {
            onProgress({ status: 'completed', result: { message: "I cannot run on this system page. Please open a website." } });
            return;
        }

        // Enable DOM Overlay
        try {
            chrome.tabs.sendMessage(tab.id, { type: 'ENABLE_DOM_OVERLAY' }).catch(() => { });
        } catch (e) { }

        // Initial State
        onProgress({ status: 'planning', message: 'Analyzing context...' });
        await actionPredictor.loadPatterns(); // [NEW] Load Patterns
        let state = {};
        try {
            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: Observer.getBrowserState
            });
            state = results[0]?.result || {};
        } catch (e) {
            console.warn("Failed to get initial state", e);
        }

        // Jump directly to Navigator Loop
        // (We bypass the complex Planner for now as per "Simple Agent" architecture requested earlier)

        try {
            agentReplay.startRun(); // [NEW] Start Recording
            await navigator.attach(tab.id);
            await this.runNavigatorLoop(userRequest, history, tab, state, onProgress, signal, checkStop, isShoppingMode);
        } finally {
            await navigator.detach();
            await agentReplay.saveRun(); // [NEW] Save Recording
        }
    }




    // [NEW] Helper to make waits abortable
    async wait(ms, signal) {
        if (signal?.aborted) throw new Error("STOP_SIGNAL");
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                resolve();
                signal?.removeEventListener('abort', onAbort);
            }, ms);

            const onAbort = () => {
                clearTimeout(timer);
                reject(new Error("STOP_SIGNAL"));
            };

            signal?.addEventListener('abort', onAbort);
        });
    }

    async runNavigatorLoop(userRequest, historyParam, tab, initialState, onProgress, signal, checkStop, isShoppingMode) {
        let isFinished = false;
        let history = []; // Internal Action History
        const maxTurns = 40; // [UPDATED] Increased from 25 to 40 to prevent early timeouts during deep research
        let turnCount = 0;
        let lastUrl = "";
        let state = initialState;
        this.lastAction = null;
        let siteProfile = null; // [NEW] Site Memory Profile

        // Prepend User Conversation History to Prompt Context (Truncate to last 10 messages to save context)
        // Prepend User Conversation History to Prompt Context (Truncate to last 10 messages to save context)
        // [FIX] Truncate individual messages to prevent huge context
        // [FIX] Strict History Truncation (Max 4 messages, Max 200 chars each)
        const conversationContext = historyParam.slice(-4).map(m => {
            const content = typeof m.content === 'string' ? m.content : "Data Object";
            return `${m.role.toUpperCase()}: ${content.substring(0, 200)}...`;
        }).join('\n');
        const currentDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' });
        const currentYear = new Date().getFullYear();

        let preSearchResults = [];
        let researchContext = "";

        // [NEW] SHOPPING / DEEP RESEARCH MODE (Strictly Toggled)
        // STRICTER INTENT DETECTOR V5
        // Logic: STRICTLY TRUST UI FLAG. NO AUTO-DETECTION.
        // User explicitly requested to avoid "Shopping Agent" overlapping with "Agent Mode".

        /* AUTO-DETECTION DISABLED
        if (!isShoppingMode) {
             const shoppingSignal = /buy|price|cost|shop|recommend|review|vs|compare/i.test(userRequest);
             const actionSignal = /add to (cart|bag|basket)|checkout|proceed|click|navigat|scroll|login|sign/i.test(userRequest);
             if (shoppingSignal && !actionSignal) {
                 isShoppingMode = true; // DISABLED
             }
        }
        */

        if (isShoppingMode) {
            // [NEW] Consultation Check: If user asks about *this* page/product, default to standard Agent functionality (reading page)
            // instead of triggering a full "Universe Build" search.
            const isConsultation = /(this|current|here|page)/i.test(userRequest) &&
                /(good|bad|worth|review|think|opinion|best)/i.test(userRequest);

            if (isConsultation) {
                console.log("[AgentService] Consultation Intent Detected. Skipping Deep Shopping Search to chat with Page.");
                history.push("System: User asked for consultation on current page. Switched to Page-Aware Answer Mode.");

                // [FAST PATH] Immediate Page Read & Answer (No Navigation Loop)
                onProgress({ status: 'thinking', message: 'Reading page content...' });
                try {
                    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
                    const results = await chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: Observer.getBrowserState
                    });

                    if (results && results[0] && results[0].result) {
                        const pageContent = results[0].result.textContext;

                        onProgress({ status: 'thinking', message: 'Analyzing page...' });
                        const consultPrompt = `
                        User Question: "${userRequest}"
                        Role: You are an expert shopping assistant.
                        Context: The user is currently looking at a webpage.
                        Page Content:
                        ${pageContent.substring(0, 15000)}

                        Task: Answer the user's question directly based on the page content.
                        - If asking "Is this good?", summarize pros/cons from the page.
                        - If asking for specs, extract them.
                        - Be concise and helpful.
                        `;

                        const response = await LLMClient.chatCompletion([
                            { role: 'system', content: `You are Nova. Current Date: ${new Date().toLocaleDateString()}` },
                            { role: 'user', content: consultPrompt }
                        ]);

                        onProgress({
                            status: 'completed',
                            message: 'Consultation Complete',
                            result: { message: response }
                        });
                        return; // [STOP] Do not fall through to loop
                    }
                } catch (e) {
                    console.error("Consultation Fast-Path failed:", e);
                    // Fall through to standard loop if fast path fails
                }
            } else {
                try {
                    const shoppingResult = await ShoppingService.process(userRequest, onProgress);

                    if (shoppingResult.results && shoppingResult.results.length > 0) {
                        const topPick = shoppingResult.results[0];

                        // 1. RICH SUMMARY
                        let summary = `## 🏆 Recommendation: ${topPick.product.name}\n\n`;
                        summary += `> ${topPick.product.reason || 'Best overall choice.'}\n\n`;

                        if (topPick.product.features && topPick.product.features.length) {
                            summary += `**Key Features:**\n${topPick.product.features.map(f => `- ${f}`).join('\n')}\n\n`;
                        }

                        summary += `### 💰 Best Deal\n`;
                        summary += `**₹${topPick.bestDeal.basePrice}** at ${topPick.bestDeal.site} ${topPick.bestDeal.stock ? '✅' : '⚠️'}\n`;

                        // [NEW] Show Other Store Prices for the WINNER
                        if (topPick.alternatives && topPick.alternatives.length > 0) {
                            summary += `*Also available at:*\n`;
                            topPick.alternatives.forEach(alt => {
                                summary += `- ₹${alt.basePrice} (${alt.site})\n`;
                            });
                        } else {
                            summary += `*(Best price found across major stores)*\n`;
                        }

                        // 2. ACTION PROMPTS
                        summary += `\n**What would you like to do?**\n`;
                        summary += `1. **[Add to Cart by saying "Add this to cart"]**\n`;
                        summary += `2. [View Deal](${topPick.bestDeal.link})\n\n`;

                        // 3. ALTERNATIVE PRODUCTS (Competitive Landscape)
                        if (shoppingResult.results.length > 1) {
                            summary += `### ⚖️ Alternative Models\n`;
                            shoppingResult.results.slice(1, 4).forEach(res => {
                                summary += `**${res.product.name}**\n`;
                                summary += `- Best Price: ₹${res.bestDeal.basePrice} (${res.bestDeal.site})\n`;
                                summary += `- ${res.product.reason ? res.product.reason.substring(0, 60) + '...' : ''}\n`;
                                if (res.bestDeal.link) {
                                    summary += `[View Deal](${res.bestDeal.link})\n\n`;
                                } else {
                                    summary += `\n`;
                                }
                            });
                        }

                        history.push(`System: Shopping Completed. ${summary}`);

                        // 4. AUTO-REDIRECT
                        if (topPick.bestDeal.link && topPick.bestDeal.link.startsWith('http')) {
                            onProgress({ status: 'navigating', message: `🚀 Redirecting to best deal for ${topPick.product.name}...` });
                            try {
                                if (typeof chrome !== 'undefined' && chrome.tabs) {
                                    chrome.tabs.update({ url: topPick.bestDeal.link });
                                }
                            } catch (err) { }
                        }

                        onProgress({
                            status: 'completed',
                            message: 'Shopping Task Completed. Say "Add to cart" to proceed.',
                            result: {
                                message: summary,
                                data: shoppingResult,
                                autoRedirect: topPick.bestDeal.link
                            }
                        });
                        return; // Task Done
                    } else {
                        onProgress({
                            status: 'completed',
                            message: 'Shopping Completed',
                            result: { message: shoppingResult.message || "No results found." }
                        });
                        return;
                    }
                } catch (e) {
                    console.error("Shopping Engine Failed", e);
                    onProgress({ status: 'error', message: `Shopping Error: ${e.message}` });
                    return;
                }
            } // Close Consultation check else block
        }



        // SYSTEM PROMPT FOR BEST PRODUCT FINDER (SMART SHOPPER)
        const navigatorSystemPrompt = `
You are Nova, a Smart Shopping Agent & Researcher (Navigator).
Current Date: ${currentDate}
User Goal: "${userRequest}"

${researchContext}
${siteMemory.getMemoryHint(siteProfile)}


CORE ACTIONS:
1. NAVIGATE: Use "NAVIGATE" to go directly to a URL.
2. CLICK: Click buttons, links, or product cards.
3. TYPE: Type search queries into inputs.
4. SCROLL: Scroll down.
5. WAIT: Wait.
6. ANSWER: Finish the task.

PROTOCOL:
1. DIRECT NAVIGATION: PREFER using the "Pre-search Results" if available. NAVIGATE directly.
2. SINGLE PRODUCT: The user wants ONE recommendation. Find it, verify it, and Answer.
3. SPEED: Do not browse endlessly. 
4. NO HALLUCINATIONS.
5. MULTI-STEP: If the user has multiple requests (e.g. "Check weather then news"), execute them SEQUENTIALLY. Complete the first, then move to the second.
    

OUTPUT FORMAT (JSON ONLY):
{
  "thought": "Candidate 1 looks perfect. I will navigate there.",
  "action": "NAVIGATE",
  "value": "https://amazon.in/dp/..." 
}
`;

        while (!isFinished && turnCount < maxTurns) {
            checkStop();
            turnCount++;

            checkStop();
            turnCount++;

            // [REMOVED] Hard Stop if Media is Playing (Caused issues with Summarization tasks)
            // The agent should use its System Prompt to decide whether to stop or continue research.
            /*
            if (state.media?.isPlaying && turnCount > 2) {
                console.log("AgentService: Media Playing Detected. Auto-Finishing.");
                onProgress({
                    status: 'completed',
                    message: 'Video is playing',
                    result: { message: `Video "${state.media.title}" is playing. Enjoy!` }
                });
                return;
            }
            */

            // ... (scan code)

            // RULES UPDATE:
            // 7. ** MEDIA AWARENESS **: 
            //    (A) If task is "Play X" or "Listen to X" -> FINISH if media is playing.
            //    (B) If task is "Summarize" or "Research" -> Extract info and NAVIGATE to next video. DO NOT Toggle Pause.

            // Update State
            if (turnCount > 1 || !state.url) {
                // [NEW] Re-enable overlay if navigation happened or just in case
                try {
                    chrome.tabs.sendMessage(tab.id, { type: 'ENABLE_DOM_OVERLAY' }).catch(() => { });
                } catch (e) { }

                onProgress({ status: 'navigating', message: `Scanning... (Turn ${turnCount})` });
                try {
                    const results = await chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        func: Observer.getBrowserState
                    });
                    state = results[0].result;

                    // [NEW] Restricted Page Check (e.g. Settings, Localhost, Chrome URLs)
                    if (state.url.startsWith("chrome-extension://") || state.url.startsWith("chrome://")) {
                        console.warn("Restricted Internal Page detected.");
                        state.textContext = "This is an internal extension page. I cannot read or interact with it for security reasons.";
                        state.interactives = [];
                    }
                } catch (e) {
                    // Restricted Page Logic
                    if (e.message.includes("cannot be scripted") || e.message.includes("Extension context invalidated")) {
                        console.warn("Restricted Page detected:", e.message);
                        state = {
                            url: "Restricted Page",
                            title: "Restricted Page",
                            textContext: "Protected Page. Cannot interact.",
                            interactives: []
                        };
                    } else {
                        throw e;
                    }
                }
            }

            if (!state) throw new Error("Failed to get browser state");

            if (lastUrl === state.url && turnCount > 1) {
                history.push("System Note: URL did not change after last action.");
            }
            if (lastUrl !== state.url) {
                // URL Changed: Load new Site Profile
                siteProfile = await siteMemory.loadProfile(state.url);
            }
            lastUrl = state.url;

            onProgress({ status: 'thinking', message: 'Deciding...' });

            let action;
            // [NEW] ACTION PREDICTION
            const predictedStep = actionPredictor.predictNext(userRequest, history);
            if (predictedStep) {
                action = predictedStep;
                history.push(`System: Action Predictor chose: ${action.action} (Confidence: High)`);
            } else {
                // FALLBACK TO LLM
                const prompt = `
            Goal: ${userRequest}
            Current URL: ${state.url}
            **MEDIA STATE: ${state.media?.isPlaying ? `PLAYING (${state.media?.title})` : `STOPPED`}**
            History: ${history.slice(-6).join(" -> ")}
            Content: ${(state.textContext || "").substring(0, 2500)}... 
            
            INTERACTIVE ELEMENTS: 
            ${(() => {
                        try {
                            const minimal = (state.interactives?.slice(0, 30) || []).map(i => {
                                const item = {
                                    id: i.id,
                                    tag: i.tagName,
                                    t: i.text ? i.text.substring(0, 50) : (i.attributes?.name || i.attributes?.placeholder || ''),
                                    h: i.attributes?.href || '',
                                    eid: i.attributes?.eId || '' // Include Element ID in Prompt
                                };
                                if (i.tagName === 'input' || i.tagName === 'textarea') {
                                    item.v = i.attributes?.value || '';
                                }
                                return item;
                            });
                            return JSON.stringify(minimal);
                        } catch (e) {
                            return "[]";
                        }
                    })()}

            RULES:
            1. IF INPUT HAS TEXT (v="nike.com") AND YOU WANT TO SEARCH, CLICK SEARCH BUTTON.
            2. IF INPUT IS EMPTY, TYPE.
            3. IF "Go to X", USE NAVIGATE ACTION.
            4. LOOP PREVENTION: If you clicked an ID (e.g. 23) in the last step and URL did NOT change, DO NOT CLICK IT AGAIN. Scroll or try another.
            5. EXPLORE: If looking for "best" or "under X", SCROLL at least twice to see options before choosing.
            6. YOUTUBE TIP: PRIORITIZE clicking elements with eid='video-title' or eid='thumbnail' or href='/watch...'. Avoid generic 'More actions' buttons.
            7. **MEDIA AWARENESS**: IF MEDIA STATE IS 'PLAYING':
               (A) IF GOAL IS "PLAY/WATCH/LISTEN": OUTPUT ACTION "FINISH".
               (B) IF GOAL IS "RESEARCH/SUMMARIZE/FIND BEST": IGNORE PLAYBACK, EXTRACT INFO, AND NAVIGATE TO NEXT RESULT. DO NOT CLICK PAUSE.
            8. **SHOPPING ACTIONS**:
               - **"Add to Cart"**: You MUST find a button with text "Add to Cart", "Add to Bag", or "Buy Now" and **CLICK** it. **DO NOT** NAVIGATE to the cart page (like /cart or /checkout) unless the item is *already* added.
               - **"Checkout"**: Only THEN navigate to the cart/checkout page.
            
            OUTPUT FORMAT (JSON ONLY):
            {
                "thought": "I need to type the name.",
                "action": "TYPE",
                "id": 12,
                "value": "John Doe" 
            }
            OR
            {
                "thought": "Found 'Add to Cart' button (ID 45). Clicking it.",
                "action": "CLICK",
                "id": 45
            }
            OR
            {
                "thought": "Navigating to page.",
                "action": "NAVIGATE",
                "value": "https://example.com"
            }
            `;

                let llmResponse;
                try {
                    llmResponse = await LLMClient.chatCompletion([
                        { role: 'system', content: navigatorSystemPrompt },
                        { role: 'user', content: prompt }
                    ], null, { temperature: 0.1, signal: signal }); // [NEW] Pass signal
                } catch (e) {
                    console.error("LLM Request Failed:", e);
                    history.push(`System: LLM Error(${e.message}).Retrying...`);
                    // [NEW] Abortable Wait
                    await this.wait(2000, signal);
                    continue; // Retry loop
                }

                checkStop(); // Check stop after LLM call before parsing

                let action;
                try {
                    // Robust JSON Extraction Strategy (Brace Counting)
                    const extractJSON = (str) => {
                        let startIndex = str.indexOf('{');
                        if (startIndex === -1) return null;

                        let braceCount = 0;
                        let foundStart = false;
                        let endIndex = -1;

                        for (let i = startIndex; i < str.length; i++) {
                            if (str[i] === '{') {
                                braceCount++;
                                foundStart = true;
                            } else if (str[i] === '}') {
                                braceCount--;
                            }

                            if (foundStart && braceCount === 0) {
                                endIndex = i;
                                break;
                            }
                        }

                        if (endIndex !== -1) {
                            return str.substring(startIndex, endIndex + 1);
                        }
                        return null;
                    };

                    const jsonStr = extractJSON(llmResponse);
                    if (!jsonStr) throw new Error("No JSON found in response");

                    // Clean markdown code blocks just in case they are inside the string (unlikely but safe)
                    const cleanJson = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
                    action = JSON.parse(cleanJson);

                    // Validate Schema
                    if ((action.action === 'CLICK' || action.action === 'TYPE') && (action.id === undefined || action.id === null)) {
                        // [FIX] Valid ID 0 should pass. Undefined/Null fails.
                        throw new Error(`Missing 'id' for ${action.action}. You MUST include the numeric 'id' of the element.`);
                    }

                    // [NEW] Allow CLICK_TEXT / TYPE_TEXT without ID
                    if ((action.action === 'CLICK_TEXT' || action.action === 'TYPE_TEXT') && !action.text) {
                        throw new Error(`Missing 'text' for ${action.action}.`);
                    }
                } catch (e) {
                    console.error("JSON Parse/Validation Error", e);
                    history.push(`System: Invalid JSON or Schema (${e.message}). Retrying...`);
                    continue; // Retry loop
                }

                history.push(`${action.action}: ${action.thought} `);

                onProgress({
                    status: 'navigating',
                    message: action.thought || `Executing ${action.action}...`
                });

                checkStop();

                if (action.action === "ANSWER" || action.action === "FINISH") {
                    isFinished = true;
                    await actionPredictor.learn(userRequest, history); // [NEW] Learn Pattern
                    onProgress({
                        status: 'completed',
                        message: 'Step Completed',
                        result: { message: action.value || action.thought }
                    });
                } else {
                    // [NEW] LOOP PREVENTION:
                    // If the exact same action (Action + ID + Value) is repeated on the same URL, BLOCK IT.
                    // This forces the LLM to try something else (e.g. scroll, or click a different element).
                    const isSameAction = this.lastAction &&
                        this.lastAction.action === action.action &&
                        this.lastAction.id === action.id &&
                        this.lastAction.value === action.value;

                    const isSameUrl = lastUrl === state.url;

                    if (isSameAction && isSameUrl) {
                        console.warn("AgentService: Loop detected, blocking duplicate action.");
                        history.push(`System: You just executed '${action.action}' on ID ${action.id} and nothing changed. You MUST do something different (e.g. SCROLL or click a different element).`);
                        continue; // Skip execution, force re-think
                    }

                    // Save this action for next turn comparison
                    this.lastAction = {
                        action: action.action,
                        id: action.id,
                        value: action.value
                    };

                    // [NEW] Log to Replay
                    agentReplay.logStep({
                        action: action,
                        thought: action.thought,
                        stateUrl: state.url,
                        stateTitle: state.title
                    });

                    try {
                        await hybridCore.executeAction(action, state.interactives, tab.id);
                        // [OPTIMIZED] Reduced wait from 2500ms to 800ms for speed.
                        await this.wait(800, signal);

                        // [NEW] RECOVERY ENGINE INTEGRATION
                        // 1. Fetch Fresh State
                        const newState = await this._getState(tab.id);

                        // 2. Verify Outcome
                        const verification = await recoveryEngine.constructor.verifyOutcome(state, newState, action);

                        if (!verification.success) {
                            console.warn("AgentService: Action Verification Failed", verification);
                            history.push(`System: Action failed (${verification.reason}). Triggering Recovery...`);

                            // 3. Trigger Recovery
                            try {
                                const recoveryAction = await recoveryEngine.recover(
                                    verification.errorType,
                                    userRequest,
                                    action,
                                    newState.url || "unknown",
                                    newState.textContext || ""
                                );

                                onProgress({ status: 'navigating', message: `Recovering: ${recoveryAction.thought}` });
                                history.push(`System: Recovery Plan: ${recoveryAction.thought}`);

                                // 4. Execute Fix Immediately
                                await hybridCore.executeAction(recoveryAction, newState.interactives, tab.id);
                                await this.wait(1000, signal);
                            } catch (recError) {
                                console.error("Recovery Failed:", recError);
                                history.push(`System: Recovery failed. Skipping step.`);
                            }
                        }

                    } catch (err) {
                        if (signal.aborted) throw new Error("STOP_SIGNAL"); // Check stop in catch

                        // [FIX] SPECIFIC HANDLING FOR "ID NOT FOUND"
                        // Instead of entering the complex Recovery Engine (which consumes tokens and time),
                        // simply tell the LLM it made a mistake and force a retry.
                        if (err.message.includes("Target element with ID") || err.message.includes("not found")) {
                            console.warn("AgentService: Element missing. Feeding back to LLM.");
                            history.push(`System Error: ${err.message}. The element might have moved or is hidden. Please Check the 'INTERACTIVE ELEMENTS' list again and choose a valid ID.`);
                            continue; // Jump to next loop iteration (Refresh State -> Re-Prompt LLM)
                        }

                        console.error("Step Execution Failed:", err);

                        // Attempt Exception Recovery
                        try {
                            const errState = await this._getState(tab.id);
                            const fix = await recoveryEngine.recover(
                                'execution_exception',
                                userRequest,
                                action,
                                errState.url || "unknown",
                                errState.textContext || ""
                            );
                            history.push(`System: Exception caught. Recovery Plan: ${fix.thought}`);
                            await hybridCore.executeAction(fix, errState.interactives, tab.id);
                            await this.wait(1000, signal);
                        } catch (recError) {
                            history.push(`Error executing action & Recovery failed: ${err.message}.`);
                        }
                    }
                }
            }

            if (turnCount >= maxTurns) {
                onProgress({ status: 'thinking', message: 'Time limit reached. Summarizing findings...' });

                // Fallback Summary
                const historyText = history.join("\n");
                const summaryPrompt = `
                You are Nova, the Navigator. You ran out of steps/time while trying to help the user.
                User Goal: "${userRequest}"

                Execution History:
                ${historyText}

                INSTRUCTIONS:
                1. Summarize what you found so far.
                2. If you found products/prices, list them.
                3. If you didn't find the exact answer, explain what you tried and suggest next steps.
                4. Be helpful despite the cutoff.
                `;

                try {
                    const finalResponse = await LLMClient.chatCompletion([
                        { role: 'system', content: "You are a helpful assistant summarizing a task." },
                        { role: 'user', content: summaryPrompt }
                    ]);

                    onProgress({
                        status: 'completed',
                        message: 'Task Timed Out (Summary Provided)',
                        result: {
                            message: `**Time Limit Reached.**\n\nHere is a summary of what I found:\n\n${finalResponse}`
                        }
                    });
                } catch (e) {
                    onProgress({ status: 'error', message: 'Timed out and failed to summarize.' });
                }
                return;
            }
        }
    }

    // [NEW] Helper for fetching state
    async _getState(tabId) {
        try {
            const results = await chrome.scripting.executeScript({
                target: { tabId },
                func: Observer.getBrowserState
            });
            return results[0]?.result || {};
        } catch (e) {
            console.warn("Failed to get state", e);
            return {};
        }
    }
}

export const agentService = new AgentService();
