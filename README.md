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

### 🧠 Core Capabilities

#### 1. Agent Mode (The Brain)
The core recursive reasoning loop. Visualizes the Planner -> Navigator -> Validator cycle and dynamic action execution.
<video src="extension/public/videos/Agent Mode.mp4" controls width="100%"></video>

#### 2. Web Search Agent
Autonomous research assistant. Synthesizes fact-based answers from live web data.
<video src="extension/public/videos/Web Search.mp4" controls width="100%"></video>

#### 3. Shopping Agent
Specialized for e-commerce. Performs cross-platform price comparison, spec extraction, and deal analysis.
<video src="extension/public/videos/Shopping Agent.mp4" controls width="100%"></video>

#### 4. Image Generation
Integrated diffusion models to synthesize assets directly from natural language prompts.
<video src="extension/public/videos/Image Generation.mp4" controls width="100%"></video>

### 📁 Management & Utilities

#### 5. Files Analyzer
Demonstration of local file system analysis capabilities.
<video src="extension/public/videos/Files Analyzer.mp4" controls width="100%"></video>

#### 6. Side Panel Overview
A tour of the extension's side panel interface.
<video src="extension/public/videos/Side Panel Overview.mp4" controls width="100%"></video>

#### 7. Text-to-Speech (TTS)
Demonstrating the voice interaction features.
<video src="extension/public/videos/TTS.mp4" controls width="100%"></video>

### ⚙️ Getting Started

#### 8. Tutorial & Settings
Configuration guide and initial tutorial.
<video src="extension/public/videos/Tutorial & Settings.mp4" controls width="100%"></video>

#### 9. Installation Guide
Walkthrough on how to build and load the extension.
<video src="extension/public/videos/How to install extension.mp4" controls width="100%"></video>

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
