# Nova Browser Agent (AgenticBrowser)

[![Chrome Web Store](https://img.shields.io/badge/Chrome_Web_Store-Coming_Soon-blue?style=for-the-badge&logo=google-chrome&logoColor=white)](https://github.com/manojkumarfade/NOVA)

> **The Advanced AI-Powered Chrome Extension**
> *Verified by Manoj Kumar. Powered by Nova Intelligence.*

---

## 📖 Overview

**Nova** is an **Agentic execution engine** living inside your browser. Not just a chatbot, Nova uses the **Chrome Debugger Protocol (CDP)** to actively drive the browser—clicking, scrolling, typing, and navigating like a human. 

| **Ownership** | **Privacy Model** | **Security** |
| :--- | :--- | :--- |
| **Manoj Kumar** | **Local-First** (Data on your machine) | **AES-256 Encrypted** Keys |

---

## 📽️ Visual Showcase

Explore Nova's capabilities through these powerful features.

### 1. Agent Mode (The Brain)
Experience the core recursive reasoning loop in action. Nova decomposes complex user requests into executable steps using its **Planner**, executes them via the **Navigator**, and self-corrects using the **Validator**. Watch as it dynamically interacts with the browser, handling errors and refining its approach in real-time.

_Watch how Nova thinks and acts._

<video src="https://github.com/manojkumarfade/NOVA/raw/main/extension/public/videos/Agent%20Mode.mp4" controls="controls" width="100%"></video>

![Agent Mode](photos/Agentic%20mode.png)
![Agent Mode 2](photos/Agentic%20mode2.png)

---

### 2. Shopping Agent
Your personal e-commerce assistant. Nova autonomously navigates multiple online stores (like Amazon, Flipkart), extracts detailed product specifications, compares prices across platforms, and presents a comprehensive deal analysis so you never overpay.

_See Nova find the best deals._

<video src="https://github.com/manojkumarfade/NOVA/raw/main/extension/public/videos/Shopping%20Agent.mp4" controls="controls" width="100%"></video>

![Shopping Agent](photos/Shopping%20Agent.png)
![Shopping Agent 2](photos/Shopping2.png)

---

### 3. Files Analyzer
Unlock insights from your local documents. Simply upload files (PDFs, Docs), and Nova's intelligent parsing engine will summarize contents, answer specific questions, and extract key data points, turning static files into interactive knowledge.

_Unlock insights from your files._

<video src="https://github.com/manojkumarfade/NOVA/raw/main/extension/public/videos/Files%20Analyzer.mp4" controls="controls" width="100%"></video>

![Files Analyzer](photos/Files%20Analyzer.png)

---

### 4. Web Search Agent
An autonomous research powerhouse. Nova browses the live web, reads multiple sources, filters out noise, and synthesizes fact-based answers with citations. It's like having a human researcher working for you at machine speed.

_Research made effortless._

<video src="https://github.com/manojkumarfade/NOVA/raw/main/extension/public/videos/Web%20Search.mp4" controls="controls" width="100%"></video>

![Web Search](photos/Web_search.png)
![Web Search 2](photos/Web_search2.png)

---

### 5. Image Generation
Bring ideas to life instantly. Using integrated diffusion models, Nova can generate high-quality visual assets directly within the browser based on your natural language prompts—perfect for designers, creators, and visual thinkers.

_Create visuals instantly._

<video src="https://github.com/manojkumarfade/NOVA/raw/main/extension/public/videos/Image%20Generation.mp4" controls="controls" width="100%"></video>

![Image Gen](photos/Image_gen.png)
![Image Gen 2](photos/Image_gen2.png)

---

### 6. Side Panel Overview
Your command center, always a click away. The sleek Side Panel interface provides unified access to all agents and tools without cluttering your browsing experience. Manage tasks, view history, and switch modes seamlessly.

_Your command center._

<video src="https://github.com/manojkumarfade/NOVA/raw/main/extension/public/videos/Side%20Panel%20Overview.mp4" controls="controls" width="100%"></video>

![Side Panel](photos/Side%20panel.png)

---

### 7. Text-to-Speech (TTS) & Chat
Interact naturally with voice. Nova features advanced Text-to-Speech capabilities, allowing it to speak responses for a truly hands-free experience. Combined with a rich chat history, conversations feel fluid and accessible.

_Listen to Nova speak._

<video src="https://github.com/manojkumarfade/NOVA/raw/main/extension/public/videos/TTS.mp4" controls="controls" width="100%"></video>

![TTS](photos/TTS.png)
![Chat History](photos/Chat_history.png)

---

### 8. Tutorial, Settings & Support
Full control at your fingertips. Customize agent behavior, manage privacy settings, and access guided tutorials to master Nova's features. Built-in support ensures you're never left guessing.

_Customize your experience._

<video src="https://github.com/manojkumarfade/NOVA/raw/main/extension/public/videos/Tutorial%20&%20Settings.mp4" controls="controls" width="100%"></video>

![Support](photos/Support.png)
![Live Chat](photos/Live_chat.png)

---

### 9. Security & DOM Vision
See what Nova sees. The **Visual Accessibility Tree** maps the DOM for precise interaction, while the built-in **Security Firewall** proactively blocks trackers and malicious domains using `declarativeNetRequest`.

![Firewall](photos/Firewall.png)
![DOM Interaction](photos/DOM%20Interaction.png)
![DOM Logic 2](photos/DOM%20Interaction2.png)
![DOM With Image](photos/Dom%20with%20image.png)

---

### 10. Analytics Dashboard
Transparency first. Monitor real-time usage metrics, track token consumption, and analyze agent performance. Stay informed about costs and efficiency with detailed visualizations.

![Analytics](photos/Analytics.png)
![Analytics Dashboard](photos/Analytics_dashboard.png)

---

## 🛠️ Tech Stack using Modern Standards

| Category | Technologies |
| :--- | :--- |
| **Core Framework** | React 18, Vite 5, TailwindCSS |
| **Extension Runtime** | Manifest V3 (Service Worker based) |
| **Browser Protocol** | Chrome Debugger Protocol (CDP) |
| **State Management** | Zustand + Supabase (Auth) |
| **AI Models** | GPT-4o, Claude 3.5 Sonnet, Gemini Flash 1.5 |

---

## 🚀 Quick Start Guide

> **📹 Watch the Installation Guide:**
>
> <video src="https://github.com/manojkumarfade/NOVA/raw/main/extension/public/videos/How%20to%20install%20extension.mp4" controls="controls" width="100%"></video>

**1. Clone the repository**
```bash
git clone https://github.com/manojkumarfade/NOVA.git
cd NOVA
```

**2. Install Dependencies**
```bash
npm install
```

**3. Build the Extension**
```bash
npm run build:extension
# Generates production build in extension/dist
```

**4. Load in Chrome**
1. Open `chrome://extensions`
2. Enable **Developer Mode**
3. Click **Load Unpacked** -> Select `extension/dist`

---

## 🧩 Core Logic (Under the Hood)

<details>
<summary><b>🧠 The Cognitive Loop (The Brain)</b></summary>
<br>
Nova operates on a recursive reasoning cycle: <b>Observe -> Think -> Act -> Verify</b>.

```javascript
// AgentService.js (Simplified)
while (!isFinished && turnCount < maxTurns) {
    // 1. OBSERVE: Get visual state of the browser
    const state = await Observer.getBrowserState(tab.id);
    
    // 2. THINK: Predict next action using LLM
    const prompt = `Goal: ${userRequest} \n State: ${state}`;
    const action = await LLMClient.chatCompletion(prompt);
    
    // 3. ACT: Execute action via CDP
    await hybridCore.executeAction(action, state.interactives);
    
    // 4. VERIFY: Check if the action had the desired effect
    const newState = await Observer.getBrowserState(tab.id);
    if (newState.url === state.url) {
        history.push("System: Action seemed to fail. Retrying...");
    }
}
```
</details>

<details>
<summary><b>👁️ DOM Analysis (The Eyes)</b></summary>
<br>
Nova scans the DOM and assigns unique IDs to interactive elements to create a Visual Accessibility Tree.

```javascript
// Observer.js
function getBrowserState() {
    const interactives = document.querySelectorAll('button, a, input');
    return Array.from(interactives).map((el, index) => ({
        id: index + 1,
        tag: el.tagName,
        rect: el.getBoundingClientRect()
    }));
}
```
</details>

<details>
<summary><b>🤖 Hybrid Execution (The Hands)</b></summary>
<br>
Handles modern apps by falling back to CDP hardware simulation when JS clicks fail.

```javascript
// Navigator.js
async executeStep(action) {
    if (action.action === "CLICK") {
        const jsSuccess = await this.tryJSClick(action.id);
        if (!jsSuccess) {
            // Hardware Mouse Simulation
             await chrome.debugger.sendCommand({ tabId }, "Input.dispatchMouseEvent", { 
                type: "mousePressed", x, y, button: "left" 
            });
        }
    }
}
```
</details>

---

## 📬 Contact & Support

For support, feedback, or collaboration:

| Platform | Link |
| :--- | :--- |
| **LinkedIn** | [![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://www.linkedin.com/in/booramanojkumar/) |
| **Telegram** | [![Telegram](https://img.shields.io/badge/Telegram-Chat_With_Nova-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/nova_gent) |

---

Created with ❤️ by **Manoj Kumar** © 2026. All Rights Reserved.
