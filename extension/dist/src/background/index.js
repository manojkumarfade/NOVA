import{S as R,s as B}from"../../assets/StorageService.Dv_ujdX7.js";import"../../assets/ContentReader.nO1touE1.js";import"../../assets/preload-helper.CRk0x-X1.js";const V={async init(){await this.updateRules(),typeof chrome<"u"&&chrome.storage&&chrome.storage.onChanged&&chrome.storage.onChanged.addListener((c,e)=>{e==="local"&&(c.firewall_settings||c.firewall_active)&&this.updateRules()})},async updateRules(){if(typeof chrome>"u"||!chrome.declarativeNetRequest)return;const c=await R.getGlobal("firewall_settings")||{mode:"off",blockList:[],allowList:[]},e=c.mode||"off",t=c.blockList||[],n=c.allowList||[];console.log("[Firewall] Updating rules. Mode:",e);const r=(await chrome.declarativeNetRequest.getDynamicRules()).map(i=>i.id);if(await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds:r}),e==="off")return;let s=[],o=1;if(e==="block_list")for(const i of t)i&&s.push({id:o++,priority:1,action:{type:"block"},condition:{urlFilter:`||${i}`,resourceTypes:["main_frame","sub_frame","xmlhttprequest"]}});else if(e==="allow_only"){s.push({id:o++,priority:1,action:{type:"block"},condition:{urlFilter:"*"}});for(const i of n)i&&s.push({id:o++,priority:2,action:{type:"allow"},condition:{urlFilter:`||${i}`,resourceTypes:["main_frame","sub_frame","xmlhttprequest"]}})}s.length>0&&(await chrome.declarativeNetRequest.updateDynamicRules({addRules:s}),console.log(`[Firewall] Applied ${s.length} rules.`))},async checkUrl(c){if(!c)return!0;const e=await R.getGlobal("firewall_settings");if(!e||!e.mode||e.mode==="off")return!0;let t;try{t=new URL(c).hostname}catch{return!1}return e.mode==="block_list"?!(e.blockList||[]).some(a=>t.includes(a)):e.mode==="allow_only"?(e.allowList||[]).some(a=>t.includes(a)):!0}};class J{constructor(){this.attachedTabId=null}async attach(e){if(this.attachedTabId!==e){this.attachedTabId&&await this.detach();try{await chrome.debugger.attach({tabId:e},"1.3"),this.attachedTabId=e,console.log(`Navigator: Attached to tab ${e}`)}catch(t){if(!t.message.includes("already attached"))throw console.warn("Navigator: Attach failed",t),t;this.attachedTabId=e}}}async detach(){if(this.attachedTabId){try{await chrome.debugger.detach({tabId:this.attachedTabId})}catch{}this.attachedTabId=null,console.log("Navigator: Detached")}}async executeStep(e,t,n){if(console.log("Navigator: Executing action",e),e.action==="ANSWER")return{done:!0,result:e.value};if(e.action==="NAVIGATE"){if(!await V.checkUrl(e.value))throw console.warn("Navigator: Blocked by Firewall",e.value),new Error(`Navigation to ${e.value} blocked by Firewall Settings.`);try{chrome.tabs.sendMessage(n,{type:"DISABLE_DOM_OVERLAY"}).catch(()=>{})}catch{}return await chrome.tabs.update(n,{url:e.value}),await this.waitForPageLoad(n),{done:!1,result:"Navigated to "+e.value}}if(e.action==="WAIT")return await new Promise(a=>setTimeout(a,1e3)),{done:!1,result:"Waited 1s"};this.attachedTabId!==n&&(console.warn("Navigator: Warn - Debugger not pre-attached. Attaching now..."),await this.attach(n));try{if(e.action==="SCROLL")return await chrome.debugger.sendCommand({tabId:n},"Runtime.evaluate",{expression:"window.scrollBy(0, window.innerHeight * 0.8)"}),await new Promise(r=>setTimeout(r,200)),{done:!1,result:"Scrolled down"};{let a=null;if(e.action==="CLICK_TEXT"||e.action==="TYPE_TEXT")console.log(`Navigator: Executing Text-Based Action: ${e.text}`),a={tagName:"*",text:e.text,rect:{x:0,y:0,w:0,h:0}};else if(a=t.find(r=>r.id===e.id),!a)throw new Error(`Target element with ID ${e.id} not found.`);if(e.action.startsWith("CLICK")||e.action.startsWith("TYPE")){if(a.rect&&a.rect.w>0){const r=a.rect.x+a.rect.w/2,s=a.rect.y+a.rect.h/2,o=`
                            (() => {
                                const currentY = window.scrollY;
                                const viewportH = window.innerHeight;
                                const targetY = currentY + ${a.rect.y}; 
                                const centerOffset = viewportH / 2;
                                const scrollTo = targetY - centerOffset;
                                window.scrollTo({top: scrollTo, behavior: 'instant'});
                            })()
                        `;await chrome.debugger.sendCommand({tabId:n},"Runtime.evaluate",{expression:o}),await new Promise(i=>setTimeout(i,100))}if(e.action.startsWith("CLICK")){const r=`
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
                        `;if(await chrome.debugger.sendCommand({tabId:n},"Runtime.evaluate",{expression:r}),a.rect&&a.rect.w>0){const s=a.rect.x+a.rect.w/2,o=a.rect.y+a.rect.h/2;await chrome.debugger.sendCommand({tabId:n},"Input.dispatchMouseEvent",{type:"mouseMoved",x:s,y:o}),await new Promise(i=>setTimeout(i,50)),await chrome.debugger.sendCommand({tabId:n},"Input.dispatchMouseEvent",{type:"mousePressed",x:s,y:o,button:"left",clickCount:1}),await new Promise(i=>setTimeout(i,50)),await chrome.debugger.sendCommand({tabId:n},"Input.dispatchMouseEvent",{type:"mouseReleased",x:s,y:o,button:"left",clickCount:1})}}else e.action.startsWith("TYPE")}if(e.action.startsWith("TYPE")){const r=`
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
                         `;await chrome.debugger.sendCommand({tabId:n},"Runtime.evaluate",{expression:r}),await new Promise(i=>setTimeout(i,100)),await chrome.debugger.sendCommand({tabId:n},"Runtime.evaluate",{expression:"document.activeElement ? document.activeElement.select() : null"}),await new Promise(i=>setTimeout(i,50)),await chrome.debugger.sendCommand({tabId:n},"Input.dispatchKeyEvent",{type:"keyDown",windowsVirtualKeyCode:8,nativeVirtualKeyCode:8}),await new Promise(i=>setTimeout(i,50));const s=String(e.value||"");for(const i of s)await chrome.debugger.sendCommand({tabId:n},"Input.dispatchKeyEvent",{type:"keyDown",text:i}),await new Promise(p=>setTimeout(p,10));const o=`
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
                                
                                const val = "${s.replace(/"/g,'\\"')}";

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
                    `;await chrome.debugger.sendCommand({tabId:n},"Runtime.evaluate",{expression:o}),await chrome.debugger.sendCommand({tabId:n},"Input.dispatchKeyEvent",{type:"keyDown",windowsVirtualKeyCode:13,nativeVirtualKeyCode:13})}}}catch(a){throw console.error("Navigator Action Failed:",a),a}finally{}return{done:!1,result:`Executed ${e.action}`}}async waitForPageLoad(e){return new Promise(t=>{const n=(a,r)=>{a===e&&r.status==="complete"&&(chrome.tabs.onUpdated.removeListener(n),t())};chrome.tabs.onUpdated.addListener(n),setTimeout(()=>{chrome.tabs.onUpdated.removeListener(n),t()},1e4)})}}const D=new J;class C{static async chatCompletion(e,t=null,n={}){const a=await R.get("llm_providers")||[],r=await R.get("model_settings");let s=a.filter(u=>u.isEnabled);if(s.length===0){console.warn("LLMClient: No enabled providers found. checking for any providers with keys...");const u=a.filter(h=>h.apiKey&&h.apiKey.length>0);if(u.length>0)console.log("LLMClient: Found valid providers. Auto-enabling for this session."),s=u;else throw new Error("No LLM providers configured. Please go to Settings > LLM Providers and add an API Key.")}let o=s[0],i=t||o.models[0];const p=s.find(u=>u.models.includes(t));if(p)o=p,i=t;else{const u=r==null?void 0:r.plannerModel,h=s.find(m=>m.models.includes(u));h&&(o=h,i=u)}if(!o.apiKey)throw new Error(`API Key missing for provider: ${o.name}`);const g=o.endpoint||"https://api.typegpt.net/v1/chat/completions";return console.log(`[LLMClient] Using ${o.name} with model ${i} at ${g}`),o.id==="typegpt"||o.id,this.callOpenAICompatible(o.apiKey,i,e,{...n,endpoint:g})}static async callOpenAICompatible(e,t,n,a={}){const r=a.endpoint||"https://api.typegpt.net/v1/chat/completions",s=3;let o=0;for(;o<s;)try{const i=await fetch(r,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${e}`},signal:a.signal,body:JSON.stringify({model:t,messages:n,temperature:a.temperature!==void 0?a.temperature:.7})});if(!i.ok){const l=await i.text();let g=`API Request Failed: ${i.status}`,u=i.status>=500||i.status===429;try{const h=JSON.parse(l);h.error&&h.error.message?(g+=` - ${h.error.message}`,h.error.message.includes("422")&&(g="Model Context Limit Exceeded. The conversation is too long. Please clear history or try a simpler task.",u=!1)):g+=` - ${l.substring(0,200)}`}catch{g+=` - ${l.substring(0,200)}`}if(i.status===422?(g="Model Context Limit Exceeded OR Invalid Request. Please try a shorter prompt or simpler task.",u=!1):i.status===401&&(g="Invalid API Key. Please check your Settings.",u=!1),u&&o<s-1){const h=Math.pow(2,o)*1e3;console.warn(`[LLMClient] Error ${i.status}. Retrying in ${h}ms...`),await new Promise(m=>setTimeout(m,h)),o++;continue}throw new Error(g)}return(await i.json()).choices[0].message.content}catch(i){if(i.name==="AbortError")throw i;if(o<s-1){const p=Math.pow(2,o)*1e3;console.warn(`[LLMClient] Network Error: ${i.message}. Retrying...`),await new Promise(l=>setTimeout(l,p)),o++}else throw console.error("LLM Call Failed after retries:",i),i}}}const _={getBrowserState:function(){document.querySelectorAll("[data-nova-id]").forEach(o=>o.removeAttribute("data-nova-id")),document.querySelectorAll(".agent-id-tag").forEach(o=>o.remove());const e=document.querySelectorAll("button,a,input,textarea,select,[role='button'],[role='link'],[onclick]"),t=[];let n=1;e.forEach(o=>{const i=o.getBoundingClientRect();i.width>=10&&i.height>=10&&i.bottom>0&&i.right>0&&i.top<window.innerHeight&&i.left<window.innerWidth&&getComputedStyle(o).visibility!=="hidden"&&getComputedStyle(o).display!=="none"&&(o.setAttribute("data-nova-id",n),t.push({id:n,tagName:o.tagName.toLowerCase(),text:(o.innerText||o.placeholder||o.value||o.getAttribute("aria-label")||"").substring(0,100).replace(/\s+/g," ").trim(),rect:{x:i.left,y:i.top,w:i.width,h:i.height},attributes:{href:o.getAttribute("href"),type:o.getAttribute("type"),role:o.getAttribute("role"),name:o.getAttribute("name"),placeholder:o.getAttribute("placeholder"),eId:o.id}}),n++)});const a={x:window.scrollX,y:window.scrollY,totalHeight:document.body.scrollHeight,viewportHeight:window.innerHeight};let r={isPlaying:!1,title:""};const s=document.querySelector("video, audio");if(s){r.isPlaying=!s.paused&&!s.ended&&s.readyState>2,r.title=document.title;const o=document.querySelector("h1.ytd-video-primary-info-renderer");o&&(r.title=o.innerText)}return{url:window.location.href,title:document.title,textContext:document.body.innerText.substring(0,15e3).replace(/\s+/g," "),interactives:t,scroll:a,media:r}},cleanup:function(){document.querySelectorAll("[data-nova-id]").forEach(e=>e.removeAttribute("data-nova-id")),document.querySelectorAll(".agent-id-tag").forEach(e=>e.remove())}},X={async generate({prompt:c,provider:e,model:t,size:n}){var p;const a=await R.get("image_settings"),r=(p=a==null?void 0:a.providers)==null?void 0:p[e];if(!(a!=null&&a.enabled))if(r&&r.apiKey)console.log("ImageService: Auto-enabling image generation as valid key is present.");else if(e==="pico")console.log("ImageService: Auto-enabling Pico (Free tier).");else throw new Error("Image generation is disabled in settings. Please enable it in Settings > Image Generation.");if(!r||!r.apiKey)throw new Error(`Provider '${e}' not configured or missing API key.`);const{apiKey:s}=r,o=t||r.model,i=n||r.size;console.log(`ImageService: Generating with ${e} (${o})`);try{switch(e){case"a4f":return await this.generateA4F(s,c,o,i);case"infip":return await this.generateInfip(s,c,o,i);case"pico":return await this.generatePico(s,c,o);default:throw new Error(`Unknown provider: ${e}`)}}catch(l){throw console.error("ImageService Error:",l),l}},async generateA4F(c,e,t,n){var s;const a=await fetch("https://api.a4f.co/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c}`},body:JSON.stringify({model:t,prompt:e,n:1,size:n})});if(!a.ok){const o=await a.json().catch(()=>({}));throw new Error(((s=o.error)==null?void 0:s.message)||"A4F Generation Failed")}return{url:(await a.json()).data[0].url,provider:"A4F",model:t,size:n}},async generateInfip(c,e,t,n){const a=await fetch("https://api.infip.pro/v1/images/generations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${c}`},body:JSON.stringify({model:t,prompt:e,n:1,size:n,response_format:"url"})});if(!a.ok)throw new Error(`Infip Failed: ${a.status} ${a.statusText}`);return{url:(await a.json()).data[0].url,provider:"Infip",model:t,size:n}},async generatePico(c,e,t){const a=await fetch("https://backend.buildpicoapps.com/aero/run/image-generation-api?pk=v1-Z0FBQUFBQnBieTUwS0t3d19jLW9EY1Q4UDU2RXdpWFMtUzFWV2Y5WjRTenRhNUZHaWpVZWN6WVQxYV95ZUpyMjlYbFVzZHZwd0I1dGdVb1h2TExpOXV3d01RLTRMdXFnUWc9PQ==",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:e})});if(!a.ok)throw new Error("PicoApps Generation Failed");const r=await a.json();if(r.status==="success")return{url:r.imageUrl,provider:"PicoApps",model:"Default",size:"1024x1024"};throw new Error(r.error||"PicoApps returned error status")}},z={async execute(c,e){var r,s,o;console.log("ImageAgent: Executing Plan",c);const t=await R.get("image_settings"),n=(t==null?void 0:t.activeProvider)||"a4f";let a="";if(c.mode==="PAGE_AWARE_IMAGE"){let i=(r=c.source_context)==null?void 0:r.summary_of_page;if(!i)try{console.log("[ImageAgent] Scanning active tab for visual context..."),e&&e({status:"generating_image",message:"Analyzing page structure..."});const[l]=await chrome.tabs.query({active:!0,currentWindow:!0});if(l&&l.id){const g=await chrome.scripting.executeScript({target:{tabId:l.id},func:()=>{var v,x,L;const u=(v=document.querySelector('meta[property="og:image"]'))==null?void 0:v.content;let h="";try{const T=document.querySelectorAll('script[type="application/ld+json"]');for(const O of T){const N=JSON.parse(O.innerText);if(N.image){h=Array.isArray(N.image)?N.image[0]:N.image;break}if(N["@graph"]){const A=N["@graph"].find(S=>S["@type"]==="Product");if(A&&A.image){h=Array.isArray(A.image)?A.image[0]:A.image;break}}}}catch{}const m=()=>Array.from(document.images).map(T=>({src:T.src,alt:T.alt||T.title||"",width:T.naturalWidth||T.width,height:T.naturalHeight||T.height,area:(T.naturalWidth||T.width)*(T.naturalHeight||T.height)})).filter(T=>T.width>200&&T.height>200).sort((T,O)=>O.area-T.area).slice(0,3);return{title:document.title,description:((x=document.querySelector('meta[name="description"]'))==null?void 0:x.content)||"",h1:((L=document.querySelector("h1"))==null?void 0:L.innerText)||"",ogImage:u,jsonLdImage:h,mainText:document.body.innerText.slice(0,800).replace(/\s+/g," ").trim(),images:m()}}});if(g&&g[0]&&g[0].result){const u=g[0].result,h=u.h1||u.title||"Unknown Subject",m=u.description||u.mainText.substring(0,200);i=`
                            *** VISUAL CONTEXT ***
                            SUBJECT: ${h}
                            DESCRIPTION: ${m}
                            VISUAL DETAILS: ${u.ogImage?"Main Image: "+u.ogImage:"See visible images"}
                            IMAGE ALT TEXT: ${u.images.map(v=>v.alt).join(", ")}
                            RAW CONTENT: ${u.mainText}
                            `,console.log("ImageAgent: Extracted Robust Context",i),e&&e({status:"generating_image",message:`Found Subject: "${h.substring(0,30)}..."`})}}}catch(l){console.warn("ImageAgent: Could not read page, falling back to goal",l),e&&e({status:"generating_image",message:"Could not read page. Using text only."})}if(a=(await C.chatCompletion([{role:"system",content:`You are an expert Visual Prompt Engineer for Generative AI.
                
                YOUR GOAL: Create a detailed image generation prompt based on the User's Goal and the Page Context.
                
                CRITICAL RULES:
                1. **IDENTIFY THE SUBJECT**: Look at the 'SUBJECT' and 'DESCRIPTION' fields in the Page Context.
                   - If the page is about a "Puma Shoe", the image MUST be of a Puma Shoe. 
                   - Do NOT hallucinate a different object (e.g. do not make a phone if the page is about shoes).
                2. **INTEGRATE VISUALS**: Use descriptors from the 'IMAGE ALT TEXT' or 'DESCRIPTION' to describe the object (color, shape, material).
                3. **STYLE**: If the user asks for "Marketing Style", ensure professional lighting, studio background, and high resolution.
                
                Output ONLY the raw prompt text. Do not include "Here is the prompt" or quotes.`},{role:"user",content:`User Goal: ${c.goal}

${i||"No Page Context Available."}`}])).content||c.goal,i.includes("SUBJECT:")){const l=i.match(/SUBJECT: (.*)/);if(l&&l[1]){const g=l[1].trim();a.toLowerCase().includes(g.toLowerCase())||(console.log(`[ImageAgent] Enforcing missed subject: ${g}`),a=`Subject: ${g}. ${a}`)}}}else a=`${c.goal}. ${((s=c.image_constraints)==null?void 0:s.style)||""} style. ${((o=c.image_constraints)==null?void 0:o.intended_use)||""}`;console.log("ImageAgent: Final Prompt",a);try{const i=await X.generate({prompt:a,provider:n});return{status:"SUCCESS",result:{message:`Generated image: ${a.slice(0,50)}...`,images:[i],summary:`Created image with ${i.provider}`}}}catch(i){return{status:"FAILED",result:{message:`Image Generation Failed: ${i.message}`,error:i.message}}}},async generateImage(c,e){const t=/(this|page|here|reference|context|screen|site|scan|analyze|read)/i.test(c);console.log(`[ImageAgent] Smart Mode: ${t?"PAGE_AWARE_IMAGE":"TEXT_TO_IMAGE"} (Prompt: "${c}")`),t&&e&&e({status:"generating_image",message:"Scanning page for visual references..."});const n=await this.execute({goal:c,mode:t?"PAGE_AWARE_IMAGE":"TEXT_TO_IMAGE",image_constraints:{style:"vibrant",intended_use:"chat"}},e);if(n.status==="SUCCESS")return{imageUrl:n.result.images[0],revisedPrompt:n.result.message};throw new Error(n.result.error||"Generation Failed")}},F={async search(c){let e=[];try{console.log("SearchService: Searching DDG HTML for",c);const t=await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(c)}`,{method:"GET",headers:{"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"}});if(t.ok){const n=await t.text();e=this.parseDuckDuckGoHTML(n)}}catch(t){console.error("SearchService HTML Error:",t)}if(e.length===0)try{console.log("SearchService: Falling back to DDG API");const t=await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(c)}&format=json`);if(t.ok){const n=await t.json();(n.Abstract||n.Heading)&&e.push({title:n.Heading||c,link:n.AbstractURL||n.Image||"https://duckduckgo.com",snippet:n.Abstract||n.Answer||"Instant Answer found."}),n.RelatedTopics&&n.RelatedTopics.slice(0,3).forEach(a=>{a.Text&&a.FirstURL&&e.push({title:a.Text.split("-")[0].trim(),link:a.FirstURL,snippet:a.Text})})}}catch(t){console.error("SearchService API Error:",t)}return e},parseDuckDuckGoHTML(c){const e=[],t=/<a[^>]*class="[^"]*result__a[^"]*"[^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi,n=[...c.matchAll(t)];for(const a of n.slice(0,5))try{let s=a[1];if(s.startsWith("//duckduckgo.com/l/")){const g=new URLSearchParams(s.split("?")[1]);s=decodeURIComponent(g.get("uddg"))}const o=this.decodeHtml(a[2]),p=c.substring(a.index+a[0].length).match(/<a[^>]*class="[^"]*result__snippet[^"]*"[^>]*>(.*?)<\/a>/),l=p?this.decodeHtml(p[1]):"";e.push({title:o,link:s,snippet:l})}catch{}return e},decodeHtml(c){return c.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/<b>/g,"").replace(/<\/b>/g,"").replace(/<[^>]*>/g,"")},async fetchPageContent(c){try{console.log("SearchService: Fetching content for Deep Research",c);const e=new AbortController,t=setTimeout(()=>e.abort(),5e3),n=await fetch(c,{signal:e.signal,headers:{"User-Agent":"Mozilla/5.0 (compatible; NovaAgent/1.0)"}});return clearTimeout(t),n.ok?(await n.text()).replace(/<script[^>]*>([\s\S]*?)<\/script>/gi," ").replace(/<style[^>]*>([\s\S]*?)<\/style>/gi," ").replace(/<[^>]+>/g,`
`).replace(/\s+/g," ").trim().substring(0,15e3):null}catch(e){return console.warn("Deep Fetch Failed:",c,e.message),null}}},q={KEYWORDS:{STRONG:["best","top","top-rated","best overall","best product","best option","best choice","best value","best quality","best in class","best available","best model","best brand","worth buying","worth it","good to buy","should i buy","is it good","is it worth","safe to buy","reliable","trusted","compare","comparison","vs","versus","which is better","which is best","difference between","pros and cons","advantages and disadvantages","recommended","most recommended","expert recommended","user recommended","popular","most popular","trending"],QUALITY:["good","better","excellent","high quality","premium","budget friendly","value for money","long lasting","durable","comfortable","effective","rating","reviews","review based","highly rated","best rated","customer feedback","real reviews"],FILTER:["under budget","under price","below","within budget","cheap but good","affordable","mid range","premium option","latest","new model","updated version","2024","2025","current best","for daily use","for beginners","for professionals","for students","for office","for gaming","for travel"],NEGATIVE:["scam","fake","avoid","bad","worst","issues","problems","complaints","not working","overpriced","low quality"]},analyze(c){const e=c.toLowerCase();let t=0,n=!1,a=!1,r=[];const s=this.KEYWORDS.STRONG.filter(l=>e.includes(l));s.length>0&&(t+=10,n=!0,a=!0,r.push("STRONG_INTENT"));const o=this.KEYWORDS.QUALITY.filter(l=>e.includes(l));o.length>0&&(e.split(" ").length>2||o.some(l=>l!=="good"))&&(t+=5,a=!0,r.push("QUALITY_INTENT"));const i=this.KEYWORDS.FILTER.filter(l=>e.includes(l));i.length>0&&(t+=3,r.push("FILTER_INTENT"));const p=this.KEYWORDS.NEGATIVE.filter(l=>e.includes(l));return p.length>0&&(t+=5,n=!0,a=!0,r.push("NEGATIVE_INTENT")),(e.startsWith("good morning")||e.startsWith("good night")||e.startsWith("hello")||e==="hi")&&(a=!1,n=!1,t=0),{shouldSearch:a,deepAnalysis:n,score:t,keywords:[...s,...o,...i,...p],intents:r}}};class K{constructor({id:e,name:t,brand:n,model:a,category:r,launchYear:s,msrp:o,link:i}){this.id=e||Math.random().toString(36).substr(2,9),this.name=t,this.brand=n||"Unknown",this.model=a||"",this.category=r||"",this.launchYear=s||new Date().getFullYear(),this.msrp=o||0,this.link=i||""}}class Q{constructor({site:e,basePrice:t,offers:n,stock:a,fetchedAt:r,link:s}){this.site=e,this.basePrice=t,this.offers=n||[],this.stock=a,this.fetchedAt=r||Date.now(),this.link=s}}class Z{constructor({site:e,basePrice:t,effectivePrice:n,breakdown:a,confidence:r,link:s}){this.site=e,this.basePrice=t,this.effectivePrice=n,this.breakdown=a,this.confidence=r,this.link=s}}const ee={async parseCommand(c){console.log(`🧠 [Shopping] Parsing intent: "${c}"...`);const e=`
        You are a Shopping Intent Parser.
        Extract parameters from the user's request.
        
        Output JSON ONLY:
        {
          "category": "headphones" | "laptop" | "shoes" | "saree" | "etc",
          "brand": "Sony" | "Apple" | null,
          "budget": number | null,
          "year": 2024 | 2025 | 2026 | null,
          "query": "The optimized search query to find these items"
        }
        `;try{const t=await C.chatCompletion([{role:"system",content:e},{role:"user",content:c}],null,{temperature:.1});return JSON.parse(t.replace(/```json/g,"").replace(/```/g,"").trim())}catch(t){return console.error("[Shopping] Parse Error",t),{query:c,category:"general",budget:null}}},async buildProductUniverse({category:c,brand:e,budget:t,query:n,year:a}){console.log(`🌌 [Shopping] Building universe via Deep Research for: ${n}`);const r=await F.search(n+" best review list");let s="",o=0;for(const u of r.slice(0,3)){if(o>=2)break;console.log(`📖 [Shopping] Reading Article: ${u.title}`);const h=await F.fetchPageContent(u.link);h&&h.length>500&&(s+=`

=== SOURCE: ${u.title} ===
${h.substring(0,15e3)}`,o++)}s||(console.warn("Could not fetch article content, falling back to snippets."),s=r.map(u=>u.snippet).join(`
`)),console.log(`🧠 [Shopping] Extracting Top Candidates from ${o} articles...`);const i=o===0||!s,p=i?r.map(u=>`Title: ${u.title}
Snippet: ${u.snippet}`).join(`

`):s;i&&console.warn("[Shopping] Deep Read failed/empty. Using Search Snippets as fallback.");const l=`
        Context: ${i?"Search Results Snippets":"Full Review Articles"} for ${n}.
        
        Task: Identify the Top 3-5 BEST products mentioned that match the criteria.
        Criteria:
        - Category: ${c}
        - Budget: ${t?`Strictly under ${t} INR`:"Reasonable price"}
        
        Rules:
        1. **Strict Budget**: If a budget is set (${t}), DO NOT suggest items significantly above it (max +10% tolerance).
        2. **Diversity**: Suggest 3 DISTINCT models (different brands if possible).
        3. **Specifics**: Use exact Model Names (e.g. "Samsung Galaxy S25").
        4. **Extract "Why to Buy"**: A persuasive one-liner.
        5. **Extract "Key Features"**: 2-3 highlights.

        Output JSON:
        [
          { "name": "Model Name", "reason": "Why it is a winner", "features": ["Feature 1", "Feature 2"] }
        ]
        `;let g=[];try{const u=await C.chatCompletion([{role:"system",content:`Context:
${p}`},{role:"user",content:l}],null,{temperature:.1});g=JSON.parse(u.replace(/```json/g,"").replace(/```/g,"").trim()).map(m=>{const v=new K({name:m.name,brand:e||"Unknown",category:c,launchYear:a,msrp:0});return v.reason=m.reason,v.features=m.features||[],v})}catch(u){console.warn("Candidate extraction failed",u)}return g.length===0?(console.warn("LLM returned 0 candidates. Using Search Results as Fallback."),r.slice(0,3).map(u=>new K({name:u.title.replace(/\|.*/,"").replace(/\.\.\./,"").trim(),category:c||"General",brand:e||"Unknown"}))):g},async scoreAndShortlist(c){return c.slice(0,3)},async resolvePrices(c){var r;console.log(`🕵️ [Shopping] Hunting prices for: ${c.name}`);const e=`buy ${c.name} price india`,t=await F.search(e+" site:amazon.in OR site:flipkart.com OR site:croma.com"),n=[],a=new Set;for(const s of t.slice(0,5)){let o="Unknown";if(s.link.includes("amazon")?o="Amazon":s.link.includes("flipkart")?o="Flipkart":s.link.includes("croma")?o="Croma":s.link.includes("reliance")&&(o="Reliance"),a.has(o)&&o!=="Unknown")continue;console.log(`   > Checking ${o}: ${s.link}`);let i=0,p="page";const l=(r=s.snippet)==null?void 0:r.match(/(?:₹|Rs\.?)\s?([\d,]+)/i);if(l){const g=l[1].replace(/,/g,""),u=parseInt(g,10);!isNaN(u)&&u>100&&(i=u,p="snippet",console.log(`   >> Found Snippet Price: ${i}`))}if(i===0){const g=await F.fetchPageContent(s.link);if(g){const u=`
                     Extract the CURRENT BUYING PRICE for: "${c.name}" from this text.
                     Text: ${g.substring(0,1e3)}
                     Ignore "EMI" or "Exchange". Return integer only. If missing return 0.
                     Output JSON: { "price": 24999 }
                     `;try{const h=await C.chatCompletion([{role:"user",content:u}],null,{temperature:0}),m=JSON.parse(h.replace(/```json/g,"").replace(/```/g,"").trim());m.price>100&&(i=m.price,p="llm")}catch{}}}i>100&&(n.push(new Q({site:o,basePrice:i,offers:[],stock:!0,link:s.link})),o!=="Unknown"&&a.add(o))}return n},computeEffectivePrice(c){let e=c.basePrice;const t=[],n=c.offers.find(r=>r.type==="bank");n&&(e-=n.discount,t.push(`Bank Offer: -₹${n.discount}`));const a=c.offers.find(r=>r.type==="coupon");return a&&(e-=a.discount,t.push(`Coupon: -₹${a.discount}`)),new Z({site:c.site,basePrice:c.basePrice,effectivePrice:e,breakdown:t,confidence:c.stock?.9:.4,link:c.link})},async process(c,e){e({status:"planning",message:"Shopping Agent: Parsing & Researching (Deep Read)..."});const t=await this.parseCommand(c);e({status:"thinking",message:`Reading Reviews to find best "${t.category}"... (This may take 10s)`});const n=await this.buildProductUniverse(t);if(n.length===0)return{message:"Could not identify specific top products from reviews."};const a=[];for(const r of n.slice(0,3)){e({status:"navigating",message:`Comparing prices for ${r.name}...`});const s=await this.resolvePrices(r);s.length>0&&(s.sort((o,i)=>o.basePrice-i.basePrice),a.push({product:r,bestDeal:s[0],alternatives:s.slice(1)}))}return e({status:"thinking",message:"Generating Comparison Table..."}),a.length===0?{message:"Found products but could not verify live Indian prices."}:(a.sort((r,s)=>r.bestDeal.basePrice-s.bestDeal.basePrice),{results:a,message:`Identified ${a.length} top options.`,summary:"Shopping Task Complete"})}};class te{constructor(){this.maxRetries=2,this.retryCounts={}}static verifyOutcome(e,t,n){var r;if(n.action==="NAVIGATE"&&e.url===t.url&&!t.url.includes(n.value))return{success:!1,errorType:"navigation_failed",reason:"URL did not change after navigation."};if(n.action==="TYPE"&&n.id){const s=(r=t.interactives)==null?void 0:r.find(o=>o.id===n.id);s&&s.value!==n.value&&s.tagName}const a=(t.textContext||"").toLowerCase();return a.includes("404 not found")||a.includes("this site can't be reached")||a.includes("access denied")?{success:!1,errorType:"navigation_blocked",reason:"Browser shows error page."}:a.includes("verify you are human")||a.includes("captcha")||a.includes("robot check")?{success:!1,errorType:"captcha_detected",reason:"CAPTCHA detected."}:{success:!0}}async recover(e,t,n,a,r){console.warn(`RecoveryEngine: Recovering from ${e}`);const s=`${a}-${n.action}`;if(this.retryCounts[s]=(this.retryCounts[s]||0)+1,this.retryCounts[s]>this.maxRetries)throw new Error(`Recovery failed twice for ${n.action}. Aborting task.`);const o=`
        CRITICAL FAILURE DETECTED.
        The Agent failed to execute an action. You must propose a fix.

        User Goal: "${t}"
        Last Action: ${JSON.stringify(n)}
        Failure Type: "${e}"
        Current URL: "${a}"
        Page Context Snippet: "${r.substring(0,500)}..."

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
        `;try{const i=await C.chatCompletion([{role:"system",content:"You are a Recovery Specialist. Fix the broken agent execution."},{role:"user",content:o}],null,{temperature:.1}),p=this._extractJSON(i);if(!p)throw new Error("LLM failed to provide valid recovery JSON");return JSON.parse(p)}catch(i){throw console.error("Recovery Planning Failed",i),new Error("Self-healing system halted.")}}_extractJSON(e){const t=e.match(/\{[\s\S]*\}/);return t?t[0]:null}}const G=new te;class ne{constructor(){this.memoryCache=new Map}async loadProfile(e){try{const t=new URL(e).hostname;if(this.memoryCache.has(t))return this.memoryCache.get(t);const{data:n,error:a}=await B.from("site_profiles").select("*").eq("domain",t).single();return a||!n?null:(this.memoryCache.set(t,n),n)}catch(t){return console.warn("SiteMemory Load Failed",t),null}}async updateProfile(e,t){try{const n=new URL(e).hostname,a=await this.loadProfile(e)||{domain:n,learnings:{}},r={...a.learnings,...t},{error:s}=await B.from("site_profiles").upsert({domain:n,learnings:r,updated_at:new Date},{onConflict:"domain"});s||this.memoryCache.set(n,{...a,learnings:r})}catch(n){console.error("SiteMemory Update Failed",n)}}getMemoryHint(e){if(!e||!e.learnings)return"";let t=`
[MEMORY ACTIVATED]:
`;return e.learnings.known_popup&&(t+=`- ALERT: This site has a popup. Look for a close button early.
`),e.learnings.stable_search_selector&&(t+=`- PREFERRED SEARCH: Use selector '${e.learnings.stable_search_selector}'
`),t}}const j=new ne;class ae{constructor(){this.currentRun=[],this.runId=null}startRun(){this.runId=Date.now().toString(),this.currentRun=[],console.log("AgentReplay: Recording started",this.runId)}logStep(e){const t={...e,timestamp:Date.now()};this.currentRun.push(t)}async saveRun(){if(!(!this.runId||this.currentRun.length===0))try{const e=await R.get("replay_history")||[];e.unshift({id:this.runId,date:new Date().toISOString(),steps:this.currentRun}),e.length>5&&e.pop(),await R.set("replay_history",e),console.log("AgentReplay: Run saved.")}catch(e){console.error("AgentReplay: Save Failed",e)}}async getHistory(){return await R.get("replay_history")||[]}}const Y=new ae;class re{constructor(){this.config={scrollSteps:3,defaultWait:2e3}}async executeAction(e,t,n){return console.log("HybridCore: Dispatching",e.action),e.action==="NAVIGATE"?await D.executeStep(e,t,n):e.action==="CLICK"||e.action==="TYPE"?await D.executeStep(e,t,n):e.action==="SCROLL"?await D.executeStep(e,t,n):await D.executeStep(e,t,n)}}const W=new re;class oe{constructor(){this.patterns=[]}async loadPatterns(){this.patterns=await R.get("action_patterns")||[]}async learn(e,t){const n=this._extractKey(e),a=t.map(r=>({action:r.action,thought:r.thought}));this.patterns.push({key:n,sequence:a,weight:1}),await R.set("action_patterns",this.patterns)}predictNext(e,t){const n=this._extractKey(e),a=this.patterns.find(r=>r.key===n);if(a){const r=t.length;if(r<a.sequence.length)return console.log("ActionPredictor: Prediction available",a.sequence[r]),a.sequence[r]}return null}_extractKey(e){return e.toLowerCase().replace(/\b(please|can you|i want to)\b/g,"").trim()}}const H=new oe;class ie{constructor(){this.abortController=null,this.isAgentic=!1,typeof chrome<"u"&&chrome.runtime&&chrome.runtime.onMessage.addListener((e,t,n)=>{if(e.type==="START_AGENT_TASK")this.runTask(e.prompt,e.history||[],e.isAgentic,e.isWebSearchEnabled,e.isShoppingMode||!1,e.isImageGen||!1,a=>{chrome.runtime.sendMessage({type:"AGENT_PROGRESS",data:a}).catch(()=>{})});else if(e.type==="STOP_AGENT")this.handleStop();else if(e.type==="CONFIRM_ACTION")this.handleConfirmation(!0);else if(e.type==="REJECT_ACTION")this.handleConfirmation(!1);else if(e.type==="ENHANCE_PROMPT")return this.enhancePrompt(e.prompt).then(a=>n(a)),!0}),this.confirmationResolver=null}async enhancePrompt(e){try{return{enhancedPrompt:(await C.chatCompletion([{role:"system",content:`
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
            `},{role:"user",content:e}],null,{temperature:.3})).trim()}}catch(t){return console.error("Prompt Enhancement Failed",t),{enhancedPrompt:e}}}handleConfirmation(e){this.confirmationResolver&&(this.confirmationResolver(e),this.confirmationResolver=null)}async waitForConfirmation(e){return new Promise((t,n)=>{if(e.aborted){n(new Error("STOP_SIGNAL"));return}this.confirmationResolver=t,setTimeout(()=>{this.confirmationResolver===t&&(this.confirmationResolver(!1),this.confirmationResolver=null)},6e4)})}handleStop(){this.abortController&&(this.abortController.abort(),this.abortController=null)}async runTask(e,t,n,a,r,s,o){console.log("AgentService: Starting Task",e,"History Len:",t.length,"Img:",s),this.abortController=new AbortController;const i=this.abortController.signal,p=()=>{if(i.aborted)throw new Error("STOP_SIGNAL")};try{const l=q.analyze(e);console.log("AgentService: Intent Analysis",l);const g=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"full",timeStyle:"short"});if(s){o({status:"generating_image",message:"Generating Image..."});try{const{imageUrl:u,revisedPrompt:h}=await z.generateImage(e,o);p(),o({status:"completed",message:"Image Generated",result:{message:h?`Generated: ${h}`:"Here is your image:",images:[u]}})}catch(u){console.error("Image Gen Failed:",u),o({status:"completed",result:{message:`Failed to generate image: ${u.message}. Please check your API Key in Settings.`}})}return}if(!n&&!a&&!r){o({status:"thinking",message:"Generating response..."});const u=[{role:"system",content:`You are Nova, a helpful AI assistant. Current Date: ${g}. Maintain conversation context.`},...t,{role:"user",content:e}],h=await C.chatCompletion(u);p(),o({status:"completed",message:"Response ready",result:{message:h}});return}if(a){o({status:"planning",message:"Searching web..."});const u=await F.search(e);let h="No results found.";u.length>0&&(h=u.map((x,L)=>`${L+1}. [${x.title}](${x.link}): ${x.snippet}`).join(`
`)),o({status:"thinking",message:"Synthesizing answer..."});const m=`
                User Question: "${e}"
                Current Date: ${g}
                
                Web Search Results:
                ${h}

                Instructions:
                - Answer the user's question based ONLY on the search results.
                - PRIORITIZE results from ${new Date().getFullYear()}.
                - IMPORTANT: Ignore your internal training data cut-off. TRUST the Search Results dates.
                - Provide citations if possible (e.g. [Source Title]).
                - Be concise and helpful.
                - DO NOT USE MARKDOWN TABLES. Use bulleted lists or bold text.
                `,v=await C.chatCompletion([{role:"system",content:`You are Nova, a helpful research assistant. Current Date: ${g}`},{role:"user",content:m}]);p(),o({status:"completed",message:"Search Completed",result:{message:v}});return}(n||r)&&await this.startAgenticTask(e,t,n,r,o,i,p)}catch(l){if(l.message==="STOP_SIGNAL"){console.log("Task stopped by user"),o({status:"idle",message:"Task Stopped"});return}console.error("Agent execution failed:",l),o({status:"error",message:l.message})}finally{this.abortController=null;try{const[l]=await chrome.tabs.query({active:!0,currentWindow:!0});l&&(chrome.tabs.sendMessage(l.id,{type:"DISABLE_DOM_OVERLAY"}).catch(()=>{}),await chrome.scripting.executeScript({target:{tabId:l.id},func:_.cleanup}))}catch{}}}async startAgenticTask(e,t,n,a,r,s,o){var l;r({status:"thinking",message:"Initializing Agent..."});let[i]=await chrome.tabs.query({active:!0,currentWindow:!0});if(!i)throw new Error("No active tab found");if(i.url.startsWith("chrome://")||i.url.startsWith("edge://")||!i.url){r({status:"completed",result:{message:"I cannot run on this system page. Please open a website."}});return}try{chrome.tabs.sendMessage(i.id,{type:"ENABLE_DOM_OVERLAY"}).catch(()=>{})}catch{}r({status:"planning",message:"Analyzing context..."}),await H.loadPatterns();let p={};try{p=((l=(await chrome.scripting.executeScript({target:{tabId:i.id},func:_.getBrowserState}))[0])==null?void 0:l.result)||{}}catch(g){console.warn("Failed to get initial state",g)}try{Y.startRun(),await D.attach(i.id),await this.runNavigatorLoop(e,t,i,p,r,s,o,a)}finally{await D.detach(),await Y.saveRun()}}async wait(e,t){if(t!=null&&t.aborted)throw new Error("STOP_SIGNAL");return new Promise((n,a)=>{const r=setTimeout(()=>{n(),t==null||t.removeEventListener("abort",s)},e),s=()=>{clearTimeout(r),a(new Error("STOP_SIGNAL"))};t==null||t.addEventListener("abort",s)})}async runNavigatorLoop(e,t,n,a,r,s,o,i){var O,N;let p=!1,l=[];const g=40;let u=0,h="",m=a;this.lastAction=null;let v=null;t.slice(-4).map(A=>{const S=typeof A.content=="string"?A.content:"Data Object";return`${A.role.toUpperCase()}: ${S.substring(0,200)}...`}).join(`
`);const x=new Date().toLocaleString("en-IN",{timeZone:"Asia/Kolkata",dateStyle:"full",timeStyle:"short"});new Date().getFullYear();let L="";if(i)if(/(this|current|here|page)/i.test(e)&&/(good|bad|worth|review|think|opinion|best)/i.test(e)){console.log("[AgentService] Consultation Intent Detected. Skipping Deep Shopping Search to chat with Page."),l.push("System: User asked for consultation on current page. Switched to Page-Aware Answer Mode."),r({status:"thinking",message:"Reading page content..."});try{const[S]=await chrome.tabs.query({active:!0,currentWindow:!0}),f=await chrome.scripting.executeScript({target:{tabId:S.id},func:_.getBrowserState});if(f&&f[0]&&f[0].result){const w=f[0].result.textContext;r({status:"thinking",message:"Analyzing page..."});const d=`
                        User Question: "${e}"
                        Role: You are an expert shopping assistant.
                        Context: The user is currently looking at a webpage.
                        Page Content:
                        ${w.substring(0,15e3)}

                        Task: Answer the user's question directly based on the page content.
                        - If asking "Is this good?", summarize pros/cons from the page.
                        - If asking for specs, extract them.
                        - Be concise and helpful.
                        `,I=await C.chatCompletion([{role:"system",content:`You are Nova. Current Date: ${new Date().toLocaleDateString()}`},{role:"user",content:d}]);r({status:"completed",message:"Consultation Complete",result:{message:I}});return}}catch(S){console.error("Consultation Fast-Path failed:",S)}}else try{const S=await ee.process(e,r);if(S.results&&S.results.length>0){const f=S.results[0];let w=`## 🏆 Recommendation: ${f.product.name}

`;if(w+=`> ${f.product.reason||"Best overall choice."}

`,f.product.features&&f.product.features.length&&(w+=`**Key Features:**
${f.product.features.map(d=>`- ${d}`).join(`
`)}

`),w+=`### 💰 Best Deal
`,w+=`**₹${f.bestDeal.basePrice}** at ${f.bestDeal.site} ${f.bestDeal.stock?"✅":"⚠️"}
`,f.alternatives&&f.alternatives.length>0?(w+=`*Also available at:*
`,f.alternatives.forEach(d=>{w+=`- ₹${d.basePrice} (${d.site})
`})):w+=`*(Best price found across major stores)*
`,w+=`
**What would you like to do?**
`,w+=`1. **[Add to Cart by saying "Add this to cart"]**
`,w+=`2. [View Deal](${f.bestDeal.link})

`,S.results.length>1&&(w+=`### ⚖️ Alternative Models
`,S.results.slice(1,4).forEach(d=>{w+=`**${d.product.name}**
`,w+=`- Best Price: ₹${d.bestDeal.basePrice} (${d.bestDeal.site})
`,w+=`- ${d.product.reason?d.product.reason.substring(0,60)+"...":""}
`,d.bestDeal.link?w+=`[View Deal](${d.bestDeal.link})

`:w+=`
`})),l.push(`System: Shopping Completed. ${w}`),f.bestDeal.link&&f.bestDeal.link.startsWith("http")){r({status:"navigating",message:`🚀 Redirecting to best deal for ${f.product.name}...`});try{typeof chrome<"u"&&chrome.tabs&&chrome.tabs.update({url:f.bestDeal.link})}catch{}}r({status:"completed",message:'Shopping Task Completed. Say "Add to cart" to proceed.',result:{message:w,data:S,autoRedirect:f.bestDeal.link}});return}else{r({status:"completed",message:"Shopping Completed",result:{message:S.message||"No results found."}});return}}catch(S){console.error("Shopping Engine Failed",S),r({status:"error",message:`Shopping Error: ${S.message}`});return}const T=`
You are Nova, a Smart Shopping Agent & Researcher (Navigator).
Current Date: ${x}
User Goal: "${e}"

${L}
${j.getMemoryHint(v)}


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
`;for(;!p&&u<g;){if(o(),u++,o(),u++,u>1||!m.url){try{chrome.tabs.sendMessage(n.id,{type:"ENABLE_DOM_OVERLAY"}).catch(()=>{})}catch{}r({status:"navigating",message:`Scanning... (Turn ${u})`});try{m=(await chrome.scripting.executeScript({target:{tabId:n.id},func:_.getBrowserState}))[0].result,(m.url.startsWith("chrome-extension://")||m.url.startsWith("chrome://"))&&(console.warn("Restricted Internal Page detected."),m.textContext="This is an internal extension page. I cannot read or interact with it for security reasons.",m.interactives=[])}catch(f){if(f.message.includes("cannot be scripted")||f.message.includes("Extension context invalidated"))console.warn("Restricted Page detected:",f.message),m={url:"Restricted Page",title:"Restricted Page",textContext:"Protected Page. Cannot interact.",interactives:[]};else throw f}}if(!m)throw new Error("Failed to get browser state");h===m.url&&u>1&&l.push("System Note: URL did not change after last action."),h!==m.url&&(v=await j.loadProfile(m.url)),h=m.url,r({status:"thinking",message:"Deciding..."});let A;const S=H.predictNext(e,l);if(S)A=S,l.push(`System: Action Predictor chose: ${A.action} (Confidence: High)`);else{const f=`
            Goal: ${e}
            Current URL: ${m.url}
            **MEDIA STATE: ${(O=m.media)!=null&&O.isPlaying?`PLAYING (${(N=m.media)==null?void 0:N.title})`:"STOPPED"}**
            History: ${l.slice(-6).join(" -> ")}
            Content: ${(m.textContext||"").substring(0,2500)}... 
            
            INTERACTIVE ELEMENTS: 
            ${(()=>{var I;try{const P=(((I=m.interactives)==null?void 0:I.slice(0,30))||[]).map(y=>{var E,$,M,U,k;const b={id:y.id,tag:y.tagName,t:y.text?y.text.substring(0,50):((E=y.attributes)==null?void 0:E.name)||(($=y.attributes)==null?void 0:$.placeholder)||"",h:((M=y.attributes)==null?void 0:M.href)||"",eid:((U=y.attributes)==null?void 0:U.eId)||""};return(y.tagName==="input"||y.tagName==="textarea")&&(b.v=((k=y.attributes)==null?void 0:k.value)||""),b});return JSON.stringify(P)}catch{return"[]"}})()}

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
            `;let w;try{w=await C.chatCompletion([{role:"system",content:T},{role:"user",content:f}],null,{temperature:.1,signal:s})}catch(I){console.error("LLM Request Failed:",I),l.push(`System: LLM Error(${I.message}).Retrying...`),await this.wait(2e3,s);continue}o();let d;try{const P=(b=>{let E=b.indexOf("{");if(E===-1)return null;let $=0,M=!1,U=-1;for(let k=E;k<b.length;k++)if(b[k]==="{"?($++,M=!0):b[k]==="}"&&$--,M&&$===0){U=k;break}return U!==-1?b.substring(E,U+1):null})(w);if(!P)throw new Error("No JSON found in response");const y=P.replace(/```json/g,"").replace(/```/g,"").trim();if(d=JSON.parse(y),(d.action==="CLICK"||d.action==="TYPE")&&(d.id===void 0||d.id===null))throw new Error(`Missing 'id' for ${d.action}. You MUST include the numeric 'id' of the element.`);if((d.action==="CLICK_TEXT"||d.action==="TYPE_TEXT")&&!d.text)throw new Error(`Missing 'text' for ${d.action}.`)}catch(I){console.error("JSON Parse/Validation Error",I),l.push(`System: Invalid JSON or Schema (${I.message}). Retrying...`);continue}if(l.push(`${d.action}: ${d.thought} `),r({status:"navigating",message:d.thought||`Executing ${d.action}...`}),o(),d.action==="ANSWER"||d.action==="FINISH")p=!0,await H.learn(e,l),r({status:"completed",message:"Step Completed",result:{message:d.value||d.thought}});else{const I=this.lastAction&&this.lastAction.action===d.action&&this.lastAction.id===d.id&&this.lastAction.value===d.value,P=h===m.url;if(I&&P){console.warn("AgentService: Loop detected, blocking duplicate action."),l.push(`System: You just executed '${d.action}' on ID ${d.id} and nothing changed. You MUST do something different (e.g. SCROLL or click a different element).`);continue}this.lastAction={action:d.action,id:d.id,value:d.value},Y.logStep({action:d,thought:d.thought,stateUrl:m.url,stateTitle:m.title});try{await W.executeAction(d,m.interactives,n.id),await this.wait(800,s);const y=await this._getState(n.id),b=await G.constructor.verifyOutcome(m,y,d);if(!b.success){console.warn("AgentService: Action Verification Failed",b),l.push(`System: Action failed (${b.reason}). Triggering Recovery...`);try{const E=await G.recover(b.errorType,e,d,y.url||"unknown",y.textContext||"");r({status:"navigating",message:`Recovering: ${E.thought}`}),l.push(`System: Recovery Plan: ${E.thought}`),await W.executeAction(E,y.interactives,n.id),await this.wait(1e3,s)}catch(E){console.error("Recovery Failed:",E),l.push("System: Recovery failed. Skipping step.")}}}catch(y){if(s.aborted)throw new Error("STOP_SIGNAL");if(y.message.includes("Target element with ID")||y.message.includes("not found")){console.warn("AgentService: Element missing. Feeding back to LLM."),l.push(`System Error: ${y.message}. The element might have moved or is hidden. Please Check the 'INTERACTIVE ELEMENTS' list again and choose a valid ID.`);continue}console.error("Step Execution Failed:",y);try{const b=await this._getState(n.id),E=await G.recover("execution_exception",e,d,b.url||"unknown",b.textContext||"");l.push(`System: Exception caught. Recovery Plan: ${E.thought}`),await W.executeAction(E,b.interactives,n.id),await this.wait(1e3,s)}catch{l.push(`Error executing action & Recovery failed: ${y.message}.`)}}}}if(u>=g){r({status:"thinking",message:"Time limit reached. Summarizing findings..."});const f=l.join(`
`),w=`
                You are Nova, the Navigator. You ran out of steps/time while trying to help the user.
                User Goal: "${e}"

                Execution History:
                ${f}

                INSTRUCTIONS:
                1. Summarize what you found so far.
                2. If you found products/prices, list them.
                3. If you didn't find the exact answer, explain what you tried and suggest next steps.
                4. Be helpful despite the cutoff.
                `;try{const d=await C.chatCompletion([{role:"system",content:"You are a helpful assistant summarizing a task."},{role:"user",content:w}]);r({status:"completed",message:"Task Timed Out (Summary Provided)",result:{message:`**Time Limit Reached.**

Here is a summary of what I found:

${d}`}})}catch{r({status:"error",message:"Timed out and failed to summarize."})}return}}}async _getState(e){var t;try{return((t=(await chrome.scripting.executeScript({target:{tabId:e},func:_.getBrowserState}))[0])==null?void 0:t.result)||{}}catch(n){return console.warn("Failed to get state",n),{}}}}new ie;console.log("Nova Browser Agent: Service Worker Started");V.init();chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:!0}).catch(c=>console.error(c));chrome.runtime.onInstalled.addListener(()=>{console.log("Nova Browser Agent Installed")});
