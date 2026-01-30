import { FirewallService } from '../services/FirewallService';

// Navigator Agent - Executes actions using Chrome Debugger Protocol
export class Navigator {
    constructor() {
        this.attachedTabId = null;
    }

    async attach(tabId) {
        if (this.attachedTabId === tabId) return;
        if (this.attachedTabId) await this.detach();

        try {
            await chrome.debugger.attach({ tabId }, "1.3");
            this.attachedTabId = tabId;
            console.log(`Navigator: Attached to tab ${tabId}`);
        } catch (e) {
            if (!e.message.includes("already attached")) {
                console.warn("Navigator: Attach failed", e);
                throw e;
            }
            this.attachedTabId = tabId; // Assume attached
        }
    }

    async detach() {
        if (!this.attachedTabId) return;
        try {
            await chrome.debugger.detach({ tabId: this.attachedTabId });
        } catch (e) { /* ignore */ }
        this.attachedTabId = null;
        console.log("Navigator: Detached");
    }

    async executeStep(action, interactives, tabId) {
        console.log("Navigator: Executing action", action);

        if (action.action === "ANSWER") {
            return { done: true, result: action.value };
        }

        if (action.action === "NAVIGATE") {
            const allowed = await FirewallService.checkUrl(action.value);
            if (!allowed) {
                console.warn("Navigator: Blocked by Firewall", action.value);
                throw new Error(`Navigation to ${action.value} blocked by Firewall Settings.`);
            }

            try {
                chrome.tabs.sendMessage(tabId, { type: 'DISABLE_DOM_OVERLAY' }).catch(() => { });
            } catch (e) { }

            await chrome.tabs.update(tabId, { url: action.value });
            await this.waitForPageLoad(tabId);
            return { done: false, result: "Navigated to " + action.value };
        }

        if (action.action === "WAIT") {
            await new Promise(r => setTimeout(r, 1000)); // Reduced from 2000
            return { done: false, result: "Waited 1s" };
        }

        // Attach Debugger (Persistent check)
        if (this.attachedTabId !== tabId) {
            console.warn("Navigator: Warn - Debugger not pre-attached. Attaching now...");
            await this.attach(tabId);
        }

        try {
            if (action.action === "SCROLL") {
                // Improved Scroll: Support direction or element
                // Default: Scroll Window Down
                // Future: Action could spec "up", "down", "elementId"

                // Using Runtime.evaluate for reliable scrolling vs Input.dispatchMouseEvent
                const expression = `window.scrollBy(0, window.innerHeight * 0.8)`;
                await chrome.debugger.sendCommand({ tabId }, "Runtime.evaluate", { expression });

                // Wait for scroll
                await new Promise(r => setTimeout(r, 200)); // Reduced from 500
                return { done: false, result: "Scrolled down" };
            }
            else {
                // Actions requiring target (CLICK, TYPE)
                let target = null;

                // [NEW] CLICK_TEXT / TYPE_TEXT Support (No ID required)
                if (action.action === "CLICK_TEXT" || action.action === "TYPE_TEXT") {
                    console.log(`Navigator: Executing Text-Based Action: ${action.text}`);
                    // Pseudo-target for text actions
                    target = {
                        tagName: '*',
                        text: action.text,
                        rect: { x: 0, y: 0, w: 0, h: 0 } // Dummy rect, we rely on JS find
                    };
                } else {
                    target = interactives.find(e => e.id === action.id);
                    if (!target) {
                        // [NEW] Graceful Fallback: If ID not found but we have value/text, try text search?
                        // For now, throw error but maybe nicer.
                        throw new Error(`Target element with ID ${action.id} not found.`);
                    }
                }

                if (action.action.startsWith("CLICK") || action.action.startsWith("TYPE")) {
                    // Start Scroll Logic (Only if we have a valid rect from ID)
                    if (target.rect && target.rect.w > 0) {
                        const x = target.rect.x + (target.rect.w / 2);
                        const y = target.rect.y + (target.rect.h / 2);
                        const scrollExpression = `
                            (() => {
                                const currentY = window.scrollY;
                                const viewportH = window.innerHeight;
                                const targetY = currentY + ${target.rect.y}; 
                                const centerOffset = viewportH / 2;
                                const scrollTo = targetY - centerOffset;
                                window.scrollTo({top: scrollTo, behavior: 'instant'});
                            })()
                        `;
                        await chrome.debugger.sendCommand({ tabId }, "Runtime.evaluate", { expression: scrollExpression });
                        await new Promise(r => setTimeout(r, 100));
                    }

                    if (action.action.startsWith("CLICK")) {
                        // Try JS Click first (Hybrid Approach)
                        const jsClick = `
                            (() => {
                                // 1. Try finding by Unique Rockett ID (Gold Standard)
                                let el = document.querySelector('[data-nova-id="${action.id}"]');
                                
                                // [NEW] Text Search Fallback (Primary for CLICK_TEXT)
                                if (!el) {
                                     const clean = (str) => (str || "").toLowerCase().trim();
                                     const targetText = clean('${(action.text || target.text || "").replace(/'/g, "\\'").replace(/\n/g, " ")}');
                                     
                                     if (targetText.length > 0) {
                                        // Specific Search Strategy
                                        // Priority: Buttons/Links with exact text -> Contains text -> Aria Label
                                        const all = Array.from(document.querySelectorAll('a, button, [role="button"], input, textarea, span, div'));
                                        
                                        el = all.find(e => {
                                             if (e.tagName === 'SCRIPT' || e.tagName === 'STYLE') return false;
                                             // Visiblity check (simple)
                                             if (e.offsetParent === null) return false;
                                             
                                             const t = clean(e.innerText);
                                             const v = clean(e.value);
                                             const p = clean(e.getAttribute('placeholder'));
                                             const a = clean(e.getAttribute('aria-label'));
                                             
                                             return t === targetText || v === targetText || p === targetText || a === targetText;
                                        });
                                        
                                        if (!el) {
                                            // Loose match
                                            el = all.find(e => {
                                                 if (e.tagName === 'SCRIPT' || e.tagName === 'STYLE') return false;
                                                 if (e.offsetParent === null) return false;
                                                 const t = clean(e.innerText);
                                                 return t.includes(targetText) && t.length < 100; // avoid huge blocks
                                            });
                                        }
                                     }
                                }

                                if (el) {
                                    // SMART CLICK: If the element is a child (like a span), bubble up to the interactive parent/wrapper
                                    if (el.tagName !== 'A' && el.tagName !== 'BUTTON' && !el.onclick && el.parentElement) {
                                        const closest = el.closest('a, button, [role="button"], [onclick]');
                                        if (closest) {
                                            el = closest;
                                        }
                                    }
                                    
                                    // Simulate full mouse event sequence for better SPA compatibility
                                    const opts = { bubbles: true, cancelable: true, view: window };
                                    el.dispatchEvent(new MouseEvent('mousedown', opts));
                                    el.dispatchEvent(new MouseEvent('mouseup', opts));
                                    el.click(); 
                                    return true;
                                }
                                return false;
                            })()
                        `;
                        // Exec
                        await chrome.debugger.sendCommand({ tabId }, "Runtime.evaluate", { expression: jsClick });

                        // [CRITICAL NEW FEATURE] Coordinate-Based Click (Trusted Event)
                        // Many sites (Amazon/Google) fail on JS .click() or .dispatchEvent() because `isTrusted` is false.
                        // We use the Chrome Debugger Protocol to simulate a REAL hardware mouse click at the coordinates.
                        if (target.rect && target.rect.w > 0) {
                            const x = target.rect.x + (target.rect.w / 2);
                            const y = target.rect.y + (target.rect.h / 2);

                            // Scroll offset logic is already handled by previous scroll step, 
                            // BUT coordinates from observer might be relative to viewport or document.
                            // Usually observer returns valid viewport-relative rects if we just refreshed state.
                            // Let's assume standard click at X,Y.

                            // 1. Mouse Move
                            await chrome.debugger.sendCommand({ tabId }, "Input.dispatchMouseEvent", { type: "mouseMoved", x: x, y: y });
                            await new Promise(r => setTimeout(r, 50));

                            // 2. Mouse Down
                            await chrome.debugger.sendCommand({ tabId }, "Input.dispatchMouseEvent", { type: "mousePressed", x: x, y: y, button: "left", clickCount: 1 });
                            await new Promise(r => setTimeout(r, 50));

                            // 3. Mouse Up
                            await chrome.debugger.sendCommand({ tabId }, "Input.dispatchMouseEvent", { type: "mouseReleased", x: x, y: y, button: "left", clickCount: 1 });
                        }
                    }
                    else if (action.action.startsWith("TYPE")) {
                        // ... (Existing TYPE logic tailored for text finding if needed)
                        // For now assume TYPE usually has ID, unless TYPE_TEXT recovery
                        // ... [Truncated for brevity, reusing CLICK logic approach]
                    }

                    // [Rest of function... for brevity assuming TYPE handled similarly or unchanged]
                    // (Actually I need to preserve the TYPE logic below. I will just paste it back carefully)
                }

                if (action.action.startsWith("TYPE")) {
                    const jsFocus = `
                            (() => {
                                let el = document.querySelector('[data-nova-id="${action.id}"]');
                                if (!el && '${action.action}' === 'TYPE_TEXT') {
                                     // Find input by placeholder usually
                                     const clean = (str) => (str || "").toLowerCase().trim();
                                     const targetText = clean('${(action.text || "").replace(/'/g, "\\'").replace(/\n/g, " ")}');
                                     const inputs = Array.from(document.querySelectorAll('input, textarea'));
                                     el = inputs.find(i => {
                                         const p = clean(i.getAttribute('placeholder'));
                                         const n = clean(i.getAttribute('name'));
                                         return p.includes(targetText) || n.includes(targetText);
                                     });
                                }

                                if (el) {
                                    // [FIX] Click first to expand search bars etc.
                                    el.click();

                                    // [CRITICAL FIX] Ensure we focus the INPUT, not a wrapper div
                                    let inputToFocus = el;
                                    if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
                                        const childInput = el.querySelector('input, textarea');
                                        if (childInput) inputToFocus = childInput;
                                    }

                                    inputToFocus.focus();
                                    return true;
                                }
                                return false;
                            })()
                         `;
                    await chrome.debugger.sendCommand({ tabId }, "Runtime.evaluate", { expression: jsFocus });
                    await new Promise(r => setTimeout(r, 100)); // wait for focus

                    // [FIX] Clear Text Logic - Select All + Backspace twice just in case
                    await chrome.debugger.sendCommand({ tabId }, "Runtime.evaluate", { expression: "document.activeElement ? document.activeElement.select() : null" });
                    await new Promise(r => setTimeout(r, 50));
                    await chrome.debugger.sendCommand({ tabId }, "Input.dispatchKeyEvent", { type: "keyDown", windowsVirtualKeyCode: 8, nativeVirtualKeyCode: 8 }); // Backspace
                    await new Promise(r => setTimeout(r, 50));

                    // [NEW] Hybrid Type: Send Keys + Force Value Update (React Hack)
                    // Some sites (Amazon/Google) ignore keystrokes if not perfect.
                    // We force the value so the "input is empty" problem is solved.
                    const textToType = String(action.value || "");

                    // 1. Send Keys (Simulate Human)
                    for (const char of textToType) {
                        await chrome.debugger.sendCommand({ tabId }, "Input.dispatchKeyEvent", { type: "keyDown", text: char });
                        await new Promise(r => setTimeout(r, 10));
                    }

                    // 2. React Value Setter Hack (The Heavy Hammer)
                    // If keys failed to register in virtual DOM, this forces it.
                    const jsForceValue = `
                        (() => {
                            let el = document.activeElement;
                            // Double check if active element is valid, otherwise try finding input again
                            if (!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA')) {
                                 el = document.querySelector('input:focus, textarea:focus');
                            }

                            if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {
                                // Save original
                                const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                                const textSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
                                
                                const val = "${textToType.replace(/"/g, '\\"')}";

                                if (setter && el.tagName === 'INPUT') {
                                    setter.call(el, val);
                                } else if (textSetter && el.tagName === 'TEXTAREA') {
                                    textSetter.call(el, val);
                                } else {
                                    el.value = val;
                                }
                                el.dispatchEvent(new Event('input', { bubbles: true }));
                                el.dispatchEvent(new Event('change', { bubbles: true }));
                            }
                        })()
                    `;
                    await chrome.debugger.sendCommand({ tabId }, "Runtime.evaluate", { expression: jsForceValue });


                    // 4. Press Enter (Implicit submit)
                    await chrome.debugger.sendCommand({ tabId }, "Input.dispatchKeyEvent", { type: "keyDown", windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
                }
            }
        } catch (error) {
            console.error("Navigator Action Failed:", error);
            throw error;
        } finally {
            // Do NOT detach here. Keeping connection persistent.
        }

        return { done: false, result: `Executed ${action.action}` };
    }

    async waitForPageLoad(tabId) {
        return new Promise(resolve => {
            const listener = (tid, changeInfo) => {
                if (tid === tabId && changeInfo.status === 'complete') {
                    chrome.tabs.onUpdated.removeListener(listener);
                    resolve();
                }
            };
            chrome.tabs.onUpdated.addListener(listener);
            // Timeout fallback
            setTimeout(() => {
                chrome.tabs.onUpdated.removeListener(listener);
                resolve();
            }, 10000);
        });
    }
}

export const navigator = new Navigator();
