# Nova Browser Agent Documentation

> **Welcome to the future of browsing.**  
> Nova isn't just an extension; it's an intelligent companion that surfs the web *for you*.

---

## 🚀 Quick Start Guide

Get Nova running on your local machine in under 5 minutes.

### 1. Prerequisites
Before you blast off, ensure you have:
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   Google Chrome or Microsoft Edge
*   An OpenAI API Key (or compatible LLM key)

### 2. Installation
Run these commands in your terminal to set up the flight deck:

```bash
# Clone the repository
git clone https://github.com/your-org/rocket-extension.git

# Enter the cockpit
cd rocket-extension

# Install dependencies (engines on!)
npm install

# Build the extension
npm run build
```

### 3. Loading into Chrome
1.  Open `chrome://extensions` in your browser.
2.  Toggle **Developer mode** in the top right.
3.  Click **Load unpacked**.
4.  Select the `dist/` folder created by the build command.

> **Pro Tip:** Pin the Nova icon to your toolbar for instant access to your AI agent.

---

## 🏗️ Architecture & Internals

Understand the engineering magic behind Nova. This section is designed for developers and curious minds who want to know *how* we build an autonomous browser agent.

### The Core Loop: `AgentService`
At the heart of Nova is the `AgentService`. It acts as the central orchestrator, managing the lifecycle of every task.

**Simplified Logic Flow:**
```javascript
class AgentService {
  async runTask(userGoal) {
    // 1. Analyze Intent
    const intent = await IntentDetector.analyze(userGoal);
    
    if (intent === 'SHOPPING') {
        return await ShoppingService.deepResearch(userGoal);
    }

    // 2. Attach to Browser
    await Navigator.attach(activeTab);

    // 3. Execution Loop
    while (!taskComplete) {
        // A. SEE: Capture DOM Snapshot
        const state = await Observer.getBrowserState();
        
        // B. THINK: Ask LLM for next move
        const action = await LLM.decide(state, userGoal);
        
        // C. ACT: Execute Click/Type/Scroll
        await HybridCore.execute(action);
        
        // D. VERIFY: Did it work? (Self-Healing)
        if (hasError) await RecoveryEngine.fix(action);
    }
  }
}
```

### The Vision System: `SemanticDOM`
We don't just read HTML; we *understand* it. Raw HTML is too noisy for AI, so we process it into "Semantic Clusters."

**How it works:**
1.  **Filter:** Remove ads, tracking scripts, and invisible elements.
2.  **Cluster:** Group elements that belong together (e.g., Image + Title + Price = "Product Card").
3.  **Label:** Usie a micro-LLM call to understand the cluster's purpose.

**Data Structure Example:**
```json
{
  "pageType": "ProductListing",
  "clusters": [
    {
      "type": "ProductCard",
      "content": "iPhone 15 - ₹79,000",
      "interactiveElementId": 45  // The 'Buy Now' button
    }
  ]
}
```

### Resilience: `RecoveryEngine`
Websites are dynamic. Buttons move, modals pop up. The `RecoveryEngine` ensures Nova doesn't crash when things change.

> "The difference between a script and an Agent is that an Agent handles failure."

**Recovery Logic:**
```javascript
async function recover(failedAction) {
    // Strategy 1: Fuzzy Match
    // If ID #45 is gone, look for a button with text "Buy Now"
    const newId = await DOM.findClosestMatch(failedAction.targetText);
    
    if (newId) return performAction(newId);
    
    // Strategy 2: Alternate Path
    // If "Buy Now" is missing, try "Add to Cart" or "Checkout"
    return await LLM.replanningStrength(failedAction);
}
```

---

## 📘 User Guides

### Agent Mode (Navigator)
The general-purpose mode for interacting with the web.
*   **Command:** "Go to spotify and play Lo-Fi beats."
*   **What happens:** Nova navigates -> finds search -> types "Lo-Fi" -> clicks the first playlist -> hits play.

### Deep Research (Shopping)
A specialized autonomous workflow for finding the best products.
*   **Command:** "Find the best noise-cancelling headphones under ₹20,000."
*   **The Workflow:**
    1.  **Reads Reviews:** Scans tech blogs for "Best Headphones 2026".
    2.  **Cross-References:** Checks Amazon, Flipkart, and Croma.
    3.  **Price Compares:** Finds the lowest price in real-time.
    4.  **Report:** Generates a markdown table with a clear "Winner" and "Buy Link".

### Image Generation
Create assets without leaving your tab.
*   **Command:** "Generate a banner for a coding blog."
*   **Tech:** Uses DALL-E 3 (via proxy) to render high-quality images directly in the side panel.

---

## ⚙️ Configuration

### Environment Variables
For security, we use a local `.env` setup during development.

**`.env.example`**
```ini
# Your AI Provider Key (Required)
OPENAI_API_KEY=sk-proj-...

# Memory Layer (Optional - for persistent site learning)
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_KEY=eyJ...
```

### Security Best Practices
> ⚠️ **Warning:** Never commit your `.env` file or API keys to GitHub. Nova stores keys in `chrome.storage.local` which stays on your device.

---

## 🛠️ Extending Nova (For Developers)

Want to add a new "Skill" to Nova? Here is how to register a new capability.

**Step 1: Define the Action**
In `HybridCore.js`, add your handler:
```javascript
const actions = {
    // ... existing actions
    "DOWNLOAD_PDF": async (url) => {
        // Custom logic to trigger download
        chrome.downloads.download({ url: url });
    }
};
```

**Step 2: Teach the AI**
Update the System Prompt in `AgentService.js`:
```text
CORE ACTIONS:
1. CLICK ...
2. TYPE ...
3. DOWNLOAD_PDF: Use this when the user asks to save a file.
```

---

## ❓ FAQ & Troubleshooting

**Q: The Agent is stuck "Thinking...".**  
**A:** This usually means the DOM is very large. Try refreshing the page to clear the memory cache.

**Q: Can it solve CAPTCHAs?**  
**A:** Currently, no. For security reasons, Nova pauses execution when it detects a CAPTCHA challenge so you can solve it manually.

**Q: Is my data safe?**  
**A:** Yes. Nova operates "Local-First". Your browsing history is processed in memory and never sent to our servers. Only the active page DOM is sent to the LLM for analysis.

---

*Built with ❤️ by the Nova Team.*
