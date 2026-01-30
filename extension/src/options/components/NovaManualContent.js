export const novaManualContent = `
# Nova Browser Agent (AgenticBrowser)
> **The Advanced AI-Powered Chrome Extension**



---

## 📚 Documentation
*Navigate the future of browser automation.*

### **Table of Contents**

#### **I. Get Started**
1.  [Overview](#1-overview)
2.  [Quick Start](#2-quick-start)
3.  [Models & Pricing](#3-models--pricing)
4.  [Libraries & Tech Stack](#4-libraries--tech-stack)
5.  [MCP Support](#5-mcp-model-context-protocol-support)

#### **II. Core Concepts**
6.  [Agentic Mode vs Simple Mode](#6-agentic-mode-vs-simple-mode)
7.  [Image Generation](#7-image-generation)
8.  [DOM Analysis & Vision](#8-dom-analysis--vision)

#### **III. Agents**
9.  [Agent Mode (The Brain)](#9-agent-mode-the-brain)
10. [Shopping Agent (Deep Research)](#10-shopping-agent-deep-research)
11. [Web Search Agent](#11-web-search-agent)
12. [Video/Media Agent](#12-videomedia-agent)

#### **IV. Tools & Capabilities**
13. [Files Analyzer (RAG)](#13-files-analyzer-rag)
14. [Text-to-Speech (TTS)](#14-text-to-speech-tts)
15. [Tab Management](#15-tab-management)

#### **V. Run and Scale**
16. [Installation](#16-installation-developer-mode)
17. [Permissions & Security](#17-permissions--security)

#### **VI. Evaluation & Optimization**
18. [Action Prediction (HybridCore)](#18-action-prediction-hybridcore)
19. [Recovery Engine](#19-recovery-engine)
20. [Site Memory](#20-site-memory)

#### **VII. Architecture & API**
21. [Real-time API & Streaming](#21-real-time-api--llm-streaming)
22. [Orchestration (AgentService)](#22-orchestration-agentservice)

#### **VIII. Future**
23. [Coding Agents](#23-coding-agents)
24. [Going Live](#24-going-live)

---

## I. Get Started

### 1. Overview
**Nova** is not just a chatbot; it is an **Agentic execution engine** living inside your browser. Unlike traditional extensions that passively read content, Nova uses the **Chrome Debugger Protocol (CDP)** to actively drive the browser—clicking, scrolling, typing, and navigating just like a human user. It is built for privacy (local-first) and power (BYOK).

**Core Logic:**
Nova operates on a **Local-First, Cloud-Hybrid** architecture. The "Brain" (Intent Recognition & Planning) runs in the Service Worker, while the "Hands" (Execution) operate via CDP. This separation ensures that your browsing data never leaves your local machine, except for the specific prompted content sent to the LLM.

### 2. Quick Start
Get up and running in 30 seconds.
1.  **Load Unpacked**: Enable *Developer Mode* in \`chrome://extensions\`, verify \`manifest.json\`, and load the \`dist\` folder.
2.  **Launch**: Press \`Alt+Shift+R\` or click the Nova icon to open the Side Panel.
3.  **Authenticate**: Sign in via Supabase (Local/Cloud) to sync preferences.
4.  **Connect Intelligence**: Navigate to **Settings > LLM Providers**. Input your API Key for **OpenAI** (GPT-4o) or **Anthropic** (Claude 3.5 Sonnet).
5.  **Execute**: Toggle "Agent Mode" and type: *"Go to YouTube and find a tutorial on React Hooks."*

### 3. Models & Pricing
Nova follows a **Bring Your Own Key (BYOK)** architecture. We do not act as a middleman.
*   **Zero Markup**: You pay directly to your model provider.
*   **Security**: Keys are encrypted using AES-256 in \`chrome.storage.local\`. They never leave your machine except to hit the inference API.
*   **Supported Providers**:
    *   **OpenAI**: GPT-4o (Recommended for Agents), GPT-4o-mini (Fast).
    *   **Anthropic**: Claude 3.5 Sonnet (Best for Coding/DOM).
    *   **Gemini**: Flash 1.5 (High Context Window).

### 4. Libraries & Tech Stack
Built on modern, type-safe foundations.
*   **Core**: React 18, Vite 5, TailwindCSS.
*   **Runtime**: Manifest V3 (Service Worker based).
*   **Protocol**: Chrome Debugger Protocol (CDP) via \`chrome.debugger\`.
*   **State**: Zustand + Supabase (Auth).
*   **Animation**: Framer Motion.

### 5. MCP (Model Context Protocol) Support
Nova implements the **Model Context Protocol**, allowing LLMs to perceive the browser as a strictly typed toolset.
*   **Tools**: \`CLICK\`, \`TYPE\`, \`SCROLL\`, \`NAVIGATE\`, \`READ\`.
*   **Schema**: Each tool is defined with Zod schemas, ensuring the LLM outputs valid JSON actions that \`AgentService.js\` can parse and execute reliably.

---

## II. Core Concepts

### 6. Agentic Mode vs Simple Mode
*   **Simple Mode**: A RAG-enhanced chat interface. Uses \`SearchService.js\` for web queries but cannot control the browser. Ideal for Q&A and summarizing uploaded files.
*   **Agentic Mode**: Activates the **Navigator**. The System Prompt shifts to an Action-Execution Loop. The agent gains "Hands" (CDP access) and "Eyes" (DOM Analysis).

**Logic Flow:**
1.  **User Input**: "Book a flight to NYC."
2.  **Router**: Detects intent -> \`AGENTIC\`.
3.  **Planner**: Generates step-by-step plan (Navigate -> Select Date -> Fill Form).
4.  **Executor**: Performs actions one by one.



### 7. Image Generation
Integrated capability to synthesize visual assets on the fly.
*   **Pipeline**: Intent Detector -> \`ImageAgent.js\` -> DALL-E 3 / Flux API.
*   **Output**: Renders high-res images directly in the chat stream with download options.



### 8. DOM Analysis & Vision
How Nova "sees" the web:
*   **Visual Accessibility Tree**: \`Observer.js\` scans the DOM, stripping noise (\`<div>\` wrappers) and keeping only interactive nodes (\`<a>\`, \`<button>\`, \`<input>\`).
*   **Viewport Awareness**: Calculates bounding boxes (\`x, y, width, height\`) relative to the viewport.
*   **Computer Vision**: Takes screenshots of the visible area to verify if elements are visually obstructed (e.g., by a popup or ad) before interacting.

**Code Logic (Observer.js):**
\`\`\`javascript
// Scans the DOM and assigns unique IDs to interactive elements
function getBrowserState() {
    const interactives = document.querySelectorAll('button, a, input, [role="button"]');
    return Array.from(interactives).map((el, index) => ({
        id: index + 1,
        tag: el.tagName,
        text: el.innerText || el.ariaLabel,
        rect: el.getBoundingClientRect() // Used for coordinate-based clicking
    }));
}
\`\`\`



---

## III. Agents

### 9. Agent Mode (The Brain)
**File**: \`src/services/AgentService.js\`
The heart of Nova. It operates as a recursive State Machine:
1.  **OBSERVE**: \`Observer.js\` scrapes the current state (URL, Title, Interactives).
2.  **THINK**: Context + State is sent to the LLM.
3.  **PLAN**: LLM generates a JSON Action (e.g., \`{"action": "CLICK", "id": 42}\`).
4.  **ACT**: \`Navigator.js\` executes the CDP command.
5.  **VERIFY**: \`Validator.js\` checks if the action succeeded (e.g., URL changed).

**Hybrid Execution Logic (Navigator.js):**
To handle modern React/Angular apps that block programmatic clicks:
\`\`\`javascript
async executeStep(action) {
    if (action.action === "CLICK") {
        // 1. Try Standard JS Click
        const jsSuccess = await this.tryJSClick(action.id);
        if (!jsSuccess) {
            // 2. Fallback: Hardware Mouse Simulation via CDP
            const { x, y } = action.coordinates;
             await chrome.debugger.sendCommand({ tabId }, "Input.dispatchMouseEvent", { 
                type: "mousePressed", x, y, button: "left" 
            });
            await chrome.debugger.sendCommand({ tabId }, "Input.dispatchMouseEvent", { 
                type: "mouseReleased", x, y, button: "left" 
            });
        }
    }
}
\`\`\`

### 10. Shopping Agent (Deep Research)
**File**: \`src/services/ShoppingService.js\`
A specialized 4-stage vertical agent for e-commerce excellence.
1.  **Constraint Parsing**: LLM extracts \`Category\`, \`Budget\`, and \`Brand\` from your prompt.
2.  **Universe Building**:
    *   Searches for "Best [Category] Reviews".
    *   **Deep Read**: Fetches full HTML of top 3 editorial reviews (not just snippets).
    *   **Extraction**: Identifies the top 3-5 distinct product models mentioned.
3.  **Price Resolution**:
    *   Scrapes Amazon.in, Flipkart, and Croma for each model.
    *   **Hybrid Extraction**: Regex for fast snippet pricing, LLM for complex page pricing.
4.  **Comparison Engine**: Calculation of "Effective Price" by factoring in Bank Offers and Coupons relative to the Base Price.

**Shopping Logic Snippet:**
\`\`\`javascript
async resolvePrices(product) {
    // Parallel Search across multiple vendors
    const sites = ['amazon.in', 'flipkart.com', 'croma.com'];
    const snapshots = await Promise.all(sites.map(site => 
        SearchService.search(\`buy \${product.name} site:\${site}\`)
    ));
    // Select best deal based on effective price
    return snapshots.sort((a, b) => a.price - b.price)[0];
}
\`\`\`



### 11. Web Search Agent
**File**: \`src/services/SearchService.js\`
Your autonomous research assistant.
*   **Engine**: DuckDuckGo HTML/API (Privacy-focused, no tracking).
*   **Deep Fetch**: \`fetchPageContent(url)\` retrieves the raw HTML of search results, enabling the agent to "read" the pages and synthesize a comprehensive answer with citations.



### 12. Video/Media Agent
*   **Detection**: Automatically identifies video players (YouTube, Vimeo, generic \`<video>\`).
*   **Control**: Exposes playback controls (Play, Pause, Mute) to the LLM.
*   **Media Awareness**: \`AgentService\` checks \`state.media.isPlaying\` to decide whether to interrupt or let you watch.

---

## IV. Tools & Capabilities

### 13. Files Analyzer (RAG)
**File**: \`src/services/ContentReader.js\`
Chat with your documents locally.
*   **PDF Parsing**: Uses \`pdfjs-dist\` (bundled worker) to extract text from PDFs client-side.
*   **Code Analysis**: Native scanning of \`.js\`, \`.py\`, \`.json\` files.
*   **Injection**: File context is dynamically injected into the System Prompt, allowing for sophisticated Q&A on private data.

### 14. Text-to-Speech (TTS)
Give Nova a voice.
*   **Engine**: OpenAI Audio API (Neural TTS).
*   **Playback**: Streams audio buffers in real-time for low-latency feedback.

### 15. Tab Management
Natural language control over your browser workspace.
*   **Commands**: "Close duplicates", "Group social tabs", "Switch to GitHub".
*   **Implementation**: Maps intent to \`chrome.tabs.query\`, \`chrome.tabs.group\`, and \`chrome.tabs.remove\`.

---

## V. Run and Scale

### 16. Installation (Developer Mode)
1.  Clone the repository.
2.  \`npm install\` dependencies.
3.  \`npm run build\` to generate the production \`dist\` folder.
4.  Load \`dist\` in Chrome via "Load Unpacked".

### 17. Permissions & Security
*   **\`activeTab\`**: Grants ephemeral access only when you invoke the agent.
*   **\`debugger\`**: Required for CDP (Navigation/Clicks).
*   **\`declarativeNetRequest\`**: Powers the **FirewallService** to block trackers and malicious scripts during agent navigation.

**Firewall Logic (FirewallService.js):**
\`\`\`javascript
// Blocks specific domains/patterns at the network level
chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
        id: 1,
        priority: 1,
        action: { type: 'block' },
        condition: { urlFilter: "||doubleclick.net", resourceTypes: ["script"] }
    }]
});
\`\`\`



---

## VI. Evaluation & Optimization

### 18. Action Prediction (HybridCore)
**File**: \`src/MACHINE_LEARNING/HybridCore.js\`
*   **Latency models**: A lightweight heuristic model that predicts the next likely step (e.g., "Login" -> "Type Email") based on user history, skipping the expensive LLM round-trip for routine actions.

### 19. Recovery Engine
**File**: \`src/MACHINE_LEARNING/RecoveryEngine.js\`
Self-healing capabilities.
*   **Loop Detection**: Checks if the agent is clicking the same Element ID repeatedly without state change.
*   **Stale Element Handling**: If a React re-render changes DOM IDs, it falls back to **Fuzzy Text Matching** ("Click button containing 'Submit'").

### 20. Site Memory
**File**: \`src/MACHINE_LEARNING/SiteMemory.js\`
*   **Persistent Cache**: Remembers the selectors for key interactions (Search Bar, Login Button, Cart) on your top domains (\`amazon.com\`, \`github.com\`), reducing "Think Time" by 40% on return visits.



---

## VII. Architecture & API

### 21. Real-time API & LLM Streaming
Nova uses a custom stream parser to derive a "Real-Time" feel.
*   **Token Streaming**: \`LLMClient.js\` processes Server-Sent Events (SSE).
*   **Branching**: Separates "Thought Process" (Hidden/Log) from "Final Answer" (Visible) instantly.

### 22. Orchestration (AgentService)
**File**: \`src/services/AgentService.js\`
The master controller.
*   **Task Loop**: \`runNavigatorLoop\` handling the lifecycle of a task.
*   **Safety**: Manages \`AbortController\` signals to immediately halt execution when the user clicks Stop.

---

## VIII. Future

### 23. Coding Agents
*Experimental Phase*.
Enabling Nova to write and execute **Sandboxed Python/JS** code directly within the browser context to perform data analysis, graphing, and complex calculation on scraped datasets.

### 24. Going Live
*   **Deployment**: Automated GitHub Actions pipeline to build \`dist\`.
*   **Updates**: Self-hosting update manifest/CRX handling for enterprise distribution.

---

*Verified by Manoj Kumar. Powered by Nova Intelligence.*
`;
