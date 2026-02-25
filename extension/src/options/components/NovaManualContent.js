export const novaManualContent = `
# 🚀 Nova Browser Agent — Complete Guide
> **The Advanced AI-Powered Chrome Extension**
> *Verified by Manoj Kumar. Powered by Nova Intelligence.*

---

## 📚 Table of Contents

### 🟢 Getting Started
1.  [Overview](#1-overview)
2.  [Quick Start](#2-quick-start)
3.  [Getting API Keys (Free!)](#3-getting-api-keys)
4.  [Models & Providers](#4-models--providers)

### 🧠 Core Features
5.  [Agent Mode (Browser Automation)](#5-agent-mode)
6.  [Shopping Agent (Compare Prices)](#6-shopping-agent)
7.  [Web Search Agent (Deep Research)](#7-web-search-agent)
8.  [Image Generation (+ Page Vision)](#8-image-generation)
9.  [Voice Agent (Multilingual)](#9-voice-agent)
10. [Song Detection & Recognition](#10-song-detection)
11. [File Upload & Analysis](#11-file-upload)

### 🛠️ Architecture
12. [DOM Analysis & Vision](#12-dom-analysis)
13. [Tech Stack](#13-tech-stack)
14. [Security & Privacy](#14-security)

### 🧪 Test Nova (Try These Prompts!)
15. [Testing Prompts](#15-testing-prompts)

---

## 🟢 Getting Started

---

### 1. Overview

**Nova** is NOT just a chatbot — it's an **Agentic Execution Engine** living inside your browser. 🧠

Unlike traditional extensions that passively read content, Nova uses the **Chrome Debugger Protocol (CDP)** to actively drive the browser — clicking, scrolling, typing, and navigating **just like a human**.

| 🏷️ Feature | 📋 Details |
| :--- | :--- |
| **Architecture** | Local-First, Cloud-Hybrid |
| **Privacy** | Data stays on YOUR machine |
| **Security** | AES-256 Encrypted API Keys |
| **Cost** | 100% Free & Open Source (BYOK) |

---

### 2. Quick Start

Get up and running in **30 seconds**! ⚡

1. 📦 **Load Extension**: Enable *Developer Mode* in \`chrome://extensions\`, click "Load Unpacked" → Select the \`dist\` folder
2. 🚀 **Launch**: Press \`Alt+Shift+R\` or click the Nova icon to open the Side Panel
3. 🔐 **Authenticate**: Sign in via Supabase (optional, for syncing preferences)
4. 🔑 **Connect Intelligence**: Go to **Settings > LLM Providers** → Input your API Key
5. 🎯 **Execute**: Toggle "Agent Mode" and type: *"Go to YouTube and find a tutorial on React Hooks"*

> 💡 **Tip**: Use the free API keys from **infip.pro** or **a4f.co** to get started instantly!

---

### 3. Getting API Keys

Nova follows a **Bring Your Own Key (BYOK)** model — we never touch your data. Here's where to get FREE keys:

| 🔑 Provider | 🌐 Link | 💰 Free Tier |
| :--- | :--- | :--- |
| **Infip.pro** | [infip.pro](https://infip.pro/) | ✅ Free with generous limits |
| **A4F.co** | [a4f.co/models](https://www.a4f.co/models) | ✅ Free AI models + image gen |
| **TypeGPT** | [api.typegpt.net](https://api.typegpt.net) | ✅ 20+ free models |
| **Google Gemini** | [aistudio.google.com](https://aistudio.google.com/apikey) | ✅ Free tier available |
| **OpenAI** | [platform.openai.com](https://platform.openai.com/api-keys) | 💲 Pay-as-you-go |
| **Anthropic** | [console.anthropic.com](https://console.anthropic.com/settings/keys) | 💲 Pay-as-you-go |
| **xAI (Grok)** | [console.x.ai](https://console.x.ai/) | 💲 Pay-as-you-go |
| **DeepSeek** | [api.deepseek.com](https://api.deepseek.com/) | 💲 Very affordable |

> 🎉 **Recommended for beginners**: Start with **Infip.pro** or **A4F.co** — they're completely free!

---

### 4. Models & Providers

Nova supports **50+ AI models** across multiple providers:

| Provider | Top Models |
| :--- | :--- |
| **TypeGPT** | DeepSeek R1, Qwen3-235B, Kimi K2, Mistral Large |
| **OpenAI** | GPT-5, GPT-4o, o3-pro, GPT-4.1-mini |
| **Anthropic** | Claude Opus 4.6, Sonnet 4.5, Haiku 4.5 |
| **Google** | Gemini 3 Pro, Gemini 2.5 Flash, Gemini 2.0 |
| **xAI** | Grok 4.1, Grok Vision, Grok 3 |

---

## 🧠 Core Features

---

### 5. Agent Mode

🤖 **The Brain** — Nova's flagship feature. It can **control your browser** autonomously.

**How it works:**
1. 👁️ **OBSERVE**: Scans the page DOM (buttons, links, inputs)
2. 🧠 **THINK**: Sends context to LLM for decision
3. 📋 **PLAN**: LLM generates JSON action (e.g., \`{"action": "CLICK", "id": 42}\`)
4. ✋ **ACT**: Executes via Chrome Debugger Protocol (CDP)
5. ✅ **VERIFY**: Checks if the action succeeded

**Key capabilities:**
- ✅ Fill forms automatically
- ✅ Navigate across websites
- ✅ Click buttons, select dropdowns
- ✅ Scroll to find elements
- ✅ Type text into fields
- ✅ Self-correct on failures (Recovery Engine)
- ✅ Loop detection (prevents infinite loops)

---

### 6. Shopping Agent

🛍️ **Your Personal Price Hunter** — Nova searches across **9-10 e-commerce websites** simultaneously using Tavily and DuckDuckGo search.

**How it works:**
1. 🔍 **Constraint Parsing**: Extracts product, budget, and brand from your query
2. 🌐 **Multi-Site Search**: Searches Amazon, Flipkart, Croma, and more
3. 💰 **Price Comparison**: Compares prices across all platforms
4. 🏆 **Winner Selection**: Picks the best deal

**Post-Task Actions:**
- 🛒 **Add to Cart** — Nova can navigate to the product and add it to your cart
- 🔗 **View Product** — Opens the direct product link
- ⚡ **Compare on Flash.co** — Runs a deeper comparison
- 🔄 **Research More** — Refines the search with more preferences

> 💡 **Note**: Shopping results include actual product links for direct purchase — no affiliate links!

---

### 7. Web Search Agent

🌐 **Deep Research Mode** — Opens **6 background tabs** simultaneously for comprehensive research.

**Features:**
- 🔍 Uses **Tavily Search** (primary) with **DuckDuckGo** fallback
- 📖 Deep-reads full page content (not just snippets)
- 📝 Synthesizes answers with **citations**
- ⚡ Parallel tab processing for speed
- 🧹 Auto-closes research tabs when done

---

### 8. Image Generation

🎨 **Create stunning images** from text prompts — with a unique **Page Vision** feature!

**Standard Generation:**
- Type a prompt → Nova generates high-quality images using DALL-E / Flux API
- Download generated images directly

**🆕 Page Vision Reference:**
- Use keywords like *"use this page as reference"* or *"based on this image"*
- Nova captures a **screenshot of the current page** and uses it as visual context
- The LLM fuses the visual data with your prompt for more accurate generation
- Perfect for designers using page layouts as inspiration

**Specialized Loader:**
- Image generation shows a premium **"Nova Intelligence"** loader with pulsing glow animations
- Rotating ambient messages: "Synthesizing visual lattice...", "Weaving photonic threads..."

---

### 9. Voice Agent

🎙️ **Talk to Nova** — Full voice interaction with **multilingual support**!

**Two Voice Modes (Separate Buttons):**

| Button | Location | What it does |
| :--- | :--- | :--- |
| 🎤 **Mic Button** | In the chat input bar | **Simple Voice Input** — Converts speech to text. Click to start, click again to stop. Your words fill the text input field. |
| 🎙️ **Voice Agent** | Next to the model selector (top bar) | **Full Voice Assistant** — Opens a full-screen overlay with TTS, multilingual conversations, barge-in, and Song Detection. |

**Voice Agent Features:**
- 🗣️ **Speech-to-Text + Text-to-Speech**: Full two-way voice conversation
- 🌍 **Multilingual**: Supports **Hindi, Telugu, English, Spanish, French, German** and more
- 💬 **Native Conversations**: Chat in your native language naturally
- 🔄 **Barge-In**: Interrupt Nova while it's speaking to ask follow-up questions
- 🎭 **Voice Overlay**: Beautiful full-screen voice interaction UI
- 🎵 **Song Mode**: Built-in song detection via lyrics (inside the Voice Agent overlay)

**Language Support:**
- English 🇬🇧 | Hindi 🇮🇳 | Telugu 🇮🇳 | Spanish 🇪🇸 | French 🇫🇷 | German 🇩🇪
- And many more native languages!

> 💡 **Tip**: Use the **Mic button** (🎤) for quick voice dictation. Use the **Voice Agent** (🎙️) button for full conversational AI with TTS responses.

---

### 10. Song Detection

🎵 **Song Recognition & Search** — Identify songs through lyrics!

**How it works:**
- 🎤 Sing or speak lyrics into the microphone
- 🔍 Nova searches the web to identify the song
- 📝 Returns song name, artist, album, and details

**Important Notes:**
- ⚠️ Nova detects **lyrics** (not background music/instrumentals)
- ✅ Works great with voice singing or spoken lyrics
- 🌐 Uses web search to find the matching song
- 🌍 Works in **multiple languages** — sing in Hindi, Telugu, English, etc.

> 🎤 **How to use**: Switch to Song Mode → Sing or speak lyrics → Nova identifies the song!

---

### 11. File Upload

📁 **Upload & Analyze Files** — Nova can now read and understand your files!

**Supported file types:**
| Type | Formats | How it works |
| :--- | :--- | :--- |
| 🖼️ **Images** | PNG, JPG, GIF, WebP, SVG | Vision AI analyzes the image content |
| 📄 **Documents** | PDF, DOCX, TXT, MD | Full text extraction and Q&A |
| 💻 **Code** | JS, PY, TS, HTML, CSS, JSON | Code analysis and explanation |
| 📊 **Data** | CSV | Full data parsing and insights |
| 🎬 **Video** | MP4, WebM, MOV | Metadata acknowledged (file info) |
| 📈 **Spreadsheets** | XLSX, XLS | Export as CSV for full support |

**How to use:**
1. Click the **+** button in the chat
2. Select "Upload File"
3. Choose your file(s)
4. Ask Nova questions about them!

> 💡 **Image uploads**: Nova can actually **see** your images using Vision AI — describe them, read text in images, and answer visual questions.

---

## 🛠️ Architecture

---

### 12. DOM Analysis & Vision

👁️ **How Nova "sees" the web:**

- **Visual Accessibility Tree**: Scans the DOM, keeping only interactive nodes (buttons, links, inputs)
- **Viewport Awareness**: Calculates bounding boxes relative to viewport
- **Screenshot Vision**: Takes page screenshots to verify element visibility
- **Hybrid Execution**: Falls back to CDP hardware simulation when JS clicks fail

---

### 13. Tech Stack

| Category | Technologies |
| :--- | :--- |
| **Core Framework** | React 18, Vite 5, TailwindCSS |
| **Extension Runtime** | Manifest V3 (Service Worker) |
| **Browser Protocol** | Chrome Debugger Protocol (CDP) |
| **State Management** | Zustand + Supabase (Auth) |
| **Animation** | Framer Motion |
| **AI Models** | 50+ models across 5+ providers |
| **Search** | Tavily + DuckDuckGo fallback |
| **Vision** | OpenAI Vision / A4F Vision API |

---

### 14. Security

🛡️ **Your privacy is our priority:**

- 🔒 **AES-256 Encryption** for all API keys
- 🏠 **Local-First**: Data never leaves your machine
- 🔐 **BYOK**: You control your own keys
- 🛡️ **Firewall Service**: Blocks trackers and malicious scripts
- ✋ **Active Tab Only**: Permission granted only when you invoke the agent

---

## 🧪 Test Nova (Try These Prompts!)

---

### 15. Testing Prompts

Try these prompts to explore Nova's features:

**🤖 Agent Mode:**
- *"Go to YouTube and search for JavaScript tutorials"*
- *"Fill in the contact form on this page with my name John Doe"*
- *"Navigate to Amazon and search for wireless headphones under ₹2000"*

**🛍️ Shopping:**
- *"Find me the best wireless earbuds under ₹3000"*
- *"Compare prices for iPhone 15 across Amazon and Flipkart"*
- *"Find the cheapest gaming mouse under ₹1500"*

**🌐 Web Search:**
- *"What are the latest features in React 19?"*
- *"Compare Next.js vs Remix for full-stack development"*
- *"Explain quantum computing in simple terms"*

**🎨 Image Generation:**
- *"Generate a futuristic cyberpunk city at night"*
- *"Create a logo for a tech startup called Nova"*
- *"Generate an image based on this page design"* (Page Vision)

**🎙️ Voice Agent:**
- Press 🎤 and say: *"What's the weather in Hyderabad today?"*
- Speak in Hindi: *"आज की ताजा खबरें क्या हैं?"*
- Speak in Telugu: *"హైదరాబాద్ లో ఈ వారం ఏం జరుగుతోంది?"*

**🎵 Song Detection:**
- Switch to Song Mode → Sing: *"Tum hi ho... ab tum hi ho..."*
- Speak lyrics: *"Shape of you, I'm in love with your body..."*

**📁 File Analysis:**
- Upload a PDF → *"Summarize this document in 5 bullet points"*
- Upload an image → *"What's in this image? Read any text you see"*
- Upload code → *"Explain what this code does and find any bugs"*

---

*🚀 Nova v2.0 — Built with ❤️ by Manoj Kumar. Powered by Nova Intelligence.*
`;
