# Nova Browser Agent (AgenticBrowser)

> **The Advanced AI-Powered Chrome Extension**
>
> *Verified by Manoj Kumar. Powered by Nova Intelligence.*

---

## 📖 Overview

**Nova** is not just a chatbot; it is an **Agentic execution engine** living inside your browser. Unlike traditional extensions that passively read content, Nova uses the **Chrome Debugger Protocol (CDP)** to actively drive the browser—clicking, scrolling, typing, and navigating just like a human user. It is built for privacy (local-first) and power (Bring Your Own Key).

### 🔒 Privacy & Ownership
*   **Owner**: **Manoj Kumar**
*   **Privacy Model**: Local-First. Your data stays on your machine.
*   **Key Storage**: Encrypted AES-256 in `chrome.storage.local`. Keys are never sent to our servers.
*   **No Tracking**: We do not collect browsing history or analytics unless explicitly enabled.

---

## 📽️ Feature Demonstrations

Explore the capabilities of Nova through these video walkthroughs.

### 1. Agent Mode (The Brain)
The core recursive reasoning loop. Visualizes the Planner -> Navigator -> Validator cycle, DOM tree traversal, and dynamic action execution on live web pages. 

https://github.com/manojkumarfade/NOVA/assets/extension/dist/videos/Agent%20Mode.mp4

### 2. Shopping Agent (Deep Research)
A specialized vertical agent for e-commerce excellence. Features cross-platform price comparison, product specification extraction, and deal analysis algorithms to find the best value across multiple vendors.

https://github.com/manojkumarfade/NOVA/assets/extension/dist/videos/Shopping%20Agent.mp4

### 3. Web Search Agent
Your autonomous research assistant. Formulates queries, scrapes SERPs, filters irrelevant results, and uses an LLM to synthesize concise, fact-based answers from live web data.

https://github.com/manojkumarfade/NOVA/assets/extension/dist/videos/Web%20Search.mp4

### 4. Image Generation
Integrated capability to synthesize visual assets on the fly. Integrates diverse diffusion models to synthesize visual assets directly from natural language prompts.

https://github.com/manojkumarfade/NOVA/assets/extension/dist/videos/Image%20Generation.mp4

### 5. Files Analyzer (RAG)
Technical overview of the RAG (Retrieval-Augmented Generation) pipeline. Demonstrates how the system parses, chunks, and embeds uploaded documents (PDFs, Code) for semantic search.

https://github.com/manojkumarfade/NOVA/assets/extension/dist/videos/Files%20Analyzer.mp4

### 6. Side Panel Overview
Architectural tour of the primary interface. Detailed breakdown of the chat layer, context retention mechanisms, and the real-time event stream UI.

https://github.com/manojkumarfade/NOVA/assets/extension/dist/videos/Side%20Panel%20Overview.mp4

### 7. TTS (Text-to-Speech)
Analysis of the Neural Text-to-Speech engine. Shows how text streams are converted to synthesized audio with low latency and high fidelity.

https://github.com/manojkumarfade/NOVA/assets/extension/dist/videos/TTS.mp4

---

## 🛠️ Tech Stack & Architecture

Built on modern, type-safe foundations.

*   **Core**: React 18, Vite 5, TailwindCSS
*   **Runtime**: Manifest V3 (Service Worker based)
*   **Protocol**: Chrome Debugger Protocol (CDP) via `chrome.debugger`
*   **State**: Zustand + Supabase (Auth)
*   **Animation**: Framer Motion
*   **AI Models**: OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Gemini Flash 1.5

---

## 🧩 Core Concepts & Code

### DOM Analysis (The Eyes)
Nova "sees" the web by stripping noise and creating a **Visual Accessibility Tree**.

**Code Logic (`Observer.js`):**
```javascript
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
```

### Hybrid Execution (The Hands)
Handles modern React/Angular apps that block programmatic clicks by falling back to CDP hardware simulation.

**Code Logic (`Navigator.js`):**
```javascript
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
```

### Firewall Logic (Security)
Blocks specific domains/patterns at the network level using `declarativeNetRequest`.

**Code Logic (`FirewallService.js`):**
```javascript
chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
        id: 1,
        priority: 1,
        action: { type: 'block' },
        condition: { urlFilter: "||doubleclick.net", resourceTypes: ["script"] }
    }]
});
```

---

## 🚀 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/manojkumarfade/NOVA.git
    cd NOVA
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Build the Extension**:
    ```bash
    npm run build:extension
    ```
    *This will generate the production build in `extension/dist`.*

4.  **Load in Chrome**:
    *   Open `chrome://extensions`
    *   Enable **Developer Mode** (top right)
    *   Click **Load Unpacked**
    *   Select the `extension/dist` folder

---

Created with ❤️ by **Manoj Kumar** © 2026. All Rights Reserved.
