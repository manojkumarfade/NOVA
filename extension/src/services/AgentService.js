/**
 * @file AgentService.js
 * @description Core functionality for AgentService.
 * Handles the primary logic and responsibilities designated for this module.
 * 
 * @context Core Service (Background/Agent Logic provider)
 */


import { navigator } from '../agents/Navigator';
import { LLMClient } from './LLMClient';
import { Observer } from './Observer';
import { ImageAgent } from '../agents/ImageAgent';
import { StorageService } from './StorageService';
import { SearchService } from './SearchService';
import { SwarmService } from './SwarmService';
import { IntentDetector } from './IntentDetector';
import { ShoppingService } from './ShoppingService';
import { VisionService } from './VisionService';
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
                    this.runTask(request.prompt, request.history || [], request.isAgentic, request.isWebSearchEnabled, request.isShoppingMode || false, request.isImageGen || false, request.imageAttachments || [], (data) => {
                        chrome.runtime.sendMessage({
                            type: 'AGENT_PROGRESS',
                            data
                        }).catch(() => { });
                    });
                    sendResponse({ status: 'started' });
                    return true;
                } else if (request.type === 'STOP_AGENT_TASK') {
                    this.handleStop();
                    // [FIX] Force-detach debugger so the debugging banner disappears
                    navigator.detach().catch(() => { });
                    sendResponse({ status: 'stopped' });
                    return true;
                } else if (request.type === 'CONFIRM_ACTION') {
                    this.handleConfirmation(true);
                } else if (request.type === 'REJECT_ACTION') {
                    this.handleConfirmation(false);
                } else if (request.type === 'ENHANCE_PROMPT') {
                    this.enhancePrompt(request.prompt).then(data => sendResponse(data));
                    return true; // Async response
                } else if (request.type === 'PROCESS_VOICE_COMMAND') {
                    this.processVoiceCommand(request.prompt, request.history).then(data => sendResponse(data));
                    return true;
                } else if (request.type === 'GENERATE_TITLE') {
                    this.generateConversationTitle(request.messages).then(data => sendResponse(data));
                    return true;
                } else if (request.type === 'START_CART_AUTOMATION') {
                    ShoppingService.startCartAutomation(request.url, (data) => {
                        chrome.runtime.sendMessage({ type: 'AGENT_PROGRESS', data }).catch(() => { });
                    }).then(data => sendResponse(data));
                    return true;
                } else if (request.type === 'FLASH_COMPARE') {
                    ShoppingService.comparePrices(request.url, request.name, (data) => {
                        chrome.runtime.sendMessage({ type: 'AGENT_PROGRESS', data }).catch(() => { });
                    }).then(data => sendResponse(data));
                    return true;
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

    async generateConversationTitle(messages) {
        try {
            const snippet = messages.slice(0, 4).map(m =>
                `${m.role === 'user' ? 'User' : 'AI'}: ${m.content?.slice(0, 120) || ''}`
            ).join('\n');

            const title = await LLMClient.chatCompletion([
                { role: 'system', content: 'Generate a SHORT title (5-8 words max) summarizing this conversation. Return ONLY the title text, no quotes, no punctuation at the end.' },
                { role: 'user', content: snippet }
            ], null, { temperature: 0.3 });

            return { title: title?.trim()?.slice(0, 60) || 'Untitled Chat' };
        } catch (e) {
            console.error('Title generation failed', e);
            return { title: null };
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

    async processVoiceCommand(userPrompt, history) {
        try {
            const currentDate = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

            const systemPrompt = `
            You are Nova, an Advanced Voice Assistant.
            Current Date: ${currentDate}
            
            ROLE:
            - You are a CONVERSATIONAL assistant.
            - Your responses are SPOKEN aloud. 
            - BE CONCISE (max 2-3 sentences unless asked for detail). 
            - Use natural, spoken language.
            - Do not use markdown tables or complex formatting.
            - ANSWER from your own knowledge. DO NOT SEARCH THE WEB.
            - If you don't know, say you don't know.

            OUTPUT FORMAT:
            Just your spoken response text.
            `;

            const chatHistory = history.slice(-6).map(m => ({ role: m.role || (m.sender === 'user' ? 'user' : 'assistant'), content: m.message }));

            const messages = [
                { role: 'system', content: systemPrompt },
                ...chatHistory,
                { role: 'user', content: userPrompt }
            ];

            const response = await LLMClient.chatCompletion(messages, null, { temperature: 0.7 });

            // Simple Navigation Handling
            if (response.includes('{"action": "NAVIGATE"')) {
                try {
                    const clean = response.replace(/```json/g, '').replace(/```/g, '').trim();
                    const jsonStart = clean.indexOf('{');
                    const jsonEnd = clean.lastIndexOf('}');
                    if (jsonStart !== -1 && jsonEnd !== -1) {
                        const action = JSON.parse(clean.substring(jsonStart, jsonEnd + 1));
                        if (action.action === 'NAVIGATE' && action.url) {
                            chrome.tabs.update({ url: action.url });
                            return { message: `Opening ${action.url}`, action: 'NAVIGATE' };
                        }
                    }
                } catch (e) { console.warn("Voice Nav Parse Error", e); }
            }

            return { message: response.replace(/[\*#_`~]/g, '') };
        } catch (error) {
            console.error("Voice Processing Failed", error);
            return { message: "I'm having trouble processing that right now." };
        }
    }

    async runTask(userRequest, history, isAgentic, isWebSearchEnabled, isShoppingMode, isImageGen, imageAttachments, onProgress) {
        console.log('AgentService: Starting Task', userRequest, 'History Len:', history.length, 'Img:', isImageGen, 'Attached Images:', imageAttachments?.length || 0);
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
                        status: 'completed',
                        result: { message: `Failed to generate image: ${err.message}. Please check your API Key in Settings.` }
                    });
                }
                return;
            }

            // 1. STRICT MODE ENFORCEMENT (Simple Mode / Greetings)
            if (!isShoppingMode && (!isAgentic && !isWebSearchEnabled)) {
                // ... (Strict checks)
                // ...
                onProgress({
                    status: 'thinking',
                    message: 'Generating response...',
                    logEntry: {
                        type: 'thought',
                        message: '💭 Processing your message...',
                        timestamp: new Date().toLocaleTimeString()
                    }
                });

                // Build the user message - use multi-part if images are attached
                const hasImages = imageAttachments && imageAttachments.length > 0;
                let userContent;

                if (hasImages) {
                    // Construct a vision message with text + images
                    userContent = [
                        { type: 'text', text: userRequest }
                    ];
                    for (const imgDataUrl of imageAttachments) {
                        userContent.push({
                            type: 'image_url',
                            image_url: { url: imgDataUrl }
                        });
                    }
                    console.log(`[AgentService] Vision message: ${imageAttachments.length} image(s) attached`);
                } else {
                    userContent = userRequest;
                }

                const systemPrompt = hasImages
                    ? `You are Nova, a helpful AI assistant with VISION capabilities. Current Date: ${currentDate}. The user has attached image(s). Analyze them thoroughly — describe what you see, answer questions about the content, read any text in the image, and provide detailed insights. Be specific and helpful.`
                    : `You are Nova, a helpful AI assistant. Current Date: ${currentDate}. Maintain conversation context.`;

                // Use History for Context
                const messages = [
                    { role: 'system', content: systemPrompt },
                    ...history,
                    { role: 'user', content: userContent }
                ];

                const response = await LLMClient.chatCompletion(messages);
                checkStop();
                onProgress({
                    status: 'completed',
                    message: 'Response ready',
                    result: { message: response }
                });
                return;
            }

            // 2. AGENTIC / SHOPPING MODE
            if (isAgentic || isShoppingMode) {
                await this.startAgenticTask(userRequest, history, isAgentic, isShoppingMode, onProgress, signal, checkStop);
                return;
            }

            // 3. WEB SEARCH MODE (Deep Research — 6-Tab Swarm)
            if (isWebSearchEnabled) {
                onProgress({
                    status: 'planning',
                    message: 'Deep Research: Searching web & opening background tabs...',
                    logEntry: { type: 'plan', message: 'Starting deep research swarm', timestamp: new Date().toLocaleTimeString() }
                });
                const searchResults = await SearchService.search(userRequest);

                if (searchResults.length === 0) {
                    onProgress({ status: 'completed', result: { message: 'No search results found for your query.' } });
                    return;
                }

                // Deep Research: Open top 6 results as background tabs
                const topUrls = searchResults.slice(0, 6).map(r => r.link);

                onProgress({
                    status: 'navigating',
                    message: `Opening ${topUrls.length} research tabs...`,
                    logEntry: { type: 'navigate', message: `Spawning ${topUrls.length} research tabs`, timestamp: new Date().toLocaleTimeString() }
                });

                // DOM content extractor
                const contentExtractor = () => {
                    try {
                        const article = document.querySelector('article') || document.querySelector('main') || document.body;
                        const text = article.innerText || '';
                        // Clean and truncate
                        const cleaned = text.replace(/\s+/g, ' ').substring(0, 8000);
                        return {
                            url: window.location.href,
                            title: document.title,
                            content: cleaned,
                            length: cleaned.length
                        };
                    } catch (e) {
                        return { url: window.location.href, title: document.title, content: '', error: e.message };
                    }
                };

                let combinedContent = '';
                try {
                    const tabResults = await SwarmService.spawnWithConcurrency(
                        topUrls,
                        contentExtractor,
                        3,      // 3 concurrent
                        20000,  // 20s timeout
                        (tabIndex, status, data) => {
                            const title = searchResults[tabIndex]?.title || `Tab ${tabIndex + 1}`;
                            onProgress({
                                status: status === 'extracting' ? 'thinking' : 'navigating',
                                message: `${title.substring(0, 40)}...: ${status === 'loading' ? '🔄 Loading' : status === 'extracting' ? '🧠 Reading' : status === 'done' ? '✅ Done' : '❌ Failed'}`,
                                logEntry: {
                                    type: status === 'extracting' ? 'think' : 'navigate',
                                    message: `${title.substring(0, 50)}: ${status}`,
                                    url: data?.url || '',
                                    timestamp: new Date().toLocaleTimeString()
                                }
                            });
                        }
                    );

                    // Combine successful extractions
                    const validExtractions = tabResults.filter(r => r.status === 'success' && r.result?.content?.length > 100);
                    combinedContent = validExtractions.map(r =>
                        `=== SOURCE: ${r.result.title} (${r.result.url}) ===\n${r.result.content}`
                    ).join('\n\n');

                    onProgress({
                        status: 'thinking',
                        message: `Synthesizing from ${validExtractions.length} sources...`,
                        logEntry: { type: 'think', message: `Read ${validExtractions.length} pages, synthesizing`, timestamp: new Date().toLocaleTimeString() }
                    });
                } catch (e) {
                    console.warn('[Agent] Swarm research failed, falling back to snippets', e);
                    combinedContent = searchResults.map((r, i) => `${i + 1}. [${r.title}](${r.link}): ${r.snippet}`).join('\n');
                }

                // If swarm got nothing, fall back to snippets
                if (!combinedContent || combinedContent.length < 200) {
                    combinedContent = searchResults.map((r, i) => `${i + 1}. [${r.title}](${r.link}): ${r.snippet}`).join('\n');
                }

                const summaryPrompt = `
                User Question: "${userRequest}"
                Current Date: ${currentDate}
                
                Research Data (from ${SwarmService.getOpenTabs().length} background tabs):
                ${combinedContent}

                Instructions:
                - Provide a comprehensive, well-structured answer based on the research data.
                - PRIORITIZE information from ${new Date().getFullYear()}.
                - Include citations with source names.
                - Be thorough but organized with clear sections.
                - DO NOT USE MARKDOWN TABLES. Use bulleted lists or bold text.
                `;

                const response = await LLMClient.chatCompletion([
                    { role: 'system', content: `You are Nova, a deep research assistant. Current Date: ${currentDate}. You have access to ${SwarmService.getOpenTabs().length} open research tabs.` },
                    { role: 'user', content: summaryPrompt }
                ]);
                checkStop();
                onProgress({
                    status: 'completed',
                    message: 'Deep Research Complete',
                    result: {
                        message: response,
                        taskSummary: {
                            type: 'web_research',
                            tabsOpened: topUrls.length,
                            tabsAlive: SwarmService.getOpenTabs().length,
                            sourcesUsed: topUrls.length,
                        }
                    }
                });
                return;
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
        const maxTurns = 40; // Standard turn limit
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
            try {
                const forceSearch = userRequest === "PROCEED_TO_WEB_SEARCH";
                checkStop(); // Ensure we don't start if already stopped
                const shoppingResult = await ShoppingService.process(userRequest, onProgress, '', forceSearch, signal, checkStop);

                if (!shoppingResult) {
                    onProgress({ status: 'completed', message: 'Shopping canceled or no result.' });
                    return;
                }

                if (!shoppingResult.isShopping) {
                    onProgress({
                        status: 'completed',
                        message: 'Need clarification...',
                        result: {
                            message: shoppingResult.message,
                            isShopping: false,
                            needsProceed: shoppingResult.needsProceed || false,
                            extraData: shoppingResult.extraData || null
                        }
                    });
                    return;
                }

                if (shoppingResult.isShopping) {
                    onProgress({
                        status: 'completed',
                        message: 'Shopping Task Completed.',
                        result: {
                            message: shoppingResult.message,
                            isShopping: true,
                            products: shoppingResult.products,
                            winnerProduct: shoppingResult.winnerProduct,
                            winnerUrl: shoppingResult.winnerUrl
                        }
                    });
                    return;
                }
            } catch (e) {
                console.error("Shopping Engine Failed", e);
                onProgress({ status: 'error', message: `Shopping Error: ${e.message}` });
                return;
            }
        }


        // SYSTEM PROMPT FOR BEST PRODUCT FINDER (SMART SHOPPER)
        const navigatorSystemPrompt = `
You are Nova, a Smart Shopping Agent & Researcher (Navigator) with VISION capabilities.
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
                // [OPTIMIZED] Only re-enable overlay if URL changed (avoids flicker)
                if (lastUrl !== state?.url) {
                    try {
                        chrome.tabs.sendMessage(tab.id, { type: 'ENABLE_DOM_OVERLAY' }).catch(() => { });
                    } catch (e) { }
                }

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
                                    item.v = i.attributes?.value ?? '';
                                    item.placeholder = i.attributes?.placeholder || '';
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
            2. IF INPUT IS EMPTY (v=""), TYPE into it.
            3. IF INPUT ALREADY HAS A VALUE (v is not empty), DO NOT TYPE INTO IT AGAIN. MOVE TO THE NEXT EMPTY FIELD.
            4. IF "Go to X", USE NAVIGATE ACTION.
            5. LOOP PREVENTION: If you clicked an ID (e.g. 23) in the last step and URL did NOT change, DO NOT CLICK IT AGAIN. Scroll or try another.
            6. EXPLORE: If looking for "best" or "under X", SCROLL at least twice to see options before choosing.
            7. YOUTUBE TIP: PRIORITIZE clicking elements with eid='video-title' or eid='thumbnail' or href='/watch...'. Avoid generic 'More actions' buttons.
            8. **MEDIA AWARENESS**: IF MEDIA STATE IS 'PLAYING':
               (A) IF GOAL IS "PLAY/WATCH/LISTEN": OUTPUT ACTION "FINISH".
               (B) IF GOAL IS "RESEARCH/SUMMARIZE/FIND BEST": IGNORE PLAYBACK, EXTRACT INFO, AND NAVIGATE TO NEXT RESULT. DO NOT CLICK PAUSE.
            9. **FORM FILLING**: When filling multiple fields:
               - Fill fields ONE BY ONE, in order (top to bottom).
               - After typing into a field, IMMEDIATELY move to the NEXT empty field. Check its 'v' property.
               - If 'v' already has a value, SKIP that field.
               - NEVER re-type into a field that already has a value.
               - When a search bar is filled, add "submit": true to the action to press Enter.
               - When ALL fields are filled, use ANSWER to report completion.
            10. **CODE EDITORS**: If you see an element with tag "editor" (type: code-editor):
               - Use TYPE with its ID and value containing the code to write.
               - The system will handle focusing and inserting code automatically.
               - Write COMPLETE code, not partial snippets.
            11. **SHOPPING ACTIONS**:
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
                    ], null, { temperature: 0.1, signal: signal });
                } catch (e) {
                    console.error("LLM Request Failed:", e);
                    history.push(`System: LLM Error(${e.message}).Retrying...`);
                    // [NEW] Abortable Wait - reduced from 2000ms
                    await this.wait(500, signal);
                    continue; // Retry loop
                }

                checkStop(); // Check stop after LLM call before parsing

                let action;
                try {
                    // Robust JSON Extraction Strategy (Brace Counting & Pre-cleaning)
                    const extractJSON = (str) => {
                        if (!str) return null;

                        // Clean up markdown block if present
                        let cleanStr = str;
                        if (cleanStr.includes('```json')) {
                            cleanStr = cleanStr.replace(/```json/gi, '').replace(/```/g, '');
                        } else if (cleanStr.includes('```')) {
                            cleanStr = cleanStr.replace(/```/g, '');
                        }

                        // Try finding the first '{' and the last '}'
                        const firstBrace = cleanStr.indexOf('{');
                        const lastBrace = cleanStr.lastIndexOf('}');

                        if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                            let potentialJson = cleanStr.substring(firstBrace, lastBrace + 1);

                            // Attempt to fix common LLM JSON errors before parsing
                            try {
                                // 1. Remove trailing commas before closing braces
                                potentialJson = potentialJson.replace(/,\s*}/g, '}');
                                // 2. Remove trailing commas before closing brackets
                                potentialJson = potentialJson.replace(/,\s*\]/g, ']');
                                // 3. Fix unescaped newlines within strings (basic attempt)
                                potentialJson = potentialJson.replace(/\\n/g, '\\\\n');

                                return JSON.parse(potentialJson);
                            } catch (e) {
                                console.warn("AgentService: First JSON parse pass failed, trying regex fallback.", e.message);
                                // If standard parse fails, it might be the "Expected double-quoted property name" error.
                                // We rely on the LLM to format the keys correctly, but sometimes it doesn't.
                                // Let the catch block handle the complete failure.
                                throw e;
                            }
                        }
                        return null;
                        return null;
                    };

                    action = extractJSON(llmResponse);

                    if (!action) {
                        throw new Error("No JSON found in response.");
                    }

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

                // Send the LLM's thinking as a log entry for the reasoning box
                if (action.thought) {
                    onProgress({
                        status: 'thinking',
                        message: action.thought,
                        logEntry: {
                            type: 'thought',
                            message: `💭 ${action.thought}`,
                            timestamp: new Date().toLocaleTimeString()
                        }
                    });
                }

                onProgress({
                    status: 'navigating',
                    message: action.thought || `Executing ${action.action}...`,
                    logEntry: {
                        type: 'navigate',
                        message: `${action.action}: ${action.value || action.text || `ID ${action.id}`}`,
                        timestamp: new Date().toLocaleTimeString()
                    }
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
                        history.push(`System: You just executed '${action.action}' on ID ${action.id} and nothing changed.You MUST do something different(e.g.SCROLL or click a different element).`);
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
                        // [OPTIMIZED] Shorter wait for TYPE/CLICK, longer for NAVIGATE.
                        const waitTime = (action.action === 'NAVIGATE') ? 800 : 400;
                        await this.wait(waitTime, signal);

                        // [NEW] RECOVERY ENGINE INTEGRATION
                        // 1. Fetch Fresh State
                        const newState = await this._getState(tab.id);

                        // 2. Verify Outcome
                        const verification = await recoveryEngine.constructor.verifyOutcome(state, newState, action);

                        if (!verification.success) {
                            console.warn("AgentService: Action Verification Failed", verification);
                            history.push(`System: Action failed(${verification.reason}).Triggering Recovery...`);

                            // 3. Trigger Recovery
                            try {
                                const recoveryAction = await recoveryEngine.recover(
                                    verification.errorType,
                                    userRequest,
                                    action,
                                    newState.url || "unknown",
                                    newState.textContext || ""
                                );

                                onProgress({ status: 'navigating', message: `Recovering: ${recoveryAction.thought} ` });
                                history.push(`System: Recovery Plan: ${recoveryAction.thought} `);

                                // 4. Execute Fix Immediately
                                await hybridCore.executeAction(recoveryAction, newState.interactives, tab.id);
                                await this.wait(1000, signal);
                            } catch (recError) {
                                console.error("Recovery Failed:", recError);
                                history.push(`System: Recovery failed.Skipping step.`);
                            }
                        }

                    } catch (err) {
                        if (signal.aborted) throw new Error("STOP_SIGNAL"); // Check stop in catch

                        // [FIX] SPECIFIC HANDLING FOR "ID NOT FOUND"
                        // Instead of entering the complex Recovery Engine (which consumes tokens and time),
                        // simply tell the LLM it made a mistake and force a retry.
                        if (err.message.includes("Target element with ID") || err.message.includes("not found")) {
                            console.warn("AgentService: Element missing. Feeding back to LLM.");
                            history.push(`System Error: ${err.message}. The element might have moved or is hidden.Please Check the 'INTERACTIVE ELEMENTS' list again and choose a valid ID.`);
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
                            history.push(`System: Exception caught.Recovery Plan: ${fix.thought} `);
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
                You are Nova, the Navigator.You ran out of steps / time while trying to help the user.
                User Goal: "${userRequest}"

                Execution History:
                ${historyText}

INSTRUCTIONS:
1. Summarize what you found so far.
                2. If you found products / prices, list them.
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
                            message: `** Time Limit Reached.**\n\nHere is a summary of what I found: \n\n${finalResponse} `
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
