var ee=Object.defineProperty;var te=(u,e,n)=>e in u?ee(u,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):u[e]=n;var z=(u,e,n)=>te(u,typeof e!="symbol"?e+"":e,n);import{S as L,s as X}from"./StorageService-Dv_ujdX7.js";import{L as O,S as Q}from"./SearchService-mlraOgoZ.js";const Z={async init(){await this.updateRules(),typeof chrome<"u"&&chrome.storage&&chrome.storage.onChanged&&chrome.storage.onChanged.addListener((u,e)=>{e==="local"&&(u.firewall_settings||u.firewall_active)&&this.updateRules()})},async updateRules(){if(typeof chrome>"u"||!chrome.declarativeNetRequest)return;const u=await L.getGlobal("firewall_settings")||{mode:"off",blockList:[],allowList:[]},e=u.mode||"off",n=u.blockList||[],t=u.allowList||[];console.log("[Firewall] Updating rules. Mode:",e);const i=(await chrome.declarativeNetRequest.getDynamicRules()).map(o=>o.id);if(await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:i}),e==="off")return;let a=[],s=1;if(e==="block_list")for(const o of n)o&&a.push({id:s++,priority:1,action:{type:"block"},condition:{urlFilter:`||${o}`,resourceTypes:["main_frame","sub_frame","xmlhttprequest"]}});else if(e==="allow_only"){a.push({id:s++,priority:1,action:{type:"block"},condition:{urlFilter:"*"}});for(const o of t)o&&a.push({id:s++,priority:2,action:{type:"allow"},condition:{urlFilter:`||${o}`,resourceTypes:["main_frame","sub_frame","xmlhttprequest"]}})}a.length>0&&(await chrome.declarativeNetRequest.updateDynamicRules({addRules:a}),console.log(`[Firewall] Applied ${a.length} rules.`))},async checkUrl(u){if(!u)return!0;const e=await L.getGlobal("firewall_settings");if(!e||!e.mode||e.mode==="off")return!0;let n;try{n=new URL(u).hostname}catch{return!1}return e.mode==="block_list"?!(e.blockList||[]).some(r=>n.includes(r)):e.mode==="allow_only"?(e.allowList||[]).some(r=>n.includes(r)):!0}};class ae{constructor(){this.attachedTabId=null}async attach(e){if(this.attachedTabId!==e){this.attachedTabId&&await this.detach();try{await chrome.debugger.attach({tabId:e},"1.3"),this.attachedTabId=e,console.log(`Navigator: Attached to tab ${e}`)}catch(n){if(!n.message.includes("already attached"))throw console.warn("Navigator: Attach failed",n),n;this.attachedTabId=e}}}async detach(){if(this.attachedTabId){try{await chrome.debugger.detach({tabId:this.attachedTabId})}catch{}this.attachedTabId=null,console.log("Navigator: Detached")}}async executeStep(e,n,t){var r,i;if(console.log("Navigator: Executing action",e),e.action==="ANSWER")return{done:!0,result:e.value};if(e.action==="NAVIGATE"){if(!await Z.checkUrl(e.value))throw console.warn("Navigator: Blocked by Firewall",e.value),new Error(`Navigation to ${e.value} blocked by Firewall Settings.`);try{chrome.tabs.sendMessage(t,{type:"DISABLE_DOM_OVERLAY"}).catch(()=>{})}catch{}return await chrome.tabs.update(t,{url:e.value}),await this.waitForPageLoad(t),{done:!1,result:"Navigated to "+e.value}}if(e.action==="WAIT")return await new Promise(a=>setTimeout(a,1e3)),{done:!1,result:"Waited 1s"};if(e.action==="TYPE"){const a=n.find(s=>s.id===e.id);if(a&&((r=a.attributes)==null?void 0:r.type)==="code-editor"){console.log(`Navigator: Code Editor TYPE detected (${a.attributes.editorType})`);const s=a.rect.x+a.rect.w/2,o=a.rect.y+a.rect.h/2;await chrome.debugger.sendCommand({tabId:t},"Input.dispatchMouseEvent",{type:"mousePressed",x:s,y:o,button:"left",clickCount:1}),await new Promise(c=>setTimeout(c,50)),await chrome.debugger.sendCommand({tabId:t},"Input.dispatchMouseEvent",{type:"mouseReleased",x:s,y:o,button:"left",clickCount:1}),await new Promise(c=>setTimeout(c,200)),await chrome.debugger.sendCommand({tabId:t},"Input.dispatchKeyEvent",{type:"keyDown",windowsVirtualKeyCode:65,code:"KeyA",key:"a",modifiers:2}),await chrome.debugger.sendCommand({tabId:t},"Input.dispatchKeyEvent",{type:"keyUp",windowsVirtualKeyCode:65,code:"KeyA",key:"a",modifiers:2}),await new Promise(c=>setTimeout(c,100)),await chrome.debugger.sendCommand({tabId:t},"Input.dispatchKeyEvent",{type:"keyDown",windowsVirtualKeyCode:8,nativeVirtualKeyCode:8}),await new Promise(c=>setTimeout(c,100));const l=String(e.value||"");return await chrome.debugger.sendCommand({tabId:t},"Input.insertText",{text:l}),await new Promise(c=>setTimeout(c,200)),{done:!1,result:`Typed code into ${a.attributes.editorType} editor`}}}this.attachedTabId!==t&&(console.warn("Navigator: Warn - Debugger not pre-attached. Attaching now..."),await this.attach(t));try{if(e.action==="SCROLL")return await chrome.debugger.sendCommand({tabId:t},"Runtime.evaluate",{expression:"window.scrollBy(0, window.innerHeight * 0.8)"}),await new Promise(s=>setTimeout(s,200)),{done:!1,result:"Scrolled down"};if(e.action==="CLICK_COORD")return console.log(`Navigator: Executing CLICK_COORD at (${e.x}, ${e.y})`),await chrome.debugger.sendCommand({tabId:t},"Input.dispatchMouseEvent",{type:"mouseMoved",x:e.x,y:e.y}),await new Promise(a=>setTimeout(a,50)),await chrome.debugger.sendCommand({tabId:t},"Input.dispatchMouseEvent",{type:"mousePressed",x:e.x,y:e.y,button:"left",clickCount:1}),await new Promise(a=>setTimeout(a,50)),await chrome.debugger.sendCommand({tabId:t},"Input.dispatchMouseEvent",{type:"mouseReleased",x:e.x,y:e.y,button:"left",clickCount:1}),await new Promise(a=>setTimeout(a,200)),{done:!1,result:`Clicked at coordinates (${e.x}, ${e.y})`};{let a=null;if(e.action==="CLICK_TEXT"||e.action==="TYPE_TEXT")console.log(`Navigator: Executing Text-Based Action: ${e.text}`),a={tagName:"*",text:e.text,rect:{x:0,y:0,w:0,h:0}};else if(a=n.find(s=>s.id===e.id),!a)throw new Error(`Target element with ID ${e.id} not found.`);if(e.action.startsWith("CLICK")||e.action.startsWith("TYPE")){if(a.rect&&a.rect.w>0){const s=a.rect.x+a.rect.w/2,o=a.rect.y+a.rect.h/2,l=`
                            (() => {
                                const currentY = window.scrollY;
                                const viewportH = window.innerHeight;
                                const targetY = currentY + ${a.rect.y}; 
                                const centerOffset = viewportH / 2;
                                const scrollTo = targetY - centerOffset;
                                window.scrollTo({top: scrollTo, behavior: 'instant'});
                            })()
                        `;await chrome.debugger.sendCommand({tabId:t},"Runtime.evaluate",{expression:l}),await new Promise(c=>setTimeout(c,100))}if(e.action.startsWith("CLICK")){const s=`
                            (() => {
                                // 1. Try finding by Unique Rockett ID (Gold Standard)
                                let el = document.querySelector('[data-nova-id="${e.id}"]');
                                
                                // [NEW] Text Search Fallback (Primary for CLICK_TEXT)
                                if (!el) {
                                     const clean = (str) => (str || "").toLowerCase().trim();
                                     const targetText = clean('${(e.text||a.text||"").replace(/'/g,"\\'").replace(/\n/g," ")}');
                                     
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
                        `;if(await chrome.debugger.sendCommand({tabId:t},"Runtime.evaluate",{expression:s}),a.rect&&a.rect.w>0){const o=a.rect.x+a.rect.w/2,l=a.rect.y+a.rect.h/2;await chrome.debugger.sendCommand({tabId:t},"Input.dispatchMouseEvent",{type:"mouseMoved",x:o,y:l}),await new Promise(c=>setTimeout(c,50)),await chrome.debugger.sendCommand({tabId:t},"Input.dispatchMouseEvent",{type:"mousePressed",x:o,y:l,button:"left",clickCount:1}),await new Promise(c=>setTimeout(c,50)),await chrome.debugger.sendCommand({tabId:t},"Input.dispatchMouseEvent",{type:"mouseReleased",x:o,y:l,button:"left",clickCount:1})}}else e.action.startsWith("TYPE")}if(e.action.startsWith("TYPE")){const s=`
                            (() => {
                                let el = document.querySelector('[data-nova-id="${e.id}"]');
                                if (!el && '${e.action}' === 'TYPE_TEXT') {
                                     // Find input by placeholder usually
                                     const clean = (str) => (str || "").toLowerCase().trim();
                                     const targetText = clean('${(e.text||"").replace(/'/g,"\\'").replace(/\n/g," ")}');
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
                         `;await chrome.debugger.sendCommand({tabId:t},"Runtime.evaluate",{expression:s}),await new Promise(h=>setTimeout(h,100));const o=await chrome.debugger.sendCommand({tabId:t},"Runtime.evaluate",{expression:"document.activeElement ? document.activeElement.value : ''"});(i=o==null?void 0:o.result)!=null&&i.value&&(await chrome.debugger.sendCommand({tabId:t},"Runtime.evaluate",{expression:"document.activeElement ? document.activeElement.select() : null"}),await new Promise(h=>setTimeout(h,30)),await chrome.debugger.sendCommand({tabId:t},"Input.dispatchKeyEvent",{type:"keyDown",windowsVirtualKeyCode:8,nativeVirtualKeyCode:8}),await new Promise(h=>setTimeout(h,30)));const l=String(e.value||"");for(const h of l)await chrome.debugger.sendCommand({tabId:t},"Input.dispatchKeyEvent",{type:"keyDown",text:h}),await new Promise(S=>setTimeout(S,10));const c=`
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
                                
                                const val = "${l.replace(/"/g,'\\"')}";

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
                    `;await chrome.debugger.sendCommand({tabId:t},"Runtime.evaluate",{expression:c}),e.submit&&await chrome.debugger.sendCommand({tabId:t},"Input.dispatchKeyEvent",{type:"keyDown",windowsVirtualKeyCode:13,nativeVirtualKeyCode:13})}}}catch(a){throw console.error("Navigator Action Failed:",a),a}finally{}return{done:!1,result:`Executed ${e.action}`}}async waitForPageLoad(e){return new Promise(n=>{const t=(r,i)=>{r===e&&i.status==="complete"&&(chrome.tabs.onUpdated.removeListener(t),n())};chrome.tabs.onUpdated.addListener(t),setTimeout(()=>{chrome.tabs.onUpdated.removeListener(t),n()},1e4)})}}const _=new ae,V={getBrowserState:function(){document.querySelectorAll("[data-nova-id]").forEach(o=>o.removeAttribute("data-nova-id")),document.querySelectorAll(".agent-id-tag").forEach(o=>o.remove());const e=document.querySelectorAll("button,a,input,textarea,select,[role='button'],[role='link'],[onclick],input[type='checkbox'],input[type='radio']"),n=[];let t=1;e.forEach(o=>{const l=o.getBoundingClientRect();l.width>=10&&l.height>=10&&l.bottom>0&&l.right>0&&l.top<window.innerHeight&&l.left<window.innerWidth&&getComputedStyle(o).visibility!=="hidden"&&getComputedStyle(o).display!=="none"&&(o.setAttribute("data-nova-id",t),n.push({id:t,tagName:o.tagName.toLowerCase(),text:(o.innerText||o.placeholder||o.value||o.getAttribute("aria-label")||"").substring(0,100).replace(/\s+/g," ").trim(),rect:{x:l.left,y:l.top,w:l.width,h:l.height},attributes:{href:o.getAttribute("href"),type:o.getAttribute("type"),value:o.tagName==="INPUT"||o.tagName==="TEXTAREA"||o.tagName==="SELECT"?o.value||"":void 0,role:o.getAttribute("role"),name:o.getAttribute("name"),placeholder:o.getAttribute("placeholder"),eId:o.id,checked:o.tagName.toLowerCase()==="input"?o.checked:void 0}}),t++)}),[".CodeMirror",".cm-editor",".monaco-editor",".ace_editor",'[contenteditable="true"]'].forEach(o=>{document.querySelectorAll(o).forEach(l=>{if(l.getAttribute("data-nova-id"))return;const c=l.getBoundingClientRect();if(c.width>=50&&c.height>=30&&c.bottom>0&&c.right>0&&c.top<window.innerHeight&&c.left<window.innerWidth){l.setAttribute("data-nova-id",t);let h="";l.classList.contains("CodeMirror")&&l.CodeMirror?h=l.CodeMirror.getValue().substring(0,200):l.querySelector(".cm-content")?h=l.querySelector(".cm-content").textContent.substring(0,200):l.env&&l.env.editor?h=l.env.editor.getValue().substring(0,200):h=(l.textContent||"").substring(0,200),n.push({id:t,tagName:"editor",text:h.replace(/\s+/g," ").trim()||"[empty editor]",rect:{x:c.left,y:c.top,w:c.width,h:c.height},attributes:{type:"code-editor",editorType:l.classList.contains("CodeMirror")?"codemirror5":l.classList.contains("cm-editor")?"codemirror6":l.classList.contains("monaco-editor")?"monaco":l.classList.contains("ace_editor")?"ace":"contenteditable",value:h.replace(/\s+/g," ").trim(),eId:l.id||""}}),t++}})});const i={x:window.scrollX,y:window.scrollY,totalHeight:document.body.scrollHeight,viewportHeight:window.innerHeight};let a={isPlaying:!1,title:""};const s=document.querySelector("video, audio");if(s){a.isPlaying=!s.paused&&!s.ended&&s.readyState>2,a.title=document.title;const o=document.querySelector("h1.ytd-video-primary-info-renderer");o&&(a.title=o.innerText)}return{url:window.location.href,title:document.title,textContext:document.body.innerText.substring(0,15e3).replace(/\s+/g," "),interactives:n,scroll:i,media:a}},cleanup:function(){document.querySelectorAll("[data-nova-id]").forEach(e=>e.removeAttribute("data-nova-id")),document.querySelectorAll(".agent-id-tag").forEach(e=>e.remove())}},ne={async generate({prompt:u,provider:e,model:n,size:t}){var l;const r=await L.get("image_settings"),i=(l=r==null?void 0:r.providers)==null?void 0:l[e];if(!(r!=null&&r.enabled))if(i&&i.apiKey)console.log("ImageService: Auto-enabling image generation as valid key is present.");else throw new Error("Image generation is disabled in settings. Please enable it in Settings > Image Generation.");if(!i||!i.apiKey)throw new Error(`Provider '${e}' not configured or missing API key.`);const{apiKey:a}=i,s=n||i.model,o=t||i.size;console.log(`ImageService: Generating with ${e} (${s})`);try{switch(e){case"openai":return await this.generateOpenAI(a,u,s,o);case"google":return await this.generateGoogle(a,u,s,o);case"xai":return await this.generateXAI(a,u,s,o);case"a4f":return await this.generateA4F(a,u,s,o);case"infip":return await this.generateInfip(a,u,s,o);default:throw new Error(`Unknown provider: ${e}`)}}catch(c){throw console.error("ImageService Error:",c),c}},async generateOpenAI(u,e,n,t){var a;const r=await fetch("https://api.openai.com/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({model:n,prompt:e,n:1,size:t})});if(!r.ok){const s=await r.json().catch(()=>({}));throw new Error(((a=s.error)==null?void 0:a.message)||`OpenAI Error: ${r.status}`)}return{url:(await r.json()).data[0].url,provider:"OpenAI",model:n,size:t}},async generateGoogle(u,e,n,t){var c,h,S,b,m;const r=`https://generativelanguage.googleapis.com/v1beta/models/${n}:generateContent?key=${u}`,i=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:e}]}]})});if(!i.ok){const T=await i.json().catch(()=>({}));throw new Error(((c=T.error)==null?void 0:c.message)||`Google Error: ${i.status}`)}const s=((b=(S=(h=(await i.json()).candidates)==null?void 0:h[0])==null?void 0:S.content)==null?void 0:b.parts)||[],o=s.find(T=>T.inline_data||T.file_data);if(o&&o.inline_data){const T=o.inline_data.data;return{url:`data:${o.inline_data.mime_type};base64,${T}`,provider:"Google",model:n,size:t}}const l=(m=s[0])==null?void 0:m.text;throw l?new Error(`Google returned text instead of image: "${l.substring(0,50)}..."`):new Error("No image data returned from Google API.")},async generateXAI(u,e,n,t){var a;const r=await fetch("https://api.x.ai/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({model:n,prompt:e,n:1,size:t})});if(!r.ok){const s=await r.json().catch(()=>({}));throw new Error(((a=s.error)==null?void 0:a.message)||`xAI Error: ${r.status}`)}return{url:(await r.json()).data[0].url,provider:"xAI",model:n,size:t}},async generateA4F(u,e,n,t){var a;const r=await fetch("https://api.a4f.co/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({model:n,prompt:e,n:1,size:t})});if(!r.ok){const s=await r.json().catch(()=>({}));throw r.status===429?new Error("A4F Rate Limit Exceeded. You have used your daily free tier requests for this model."):new Error(((a=s.error)==null?void 0:a.message)||"A4F Generation Failed")}return{url:(await r.json()).data[0].url,provider:"A4F",model:n,size:t}},async generateInfip(u,e,n,t){var o;const r="https://api.infip.pro/v1/images/generations";console.log(`ImageService: Infip Request to ${r} with model ${n}`);const i=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${u}`},body:JSON.stringify({model:n,prompt:e,n:1,size:t})});if(!i.ok){const l=await i.text();throw new Error(`Infip Failed: ${i.status} ${i.statusText} - ${l}`)}let a=await i.json();if(a.status==="pending"||a.status==="processing"||a.task_id){const l=a.poll_url||`https://api.infip.pro/v1/tasks/${a.task_id}`;let c=0;const h=30;for(;c<h;){await new Promise(S=>setTimeout(S,2e3));try{console.log(`[ImageService] Polling Infip... attempt ${c+1}/${h}`);const S=new AbortController,b=setTimeout(()=>S.abort(),1e4),m=await fetch(l,{method:"GET",headers:{Authorization:`Bearer ${u}`},signal:S.signal});if(clearTimeout(b),!m.ok){console.warn(`[ImageService] Polling failed HTTP ${m.status}`),c++;continue}const T=await m.json(),N=(T.status||"").toLowerCase();if(console.log(`[ImageService] Polling status: ${N}`,T),N==="completed"||N==="success"||N==="succeeded"){a=T;break}else if(N==="failed"||N==="error")throw new Error(`Infip Task Failed: ${T.error||JSON.stringify(T)}`)}catch(S){if(console.warn("[ImageService] Polling iteration error:",S.message),S.message.includes("Infip Task Failed"))throw S}c++}if(c>=h)throw new Error("Infip Image Generation timed out after 60 seconds of polling.")}let s=null;if(a.data&&a.data.length>0&&a.data[0].url?s=a.data[0].url:a.data&&a.data.url?s=a.data.url:a.choices&&a.choices.length>0&&((o=a.choices[0].message)!=null&&o.content)?s=a.choices[0].message.content:a.url?s=a.url:a.image_url?s=a.image_url:a.images&&a.images.length>0&&(s=a.images[0].url||a.images[0]),!s)throw console.error("Infip Full Response:",JSON.stringify(a)),new Error("Infip response missing image URL");return{url:s,provider:"Infip",model:n,size:t}}},re={async execute(u,e){var i,a;console.log("ImageAgent: Executing Plan",u);const n=await L.get("image_settings"),t=(n==null?void 0:n.activeProvider)||"a4f";let r=u.goal||"";if(r.includes("=== EXTRACTED VISUAL DETAILS ===")){console.log("[ImageAgent] Detected Vision Context from Client. Fusing via LLM..."),e&&e({status:"generating_image",message:"Fusing visual details with your prompt..."});try{const s=await O.chatCompletion([{role:"system",content:`You are an expert Visual Prompt Engineer for Generative AI.
The user has provided extracted visual details from an image AND their own specific instructions.
Your task is to merge them into ONE cohesive, detailed, and highly descriptive prompt for an image generation model.

CRITICAL RULES:
1. If the extracted details contain "Text to include:", you MUST ensure that text is explicitly written in quotes in your final prompt.
2. Ensure the overall subject and mood align perfectly with the user's instructions.
3. Output ONLY the final prompt text. Do not include introductory phrases.`},{role:"user",content:r}]);typeof s=="string"&&s.length>0?r=s:s&&s.content&&(r=s.content),console.log("[ImageAgent] LLM Fused Prompt:",r)}catch(s){console.warn("[ImageAgent] Failed to fuse prompt via LLM, falling back to raw.",s)}}(i=u.image_constraints)!=null&&i.style&&(r+=`. ${u.image_constraints.style} style.`),(a=u.image_constraints)!=null&&a.intended_use&&(r+=` ${u.image_constraints.intended_use}`),console.log("ImageAgent: Final Prompt",r);try{const s=await ne.generate({prompt:r,provider:t});return{status:"SUCCESS",result:{message:`Generated image: ${r}`,images:[s],summary:`Created image with ${s.provider}`}}}catch(s){return{status:"FAILED",result:{message:`Image Generation Failed: ${s.message}`,error:s.message}}}},async generateImage(u,e){const n=/(this|page|here|reference|context|screen|site|scan|analyze|read)/i.test(u);console.log(`[ImageAgent] Smart Mode: ${n?"PAGE_AWARE_IMAGE":"TEXT_TO_IMAGE"} (Prompt: "${u.slice(0,60)}...")`),n&&e&&e({status:"generating_image",message:"Processing image context..."});const t=await this.execute({goal:u,mode:"TEXT_TO_IMAGE",image_constraints:{style:"vibrant",intended_use:"chat"}},e);if(t.status==="SUCCESS")return{imageUrl:t.result.images[0],revisedPrompt:t.result.message};throw new Error(t.result.error||"Generation Failed")}},Y={_activeTabs:[],async spawnWithConcurrency(u,e,n=3,t=2e4,r=null){console.log(`[Swarm] Spawning ${u.length} workers (max ${n} concurrent)...`);const i=[],a=[...u],s=[];for(let o=0;o<Math.min(n,u.length);o++)s.push(this._runWorkerChain(a,u,e,t,r,i));return await Promise.all(s),console.log(`[Swarm] Harvest complete. Success: ${i.filter(o=>o.status==="success").length}/${i.length}. Tabs kept alive.`),i},async _runWorkerChain(u,e,n,t,r,i){for(;u.length>0;){const a=u.shift(),s=e.indexOf(a);try{r==null||r(s,"loading",{url:a});const o=await this._createTab(a);this._activeTabs.push(o.id),await this._waitForLoad(o.id,t),r==null||r(s,"extracting",{url:a,tabId:o.id});const l=await this._processTab(o,n,5e3);i.push({url:o.url||a,result:l.result,status:l.status,tabId:o.id}),r==null||r(s,l.status==="success"?"done":"failed",{url:o.url||a,tabId:o.id,data:l.result})}catch(o){i.push({url:a,error:o.message,status:"failed",tabId:null}),r==null||r(s,"failed",{url:a,error:o.message})}}},async spawn(u,e,n=15e3){console.log(`[Swarm] Spawning ${u.length} workers...`);const t=u.map(s=>this._createTab(s)),r=await Promise.all(t),i=r.map(s=>this._processTab(s,e,n)),a=await Promise.all(i);return this._activeTabs.push(...r.map(s=>s.id)),console.log(`[Swarm] Harvest complete. Success: ${a.filter(s=>s.status==="success").length}/${a.length}`),a},async _createTab(u){return await chrome.tabs.create({url:u,active:!1})},async _processTab(u,e,n){var r;const t=u.id;try{const i=await chrome.tabs.get(t);if(!i||!i.url||i.url.startsWith("chrome://")||i.url.startsWith("chrome-extension://")||i.url.startsWith("about:"))return{url:i==null?void 0:i.url,result:null,status:"failed"};const a=await chrome.scripting.executeScript({target:{tabId:t},func:e});return{url:u.url||"unknown",result:(r=a[0])==null?void 0:r.result,status:"success"}}catch(i){return console.warn(`[Swarm] Worker ${t} failed:`,i.message),{url:u.url,error:i.message,status:i.message.includes("Timeout")?"timeout":"failed"}}},_waitForLoad(u,e){return new Promise((n,t)=>{let r=!1;const i=setTimeout(()=>{r||(r=!0,chrome.tabs.onUpdated.removeListener(a),t(new Error("Timeout waiting for page load")))},e),a=(s,o,l)=>{s===u&&o.status==="complete"&&(r=!0,clearTimeout(i),chrome.tabs.onUpdated.removeListener(a),n(l))};chrome.tabs.onUpdated.addListener(a),chrome.tabs.get(u,s=>{s&&s.status==="complete"&&(r||(r=!0,clearTimeout(i),chrome.tabs.onUpdated.removeListener(a),n(s)))})})},getOpenTabs(){return[...this._activeTabs]},async terminateAll(){if(this._activeTabs.length>0){try{await chrome.tabs.remove(this._activeTabs)}catch{}this._activeTabs=[]}}},oe={KEYWORDS:{STRONG:["best","top","top-rated","best overall","best product","best option","best choice","best value","best quality","best in class","best available","best model","best brand","worth buying","worth it","good to buy","should i buy","is it good","is it worth","safe to buy","reliable","trusted","compare","comparison","vs","versus","which is better","which is best","difference between","pros and cons","advantages and disadvantages","recommended","most recommended","expert recommended","user recommended","popular","most popular","trending"],QUALITY:["good","better","excellent","high quality","premium","budget friendly","value for money","long lasting","durable","comfortable","effective","rating","reviews","review based","highly rated","best rated","customer feedback","real reviews"],FILTER:["under budget","under price","below","within budget","cheap but good","affordable","mid range","premium option","latest","new model","updated version","2024","2025","current best","for daily use","for beginners","for professionals","for students","for office","for gaming","for travel"],NEGATIVE:["scam","fake","avoid","bad","worst","issues","problems","complaints","not working","overpriced","low quality"]},analyze(u){const e=u.toLowerCase();let n=0,t=!1,r=!1,i=[];const a=this.KEYWORDS.STRONG.filter(c=>e.includes(c));a.length>0&&(n+=10,t=!0,r=!0,i.push("STRONG_INTENT"));const s=this.KEYWORDS.QUALITY.filter(c=>e.includes(c));s.length>0&&(e.split(" ").length>2||s.some(c=>c!=="good"))&&(n+=5,r=!0,i.push("QUALITY_INTENT"));const o=this.KEYWORDS.FILTER.filter(c=>e.includes(c));o.length>0&&(n+=3,i.push("FILTER_INTENT"));const l=this.KEYWORDS.NEGATIVE.filter(c=>e.includes(c));return l.length>0&&(n+=5,t=!0,r=!0,i.push("NEGATIVE_INTENT")),(e.startsWith("good morning")||e.startsWith("good night")||e.startsWith("hello")||e==="hi")&&(r=!1,t=!1,n=0),{shouldSearch:r,deepAnalysis:t,score:n,keywords:[...a,...s,...o,...l],intents:i}}},k=class k{static async getApiKeys(){const e=await L.get("llm_providers")||[],n=e.find(t=>t.id==="typegpt")||e[0];return{typegptKey:n==null?void 0:n.apiKey}}static async process(e,n,t="",r=!1,i,a){await this.getApiKeys();const s=a||(()=>{}),o=this.conversationContext.map(w=>`${w.role}: ${w.content}`).join(`
`);if(!r){s(),n({status:"thinking",message:"Analyzing user constraints..."});const w=`Evaluate this user shopping request: "${e}". 
Recent Conversation Context: 
${o}

You are in the "Information Gathering" phase. You DO NOT HAVE WEB ACCESS YET.
CRITICAL RULES:
1. DOES THIS QUERY NEED CLARIFICATION? If it's too broad (e.g. "gaming smartphone"), you must ask 1 short question to narrow it down (budget, brand, etc).
2. HAS THE USER PROVIDED ENOUGH DETAILS? If they already gave budget or specific features, or if you already asked 1-2 questions, YOU MUST PROCEED.
3. DO NOT HALLUCINATE PRODUCTS. NEVER GIVE RECOMMENDATIONS HERE.

Return ONLY a valid JSON object matching this schema, nothing else:
{
  "shouldProceed": true or false,
  "replyToUser": "Your short 1-sentence question to the user (leave EMPTY if shouldProceed is true)"
}`,A=await O.chatCompletion([{role:"user",content:w}],"openai/gpt-oss-120b",{temperature:.1,signal:i});s();let E=!0,y="";try{const v=A.match(/\{[\s\S]*\}/),p=JSON.parse(v?v[0]:A);E=!p.shouldProceed,y=p.replyToUser||""}catch{E=!A.includes("PROCEED"),y=A}if(E&&y&&y.trim()!=="")return this.conversationContext.push({role:"user",content:e}),this.conversationContext.push({role:"assistant",content:y}),this.conversationContext.length>6&&(this.conversationContext=this.conversationContext.slice(-6)),{isShopping:!1,message:y,needsProceed:!0}}s(),n({status:"thinking",message:"Expanding query for product search..."});const l=`Convert the tracking context and query into a highly optimized product search term.
Recent Context:
${o}
Query: "${e}"

Return ONLY a valid JSON object matching this schema, nothing else:
{
  "searchString": "highly optimized search keywords that look for the best products, including 2026 models, specific prices, and brands"
}
${t?`
User profile/preferences: `+t:""}`,c=await O.chatCompletion([{role:"user",content:l}],"openai/gpt-oss-120b",{temperature:.3,signal:i});s();let h=e;try{const w=c.match(/\{[\s\S]*\}/),A=JSON.parse(w?w[0]:c);A.searchString&&(h=A.searchString)}catch(w){console.warn("Failed to parse expansion JSON, using default",w)}n({status:"navigating",message:"Searching the web via DuckDuckGo..."});let S="";try{s();const w=await Q.search(h);if(s(),!w||w.length===0)throw new Error("DuckDuckGo returned no results.");const A=w.slice(0,6).map(p=>p.link);n({status:"navigating",message:`Analyzing Page Metadata from ${A.length} pages...`});const E=()=>{try{const p=Array.from(document.querySelectorAll("a")).filter(g=>g.href&&(g.href.includes("amazon.in")||g.href.includes("flipkart.com")||g.href.includes("croma.com")||g.href.includes("reliancedigital.in")||g.href.includes("myntra.com"))).map(g=>({text:(g.innerText||"").trim(),href:g.href})),d=p.filter(g=>g.href.includes("/dp/")||g.href.includes("/product/")||g.href.includes("/p/")||g.href.includes("/itm/")||g.href.match(/\/[A-Z0-9]{10}(?:\/|$)/)).map(g=>`[DIRECT PRODUCT] ${g.text}: ${g.href}`),I=p.filter(g=>!g.href.includes("/dp/")&&!g.href.includes("/product/")&&!g.href.includes("/p/")&&!g.href.includes("/itm/")&&!g.href.match(/\/[A-Z0-9]{10}(?:\/|$)/)).map(g=>`[OTHER] ${g.text}: ${g.href}`),f=(document.body.innerText||"").replace(/\s+/g," ").substring(0,4e3),x=[...d,...I.slice(0,5)].join(`
`);return{url:window.location.href,title:document.title,content:f+`

=== PRODUCT LINKS FOUND ON PAGE ===
`+x.substring(0,2500)}}catch(p){return{url:window.location.href,title:document.title,content:"",error:p.message}}},y=await Y.spawnWithConcurrency(A,E,3,15e3,(p,d)=>{const I=["Comparing Price Points...","Verifying Seller Rating...","Locating Add-to-Cart Selectors..."],C=I[p%I.length];n({status:"thinking",message:C})});s();const v=y.filter(p=>{var d,I;return p.status==="success"&&((I=(d=p.result)==null?void 0:d.content)==null?void 0:I.length)>100});v.length>0?S=v.map(p=>`=== SOURCE: ${p.result.title} (${p.result.url}) ===
${p.result.content}`).join(`

`):S=w.map(p=>`Title: ${p.title}
URL: ${p.link}
Snippet: ${p.snippet}`).join(`

---

`)}catch(w){return console.warn("DDG search failed:",w),{isShopping:!1,message:`Web Search failed: ${w.message}. Please try a slightly different query.`}}s(),n({status:"thinking",message:"Reading through products and reasoning out the best option..."});const b=`
<Context>
You are an expert human Procurement Agent named Nova. You have been given live web data from DuckDuckGo.
Your goal: Help the user BUY the best product, not just read about it.
User Profile/Preferences: ${t||"None"}
</Context>

<Rules>
1. IDENTIFY: What is the user's hidden need? (e.g. "Gaming" means low latency is prioritized over battery).
2. It's okay to read reviews and listicles! Extract the absolute best products that exactly match the budget/criteria.
3. CRITICAL URL RULES — READ CAREFULLY:
   a. You MUST look at the "=== PRODUCT LINKS FOUND ON PAGE ===" sections in the data. Lines marked [DIRECT PRODUCT] are DIRECT product page URLs — USE THESE.
   b. Direct product URLs contain patterns like: /dp/, /product/, /p/, /itm/ — these are VALID.
   c. NEVER use search/listing URLs that contain: /s?k=, /search, /s/, /browse/ — these are INVALID.
   d. If you cannot find a direct product URL for a product, put "Check Site" in the url field. Do NOT construct a /s?k= search URL.
   e. DuckDuckGo links are NEVER valid product URLs.
4. Do not blindly refuse a good product just to reach a high arbitrary count. Try to extract 4-5 products if available.
5. IF a direct product page on Flipkart or Amazon lacks a clear price tag in the scraped text, DO NOT discard it! Just estimate the price or put "Check Site" and include it anyway. Direct product URLs are incredibly valuable.
</Rules>

<Data>
${S.substring(0,5e4)}
</Data>

<Task>
Identify the absolute Winners for: "${e}". 
CRITICAL RULE FOR PRODUCT COUNT: You MUST extract AT LEAST 5 highly qualified products from the provided text! Do not stop at just 1. It is absolutely unacceptable to return only 1 product.

CRITICAL RULE FOR DUPLICATES: You MUST extract 5 DISTINCT product models/brands (e.g. OnePlus 15, iQOO 15, Samsung S25, Vivo X200, Xiaomi 15). DO NOT extract the exact same product 5 times with different colors or storage capacities! Every item in your array must be a completely different product model from the others.

If you cannot find 5 products, you MUST return at least 1 or 2 products that loosely fit the criteria. NEVER return an empty array [].

Make sure you output a purely valid JSON structure (DO NOT WRAP IN MARKDOWN) like this:
{
  "thought_process": "Explain your detailed human-like trade-offs and reasoning here out loud",
  "products": [
    {
      "name": "Product Name",
      "price": "Current Price in INR (e.g. ₹4,999)",
      "specs": ["spec 1", "spec 2", "spec 3"],
      "explanation": "A concise explanation of why it fits user preferences.",
      "url": "CRITICAL: ONLY use [DIRECT PRODUCT] URLs from the data containing /dp/ or /product/ or /p/. NEVER construct /s?k= search URLs!",
      "image": "Image URL if found",
      "score": "Overall Score 1-10",
      "badge": "best or premium"
    }
  ]
}
</Task>
`,m=await O.chatCompletion([{role:"user",content:b}],"openai/gpt-oss-120b",{temperature:.3,signal:i});s();let T=[],N="";try{const w=m.replace(/<think>[\s\S]*?<\/think>/g,"").trim(),A=w.match(/\{[\s\S]*\}/),E=JSON.parse(A?A[0]:w);T=E.products||[],N=E.thought_process||"",T=T.map(v=>{let p=v.url;if(p&&p!=="Check Site"){const d=p.toLowerCase();(d.includes("/s?k=")||d.includes("/s/ref=")||d.includes("/search?")||d.includes("/browse/")||d.includes("duckduckgo.com"))&&(p=null)}else p=null;return{...v,url:p}});const y=T.filter(v=>!v.url&&v.name);if(y.length>0){s(),n({status:"navigating",message:`Resolving direct product links for ${y.length} products...`});const v=async C=>{try{const f=`https://www.amazon.in/s?k=${encodeURIComponent(C)}`,x=await fetch(f,{headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",Accept:"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8","Accept-Language":"en-IN,en;q=0.9"}});if(!x.ok)return null;const g=await x.text(),R=/href="\/([^"]*\/dp\/([A-Z0-9]{10})[^"]*)"/gi,D=[...g.matchAll(R)],F=new Set,U=[];for(const M of D){const W=M[1],J=M[2];if(!F.has(J)&&!W.includes("/sspa/")&&!W.includes("gp/slredirect")&&(F.add(J),U.push(`https://www.amazon.in/${W.split("?")[0]}`)),U.length>=3)break}return U.length>0?U[0]:null}catch(f){return console.warn(`Failed to resolve URL for ${C}:`,f),null}},p=y.map(C=>v(C.name)),d=await Promise.allSettled(p);let I=0;T=T.map(C=>{if(!C.url&&C.name){const f=d[I];if(I++,f.status==="fulfilled"&&f.value)return{...C,url:f.value}}return C}),n({status:"thinking",message:`Resolved ${d.filter(C=>C.status==="fulfilled"&&C.value).length} direct product links.`})}if(T.length>0){const v=T.map(p=>`${p.name} - ${p.price}`).join(", ");this.conversationContext.push({role:"user",content:e}),this.conversationContext.push({role:"assistant",content:`I found and recommended these products to the user based on their query: ${v}`}),this.conversationContext.length>6&&(this.conversationContext=this.conversationContext.slice(-6))}}catch(w){return console.error("Failed to parse LLM JSON:",w,m),{isShopping:!1,message:"Failed to parse product data from LLM."}}const $=T.length>0?T[0].url:null,P=T.length>0?T[0].name:null;return{isShopping:!0,products:T,thought_process:N,message:"Here are the top recommendations based on your request. Do you have any specific questions about these, or should I add the best one to your cart?",winnerUrl:$,winnerProduct:P}}static async comparePrices(e,n,t){return t({status:"navigating",message:`Opening Flash.co and comparing prices for ${n}...`}),new Promise((r,i)=>{chrome.tabs.create({url:"https://flash.co",active:!0},a=>{const s=a.id;chrome.tabs.onUpdated.addListener(function o(l,c){l===s&&c.status==="complete"&&(chrome.tabs.onUpdated.removeListener(o),t({status:"navigating",message:"Injecting automation script into Flash.co..."}),setTimeout(()=>{chrome.scripting.executeScript({target:{tabId:s},files:["flashco-automation.js"]},()=>{if(chrome.runtime.lastError)return r({isShopping:!1,message:"Failed to inject script: "+chrome.runtime.lastError.message});t({status:"thinking",message:"Running search on Flash.co..."}),chrome.tabs.sendMessage(s,{action:"startComparison",url:e},async h=>{if(!h)return r({isShopping:!1,message:"Failed to communicate with Flash.co automation."});if(h.error)return r({isShopping:!1,message:h.error});t({status:"thinking",message:"Analyzing comparison results..."});const S=h.data.storesData||h.data,b=h.data.aiSummary||"",m=`You are an elite conversational Indian shopping assistant. I searched Flash.co for pricing and specs on ${n}.
Here are the store prices I found:
${JSON.stringify(S,null,2)}

${b?`
Here are the actual product specs, pros, and cons I scraped:
${b}
`:""}

Compare these prices in INR. Identify the absolute best deal considering price and store reputation.
If I provided specs and pros above, you MUST organically weave them into your recommendation to explain WHY this product is good! Do not just list prices. Mention the key specs and why it fits their needs.
Output a nice, conversational PLAIN TEXT summary of your recommendation. At the end, ask if they would like you to add the winning item to their cart!
CRITICAL RULE: DO NOT use markdown tables or complex markdown structures. Use ONLY simple bolding (**) and basic bullet points (-) for the formatting!`,T=await O.chatCompletion([{role:"user",content:m}],"openai/gpt-oss-120b",{temperature:.3});k.conversationContext.push({role:"user",content:`Can you compare prices and give me the specs for ${n}?`}),k.conversationContext.push({role:"assistant",content:T}),k.conversationContext.length>6&&(k.conversationContext=k.conversationContext.slice(-6)),r({isShopping:!1,message:`### AI Recommendation

${T}`,extraData:S})})})},1500))})})})}static async startCartAutomation(e,n){return n({status:"navigating",message:"Opening product page..."}),new Promise(t=>{chrome.tabs.create({url:e,active:!0},r=>{const i=r.id;chrome.tabs.onUpdated.addListener(function a(s,o){s===i&&o.status==="complete"&&(chrome.tabs.onUpdated.removeListener(a),n({status:"thinking",message:"Injecting cart automation script..."}),setTimeout(()=>{chrome.scripting.executeScript({target:{tabId:i},files:["cart-automation.js"]},()=>{if(chrome.runtime.lastError)return t({isShopping:!1,message:`Error injecting script: ${chrome.runtime.lastError.message}`});n({status:"thinking",message:'Clicking "Add to Cart" button...'}),chrome.tabs.sendMessage(i,{action:"executeClicks",clicks:["Add to Cart"]},l=>{const c=l?l.log:"No response from tab.",h=c.toLowerCase().includes("clicked");t({isShopping:!1,message:h?`✅ Done! I've added the item to your cart.

**Automation Log:**
${c}`:`⚠️ I opened the product page but couldn't find the Add to Cart button. You can add it manually from the open tab.

**Log:**
${c}`})})})},5e3))})})})}};z(k,"conversationContext",[]);let G=k;class se{constructor(){this.maxRetries=2,this.retryCounts={}}static verifyOutcome(e,n,t){var i;if(t.action==="NAVIGATE"&&e.url===n.url&&!n.url.includes(t.value))return{success:!1,errorType:"navigation_failed",reason:"URL did not change after navigation."};if(t.action==="TYPE"&&t.id){const a=(i=n.interactives)==null?void 0:i.find(s=>s.id===t.id);a&&a.value!==t.value&&a.tagName}const r=(n.textContext||"").toLowerCase();return r.includes("404 not found")||r.includes("this site can't be reached")||r.includes("access denied")?{success:!1,errorType:"navigation_blocked",reason:"Browser shows error page."}:r.includes("verify you are human")||r.includes("captcha")||r.includes("robot check")?{success:!1,errorType:"captcha_detected",reason:"CAPTCHA detected."}:{success:!0}}async recover(e,n,t,r,i){console.warn(`RecoveryEngine: Recovering from ${e}`);const a=`${r}-${t.action}`;if(this.retryCounts[a]=(this.retryCounts[a]||0)+1,this.retryCounts[a]>this.maxRetries)throw new Error(`Recovery failed twice for ${t.action}. Aborting task.`);const s=`
        CRITICAL FAILURE DETECTED.
        The Agent failed to execute an action. You must propose a fix.

        User Goal: "${n}"
        Last Action: ${JSON.stringify(t)}
        Failure Type: "${e}"
        Current URL: "${r}"
        Page Context Snippet: "${i.substring(0,500)}..."

        RECOVERY STRATEGIES:
        - element_not_found: The ID might have changed. Suggest looking for the element by TEXT or using a specific selector if you know one. OR suggest scrolling.
        - selector_changed: Suggest finding by text content.
        - navigation_blocked: Suggest a different site or search command.
        - timeout: Suggest refreshing or checking internet.
        - captcha_detected: Suggest "WAIT" to let user solve it, or "fail" if impossible.
        - site_interstitial: Suggest looking for "Close" or "X" button.

        OUTPUT:
        Provide the NEXT JSON Action to recover.
        Example: { "thought": "Selector failed, trying by text.", "action": "CLICK_TEXT", "text": "Add to Cart" }
        `;try{const o=await O.chatCompletion([{role:"system",content:"You are a Recovery Specialist. Fix the broken agent execution."},{role:"user",content:s}],null,{temperature:.1}),l=this._extractJSON(o);if(!l)throw new Error("LLM failed to provide valid recovery JSON");return JSON.parse(l)}catch(o){throw console.error("Recovery Planning Failed",o),new Error("Self-healing system halted.")}}_extractJSON(e){const n=e.match(/\{[\s\S]*\}/);return n?n[0]:null}}const H=new se;class ie{constructor(){this.memoryCache=new Map}async loadProfile(e){try{const n=new URL(e).hostname;if(this.memoryCache.has(n))return this.memoryCache.get(n);const{data:t,error:r}=await X.from("site_profiles").select("*").eq("domain",n).single();return r||!t?null:(this.memoryCache.set(n,t),t)}catch(n){return console.warn("SiteMemory Load Failed",n),null}}async updateProfile(e,n){try{const t=new URL(e).hostname,r=await this.loadProfile(e)||{domain:t,learnings:{}},i={...r.learnings,...n},{error:a}=await X.from("site_profiles").upsert({domain:t,learnings:i,updated_at:new Date},{onConflict:"domain"});a||this.memoryCache.set(t,{...r,learnings:i})}catch(t){console.error("SiteMemory Update Failed",t)}}getMemoryHint(e){if(!e||!e.learnings)return"";let n=`
[MEMORY ACTIVATED]:
`;return e.learnings.known_popup&&(n+=`- ALERT: This site has a popup. Look for a close button early.
`),e.learnings.stable_search_selector&&(n+=`- PREFERRED SEARCH: Use selector '${e.learnings.stable_search_selector}'
`),n}}const q=new ie;class ce{constructor(){this.currentRun=[],this.runId=null}startRun(){this.runId=Date.now().toString(),this.currentRun=[],console.log("AgentReplay: Recording started",this.runId)}logStep(e){const n={...e,timestamp:Date.now()};this.currentRun.push(n)}async saveRun(){if(!(!this.runId||this.currentRun.length===0))try{const e=await L.get("replay_history")||[];e.unshift({id:this.runId,date:new Date().toISOString(),steps:this.currentRun}),e.length>5&&e.pop(),await L.set("replay_history",e),console.log("AgentReplay: Run saved.")}catch(e){console.error("AgentReplay: Save Failed",e)}}async getHistory(){return await L.get("replay_history")||[]}}const K=new ce;class le{constructor(){this.config={scrollSteps:3,defaultWait:2e3}}async executeAction(e,n,t){return console.log("HybridCore: Dispatching",e.action),e.action==="NAVIGATE"?await _.executeStep(e,n,t):e.action==="CLICK"||e.action==="TYPE"?await _.executeStep(e,n,t):e.action==="SCROLL"?await _.executeStep(e,n,t):await _.executeStep(e,n,t)}}const j=new le;class ue{constructor(){this.patterns=[]}async loadPatterns(){this.patterns=await L.get("action_patterns")||[]}async learn(e,n){const t=this._extractKey(e),r=n.map(i=>({action:i.action,thought:i.thought}));this.patterns.push({key:t,sequence:r,weight:1}),await L.set("action_patterns",this.patterns)}predictNext(e,n){const t=this._extractKey(e),r=this.patterns.find(i=>i.key===t);if(r){const i=n.length;if(i<r.sequence.length)return console.log("ActionPredictor: Prediction available",r.sequence[i]),r.sequence[i]}return null}_extractKey(e){return e.toLowerCase().replace(/\b(please|can you|i want to)\b/g,"").trim()}}const B=new ue;class de{constructor(){this.abortController=null,this.isAgentic=!1,typeof chrome<"u"&&chrome.runtime&&chrome.runtime.onMessage.addListener((e,n,t)=>{if(e.type==="START_AGENT_TASK")return this.runTask(e.prompt,e.history||[],e.isAgentic,e.isWebSearchEnabled,e.isShoppingMode||!1,e.isImageGen||!1,e.imageAttachments||[],r=>{chrome.runtime.sendMessage({type:"AGENT_PROGRESS",data:r}).catch(()=>{})}),t({status:"started"}),!0;if(e.type==="STOP_AGENT_TASK")return this.handleStop(),_.detach().catch(()=>{}),t({status:"stopped"}),!0;if(e.type==="CONFIRM_ACTION")this.handleConfirmation(!0);else if(e.type==="REJECT_ACTION")this.handleConfirmation(!1);else{if(e.type==="ENHANCE_PROMPT")return this.enhancePrompt(e.prompt).then(r=>t(r)),!0;if(e.type==="PROCESS_VOICE_COMMAND")return this.processVoiceCommand(e.prompt,e.history).then(r=>t(r)),!0;if(e.type==="GENERATE_TITLE")return this.generateConversationTitle(e.messages).then(r=>t(r)),!0;if(e.type==="START_CART_AUTOMATION")return G.startCartAutomation(e.url,r=>{chrome.runtime.sendMessage({type:"AGENT_PROGRESS",data:r}).catch(()=>{})}).then(r=>t(r)),!0;if(e.type==="FLASH_COMPARE")return G.comparePrices(e.url,e.name,r=>{chrome.runtime.sendMessage({type:"AGENT_PROGRESS",data:r}).catch(()=>{})}).then(r=>t(r)),!0}}),this.confirmationResolver=null}async enhancePrompt(e){try{return{enhancedPrompt:(await O.chatCompletion([{role:"system",content:`
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
            `},{role:"user",content:e}],null,{temperature:.3})).trim()}}catch(n){return console.error("Prompt Enhancement Failed",n),{enhancedPrompt:e}}}async generateConversationTitle(e){var n;try{const t=e.slice(0,4).map(i=>{var a;return`${i.role==="user"?"User":"AI"}: ${((a=i.content)==null?void 0:a.slice(0,120))||""}`}).join(`
`),r=await O.chatCompletion([{role:"system",content:"Generate a SHORT title (5-8 words max) summarizing this conversation. Return ONLY the title text, no quotes, no punctuation at the end."},{role:"user",content:t}],null,{temperature:.3});return{title:((n=r==null?void 0:r.trim())==null?void 0:n.slice(0,60))||"Untitled Chat"}}catch(t){return console.error("Title generation failed",t),{title:null}}}handleConfirmation(e){this.confirmationResolver&&(this.confirmationResolver(e),this.confirmationResolver=null)}async waitForConfirmation(e){return new Promise((n,t)=>{if(e.aborted){t(new Error("STOP_SIGNAL"));return}this.confirmationResolver=n,setTimeout(()=>{this.confirmationResolver===n&&(this.confirmationResolver(!1),this.confirmationResolver=null)},6e4)})}handleStop(){this.abortController&&(this.abortController.abort(),this.abortController=null)}async processVoiceCommand(e,n){try{const r=`
            You are Nova, an Advanced Voice Assistant.
            Current Date: ${new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata"})}
            
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
            `,i=n.slice(-6).map(o=>({role:o.role||(o.sender==="user"?"user":"assistant"),content:o.message})),a=[{role:"system",content:r},...i,{role:"user",content:e}],s=await O.chatCompletion(a,null,{temperature:.7});if(s.includes('{"action": "NAVIGATE"'))try{const o=s.replace(/```json/g,"").replace(/```/g,"").trim(),l=o.indexOf("{"),c=o.lastIndexOf("}");if(l!==-1&&c!==-1){const h=JSON.parse(o.substring(l,c+1));if(h.action==="NAVIGATE"&&h.url)return chrome.tabs.update({url:h.url}),{message:`Opening ${h.url}`,action:"NAVIGATE"}}}catch(o){console.warn("Voice Nav Parse Error",o)}return{message:s.replace(/[\*#_`~]/g,"")}}catch(t){return console.error("Voice Processing Failed",t),{message:"I'm having trouble processing that right now."}}}async runTask(e,n,t,r,i,a,s,o){console.log("AgentService: Starting Task",e,"History Len:",n.length,"Img:",a,"Attached Images:",(s==null?void 0:s.length)||0),this.abortController=new AbortController;const l=this.abortController.signal,c=()=>{if(l.aborted)throw new Error("STOP_SIGNAL")};try{const h=oe.analyze(e);console.log("AgentService: Intent Analysis",h);const S=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"full",timeStyle:"short"});if(a){o({status:"generating_image",message:"Generating Image..."});try{const{imageUrl:b,revisedPrompt:m}=await re.generateImage(e,o);c(),o({status:"completed",message:"Image Generated",result:{message:m?`Generated: ${m}`:"Here is your image:",images:[b]}})}catch(b){console.error("Image Gen Failed:",b),o({status:"completed",result:{message:`Failed to generate image: ${b.message}. Please check your API Key in Settings.`}})}return}if(!i&&!t&&!r){o({status:"thinking",message:"Generating response...",logEntry:{type:"thought",message:"💭 Processing your message...",timestamp:new Date().toLocaleTimeString()}});const b=s&&s.length>0;let m;if(b){m=[{type:"text",text:e}];for(const P of s)m.push({type:"image_url",image_url:{url:P}});console.log(`[AgentService] Vision message: ${s.length} image(s) attached`)}else m=e;const N=[{role:"system",content:b?`You are Nova, a helpful AI assistant with VISION capabilities. Current Date: ${S}. The user has attached image(s). Analyze them thoroughly — describe what you see, answer questions about the content, read any text in the image, and provide detailed insights. Be specific and helpful.`:`You are Nova, a helpful AI assistant. Current Date: ${S}. Maintain conversation context.`},...n,{role:"user",content:m}],$=await O.chatCompletion(N);c(),o({status:"completed",message:"Response ready",result:{message:$}});return}if(t||i){await this.startAgenticTask(e,n,t,i,o,l,c);return}if(r){o({status:"planning",message:"Deep Research: Searching web & opening background tabs...",logEntry:{type:"plan",message:"Starting deep research swarm",timestamp:new Date().toLocaleTimeString()}});const b=await Q.search(e);if(b.length===0){o({status:"completed",result:{message:"No search results found for your query."}});return}const m=b.slice(0,6).map(w=>w.link);o({status:"navigating",message:`Opening ${m.length} research tabs...`,logEntry:{type:"navigate",message:`Spawning ${m.length} research tabs`,timestamp:new Date().toLocaleTimeString()}});const T=()=>{try{const E=((document.querySelector("article")||document.querySelector("main")||document.body).innerText||"").replace(/\s+/g," ").substring(0,8e3);return{url:window.location.href,title:document.title,content:E,length:E.length}}catch(w){return{url:window.location.href,title:document.title,content:"",error:w.message}}};let N="";try{const A=(await Y.spawnWithConcurrency(m,T,3,2e4,(E,y,v)=>{var d;const p=((d=b[E])==null?void 0:d.title)||`Tab ${E+1}`;o({status:y==="extracting"?"thinking":"navigating",message:`${p.substring(0,40)}...: ${y==="loading"?"🔄 Loading":y==="extracting"?"🧠 Reading":y==="done"?"✅ Done":"❌ Failed"}`,logEntry:{type:y==="extracting"?"think":"navigate",message:`${p.substring(0,50)}: ${y}`,url:(v==null?void 0:v.url)||"",timestamp:new Date().toLocaleTimeString()}})})).filter(E=>{var y,v;return E.status==="success"&&((v=(y=E.result)==null?void 0:y.content)==null?void 0:v.length)>100});N=A.map(E=>`=== SOURCE: ${E.result.title} (${E.result.url}) ===
${E.result.content}`).join(`

`),o({status:"thinking",message:`Synthesizing from ${A.length} sources...`,logEntry:{type:"think",message:`Read ${A.length} pages, synthesizing`,timestamp:new Date().toLocaleTimeString()}})}catch(w){console.warn("[Agent] Swarm research failed, falling back to snippets",w),N=b.map((A,E)=>`${E+1}. [${A.title}](${A.link}): ${A.snippet}`).join(`
`)}(!N||N.length<200)&&(N=b.map((w,A)=>`${A+1}. [${w.title}](${w.link}): ${w.snippet}`).join(`
`));const $=`
                User Question: "${e}"
                Current Date: ${S}
                
                Research Data (from ${Y.getOpenTabs().length} background tabs):
                ${N}

                Instructions:
                - Provide a comprehensive, well-structured answer based on the research data.
                - PRIORITIZE information from ${new Date().getFullYear()}.
                - Include citations with source names.
                - Be thorough but organized with clear sections.
                - DO NOT USE MARKDOWN TABLES. Use bulleted lists or bold text.
                `,P=await O.chatCompletion([{role:"system",content:`You are Nova, a deep research assistant. Current Date: ${S}. You have access to ${Y.getOpenTabs().length} open research tabs.`},{role:"user",content:$}]);c(),o({status:"completed",message:"Deep Research Complete",result:{message:P,taskSummary:{type:"web_research",tabsOpened:m.length,tabsAlive:Y.getOpenTabs().length,sourcesUsed:m.length}}});return}}catch(h){if(h.message==="STOP_SIGNAL"){console.log("Task stopped by user"),o({status:"idle",message:"Task Stopped"});return}console.error("Agent execution failed:",h),o({status:"error",message:h.message})}finally{this.abortController=null;try{const[h]=await chrome.tabs.query({active:!0,currentWindow:!0});h&&(chrome.tabs.sendMessage(h.id,{type:"DISABLE_DOM_OVERLAY"}).catch(()=>{}),await chrome.scripting.executeScript({target:{tabId:h.id},func:V.cleanup}))}catch{}}}async startAgenticTask(e,n,t,r,i,a,s){var c;i({status:"thinking",message:"Initializing Agent..."});let[o]=await chrome.tabs.query({active:!0,currentWindow:!0});if(!o)throw new Error("No active tab found");if(o.url.startsWith("chrome://")||o.url.startsWith("edge://")||!o.url){i({status:"completed",result:{message:"I cannot run on this system page. Please open a website."}});return}try{chrome.tabs.sendMessage(o.id,{type:"ENABLE_DOM_OVERLAY"}).catch(()=>{})}catch{}i({status:"planning",message:"Analyzing context..."}),await B.loadPatterns();let l={};try{l=((c=(await chrome.scripting.executeScript({target:{tabId:o.id},func:V.getBrowserState}))[0])==null?void 0:c.result)||{}}catch(h){console.warn("Failed to get initial state",h)}try{K.startRun(),await _.attach(o.id),await this.runNavigatorLoop(e,n,o,l,i,a,s,r)}finally{await _.detach(),await K.saveRun()}}async wait(e,n){if(n!=null&&n.aborted)throw new Error("STOP_SIGNAL");return new Promise((t,r)=>{const i=setTimeout(()=>{t(),n==null||n.removeEventListener("abort",a)},e),a=()=>{clearTimeout(i),r(new Error("STOP_SIGNAL"))};n==null||n.addEventListener("abort",a)})}async runNavigatorLoop(e,n,t,r,i,a,s,o){var w,A;let l=!1,c=[];const h=40;let S=0,b="",m=r;this.lastAction=null;let T=null;n.slice(-4).map(E=>{const y=typeof E.content=="string"?E.content:"Data Object";return`${E.role.toUpperCase()}: ${y.substring(0,200)}...`}).join(`
`);const N=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"full",timeStyle:"short"});new Date().getFullYear();let $="";if(o)try{const E=e==="PROCEED_TO_WEB_SEARCH";s();const y=await G.process(e,i,"",E,a,s);if(!y){i({status:"completed",message:"Shopping canceled or no result."});return}if(!y.isShopping){i({status:"completed",message:"Need clarification...",result:{message:y.message,isShopping:!1,needsProceed:y.needsProceed||!1,extraData:y.extraData||null}});return}if(y.isShopping){i({status:"completed",message:"Shopping Task Completed.",result:{message:y.message,isShopping:!0,products:y.products,winnerProduct:y.winnerProduct,winnerUrl:y.winnerUrl}});return}}catch(E){console.error("Shopping Engine Failed",E),i({status:"error",message:`Shopping Error: ${E.message}`});return}const P=`
You are Nova, a Smart Shopping Agent & Researcher (Navigator) with VISION capabilities.
Current Date: ${N}
User Goal: "${e}"

${$}
${q.getMemoryHint(T)}


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
`;for(;!l&&S<h;){if(s(),S++,S>1||!m.url){if(b!==(m==null?void 0:m.url))try{chrome.tabs.sendMessage(t.id,{type:"ENABLE_DOM_OVERLAY"}).catch(()=>{})}catch{}i({status:"navigating",message:`Scanning... (Turn ${S})`});try{m=(await chrome.scripting.executeScript({target:{tabId:t.id},func:V.getBrowserState}))[0].result,(m.url.startsWith("chrome-extension://")||m.url.startsWith("chrome://"))&&(console.warn("Restricted Internal Page detected."),m.textContext="This is an internal extension page. I cannot read or interact with it for security reasons.",m.interactives=[])}catch(v){if(v.message.includes("cannot be scripted")||v.message.includes("Extension context invalidated"))console.warn("Restricted Page detected:",v.message),m={url:"Restricted Page",title:"Restricted Page",textContext:"Protected Page. Cannot interact.",interactives:[]};else throw v}}if(!m)throw new Error("Failed to get browser state");b===m.url&&S>1&&c.push("System Note: URL did not change after last action."),b!==m.url&&(T=await q.loadProfile(m.url)),b=m.url,i({status:"thinking",message:"Deciding..."});let E;const y=B.predictNext(e,c);if(y)E=y,c.push(`System: Action Predictor chose: ${E.action} (Confidence: High)`);else{const v=`
            Goal: ${e}
            Current URL: ${m.url}
            **MEDIA STATE: ${(w=m.media)!=null&&w.isPlaying?`PLAYING (${(A=m.media)==null?void 0:A.title})`:"STOPPED"}**
            History: ${c.slice(-6).join(" -> ")}
            Content: ${(m.textContext||"").substring(0,2500)}... 
            
            INTERACTIVE ELEMENTS: 
            ${(()=>{var I;try{const C=(((I=m.interactives)==null?void 0:I.slice(0,30))||[]).map(f=>{var g,R,D,F,U,M;const x={id:f.id,tag:f.tagName,t:f.text?f.text.substring(0,50):((g=f.attributes)==null?void 0:g.name)||((R=f.attributes)==null?void 0:R.placeholder)||"",h:((D=f.attributes)==null?void 0:D.href)||"",eid:((F=f.attributes)==null?void 0:F.eId)||""};return(f.tagName==="input"||f.tagName==="textarea")&&(x.v=((U=f.attributes)==null?void 0:U.value)??"",x.placeholder=((M=f.attributes)==null?void 0:M.placeholder)||""),x});return JSON.stringify(C)}catch{return"[]"}})()}

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
            `;let p;try{p=await O.chatCompletion([{role:"system",content:P},{role:"user",content:v}],null,{temperature:.1,signal:a})}catch(I){console.error("LLM Request Failed:",I),c.push(`System: LLM Error(${I.message}).Retrying...`),await this.wait(500,a);continue}s();let d;try{if(d=(C=>{if(!C)return null;let f=C;f.includes("```json")?f=f.replace(/```json/gi,"").replace(/```/g,""):f.includes("```")&&(f=f.replace(/```/g,""));const x=f.indexOf("{"),g=f.lastIndexOf("}");if(x!==-1&&g!==-1&&g>x){let R=f.substring(x,g+1);try{return R=R.replace(/,\s*}/g,"}"),R=R.replace(/,\s*\]/g,"]"),R=R.replace(/\\n/g,"\\\\n"),JSON.parse(R)}catch(D){throw console.warn("AgentService: First JSON parse pass failed, trying regex fallback.",D.message),D}}return null})(p),!d)throw new Error("No JSON found in response.");if((d.action==="CLICK"||d.action==="TYPE")&&(d.id===void 0||d.id===null))throw new Error(`Missing 'id' for ${d.action}. You MUST include the numeric 'id' of the element.`);if((d.action==="CLICK_TEXT"||d.action==="TYPE_TEXT")&&!d.text)throw new Error(`Missing 'text' for ${d.action}.`)}catch(I){console.error("JSON Parse/Validation Error",I),c.push(`System: Invalid JSON or Schema (${I.message}). Retrying...`);continue}if(c.push(`${d.action}: ${d.thought} `),d.thought&&i({status:"thinking",message:d.thought,logEntry:{type:"thought",message:`💭 ${d.thought}`,timestamp:new Date().toLocaleTimeString()}}),i({status:"navigating",message:d.thought||`Executing ${d.action}...`,logEntry:{type:"navigate",message:`${d.action}: ${d.value||d.text||`ID ${d.id}`}`,timestamp:new Date().toLocaleTimeString()}}),s(),d.action==="ANSWER"||d.action==="FINISH")l=!0,await B.learn(e,c),i({status:"completed",message:"Step Completed",result:{message:d.value||d.thought}});else{const I=this.lastAction&&this.lastAction.action===d.action&&this.lastAction.id===d.id&&this.lastAction.value===d.value,C=b===m.url;if(I&&C){console.warn("AgentService: Loop detected, blocking duplicate action."),c.push(`System: You just executed '${d.action}' on ID ${d.id} and nothing changed.You MUST do something different(e.g.SCROLL or click a different element).`);continue}this.lastAction={action:d.action,id:d.id,value:d.value},K.logStep({action:d,thought:d.thought,stateUrl:m.url,stateTitle:m.title});try{await j.executeAction(d,m.interactives,t.id);const f=d.action==="NAVIGATE"?800:400;await this.wait(f,a);const x=await this._getState(t.id),g=await H.constructor.verifyOutcome(m,x,d);if(!g.success){console.warn("AgentService: Action Verification Failed",g),c.push(`System: Action failed(${g.reason}).Triggering Recovery...`);try{const R=await H.recover(g.errorType,e,d,x.url||"unknown",x.textContext||"");i({status:"navigating",message:`Recovering: ${R.thought} `}),c.push(`System: Recovery Plan: ${R.thought} `),await j.executeAction(R,x.interactives,t.id),await this.wait(1e3,a)}catch(R){console.error("Recovery Failed:",R),c.push("System: Recovery failed.Skipping step.")}}}catch(f){if(a.aborted)throw new Error("STOP_SIGNAL");if(f.message.includes("Target element with ID")||f.message.includes("not found")){console.warn("AgentService: Element missing. Feeding back to LLM."),c.push(`System Error: ${f.message}. The element might have moved or is hidden.Please Check the 'INTERACTIVE ELEMENTS' list again and choose a valid ID.`);continue}console.error("Step Execution Failed:",f);try{const x=await this._getState(t.id),g=await H.recover("execution_exception",e,d,x.url||"unknown",x.textContext||"");c.push(`System: Exception caught.Recovery Plan: ${g.thought} `),await j.executeAction(g,x.interactives,t.id),await this.wait(1e3,a)}catch{c.push(`Error executing action & Recovery failed: ${f.message}.`)}}}}if(S>=h){i({status:"thinking",message:"Time limit reached. Summarizing findings..."});const v=c.join(`
`),p=`
                You are Nova, the Navigator.You ran out of steps / time while trying to help the user.
                User Goal: "${e}"

                Execution History:
                ${v}

INSTRUCTIONS:
1. Summarize what you found so far.
                2. If you found products / prices, list them.
                3. If you didn't find the exact answer, explain what you tried and suggest next steps.
4. Be helpful despite the cutoff.
                `;try{const d=await O.chatCompletion([{role:"system",content:"You are a helpful assistant summarizing a task."},{role:"user",content:p}]);i({status:"completed",message:"Task Timed Out (Summary Provided)",result:{message:`** Time Limit Reached.**

Here is a summary of what I found: 

${d} `}})}catch{i({status:"error",message:"Timed out and failed to summarize."})}return}}}async _getState(e){var n;try{return((n=(await chrome.scripting.executeScript({target:{tabId:e},func:V.getBrowserState}))[0])==null?void 0:n.result)||{}}catch(t){return console.warn("Failed to get state",t),{}}}}new de;console.log("Nova Browser Agent: Service Worker Started");Z.init();chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:!0}).catch(u=>console.error(u));chrome.runtime.onInstalled.addListener(()=>{console.log("Nova Browser Agent Installed")});
