var yf=Object.defineProperty;var Sf=(n,e,t)=>e in n?yf(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var vi=(n,e,t)=>Sf(n,typeof e!="symbol"?e+"":e,t);import{r as z,j as S,a as Fi,b as Mf}from"./index-Cv_4af0P.js";import{I as Lt,M as vl,B as nc,U as bf,a as Ef,S as Tf,V as wf,C as Af,T as Cf,R as Rf,b as Pf,F as Df,c as Lf,P as If,W as Nf,d as Uf,e as Ff,f as ic,X as sc,g as rc,Z as ac,h as Of,i as Bf,j as Vf,k as kf,l as zf}from"./Button-W6kX3jlJ.js";import{S as ut,s as oc}from"./StorageService-Dv_ujdX7.js";import{M as Gf,r as Hf}from"./index-CJO6tjVS.js";import{G as Wf}from"./GlassLayout-Q1NTwlrs.js";import{L as va,S as jf,C as lc}from"./SearchService-mlraOgoZ.js";import"./sidepanel-BT8bK_uy.js";import"./modulepreload-polyfill-B5Qt9EMX.js";const Xf=({isOpen:n=!1,onToggle:e,activeConversationId:t=null,onSelectConversation:i,onNewConversation:s,onDeleteConversation:r,onClearAll:a,className:o=""})=>{const[l,c]=z.useState(""),[u,d]=z.useState([]);z.useEffect(()=>{n&&(async()=>{try{const x=await ut.get("conversations_index",[]);Array.isArray(x)&&d(x)}catch(x){console.error("Sidebar load failed",x)}})()},[n]);const h=u==null?void 0:u.filter(p=>{var x,g,m,_;return((g=(x=p==null?void 0:p.title)==null?void 0:x.toLowerCase())==null?void 0:g.includes(l==null?void 0:l.toLowerCase()))||((_=(m=p==null?void 0:p.preview)==null?void 0:m.toLowerCase())==null?void 0:_.includes(l==null?void 0:l.toLowerCase()))}),f=p=>{const x=new Date(p),m=new Date-x,_=Math.floor(m/6e4),y=Math.floor(m/36e5),b=Math.floor(m/864e5);return _<1?"Just now":_<60?`${_}m ago`:y<24?`${y}h ago`:b<7?`${b}d ago`:x==null?void 0:x.toLocaleDateString()};return S.jsxs(S.Fragment,{children:[n&&S.jsx("div",{className:"fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm transition-all",onClick:e}),S.jsx("aside",{className:`
        fixed top-0 left-0 h-full w-80 z-[145]
        bg-black/95 border-r border-neon-cyan/20
        transition-transform duration-300 ease-in-out shadow-[10px_0_20px_rgba(0,0,0,0.5)]
        ${n?"translate-x-0":"-translate-x-full"}
        ${o}
      `,children:S.jsxs("div",{className:"flex flex-col h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 to-transparent",children:[S.jsxs("div",{className:"flex items-center justify-between p-5 border-b border-neon-cyan/10",children:[S.jsxs("div",{className:"flex flex-col",children:[S.jsx("h2",{className:"text-xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white tracking-wider",children:"HISTORY"}),S.jsx("span",{className:"text-[10px] font-mono text-neon-cyan/50 tracking-[0.2em] uppercase",children:"Conversation Logs"})]}),S.jsxs("div",{className:"flex gap-2",children:[S.jsx("button",{onClick:()=>{window.confirm("WIPE ALL MEMORY? This action is permanent.")&&a()},className:"p-1.5 rounded border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/60 transition-all group",title:"Clear All History",children:S.jsx(Lt,{name:"Trash2",size:16,className:"group-hover:scale-110"})}),S.jsx("button",{onClick:e,className:"p-1.5 rounded border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-all",title:"Close",children:S.jsx(Lt,{name:"X",size:18})})]})]}),S.jsx("div",{className:"p-4 border-b border-border",children:S.jsxs("div",{className:"relative",children:[S.jsx(Lt,{name:"Search",size:18,className:"absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"}),S.jsx("input",{type:"text",placeholder:"Search conversations...",value:l,onChange:p=>{var x;return c((x=p==null?void 0:p.target)==null?void 0:x.value)},className:"w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-base"})]})}),S.jsx("div",{className:"flex-1 overflow-y-auto",children:(h==null?void 0:h.length)===0?S.jsxs("div",{className:"flex flex-col items-center justify-center h-full p-8 text-center",children:[S.jsx(Lt,{name:"MessageSquare",size:48,className:"text-muted-foreground mb-4"}),S.jsx("p",{className:"text-sm text-muted-foreground",children:l?"No conversations found":"No conversations yet"})]}):S.jsx("div",{className:"flex flex-col",children:h==null?void 0:h.map(p=>S.jsxs("button",{onClick:()=>{i(p==null?void 0:p.id),window.innerWidth<1024&&e()},className:`
                      group relative flex flex-col gap-1 p-4 text-left border-b border-border
                      transition-base hover:bg-muted
                      ${t===(p==null?void 0:p.id)?"bg-muted":""}
                    `,children:[S.jsxs("div",{className:"flex items-start justify-between gap-2",children:[S.jsx("h3",{className:"text-sm font-caption font-medium text-foreground line-clamp-1",children:p==null?void 0:p.title}),S.jsxs("span",{className:"text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1",children:[(p==null?void 0:p.hasVoiceMessages)&&S.jsx(vl,{size:10,className:"text-neon-cyan",title:"Voice chat"}),f(p==null?void 0:p.timestamp)]})]}),(p==null?void 0:p.preview)&&S.jsx("p",{className:"text-xs text-muted-foreground line-clamp-2 pr-6",children:p==null?void 0:p.preview}),S.jsx("button",{onClick:x=>{x.stopPropagation(),window.confirm("Delete this chat?")&&r(p.id)},className:"absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity",title:"Delete Chat",children:S.jsx(Lt,{name:"Trash2",size:14})}),(p==null?void 0:p.messageCount)&&S.jsxs("div",{className:"flex items-center gap-1 mt-1",children:[S.jsx(Lt,{name:"MessageCircle",size:12,className:"text-muted-foreground"}),S.jsxs("span",{className:"text-xs text-muted-foreground",children:[p==null?void 0:p.messageCount," messages"]})]})]},p==null?void 0:p.id))})})]})})]})},md=z.createContext({transformPagePoint:n=>n,isStatic:!1,reducedMotion:"never"}),sa=z.createContext({}),ra=z.createContext(null),aa=typeof document<"u",yl=aa?z.useLayoutEffect:z.useEffect,gd=z.createContext({strict:!1}),Sl=n=>n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),qf="framerAppearId",xd="data-"+Sl(qf);function Yf(n,e,t,i){const{visualElement:s}=z.useContext(sa),r=z.useContext(gd),a=z.useContext(ra),o=z.useContext(md).reducedMotion,l=z.useRef();i=i||r.renderer,!l.current&&i&&(l.current=i(n,{visualState:e,parent:s,props:t,presenceContext:a,blockInitialAnimation:a?a.initial===!1:!1,reducedMotionConfig:o}));const c=l.current;z.useInsertionEffect(()=>{c&&c.update(t,a)});const u=z.useRef(!!(t[xd]&&!window.HandoffComplete));return yl(()=>{c&&(c.render(),u.current&&c.animationState&&c.animationState.animateChanges())}),z.useEffect(()=>{c&&(c.updateFeatures(),!u.current&&c.animationState&&c.animationState.animateChanges(),u.current&&(u.current=!1,window.HandoffComplete=!0))}),c}function as(n){return n&&typeof n=="object"&&Object.prototype.hasOwnProperty.call(n,"current")}function $f(n,e,t){return z.useCallback(i=>{i&&n.mount&&n.mount(i),e&&(i?e.mount(i):e.unmount()),t&&(typeof t=="function"?t(i):as(t)&&(t.current=i))},[e])}function js(n){return typeof n=="string"||Array.isArray(n)}function oa(n){return n!==null&&typeof n=="object"&&typeof n.start=="function"}const Ml=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],bl=["initial",...Ml];function la(n){return oa(n.animate)||bl.some(e=>js(n[e]))}function _d(n){return!!(la(n)||n.variants)}function Kf(n,e){if(la(n)){const{initial:t,animate:i}=n;return{initial:t===!1||js(t)?t:void 0,animate:js(i)?i:void 0}}return n.inherit!==!1?e:{}}function Zf(n){const{initial:e,animate:t}=Kf(n,z.useContext(sa));return z.useMemo(()=>({initial:e,animate:t}),[cc(e),cc(t)])}function cc(n){return Array.isArray(n)?n.join(" "):n}const uc={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},Xs={};for(const n in uc)Xs[n]={isEnabled:e=>uc[n].some(t=>!!e[t])};function Jf(n){for(const e in n)Xs[e]={...Xs[e],...n[e]}}const El=z.createContext({}),vd=z.createContext({}),Qf=Symbol.for("motionComponentSymbol");function ep({preloadedFeatures:n,createVisualElement:e,useRender:t,useVisualState:i,Component:s}){n&&Jf(n);function r(o,l){let c;const u={...z.useContext(md),...o,layoutId:tp(o)},{isStatic:d}=u,h=Zf(o),f=i(o,d);if(!d&&aa){h.visualElement=Yf(s,f,u,e);const p=z.useContext(vd),x=z.useContext(gd).strict;h.visualElement&&(c=h.visualElement.loadFeatures(u,x,n,p))}return z.createElement(sa.Provider,{value:h},c&&h.visualElement?z.createElement(c,{visualElement:h.visualElement,...u}):null,t(s,o,$f(f,h.visualElement,l),f,d,h.visualElement))}const a=z.forwardRef(r);return a[Qf]=s,a}function tp({layoutId:n}){const e=z.useContext(El).id;return e&&n!==void 0?e+"-"+n:n}function np(n){function e(i,s={}){return ep(n(i,s))}if(typeof Proxy>"u")return e;const t=new Map;return new Proxy(e,{get:(i,s)=>(t.has(s)||t.set(s,e(s)),t.get(s))})}const ip=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function Tl(n){return typeof n!="string"||n.includes("-")?!1:!!(ip.indexOf(n)>-1||/[A-Z]/.test(n))}const Xr={};function sp(n){Object.assign(Xr,n)}const Qs=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],Gi=new Set(Qs);function yd(n,{layout:e,layoutId:t}){return Gi.has(n)||n.startsWith("origin")||(e||t!==void 0)&&(!!Xr[n]||n==="opacity")}const $t=n=>!!(n&&n.getVelocity),rp={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},ap=Qs.length;function op(n,{enableHardwareAcceleration:e=!0,allowTransformNone:t=!0},i,s){let r="";for(let a=0;a<ap;a++){const o=Qs[a];if(n[o]!==void 0){const l=rp[o]||o;r+=`${l}(${n[o]}) `}}return e&&!n.z&&(r+="translateZ(0)"),r=r.trim(),s?r=s(n,i?"":r):t&&i&&(r="none"),r}const Sd=n=>e=>typeof e=="string"&&e.startsWith(n),Md=Sd("--"),uo=Sd("var(--"),lp=/var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g,cp=(n,e)=>e&&typeof n=="number"?e.transform(n):n,fi=(n,e,t)=>Math.min(Math.max(t,n),e),Hi={test:n=>typeof n=="number",parse:parseFloat,transform:n=>n},Vs={...Hi,transform:n=>fi(0,1,n)},ur={...Hi,default:1},ks=n=>Math.round(n*1e5)/1e5,ca=/(-)?([\d]*\.?[\d])+/g,bd=/(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,up=/^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;function er(n){return typeof n=="string"}const tr=n=>({test:e=>er(e)&&e.endsWith(n)&&e.split(" ").length===1,parse:parseFloat,transform:e=>`${e}${n}`}),li=tr("deg"),Nn=tr("%"),Ve=tr("px"),dp=tr("vh"),hp=tr("vw"),dc={...Nn,parse:n=>Nn.parse(n)/100,transform:n=>Nn.transform(n*100)},hc={...Hi,transform:Math.round},Ed={borderWidth:Ve,borderTopWidth:Ve,borderRightWidth:Ve,borderBottomWidth:Ve,borderLeftWidth:Ve,borderRadius:Ve,radius:Ve,borderTopLeftRadius:Ve,borderTopRightRadius:Ve,borderBottomRightRadius:Ve,borderBottomLeftRadius:Ve,width:Ve,maxWidth:Ve,height:Ve,maxHeight:Ve,size:Ve,top:Ve,right:Ve,bottom:Ve,left:Ve,padding:Ve,paddingTop:Ve,paddingRight:Ve,paddingBottom:Ve,paddingLeft:Ve,margin:Ve,marginTop:Ve,marginRight:Ve,marginBottom:Ve,marginLeft:Ve,rotate:li,rotateX:li,rotateY:li,rotateZ:li,scale:ur,scaleX:ur,scaleY:ur,scaleZ:ur,skew:li,skewX:li,skewY:li,distance:Ve,translateX:Ve,translateY:Ve,translateZ:Ve,x:Ve,y:Ve,z:Ve,perspective:Ve,transformPerspective:Ve,opacity:Vs,originX:dc,originY:dc,originZ:Ve,zIndex:hc,fillOpacity:Vs,strokeOpacity:Vs,numOctaves:hc};function wl(n,e,t,i){const{style:s,vars:r,transform:a,transformOrigin:o}=n;let l=!1,c=!1,u=!0;for(const d in e){const h=e[d];if(Md(d)){r[d]=h;continue}const f=Ed[d],p=cp(h,f);if(Gi.has(d)){if(l=!0,a[d]=p,!u)continue;h!==(f.default||0)&&(u=!1)}else d.startsWith("origin")?(c=!0,o[d]=p):s[d]=p}if(e.transform||(l||i?s.transform=op(n.transform,t,u,i):s.transform&&(s.transform="none")),c){const{originX:d="50%",originY:h="50%",originZ:f=0}=o;s.transformOrigin=`${d} ${h} ${f}`}}const Al=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Td(n,e,t){for(const i in e)!$t(e[i])&&!yd(i,t)&&(n[i]=e[i])}function fp({transformTemplate:n},e,t){return z.useMemo(()=>{const i=Al();return wl(i,e,{enableHardwareAcceleration:!t},n),Object.assign({},i.vars,i.style)},[e])}function pp(n,e,t){const i=n.style||{},s={};return Td(s,i,n),Object.assign(s,fp(n,e,t)),n.transformValues?n.transformValues(s):s}function mp(n,e,t){const i={},s=pp(n,e,t);return n.drag&&n.dragListener!==!1&&(i.draggable=!1,s.userSelect=s.WebkitUserSelect=s.WebkitTouchCallout="none",s.touchAction=n.drag===!0?"none":`pan-${n.drag==="x"?"y":"x"}`),n.tabIndex===void 0&&(n.onTap||n.onTapStart||n.whileTap)&&(i.tabIndex=0),i.style=s,i}const gp=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","transformValues","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function qr(n){return n.startsWith("while")||n.startsWith("drag")&&n!=="draggable"||n.startsWith("layout")||n.startsWith("onTap")||n.startsWith("onPan")||n.startsWith("onLayout")||gp.has(n)}let wd=n=>!qr(n);function xp(n){n&&(wd=e=>e.startsWith("on")?!qr(e):n(e))}try{xp(require("@emotion/is-prop-valid").default)}catch{}function _p(n,e,t){const i={};for(const s in n)s==="values"&&typeof n.values=="object"||(wd(s)||t===!0&&qr(s)||!e&&!qr(s)||n.draggable&&s.startsWith("onDrag"))&&(i[s]=n[s]);return i}function fc(n,e,t){return typeof n=="string"?n:Ve.transform(e+t*n)}function vp(n,e,t){const i=fc(e,n.x,n.width),s=fc(t,n.y,n.height);return`${i} ${s}`}const yp={offset:"stroke-dashoffset",array:"stroke-dasharray"},Sp={offset:"strokeDashoffset",array:"strokeDasharray"};function Mp(n,e,t=1,i=0,s=!0){n.pathLength=1;const r=s?yp:Sp;n[r.offset]=Ve.transform(-i);const a=Ve.transform(e),o=Ve.transform(t);n[r.array]=`${a} ${o}`}function Cl(n,{attrX:e,attrY:t,attrScale:i,originX:s,originY:r,pathLength:a,pathSpacing:o=1,pathOffset:l=0,...c},u,d,h){if(wl(n,c,u,h),d){n.style.viewBox&&(n.attrs.viewBox=n.style.viewBox);return}n.attrs=n.style,n.style={};const{attrs:f,style:p,dimensions:x}=n;f.transform&&(x&&(p.transform=f.transform),delete f.transform),x&&(s!==void 0||r!==void 0||p.transform)&&(p.transformOrigin=vp(x,s!==void 0?s:.5,r!==void 0?r:.5)),e!==void 0&&(f.x=e),t!==void 0&&(f.y=t),i!==void 0&&(f.scale=i),a!==void 0&&Mp(f,a,o,l,!1)}const Ad=()=>({...Al(),attrs:{}}),Rl=n=>typeof n=="string"&&n.toLowerCase()==="svg";function bp(n,e,t,i){const s=z.useMemo(()=>{const r=Ad();return Cl(r,e,{enableHardwareAcceleration:!1},Rl(i),n.transformTemplate),{...r.attrs,style:{...r.style}}},[e]);if(n.style){const r={};Td(r,n.style,n),s.style={...r,...s.style}}return s}function Ep(n=!1){return(t,i,s,{latestValues:r},a)=>{const l=(Tl(t)?bp:mp)(i,r,a,t),u={..._p(i,typeof t=="string",n),...l,ref:s},{children:d}=i,h=z.useMemo(()=>$t(d)?d.get():d,[d]);return z.createElement(t,{...u,children:h})}}function Cd(n,{style:e,vars:t},i,s){Object.assign(n.style,e,s&&s.getProjectionStyles(i));for(const r in t)n.style.setProperty(r,t[r])}const Rd=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function Pd(n,e,t,i){Cd(n,e,void 0,i);for(const s in e.attrs)n.setAttribute(Rd.has(s)?s:Sl(s),e.attrs[s])}function Pl(n,e){const{style:t}=n,i={};for(const s in t)($t(t[s])||e.style&&$t(e.style[s])||yd(s,n))&&(i[s]=t[s]);return i}function Dd(n,e){const t=Pl(n,e);for(const i in n)if($t(n[i])||$t(e[i])){const s=Qs.indexOf(i)!==-1?"attr"+i.charAt(0).toUpperCase()+i.substring(1):i;t[s]=n[i]}return t}function Dl(n,e,t,i={},s={}){return typeof e=="function"&&(e=e(t!==void 0?t:n.custom,i,s)),typeof e=="string"&&(e=n.variants&&n.variants[e]),typeof e=="function"&&(e=e(t!==void 0?t:n.custom,i,s)),e}function Ld(n){const e=z.useRef(null);return e.current===null&&(e.current=n()),e.current}const Yr=n=>Array.isArray(n),Tp=n=>!!(n&&typeof n=="object"&&n.mix&&n.toValue),wp=n=>Yr(n)?n[n.length-1]||0:n;function Br(n){const e=$t(n)?n.get():n;return Tp(e)?e.toValue():e}function Ap({scrapeMotionValuesFromProps:n,createRenderState:e,onMount:t},i,s,r){const a={latestValues:Cp(i,s,r,n),renderState:e()};return t&&(a.mount=o=>t(i,o,a)),a}const Id=n=>(e,t)=>{const i=z.useContext(sa),s=z.useContext(ra),r=()=>Ap(n,e,i,s);return t?r():Ld(r)};function Cp(n,e,t,i){const s={},r=i(n,{});for(const h in r)s[h]=Br(r[h]);let{initial:a,animate:o}=n;const l=la(n),c=_d(n);e&&c&&!l&&n.inherit!==!1&&(a===void 0&&(a=e.initial),o===void 0&&(o=e.animate));let u=t?t.initial===!1:!1;u=u||a===!1;const d=u?o:a;return d&&typeof d!="boolean"&&!oa(d)&&(Array.isArray(d)?d:[d]).forEach(f=>{const p=Dl(n,f);if(!p)return;const{transitionEnd:x,transition:g,...m}=p;for(const _ in m){let y=m[_];if(Array.isArray(y)){const b=u?y.length-1:0;y=y[b]}y!==null&&(s[_]=y)}for(const _ in x)s[_]=x[_]}),s}const Et=n=>n;class pc{constructor(){this.order=[],this.scheduled=new Set}add(e){if(!this.scheduled.has(e))return this.scheduled.add(e),this.order.push(e),!0}remove(e){const t=this.order.indexOf(e);t!==-1&&(this.order.splice(t,1),this.scheduled.delete(e))}clear(){this.order.length=0,this.scheduled.clear()}}function Rp(n){let e=new pc,t=new pc,i=0,s=!1,r=!1;const a=new WeakSet,o={schedule:(l,c=!1,u=!1)=>{const d=u&&s,h=d?e:t;return c&&a.add(l),h.add(l)&&d&&s&&(i=e.order.length),l},cancel:l=>{t.remove(l),a.delete(l)},process:l=>{if(s){r=!0;return}if(s=!0,[e,t]=[t,e],t.clear(),i=e.order.length,i)for(let c=0;c<i;c++){const u=e.order[c];u(l),a.has(u)&&(o.schedule(u),n())}s=!1,r&&(r=!1,o.process(l))}};return o}const dr=["prepare","read","update","preRender","render","postRender"],Pp=40;function Dp(n,e){let t=!1,i=!0;const s={delta:0,timestamp:0,isProcessing:!1},r=dr.reduce((d,h)=>(d[h]=Rp(()=>t=!0),d),{}),a=d=>r[d].process(s),o=()=>{const d=performance.now();t=!1,s.delta=i?1e3/60:Math.max(Math.min(d-s.timestamp,Pp),1),s.timestamp=d,s.isProcessing=!0,dr.forEach(a),s.isProcessing=!1,t&&e&&(i=!1,n(o))},l=()=>{t=!0,i=!0,s.isProcessing||n(o)};return{schedule:dr.reduce((d,h)=>{const f=r[h];return d[h]=(p,x=!1,g=!1)=>(t||l(),f.schedule(p,x,g)),d},{}),cancel:d=>dr.forEach(h=>r[h].cancel(d)),state:s,steps:r}}const{schedule:xt,cancel:Kn,state:Ft,steps:ya}=Dp(typeof requestAnimationFrame<"u"?requestAnimationFrame:Et,!0),Lp={useVisualState:Id({scrapeMotionValuesFromProps:Dd,createRenderState:Ad,onMount:(n,e,{renderState:t,latestValues:i})=>{xt.read(()=>{try{t.dimensions=typeof e.getBBox=="function"?e.getBBox():e.getBoundingClientRect()}catch{t.dimensions={x:0,y:0,width:0,height:0}}}),xt.render(()=>{Cl(t,i,{enableHardwareAcceleration:!1},Rl(e.tagName),n.transformTemplate),Pd(e,t)})}})},Ip={useVisualState:Id({scrapeMotionValuesFromProps:Pl,createRenderState:Al})};function Np(n,{forwardMotionProps:e=!1},t,i){return{...Tl(n)?Lp:Ip,preloadedFeatures:t,useRender:Ep(e),createVisualElement:i,Component:n}}function Wn(n,e,t,i={passive:!0}){return n.addEventListener(e,t,i),()=>n.removeEventListener(e,t)}const Nd=n=>n.pointerType==="mouse"?typeof n.button!="number"||n.button<=0:n.isPrimary!==!1;function ua(n,e="page"){return{point:{x:n[e+"X"],y:n[e+"Y"]}}}const Up=n=>e=>Nd(e)&&n(e,ua(e));function Xn(n,e,t,i){return Wn(n,e,Up(t),i)}const Fp=(n,e)=>t=>e(n(t)),hi=(...n)=>n.reduce(Fp);function Ud(n){let e=null;return()=>{const t=()=>{e=null};return e===null?(e=n,t):!1}}const mc=Ud("dragHorizontal"),gc=Ud("dragVertical");function Fd(n){let e=!1;if(n==="y")e=gc();else if(n==="x")e=mc();else{const t=mc(),i=gc();t&&i?e=()=>{t(),i()}:(t&&t(),i&&i())}return e}function Od(){const n=Fd(!0);return n?(n(),!1):!0}class gi{constructor(e){this.isMounted=!1,this.node=e}update(){}}function xc(n,e){const t="pointer"+(e?"enter":"leave"),i="onHover"+(e?"Start":"End"),s=(r,a)=>{if(r.pointerType==="touch"||Od())return;const o=n.getProps();n.animationState&&o.whileHover&&n.animationState.setActive("whileHover",e),o[i]&&xt.update(()=>o[i](r,a))};return Xn(n.current,t,s,{passive:!n.getProps()[i]})}class Op extends gi{mount(){this.unmount=hi(xc(this.node,!0),xc(this.node,!1))}unmount(){}}class Bp extends gi{constructor(){super(...arguments),this.isActive=!1}onFocus(){let e=!1;try{e=this.node.current.matches(":focus-visible")}catch{e=!0}!e||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=hi(Wn(this.node.current,"focus",()=>this.onFocus()),Wn(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}const Bd=(n,e)=>e?n===e?!0:Bd(n,e.parentElement):!1;function Sa(n,e){if(!e)return;const t=new PointerEvent("pointer"+n);e(t,ua(t))}class Vp extends gi{constructor(){super(...arguments),this.removeStartListeners=Et,this.removeEndListeners=Et,this.removeAccessibleListeners=Et,this.startPointerPress=(e,t)=>{if(this.isPressing)return;this.removeEndListeners();const i=this.node.getProps(),r=Xn(window,"pointerup",(o,l)=>{if(!this.checkPressEnd())return;const{onTap:c,onTapCancel:u,globalTapTarget:d}=this.node.getProps();xt.update(()=>{!d&&!Bd(this.node.current,o.target)?u&&u(o,l):c&&c(o,l)})},{passive:!(i.onTap||i.onPointerUp)}),a=Xn(window,"pointercancel",(o,l)=>this.cancelPress(o,l),{passive:!(i.onTapCancel||i.onPointerCancel)});this.removeEndListeners=hi(r,a),this.startPress(e,t)},this.startAccessiblePress=()=>{const e=r=>{if(r.key!=="Enter"||this.isPressing)return;const a=o=>{o.key!=="Enter"||!this.checkPressEnd()||Sa("up",(l,c)=>{const{onTap:u}=this.node.getProps();u&&xt.update(()=>u(l,c))})};this.removeEndListeners(),this.removeEndListeners=Wn(this.node.current,"keyup",a),Sa("down",(o,l)=>{this.startPress(o,l)})},t=Wn(this.node.current,"keydown",e),i=()=>{this.isPressing&&Sa("cancel",(r,a)=>this.cancelPress(r,a))},s=Wn(this.node.current,"blur",i);this.removeAccessibleListeners=hi(t,s)}}startPress(e,t){this.isPressing=!0;const{onTapStart:i,whileTap:s}=this.node.getProps();s&&this.node.animationState&&this.node.animationState.setActive("whileTap",!0),i&&xt.update(()=>i(e,t))}checkPressEnd(){return this.removeEndListeners(),this.isPressing=!1,this.node.getProps().whileTap&&this.node.animationState&&this.node.animationState.setActive("whileTap",!1),!Od()}cancelPress(e,t){if(!this.checkPressEnd())return;const{onTapCancel:i}=this.node.getProps();i&&xt.update(()=>i(e,t))}mount(){const e=this.node.getProps(),t=Xn(e.globalTapTarget?window:this.node.current,"pointerdown",this.startPointerPress,{passive:!(e.onTapStart||e.onPointerStart)}),i=Wn(this.node.current,"focus",this.startAccessiblePress);this.removeStartListeners=hi(t,i)}unmount(){this.removeStartListeners(),this.removeEndListeners(),this.removeAccessibleListeners()}}const ho=new WeakMap,Ma=new WeakMap,kp=n=>{const e=ho.get(n.target);e&&e(n)},zp=n=>{n.forEach(kp)};function Gp({root:n,...e}){const t=n||document;Ma.has(t)||Ma.set(t,{});const i=Ma.get(t),s=JSON.stringify(e);return i[s]||(i[s]=new IntersectionObserver(zp,{root:n,...e})),i[s]}function Hp(n,e,t){const i=Gp(e);return ho.set(n,t),i.observe(n),()=>{ho.delete(n),i.unobserve(n)}}const Wp={some:0,all:1};class jp extends gi{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:e={}}=this.node.getProps(),{root:t,margin:i,amount:s="some",once:r}=e,a={root:t?t.current:void 0,rootMargin:i,threshold:typeof s=="number"?s:Wp[s]},o=l=>{const{isIntersecting:c}=l;if(this.isInView===c||(this.isInView=c,r&&!c&&this.hasEnteredView))return;c&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",c);const{onViewportEnter:u,onViewportLeave:d}=this.node.getProps(),h=c?u:d;h&&h(l)};return Hp(this.node.current,a,o)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:e,prevProps:t}=this.node;["amount","margin","root"].some(Xp(e,t))&&this.startObserver()}unmount(){}}function Xp({viewport:n={}},{viewport:e={}}={}){return t=>n[t]!==e[t]}const qp={inView:{Feature:jp},tap:{Feature:Vp},focus:{Feature:Bp},hover:{Feature:Op}};function Vd(n,e){if(!Array.isArray(e))return!1;const t=e.length;if(t!==n.length)return!1;for(let i=0;i<t;i++)if(e[i]!==n[i])return!1;return!0}function Yp(n){const e={};return n.values.forEach((t,i)=>e[i]=t.get()),e}function $p(n){const e={};return n.values.forEach((t,i)=>e[i]=t.getVelocity()),e}function da(n,e,t){const i=n.getProps();return Dl(i,e,t!==void 0?t:i.custom,Yp(n),$p(n))}let Ll=Et;const ki=n=>n*1e3,qn=n=>n/1e3,Kp={current:!1},kd=n=>Array.isArray(n)&&typeof n[0]=="number";function zd(n){return!!(!n||typeof n=="string"&&Gd[n]||kd(n)||Array.isArray(n)&&n.every(zd))}const Fs=([n,e,t,i])=>`cubic-bezier(${n}, ${e}, ${t}, ${i})`,Gd={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Fs([0,.65,.55,1]),circOut:Fs([.55,0,1,.45]),backIn:Fs([.31,.01,.66,-.59]),backOut:Fs([.33,1.53,.69,.99])};function Hd(n){if(n)return kd(n)?Fs(n):Array.isArray(n)?n.map(Hd):Gd[n]}function Zp(n,e,t,{delay:i=0,duration:s,repeat:r=0,repeatType:a="loop",ease:o,times:l}={}){const c={[e]:t};l&&(c.offset=l);const u=Hd(o);return Array.isArray(u)&&(c.easing=u),n.animate(c,{delay:i,duration:s,easing:Array.isArray(u)?"linear":u,fill:"both",iterations:r+1,direction:a==="reverse"?"alternate":"normal"})}function Jp(n,{repeat:e,repeatType:t="loop"}){const i=e&&t!=="loop"&&e%2===1?0:n.length-1;return n[i]}const Wd=(n,e,t)=>(((1-3*t+3*e)*n+(3*t-6*e))*n+3*e)*n,Qp=1e-7,em=12;function tm(n,e,t,i,s){let r,a,o=0;do a=e+(t-e)/2,r=Wd(a,i,s)-n,r>0?t=a:e=a;while(Math.abs(r)>Qp&&++o<em);return a}function nr(n,e,t,i){if(n===e&&t===i)return Et;const s=r=>tm(r,0,1,n,t);return r=>r===0||r===1?r:Wd(s(r),e,i)}const nm=nr(.42,0,1,1),im=nr(0,0,.58,1),jd=nr(.42,0,.58,1),sm=n=>Array.isArray(n)&&typeof n[0]!="number",Xd=n=>e=>e<=.5?n(2*e)/2:(2-n(2*(1-e)))/2,qd=n=>e=>1-n(1-e),Il=n=>1-Math.sin(Math.acos(n)),Yd=qd(Il),rm=Xd(Il),$d=nr(.33,1.53,.69,.99),Nl=qd($d),am=Xd(Nl),om=n=>(n*=2)<1?.5*Nl(n):.5*(2-Math.pow(2,-10*(n-1))),lm={linear:Et,easeIn:nm,easeInOut:jd,easeOut:im,circIn:Il,circInOut:rm,circOut:Yd,backIn:Nl,backInOut:am,backOut:$d,anticipate:om},_c=n=>{if(Array.isArray(n)){Ll(n.length===4);const[e,t,i,s]=n;return nr(e,t,i,s)}else if(typeof n=="string")return lm[n];return n},Ul=(n,e)=>t=>!!(er(t)&&up.test(t)&&t.startsWith(n)||e&&Object.prototype.hasOwnProperty.call(t,e)),Kd=(n,e,t)=>i=>{if(!er(i))return i;const[s,r,a,o]=i.match(ca);return{[n]:parseFloat(s),[e]:parseFloat(r),[t]:parseFloat(a),alpha:o!==void 0?parseFloat(o):1}},cm=n=>fi(0,255,n),ba={...Hi,transform:n=>Math.round(cm(n))},Oi={test:Ul("rgb","red"),parse:Kd("red","green","blue"),transform:({red:n,green:e,blue:t,alpha:i=1})=>"rgba("+ba.transform(n)+", "+ba.transform(e)+", "+ba.transform(t)+", "+ks(Vs.transform(i))+")"};function um(n){let e="",t="",i="",s="";return n.length>5?(e=n.substring(1,3),t=n.substring(3,5),i=n.substring(5,7),s=n.substring(7,9)):(e=n.substring(1,2),t=n.substring(2,3),i=n.substring(3,4),s=n.substring(4,5),e+=e,t+=t,i+=i,s+=s),{red:parseInt(e,16),green:parseInt(t,16),blue:parseInt(i,16),alpha:s?parseInt(s,16)/255:1}}const fo={test:Ul("#"),parse:um,transform:Oi.transform},os={test:Ul("hsl","hue"),parse:Kd("hue","saturation","lightness"),transform:({hue:n,saturation:e,lightness:t,alpha:i=1})=>"hsla("+Math.round(n)+", "+Nn.transform(ks(e))+", "+Nn.transform(ks(t))+", "+ks(Vs.transform(i))+")"},zt={test:n=>Oi.test(n)||fo.test(n)||os.test(n),parse:n=>Oi.test(n)?Oi.parse(n):os.test(n)?os.parse(n):fo.parse(n),transform:n=>er(n)?n:n.hasOwnProperty("red")?Oi.transform(n):os.transform(n)},vt=(n,e,t)=>-t*n+t*e+n;function Ea(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*(2/3-t)*6:n}function dm({hue:n,saturation:e,lightness:t,alpha:i}){n/=360,e/=100,t/=100;let s=0,r=0,a=0;if(!e)s=r=a=t;else{const o=t<.5?t*(1+e):t+e-t*e,l=2*t-o;s=Ea(l,o,n+1/3),r=Ea(l,o,n),a=Ea(l,o,n-1/3)}return{red:Math.round(s*255),green:Math.round(r*255),blue:Math.round(a*255),alpha:i}}const Ta=(n,e,t)=>{const i=n*n;return Math.sqrt(Math.max(0,t*(e*e-i)+i))},hm=[fo,Oi,os],fm=n=>hm.find(e=>e.test(n));function vc(n){const e=fm(n);let t=e.parse(n);return e===os&&(t=dm(t)),t}const Zd=(n,e)=>{const t=vc(n),i=vc(e),s={...t};return r=>(s.red=Ta(t.red,i.red,r),s.green=Ta(t.green,i.green,r),s.blue=Ta(t.blue,i.blue,r),s.alpha=vt(t.alpha,i.alpha,r),Oi.transform(s))};function pm(n){var e,t;return isNaN(n)&&er(n)&&(((e=n.match(ca))===null||e===void 0?void 0:e.length)||0)+(((t=n.match(bd))===null||t===void 0?void 0:t.length)||0)>0}const Jd={regex:lp,countKey:"Vars",token:"${v}",parse:Et},Qd={regex:bd,countKey:"Colors",token:"${c}",parse:zt.parse},eh={regex:ca,countKey:"Numbers",token:"${n}",parse:Hi.parse};function wa(n,{regex:e,countKey:t,token:i,parse:s}){const r=n.tokenised.match(e);r&&(n["num"+t]=r.length,n.tokenised=n.tokenised.replace(e,i),n.values.push(...r.map(s)))}function $r(n){const e=n.toString(),t={value:e,tokenised:e,values:[],numVars:0,numColors:0,numNumbers:0};return t.value.includes("var(--")&&wa(t,Jd),wa(t,Qd),wa(t,eh),t}function th(n){return $r(n).values}function nh(n){const{values:e,numColors:t,numVars:i,tokenised:s}=$r(n),r=e.length;return a=>{let o=s;for(let l=0;l<r;l++)l<i?o=o.replace(Jd.token,a[l]):l<i+t?o=o.replace(Qd.token,zt.transform(a[l])):o=o.replace(eh.token,ks(a[l]));return o}}const mm=n=>typeof n=="number"?0:n;function gm(n){const e=th(n);return nh(n)(e.map(mm))}const pi={test:pm,parse:th,createTransformer:nh,getAnimatableNone:gm},ih=(n,e)=>t=>`${t>0?e:n}`;function sh(n,e){return typeof n=="number"?t=>vt(n,e,t):zt.test(n)?Zd(n,e):n.startsWith("var(")?ih(n,e):ah(n,e)}const rh=(n,e)=>{const t=[...n],i=t.length,s=n.map((r,a)=>sh(r,e[a]));return r=>{for(let a=0;a<i;a++)t[a]=s[a](r);return t}},xm=(n,e)=>{const t={...n,...e},i={};for(const s in t)n[s]!==void 0&&e[s]!==void 0&&(i[s]=sh(n[s],e[s]));return s=>{for(const r in i)t[r]=i[r](s);return t}},ah=(n,e)=>{const t=pi.createTransformer(e),i=$r(n),s=$r(e);return i.numVars===s.numVars&&i.numColors===s.numColors&&i.numNumbers>=s.numNumbers?hi(rh(i.values,s.values),t):ih(n,e)},qs=(n,e,t)=>{const i=e-n;return i===0?1:(t-n)/i},yc=(n,e)=>t=>vt(n,e,t);function _m(n){return typeof n=="number"?yc:typeof n=="string"?zt.test(n)?Zd:ah:Array.isArray(n)?rh:typeof n=="object"?xm:yc}function vm(n,e,t){const i=[],s=t||_m(n[0]),r=n.length-1;for(let a=0;a<r;a++){let o=s(n[a],n[a+1]);if(e){const l=Array.isArray(e)?e[a]||Et:e;o=hi(l,o)}i.push(o)}return i}function oh(n,e,{clamp:t=!0,ease:i,mixer:s}={}){const r=n.length;if(Ll(r===e.length),r===1)return()=>e[0];n[0]>n[r-1]&&(n=[...n].reverse(),e=[...e].reverse());const a=vm(e,i,s),o=a.length,l=c=>{let u=0;if(o>1)for(;u<n.length-2&&!(c<n[u+1]);u++);const d=qs(n[u],n[u+1],c);return a[u](d)};return t?c=>l(fi(n[0],n[r-1],c)):l}function ym(n,e){const t=n[n.length-1];for(let i=1;i<=e;i++){const s=qs(0,e,i);n.push(vt(t,1,s))}}function Sm(n){const e=[0];return ym(e,n.length-1),e}function Mm(n,e){return n.map(t=>t*e)}function bm(n,e){return n.map(()=>e||jd).splice(0,n.length-1)}function Kr({duration:n=300,keyframes:e,times:t,ease:i="easeInOut"}){const s=sm(i)?i.map(_c):_c(i),r={done:!1,value:e[0]},a=Mm(t&&t.length===e.length?t:Sm(e),n),o=oh(a,e,{ease:Array.isArray(s)?s:bm(e,s)});return{calculatedDuration:n,next:l=>(r.value=o(l),r.done=l>=n,r)}}function lh(n,e){return e?n*(1e3/e):0}const Em=5;function ch(n,e,t){const i=Math.max(e-Em,0);return lh(t-n(i),e-i)}const Aa=.001,Tm=.01,wm=10,Am=.05,Cm=1;function Rm({duration:n=800,bounce:e=.25,velocity:t=0,mass:i=1}){let s,r,a=1-e;a=fi(Am,Cm,a),n=fi(Tm,wm,qn(n)),a<1?(s=c=>{const u=c*a,d=u*n,h=u-t,f=po(c,a),p=Math.exp(-d);return Aa-h/f*p},r=c=>{const d=c*a*n,h=d*t+t,f=Math.pow(a,2)*Math.pow(c,2)*n,p=Math.exp(-d),x=po(Math.pow(c,2),a);return(-s(c)+Aa>0?-1:1)*((h-f)*p)/x}):(s=c=>{const u=Math.exp(-c*n),d=(c-t)*n+1;return-Aa+u*d},r=c=>{const u=Math.exp(-c*n),d=(t-c)*(n*n);return u*d});const o=5/n,l=Dm(s,r,o);if(n=ki(n),isNaN(l))return{stiffness:100,damping:10,duration:n};{const c=Math.pow(l,2)*i;return{stiffness:c,damping:a*2*Math.sqrt(i*c),duration:n}}}const Pm=12;function Dm(n,e,t){let i=t;for(let s=1;s<Pm;s++)i=i-n(i)/e(i);return i}function po(n,e){return n*Math.sqrt(1-e*e)}const Lm=["duration","bounce"],Im=["stiffness","damping","mass"];function Sc(n,e){return e.some(t=>n[t]!==void 0)}function Nm(n){let e={velocity:0,stiffness:100,damping:10,mass:1,isResolvedFromDuration:!1,...n};if(!Sc(n,Im)&&Sc(n,Lm)){const t=Rm(n);e={...e,...t,mass:1},e.isResolvedFromDuration=!0}return e}function uh({keyframes:n,restDelta:e,restSpeed:t,...i}){const s=n[0],r=n[n.length-1],a={done:!1,value:s},{stiffness:o,damping:l,mass:c,duration:u,velocity:d,isResolvedFromDuration:h}=Nm({...i,velocity:-qn(i.velocity||0)}),f=d||0,p=l/(2*Math.sqrt(o*c)),x=r-s,g=qn(Math.sqrt(o/c)),m=Math.abs(x)<5;t||(t=m?.01:2),e||(e=m?.005:.5);let _;if(p<1){const y=po(g,p);_=b=>{const w=Math.exp(-p*g*b);return r-w*((f+p*g*x)/y*Math.sin(y*b)+x*Math.cos(y*b))}}else if(p===1)_=y=>r-Math.exp(-g*y)*(x+(f+g*x)*y);else{const y=g*Math.sqrt(p*p-1);_=b=>{const w=Math.exp(-p*g*b),A=Math.min(y*b,300);return r-w*((f+p*g*x)*Math.sinh(A)+y*x*Math.cosh(A))/y}}return{calculatedDuration:h&&u||null,next:y=>{const b=_(y);if(h)a.done=y>=u;else{let w=f;y!==0&&(p<1?w=ch(_,y,b):w=0);const A=Math.abs(w)<=t,R=Math.abs(r-b)<=e;a.done=A&&R}return a.value=a.done?r:b,a}}}function Mc({keyframes:n,velocity:e=0,power:t=.8,timeConstant:i=325,bounceDamping:s=10,bounceStiffness:r=500,modifyTarget:a,min:o,max:l,restDelta:c=.5,restSpeed:u}){const d=n[0],h={done:!1,value:d},f=L=>o!==void 0&&L<o||l!==void 0&&L>l,p=L=>o===void 0?l:l===void 0||Math.abs(o-L)<Math.abs(l-L)?o:l;let x=t*e;const g=d+x,m=a===void 0?g:a(g);m!==g&&(x=m-d);const _=L=>-x*Math.exp(-L/i),y=L=>m+_(L),b=L=>{const M=_(L),E=y(L);h.done=Math.abs(M)<=c,h.value=h.done?m:E};let w,A;const R=L=>{f(h.value)&&(w=L,A=uh({keyframes:[h.value,p(h.value)],velocity:ch(y,L,h.value),damping:s,stiffness:r,restDelta:c,restSpeed:u}))};return R(0),{calculatedDuration:null,next:L=>{let M=!1;return!A&&w===void 0&&(M=!0,b(L),R(L)),w!==void 0&&L>w?A.next(L-w):(!M&&b(L),h)}}}const Um=n=>{const e=({timestamp:t})=>n(t);return{start:()=>xt.update(e,!0),stop:()=>Kn(e),now:()=>Ft.isProcessing?Ft.timestamp:performance.now()}},bc=2e4;function Ec(n){let e=0;const t=50;let i=n.next(e);for(;!i.done&&e<bc;)e+=t,i=n.next(e);return e>=bc?1/0:e}const Fm={decay:Mc,inertia:Mc,tween:Kr,keyframes:Kr,spring:uh};function Zr({autoplay:n=!0,delay:e=0,driver:t=Um,keyframes:i,type:s="keyframes",repeat:r=0,repeatDelay:a=0,repeatType:o="loop",onPlay:l,onStop:c,onComplete:u,onUpdate:d,...h}){let f=1,p=!1,x,g;const m=()=>{g=new Promise(te=>{x=te})};m();let _;const y=Fm[s]||Kr;let b;y!==Kr&&typeof i[0]!="number"&&(b=oh([0,100],i,{clamp:!1}),i=[0,100]);const w=y({...h,keyframes:i});let A;o==="mirror"&&(A=y({...h,keyframes:[...i].reverse(),velocity:-(h.velocity||0)}));let R="idle",L=null,M=null,E=null;w.calculatedDuration===null&&r&&(w.calculatedDuration=Ec(w));const{calculatedDuration:D}=w;let F=1/0,O=1/0;D!==null&&(F=D+a,O=F*(r+1)-a);let G=0;const q=te=>{if(M===null)return;f>0&&(M=Math.min(M,te)),f<0&&(M=Math.min(te-O/f,M)),L!==null?G=L:G=Math.round(te-M)*f;const Pe=G-e*(f>=0?1:-1),De=f>=0?Pe<0:Pe>O;G=Math.max(Pe,0),R==="finished"&&L===null&&(G=O);let Qe=G,it=w;if(r){const Oe=Math.min(G,O)/F;let pe=Math.floor(Oe),le=Oe%1;!le&&Oe>=1&&(le=1),le===1&&pe--,pe=Math.min(pe,r+1),!!(pe%2)&&(o==="reverse"?(le=1-le,a&&(le-=a/F)):o==="mirror"&&(it=A)),Qe=fi(0,1,le)*F}const $=De?{done:!1,value:i[0]}:it.next(Qe);b&&($.value=b($.value));let{done:ne}=$;!De&&D!==null&&(ne=f>=0?G>=O:G<=0);const _e=L===null&&(R==="finished"||R==="running"&&ne);return d&&d($.value),_e&&Z(),$},k=()=>{_&&_.stop(),_=void 0},X=()=>{R="idle",k(),x(),m(),M=E=null},Z=()=>{R="finished",u&&u(),k(),x()},ce=()=>{if(p)return;_||(_=t(q));const te=_.now();l&&l(),L!==null?M=te-L:(!M||R==="finished")&&(M=te),R==="finished"&&m(),E=M,L=null,R="running",_.start()};n&&ce();const ue={then(te,Pe){return g.then(te,Pe)},get time(){return qn(G)},set time(te){te=ki(te),G=te,L!==null||!_||f===0?L=te:M=_.now()-te/f},get duration(){const te=w.calculatedDuration===null?Ec(w):w.calculatedDuration;return qn(te)},get speed(){return f},set speed(te){te===f||!_||(f=te,ue.time=qn(G))},get state(){return R},play:ce,pause:()=>{R="paused",L=G},stop:()=>{p=!0,R!=="idle"&&(R="idle",c&&c(),X())},cancel:()=>{E!==null&&q(E),X()},complete:()=>{R="finished"},sample:te=>(M=0,q(te))};return ue}function Om(n){let e;return()=>(e===void 0&&(e=n()),e)}const Bm=Om(()=>Object.hasOwnProperty.call(Element.prototype,"animate")),Vm=new Set(["opacity","clipPath","filter","transform","backgroundColor"]),hr=10,km=2e4,zm=(n,e)=>e.type==="spring"||n==="backgroundColor"||!zd(e.ease);function Gm(n,e,{onUpdate:t,onComplete:i,...s}){if(!(Bm()&&Vm.has(e)&&!s.repeatDelay&&s.repeatType!=="mirror"&&s.damping!==0&&s.type!=="inertia"))return!1;let a=!1,o,l,c=!1;const u=()=>{l=new Promise(y=>{o=y})};u();let{keyframes:d,duration:h=300,ease:f,times:p}=s;if(zm(e,s)){const y=Zr({...s,repeat:0,delay:0});let b={done:!1,value:d[0]};const w=[];let A=0;for(;!b.done&&A<km;)b=y.sample(A),w.push(b.value),A+=hr;p=void 0,d=w,h=A-hr,f="linear"}const x=Zp(n.owner.current,e,d,{...s,duration:h,ease:f,times:p}),g=()=>{c=!1,x.cancel()},m=()=>{c=!0,xt.update(g),o(),u()};return x.onfinish=()=>{c||(n.set(Jp(d,s)),i&&i(),m())},{then(y,b){return l.then(y,b)},attachTimeline(y){return x.timeline=y,x.onfinish=null,Et},get time(){return qn(x.currentTime||0)},set time(y){x.currentTime=ki(y)},get speed(){return x.playbackRate},set speed(y){x.playbackRate=y},get duration(){return qn(h)},play:()=>{a||(x.play(),Kn(g))},pause:()=>x.pause(),stop:()=>{if(a=!0,x.playState==="idle")return;const{currentTime:y}=x;if(y){const b=Zr({...s,autoplay:!1});n.setWithVelocity(b.sample(y-hr).value,b.sample(y).value,hr)}m()},complete:()=>{c||x.finish()},cancel:m}}function Hm({keyframes:n,delay:e,onUpdate:t,onComplete:i}){const s=()=>(t&&t(n[n.length-1]),i&&i(),{time:0,speed:1,duration:0,play:Et,pause:Et,stop:Et,then:r=>(r(),Promise.resolve()),cancel:Et,complete:Et});return e?Zr({keyframes:[0,1],duration:0,delay:e,onComplete:s}):s()}const Wm={type:"spring",stiffness:500,damping:25,restSpeed:10},jm=n=>({type:"spring",stiffness:550,damping:n===0?2*Math.sqrt(550):30,restSpeed:10}),Xm={type:"keyframes",duration:.8},qm={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},Ym=(n,{keyframes:e})=>e.length>2?Xm:Gi.has(n)?n.startsWith("scale")?jm(e[1]):Wm:qm,mo=(n,e)=>n==="zIndex"?!1:!!(typeof e=="number"||Array.isArray(e)||typeof e=="string"&&(pi.test(e)||e==="0")&&!e.startsWith("url(")),$m=new Set(["brightness","contrast","saturate","opacity"]);function Km(n){const[e,t]=n.slice(0,-1).split("(");if(e==="drop-shadow")return n;const[i]=t.match(ca)||[];if(!i)return n;const s=t.replace(i,"");let r=$m.has(e)?1:0;return i!==t&&(r*=100),e+"("+r+s+")"}const Zm=/([a-z-]*)\(.*?\)/g,go={...pi,getAnimatableNone:n=>{const e=n.match(Zm);return e?e.map(Km).join(" "):n}},Jm={...Ed,color:zt,backgroundColor:zt,outlineColor:zt,fill:zt,stroke:zt,borderColor:zt,borderTopColor:zt,borderRightColor:zt,borderBottomColor:zt,borderLeftColor:zt,filter:go,WebkitFilter:go},Fl=n=>Jm[n];function dh(n,e){let t=Fl(n);return t!==go&&(t=pi),t.getAnimatableNone?t.getAnimatableNone(e):void 0}const hh=n=>/^0[^.\s]+$/.test(n);function Qm(n){if(typeof n=="number")return n===0;if(n!==null)return n==="none"||n==="0"||hh(n)}function eg(n,e,t,i){const s=mo(e,t);let r;Array.isArray(t)?r=[...t]:r=[null,t];const a=i.from!==void 0?i.from:n.get();let o;const l=[];for(let c=0;c<r.length;c++)r[c]===null&&(r[c]=c===0?a:r[c-1]),Qm(r[c])&&l.push(c),typeof r[c]=="string"&&r[c]!=="none"&&r[c]!=="0"&&(o=r[c]);if(s&&l.length&&o)for(let c=0;c<l.length;c++){const u=l[c];r[u]=dh(e,o)}return r}function tg({when:n,delay:e,delayChildren:t,staggerChildren:i,staggerDirection:s,repeat:r,repeatType:a,repeatDelay:o,from:l,elapsed:c,...u}){return!!Object.keys(u).length}function Ol(n,e){return n[e]||n.default||n}const ng={skipAnimations:!1},Bl=(n,e,t,i={})=>s=>{const r=Ol(i,n)||{},a=r.delay||i.delay||0;let{elapsed:o=0}=i;o=o-ki(a);const l=eg(e,n,t,r),c=l[0],u=l[l.length-1],d=mo(n,c),h=mo(n,u);let f={keyframes:l,velocity:e.getVelocity(),ease:"easeOut",...r,delay:-o,onUpdate:p=>{e.set(p),r.onUpdate&&r.onUpdate(p)},onComplete:()=>{s(),r.onComplete&&r.onComplete()}};if(tg(r)||(f={...f,...Ym(n,f)}),f.duration&&(f.duration=ki(f.duration)),f.repeatDelay&&(f.repeatDelay=ki(f.repeatDelay)),!d||!h||Kp.current||r.type===!1||ng.skipAnimations)return Hm(f);if(!i.isHandoff&&e.owner&&e.owner.current instanceof HTMLElement&&!e.owner.getProps().onUpdate){const p=Gm(e,n,f);if(p)return p}return Zr(f)};function Jr(n){return!!($t(n)&&n.add)}const fh=n=>/^\-?\d*\.?\d+$/.test(n);function Vl(n,e){n.indexOf(e)===-1&&n.push(e)}function kl(n,e){const t=n.indexOf(e);t>-1&&n.splice(t,1)}class zl{constructor(){this.subscriptions=[]}add(e){return Vl(this.subscriptions,e),()=>kl(this.subscriptions,e)}notify(e,t,i){const s=this.subscriptions.length;if(s)if(s===1)this.subscriptions[0](e,t,i);else for(let r=0;r<s;r++){const a=this.subscriptions[r];a&&a(e,t,i)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const ig=n=>!isNaN(parseFloat(n));class sg{constructor(e,t={}){this.version="10.18.0",this.timeDelta=0,this.lastUpdated=0,this.canTrackVelocity=!1,this.events={},this.updateAndNotify=(i,s=!0)=>{this.prev=this.current,this.current=i;const{delta:r,timestamp:a}=Ft;this.lastUpdated!==a&&(this.timeDelta=r,this.lastUpdated=a,xt.postRender(this.scheduleVelocityCheck)),this.prev!==this.current&&this.events.change&&this.events.change.notify(this.current),this.events.velocityChange&&this.events.velocityChange.notify(this.getVelocity()),s&&this.events.renderRequest&&this.events.renderRequest.notify(this.current)},this.scheduleVelocityCheck=()=>xt.postRender(this.velocityCheck),this.velocityCheck=({timestamp:i})=>{i!==this.lastUpdated&&(this.prev=this.current,this.events.velocityChange&&this.events.velocityChange.notify(this.getVelocity()))},this.hasAnimated=!1,this.prev=this.current=e,this.canTrackVelocity=ig(this.current),this.owner=t.owner}onChange(e){return this.on("change",e)}on(e,t){this.events[e]||(this.events[e]=new zl);const i=this.events[e].add(t);return e==="change"?()=>{i(),xt.read(()=>{this.events.change.getSize()||this.stop()})}:i}clearListeners(){for(const e in this.events)this.events[e].clear()}attach(e,t){this.passiveEffect=e,this.stopPassiveEffect=t}set(e,t=!0){!t||!this.passiveEffect?this.updateAndNotify(e,t):this.passiveEffect(e,this.updateAndNotify)}setWithVelocity(e,t,i){this.set(t),this.prev=e,this.timeDelta=i}jump(e){this.updateAndNotify(e),this.prev=e,this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}get(){return this.current}getPrevious(){return this.prev}getVelocity(){return this.canTrackVelocity?lh(parseFloat(this.current)-parseFloat(this.prev),this.timeDelta):0}start(e){return this.stop(),new Promise(t=>{this.hasAnimated=!0,this.animation=e(t),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function ms(n,e){return new sg(n,e)}const ph=n=>e=>e.test(n),rg={test:n=>n==="auto",parse:n=>n},mh=[Hi,Ve,Nn,li,hp,dp,rg],As=n=>mh.find(ph(n)),ag=[...mh,zt,pi],og=n=>ag.find(ph(n));function lg(n,e,t){n.hasValue(e)?n.getValue(e).set(t):n.addValue(e,ms(t))}function cg(n,e){const t=da(n,e);let{transitionEnd:i={},transition:s={},...r}=t?n.makeTargetAnimatable(t,!1):{};r={...r,...i};for(const a in r){const o=wp(r[a]);lg(n,a,o)}}function ug(n,e,t){var i,s;const r=Object.keys(e).filter(o=>!n.hasValue(o)),a=r.length;if(a)for(let o=0;o<a;o++){const l=r[o],c=e[l];let u=null;Array.isArray(c)&&(u=c[0]),u===null&&(u=(s=(i=t[l])!==null&&i!==void 0?i:n.readValue(l))!==null&&s!==void 0?s:e[l]),u!=null&&(typeof u=="string"&&(fh(u)||hh(u))?u=parseFloat(u):!og(u)&&pi.test(c)&&(u=dh(l,c)),n.addValue(l,ms(u,{owner:n})),t[l]===void 0&&(t[l]=u),u!==null&&n.setBaseTarget(l,u))}}function dg(n,e){return e?(e[n]||e.default||e).from:void 0}function hg(n,e,t){const i={};for(const s in n){const r=dg(s,e);if(r!==void 0)i[s]=r;else{const a=t.getValue(s);a&&(i[s]=a.get())}}return i}function fg({protectedKeys:n,needsAnimating:e},t){const i=n.hasOwnProperty(t)&&e[t]!==!0;return e[t]=!1,i}function pg(n,e){const t=n.get();if(Array.isArray(e)){for(let i=0;i<e.length;i++)if(e[i]!==t)return!0}else return t!==e}function gh(n,e,{delay:t=0,transitionOverride:i,type:s}={}){let{transition:r=n.getDefaultTransition(),transitionEnd:a,...o}=n.makeTargetAnimatable(e);const l=n.getValue("willChange");i&&(r=i);const c=[],u=s&&n.animationState&&n.animationState.getState()[s];for(const d in o){const h=n.getValue(d),f=o[d];if(!h||f===void 0||u&&fg(u,d))continue;const p={delay:t,elapsed:0,...Ol(r||{},d)};if(window.HandoffAppearAnimations){const m=n.getProps()[xd];if(m){const _=window.HandoffAppearAnimations(m,d,h,xt);_!==null&&(p.elapsed=_,p.isHandoff=!0)}}let x=!p.isHandoff&&!pg(h,f);if(p.type==="spring"&&(h.getVelocity()||p.velocity)&&(x=!1),h.animation&&(x=!1),x)continue;h.start(Bl(d,h,f,n.shouldReduceMotion&&Gi.has(d)?{type:!1}:p));const g=h.animation;Jr(l)&&(l.add(d),g.then(()=>l.remove(d))),c.push(g)}return a&&Promise.all(c).then(()=>{a&&cg(n,a)}),c}function xo(n,e,t={}){const i=da(n,e,t.custom);let{transition:s=n.getDefaultTransition()||{}}=i||{};t.transitionOverride&&(s=t.transitionOverride);const r=i?()=>Promise.all(gh(n,i,t)):()=>Promise.resolve(),a=n.variantChildren&&n.variantChildren.size?(l=0)=>{const{delayChildren:c=0,staggerChildren:u,staggerDirection:d}=s;return mg(n,e,c+l,u,d,t)}:()=>Promise.resolve(),{when:o}=s;if(o){const[l,c]=o==="beforeChildren"?[r,a]:[a,r];return l().then(()=>c())}else return Promise.all([r(),a(t.delay)])}function mg(n,e,t=0,i=0,s=1,r){const a=[],o=(n.variantChildren.size-1)*i,l=s===1?(c=0)=>c*i:(c=0)=>o-c*i;return Array.from(n.variantChildren).sort(gg).forEach((c,u)=>{c.notify("AnimationStart",e),a.push(xo(c,e,{...r,delay:t+l(u)}).then(()=>c.notify("AnimationComplete",e)))}),Promise.all(a)}function gg(n,e){return n.sortNodePosition(e)}function xg(n,e,t={}){n.notify("AnimationStart",e);let i;if(Array.isArray(e)){const s=e.map(r=>xo(n,r,t));i=Promise.all(s)}else if(typeof e=="string")i=xo(n,e,t);else{const s=typeof e=="function"?da(n,e,t.custom):e;i=Promise.all(gh(n,s,t))}return i.then(()=>n.notify("AnimationComplete",e))}const _g=[...Ml].reverse(),vg=Ml.length;function yg(n){return e=>Promise.all(e.map(({animation:t,options:i})=>xg(n,t,i)))}function Sg(n){let e=yg(n);const t=bg();let i=!0;const s=(l,c)=>{const u=da(n,c);if(u){const{transition:d,transitionEnd:h,...f}=u;l={...l,...f,...h}}return l};function r(l){e=l(n)}function a(l,c){const u=n.getProps(),d=n.getVariantContext(!0)||{},h=[],f=new Set;let p={},x=1/0;for(let m=0;m<vg;m++){const _=_g[m],y=t[_],b=u[_]!==void 0?u[_]:d[_],w=js(b),A=_===c?y.isActive:null;A===!1&&(x=m);let R=b===d[_]&&b!==u[_]&&w;if(R&&i&&n.manuallyAnimateOnMount&&(R=!1),y.protectedKeys={...p},!y.isActive&&A===null||!b&&!y.prevProp||oa(b)||typeof b=="boolean")continue;let M=Mg(y.prevProp,b)||_===c&&y.isActive&&!R&&w||m>x&&w,E=!1;const D=Array.isArray(b)?b:[b];let F=D.reduce(s,{});A===!1&&(F={});const{prevResolvedValues:O={}}=y,G={...O,...F},q=k=>{M=!0,f.has(k)&&(E=!0,f.delete(k)),y.needsAnimating[k]=!0};for(const k in G){const X=F[k],Z=O[k];if(p.hasOwnProperty(k))continue;let ce=!1;Yr(X)&&Yr(Z)?ce=!Vd(X,Z):ce=X!==Z,ce?X!==void 0?q(k):f.add(k):X!==void 0&&f.has(k)?q(k):y.protectedKeys[k]=!0}y.prevProp=b,y.prevResolvedValues=F,y.isActive&&(p={...p,...F}),i&&n.blockInitialAnimation&&(M=!1),M&&(!R||E)&&h.push(...D.map(k=>({animation:k,options:{type:_,...l}})))}if(f.size){const m={};f.forEach(_=>{const y=n.getBaseTarget(_);y!==void 0&&(m[_]=y)}),h.push({animation:m})}let g=!!h.length;return i&&(u.initial===!1||u.initial===u.animate)&&!n.manuallyAnimateOnMount&&(g=!1),i=!1,g?e(h):Promise.resolve()}function o(l,c,u){var d;if(t[l].isActive===c)return Promise.resolve();(d=n.variantChildren)===null||d===void 0||d.forEach(f=>{var p;return(p=f.animationState)===null||p===void 0?void 0:p.setActive(l,c)}),t[l].isActive=c;const h=a(u,l);for(const f in t)t[f].protectedKeys={};return h}return{animateChanges:a,setActive:o,setAnimateFunction:r,getState:()=>t}}function Mg(n,e){return typeof e=="string"?e!==n:Array.isArray(e)?!Vd(e,n):!1}function yi(n=!1){return{isActive:n,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function bg(){return{animate:yi(!0),whileInView:yi(),whileHover:yi(),whileTap:yi(),whileDrag:yi(),whileFocus:yi(),exit:yi()}}class Eg extends gi{constructor(e){super(e),e.animationState||(e.animationState=Sg(e))}updateAnimationControlsSubscription(){const{animate:e}=this.node.getProps();this.unmount(),oa(e)&&(this.unmount=e.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:e}=this.node.getProps(),{animate:t}=this.node.prevProps||{};e!==t&&this.updateAnimationControlsSubscription()}unmount(){}}let Tg=0;class wg extends gi{constructor(){super(...arguments),this.id=Tg++}update(){if(!this.node.presenceContext)return;const{isPresent:e,onExitComplete:t,custom:i}=this.node.presenceContext,{isPresent:s}=this.node.prevPresenceContext||{};if(!this.node.animationState||e===s)return;const r=this.node.animationState.setActive("exit",!e,{custom:i??this.node.getProps().custom});t&&!e&&r.then(()=>t(this.id))}mount(){const{register:e}=this.node.presenceContext||{};e&&(this.unmount=e(this.id))}unmount(){}}const Ag={animation:{Feature:Eg},exit:{Feature:wg}},Tc=(n,e)=>Math.abs(n-e);function Cg(n,e){const t=Tc(n.x,e.x),i=Tc(n.y,e.y);return Math.sqrt(t**2+i**2)}class xh{constructor(e,t,{transformPagePoint:i,contextWindow:s,dragSnapToOrigin:r=!1}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const d=Ra(this.lastMoveEventInfo,this.history),h=this.startEvent!==null,f=Cg(d.offset,{x:0,y:0})>=3;if(!h&&!f)return;const{point:p}=d,{timestamp:x}=Ft;this.history.push({...p,timestamp:x});const{onStart:g,onMove:m}=this.handlers;h||(g&&g(this.lastMoveEvent,d),this.startEvent=this.lastMoveEvent),m&&m(this.lastMoveEvent,d)},this.handlePointerMove=(d,h)=>{this.lastMoveEvent=d,this.lastMoveEventInfo=Ca(h,this.transformPagePoint),xt.update(this.updatePoint,!0)},this.handlePointerUp=(d,h)=>{this.end();const{onEnd:f,onSessionEnd:p,resumeAnimation:x}=this.handlers;if(this.dragSnapToOrigin&&x&&x(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const g=Ra(d.type==="pointercancel"?this.lastMoveEventInfo:Ca(h,this.transformPagePoint),this.history);this.startEvent&&f&&f(d,g),p&&p(d,g)},!Nd(e))return;this.dragSnapToOrigin=r,this.handlers=t,this.transformPagePoint=i,this.contextWindow=s||window;const a=ua(e),o=Ca(a,this.transformPagePoint),{point:l}=o,{timestamp:c}=Ft;this.history=[{...l,timestamp:c}];const{onSessionStart:u}=t;u&&u(e,Ra(o,this.history)),this.removeListeners=hi(Xn(this.contextWindow,"pointermove",this.handlePointerMove),Xn(this.contextWindow,"pointerup",this.handlePointerUp),Xn(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(e){this.handlers=e}end(){this.removeListeners&&this.removeListeners(),Kn(this.updatePoint)}}function Ca(n,e){return e?{point:e(n.point)}:n}function wc(n,e){return{x:n.x-e.x,y:n.y-e.y}}function Ra({point:n},e){return{point:n,delta:wc(n,_h(e)),offset:wc(n,Rg(e)),velocity:Pg(e,.1)}}function Rg(n){return n[0]}function _h(n){return n[n.length-1]}function Pg(n,e){if(n.length<2)return{x:0,y:0};let t=n.length-1,i=null;const s=_h(n);for(;t>=0&&(i=n[t],!(s.timestamp-i.timestamp>ki(e)));)t--;if(!i)return{x:0,y:0};const r=qn(s.timestamp-i.timestamp);if(r===0)return{x:0,y:0};const a={x:(s.x-i.x)/r,y:(s.y-i.y)/r};return a.x===1/0&&(a.x=0),a.y===1/0&&(a.y=0),a}function on(n){return n.max-n.min}function _o(n,e=0,t=.01){return Math.abs(n-e)<=t}function Ac(n,e,t,i=.5){n.origin=i,n.originPoint=vt(e.min,e.max,n.origin),n.scale=on(t)/on(e),(_o(n.scale,1,1e-4)||isNaN(n.scale))&&(n.scale=1),n.translate=vt(t.min,t.max,n.origin)-n.originPoint,(_o(n.translate)||isNaN(n.translate))&&(n.translate=0)}function zs(n,e,t,i){Ac(n.x,e.x,t.x,i?i.originX:void 0),Ac(n.y,e.y,t.y,i?i.originY:void 0)}function Cc(n,e,t){n.min=t.min+e.min,n.max=n.min+on(e)}function Dg(n,e,t){Cc(n.x,e.x,t.x),Cc(n.y,e.y,t.y)}function Rc(n,e,t){n.min=e.min-t.min,n.max=n.min+on(e)}function Gs(n,e,t){Rc(n.x,e.x,t.x),Rc(n.y,e.y,t.y)}function Lg(n,{min:e,max:t},i){return e!==void 0&&n<e?n=i?vt(e,n,i.min):Math.max(n,e):t!==void 0&&n>t&&(n=i?vt(t,n,i.max):Math.min(n,t)),n}function Pc(n,e,t){return{min:e!==void 0?n.min+e:void 0,max:t!==void 0?n.max+t-(n.max-n.min):void 0}}function Ig(n,{top:e,left:t,bottom:i,right:s}){return{x:Pc(n.x,t,s),y:Pc(n.y,e,i)}}function Dc(n,e){let t=e.min-n.min,i=e.max-n.max;return e.max-e.min<n.max-n.min&&([t,i]=[i,t]),{min:t,max:i}}function Ng(n,e){return{x:Dc(n.x,e.x),y:Dc(n.y,e.y)}}function Ug(n,e){let t=.5;const i=on(n),s=on(e);return s>i?t=qs(e.min,e.max-i,n.min):i>s&&(t=qs(n.min,n.max-s,e.min)),fi(0,1,t)}function Fg(n,e){const t={};return e.min!==void 0&&(t.min=e.min-n.min),e.max!==void 0&&(t.max=e.max-n.min),t}const vo=.35;function Og(n=vo){return n===!1?n=0:n===!0&&(n=vo),{x:Lc(n,"left","right"),y:Lc(n,"top","bottom")}}function Lc(n,e,t){return{min:Ic(n,e),max:Ic(n,t)}}function Ic(n,e){return typeof n=="number"?n:n[e]||0}const Nc=()=>({translate:0,scale:1,origin:0,originPoint:0}),ls=()=>({x:Nc(),y:Nc()}),Uc=()=>({min:0,max:0}),wt=()=>({x:Uc(),y:Uc()});function mn(n){return[n("x"),n("y")]}function vh({top:n,left:e,right:t,bottom:i}){return{x:{min:e,max:t},y:{min:n,max:i}}}function Bg({x:n,y:e}){return{top:e.min,right:n.max,bottom:e.max,left:n.min}}function Vg(n,e){if(!e)return n;const t=e({x:n.left,y:n.top}),i=e({x:n.right,y:n.bottom});return{top:t.y,left:t.x,bottom:i.y,right:i.x}}function Pa(n){return n===void 0||n===1}function yo({scale:n,scaleX:e,scaleY:t}){return!Pa(n)||!Pa(e)||!Pa(t)}function Ri(n){return yo(n)||yh(n)||n.z||n.rotate||n.rotateX||n.rotateY}function yh(n){return Fc(n.x)||Fc(n.y)}function Fc(n){return n&&n!=="0%"}function Qr(n,e,t){const i=n-t,s=e*i;return t+s}function Oc(n,e,t,i,s){return s!==void 0&&(n=Qr(n,s,i)),Qr(n,t,i)+e}function So(n,e=0,t=1,i,s){n.min=Oc(n.min,e,t,i,s),n.max=Oc(n.max,e,t,i,s)}function Sh(n,{x:e,y:t}){So(n.x,e.translate,e.scale,e.originPoint),So(n.y,t.translate,t.scale,t.originPoint)}function kg(n,e,t,i=!1){const s=t.length;if(!s)return;e.x=e.y=1;let r,a;for(let o=0;o<s;o++){r=t[o],a=r.projectionDelta;const l=r.instance;l&&l.style&&l.style.display==="contents"||(i&&r.options.layoutScroll&&r.scroll&&r!==r.root&&cs(n,{x:-r.scroll.offset.x,y:-r.scroll.offset.y}),a&&(e.x*=a.x.scale,e.y*=a.y.scale,Sh(n,a)),i&&Ri(r.latestValues)&&cs(n,r.latestValues))}e.x=Bc(e.x),e.y=Bc(e.y)}function Bc(n){return Number.isInteger(n)||n>1.0000000000001||n<.999999999999?n:1}function ci(n,e){n.min=n.min+e,n.max=n.max+e}function Vc(n,e,[t,i,s]){const r=e[s]!==void 0?e[s]:.5,a=vt(n.min,n.max,r);So(n,e[t],e[i],a,e.scale)}const zg=["x","scaleX","originX"],Gg=["y","scaleY","originY"];function cs(n,e){Vc(n.x,e,zg),Vc(n.y,e,Gg)}function Mh(n,e){return vh(Vg(n.getBoundingClientRect(),e))}function Hg(n,e,t){const i=Mh(n,t),{scroll:s}=e;return s&&(ci(i.x,s.offset.x),ci(i.y,s.offset.y)),i}const bh=({current:n})=>n?n.ownerDocument.defaultView:null,Wg=new WeakMap;class jg{constructor(e){this.openGlobalLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=wt(),this.visualElement=e}start(e,{snapToCursor:t=!1}={}){const{presenceContext:i}=this.visualElement;if(i&&i.isPresent===!1)return;const s=u=>{const{dragSnapToOrigin:d}=this.getProps();d?this.pauseAnimation():this.stopAnimation(),t&&this.snapToCursor(ua(u,"page").point)},r=(u,d)=>{const{drag:h,dragPropagation:f,onDragStart:p}=this.getProps();if(h&&!f&&(this.openGlobalLock&&this.openGlobalLock(),this.openGlobalLock=Fd(h),!this.openGlobalLock))return;this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),mn(g=>{let m=this.getAxisMotionValue(g).get()||0;if(Nn.test(m)){const{projection:_}=this.visualElement;if(_&&_.layout){const y=_.layout.layoutBox[g];y&&(m=on(y)*(parseFloat(m)/100))}}this.originPoint[g]=m}),p&&xt.update(()=>p(u,d),!1,!0);const{animationState:x}=this.visualElement;x&&x.setActive("whileDrag",!0)},a=(u,d)=>{const{dragPropagation:h,dragDirectionLock:f,onDirectionLock:p,onDrag:x}=this.getProps();if(!h&&!this.openGlobalLock)return;const{offset:g}=d;if(f&&this.currentDirection===null){this.currentDirection=Xg(g),this.currentDirection!==null&&p&&p(this.currentDirection);return}this.updateAxis("x",d.point,g),this.updateAxis("y",d.point,g),this.visualElement.render(),x&&x(u,d)},o=(u,d)=>this.stop(u,d),l=()=>mn(u=>{var d;return this.getAnimationState(u)==="paused"&&((d=this.getAxisMotionValue(u).animation)===null||d===void 0?void 0:d.play())}),{dragSnapToOrigin:c}=this.getProps();this.panSession=new xh(e,{onSessionStart:s,onStart:r,onMove:a,onSessionEnd:o,resumeAnimation:l},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:c,contextWindow:bh(this.visualElement)})}stop(e,t){const i=this.isDragging;if(this.cancel(),!i)return;const{velocity:s}=t;this.startAnimation(s);const{onDragEnd:r}=this.getProps();r&&xt.update(()=>r(e,t))}cancel(){this.isDragging=!1;const{projection:e,animationState:t}=this.visualElement;e&&(e.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:i}=this.getProps();!i&&this.openGlobalLock&&(this.openGlobalLock(),this.openGlobalLock=null),t&&t.setActive("whileDrag",!1)}updateAxis(e,t,i){const{drag:s}=this.getProps();if(!i||!fr(e,s,this.currentDirection))return;const r=this.getAxisMotionValue(e);let a=this.originPoint[e]+i[e];this.constraints&&this.constraints[e]&&(a=Lg(a,this.constraints[e],this.elastic[e])),r.set(a)}resolveConstraints(){var e;const{dragConstraints:t,dragElastic:i}=this.getProps(),s=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):(e=this.visualElement.projection)===null||e===void 0?void 0:e.layout,r=this.constraints;t&&as(t)?this.constraints||(this.constraints=this.resolveRefConstraints()):t&&s?this.constraints=Ig(s.layoutBox,t):this.constraints=!1,this.elastic=Og(i),r!==this.constraints&&s&&this.constraints&&!this.hasMutatedConstraints&&mn(a=>{this.getAxisMotionValue(a)&&(this.constraints[a]=Fg(s.layoutBox[a],this.constraints[a]))})}resolveRefConstraints(){const{dragConstraints:e,onMeasureDragConstraints:t}=this.getProps();if(!e||!as(e))return!1;const i=e.current,{projection:s}=this.visualElement;if(!s||!s.layout)return!1;const r=Hg(i,s.root,this.visualElement.getTransformPagePoint());let a=Ng(s.layout.layoutBox,r);if(t){const o=t(Bg(a));this.hasMutatedConstraints=!!o,o&&(a=vh(o))}return a}startAnimation(e){const{drag:t,dragMomentum:i,dragElastic:s,dragTransition:r,dragSnapToOrigin:a,onDragTransitionEnd:o}=this.getProps(),l=this.constraints||{},c=mn(u=>{if(!fr(u,t,this.currentDirection))return;let d=l&&l[u]||{};a&&(d={min:0,max:0});const h=s?200:1e6,f=s?40:1e7,p={type:"inertia",velocity:i?e[u]:0,bounceStiffness:h,bounceDamping:f,timeConstant:750,restDelta:1,restSpeed:10,...r,...d};return this.startAxisValueAnimation(u,p)});return Promise.all(c).then(o)}startAxisValueAnimation(e,t){const i=this.getAxisMotionValue(e);return i.start(Bl(e,i,0,t))}stopAnimation(){mn(e=>this.getAxisMotionValue(e).stop())}pauseAnimation(){mn(e=>{var t;return(t=this.getAxisMotionValue(e).animation)===null||t===void 0?void 0:t.pause()})}getAnimationState(e){var t;return(t=this.getAxisMotionValue(e).animation)===null||t===void 0?void 0:t.state}getAxisMotionValue(e){const t="_drag"+e.toUpperCase(),i=this.visualElement.getProps(),s=i[t];return s||this.visualElement.getValue(e,(i.initial?i.initial[e]:void 0)||0)}snapToCursor(e){mn(t=>{const{drag:i}=this.getProps();if(!fr(t,i,this.currentDirection))return;const{projection:s}=this.visualElement,r=this.getAxisMotionValue(t);if(s&&s.layout){const{min:a,max:o}=s.layout.layoutBox[t];r.set(e[t]-vt(a,o,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:e,dragConstraints:t}=this.getProps(),{projection:i}=this.visualElement;if(!as(t)||!i||!this.constraints)return;this.stopAnimation();const s={x:0,y:0};mn(a=>{const o=this.getAxisMotionValue(a);if(o){const l=o.get();s[a]=Ug({min:l,max:l},this.constraints[a])}});const{transformTemplate:r}=this.visualElement.getProps();this.visualElement.current.style.transform=r?r({},""):"none",i.root&&i.root.updateScroll(),i.updateLayout(),this.resolveConstraints(),mn(a=>{if(!fr(a,e,null))return;const o=this.getAxisMotionValue(a),{min:l,max:c}=this.constraints[a];o.set(vt(l,c,s[a]))})}addListeners(){if(!this.visualElement.current)return;Wg.set(this.visualElement,this);const e=this.visualElement.current,t=Xn(e,"pointerdown",l=>{const{drag:c,dragListener:u=!0}=this.getProps();c&&u&&this.start(l)}),i=()=>{const{dragConstraints:l}=this.getProps();as(l)&&(this.constraints=this.resolveRefConstraints())},{projection:s}=this.visualElement,r=s.addEventListener("measure",i);s&&!s.layout&&(s.root&&s.root.updateScroll(),s.updateLayout()),i();const a=Wn(window,"resize",()=>this.scalePositionWithinConstraints()),o=s.addEventListener("didUpdate",({delta:l,hasLayoutChanged:c})=>{this.isDragging&&c&&(mn(u=>{const d=this.getAxisMotionValue(u);d&&(this.originPoint[u]+=l[u].translate,d.set(d.get()+l[u].translate))}),this.visualElement.render())});return()=>{a(),t(),r(),o&&o()}}getProps(){const e=this.visualElement.getProps(),{drag:t=!1,dragDirectionLock:i=!1,dragPropagation:s=!1,dragConstraints:r=!1,dragElastic:a=vo,dragMomentum:o=!0}=e;return{...e,drag:t,dragDirectionLock:i,dragPropagation:s,dragConstraints:r,dragElastic:a,dragMomentum:o}}}function fr(n,e,t){return(e===!0||e===n)&&(t===null||t===n)}function Xg(n,e=10){let t=null;return Math.abs(n.y)>e?t="y":Math.abs(n.x)>e&&(t="x"),t}class qg extends gi{constructor(e){super(e),this.removeGroupControls=Et,this.removeListeners=Et,this.controls=new jg(e)}mount(){const{dragControls:e}=this.node.getProps();e&&(this.removeGroupControls=e.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||Et}unmount(){this.removeGroupControls(),this.removeListeners()}}const kc=n=>(e,t)=>{n&&xt.update(()=>n(e,t))};class Yg extends gi{constructor(){super(...arguments),this.removePointerDownListener=Et}onPointerDown(e){this.session=new xh(e,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:bh(this.node)})}createPanHandlers(){const{onPanSessionStart:e,onPanStart:t,onPan:i,onPanEnd:s}=this.node.getProps();return{onSessionStart:kc(e),onStart:kc(t),onMove:i,onEnd:(r,a)=>{delete this.session,s&&xt.update(()=>s(r,a))}}}mount(){this.removePointerDownListener=Xn(this.node.current,"pointerdown",e=>this.onPointerDown(e))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}function $g(){const n=z.useContext(ra);if(n===null)return[!0,null];const{isPresent:e,onExitComplete:t,register:i}=n,s=z.useId();return z.useEffect(()=>i(s),[]),!e&&t?[!1,()=>t&&t(s)]:[!0]}const Vr={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function zc(n,e){return e.max===e.min?0:n/(e.max-e.min)*100}const Cs={correct:(n,e)=>{if(!e.target)return n;if(typeof n=="string")if(Ve.test(n))n=parseFloat(n);else return n;const t=zc(n,e.target.x),i=zc(n,e.target.y);return`${t}% ${i}%`}},Kg={correct:(n,{treeScale:e,projectionDelta:t})=>{const i=n,s=pi.parse(n);if(s.length>5)return i;const r=pi.createTransformer(n),a=typeof s[0]!="number"?1:0,o=t.x.scale*e.x,l=t.y.scale*e.y;s[0+a]/=o,s[1+a]/=l;const c=vt(o,l,.5);return typeof s[2+a]=="number"&&(s[2+a]/=c),typeof s[3+a]=="number"&&(s[3+a]/=c),r(s)}};class Zg extends Fi.Component{componentDidMount(){const{visualElement:e,layoutGroup:t,switchLayoutGroup:i,layoutId:s}=this.props,{projection:r}=e;sp(Jg),r&&(t.group&&t.group.add(r),i&&i.register&&s&&i.register(r),r.root.didUpdate(),r.addEventListener("animationComplete",()=>{this.safeToRemove()}),r.setOptions({...r.options,onExitComplete:()=>this.safeToRemove()})),Vr.hasEverUpdated=!0}getSnapshotBeforeUpdate(e){const{layoutDependency:t,visualElement:i,drag:s,isPresent:r}=this.props,a=i.projection;return a&&(a.isPresent=r,s||e.layoutDependency!==t||t===void 0?a.willUpdate():this.safeToRemove(),e.isPresent!==r&&(r?a.promote():a.relegate()||xt.postRender(()=>{const o=a.getStack();(!o||!o.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:e}=this.props.visualElement;e&&(e.root.didUpdate(),queueMicrotask(()=>{!e.currentAnimation&&e.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:e,layoutGroup:t,switchLayoutGroup:i}=this.props,{projection:s}=e;s&&(s.scheduleCheckAfterUnmount(),t&&t.group&&t.group.remove(s),i&&i.deregister&&i.deregister(s))}safeToRemove(){const{safeToRemove:e}=this.props;e&&e()}render(){return null}}function Eh(n){const[e,t]=$g(),i=z.useContext(El);return Fi.createElement(Zg,{...n,layoutGroup:i,switchLayoutGroup:z.useContext(vd),isPresent:e,safeToRemove:t})}const Jg={borderRadius:{...Cs,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Cs,borderTopRightRadius:Cs,borderBottomLeftRadius:Cs,borderBottomRightRadius:Cs,boxShadow:Kg},Th=["TopLeft","TopRight","BottomLeft","BottomRight"],Qg=Th.length,Gc=n=>typeof n=="string"?parseFloat(n):n,Hc=n=>typeof n=="number"||Ve.test(n);function e0(n,e,t,i,s,r){s?(n.opacity=vt(0,t.opacity!==void 0?t.opacity:1,t0(i)),n.opacityExit=vt(e.opacity!==void 0?e.opacity:1,0,n0(i))):r&&(n.opacity=vt(e.opacity!==void 0?e.opacity:1,t.opacity!==void 0?t.opacity:1,i));for(let a=0;a<Qg;a++){const o=`border${Th[a]}Radius`;let l=Wc(e,o),c=Wc(t,o);if(l===void 0&&c===void 0)continue;l||(l=0),c||(c=0),l===0||c===0||Hc(l)===Hc(c)?(n[o]=Math.max(vt(Gc(l),Gc(c),i),0),(Nn.test(c)||Nn.test(l))&&(n[o]+="%")):n[o]=c}(e.rotate||t.rotate)&&(n.rotate=vt(e.rotate||0,t.rotate||0,i))}function Wc(n,e){return n[e]!==void 0?n[e]:n.borderRadius}const t0=wh(0,.5,Yd),n0=wh(.5,.95,Et);function wh(n,e,t){return i=>i<n?0:i>e?1:t(qs(n,e,i))}function jc(n,e){n.min=e.min,n.max=e.max}function hn(n,e){jc(n.x,e.x),jc(n.y,e.y)}function Xc(n,e,t,i,s){return n-=e,n=Qr(n,1/t,i),s!==void 0&&(n=Qr(n,1/s,i)),n}function i0(n,e=0,t=1,i=.5,s,r=n,a=n){if(Nn.test(e)&&(e=parseFloat(e),e=vt(a.min,a.max,e/100)-a.min),typeof e!="number")return;let o=vt(r.min,r.max,i);n===r&&(o-=e),n.min=Xc(n.min,e,t,o,s),n.max=Xc(n.max,e,t,o,s)}function qc(n,e,[t,i,s],r,a){i0(n,e[t],e[i],e[s],e.scale,r,a)}const s0=["x","scaleX","originX"],r0=["y","scaleY","originY"];function Yc(n,e,t,i){qc(n.x,e,s0,t?t.x:void 0,i?i.x:void 0),qc(n.y,e,r0,t?t.y:void 0,i?i.y:void 0)}function $c(n){return n.translate===0&&n.scale===1}function Ah(n){return $c(n.x)&&$c(n.y)}function a0(n,e){return n.x.min===e.x.min&&n.x.max===e.x.max&&n.y.min===e.y.min&&n.y.max===e.y.max}function Ch(n,e){return Math.round(n.x.min)===Math.round(e.x.min)&&Math.round(n.x.max)===Math.round(e.x.max)&&Math.round(n.y.min)===Math.round(e.y.min)&&Math.round(n.y.max)===Math.round(e.y.max)}function Kc(n){return on(n.x)/on(n.y)}class o0{constructor(){this.members=[]}add(e){Vl(this.members,e),e.scheduleRender()}remove(e){if(kl(this.members,e),e===this.prevLead&&(this.prevLead=void 0),e===this.lead){const t=this.members[this.members.length-1];t&&this.promote(t)}}relegate(e){const t=this.members.findIndex(s=>e===s);if(t===0)return!1;let i;for(let s=t;s>=0;s--){const r=this.members[s];if(r.isPresent!==!1){i=r;break}}return i?(this.promote(i),!0):!1}promote(e,t){const i=this.lead;if(e!==i&&(this.prevLead=i,this.lead=e,e.show(),i)){i.instance&&i.scheduleRender(),e.scheduleRender(),e.resumeFrom=i,t&&(e.resumeFrom.preserveOpacity=!0),i.snapshot&&(e.snapshot=i.snapshot,e.snapshot.latestValues=i.animationValues||i.latestValues),e.root&&e.root.isUpdating&&(e.isLayoutDirty=!0);const{crossfade:s}=e.options;s===!1&&i.hide()}}exitAnimationComplete(){this.members.forEach(e=>{const{options:t,resumingFrom:i}=e;t.onExitComplete&&t.onExitComplete(),i&&i.options.onExitComplete&&i.options.onExitComplete()})}scheduleRender(){this.members.forEach(e=>{e.instance&&e.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function Zc(n,e,t){let i="";const s=n.x.translate/e.x,r=n.y.translate/e.y;if((s||r)&&(i=`translate3d(${s}px, ${r}px, 0) `),(e.x!==1||e.y!==1)&&(i+=`scale(${1/e.x}, ${1/e.y}) `),t){const{rotate:l,rotateX:c,rotateY:u}=t;l&&(i+=`rotate(${l}deg) `),c&&(i+=`rotateX(${c}deg) `),u&&(i+=`rotateY(${u}deg) `)}const a=n.x.scale*e.x,o=n.y.scale*e.y;return(a!==1||o!==1)&&(i+=`scale(${a}, ${o})`),i||"none"}const l0=(n,e)=>n.depth-e.depth;class c0{constructor(){this.children=[],this.isDirty=!1}add(e){Vl(this.children,e),this.isDirty=!0}remove(e){kl(this.children,e),this.isDirty=!0}forEach(e){this.isDirty&&this.children.sort(l0),this.isDirty=!1,this.children.forEach(e)}}function u0(n,e){const t=performance.now(),i=({timestamp:s})=>{const r=s-t;r>=e&&(Kn(i),n(r-e))};return xt.read(i,!0),()=>Kn(i)}function d0(n){window.MotionDebug&&window.MotionDebug.record(n)}function h0(n){return n instanceof SVGElement&&n.tagName!=="svg"}function f0(n,e,t){const i=$t(n)?n:ms(n);return i.start(Bl("",i,e,t)),i.animation}const Jc=["","X","Y","Z"],p0={visibility:"hidden"},Qc=1e3;let m0=0;const Pi={type:"projectionFrame",totalNodes:0,resolvedTargetDeltas:0,recalculatedProjection:0};function Rh({attachResizeListener:n,defaultParent:e,measureScroll:t,checkIsScrollRoot:i,resetTransform:s}){return class{constructor(a={},o=e==null?void 0:e()){this.id=m0++,this.animationId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,Pi.totalNodes=Pi.resolvedTargetDeltas=Pi.recalculatedProjection=0,this.nodes.forEach(_0),this.nodes.forEach(b0),this.nodes.forEach(E0),this.nodes.forEach(v0),d0(Pi)},this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=a,this.root=o?o.root||o:this,this.path=o?[...o.path,o]:[],this.parent=o,this.depth=o?o.depth+1:0;for(let l=0;l<this.path.length;l++)this.path[l].shouldResetTransform=!0;this.root===this&&(this.nodes=new c0)}addEventListener(a,o){return this.eventHandlers.has(a)||this.eventHandlers.set(a,new zl),this.eventHandlers.get(a).add(o)}notifyListeners(a,...o){const l=this.eventHandlers.get(a);l&&l.notify(...o)}hasListeners(a){return this.eventHandlers.has(a)}mount(a,o=this.root.hasTreeAnimated){if(this.instance)return;this.isSVG=h0(a),this.instance=a;const{layoutId:l,layout:c,visualElement:u}=this.options;if(u&&!u.current&&u.mount(a),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),o&&(c||l)&&(this.isLayoutDirty=!0),n){let d;const h=()=>this.root.updateBlockedByResize=!1;n(a,()=>{this.root.updateBlockedByResize=!0,d&&d(),d=u0(h,250),Vr.hasAnimatedSinceResize&&(Vr.hasAnimatedSinceResize=!1,this.nodes.forEach(tu))})}l&&this.root.registerSharedNode(l,this),this.options.animate!==!1&&u&&(l||c)&&this.addEventListener("didUpdate",({delta:d,hasLayoutChanged:h,hasRelativeTargetChanged:f,layout:p})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const x=this.options.transition||u.getDefaultTransition()||R0,{onLayoutAnimationStart:g,onLayoutAnimationComplete:m}=u.getProps(),_=!this.targetLayout||!Ch(this.targetLayout,p)||f,y=!h&&f;if(this.options.layoutRoot||this.resumeFrom&&this.resumeFrom.instance||y||h&&(_||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0),this.setAnimationOrigin(d,y);const b={...Ol(x,"layout"),onPlay:g,onComplete:m};(u.shouldReduceMotion||this.options.layoutRoot)&&(b.delay=0,b.type=!1),this.startAnimation(b)}else h||tu(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=p})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const a=this.getStack();a&&a.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,Kn(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(T0),this.animationId++)}getTransformTemplate(){const{visualElement:a}=this.options;return a&&a.getProps().transformTemplate}willUpdate(a=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let u=0;u<this.path.length;u++){const d=this.path[u];d.shouldResetTransform=!0,d.updateScroll("snapshot"),d.options.layoutRoot&&d.willUpdate(!1)}const{layoutId:o,layout:l}=this.options;if(o===void 0&&!l)return;const c=this.getTransformTemplate();this.prevTransformTemplateValue=c?c(this.latestValues,""):void 0,this.updateSnapshot(),a&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(eu);return}this.isUpdating||this.nodes.forEach(S0),this.isUpdating=!1,this.nodes.forEach(M0),this.nodes.forEach(g0),this.nodes.forEach(x0),this.clearAllSnapshots();const o=performance.now();Ft.delta=fi(0,1e3/60,o-Ft.timestamp),Ft.timestamp=o,Ft.isProcessing=!0,ya.update.process(Ft),ya.preRender.process(Ft),ya.render.process(Ft),Ft.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,queueMicrotask(()=>this.update()))}clearAllSnapshots(){this.nodes.forEach(y0),this.sharedNodes.forEach(w0)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,xt.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){xt.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure())}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let l=0;l<this.path.length;l++)this.path[l].updateScroll();const a=this.layout;this.layout=this.measure(!1),this.layoutCorrected=wt(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:o}=this.options;o&&o.notify("LayoutMeasure",this.layout.layoutBox,a?a.layoutBox:void 0)}updateScroll(a="measure"){let o=!!(this.options.layoutScroll&&this.instance);this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===a&&(o=!1),o&&(this.scroll={animationId:this.root.animationId,phase:a,isRoot:i(this.instance),offset:t(this.instance)})}resetTransform(){if(!s)return;const a=this.isLayoutDirty||this.shouldResetTransform,o=this.projectionDelta&&!Ah(this.projectionDelta),l=this.getTransformTemplate(),c=l?l(this.latestValues,""):void 0,u=c!==this.prevTransformTemplateValue;a&&(o||Ri(this.latestValues)||u)&&(s(this.instance,c),this.shouldResetTransform=!1,this.scheduleRender())}measure(a=!0){const o=this.measurePageBox();let l=this.removeElementScroll(o);return a&&(l=this.removeTransform(l)),P0(l),{animationId:this.root.animationId,measuredBox:o,layoutBox:l,latestValues:{},source:this.id}}measurePageBox(){const{visualElement:a}=this.options;if(!a)return wt();const o=a.measureViewportBox(),{scroll:l}=this.root;return l&&(ci(o.x,l.offset.x),ci(o.y,l.offset.y)),o}removeElementScroll(a){const o=wt();hn(o,a);for(let l=0;l<this.path.length;l++){const c=this.path[l],{scroll:u,options:d}=c;if(c!==this.root&&u&&d.layoutScroll){if(u.isRoot){hn(o,a);const{scroll:h}=this.root;h&&(ci(o.x,-h.offset.x),ci(o.y,-h.offset.y))}ci(o.x,u.offset.x),ci(o.y,u.offset.y)}}return o}applyTransform(a,o=!1){const l=wt();hn(l,a);for(let c=0;c<this.path.length;c++){const u=this.path[c];!o&&u.options.layoutScroll&&u.scroll&&u!==u.root&&cs(l,{x:-u.scroll.offset.x,y:-u.scroll.offset.y}),Ri(u.latestValues)&&cs(l,u.latestValues)}return Ri(this.latestValues)&&cs(l,this.latestValues),l}removeTransform(a){const o=wt();hn(o,a);for(let l=0;l<this.path.length;l++){const c=this.path[l];if(!c.instance||!Ri(c.latestValues))continue;yo(c.latestValues)&&c.updateSnapshot();const u=wt(),d=c.measurePageBox();hn(u,d),Yc(o,c.latestValues,c.snapshot?c.snapshot.layoutBox:void 0,u)}return Ri(this.latestValues)&&Yc(o,this.latestValues),o}setTargetDelta(a){this.targetDelta=a,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(a){this.options={...this.options,...a,crossfade:a.crossfade!==void 0?a.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==Ft.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(a=!1){var o;const l=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=l.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=l.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=l.isSharedProjectionDirty);const c=!!this.resumingFrom||this!==l;if(!(a||c&&this.isSharedProjectionDirty||this.isProjectionDirty||!((o=this.parent)===null||o===void 0)&&o.isProjectionDirty||this.attemptToResolveRelativeTarget))return;const{layout:d,layoutId:h}=this.options;if(!(!this.layout||!(d||h))){if(this.resolvedRelativeTargetAt=Ft.timestamp,!this.targetDelta&&!this.relativeTarget){const f=this.getClosestProjectingParent();f&&f.layout&&this.animationProgress!==1?(this.relativeParent=f,this.forceRelativeParentToResolveTarget(),this.relativeTarget=wt(),this.relativeTargetOrigin=wt(),Gs(this.relativeTargetOrigin,this.layout.layoutBox,f.layout.layoutBox),hn(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)){if(this.target||(this.target=wt(),this.targetWithTransforms=wt()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),Dg(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):hn(this.target,this.layout.layoutBox),Sh(this.target,this.targetDelta)):hn(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget){this.attemptToResolveRelativeTarget=!1;const f=this.getClosestProjectingParent();f&&!!f.resumingFrom==!!this.resumingFrom&&!f.options.layoutScroll&&f.target&&this.animationProgress!==1?(this.relativeParent=f,this.forceRelativeParentToResolveTarget(),this.relativeTarget=wt(),this.relativeTargetOrigin=wt(),Gs(this.relativeTargetOrigin,this.target,f.target),hn(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}Pi.resolvedTargetDeltas++}}}getClosestProjectingParent(){if(!(!this.parent||yo(this.parent.latestValues)||yh(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){var a;const o=this.getLead(),l=!!this.resumingFrom||this!==o;let c=!0;if((this.isProjectionDirty||!((a=this.parent)===null||a===void 0)&&a.isProjectionDirty)&&(c=!1),l&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(c=!1),this.resolvedRelativeTargetAt===Ft.timestamp&&(c=!1),c)return;const{layout:u,layoutId:d}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(u||d))return;hn(this.layoutCorrected,this.layout.layoutBox);const h=this.treeScale.x,f=this.treeScale.y;kg(this.layoutCorrected,this.treeScale,this.path,l),o.layout&&!o.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(o.target=o.layout.layoutBox);const{target:p}=o;if(!p){this.projectionTransform&&(this.projectionDelta=ls(),this.projectionTransform="none",this.scheduleRender());return}this.projectionDelta||(this.projectionDelta=ls(),this.projectionDeltaWithTransform=ls());const x=this.projectionTransform;zs(this.projectionDelta,this.layoutCorrected,p,this.latestValues),this.projectionTransform=Zc(this.projectionDelta,this.treeScale),(this.projectionTransform!==x||this.treeScale.x!==h||this.treeScale.y!==f)&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",p)),Pi.recalculatedProjection++}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(a=!0){if(this.options.scheduleRender&&this.options.scheduleRender(),a){const o=this.getStack();o&&o.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}setAnimationOrigin(a,o=!1){const l=this.snapshot,c=l?l.latestValues:{},u={...this.latestValues},d=ls();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!o;const h=wt(),f=l?l.source:void 0,p=this.layout?this.layout.source:void 0,x=f!==p,g=this.getStack(),m=!g||g.members.length<=1,_=!!(x&&!m&&this.options.crossfade===!0&&!this.path.some(C0));this.animationProgress=0;let y;this.mixTargetDelta=b=>{const w=b/1e3;nu(d.x,a.x,w),nu(d.y,a.y,w),this.setTargetDelta(d),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(Gs(h,this.layout.layoutBox,this.relativeParent.layout.layoutBox),A0(this.relativeTarget,this.relativeTargetOrigin,h,w),y&&a0(this.relativeTarget,y)&&(this.isProjectionDirty=!1),y||(y=wt()),hn(y,this.relativeTarget)),x&&(this.animationValues=u,e0(u,c,this.latestValues,w,_,m)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=w},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(a){this.notifyListeners("animationStart"),this.currentAnimation&&this.currentAnimation.stop(),this.resumingFrom&&this.resumingFrom.currentAnimation&&this.resumingFrom.currentAnimation.stop(),this.pendingAnimation&&(Kn(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=xt.update(()=>{Vr.hasAnimatedSinceResize=!0,this.currentAnimation=f0(0,Qc,{...a,onUpdate:o=>{this.mixTargetDelta(o),a.onUpdate&&a.onUpdate(o)},onComplete:()=>{a.onComplete&&a.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const a=this.getStack();a&&a.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(Qc),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const a=this.getLead();let{targetWithTransforms:o,target:l,layout:c,latestValues:u}=a;if(!(!o||!l||!c)){if(this!==a&&this.layout&&c&&Ph(this.options.animationType,this.layout.layoutBox,c.layoutBox)){l=this.target||wt();const d=on(this.layout.layoutBox.x);l.x.min=a.target.x.min,l.x.max=l.x.min+d;const h=on(this.layout.layoutBox.y);l.y.min=a.target.y.min,l.y.max=l.y.min+h}hn(o,l),cs(o,u),zs(this.projectionDeltaWithTransform,this.layoutCorrected,o,u)}}registerSharedNode(a,o){this.sharedNodes.has(a)||this.sharedNodes.set(a,new o0),this.sharedNodes.get(a).add(o);const c=o.options.initialPromotionConfig;o.promote({transition:c?c.transition:void 0,preserveFollowOpacity:c&&c.shouldPreserveFollowOpacity?c.shouldPreserveFollowOpacity(o):void 0})}isLead(){const a=this.getStack();return a?a.lead===this:!0}getLead(){var a;const{layoutId:o}=this.options;return o?((a=this.getStack())===null||a===void 0?void 0:a.lead)||this:this}getPrevLead(){var a;const{layoutId:o}=this.options;return o?(a=this.getStack())===null||a===void 0?void 0:a.prevLead:void 0}getStack(){const{layoutId:a}=this.options;if(a)return this.root.sharedNodes.get(a)}promote({needsReset:a,transition:o,preserveFollowOpacity:l}={}){const c=this.getStack();c&&c.promote(this,l),a&&(this.projectionDelta=void 0,this.needsReset=!0),o&&this.setOptions({transition:o})}relegate(){const a=this.getStack();return a?a.relegate(this):!1}resetRotation(){const{visualElement:a}=this.options;if(!a)return;let o=!1;const{latestValues:l}=a;if((l.rotate||l.rotateX||l.rotateY||l.rotateZ)&&(o=!0),!o)return;const c={};for(let u=0;u<Jc.length;u++){const d="rotate"+Jc[u];l[d]&&(c[d]=l[d],a.setStaticValue(d,0))}a.render();for(const u in c)a.setStaticValue(u,c[u]);a.scheduleRender()}getProjectionStyles(a){var o,l;if(!this.instance||this.isSVG)return;if(!this.isVisible)return p0;const c={visibility:""},u=this.getTransformTemplate();if(this.needsReset)return this.needsReset=!1,c.opacity="",c.pointerEvents=Br(a==null?void 0:a.pointerEvents)||"",c.transform=u?u(this.latestValues,""):"none",c;const d=this.getLead();if(!this.projectionDelta||!this.layout||!d.target){const x={};return this.options.layoutId&&(x.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,x.pointerEvents=Br(a==null?void 0:a.pointerEvents)||""),this.hasProjected&&!Ri(this.latestValues)&&(x.transform=u?u({},""):"none",this.hasProjected=!1),x}const h=d.animationValues||d.latestValues;this.applyTransformsToTarget(),c.transform=Zc(this.projectionDeltaWithTransform,this.treeScale,h),u&&(c.transform=u(h,c.transform));const{x:f,y:p}=this.projectionDelta;c.transformOrigin=`${f.origin*100}% ${p.origin*100}% 0`,d.animationValues?c.opacity=d===this?(l=(o=h.opacity)!==null&&o!==void 0?o:this.latestValues.opacity)!==null&&l!==void 0?l:1:this.preserveOpacity?this.latestValues.opacity:h.opacityExit:c.opacity=d===this?h.opacity!==void 0?h.opacity:"":h.opacityExit!==void 0?h.opacityExit:0;for(const x in Xr){if(h[x]===void 0)continue;const{correct:g,applyTo:m}=Xr[x],_=c.transform==="none"?h[x]:g(h[x],d);if(m){const y=m.length;for(let b=0;b<y;b++)c[m[b]]=_}else c[x]=_}return this.options.layoutId&&(c.pointerEvents=d===this?Br(a==null?void 0:a.pointerEvents)||"":"none"),c}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(a=>{var o;return(o=a.currentAnimation)===null||o===void 0?void 0:o.stop()}),this.root.nodes.forEach(eu),this.root.sharedNodes.clear()}}}function g0(n){n.updateLayout()}function x0(n){var e;const t=((e=n.resumeFrom)===null||e===void 0?void 0:e.snapshot)||n.snapshot;if(n.isLead()&&n.layout&&t&&n.hasListeners("didUpdate")){const{layoutBox:i,measuredBox:s}=n.layout,{animationType:r}=n.options,a=t.source!==n.layout.source;r==="size"?mn(d=>{const h=a?t.measuredBox[d]:t.layoutBox[d],f=on(h);h.min=i[d].min,h.max=h.min+f}):Ph(r,t.layoutBox,i)&&mn(d=>{const h=a?t.measuredBox[d]:t.layoutBox[d],f=on(i[d]);h.max=h.min+f,n.relativeTarget&&!n.currentAnimation&&(n.isProjectionDirty=!0,n.relativeTarget[d].max=n.relativeTarget[d].min+f)});const o=ls();zs(o,i,t.layoutBox);const l=ls();a?zs(l,n.applyTransform(s,!0),t.measuredBox):zs(l,i,t.layoutBox);const c=!Ah(o);let u=!1;if(!n.resumeFrom){const d=n.getClosestProjectingParent();if(d&&!d.resumeFrom){const{snapshot:h,layout:f}=d;if(h&&f){const p=wt();Gs(p,t.layoutBox,h.layoutBox);const x=wt();Gs(x,i,f.layoutBox),Ch(p,x)||(u=!0),d.options.layoutRoot&&(n.relativeTarget=x,n.relativeTargetOrigin=p,n.relativeParent=d)}}}n.notifyListeners("didUpdate",{layout:i,snapshot:t,delta:l,layoutDelta:o,hasLayoutChanged:c,hasRelativeTargetChanged:u})}else if(n.isLead()){const{onExitComplete:i}=n.options;i&&i()}n.options.transition=void 0}function _0(n){Pi.totalNodes++,n.parent&&(n.isProjecting()||(n.isProjectionDirty=n.parent.isProjectionDirty),n.isSharedProjectionDirty||(n.isSharedProjectionDirty=!!(n.isProjectionDirty||n.parent.isProjectionDirty||n.parent.isSharedProjectionDirty)),n.isTransformDirty||(n.isTransformDirty=n.parent.isTransformDirty))}function v0(n){n.isProjectionDirty=n.isSharedProjectionDirty=n.isTransformDirty=!1}function y0(n){n.clearSnapshot()}function eu(n){n.clearMeasurements()}function S0(n){n.isLayoutDirty=!1}function M0(n){const{visualElement:e}=n.options;e&&e.getProps().onBeforeLayoutMeasure&&e.notify("BeforeLayoutMeasure"),n.resetTransform()}function tu(n){n.finishAnimation(),n.targetDelta=n.relativeTarget=n.target=void 0,n.isProjectionDirty=!0}function b0(n){n.resolveTargetDelta()}function E0(n){n.calcProjection()}function T0(n){n.resetRotation()}function w0(n){n.removeLeadSnapshot()}function nu(n,e,t){n.translate=vt(e.translate,0,t),n.scale=vt(e.scale,1,t),n.origin=e.origin,n.originPoint=e.originPoint}function iu(n,e,t,i){n.min=vt(e.min,t.min,i),n.max=vt(e.max,t.max,i)}function A0(n,e,t,i){iu(n.x,e.x,t.x,i),iu(n.y,e.y,t.y,i)}function C0(n){return n.animationValues&&n.animationValues.opacityExit!==void 0}const R0={duration:.45,ease:[.4,0,.1,1]},su=n=>typeof navigator<"u"&&navigator.userAgent.toLowerCase().includes(n),ru=su("applewebkit/")&&!su("chrome/")?Math.round:Et;function au(n){n.min=ru(n.min),n.max=ru(n.max)}function P0(n){au(n.x),au(n.y)}function Ph(n,e,t){return n==="position"||n==="preserve-aspect"&&!_o(Kc(e),Kc(t),.2)}const D0=Rh({attachResizeListener:(n,e)=>Wn(n,"resize",e),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),Da={current:void 0},Dh=Rh({measureScroll:n=>({x:n.scrollLeft,y:n.scrollTop}),defaultParent:()=>{if(!Da.current){const n=new D0({});n.mount(window),n.setOptions({layoutScroll:!0}),Da.current=n}return Da.current},resetTransform:(n,e)=>{n.style.transform=e!==void 0?e:"none"},checkIsScrollRoot:n=>window.getComputedStyle(n).position==="fixed"}),L0={pan:{Feature:Yg},drag:{Feature:qg,ProjectionNode:Dh,MeasureLayout:Eh}},I0=/var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;function N0(n){const e=I0.exec(n);if(!e)return[,];const[,t,i]=e;return[t,i]}function Mo(n,e,t=1){const[i,s]=N0(n);if(!i)return;const r=window.getComputedStyle(e).getPropertyValue(i);if(r){const a=r.trim();return fh(a)?parseFloat(a):a}else return uo(s)?Mo(s,e,t+1):s}function U0(n,{...e},t){const i=n.current;if(!(i instanceof Element))return{target:e,transitionEnd:t};t&&(t={...t}),n.values.forEach(s=>{const r=s.get();if(!uo(r))return;const a=Mo(r,i);a&&s.set(a)});for(const s in e){const r=e[s];if(!uo(r))continue;const a=Mo(r,i);a&&(e[s]=a,t||(t={}),t[s]===void 0&&(t[s]=r))}return{target:e,transitionEnd:t}}const F0=new Set(["width","height","top","left","right","bottom","x","y","translateX","translateY"]),Lh=n=>F0.has(n),O0=n=>Object.keys(n).some(Lh),ou=n=>n===Hi||n===Ve,lu=(n,e)=>parseFloat(n.split(", ")[e]),cu=(n,e)=>(t,{transform:i})=>{if(i==="none"||!i)return 0;const s=i.match(/^matrix3d\((.+)\)$/);if(s)return lu(s[1],e);{const r=i.match(/^matrix\((.+)\)$/);return r?lu(r[1],n):0}},B0=new Set(["x","y","z"]),V0=Qs.filter(n=>!B0.has(n));function k0(n){const e=[];return V0.forEach(t=>{const i=n.getValue(t);i!==void 0&&(e.push([t,i.get()]),i.set(t.startsWith("scale")?1:0))}),e.length&&n.render(),e}const gs={width:({x:n},{paddingLeft:e="0",paddingRight:t="0"})=>n.max-n.min-parseFloat(e)-parseFloat(t),height:({y:n},{paddingTop:e="0",paddingBottom:t="0"})=>n.max-n.min-parseFloat(e)-parseFloat(t),top:(n,{top:e})=>parseFloat(e),left:(n,{left:e})=>parseFloat(e),bottom:({y:n},{top:e})=>parseFloat(e)+(n.max-n.min),right:({x:n},{left:e})=>parseFloat(e)+(n.max-n.min),x:cu(4,13),y:cu(5,14)};gs.translateX=gs.x;gs.translateY=gs.y;const z0=(n,e,t)=>{const i=e.measureViewportBox(),s=e.current,r=getComputedStyle(s),{display:a}=r,o={};a==="none"&&e.setStaticValue("display",n.display||"block"),t.forEach(c=>{o[c]=gs[c](i,r)}),e.render();const l=e.measureViewportBox();return t.forEach(c=>{const u=e.getValue(c);u&&u.jump(o[c]),n[c]=gs[c](l,r)}),n},G0=(n,e,t={},i={})=>{e={...e},i={...i};const s=Object.keys(e).filter(Lh);let r=[],a=!1;const o=[];if(s.forEach(l=>{const c=n.getValue(l);if(!n.hasValue(l))return;let u=t[l],d=As(u);const h=e[l];let f;if(Yr(h)){const p=h.length,x=h[0]===null?1:0;u=h[x],d=As(u);for(let g=x;g<p&&h[g]!==null;g++)f?Ll(As(h[g])===f):f=As(h[g])}else f=As(h);if(d!==f)if(ou(d)&&ou(f)){const p=c.get();typeof p=="string"&&c.set(parseFloat(p)),typeof h=="string"?e[l]=parseFloat(h):Array.isArray(h)&&f===Ve&&(e[l]=h.map(parseFloat))}else d!=null&&d.transform&&(f!=null&&f.transform)&&(u===0||h===0)?u===0?c.set(f.transform(u)):e[l]=d.transform(h):(a||(r=k0(n),a=!0),o.push(l),i[l]=i[l]!==void 0?i[l]:e[l],c.jump(h))}),o.length){const l=o.indexOf("height")>=0?window.pageYOffset:null,c=z0(e,n,o);return r.length&&r.forEach(([u,d])=>{n.getValue(u).set(d)}),n.render(),aa&&l!==null&&window.scrollTo({top:l}),{target:c,transitionEnd:i}}else return{target:e,transitionEnd:i}};function H0(n,e,t,i){return O0(e)?G0(n,e,t,i):{target:e,transitionEnd:i}}const W0=(n,e,t,i)=>{const s=U0(n,e,i);return e=s.target,i=s.transitionEnd,H0(n,e,t,i)},bo={current:null},Ih={current:!1};function j0(){if(Ih.current=!0,!!aa)if(window.matchMedia){const n=window.matchMedia("(prefers-reduced-motion)"),e=()=>bo.current=n.matches;n.addListener(e),e()}else bo.current=!1}function X0(n,e,t){const{willChange:i}=e;for(const s in e){const r=e[s],a=t[s];if($t(r))n.addValue(s,r),Jr(i)&&i.add(s);else if($t(a))n.addValue(s,ms(r,{owner:n})),Jr(i)&&i.remove(s);else if(a!==r)if(n.hasValue(s)){const o=n.getValue(s);!o.hasAnimated&&o.set(r)}else{const o=n.getStaticValue(s);n.addValue(s,ms(o!==void 0?o:r,{owner:n}))}}for(const s in t)e[s]===void 0&&n.removeValue(s);return e}const uu=new WeakMap,Nh=Object.keys(Xs),q0=Nh.length,du=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"],Y0=bl.length;class $0{constructor({parent:e,props:t,presenceContext:i,reducedMotionConfig:s,visualState:r},a={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.scheduleRender=()=>xt.render(this.render,!1,!0);const{latestValues:o,renderState:l}=r;this.latestValues=o,this.baseTarget={...o},this.initialValues=t.initial?{...o}:{},this.renderState=l,this.parent=e,this.props=t,this.presenceContext=i,this.depth=e?e.depth+1:0,this.reducedMotionConfig=s,this.options=a,this.isControllingVariants=la(t),this.isVariantNode=_d(t),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(e&&e.current);const{willChange:c,...u}=this.scrapeMotionValuesFromProps(t,{});for(const d in u){const h=u[d];o[d]!==void 0&&$t(h)&&(h.set(o[d],!1),Jr(c)&&c.add(d))}}scrapeMotionValuesFromProps(e,t){return{}}mount(e){this.current=e,uu.set(e,this),this.projection&&!this.projection.instance&&this.projection.mount(e),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((t,i)=>this.bindToMotionValue(i,t)),Ih.current||j0(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:bo.current,this.parent&&this.parent.children.add(this),this.update(this.props,this.presenceContext)}unmount(){uu.delete(this.current),this.projection&&this.projection.unmount(),Kn(this.notifyUpdate),Kn(this.render),this.valueSubscriptions.forEach(e=>e()),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent&&this.parent.children.delete(this);for(const e in this.events)this.events[e].clear();for(const e in this.features)this.features[e].unmount();this.current=null}bindToMotionValue(e,t){const i=Gi.has(e),s=t.on("change",a=>{this.latestValues[e]=a,this.props.onUpdate&&xt.update(this.notifyUpdate,!1,!0),i&&this.projection&&(this.projection.isTransformDirty=!0)}),r=t.on("renderRequest",this.scheduleRender);this.valueSubscriptions.set(e,()=>{s(),r()})}sortNodePosition(e){return!this.current||!this.sortInstanceNodePosition||this.type!==e.type?0:this.sortInstanceNodePosition(this.current,e.current)}loadFeatures({children:e,...t},i,s,r){let a,o;for(let l=0;l<q0;l++){const c=Nh[l],{isEnabled:u,Feature:d,ProjectionNode:h,MeasureLayout:f}=Xs[c];h&&(a=h),u(t)&&(!this.features[c]&&d&&(this.features[c]=new d(this)),f&&(o=f))}if((this.type==="html"||this.type==="svg")&&!this.projection&&a){this.projection=new a(this.latestValues,this.parent&&this.parent.projection);const{layoutId:l,layout:c,drag:u,dragConstraints:d,layoutScroll:h,layoutRoot:f}=t;this.projection.setOptions({layoutId:l,layout:c,alwaysMeasureLayout:!!u||d&&as(d),visualElement:this,scheduleRender:()=>this.scheduleRender(),animationType:typeof c=="string"?c:"both",initialPromotionConfig:r,layoutScroll:h,layoutRoot:f})}return o}updateFeatures(){for(const e in this.features){const t=this.features[e];t.isMounted?t.update():(t.mount(),t.isMounted=!0)}}triggerBuild(){this.build(this.renderState,this.latestValues,this.options,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):wt()}getStaticValue(e){return this.latestValues[e]}setStaticValue(e,t){this.latestValues[e]=t}makeTargetAnimatable(e,t=!0){return this.makeTargetAnimatableFromInstance(e,this.props,t)}update(e,t){(e.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=e,this.prevPresenceContext=this.presenceContext,this.presenceContext=t;for(let i=0;i<du.length;i++){const s=du[i];this.propEventSubscriptions[s]&&(this.propEventSubscriptions[s](),delete this.propEventSubscriptions[s]);const r=e["on"+s];r&&(this.propEventSubscriptions[s]=this.on(s,r))}this.prevMotionValues=X0(this,this.scrapeMotionValuesFromProps(e,this.prevProps),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(e){return this.props.variants?this.props.variants[e]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}getVariantContext(e=!1){if(e)return this.parent?this.parent.getVariantContext():void 0;if(!this.isControllingVariants){const i=this.parent?this.parent.getVariantContext()||{}:{};return this.props.initial!==void 0&&(i.initial=this.props.initial),i}const t={};for(let i=0;i<Y0;i++){const s=bl[i],r=this.props[s];(js(r)||r===!1)&&(t[s]=r)}return t}addVariantChild(e){const t=this.getClosestVariantNode();if(t)return t.variantChildren&&t.variantChildren.add(e),()=>t.variantChildren.delete(e)}addValue(e,t){t!==this.values.get(e)&&(this.removeValue(e),this.bindToMotionValue(e,t)),this.values.set(e,t),this.latestValues[e]=t.get()}removeValue(e){this.values.delete(e);const t=this.valueSubscriptions.get(e);t&&(t(),this.valueSubscriptions.delete(e)),delete this.latestValues[e],this.removeValueFromRenderState(e,this.renderState)}hasValue(e){return this.values.has(e)}getValue(e,t){if(this.props.values&&this.props.values[e])return this.props.values[e];let i=this.values.get(e);return i===void 0&&t!==void 0&&(i=ms(t,{owner:this}),this.addValue(e,i)),i}readValue(e){var t;return this.latestValues[e]!==void 0||!this.current?this.latestValues[e]:(t=this.getBaseTargetFromProps(this.props,e))!==null&&t!==void 0?t:this.readValueFromInstance(this.current,e,this.options)}setBaseTarget(e,t){this.baseTarget[e]=t}getBaseTarget(e){var t;const{initial:i}=this.props,s=typeof i=="string"||typeof i=="object"?(t=Dl(this.props,i))===null||t===void 0?void 0:t[e]:void 0;if(i&&s!==void 0)return s;const r=this.getBaseTargetFromProps(this.props,e);return r!==void 0&&!$t(r)?r:this.initialValues[e]!==void 0&&s===void 0?void 0:this.baseTarget[e]}on(e,t){return this.events[e]||(this.events[e]=new zl),this.events[e].add(t)}notify(e,...t){this.events[e]&&this.events[e].notify(...t)}}class Uh extends $0{sortInstanceNodePosition(e,t){return e.compareDocumentPosition(t)&2?1:-1}getBaseTargetFromProps(e,t){return e.style?e.style[t]:void 0}removeValueFromRenderState(e,{vars:t,style:i}){delete t[e],delete i[e]}makeTargetAnimatableFromInstance({transition:e,transitionEnd:t,...i},{transformValues:s},r){let a=hg(i,e||{},this);if(s&&(t&&(t=s(t)),i&&(i=s(i)),a&&(a=s(a))),r){ug(this,i,a);const o=W0(this,i,a,t);t=o.transitionEnd,i=o.target}return{transition:e,transitionEnd:t,...i}}}function K0(n){return window.getComputedStyle(n)}class Z0 extends Uh{constructor(){super(...arguments),this.type="html"}readValueFromInstance(e,t){if(Gi.has(t)){const i=Fl(t);return i&&i.default||0}else{const i=K0(e),s=(Md(t)?i.getPropertyValue(t):i[t])||0;return typeof s=="string"?s.trim():s}}measureInstanceViewportBox(e,{transformPagePoint:t}){return Mh(e,t)}build(e,t,i,s){wl(e,t,i,s.transformTemplate)}scrapeMotionValuesFromProps(e,t){return Pl(e,t)}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:e}=this.props;$t(e)&&(this.childSubscription=e.on("change",t=>{this.current&&(this.current.textContent=`${t}`)}))}renderInstance(e,t,i,s){Cd(e,t,i,s)}}class J0 extends Uh{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1}getBaseTargetFromProps(e,t){return e[t]}readValueFromInstance(e,t){if(Gi.has(t)){const i=Fl(t);return i&&i.default||0}return t=Rd.has(t)?t:Sl(t),e.getAttribute(t)}measureInstanceViewportBox(){return wt()}scrapeMotionValuesFromProps(e,t){return Dd(e,t)}build(e,t,i,s){Cl(e,t,i,this.isSVGTag,s.transformTemplate)}renderInstance(e,t,i,s){Pd(e,t,i,s)}mount(e){this.isSVGTag=Rl(e.tagName),super.mount(e)}}const Q0=(n,e)=>Tl(n)?new J0(e,{enableHardwareAcceleration:!1}):new Z0(e,{enableHardwareAcceleration:!0}),ex={layout:{ProjectionNode:Dh,MeasureLayout:Eh}},tx={...Ag,...qp,...L0,...ex},hs=np((n,e)=>Np(n,e,tx,Q0));function Fh(){const n=z.useRef(!1);return yl(()=>(n.current=!0,()=>{n.current=!1}),[]),n}function nx(){const n=Fh(),[e,t]=z.useState(0),i=z.useCallback(()=>{n.current&&t(e+1)},[e]);return[z.useCallback(()=>xt.postRender(i),[i]),e]}class ix extends z.Component{getSnapshotBeforeUpdate(e){const t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){const i=this.props.sizeRef.current;i.height=t.offsetHeight||0,i.width=t.offsetWidth||0,i.top=t.offsetTop,i.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function sx({children:n,isPresent:e}){const t=z.useId(),i=z.useRef(null),s=z.useRef({width:0,height:0,top:0,left:0});return z.useInsertionEffect(()=>{const{width:r,height:a,top:o,left:l}=s.current;if(e||!i.current||!r||!a)return;i.current.dataset.motionPopId=t;const c=document.createElement("style");return document.head.appendChild(c),c.sheet&&c.sheet.insertRule(`
          [data-motion-pop-id="${t}"] {
            position: absolute !important;
            width: ${r}px !important;
            height: ${a}px !important;
            top: ${o}px !important;
            left: ${l}px !important;
          }
        `),()=>{document.head.removeChild(c)}},[e]),z.createElement(ix,{isPresent:e,childRef:i,sizeRef:s},z.cloneElement(n,{ref:i}))}const La=({children:n,initial:e,isPresent:t,onExitComplete:i,custom:s,presenceAffectsLayout:r,mode:a})=>{const o=Ld(rx),l=z.useId(),c=z.useMemo(()=>({id:l,initial:e,isPresent:t,custom:s,onExitComplete:u=>{o.set(u,!0);for(const d of o.values())if(!d)return;i&&i()},register:u=>(o.set(u,!1),()=>o.delete(u))}),r?void 0:[t]);return z.useMemo(()=>{o.forEach((u,d)=>o.set(d,!1))},[t]),z.useEffect(()=>{!t&&!o.size&&i&&i()},[t]),a==="popLayout"&&(n=z.createElement(sx,{isPresent:t},n)),z.createElement(ra.Provider,{value:c},n)};function rx(){return new Map}function ax(n){return z.useEffect(()=>()=>n(),[])}const Di=n=>n.key||"";function ox(n,e){n.forEach(t=>{const i=Di(t);e.set(i,t)})}function lx(n){const e=[];return z.Children.forEach(n,t=>{z.isValidElement(t)&&e.push(t)}),e}const cx=({children:n,custom:e,initial:t=!0,onExitComplete:i,exitBeforeEnter:s,presenceAffectsLayout:r=!0,mode:a="sync"})=>{const o=z.useContext(El).forceRender||nx()[0],l=Fh(),c=lx(n);let u=c;const d=z.useRef(new Map).current,h=z.useRef(u),f=z.useRef(new Map).current,p=z.useRef(!0);if(yl(()=>{p.current=!1,ox(c,f),h.current=u}),ax(()=>{p.current=!0,f.clear(),d.clear()}),p.current)return z.createElement(z.Fragment,null,u.map(_=>z.createElement(La,{key:Di(_),isPresent:!0,initial:t?void 0:!1,presenceAffectsLayout:r,mode:a},_)));u=[...u];const x=h.current.map(Di),g=c.map(Di),m=x.length;for(let _=0;_<m;_++){const y=x[_];g.indexOf(y)===-1&&!d.has(y)&&d.set(y,void 0)}return a==="wait"&&d.size&&(u=[]),d.forEach((_,y)=>{if(g.indexOf(y)!==-1)return;const b=f.get(y);if(!b)return;const w=x.indexOf(y);let A=_;if(!A){const R=()=>{d.delete(y);const L=Array.from(f.keys()).filter(M=>!g.includes(M));if(L.forEach(M=>f.delete(M)),h.current=c.filter(M=>{const E=Di(M);return E===y||L.includes(E)}),!d.size){if(l.current===!1)return;o(),i&&i()}};A=z.createElement(La,{key:Di(b),isPresent:!1,onExitComplete:R,custom:e,presenceAffectsLayout:r,mode:a},b),d.set(y,A)}u.splice(w,0,A)}),u=u.map(_=>{const y=_.key;return d.has(y)?_:z.createElement(La,{key:Di(_),isPresent:!0,presenceAffectsLayout:r,mode:a},_)}),z.createElement(z.Fragment,null,d.size?u:u.map(_=>z.cloneElement(_)))},ux=({agentType:n="planner",activity:e="",progress:t=0,status:i="active",details:s=[],logs:r=[],modelName:a="",isShopping:o=!1})=>{var g,m,_,y;const[l,c]=Fi.useState(!1),[u,d]=Fi.useState(!1),h=Fi.useRef(null),f={planner:{name:"Planner Agent",icon:"Brain",color:"text-neon-cyan",bgColor:"bg-black/80 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]",borderColor:"border-neon-cyan/40"},planning:{name:"Planner Agent",icon:"Brain",color:"text-neon-cyan",bgColor:"bg-black/80 shadow-[inset_0_0_10px_rgba(6,182,212,0.2)]",borderColor:"border-neon-cyan/40"},thinking:{name:"Thinking Agent",icon:"Brain",color:"text-neon-violet",bgColor:"bg-black/80 shadow-[inset_0_0_10px_rgba(139,92,246,0.2)]",borderColor:"border-neon-violet/40"},navigator:{name:"Navigator Agent",icon:"Navigation",color:"text-neon-blue",bgColor:"bg-black/80 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]",borderColor:"border-neon-blue/40"},navigating:{name:"Navigator Agent",icon:"Navigation",color:"text-neon-blue",bgColor:"bg-black/80 shadow-[inset_0_0_10px_rgba(59,130,246,0.2)]",borderColor:"border-neon-blue/40"},validator:{name:"Validator Agent",icon:"CheckCircle2",color:"text-neon-green",bgColor:"bg-black/80 shadow-[inset_0_0_10px_rgba(34,197,94,0.2)]",borderColor:"border-neon-green/40"},validating:{name:"Validator Agent",icon:"CheckCircle2",color:"text-neon-green",bgColor:"bg-black/80 shadow-[inset_0_0_10px_rgba(34,197,94,0.2)]",borderColor:"border-neon-green/40"},generating_image:{name:"Image Agent",icon:"Image",color:"text-neon-magenta",bgColor:"bg-black/80 shadow-[inset_0_0_10px_rgba(236,72,153,0.2)]",borderColor:"border-neon-magenta/40"}},p=(f==null?void 0:f[n])||(f==null?void 0:f.planner),x={navigate:{icon:"Navigation",color:"text-neon-cyan"},think:{icon:"Brain",color:"text-neon-violet"},plan:{icon:"FileText",color:"text-neon-blue"},click:{icon:"MousePointer",color:"text-green-400"},type:{icon:"Keyboard",color:"text-yellow-400"},scroll:{icon:"ArrowDown",color:"text-gray-400"},validate:{icon:"CheckCircle2",color:"text-neon-green"},image:{icon:"Image",color:"text-neon-magenta"},error:{icon:"AlertTriangle",color:"text-red-400"}};return Fi.useEffect(()=>{u&&h.current&&h.current.scrollIntoView({behavior:"smooth"})},[r,u]),S.jsxs("div",{className:`p-4 md:p-5 rounded-lg border ${p==null?void 0:p.borderColor} ${p==null?void 0:p.bgColor} transition-all duration-300`,children:[S.jsxs("div",{className:"flex items-start gap-3 md:gap-4 mb-3",children:[S.jsx("div",{className:`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${p==null?void 0:p.bgColor} border ${p==null?void 0:p.borderColor}`,children:S.jsx(Lt,{name:p==null?void 0:p.icon,size:24,className:p==null?void 0:p.color})}),S.jsxs("div",{className:"flex-1 min-w-0",children:[S.jsxs("div",{className:"flex items-center justify-between gap-2 mb-1",children:[S.jsx("h3",{className:`text-sm md:text-base font-caption font-semibold ${p==null?void 0:p.color}`,children:p==null?void 0:p.name}),S.jsxs("div",{className:"flex items-center gap-2",children:[i==="active"&&S.jsxs("div",{className:"flex items-center gap-1.5",children:[S.jsx("div",{className:`w-2 h-2 rounded-full ${(g=p==null?void 0:p.color)==null?void 0:g.replace("text-","bg-")} animate-pulse`}),S.jsx("span",{className:"text-xs text-muted-foreground",children:"Active"})]}),S.jsx("button",{onClick:()=>c(!l),className:"p-1 hover:bg-black/5 rounded-full transition-colors",children:S.jsx(Lt,{name:l?"ChevronUp":"ChevronDown",size:16,className:"text-muted-foreground"})})]})]}),S.jsx("p",{className:"text-sm text-foreground line-clamp-2",children:e})]})]}),t>0&&n!=="generating_image"&&S.jsxs("div",{className:"mb-3",children:[S.jsxs("div",{className:"flex items-center justify-between mb-1.5",children:[S.jsx("span",{className:"text-xs font-caption text-muted-foreground",children:"Progress"}),S.jsxs("span",{className:"text-xs font-caption font-medium text-foreground",children:[t,"%"]})]}),S.jsx("div",{className:"h-2 bg-muted rounded-full overflow-hidden",children:S.jsx("div",{className:"h-full rounded-full transition-all duration-500 ease-out",style:{width:`${t}%`,background:`linear-gradient(90deg, ${(m=p==null?void 0:p.color)!=null&&m.replace("text-","").includes("cyan")?"#06b6d4":(_=p==null?void 0:p.color)!=null&&_.replace("text-","").includes("violet")?"#8b5cf6":(y=p==null?void 0:p.color)!=null&&y.replace("text-","").includes("blue")?"#3b82f6":"#22c55e"}, transparent)`}})})]}),(s==null?void 0:s.length)>0&&l&&!o&&S.jsxs("div",{className:"mt-3 pt-3 border-t border-white/5 space-y-2 animate-in slide-in-from-top-2 duration-200",children:[S.jsx("div",{className:"text-xs font-semibold text-muted-foreground mb-2",children:"Thinking Process:"}),s==null?void 0:s.map((b,w)=>S.jsxs("div",{className:"flex items-start gap-2 text-xs text-muted-foreground",children:[S.jsx("span",{className:"mt-0.5",children:"•"}),S.jsx("span",{className:"break-words",children:b})]},w))]}),(r==null?void 0:r.length)>0&&S.jsxs("div",{className:"mt-3 pt-3 border-t border-white/5",children:[S.jsxs("button",{onClick:()=>d(!u),className:"w-full flex items-center justify-between text-xs text-gray-500 hover:text-gray-300 transition-colors mb-2",children:[S.jsxs("div",{className:"flex items-center gap-1.5",children:[S.jsx(Lt,{name:"Terminal",size:12}),S.jsx("span",{className:"font-semibold uppercase tracking-wider",children:"Live Logs"}),S.jsx("span",{className:"text-[10px] px-1.5 py-0.5 rounded-full bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20",children:r.length})]}),S.jsx(Lt,{name:u?"ChevronUp":"ChevronDown",size:12})]}),u&&S.jsxs("div",{className:"space-y-1 max-h-40 overflow-y-auto pr-1 scrollbar-thin animate-in slide-in-from-top-2 duration-200 bg-black/40 rounded-md p-2",children:[r.map((b,w)=>{const A=x[b.type]||x.think;return S.jsxs("div",{className:"flex items-start gap-1.5 text-[10px] font-mono",children:[S.jsx("span",{className:"text-gray-600 shrink-0 w-14",children:b.timestamp}),S.jsx(Lt,{name:A.icon,size:10,className:`${A.color} shrink-0 mt-0.5`}),S.jsx("span",{className:"text-gray-400 break-words leading-tight",children:b.message})]},w)}),S.jsx("div",{ref:h})]})]}),n==="generating_image"&&i==="active"&&S.jsxs("div",{className:"mb-2 mt-4 flex flex-col items-center w-full",children:[S.jsx("div",{className:"pixel-loader-grid",children:Array.from({length:36}).map((b,w)=>{const A=Math.random()*2;return S.jsx("div",{className:"pixel",style:{animationDelay:`${A}s`}},w)})}),a&&S.jsxs("div",{className:"mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10",children:[S.jsx("span",{className:"text-[10px] text-muted-foreground uppercase tracking-widest font-semibold font-caption",children:"GENERATING WITH:"}),S.jsx("span",{className:"text-xs text-neon-cyan font-bold capitalize",children:a})]})]})]})},Oh=({plan:n,onApprove:e,onReject:t})=>n?S.jsxs("div",{className:"border border-border rounded-lg bg-card p-4 my-4 shadow-sm",children:[S.jsxs("div",{className:"flex items-center gap-2 mb-3 pb-3 border-b border-border",children:[S.jsx(Lt,{name:"Map",size:18,className:"text-primary"}),S.jsx("h3",{className:"font-semibold text-sm text-foreground",children:"Proposed Execution Plan"})]}),S.jsx("div",{className:"space-y-3 mb-4",children:n.steps&&n.steps.map((i,s)=>S.jsxs("div",{className:"flex gap-3 text-sm",children:[S.jsx("div",{className:"flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground",children:s+1}),S.jsxs("div",{className:"flex-1",children:[S.jsx("p",{className:"text-foreground font-medium",children:i.description}),i.url&&S.jsx("p",{className:"text-xs text-muted-foreground font-mono mt-0.5",children:i.url})]})]},s))}),S.jsxs("div",{className:"flex gap-2 pt-2",children:[S.jsx(nc,{variant:"default",size:"sm",className:"flex-1 bg-green-600 hover:bg-green-700 text-white",onClick:e,iconName:"Check",children:"Approve Plan"}),S.jsx(nc,{variant:"outline",size:"sm",className:"flex-1 text-destructive border-destructive/30 hover:bg-destructive/10",onClick:t,iconName:"X",children:"Reject"})]})]}):null,dx=({message:n,onRetry:e,onEdit:t,onRemix:i})=>{var A,R,L,M;const s=n.role==="user";n.role;const[r,a]=z.useState(!1),[o,l]=z.useState(n.content),[c,u]=z.useState(null);z.useEffect(()=>{l(n.content)},[n.content]);const d=()=>{t&&o.trim()!==n.content&&t(o),a(!1)},[h,f]=z.useState(!1),p=z.useRef(null),x=E=>{if(!E)return"";let D=E;return D=D.replace(/```[\s\S]*?```/g,"Code snippet provided."),D=D.replace(/`([^`]+)`/g,"$1"),D=D.replace(/\[([^\]]+)\]\([^\)]+\)/g,"$1"),D=D.replace(/(https?:\/\/[^\s]+)/g,"Link"),D=D.replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g,"$1"),D=D.replace(/^#+\s+/gm,""),D=D.replace(/#(\w+)/g,"$1"),D=D.replace(/^>\s+/gm,""),D=D.replace(/\s+/g," ").trim(),D};z.useEffect(()=>()=>{p.current&&window.speechSynthesis.cancel()},[]);const g=()=>{if(h){window.speechSynthesis.cancel(),f(!1);return}const E=typeof n.content=="string"?n.content:"",D=x(E)||"Content not available for speech.",F=new SpeechSynthesisUtterance(D),G=window.speechSynthesis.getVoices().find(q=>q.name.includes("Zira")||q.name.includes("Google US English")||q.name.includes("Samantha")||q.name.toLowerCase().includes("female"));G&&(F.voice=G,G.name.includes("Zira")||(F.pitch=1.1)),F.onend=()=>{f(!1),p.current=null},F.onerror=()=>{f(!1),p.current=null},p.current=F,window.speechSynthesis.speak(F),f(!0)},m=(E,D)=>{E.stopPropagation();const F=document.createElement("a");F.href=D,F.download=`generated-image-${Date.now()}.png`,document.body.appendChild(F),F.click(),document.body.removeChild(F)},_=({src:E,alt:D,modelName:F})=>S.jsxs("div",{className:"relative group/image my-2 inline-block max-w-full",children:[S.jsx("div",{className:"animate-in fade-in zoom-in-95 duration-700 ease-out",children:S.jsx("img",{src:E,alt:D,className:"max-w-full rounded-lg shadow-lg border border-white/10 cursor-pointer transition-transform duration-500 group-hover/image:scale-[1.02]",style:{maxHeight:"300px",objectFit:"contain"},loading:"lazy",onClick:()=>u(E)})}),S.jsxs("div",{className:"absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 rounded-lg flex flex-col p-3 backdrop-blur-[2px] cursor-pointer",onClick:()=>u(E),children:[F&&S.jsx("div",{className:"absolute top-2 left-2 z-10 transition-opacity",children:S.jsx("span",{className:"px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-neon-cyan bg-black/60 border border-neon-cyan/30 rounded backdrop-blur-md shadow-[0_0_8px_rgba(6,182,212,0.3)]",children:F})}),S.jsxs("div",{className:"absolute top-2 right-2 flex gap-1 z-10",children:[S.jsx("button",{onClick:O=>{O.stopPropagation(),m(O,E)},className:"p-1.5 hover:bg-white/20 rounded text-white transition-colors bg-black/60 backdrop-blur-sm",title:"Download",children:S.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[S.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),S.jsx("polyline",{points:"7 10 12 15 17 10"}),S.jsx("line",{x1:"12",x2:"12",y1:"15",y2:"3"})]})}),S.jsx("button",{onClick:O=>{O.stopPropagation(),u(E)},className:"p-1.5 hover:bg-white/20 rounded text-white transition-colors bg-black/60 backdrop-blur-sm",title:"View Fullscreen",children:S.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[S.jsx("polyline",{points:"15 3 21 3 21 9"}),S.jsx("polyline",{points:"9 21 3 21 3 15"}),S.jsx("line",{x1:"21",x2:"14",y1:"3",y2:"10"}),S.jsx("line",{x1:"3",x2:"10",y1:"21",y2:"14"})]})})]}),S.jsx("div",{className:"flex flex-col gap-2 items-center justify-end h-full mt-4 pb-2 relative z-10"})]})]}),y=s?"border-neon-blue/40":"border-neon-cyan/40",b=s?"bg-slate-900/60 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]":"bg-black/70 shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]",w={hidden:{opacity:0,y:10,scale:.95},visible:{opacity:1,y:0,scale:1}};return S.jsxs(S.Fragment,{children:[S.jsx(hs.div,{initial:"hidden",animate:"visible",variants:w,transition:{duration:.3,ease:"backOut"},className:`flex w-full mb-4 ${s?"justify-end":"justify-start"}`,children:S.jsxs("div",{className:`
                relative max-w-[85%] rounded-2xl p-4 group
                ${b} backdrop-blur-md 
                border ${y}
                shadow-[0_4px_16px_rgba(0,0,0,0.2)]
                ${s?"rounded-tr-none shadow-[0_0_15px_rgba(59,130,246,0.1)]":"rounded-tl-none shadow-[0_0_15px_rgba(6,182,212,0.1)]"}
            `,children:[S.jsxs("div",{className:"flex items-center justify-between gap-2 mb-2 pb-2 border-b border-white/5 opacity-80 group-hover:opacity-100 transition-opacity",children:[S.jsxs("div",{className:"flex items-center gap-2",children:[s?S.jsxs(S.Fragment,{children:[S.jsx("span",{className:"text-[10px] font-mono text-neon-blue/70",children:"COMMANDER"}),n.isVoice&&S.jsx(vl,{className:"w-3 h-3 text-neon-cyan",title:"Voice input"}),S.jsx(bf,{className:"w-3 h-3 text-neon-blue"})]}):S.jsxs(S.Fragment,{children:[S.jsx(Ef,{className:"w-3 h-3 text-neon-cyan"}),S.jsx("span",{className:"text-[10px] font-mono text-neon-cyan/70",children:"CORE SYSTEM"})]}),n.timestamp&&S.jsx("span",{className:"text-[10px] text-gray-400 ml-2 font-mono",children:new Date(n.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})})]}),!r&&S.jsxs("div",{className:"flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",children:[S.jsx("button",{onClick:g,className:`p-1 hover:bg-white/10 rounded transition-colors ${h?"text-neon-cyan animate-pulse":"text-white/50 hover:text-white"}`,title:h?"Stop Speaking":"Read Aloud",children:h?S.jsx(Tf,{size:12,fill:"currentColor"}):S.jsx(wf,{size:12})}),S.jsx("button",{onClick:()=>navigator.clipboard.writeText(typeof n.content=="string"?n.content:""),className:"p-1 hover:bg-white/10 rounded transition-colors text-white/50 hover:text-white",title:"Copy",children:S.jsx(Af,{size:12})}),s&&S.jsx("button",{onClick:()=>a(!0),className:"p-1 hover:bg-white/10 rounded transition-colors text-white/50 hover:text-white",title:"Edit",children:S.jsx(Cf,{size:12})}),S.jsx("button",{onClick:()=>e&&e(),className:"p-1 hover:bg-white/10 rounded transition-colors text-white/50 hover:text-white",title:"Regenerate",children:S.jsx(Rf,{size:12})})]})]}),s&&n.attachments&&n.attachments.length>0&&S.jsx("div",{className:"flex flex-wrap gap-2 mb-2 pb-2 border-b border-white/5",children:n.attachments.map((E,D)=>{const F=E.type==="image"?S.jsx(Pf,{size:14,className:"text-neon-magenta"}):E.type==="video"?S.jsx(Df,{size:14,className:"text-neon-cyan"}):S.jsx(Lf,{size:14,className:"text-neon-blue"}),O=E.size>1024*1024?`${(E.size/(1024*1024)).toFixed(1)} MB`:`${(E.size/1024).toFixed(1)} KB`;return S.jsxs("div",{className:"flex items-center gap-1.5 bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-[10px] text-white/80",children:[F,S.jsx("span",{className:"truncate max-w-[100px] font-mono",children:E.name}),S.jsx("span",{className:"text-white/30",children:O})]},D)})}),S.jsx("div",{className:`text-base ${s?"text-white font-body":"text-gray-100 font-body"}`,children:r?S.jsxs("div",{className:"flex flex-col gap-2",children:[S.jsx("textarea",{value:o,onChange:E=>l(E.target.value),className:"w-full bg-black/50 border border-white/10 rounded-lg p-2 text-white outline-none focus:border-neon-cyan/50 min-h-[60px]",autoFocus:!0}),S.jsxs("div",{className:"flex justify-end gap-2",children:[S.jsx("button",{onClick:()=>a(!1),className:"text-xs px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-gray-300",children:"Cancel"}),S.jsx("button",{onClick:d,className:"text-xs px-2 py-1 bg-neon-cyan/20 hover:bg-neon-cyan/30 text-neon-cyan border border-neon-cyan/50 rounded",children:"Save & Submit"})]})]}):S.jsxs(S.Fragment,{children:[n.content&&typeof n.content=="string"?S.jsx("div",{className:"prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10",children:S.jsx(Gf,{remarkPlugins:[Hf],components:{img:({node:E,...D})=>{var F;return S.jsx(_,{src:D.src,alt:D.alt,modelName:(F=n.metadata)==null?void 0:F.imageModel})}},children:n.content})}):typeof n.content=="object"?JSON.stringify(n.content,null,2):String(n.content),((A=n.metadata)==null?void 0:A.type)==="error"&&((R=n.metadata)==null?void 0:R.errorDetails)&&S.jsx("div",{className:"mt-3 border border-red-500/30 bg-red-900/20 rounded-lg p-3",children:S.jsxs("details",{children:[S.jsxs("summary",{className:"text-xs text-red-400 font-bold cursor-pointer outline-none flex items-center gap-1 group",children:[S.jsx("span",{className:"group-open:rotate-90 transition-transform",children:"▸"})," Error Details"]}),S.jsx("div",{className:"mt-2 text-[11px] font-mono text-white/80 whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar",children:n.metadata.errorDetails})]})}),((L=n.metadata)==null?void 0:L.type)==="agent_activity"&&S.jsx("div",{className:"mt-3",children:S.jsx(ux,{activity:n.metadata.activity,status:n.metadata.status||"in_progress"})}),((M=n.metadata)==null?void 0:M.type)==="implementation_plan_review"&&S.jsx("div",{className:"mt-3",children:S.jsx(Oh,{plan:n.metadata.plan})})]})}),!r&&S.jsx("div",{className:`absolute bottom-0 ${s?"right-0 w-1/3":"left-0 w-1/3"} h-[1px] bg-gradient-to-r from-transparent via-${s?"neon-blue":"neon-cyan"} to-transparent opacity-50`})]})}),c&&S.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200",onClick:()=>u(null),children:S.jsxs("div",{className:"relative max-w-full max-h-full flex items-center justify-center",children:[S.jsx("img",{src:c,alt:"Extended View",className:"max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain",onClick:E=>E.stopPropagation()}),S.jsx("button",{onClick:()=>u(null),className:"absolute -top-12 right-0 p-2 text-white/70 hover:text-white bg-black/50 rounded-full",children:S.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[S.jsx("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),S.jsx("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})}),S.jsx("button",{onClick:E=>m(E,c),className:"absolute -top-12 right-12 p-2 text-white/70 hover:text-white mr-2 bg-black/50 rounded-full",children:S.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[S.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),S.jsx("polyline",{points:"7 10 12 15 17 10"}),S.jsx("line",{x1:"12",x2:"12",y1:"15",y2:"3"})]})})]})})]})},hx=Fi.memo(dx,(n,e)=>n.message.content===e.message.content&&n.message.role===e.message.role&&n.message.isVoice===e.message.isVoice&&JSON.stringify(n.message.attachments)===JSON.stringify(e.message.attachments)&&JSON.stringify(n.message.metadata)===JSON.stringify(e.message.metadata)),fx=({onSendMessage:n,disabled:e,value:t,onChange:i,onVoiceToggle:s,isRecording:r,attachments:a=[],onRemoveAttachment:o,onAddAttachments:l,isProcessing:c,onStop:u,onPlusClick:d,onEnhance:h,isEnhancing:f})=>{const p=z.useRef(null);z.useEffect(()=>{p.current&&(p.current.style.height="auto",p.current.style.height=`${Math.min(p.current.scrollHeight,120)}px`)},[t]);const x=g=>{g.key==="Enter"&&!g.shiftKey&&(g.preventDefault(),(t.trim()||a.length>0)&&n({text:t,attachments:a}))};return S.jsxs("div",{className:"relative w-full px-2 pb-2",children:[S.jsxs("div",{className:`
                relative flex items-end gap-2 p-2 
                rounded-2xl border transition-all duration-300
                glass-panel
                ${r?"border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]":"border-neon-cyan/30 hover:border-neon-cyan/60 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]"}
            `,children:[S.jsx("button",{onClick:d,className:"p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neon-cyan transition-colors",title:"Add content",children:S.jsx(If,{size:18})}),S.jsxs("div",{className:"flex-1 flex flex-col min-w-0",children:[a.length>0&&S.jsx("div",{className:"flex gap-2 mb-2 overflow-x-auto py-1 px-1",children:a.map((g,m)=>S.jsxs("div",{className:"flex items-center gap-1.5 bg-white/10 px-2 py-1 rounded text-xs text-white border border-white/10",children:[S.jsx("span",{className:"truncate max-w-[80px]",children:g.name}),S.jsx("button",{onClick:()=>o(m),className:"hover:text-red-400",children:"×"})]},m))}),S.jsx("textarea",{ref:p,value:t,onChange:g=>i(g.target.value),onKeyDown:x,placeholder:r?"Listening...":"Command the agent...",disabled:e,rows:1,className:"w-full bg-transparent border-none text-sm text-white placeholder-gray-400 focus:ring-0 resize-none py-2.5 max-h-[120px]"})]}),S.jsxs("div",{className:"flex items-end gap-1",children:[S.jsx("button",{onClick:s,className:`p-2.5 rounded-xl transition-all duration-300 ${r?"text-red-500 bg-red-500/10 animate-pulse":"text-gray-400 hover:text-white hover:bg-white/5"}`,title:"Voice Input",children:S.jsx(vl,{size:18})}),h&&S.jsx("button",{onClick:h,disabled:!t||t.trim().length===0||f,className:`p-2.5 rounded-xl transition-all duration-300 ${f?"text-neon-magenta animate-pulse":"text-gray-400 hover:text-neon-magenta hover:bg-neon-magenta/10"}`,title:"Enhance Prompt (AI)",children:S.jsx(Nf,{size:18})}),c?S.jsx("button",{onClick:u,className:"p-2.5 rounded-xl bg-red-500/80 hover:bg-red-600 text-white shadow-lg transition-all hover:scale-105",children:S.jsx(Uf,{size:18,className:"animate-pulse"})}):S.jsx("button",{onClick:()=>{(t.trim()||a.length>0)&&n({text:t,attachments:a})},disabled:!t.trim()&&a.length===0,className:`
                                p-2.5 rounded-xl transition-all duration-300 transform
                                ${t.trim()||a.length>0?"bg-neon-cyan text-black shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 hover:bg-cyan-300":"bg-white/5 text-gray-500 cursor-not-allowed"}
                            `,children:S.jsx(Ff,{size:18})})]})]}),S.jsx("div",{className:"absolute -bottom-1 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent blur-[2px]"})]})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gl="182",px=0,hu=1,mx=2,kr=1,gx=2,Os=3,mi=0,Ht=1,Tn=2,Yn=0,fs=1,Pn=2,fu=3,pu=4,xx=5,Ii=100,_x=101,vx=102,yx=103,Sx=104,Mx=200,bx=201,Ex=202,Tx=203,Eo=204,To=205,wx=206,Ax=207,Cx=208,Rx=209,Px=210,Dx=211,Lx=212,Ix=213,Nx=214,wo=0,Ao=1,Co=2,xs=3,Ro=4,Po=5,Do=6,Lo=7,Bh=0,Ux=1,Fx=2,Un=0,Vh=1,kh=2,zh=3,Gh=4,Hh=5,Wh=6,jh=7,Xh=300,zi=301,_s=302,Io=303,No=304,ha=306,Uo=1e3,jn=1001,Fo=1002,It=1003,Ox=1004,pr=1005,Ot=1006,Ia=1007,Bi=1008,an=1009,qh=1010,Yh=1011,Ys=1012,Hl=1013,On=1014,Ln=1015,Zn=1016,Wl=1017,jl=1018,$s=1020,$h=35902,Kh=35899,Zh=1021,Jh=1022,An=1023,Jn=1026,Vi=1027,Qh=1028,Xl=1029,vs=1030,ql=1031,Yl=1033,zr=33776,Gr=33777,Hr=33778,Wr=33779,Oo=35840,Bo=35841,Vo=35842,ko=35843,zo=36196,Go=37492,Ho=37496,Wo=37488,jo=37489,Xo=37490,qo=37491,Yo=37808,$o=37809,Ko=37810,Zo=37811,Jo=37812,Qo=37813,el=37814,tl=37815,nl=37816,il=37817,sl=37818,rl=37819,al=37820,ol=37821,ll=36492,cl=36494,ul=36495,dl=36283,hl=36284,fl=36285,pl=36286,Bx=3200,Vx=0,kx=1,ui="",gn="srgb",ys="srgb-linear",ea="linear",ht="srgb",ji=7680,mu=519,zx=512,Gx=513,Hx=514,$l=515,Wx=516,jx=517,Kl=518,Xx=519,gu=35044,xu="300 es",In=2e3,ta=2001;function ef(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function na(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function qx(){const n=na("canvas");return n.style.display="block",n}const _u={};function vu(...n){const e="THREE."+n.shift();console.log(e,...n)}function We(...n){const e="THREE."+n.shift();console.warn(e,...n)}function lt(...n){const e="THREE."+n.shift();console.error(e,...n)}function Ks(...n){const e=n.join(" ");e in _u||(_u[e]=!0,We(...n))}function Yx(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}class Ms{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let yu=1234567;const Hs=Math.PI/180,Zs=180/Math.PI;function bs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]).toLowerCase()}function Je(n,e,t){return Math.max(e,Math.min(t,n))}function Zl(n,e){return(n%e+e)%e}function $x(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Kx(n,e,t){return n!==e?(t-n)/(e-n):0}function Ws(n,e,t){return(1-t)*n+t*e}function Zx(n,e,t,i){return Ws(n,e,1-Math.exp(-t*i))}function Jx(n,e=1){return e-Math.abs(Zl(n,e*2)-e)}function Qx(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function e_(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function t_(n,e){return n+Math.floor(Math.random()*(e-n+1))}function n_(n,e){return n+Math.random()*(e-n)}function i_(n){return n*(.5-Math.random())}function s_(n){n!==void 0&&(yu=n);let e=yu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function r_(n){return n*Hs}function a_(n){return n*Zs}function o_(n){return(n&n-1)===0&&n!==0}function l_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function c_(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function u_(n,e,t,i,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),d=r((e-i)/2),h=a((e-i)/2),f=r((i-e)/2),p=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*d,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*p,l*f,o*c);break;case"YXY":n.set(l*f,o*u,l*p,o*c);break;case"ZYZ":n.set(l*p,l*f,o*u,o*c);break;default:We("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function rs(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Vt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const Si={DEG2RAD:Hs,RAD2DEG:Zs,generateUUID:bs,clamp:Je,euclideanModulo:Zl,mapLinear:$x,inverseLerp:Kx,lerp:Ws,damp:Zx,pingpong:Jx,smoothstep:Qx,smootherstep:e_,randInt:t_,randFloat:n_,randFloatSpread:i_,seededRandom:s_,degToRad:r_,radToDeg:a_,isPowerOfTwo:o_,ceilPowerOfTwo:l_,floorPowerOfTwo:c_,setQuaternionFromProperEuler:u_,normalize:Vt,denormalize:rs};class nt{constructor(e=0,t=0){nt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ir{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],f=r[a+1],p=r[a+2],x=r[a+3];if(o<=0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(o>=1){e[t+0]=h,e[t+1]=f,e[t+2]=p,e[t+3]=x;return}if(d!==x||l!==h||c!==f||u!==p){let g=l*h+c*f+u*p+d*x;g<0&&(h=-h,f=-f,p=-p,x=-x,g=-g);let m=1-o;if(g<.9995){const _=Math.acos(g),y=Math.sin(_);m=Math.sin(m*_)/y,o=Math.sin(o*_)/y,l=l*m+h*o,c=c*m+f*o,u=u*m+p*o,d=d*m+x*o}else{l=l*m+h*o,c=c*m+f*o,u=u*m+p*o,d=d*m+x*o;const _=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=_,c*=_,u*=_,d*=_}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){const o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],h=r[a+1],f=r[a+2],p=r[a+3];return e[t]=o*p+u*d+l*f-c*h,e[t+1]=l*p+u*h+c*d-o*f,e[t+2]=c*p+u*f+o*h-l*d,e[t+3]=u*p-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),h=l(i/2),f=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"YXZ":this._x=h*u*d+c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"ZXY":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d-h*f*p;break;case"ZYX":this._x=h*u*d-c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d+h*f*p;break;case"YZX":this._x=h*u*d+c*f*p,this._y=c*f*d+h*u*p,this._z=c*u*p-h*f*d,this._w=c*u*d-h*f*p;break;case"XZY":this._x=h*u*d-c*f*p,this._y=c*f*d-h*u*p,this._z=c*u*p+h*f*d,this._w=c*u*d+h*f*p;break;default:We("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Je(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class V{constructor(e=0,t=0,i=0){V.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Su.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Su.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Na.copy(this).projectOnVector(e),this.sub(Na)}reflect(e){return this.sub(Na.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Je(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Na=new V,Su=new ir;class $e{constructor(e,t,i,s,r,a,o,l,c){$e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],p=i[8],x=s[0],g=s[3],m=s[6],_=s[1],y=s[4],b=s[7],w=s[2],A=s[5],R=s[8];return r[0]=a*x+o*_+l*w,r[3]=a*g+o*y+l*A,r[6]=a*m+o*b+l*R,r[1]=c*x+u*_+d*w,r[4]=c*g+u*y+d*A,r[7]=c*m+u*b+d*R,r[2]=h*x+f*_+p*w,r[5]=h*g+f*y+p*A,r[8]=h*m+f*b+p*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*r,f=c*r-a*l,p=t*d+i*h+s*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/p;return e[0]=d*x,e[1]=(s*c-u*i)*x,e[2]=(o*i-s*a)*x,e[3]=h*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=f*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ua.makeScale(e,t)),this}rotate(e){return this.premultiply(Ua.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ua.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ua=new $e,Mu=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),bu=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function d_(){const n={enabled:!0,workingColorSpace:ys,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ht&&(s.r=$n(s.r),s.g=$n(s.g),s.b=$n(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ht&&(s.r=ps(s.r),s.g=ps(s.g),s.b=ps(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ui?ea:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ks("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ks("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ys]:{primaries:e,whitePoint:i,transfer:ea,toXYZ:Mu,fromXYZ:bu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:gn},outputColorSpaceConfig:{drawingBufferColorSpace:gn}},[gn]:{primaries:e,whitePoint:i,transfer:ht,toXYZ:Mu,fromXYZ:bu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:gn}}}),n}const st=d_();function $n(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ps(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Xi;class h_{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Xi===void 0&&(Xi=na("canvas")),Xi.width=e.width,Xi.height=e.height;const s=Xi.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Xi}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=na("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=$n(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor($n(t[i]/255)*255):t[i]=$n(t[i]);return{data:t,width:e.width,height:e.height}}else return We("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let f_=0;class Jl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:f_++}),this.uuid=bs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Fa(s[a].image)):r.push(Fa(s[a]))}else r=Fa(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function Fa(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?h_.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(We("Texture: Unable to serialize Texture."),{})}let p_=0;const Oa=new V;class Wt extends Ms{constructor(e=Wt.DEFAULT_IMAGE,t=Wt.DEFAULT_MAPPING,i=jn,s=jn,r=Ot,a=Bi,o=An,l=an,c=Wt.DEFAULT_ANISOTROPY,u=ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:p_++}),this.uuid=bs(),this.name="",this.source=new Jl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Oa).x}get height(){return this.source.getSize(Oa).y}get depth(){return this.source.getSize(Oa).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){We(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){We(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Xh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Uo:e.x=e.x-Math.floor(e.x);break;case jn:e.x=e.x<0?0:1;break;case Fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Uo:e.y=e.y-Math.floor(e.y);break;case jn:e.y=e.y<0?0:1;break;case Fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Wt.DEFAULT_IMAGE=null;Wt.DEFAULT_MAPPING=Xh;Wt.DEFAULT_ANISOTROPY=1;class bt{constructor(e=0,t=0,i=0,s=1){bt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],p=l[9],x=l[2],g=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(p-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,b=(f+1)/2,w=(m+1)/2,A=(u+h)/4,R=(d+x)/4,L=(p+g)/4;return y>b&&y>w?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=A/i,r=R/i):b>w?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=A/s,r=L/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=R/r,s=L/r),this.set(i,s,r,t),this}let _=Math.sqrt((g-p)*(g-p)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(_)<.001&&(_=1),this.x=(g-p)/_,this.y=(d-x)/_,this.z=(h-u)/_,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Je(this.x,e.x,t.x),this.y=Je(this.y,e.y,t.y),this.z=Je(this.z,e.z,t.z),this.w=Je(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Je(this.x,e,t),this.y=Je(this.y,e,t),this.z=Je(this.z,e,t),this.w=Je(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Je(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class m_ extends Ms{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ot,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new bt(0,0,e,t),this.scissorTest=!1,this.viewport=new bt(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new Wt(s);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:Ot,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Jl(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fn extends m_{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class tf extends Wt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class g_ extends Wt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=It,this.minFilter=It,this.wrapR=jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sr{constructor(e=new V(1/0,1/0,1/0),t=new V(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,yn):yn.fromBufferAttribute(r,a),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),mr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),mr.copy(i.boundingBox)),mr.applyMatrix4(e.matrixWorld),this.union(mr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Rs),gr.subVectors(this.max,Rs),qi.subVectors(e.a,Rs),Yi.subVectors(e.b,Rs),$i.subVectors(e.c,Rs),ei.subVectors(Yi,qi),ti.subVectors($i,Yi),Mi.subVectors(qi,$i);let t=[0,-ei.z,ei.y,0,-ti.z,ti.y,0,-Mi.z,Mi.y,ei.z,0,-ei.x,ti.z,0,-ti.x,Mi.z,0,-Mi.x,-ei.y,ei.x,0,-ti.y,ti.x,0,-Mi.y,Mi.x,0];return!Ba(t,qi,Yi,$i,gr)||(t=[1,0,0,0,1,0,0,0,1],!Ba(t,qi,Yi,$i,gr))?!1:(xr.crossVectors(ei,ti),t=[xr.x,xr.y,xr.z],Ba(t,qi,Yi,$i,gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Vn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Vn=[new V,new V,new V,new V,new V,new V,new V,new V],yn=new V,mr=new sr,qi=new V,Yi=new V,$i=new V,ei=new V,ti=new V,Mi=new V,Rs=new V,gr=new V,xr=new V,bi=new V;function Ba(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){bi.fromArray(n,r);const o=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),l=e.dot(bi),c=t.dot(bi),u=i.dot(bi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const x_=new sr,Ps=new V,Va=new V;class fa{constructor(e=new V,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):x_.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ps.subVectors(e,this.center);const t=Ps.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(Ps,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Va.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ps.copy(e.center).add(Va)),this.expandByPoint(Ps.copy(e.center).sub(Va))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const kn=new V,ka=new V,_r=new V,ni=new V,za=new V,vr=new V,Ga=new V;class nf{constructor(e=new V,t=new V(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(kn.copy(this.origin).addScaledVector(this.direction,t),kn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ka.copy(e).add(t).multiplyScalar(.5),_r.copy(t).sub(e).normalize(),ni.copy(this.origin).sub(ka);const r=e.distanceTo(t)*.5,a=-this.direction.dot(_r),o=ni.dot(this.direction),l=-ni.dot(_r),c=ni.lengthSq(),u=Math.abs(1-a*a);let d,h,f,p;if(u>0)if(d=a*l-o,h=a*o-l,p=r*u,d>=0)if(h>=-p)if(h<=p){const x=1/u;d*=x,h*=x,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-p?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=p?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ka).addScaledVector(_r,h),f}intersectSphere(e,t){kn.subVectors(e.center,this.origin);const i=kn.dot(this.direction),s=kn.dot(kn)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,kn)!==null}intersectTriangle(e,t,i,s,r){za.subVectors(t,e),vr.subVectors(i,e),Ga.crossVectors(za,vr);let a=this.direction.dot(Ga),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ni.subVectors(this.origin,e);const l=o*this.direction.dot(vr.crossVectors(ni,vr));if(l<0)return null;const c=o*this.direction.dot(za.cross(ni));if(c<0||l+c>a)return null;const u=-o*ni.dot(Ga);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,t,i,s,r,a,o,l,c,u,d,h,f,p,x,g){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,d,h,f,p,x,g)}set(e,t,i,s,r,a,o,l,c,u,d,h,f,p,x,g){const m=this.elements;return m[0]=e,m[4]=t,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=p,m[11]=x,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,i=e.elements,s=1/Ki.setFromMatrixColumn(e,0).length(),r=1/Ki.setFromMatrixColumn(e,1).length(),a=1/Ki.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=a*u,f=a*d,p=o*u,x=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+p*c,t[5]=h-x*c,t[9]=-o*l,t[2]=x-h*c,t[6]=p+f*c,t[10]=a*l}else if(e.order==="YXZ"){const h=l*u,f=l*d,p=c*u,x=c*d;t[0]=h+x*o,t[4]=p*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-p,t[6]=x+h*o,t[10]=a*l}else if(e.order==="ZXY"){const h=l*u,f=l*d,p=c*u,x=c*d;t[0]=h-x*o,t[4]=-a*d,t[8]=p+f*o,t[1]=f+p*o,t[5]=a*u,t[9]=x-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const h=a*u,f=a*d,p=o*u,x=o*d;t[0]=l*u,t[4]=p*c-f,t[8]=h*c+x,t[1]=l*d,t[5]=x*c+h,t[9]=f*c-p,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const h=a*l,f=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=x-h*d,t[8]=p*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+p,t[10]=h-x*d}else if(e.order==="XZY"){const h=a*l,f=a*c,p=o*l,x=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+x,t[5]=a*u,t[9]=f*d-p,t[2]=p*d-f,t[6]=o*u,t[10]=x*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(__,e,v_)}lookAt(e,t,i){const s=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),ii.crossVectors(i,tn),ii.lengthSq()===0&&(Math.abs(i.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),ii.crossVectors(i,tn)),ii.normalize(),yr.crossVectors(tn,ii),s[0]=ii.x,s[4]=yr.x,s[8]=tn.x,s[1]=ii.y,s[5]=yr.y,s[9]=tn.y,s[2]=ii.z,s[6]=yr.z,s[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],p=i[2],x=i[6],g=i[10],m=i[14],_=i[3],y=i[7],b=i[11],w=i[15],A=s[0],R=s[4],L=s[8],M=s[12],E=s[1],D=s[5],F=s[9],O=s[13],G=s[2],q=s[6],k=s[10],X=s[14],Z=s[3],ce=s[7],ue=s[11],te=s[15];return r[0]=a*A+o*E+l*G+c*Z,r[4]=a*R+o*D+l*q+c*ce,r[8]=a*L+o*F+l*k+c*ue,r[12]=a*M+o*O+l*X+c*te,r[1]=u*A+d*E+h*G+f*Z,r[5]=u*R+d*D+h*q+f*ce,r[9]=u*L+d*F+h*k+f*ue,r[13]=u*M+d*O+h*X+f*te,r[2]=p*A+x*E+g*G+m*Z,r[6]=p*R+x*D+g*q+m*ce,r[10]=p*L+x*F+g*k+m*ue,r[14]=p*M+x*O+g*X+m*te,r[3]=_*A+y*E+b*G+w*Z,r[7]=_*R+y*D+b*q+w*ce,r[11]=_*L+y*F+b*k+w*ue,r[15]=_*M+y*O+b*X+w*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],p=e[3],x=e[7],g=e[11],m=e[15],_=l*f-c*h,y=o*f-c*d,b=o*h-l*d,w=a*f-c*u,A=a*h-l*u,R=a*d-o*u;return t*(x*_-g*y+m*b)-i*(p*_-g*w+m*A)+s*(p*y-x*w+m*R)-r*(p*b-x*A+g*R)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],p=e[12],x=e[13],g=e[14],m=e[15],_=d*g*c-x*h*c+x*l*f-o*g*f-d*l*m+o*h*m,y=p*h*c-u*g*c-p*l*f+a*g*f+u*l*m-a*h*m,b=u*x*c-p*d*c+p*o*f-a*x*f-u*o*m+a*d*m,w=p*d*l-u*x*l-p*o*h+a*x*h+u*o*g-a*d*g,A=t*_+i*y+s*b+r*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/A;return e[0]=_*R,e[1]=(x*h*r-d*g*r-x*s*f+i*g*f+d*s*m-i*h*m)*R,e[2]=(o*g*r-x*l*r+x*s*c-i*g*c-o*s*m+i*l*m)*R,e[3]=(d*l*r-o*h*r-d*s*c+i*h*c+o*s*f-i*l*f)*R,e[4]=y*R,e[5]=(u*g*r-p*h*r+p*s*f-t*g*f-u*s*m+t*h*m)*R,e[6]=(p*l*r-a*g*r-p*s*c+t*g*c+a*s*m-t*l*m)*R,e[7]=(a*h*r-u*l*r+u*s*c-t*h*c-a*s*f+t*l*f)*R,e[8]=b*R,e[9]=(p*d*r-u*x*r-p*i*f+t*x*f+u*i*m-t*d*m)*R,e[10]=(a*x*r-p*o*r+p*i*c-t*x*c-a*i*m+t*o*m)*R,e[11]=(u*o*r-a*d*r-u*i*c+t*d*c+a*i*f-t*o*f)*R,e[12]=w*R,e[13]=(u*x*s-p*d*s+p*i*h-t*x*h-u*i*g+t*d*g)*R,e[14]=(p*o*s-a*x*s-p*i*l+t*x*l+a*i*g-t*o*g)*R,e[15]=(a*d*s-u*o*s+u*i*l-t*d*l-a*i*h+t*o*h)*R,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,h=r*c,f=r*u,p=r*d,x=a*u,g=a*d,m=o*d,_=l*c,y=l*u,b=l*d,w=i.x,A=i.y,R=i.z;return s[0]=(1-(x+m))*w,s[1]=(f+b)*w,s[2]=(p-y)*w,s[3]=0,s[4]=(f-b)*A,s[5]=(1-(h+m))*A,s[6]=(g+_)*A,s[7]=0,s[8]=(p+y)*R,s[9]=(g-_)*R,s[10]=(1-(h+x))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;if(e.x=s[12],e.y=s[13],e.z=s[14],this.determinant()===0)return i.set(1,1,1),t.identity(),this;let r=Ki.set(s[0],s[1],s[2]).length();const a=Ki.set(s[4],s[5],s[6]).length(),o=Ki.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),Sn.copy(this);const c=1/r,u=1/a,d=1/o;return Sn.elements[0]*=c,Sn.elements[1]*=c,Sn.elements[2]*=c,Sn.elements[4]*=u,Sn.elements[5]*=u,Sn.elements[6]*=u,Sn.elements[8]*=d,Sn.elements[9]*=d,Sn.elements[10]*=d,t.setFromRotationMatrix(Sn),i.x=r,i.y=a,i.z=o,this}makePerspective(e,t,i,s,r,a,o=In,l=!1){const c=this.elements,u=2*r/(t-e),d=2*r/(i-s),h=(t+e)/(t-e),f=(i+s)/(i-s);let p,x;if(l)p=r/(a-r),x=a*r/(a-r);else if(o===In)p=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===ta)p=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=In,l=!1){const c=this.elements,u=2/(t-e),d=2/(i-s),h=-(t+e)/(t-e),f=-(i+s)/(i-s);let p,x;if(l)p=1/(a-r),x=a/(a-r);else if(o===In)p=-2/(a-r),x=-(a+r)/(a-r);else if(o===ta)p=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ki=new V,Sn=new yt,__=new V(0,0,0),v_=new V(1,1,1),ii=new V,yr=new V,tn=new V,Eu=new yt,Tu=new ir;class Qn{constructor(e=0,t=0,i=0,s=Qn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Je(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Je(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:We("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Eu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Eu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Tu.setFromEuler(this),this.setFromQuaternion(Tu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qn.DEFAULT_ORDER="XYZ";class sf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let y_=0;const wu=new V,Zi=new ir,zn=new yt,Sr=new V,Ds=new V,S_=new V,M_=new ir,Au=new V(1,0,0),Cu=new V(0,1,0),Ru=new V(0,0,1),Pu={type:"added"},b_={type:"removed"},Ji={type:"childadded",child:null},Ha={type:"childremoved",child:null};class jt extends Ms{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:y_++}),this.uuid=bs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jt.DEFAULT_UP.clone();const e=new V,t=new Qn,i=new ir,s=new V(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new yt},normalMatrix:{value:new $e}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=jt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(e,t){return Zi.setFromAxisAngle(e,t),this.quaternion.premultiply(Zi),this}rotateX(e){return this.rotateOnAxis(Au,e)}rotateY(e){return this.rotateOnAxis(Cu,e)}rotateZ(e){return this.rotateOnAxis(Ru,e)}translateOnAxis(e,t){return wu.copy(e).applyQuaternion(this.quaternion),this.position.add(wu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Au,e)}translateY(e){return this.translateOnAxis(Cu,e)}translateZ(e){return this.translateOnAxis(Ru,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Sr.copy(e):Sr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(Ds,Sr,this.up):zn.lookAt(Sr,Ds,this.up),this.quaternion.setFromRotationMatrix(zn),s&&(zn.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix(zn),this.quaternion.premultiply(Zi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(lt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Pu),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null):lt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(b_),Ha.child=e,this.dispatchEvent(Ha),Ha.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Pu),Ji.child=e,this.dispatchEvent(Ji),Ji.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,e,S_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ds,M_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),p=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),p.length>0&&(i.nodes=p)}return i.object=s,i;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}jt.DEFAULT_UP=new V(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Mn=new V,Gn=new V,Wa=new V,Hn=new V,Qi=new V,es=new V,Du=new V,ja=new V,Xa=new V,qa=new V,Ya=new bt,$a=new bt,Ka=new bt;class wn{constructor(e=new V,t=new V,i=new V){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Mn.subVectors(e,t),s.cross(Mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Mn.subVectors(s,t),Gn.subVectors(i,t),Wa.subVectors(e,t);const a=Mn.dot(Mn),o=Mn.dot(Gn),l=Mn.dot(Wa),c=Gn.dot(Gn),u=Gn.dot(Wa),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;const h=1/d,f=(c*l-o*u)*h,p=(a*u-o*l)*h;return r.set(1-f-p,p,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hn.x),l.addScaledVector(a,Hn.y),l.addScaledVector(o,Hn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Ya.setScalar(0),$a.setScalar(0),Ka.setScalar(0),Ya.fromBufferAttribute(e,t),$a.fromBufferAttribute(e,i),Ka.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Ya,r.x),a.addScaledVector($a,r.y),a.addScaledVector(Ka,r.z),a}static isFrontFacing(e,t,i,s){return Mn.subVectors(i,t),Gn.subVectors(e,t),Mn.cross(Gn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Mn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),Mn.cross(Gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return wn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return wn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return wn.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return wn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return wn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let a,o;Qi.subVectors(s,i),es.subVectors(r,i),ja.subVectors(e,i);const l=Qi.dot(ja),c=es.dot(ja);if(l<=0&&c<=0)return t.copy(i);Xa.subVectors(e,s);const u=Qi.dot(Xa),d=es.dot(Xa);if(u>=0&&d<=u)return t.copy(s);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Qi,a);qa.subVectors(e,r);const f=Qi.dot(qa),p=es.dot(qa);if(p>=0&&f<=p)return t.copy(r);const x=f*c-l*p;if(x<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(i).addScaledVector(es,o);const g=u*p-f*d;if(g<=0&&d-u>=0&&f-p>=0)return Du.subVectors(r,s),o=(d-u)/(d-u+(f-p)),t.copy(s).addScaledVector(Du,o);const m=1/(g+x+h);return a=x*m,o=h*m,t.copy(i).addScaledVector(Qi,a).addScaledVector(es,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const rf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},si={h:0,s:0,l:0},Mr={h:0,s:0,l:0};function Za(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class tt{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=st.workingColorSpace){if(e=Zl(e,1),t=Je(t,0,1),i=Je(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Za(a,r,e+1/3),this.g=Za(a,r,e),this.b=Za(a,r,e-1/3)}return st.colorSpaceToWorking(this,s),this}setStyle(e,t=gn){function i(r){r!==void 0&&parseFloat(r)<1&&We("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:We("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);We("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gn){const i=rf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):We("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=$n(e.r),this.g=$n(e.g),this.b=$n(e.b),this}copyLinearToSRGB(e){return this.r=ps(e.r),this.g=ps(e.g),this.b=ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gn){return st.workingToColorSpace(Ut.copy(this),e),Math.round(Je(Ut.r*255,0,255))*65536+Math.round(Je(Ut.g*255,0,255))*256+Math.round(Je(Ut.b*255,0,255))}getHexString(e=gn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(Ut.copy(this),t);const i=Ut.r,s=Ut.g,r=Ut.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=gn){st.workingToColorSpace(Ut.copy(this),e);const t=Ut.r,i=Ut.g,s=Ut.b;return e!==gn?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(si),this.setHSL(si.h+e,si.s+t,si.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(si),e.getHSL(Mr);const i=Ws(si.h,Mr.h,t),s=Ws(si.s,Mr.s,t),r=Ws(si.l,Mr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ut=new tt;tt.NAMES=rf;let E_=0;class rr extends Ms{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:E_++}),this.uuid=bs(),this.name="",this.type="Material",this.blending=fs,this.side=mi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Eo,this.blendDst=To,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new tt(0,0,0),this.blendAlpha=0,this.depthFunc=xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ji,this.stencilZFail=ji,this.stencilZPass=ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){We(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){We(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==fs&&(i.blending=this.blending),this.side!==mi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Eo&&(i.blendSrc=this.blendSrc),this.blendDst!==To&&(i.blendDst=this.blendDst),this.blendEquation!==Ii&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==xs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mu&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ji&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ji&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ji&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ni extends rr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new tt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qn,this.combine=Bh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new V,br=new nt;let T_=0;class xn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:T_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=gu,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)br.fromBufferAttribute(this,t),br.applyMatrix3(e),this.setXY(t,br.x,br.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=rs(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Vt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=rs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=rs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=rs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=rs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array),s=Vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),i=Vt(i,this.array),s=Vt(s,this.array),r=Vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==gu&&(e.usage=this.usage),e}}class af extends xn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class of extends xn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class At extends xn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let w_=0;const fn=new yt,Ja=new jt,ts=new V,nn=new sr,Ls=new sr,Pt=new V;class Xt extends Ms{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:w_++}),this.uuid=bs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ef(e)?of:af)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new $e().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,i){return fn.makeTranslation(e,t,i),this.applyMatrix4(fn),this}scale(e,t,i){return fn.makeScale(e,t,i),this.applyMatrix4(fn),this}lookAt(e){return Ja.lookAt(e),Ja.updateMatrix(),this.applyMatrix4(Ja.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ts).negate(),this.translate(ts.x,ts.y,ts.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new At(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&We("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new V(-1/0,-1/0,-1/0),new V(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];nn.setFromBufferAttribute(r),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,nn.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,nn.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(nn.min),this.boundingBox.expandByPoint(nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fa);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new V,1/0);return}if(e){const i=this.boundingSphere.center;if(nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ls.setFromBufferAttribute(o),this.morphTargetsRelative?(Pt.addVectors(nn.min,Ls.min),nn.expandByPoint(Pt),Pt.addVectors(nn.max,Ls.max),nn.expandByPoint(Pt)):(nn.expandByPoint(Ls.min),nn.expandByPoint(Ls.max))}nn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Pt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Pt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Pt.fromBufferAttribute(o,c),l&&(ts.fromBufferAttribute(e,c),Pt.add(ts)),s=Math.max(s,i.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new xn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<i.count;L++)o[L]=new V,l[L]=new V;const c=new V,u=new V,d=new V,h=new nt,f=new nt,p=new nt,x=new V,g=new V;function m(L,M,E){c.fromBufferAttribute(i,L),u.fromBufferAttribute(i,M),d.fromBufferAttribute(i,E),h.fromBufferAttribute(r,L),f.fromBufferAttribute(r,M),p.fromBufferAttribute(r,E),u.sub(c),d.sub(c),f.sub(h),p.sub(h);const D=1/(f.x*p.y-p.x*f.y);isFinite(D)&&(x.copy(u).multiplyScalar(p.y).addScaledVector(d,-f.y).multiplyScalar(D),g.copy(d).multiplyScalar(f.x).addScaledVector(u,-p.x).multiplyScalar(D),o[L].add(x),o[M].add(x),o[E].add(x),l[L].add(g),l[M].add(g),l[E].add(g))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let L=0,M=_.length;L<M;++L){const E=_[L],D=E.start,F=E.count;for(let O=D,G=D+F;O<G;O+=3)m(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const y=new V,b=new V,w=new V,A=new V;function R(L){w.fromBufferAttribute(s,L),A.copy(w);const M=o[L];y.copy(M),y.sub(w.multiplyScalar(w.dot(M))).normalize(),b.crossVectors(A,M);const D=b.dot(l[L])<0?-1:1;a.setXYZW(L,y.x,y.y,y.z,D)}for(let L=0,M=_.length;L<M;++L){const E=_[L],D=E.start,F=E.count;for(let O=D,G=D+F;O<G;O+=3)R(e.getX(O+0)),R(e.getX(O+1)),R(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new xn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);const s=new V,r=new V,a=new V,o=new V,l=new V,c=new V,u=new V,d=new V;if(e)for(let h=0,f=e.count;h<f;h+=3){const p=e.getX(h+0),x=e.getX(h+1),g=e.getX(h+2);s.fromBufferAttribute(t,p),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,g),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,p),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),o.add(u),l.add(u),c.add(u),i.setXYZ(p,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u);let f=0,p=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*u;for(let m=0;m<u;m++)h[p++]=c[f++]}return new xn(h,u,d)}if(this.index===null)return We("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Xt,i=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,i);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){const h=c[u],f=e(h,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Lu=new yt,Ei=new nf,Er=new fa,Iu=new V,Tr=new V,wr=new V,Ar=new V,Qa=new V,Cr=new V,Nu=new V,Rr=new V;class Gt extends jt{constructor(e=new Xt,t=new Ni){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Cr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],d=r[l];u!==0&&(Qa.fromBufferAttribute(d,e),a?Cr.addScaledVector(Qa,u):Cr.addScaledVector(Qa.sub(t),u))}t.add(Cr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Er.copy(i.boundingSphere),Er.applyMatrix4(r),Ei.copy(e.ray).recast(e.near),!(Er.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(Er,Iu)===null||Ei.origin.distanceToSquared(Iu)>(e.far-e.near)**2))&&(Lu.copy(r).invert(),Ei.copy(e.ray).applyMatrix4(Lu),!(i.boundingBox!==null&&Ei.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Ei)))}_computeIntersections(e,t,i){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,x=h.length;p<x;p++){const g=h[p],m=a[g.materialIndex],_=Math.max(g.start,f.start),y=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let b=_,w=y;b<w;b+=3){const A=o.getX(b),R=o.getX(b+1),L=o.getX(b+2);s=Pr(this,m,e,i,c,u,d,A,R,L),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){const _=o.getX(g),y=o.getX(g+1),b=o.getX(g+2);s=Pr(this,a,e,i,c,u,d,_,y,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,x=h.length;p<x;p++){const g=h[p],m=a[g.materialIndex],_=Math.max(g.start,f.start),y=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let b=_,w=y;b<w;b+=3){const A=b,R=b+1,L=b+2;s=Pr(this,m,e,i,c,u,d,A,R,L),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=g.materialIndex,t.push(s))}}else{const p=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let g=p,m=x;g<m;g+=3){const _=g,y=g+1,b=g+2;s=Pr(this,a,e,i,c,u,d,_,y,b),s&&(s.faceIndex=Math.floor(g/3),t.push(s))}}}}function A_(n,e,t,i,s,r,a,o){let l;if(e.side===Ht?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===mi,o),l===null)return null;Rr.copy(o),Rr.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Rr);return c<t.near||c>t.far?null:{distance:c,point:Rr.clone(),object:n}}function Pr(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Tr),n.getVertexPosition(l,wr),n.getVertexPosition(c,Ar);const u=A_(n,e,t,i,Tr,wr,Ar,Nu);if(u){const d=new V;wn.getBarycoord(Nu,Tr,wr,Ar,d),s&&(u.uv=wn.getInterpolatedAttribute(s,o,l,c,d,new nt)),r&&(u.uv1=wn.getInterpolatedAttribute(r,o,l,c,d,new nt)),a&&(u.normal=wn.getInterpolatedAttribute(a,o,l,c,d,new V),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new V,materialIndex:0};wn.getNormal(Tr,wr,Ar,h.normal),u.face=h,u.barycoord=d}return u}class ar extends Xt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],d=[];let h=0,f=0;p("z","y","x",-1,-1,i,t,e,a,r,0),p("z","y","x",1,-1,i,t,-e,a,r,1),p("x","z","y",1,1,e,i,t,s,a,2),p("x","z","y",1,-1,e,i,-t,s,a,3),p("x","y","z",1,-1,e,t,i,s,r,4),p("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new At(c,3)),this.setAttribute("normal",new At(u,3)),this.setAttribute("uv",new At(d,2));function p(x,g,m,_,y,b,w,A,R,L,M){const E=b/R,D=w/L,F=b/2,O=w/2,G=A/2,q=R+1,k=L+1;let X=0,Z=0;const ce=new V;for(let ue=0;ue<k;ue++){const te=ue*D-O;for(let Pe=0;Pe<q;Pe++){const De=Pe*E-F;ce[x]=De*_,ce[g]=te*y,ce[m]=G,c.push(ce.x,ce.y,ce.z),ce[x]=0,ce[g]=0,ce[m]=A>0?1:-1,u.push(ce.x,ce.y,ce.z),d.push(Pe/R),d.push(1-ue/L),X+=1}}for(let ue=0;ue<L;ue++)for(let te=0;te<R;te++){const Pe=h+te+q*ue,De=h+te+q*(ue+1),Qe=h+(te+1)+q*(ue+1),it=h+(te+1)+q*ue;l.push(Pe,De,it),l.push(De,Qe,it),Z+=6}o.addGroup(f,Z,M),f+=Z,h+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ar(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ss(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(We("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function kt(n){const e={};for(let t=0;t<n.length;t++){const i=Ss(n[t]);for(const s in i)e[s]=i[s]}return e}function C_(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function lf(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const R_={clone:Ss,merge:kt};var P_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,D_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Cn extends rr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=P_,this.fragmentShader=D_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ss(e.uniforms),this.uniformsGroups=C_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class cf extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ri=new V,Uu=new nt,Fu=new nt;class rn extends cf{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Zs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Hs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zs*2*Math.atan(Math.tan(Hs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ri.x,ri.y).multiplyScalar(-e/ri.z),ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ri.x,ri.y).multiplyScalar(-e/ri.z)}getViewSize(e,t){return this.getViewBounds(e,Uu,Fu),t.subVectors(Fu,Uu)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Hs*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ns=-90,is=1;class L_ extends jt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(ns,is,e,t);s.layers=this.layers,this.add(s);const r=new rn(ns,is,e,t);r.layers=this.layers,this.add(r);const a=new rn(ns,is,e,t);a.layers=this.layers,this.add(a);const o=new rn(ns,is,e,t);o.layers=this.layers,this.add(o);const l=new rn(ns,is,e,t);l.layers=this.layers,this.add(l);const c=new rn(ns,is,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===In)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ta)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,a),e.setRenderTarget(i,2,s),e.render(t,o),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=p,i.texture.needsPMREMUpdate=!0}}class uf extends Wt{constructor(e=[],t=zi,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class df extends Fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new uf(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ar(5,5,5),r=new Cn({name:"CubemapFromEquirect",uniforms:Ss(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ht,blending:Yn});r.uniforms.tEquirect.value=t;const a=new Gt(s,r),o=t.minFilter;return t.minFilter===Bi&&(t.minFilter=Ot),new L_(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}}class us extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const I_={type:"move"};class eo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new us,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new us,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new V,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new V),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new us,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new V,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new V),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const x of e.hand.values()){const g=t.getJointPose(x,i),m=this._getHandJoint(c,x);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&h>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(I_)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new us;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class N_ extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qn,this.environmentIntensity=1,this.environmentRotation=new Qn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class U_ extends Wt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=It,u=It,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const to=new V,F_=new V,O_=new $e;class Li{constructor(e=new V(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=to.subVectors(i,t).cross(F_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(to),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||O_.getNormalMatrix(e),s=this.coplanarPoint(to).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ti=new fa,B_=new nt(.5,.5),Dr=new V;class Ql{constructor(e=new Li,t=new Li,i=new Li,s=new Li,r=new Li,a=new Li){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=In,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],p=r[8],x=r[9],g=r[10],m=r[11],_=r[12],y=r[13],b=r[14],w=r[15];if(s[0].setComponents(c-a,f-u,m-p,w-_).normalize(),s[1].setComponents(c+a,f+u,m+p,w+_).normalize(),s[2].setComponents(c+o,f+d,m+x,w+y).normalize(),s[3].setComponents(c-o,f-d,m-x,w-y).normalize(),i)s[4].setComponents(l,h,g,b).normalize(),s[5].setComponents(c-l,f-h,m-g,w-b).normalize();else if(s[4].setComponents(c-l,f-h,m-g,w-b).normalize(),t===In)s[5].setComponents(c+l,f+h,m+g,w+b).normalize();else if(t===ta)s[5].setComponents(l,h,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ti)}intersectsSprite(e){Ti.center.set(0,0,0);const t=B_.distanceTo(e.center);return Ti.radius=.7071067811865476+t,Ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ti)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(Dr.x=s.normal.x>0?e.max.x:e.min.x,Dr.y=s.normal.y>0?e.max.y:e.min.y,Dr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ml extends rr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new tt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ou=new yt,gl=new nf,Lr=new fa,Ir=new V;class Bu extends jt{constructor(e=new Xt,t=new ml){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Lr.copy(i.boundingSphere),Lr.applyMatrix4(s),Lr.radius+=r,e.ray.intersectsSphere(Lr)===!1)return;Ou.copy(s).invert(),gl.copy(e.ray).applyMatrix4(Ou);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){const h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let p=h,x=f;p<x;p++){const g=c.getX(p);Ir.fromBufferAttribute(d,g),Vu(Ir,g,l,s,e,t,this)}}else{const h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let p=h,x=f;p<x;p++)Ir.fromBufferAttribute(d,p),Vu(Ir,p,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Vu(n,e,t,i,s,r,a){const o=gl.distanceSqToPoint(n);if(o<t){const l=new V;gl.closestPointToPoint(n,l),l.applyMatrix4(i);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Js extends Wt{constructor(e,t,i=On,s,r,a,o=It,l=It,c,u=Jn,d=1){if(u!==Jn&&u!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Jl(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class V_ extends Js{constructor(e,t=On,i=zi,s,r,a=It,o=It,l,c=Jn){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class hf extends Wt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ec extends Xt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],a=[];o(s),c(i),u(),this.setAttribute("position",new At(r,3)),this.setAttribute("normal",new At(r.slice(),3)),this.setAttribute("uv",new At(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(_){const y=new V,b=new V,w=new V;for(let A=0;A<t.length;A+=3)f(t[A+0],y),f(t[A+1],b),f(t[A+2],w),l(y,b,w,_)}function l(_,y,b,w){const A=w+1,R=[];for(let L=0;L<=A;L++){R[L]=[];const M=_.clone().lerp(b,L/A),E=y.clone().lerp(b,L/A),D=A-L;for(let F=0;F<=D;F++)F===0&&L===A?R[L][F]=M:R[L][F]=M.clone().lerp(E,F/D)}for(let L=0;L<A;L++)for(let M=0;M<2*(A-L)-1;M++){const E=Math.floor(M/2);M%2===0?(h(R[L][E+1]),h(R[L+1][E]),h(R[L][E])):(h(R[L][E+1]),h(R[L+1][E+1]),h(R[L+1][E]))}}function c(_){const y=new V;for(let b=0;b<r.length;b+=3)y.x=r[b+0],y.y=r[b+1],y.z=r[b+2],y.normalize().multiplyScalar(_),r[b+0]=y.x,r[b+1]=y.y,r[b+2]=y.z}function u(){const _=new V;for(let y=0;y<r.length;y+=3){_.x=r[y+0],_.y=r[y+1],_.z=r[y+2];const b=g(_)/2/Math.PI+.5,w=m(_)/Math.PI+.5;a.push(b,1-w)}p(),d()}function d(){for(let _=0;_<a.length;_+=6){const y=a[_+0],b=a[_+2],w=a[_+4],A=Math.max(y,b,w),R=Math.min(y,b,w);A>.9&&R<.1&&(y<.2&&(a[_+0]+=1),b<.2&&(a[_+2]+=1),w<.2&&(a[_+4]+=1))}}function h(_){r.push(_.x,_.y,_.z)}function f(_,y){const b=_*3;y.x=e[b+0],y.y=e[b+1],y.z=e[b+2]}function p(){const _=new V,y=new V,b=new V,w=new V,A=new nt,R=new nt,L=new nt;for(let M=0,E=0;M<r.length;M+=9,E+=6){_.set(r[M+0],r[M+1],r[M+2]),y.set(r[M+3],r[M+4],r[M+5]),b.set(r[M+6],r[M+7],r[M+8]),A.set(a[E+0],a[E+1]),R.set(a[E+2],a[E+3]),L.set(a[E+4],a[E+5]),w.copy(_).add(y).add(b).divideScalar(3);const D=g(w);x(A,E+0,_,D),x(R,E+2,y,D),x(L,E+4,b,D)}}function x(_,y,b,w){w<0&&_.x===1&&(a[y]=_.x-1),b.x===0&&b.z===0&&(a[y]=w/2/Math.PI+.5)}function g(_){return Math.atan2(_.z,-_.x)}function m(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ec(e.vertices,e.indices,e.radius,e.detail)}}class ds extends ec{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ds(e.radius,e.detail)}}class pa extends Xt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,f=[],p=[],x=[],g=[];for(let m=0;m<u;m++){const _=m*h-a;for(let y=0;y<c;y++){const b=y*d-r;p.push(b,-_,0),x.push(0,0,1),g.push(y/o),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let _=0;_<o;_++){const y=_+c*m,b=_+c*(m+1),w=_+1+c*(m+1),A=_+1+c*m;f.push(y,b,A),f.push(b,w,A)}this.setIndex(f),this.setAttribute("position",new At(p,3)),this.setAttribute("normal",new At(x,3)),this.setAttribute("uv",new At(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pa(e.width,e.height,e.widthSegments,e.heightSegments)}}class tc extends Xt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let d=e;const h=(t-e)/s,f=new V,p=new nt;for(let x=0;x<=s;x++){for(let g=0;g<=i;g++){const m=r+g/i*a;f.x=d*Math.cos(m),f.y=d*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,u.push(p.x,p.y)}d+=h}for(let x=0;x<s;x++){const g=x*(i+1);for(let m=0;m<i;m++){const _=m+g,y=_,b=_+i+1,w=_+i+2,A=_+1;o.push(y,b,A),o.push(b,w,A)}}this.setIndex(o),this.setAttribute("position",new At(l,3)),this.setAttribute("normal",new At(c,3)),this.setAttribute("uv",new At(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ia extends Xt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const u=[],d=new V,h=new V,f=[],p=[],x=[],g=[];for(let m=0;m<=i;m++){const _=[],y=m/i;let b=0;m===0&&a===0?b=.5/t:m===i&&l===Math.PI&&(b=-.5/t);for(let w=0;w<=t;w++){const A=w/t;d.x=-e*Math.cos(s+A*r)*Math.sin(a+y*o),d.y=e*Math.cos(a+y*o),d.z=e*Math.sin(s+A*r)*Math.sin(a+y*o),p.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),g.push(A+b,1-y),_.push(c++)}u.push(_)}for(let m=0;m<i;m++)for(let _=0;_<t;_++){const y=u[m][_+1],b=u[m][_],w=u[m+1][_],A=u[m+1][_+1];(m!==0||a>0)&&f.push(y,b,A),(m!==i-1||l<Math.PI)&&f.push(b,w,A)}this.setIndex(f),this.setAttribute("position",new At(p,3)),this.setAttribute("normal",new At(x,3)),this.setAttribute("uv",new At(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ia(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class k_ extends Cn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class z_ extends rr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Bx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class G_ extends rr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class ff extends jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new tt(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const no=new yt,ku=new V,zu=new V;class H_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.mapType=an,this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ql,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ku.setFromMatrixPosition(e.matrixWorld),t.position.copy(ku),zu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(zu),t.updateMatrixWorld(),no.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(no,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(no)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class W_ extends H_{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0}}class Gu extends ff{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new W_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class pf extends cf{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class j_ extends ff{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class X_ extends rn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function Hu(n,e,t,i){const s=q_(i);switch(t){case Zh:return n*e;case Qh:return n*e/s.components*s.byteLength;case Xl:return n*e/s.components*s.byteLength;case vs:return n*e*2/s.components*s.byteLength;case ql:return n*e*2/s.components*s.byteLength;case Jh:return n*e*3/s.components*s.byteLength;case An:return n*e*4/s.components*s.byteLength;case Yl:return n*e*4/s.components*s.byteLength;case zr:case Gr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Hr:case Wr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Bo:case ko:return Math.max(n,16)*Math.max(e,8)/4;case Oo:case Vo:return Math.max(n,8)*Math.max(e,8)/2;case zo:case Go:case Wo:case jo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ho:case Xo:case qo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Yo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $o:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Zo:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Jo:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Qo:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case el:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case tl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case nl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case il:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case sl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case rl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case al:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ol:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ll:case cl:case ul:return Math.ceil(n/4)*Math.ceil(e/4)*16;case dl:case hl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case fl:case pl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function q_(n){switch(n){case an:case qh:return{byteLength:1,components:1};case Ys:case Yh:case Zn:return{byteLength:2,components:1};case Wl:case jl:return{byteLength:2,components:4};case On:case Hl:case Ln:return{byteLength:4,components:1};case $h:case Kh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gl}}));typeof window<"u"&&(window.__THREE__?We("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gl);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function mf(){let n=null,e=!1,t=null,i=null;function s(r,a){t(r,a),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Y_(n){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){const u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,p)=>f.start-p.start);let h=0;for(let f=1;f<d.length;f++){const p=d[h],x=d[f];x.start<=p.start+p.count+1?p.count=Math.max(p.count,x.start+x.count-p.start):(++h,d[h]=x)}d.length=h+1;for(let f=0,p=d.length;f<p;f++){const x=d[f];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var $_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,K_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Z_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,J_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Q_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ev=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,iv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,sv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,rv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,av=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ov=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lv=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,cv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,uv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,mv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,xv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,_v=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,vv=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Sv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ev=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Tv="gl_FragColor = linearToOutputTexel( gl_FragColor );",wv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Av=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Cv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Rv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Pv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Lv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Iv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Nv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Uv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Fv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ov=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Vv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,kv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,zv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,jv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qv=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( vec3( 1.0 ) - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Yv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$v=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Kv=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ey=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,ty=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ny=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ry=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ay=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,oy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ly=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,fy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,py=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,my=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,xy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_y=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,vy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,yy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,My=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,by=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ey=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ty=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ay=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ry=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Py=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * 6.28318530718;
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 0, 5, phi ).x + bitangent * vogelDiskSample( 0, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 1, 5, phi ).x + bitangent * vogelDiskSample( 1, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 2, 5, phi ).x + bitangent * vogelDiskSample( 2, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 3, 5, phi ).x + bitangent * vogelDiskSample( 3, 5, phi ).y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * vogelDiskSample( 4, 5, phi ).x + bitangent * vogelDiskSample( 4, 5, phi ).y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadow = step( depth, dp );
			#else
				shadow = step( dp, depth );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Dy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Ly=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Iy=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Ny=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Uy=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fy=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Oy=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,By=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Vy=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ky=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Gy=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Hy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Wy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Yy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$y=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ky=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,eS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,tS=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,nS=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,iS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,sS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aS=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,oS=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lS=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cS=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,uS=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hS=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fS=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pS=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,mS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,gS=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_S=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,vS=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yS=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MS=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ES=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,wS=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,AS=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:$_,alphahash_pars_fragment:K_,alphamap_fragment:Z_,alphamap_pars_fragment:J_,alphatest_fragment:Q_,alphatest_pars_fragment:ev,aomap_fragment:tv,aomap_pars_fragment:nv,batching_pars_vertex:iv,batching_vertex:sv,begin_vertex:rv,beginnormal_vertex:av,bsdfs:ov,iridescence_fragment:lv,bumpmap_pars_fragment:cv,clipping_planes_fragment:uv,clipping_planes_pars_fragment:dv,clipping_planes_pars_vertex:hv,clipping_planes_vertex:fv,color_fragment:pv,color_pars_fragment:mv,color_pars_vertex:gv,color_vertex:xv,common:_v,cube_uv_reflection_fragment:vv,defaultnormal_vertex:yv,displacementmap_pars_vertex:Sv,displacementmap_vertex:Mv,emissivemap_fragment:bv,emissivemap_pars_fragment:Ev,colorspace_fragment:Tv,colorspace_pars_fragment:wv,envmap_fragment:Av,envmap_common_pars_fragment:Cv,envmap_pars_fragment:Rv,envmap_pars_vertex:Pv,envmap_physical_pars_fragment:zv,envmap_vertex:Dv,fog_vertex:Lv,fog_pars_vertex:Iv,fog_fragment:Nv,fog_pars_fragment:Uv,gradientmap_pars_fragment:Fv,lightmap_pars_fragment:Ov,lights_lambert_fragment:Bv,lights_lambert_pars_fragment:Vv,lights_pars_begin:kv,lights_toon_fragment:Gv,lights_toon_pars_fragment:Hv,lights_phong_fragment:Wv,lights_phong_pars_fragment:jv,lights_physical_fragment:Xv,lights_physical_pars_fragment:qv,lights_fragment_begin:Yv,lights_fragment_maps:$v,lights_fragment_end:Kv,logdepthbuf_fragment:Zv,logdepthbuf_pars_fragment:Jv,logdepthbuf_pars_vertex:Qv,logdepthbuf_vertex:ey,map_fragment:ty,map_pars_fragment:ny,map_particle_fragment:iy,map_particle_pars_fragment:sy,metalnessmap_fragment:ry,metalnessmap_pars_fragment:ay,morphinstance_vertex:oy,morphcolor_vertex:ly,morphnormal_vertex:cy,morphtarget_pars_vertex:uy,morphtarget_vertex:dy,normal_fragment_begin:hy,normal_fragment_maps:fy,normal_pars_fragment:py,normal_pars_vertex:my,normal_vertex:gy,normalmap_pars_fragment:xy,clearcoat_normal_fragment_begin:_y,clearcoat_normal_fragment_maps:vy,clearcoat_pars_fragment:yy,iridescence_pars_fragment:Sy,opaque_fragment:My,packing:by,premultiplied_alpha_fragment:Ey,project_vertex:Ty,dithering_fragment:wy,dithering_pars_fragment:Ay,roughnessmap_fragment:Cy,roughnessmap_pars_fragment:Ry,shadowmap_pars_fragment:Py,shadowmap_pars_vertex:Dy,shadowmap_vertex:Ly,shadowmask_pars_fragment:Iy,skinbase_vertex:Ny,skinning_pars_vertex:Uy,skinning_vertex:Fy,skinnormal_vertex:Oy,specularmap_fragment:By,specularmap_pars_fragment:Vy,tonemapping_fragment:ky,tonemapping_pars_fragment:zy,transmission_fragment:Gy,transmission_pars_fragment:Hy,uv_pars_fragment:Wy,uv_pars_vertex:jy,uv_vertex:Xy,worldpos_vertex:qy,background_vert:Yy,background_frag:$y,backgroundCube_vert:Ky,backgroundCube_frag:Zy,cube_vert:Jy,cube_frag:Qy,depth_vert:eS,depth_frag:tS,distance_vert:nS,distance_frag:iS,equirect_vert:sS,equirect_frag:rS,linedashed_vert:aS,linedashed_frag:oS,meshbasic_vert:lS,meshbasic_frag:cS,meshlambert_vert:uS,meshlambert_frag:dS,meshmatcap_vert:hS,meshmatcap_frag:fS,meshnormal_vert:pS,meshnormal_frag:mS,meshphong_vert:gS,meshphong_frag:xS,meshphysical_vert:_S,meshphysical_frag:vS,meshtoon_vert:yS,meshtoon_frag:SS,points_vert:MS,points_frag:bS,shadow_vert:ES,shadow_frag:TS,sprite_vert:wS,sprite_frag:AS},xe={common:{diffuse:{value:new tt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new tt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new tt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new tt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Dn={basic:{uniforms:kt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:kt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new tt(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:kt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new tt(0)},specular:{value:new tt(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:kt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new tt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:kt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new tt(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:kt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:kt([xe.points,xe.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:kt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:kt([xe.common,xe.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:kt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:kt([xe.sprite,xe.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distance:{uniforms:kt([xe.common,xe.displacementmap,{referencePosition:{value:new V},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distance_vert,fragmentShader:Ke.distance_frag},shadow:{uniforms:kt([xe.lights,xe.fog,{color:{value:new tt(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};Dn.physical={uniforms:kt([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new tt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new tt(0)},specularColor:{value:new tt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const Nr={r:0,b:0,g:0},wi=new Qn,CS=new yt;function RS(n,e,t,i,s,r,a){const o=new tt(0);let l=r===!0?0:1,c,u,d=null,h=0,f=null;function p(y){let b=y.isScene===!0?y.background:null;return b&&b.isTexture&&(b=(y.backgroundBlurriness>0?t:e).get(b)),b}function x(y){let b=!1;const w=p(y);w===null?m(o,l):w&&w.isColor&&(m(w,1),b=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||b)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function g(y,b){const w=p(b);w&&(w.isCubeTexture||w.mapping===ha)?(u===void 0&&(u=new Gt(new ar(1,1,1),new Cn({name:"BackgroundCubeMaterial",uniforms:Ss(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:Ht,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,R,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),wi.copy(b.backgroundRotation),wi.x*=-1,wi.y*=-1,wi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(wi.y*=-1,wi.z*=-1),u.material.uniforms.envMap.value=w,u.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(CS.makeRotationFromEuler(wi)),u.material.toneMapped=st.getTransfer(w.colorSpace)!==ht,(d!==w||h!==w.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=w,h=w.version,f=n.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):w&&w.isTexture&&(c===void 0&&(c=new Gt(new pa(2,2),new Cn({name:"BackgroundMaterial",uniforms:Ss(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:mi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=w,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=st.getTransfer(w.colorSpace)!==ht,w.matrixAutoUpdate===!0&&w.updateMatrix(),c.material.uniforms.uvTransform.value.copy(w.matrix),(d!==w||h!==w.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=w,h=w.version,f=n.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,b){y.getRGB(Nr,lf(n)),i.buffers.color.setClear(Nr.r,Nr.g,Nr.b,b,a)}function _(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(y,b=1){o.set(y),l=b,m(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,m(o,l)},render:x,addToRenderList:g,dispose:_}}function PS(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(E,D,F,O,G){let q=!1;const k=d(O,F,D);r!==k&&(r=k,c(r.object)),q=f(E,O,F,G),q&&p(E,O,F,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,b(E,D,F,O),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return n.createVertexArray()}function c(E){return n.bindVertexArray(E)}function u(E){return n.deleteVertexArray(E)}function d(E,D,F){const O=F.wireframe===!0;let G=i[E.id];G===void 0&&(G={},i[E.id]=G);let q=G[D.id];q===void 0&&(q={},G[D.id]=q);let k=q[O];return k===void 0&&(k=h(l()),q[O]=k),k}function h(E){const D=[],F=[],O=[];for(let G=0;G<t;G++)D[G]=0,F[G]=0,O[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:O,object:E,attributes:{},index:null}}function f(E,D,F,O){const G=r.attributes,q=D.attributes;let k=0;const X=F.getAttributes();for(const Z in X)if(X[Z].location>=0){const ue=G[Z];let te=q[Z];if(te===void 0&&(Z==="instanceMatrix"&&E.instanceMatrix&&(te=E.instanceMatrix),Z==="instanceColor"&&E.instanceColor&&(te=E.instanceColor)),ue===void 0||ue.attribute!==te||te&&ue.data!==te.data)return!0;k++}return r.attributesNum!==k||r.index!==O}function p(E,D,F,O){const G={},q=D.attributes;let k=0;const X=F.getAttributes();for(const Z in X)if(X[Z].location>=0){let ue=q[Z];ue===void 0&&(Z==="instanceMatrix"&&E.instanceMatrix&&(ue=E.instanceMatrix),Z==="instanceColor"&&E.instanceColor&&(ue=E.instanceColor));const te={};te.attribute=ue,ue&&ue.data&&(te.data=ue.data),G[Z]=te,k++}r.attributes=G,r.attributesNum=k,r.index=O}function x(){const E=r.newAttributes;for(let D=0,F=E.length;D<F;D++)E[D]=0}function g(E){m(E,0)}function m(E,D){const F=r.newAttributes,O=r.enabledAttributes,G=r.attributeDivisors;F[E]=1,O[E]===0&&(n.enableVertexAttribArray(E),O[E]=1),G[E]!==D&&(n.vertexAttribDivisor(E,D),G[E]=D)}function _(){const E=r.newAttributes,D=r.enabledAttributes;for(let F=0,O=D.length;F<O;F++)D[F]!==E[F]&&(n.disableVertexAttribArray(F),D[F]=0)}function y(E,D,F,O,G,q,k){k===!0?n.vertexAttribIPointer(E,D,F,G,q):n.vertexAttribPointer(E,D,F,O,G,q)}function b(E,D,F,O){x();const G=O.attributes,q=F.getAttributes(),k=D.defaultAttributeValues;for(const X in q){const Z=q[X];if(Z.location>=0){let ce=G[X];if(ce===void 0&&(X==="instanceMatrix"&&E.instanceMatrix&&(ce=E.instanceMatrix),X==="instanceColor"&&E.instanceColor&&(ce=E.instanceColor)),ce!==void 0){const ue=ce.normalized,te=ce.itemSize,Pe=e.get(ce);if(Pe===void 0)continue;const De=Pe.buffer,Qe=Pe.type,it=Pe.bytesPerElement,$=Qe===n.INT||Qe===n.UNSIGNED_INT||ce.gpuType===Hl;if(ce.isInterleavedBufferAttribute){const ne=ce.data,_e=ne.stride,Oe=ce.offset;if(ne.isInstancedInterleavedBuffer){for(let pe=0;pe<Z.locationSize;pe++)m(Z.location+pe,ne.meshPerAttribute);E.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ne.meshPerAttribute*ne.count)}else for(let pe=0;pe<Z.locationSize;pe++)g(Z.location+pe);n.bindBuffer(n.ARRAY_BUFFER,De);for(let pe=0;pe<Z.locationSize;pe++)y(Z.location+pe,te/Z.locationSize,Qe,ue,_e*it,(Oe+te/Z.locationSize*pe)*it,$)}else{if(ce.isInstancedBufferAttribute){for(let ne=0;ne<Z.locationSize;ne++)m(Z.location+ne,ce.meshPerAttribute);E.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let ne=0;ne<Z.locationSize;ne++)g(Z.location+ne);n.bindBuffer(n.ARRAY_BUFFER,De);for(let ne=0;ne<Z.locationSize;ne++)y(Z.location+ne,te/Z.locationSize,Qe,ue,te*it,te/Z.locationSize*ne*it,$)}}else if(k!==void 0){const ue=k[X];if(ue!==void 0)switch(ue.length){case 2:n.vertexAttrib2fv(Z.location,ue);break;case 3:n.vertexAttrib3fv(Z.location,ue);break;case 4:n.vertexAttrib4fv(Z.location,ue);break;default:n.vertexAttrib1fv(Z.location,ue)}}}}_()}function w(){L();for(const E in i){const D=i[E];for(const F in D){const O=D[F];for(const G in O)u(O[G].object),delete O[G];delete D[F]}delete i[E]}}function A(E){if(i[E.id]===void 0)return;const D=i[E.id];for(const F in D){const O=D[F];for(const G in O)u(O[G].object),delete O[G];delete D[F]}delete i[E.id]}function R(E){for(const D in i){const F=i[D];if(F[E.id]===void 0)continue;const O=F[E.id];for(const G in O)u(O[G].object),delete O[G];delete F[E.id]}}function L(){M(),a=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:M,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:g,disableUnusedAttributes:_}}function DS(n,e,t){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),t.update(u,i,1)}function a(c,u,d){d!==0&&(n.drawArraysInstanced(i,c,u,d),t.update(u,i,d))}function o(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,d);let f=0;for(let p=0;p<d;p++)f+=u[p];t.update(f,i,1)}function l(c,u,d,h){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<c.length;p++)a(c[p],u[p],h[p]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,u,0,h,0,d);let p=0;for(let x=0;x<d;x++)p+=u[x]*h[x];t.update(p,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function LS(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==An&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const L=R===Zn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==an&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Ln&&!L)}function l(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(We("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),m=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),A=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:p,maxTextureSize:x,maxCubemapSize:g,maxAttributes:m,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:b,maxSamples:w,samples:A}}function IS(n){const e=this;let t=null,i=0,s=!1,r=!1;const a=new Li,o=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){const p=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,m=n.get(d);if(!s||p===null||p.length===0||r&&!g)r?u(null):c();else{const _=r?0:i,y=_*4;let b=m.clippingState||null;l.value=b,b=u(p,h,y,f);for(let w=0;w!==y;++w)b[w]=t[w];m.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,p){const x=d!==null?d.length:0;let g=null;if(x!==0){if(g=l.value,p!==!0||g===null){const m=f+x*4,_=h.matrixWorldInverse;o.getNormalMatrix(_),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,b=f;y!==x;++y,b+=4)a.copy(d[y]).applyMatrix4(_,o),a.normal.toArray(g,b),g[b+3]=a.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,g}}function NS(n){let e=new WeakMap;function t(a,o){return o===Io?a.mapping=zi:o===No&&(a.mapping=_s),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Io||o===No)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new df(l.height);return c.fromEquirectangularTexture(n,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const di=4,Wu=[.125,.215,.35,.446,.526,.582],Ui=20,US=256,Is=new pf,ju=new tt;let io=null,so=0,ro=0,ao=!1;const FS=new V;class Xu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){const{size:a=256,position:o=FS}=r;io=this._renderer.getRenderTarget(),so=this._renderer.getActiveCubeFace(),ro=this._renderer.getActiveMipmapLevel(),ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$u(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(io,so,ro),this._renderer.xr.enabled=ao,e.scissorTest=!1,ss(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===zi||e.mapping===_s?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),io=this._renderer.getRenderTarget(),so=this._renderer.getActiveCubeFace(),ro=this._renderer.getActiveMipmapLevel(),ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ot,minFilter:Ot,generateMipmaps:!1,type:Zn,format:An,colorSpace:ys,depthBuffer:!1},s=qu(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qu(e,t,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=OS(r)),this._blurMaterial=VS(r,e,t),this._ggxMaterial=BS(r,e,t)}return s}_compileMaterial(e){const t=new Gt(new Xt,e);this._renderer.compile(t,Is)}_sceneToCubeUV(e,t,i,s,r){const l=new rn(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(ju),d.toneMapping=Un,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Gt(new ar,new Ni({name:"PMREM.Background",side:Ht,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,g=x.material;let m=!1;const _=e.background;_?_.isColor&&(g.color.copy(_),e.background=null,m=!0):(g.color.copy(ju),m=!0);for(let y=0;y<6;y++){const b=y%3;b===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[y],r.y,r.z)):b===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[y]));const w=this._cubeSize;ss(s,b*w,y>2?w:0,w,w),d.setRenderTarget(s),m&&d.render(x,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=_}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===zi||e.mapping===_s;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$u()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yu());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ss(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Is)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=0+c*1.25,f=d*h,{_lodMax:p}=this,x=this._sizeLods[i],g=3*x*(i>p-di?i-p+di:0),m=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=p-t,ss(r,g,m,3*x,2*x),s.setRenderTarget(r),s.render(o,Is),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=p-i,ss(e,g,m,3*x,2*x),s.setRenderTarget(e),s.render(o,Is)}_blur(e,t,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&lt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[s];d.material=c;const h=c.uniforms,f=this._sizeLods[i]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ui-1),x=r/p,g=isFinite(r)?1+Math.floor(u*x):Ui;g>Ui&&We(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ui}`);const m=[];let _=0;for(let R=0;R<Ui;++R){const L=R/x,M=Math.exp(-L*L/2);m.push(M),R===0?_+=M:R<g&&(_+=2*M)}for(let R=0;R<m.length;R++)m[R]=m[R]/_;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:y}=this;h.dTheta.value=p,h.mipInt.value=y-i;const b=this._sizeLods[s],w=3*b*(s>y-di?s-y+di:0),A=4*(this._cubeSize-b);ss(t,w,A,3*b,2*b),l.setRenderTarget(t),l.render(d,Is)}}function OS(n){const e=[],t=[],i=[];let s=n;const r=n-di+1+Wu.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let l=1/o;a>n-di?l=Wu[a-n+di-1]:a===0&&(l=0),t.push(l);const c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,p=6,x=3,g=2,m=1,_=new Float32Array(x*p*f),y=new Float32Array(g*p*f),b=new Float32Array(m*p*f);for(let A=0;A<f;A++){const R=A%3*2/3-1,L=A>2?0:-1,M=[R,L,0,R+2/3,L,0,R+2/3,L+1,0,R,L,0,R+2/3,L+1,0,R,L+1,0];_.set(M,x*p*A),y.set(h,g*p*A);const E=[A,A,A,A,A,A];b.set(E,m*p*A)}const w=new Xt;w.setAttribute("position",new xn(_,x)),w.setAttribute("uv",new xn(y,g)),w.setAttribute("faceIndex",new xn(b,m)),i.push(new Gt(w,null)),s>di&&s--}return{lodMeshes:i,sizeLods:e,sigmas:t}}function qu(n,e,t){const i=new Fn(n,e,t);return i.texture.mapping=ha,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ss(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function BS(n,e,t){return new Cn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:US,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ma(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function VS(n,e,t){const i=new Float32Array(Ui),s=new V(0,1,0);return new Cn({name:"SphericalGaussianBlur",defines:{n:Ui,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ma(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Yu(){return new Cn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ma(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function $u(){return new Cn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ma(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function ma(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function kS(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===Io||l===No,u=l===zi||l===_s;if(c||u){let d=e.get(o);const h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return t===null&&(t=new Xu(n)),d=c?t.fromEquirectangular(o,d):t.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),d.texture;if(d!==void 0)return d.texture;{const f=o.image;return c&&f&&f.height>0||u&&f&&s(f)?(t===null&&(t=new Xu(n)),d=c?t.fromEquirectangular(o):t.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,e.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function zS(n){const e={};function t(i){if(e[i]!==void 0)return e[i];const s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Ks("WebGLRenderer: "+i+" extension not supported."),s}}}function GS(n,e,t,i){const s={},r=new WeakMap;function a(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const p in h.attributes)e.remove(h.attributes[p]);h.removeEventListener("dispose",a),delete s[h.id];const f=r.get(h);f&&(e.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const f in h)e.update(h[f],n.ARRAY_BUFFER)}function c(d){const h=[],f=d.index,p=d.attributes.position;let x=0;if(f!==null){const _=f.array;x=f.version;for(let y=0,b=_.length;y<b;y+=3){const w=_[y+0],A=_[y+1],R=_[y+2];h.push(w,A,A,R,R,w)}}else if(p!==void 0){const _=p.array;x=p.version;for(let y=0,b=_.length/3-1;y<b;y+=3){const w=y+0,A=y+1,R=y+2;h.push(w,A,A,R,R,w)}}else return;const g=new(ef(h)?of:af)(h,1);g.version=x;const m=r.get(d);m&&e.remove(m),r.set(d,g)}function u(d){const h=r.get(d);if(h){const f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function HS(n,e,t){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,f){n.drawElements(i,f,r,h*a),t.update(f,i,1)}function c(h,f,p){p!==0&&(n.drawElementsInstanced(i,f,r,h*a,p),t.update(f,i,p))}function u(h,f,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,h,0,p);let g=0;for(let m=0;m<p;m++)g+=f[m];t.update(g,i,1)}function d(h,f,p,x){if(p===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<h.length;m++)c(h[m]/a,f[m],x[m]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,r,h,0,x,0,p);let m=0;for(let _=0;_<p;_++)m+=f[_]*x[_];t.update(m,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function WS(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:lt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function jS(n,e,t){const i=new WeakMap,s=new bt;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let M=function(){R.dispose(),i.delete(o),o.removeEventListener("dispose",M)};h!==void 0&&h.texture.dispose();const f=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],m=o.morphAttributes.normal||[],_=o.morphAttributes.color||[];let y=0;f===!0&&(y=1),p===!0&&(y=2),x===!0&&(y=3);let b=o.attributes.position.count*y,w=1;b>e.maxTextureSize&&(w=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const A=new Float32Array(b*w*4*d),R=new tf(A,b,w,d);R.type=Ln,R.needsUpdate=!0;const L=y*4;for(let E=0;E<d;E++){const D=g[E],F=m[E],O=_[E],G=b*w*4*E;for(let q=0;q<D.count;q++){const k=q*L;f===!0&&(s.fromBufferAttribute(D,q),A[G+k+0]=s.x,A[G+k+1]=s.y,A[G+k+2]=s.z,A[G+k+3]=0),p===!0&&(s.fromBufferAttribute(F,q),A[G+k+4]=s.x,A[G+k+5]=s.y,A[G+k+6]=s.z,A[G+k+7]=0),x===!0&&(s.fromBufferAttribute(O,q),A[G+k+8]=s.x,A[G+k+9]=s.y,A[G+k+10]=s.z,A[G+k+11]=O.itemSize===4?s.w:1)}}h={count:d,texture:R,size:new nt(b,w)},i.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];const p=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",p),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function XS(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,d=e.get(l,u);if(s.get(d)!==c&&(e.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}const qS={[Vh]:"LINEAR_TONE_MAPPING",[kh]:"REINHARD_TONE_MAPPING",[zh]:"CINEON_TONE_MAPPING",[Gh]:"ACES_FILMIC_TONE_MAPPING",[Wh]:"AGX_TONE_MAPPING",[jh]:"NEUTRAL_TONE_MAPPING",[Hh]:"CUSTOM_TONE_MAPPING"};function YS(n,e,t,i,s){const r=new Fn(e,t,{type:n,depthBuffer:i,stencilBuffer:s}),a=new Fn(e,t,{type:Zn,depthBuffer:!1,stencilBuffer:!1}),o=new Xt;o.setAttribute("position",new At([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new At([0,2,0,0,2,0],2));const l=new k_({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),c=new Gt(o,l),u=new pf(-1,1,1,-1,0,1);let d=null,h=null,f=!1,p,x=null,g=[],m=!1;this.setSize=function(_,y){r.setSize(_,y),a.setSize(_,y);for(let b=0;b<g.length;b++){const w=g[b];w.setSize&&w.setSize(_,y)}},this.setEffects=function(_){g=_,m=g.length>0&&g[0].isRenderPass===!0;const y=r.width,b=r.height;for(let w=0;w<g.length;w++){const A=g[w];A.setSize&&A.setSize(y,b)}},this.begin=function(_,y){if(f||_.toneMapping===Un&&g.length===0)return!1;if(x=y,y!==null){const b=y.width,w=y.height;(r.width!==b||r.height!==w)&&this.setSize(b,w)}return m===!1&&_.setRenderTarget(r),p=_.toneMapping,_.toneMapping=Un,!0},this.hasRenderPass=function(){return m},this.end=function(_,y){_.toneMapping=p,f=!0;let b=r,w=a;for(let A=0;A<g.length;A++){const R=g[A];if(R.enabled!==!1&&(R.render(_,w,b,y),R.needsSwap!==!1)){const L=b;b=w,w=L}}if(d!==_.outputColorSpace||h!==_.toneMapping){d=_.outputColorSpace,h=_.toneMapping,l.defines={},st.getTransfer(d)===ht&&(l.defines.SRGB_TRANSFER="");const A=qS[h];A&&(l.defines[A]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=b.texture,_.setRenderTarget(x),_.render(c,u),x=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),l.dispose()}}const gf=new Wt,xl=new Js(1,1),xf=new tf,_f=new g_,vf=new uf,Ku=[],Zu=[],Ju=new Float32Array(16),Qu=new Float32Array(9),ed=new Float32Array(4);function Es(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Ku[s];if(r===void 0&&(r=new Float32Array(s),Ku[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Ct(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ga(n,e){let t=Zu[e];t===void 0&&(t=new Int32Array(e),Zu[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $S(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function KS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function ZS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function JS(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function QS(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;ed.set(i),n.uniformMatrix2fv(this.addr,!1,ed),Rt(t,i)}}function eM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;Qu.set(i),n.uniformMatrix3fv(this.addr,!1,Qu),Rt(t,i)}}function tM(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(Ct(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,i))return;Ju.set(i),n.uniformMatrix4fv(this.addr,!1,Ju),Rt(t,i)}}function nM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function iM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function sM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function rM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function aM(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function oM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function lM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function cM(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function uM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(xl.compareFunction=t.isReversedDepthBuffer()?Kl:$l,r=xl):r=gf,t.setTexture2D(e||r,s)}function dM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||_f,s)}function hM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||vf,s)}function fM(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||xf,s)}function pM(n){switch(n){case 5126:return $S;case 35664:return KS;case 35665:return ZS;case 35666:return JS;case 35674:return QS;case 35675:return eM;case 35676:return tM;case 5124:case 35670:return nM;case 35667:case 35671:return iM;case 35668:case 35672:return sM;case 35669:case 35673:return rM;case 5125:return aM;case 36294:return oM;case 36295:return lM;case 36296:return cM;case 35678:case 36198:case 36298:case 36306:case 35682:return uM;case 35679:case 36299:case 36307:return dM;case 35680:case 36300:case 36308:case 36293:return hM;case 36289:case 36303:case 36311:case 36292:return fM}}function mM(n,e){n.uniform1fv(this.addr,e)}function gM(n,e){const t=Es(e,this.size,2);n.uniform2fv(this.addr,t)}function xM(n,e){const t=Es(e,this.size,3);n.uniform3fv(this.addr,t)}function _M(n,e){const t=Es(e,this.size,4);n.uniform4fv(this.addr,t)}function vM(n,e){const t=Es(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function yM(n,e){const t=Es(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function SM(n,e){const t=Es(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function MM(n,e){n.uniform1iv(this.addr,e)}function bM(n,e){n.uniform2iv(this.addr,e)}function EM(n,e){n.uniform3iv(this.addr,e)}function TM(n,e){n.uniform4iv(this.addr,e)}function wM(n,e){n.uniform1uiv(this.addr,e)}function AM(n,e){n.uniform2uiv(this.addr,e)}function CM(n,e){n.uniform3uiv(this.addr,e)}function RM(n,e){n.uniform4uiv(this.addr,e)}function PM(n,e,t){const i=this.cache,s=e.length,r=ga(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=xl:a=gf;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function DM(n,e,t){const i=this.cache,s=e.length,r=ga(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||_f,r[a])}function LM(n,e,t){const i=this.cache,s=e.length,r=ga(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||vf,r[a])}function IM(n,e,t){const i=this.cache,s=e.length,r=ga(t,s);Ct(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||xf,r[a])}function NM(n){switch(n){case 5126:return mM;case 35664:return gM;case 35665:return xM;case 35666:return _M;case 35674:return vM;case 35675:return yM;case 35676:return SM;case 5124:case 35670:return MM;case 35667:case 35671:return bM;case 35668:case 35672:return EM;case 35669:case 35673:return TM;case 5125:return wM;case 36294:return AM;case 36295:return CM;case 36296:return RM;case 35678:case 36198:case 36298:case 36306:case 35682:return PM;case 35679:case 36299:case 36307:return DM;case 35680:case 36300:case 36308:case 36293:return LM;case 36289:case 36303:case 36311:case 36292:return IM}}class UM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=pM(t.type)}}class FM{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=NM(t.type)}}class OM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],i)}}}const oo=/(\w+)(\])?(\[|\.)?/g;function td(n,e){n.seq.push(e),n.map[e.id]=e}function BM(n,e,t){const i=n.name,s=i.length;for(oo.lastIndex=0;;){const r=oo.exec(i),a=oo.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){td(t,c===void 0?new UM(o,n,e):new FM(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new OM(o),td(t,d)),t=d}}}class jr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);BM(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&i.push(a)}return i}}function nd(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const VM=37297;let kM=0;function zM(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const id=new $e;function GM(n){st._getMatrix(id,st.workingColorSpace,n);const e=`mat3( ${id.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case ea:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return We("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function sd(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+zM(n.getShaderSource(e),o)}else return r}function HM(n,e){const t=GM(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const WM={[Vh]:"Linear",[kh]:"Reinhard",[zh]:"Cineon",[Gh]:"ACESFilmic",[Wh]:"AgX",[jh]:"Neutral",[Hh]:"Custom"};function jM(n,e){const t=WM[e];return t===void 0?(We("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Ur=new V;function XM(){st.getLuminanceCoefficients(Ur);const n=Ur.x.toFixed(4),e=Ur.y.toFixed(4),t=Ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bs).join(`
`)}function YM(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function $M(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),a=r.name;let o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Bs(n){return n!==""}function rd(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ad(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const KM=/^[ \t]*#include +<([\w\d./]+)>/gm;function _l(n){return n.replace(KM,JM)}const ZM=new Map;function JM(n,e){let t=Ke[e];if(t===void 0){const i=ZM.get(e);if(i!==void 0)t=Ke[i],We('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return _l(t)}const QM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function od(n){return n.replace(QM,eb)}function eb(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ld(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const tb={[kr]:"SHADOWMAP_TYPE_PCF",[Os]:"SHADOWMAP_TYPE_VSM"};function nb(n){return tb[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const ib={[zi]:"ENVMAP_TYPE_CUBE",[_s]:"ENVMAP_TYPE_CUBE",[ha]:"ENVMAP_TYPE_CUBE_UV"};function sb(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":ib[n.envMapMode]||"ENVMAP_TYPE_CUBE"}const rb={[_s]:"ENVMAP_MODE_REFRACTION"};function ab(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":rb[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}const ob={[Bh]:"ENVMAP_BLENDING_MULTIPLY",[Ux]:"ENVMAP_BLENDING_MIX",[Fx]:"ENVMAP_BLENDING_ADD"};function lb(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":ob[n.combine]||"ENVMAP_BLENDING_NONE"}function cb(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function ub(n,e,t,i){const s=n.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=nb(t),c=sb(t),u=ab(t),d=lb(t),h=cb(t),f=qM(t),p=YM(r),x=s.createProgram();let g,m,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Bs).join(`
`),g.length>0&&(g+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p].filter(Bs).join(`
`),m.length>0&&(m+=`
`)):(g=[ld(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bs).join(`
`),m=[ld(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,p,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Un?"#define TONE_MAPPING":"",t.toneMapping!==Un?Ke.tonemapping_pars_fragment:"",t.toneMapping!==Un?jM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,HM("linearToOutputTexel",t.outputColorSpace),XM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Bs).join(`
`)),a=_l(a),a=rd(a,t),a=ad(a,t),o=_l(o),o=rd(o,t),o=ad(o,t),a=od(a),o=od(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,m=["#define varying in",t.glslVersion===xu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===xu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const y=_+g+a,b=_+m+o,w=nd(s,s.VERTEX_SHADER,y),A=nd(s,s.FRAGMENT_SHADER,b);s.attachShader(x,w),s.attachShader(x,A),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function R(D){if(n.debug.checkShaderErrors){const F=s.getProgramInfoLog(x)||"",O=s.getShaderInfoLog(w)||"",G=s.getShaderInfoLog(A)||"",q=F.trim(),k=O.trim(),X=G.trim();let Z=!0,ce=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,w,A);else{const ue=sd(s,w,"vertex"),te=sd(s,A,"fragment");lt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+q+`
`+ue+`
`+te)}else q!==""?We("WebGLProgram: Program Info Log:",q):(k===""||X==="")&&(ce=!1);ce&&(D.diagnostics={runnable:Z,programLog:q,vertexShader:{log:k,prefix:g},fragmentShader:{log:X,prefix:m}})}s.deleteShader(w),s.deleteShader(A),L=new jr(s,x),M=$M(s,x)}let L;this.getUniforms=function(){return L===void 0&&R(this),L};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let E=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=s.getProgramParameter(x,VM)),E},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kM++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=A,this}let db=0;class hb{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new fb(e),t.set(e,i)),i}}class fb{constructor(e){this.id=db++,this.code=e,this.usedTimes=0}}function pb(n,e,t,i,s,r,a){const o=new sf,l=new hb,c=new Set,u=[],d=new Map,h=s.logarithmicDepthBuffer;let f=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,E,D,F,O){const G=F.fog,q=O.geometry,k=M.isMeshStandardMaterial?F.environment:null,X=(M.isMeshStandardMaterial?t:e).get(M.envMap||k),Z=X&&X.mapping===ha?X.image.height:null,ce=p[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&We("WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const ue=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,te=ue!==void 0?ue.length:0;let Pe=0;q.morphAttributes.position!==void 0&&(Pe=1),q.morphAttributes.normal!==void 0&&(Pe=2),q.morphAttributes.color!==void 0&&(Pe=3);let De,Qe,it,$;if(ce){const ct=Dn[ce];De=ct.vertexShader,Qe=ct.fragmentShader}else De=M.vertexShader,Qe=M.fragmentShader,l.update(M),it=l.getVertexShaderID(M),$=l.getFragmentShaderID(M);const ne=n.getRenderTarget(),_e=n.state.buffers.depth.getReversed(),Oe=O.isInstancedMesh===!0,pe=O.isBatchedMesh===!0,le=!!M.map,qe=!!M.matcap,Re=!!X,Le=!!M.aoMap,ze=!!M.lightMap,Fe=!!M.bumpMap,et=!!M.normalMap,P=!!M.displacementMap,je=!!M.emissiveMap,Be=!!M.metalnessMap,rt=!!M.roughnessMap,be=M.anisotropy>0,C=M.clearcoat>0,v=M.dispersion>0,N=M.iridescence>0,K=M.sheen>0,Q=M.transmission>0,Y=be&&!!M.anisotropyMap,we=C&&!!M.clearcoatMap,de=C&&!!M.clearcoatNormalMap,Ee=C&&!!M.clearcoatRoughnessMap,Ie=N&&!!M.iridescenceMap,se=N&&!!M.iridescenceThicknessMap,fe=K&&!!M.sheenColorMap,Me=K&&!!M.sheenRoughnessMap,Ae=!!M.specularMap,he=!!M.specularColorMap,Ye=!!M.specularIntensityMap,I=Q&&!!M.transmissionMap,ge=Q&&!!M.thicknessMap,oe=!!M.gradientMap,ye=!!M.alphaMap,re=M.alphaTest>0,ee=!!M.alphaHash,ae=!!M.extensions;let Ge=Un;M.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ge=n.toneMapping);const ft={shaderID:ce,shaderType:M.type,shaderName:M.name,vertexShader:De,fragmentShader:Qe,defines:M.defines,customVertexShaderID:it,customFragmentShaderID:$,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:pe,batchingColor:pe&&O._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&O.instanceColor!==null,instancingMorph:Oe&&O.morphTexture!==null,outputColorSpace:ne===null?n.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:ys,alphaToCoverage:!!M.alphaToCoverage,map:le,matcap:qe,envMap:Re,envMapMode:Re&&X.mapping,envMapCubeUVHeight:Z,aoMap:Le,lightMap:ze,bumpMap:Fe,normalMap:et,displacementMap:P,emissiveMap:je,normalMapObjectSpace:et&&M.normalMapType===kx,normalMapTangentSpace:et&&M.normalMapType===Vx,metalnessMap:Be,roughnessMap:rt,anisotropy:be,anisotropyMap:Y,clearcoat:C,clearcoatMap:we,clearcoatNormalMap:de,clearcoatRoughnessMap:Ee,dispersion:v,iridescence:N,iridescenceMap:Ie,iridescenceThicknessMap:se,sheen:K,sheenColorMap:fe,sheenRoughnessMap:Me,specularMap:Ae,specularColorMap:he,specularIntensityMap:Ye,transmission:Q,transmissionMap:I,thicknessMap:ge,gradientMap:oe,opaque:M.transparent===!1&&M.blending===fs&&M.alphaToCoverage===!1,alphaMap:ye,alphaTest:re,alphaHash:ee,combine:M.combine,mapUv:le&&x(M.map.channel),aoMapUv:Le&&x(M.aoMap.channel),lightMapUv:ze&&x(M.lightMap.channel),bumpMapUv:Fe&&x(M.bumpMap.channel),normalMapUv:et&&x(M.normalMap.channel),displacementMapUv:P&&x(M.displacementMap.channel),emissiveMapUv:je&&x(M.emissiveMap.channel),metalnessMapUv:Be&&x(M.metalnessMap.channel),roughnessMapUv:rt&&x(M.roughnessMap.channel),anisotropyMapUv:Y&&x(M.anisotropyMap.channel),clearcoatMapUv:we&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:de&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ee&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:se&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:fe&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:Me&&x(M.sheenRoughnessMap.channel),specularMapUv:Ae&&x(M.specularMap.channel),specularColorMapUv:he&&x(M.specularColorMap.channel),specularIntensityMapUv:Ye&&x(M.specularIntensityMap.channel),transmissionMapUv:I&&x(M.transmissionMap.channel),thicknessMapUv:ge&&x(M.thicknessMap.channel),alphaMapUv:ye&&x(M.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(et||be),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!q.attributes.uv&&(le||ye),fog:!!G,useFog:M.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:_e,skinning:O.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:Pe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ge,decodeVideoTexture:le&&M.map.isVideoTexture===!0&&st.getTransfer(M.map.colorSpace)===ht,decodeVideoTextureEmissive:je&&M.emissiveMap.isVideoTexture===!0&&st.getTransfer(M.emissiveMap.colorSpace)===ht,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Tn,flipSided:M.side===Ht,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:ae&&M.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ae&&M.extensions.multiDraw===!0||pe)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function m(M){const E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(const D in M.defines)E.push(D),E.push(M.defines[D]);return M.isRawShaderMaterial===!1&&(_(E,M),y(E,M),E.push(n.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function _(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function y(M,E){o.disableAll(),E.instancing&&o.enable(0),E.instancingColor&&o.enable(1),E.instancingMorph&&o.enable(2),E.matcap&&o.enable(3),E.envMap&&o.enable(4),E.normalMapObjectSpace&&o.enable(5),E.normalMapTangentSpace&&o.enable(6),E.clearcoat&&o.enable(7),E.iridescence&&o.enable(8),E.alphaTest&&o.enable(9),E.vertexColors&&o.enable(10),E.vertexAlphas&&o.enable(11),E.vertexUv1s&&o.enable(12),E.vertexUv2s&&o.enable(13),E.vertexUv3s&&o.enable(14),E.vertexTangents&&o.enable(15),E.anisotropy&&o.enable(16),E.alphaHash&&o.enable(17),E.batching&&o.enable(18),E.dispersion&&o.enable(19),E.batchingColor&&o.enable(20),E.gradientMap&&o.enable(21),M.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reversedDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.decodeVideoTextureEmissive&&o.enable(20),E.alphaToCoverage&&o.enable(21),M.push(o.mask)}function b(M){const E=p[M.type];let D;if(E){const F=Dn[E];D=R_.clone(F.uniforms)}else D=M.uniforms;return D}function w(M,E){let D=d.get(E);return D!==void 0?++D.usedTimes:(D=new ub(n,E,M,r),u.push(D),d.set(E,D)),D}function A(M){if(--M.usedTimes===0){const E=u.indexOf(M);u[E]=u[u.length-1],u.pop(),d.delete(M.cacheKey),M.destroy()}}function R(M){l.remove(M)}function L(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:b,acquireProgram:w,releaseProgram:A,releaseShaderCache:R,programs:u,dispose:L}}function mb(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function gb(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function cd(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function ud(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d,h,f,p,x,g){let m=n[e];return m===void 0?(m={id:d.id,object:d,geometry:h,material:f,groupOrder:p,renderOrder:d.renderOrder,z:x,group:g},n[e]=m):(m.id=d.id,m.object=d,m.geometry=h,m.material=f,m.groupOrder=p,m.renderOrder=d.renderOrder,m.z=x,m.group=g),e++,m}function o(d,h,f,p,x,g){const m=a(d,h,f,p,x,g);f.transmission>0?i.push(m):f.transparent===!0?s.push(m):t.push(m)}function l(d,h,f,p,x,g){const m=a(d,h,f,p,x,g);f.transmission>0?i.unshift(m):f.transparent===!0?s.unshift(m):t.unshift(m)}function c(d,h){t.length>1&&t.sort(d||gb),i.length>1&&i.sort(h||cd),s.length>1&&s.sort(h||cd)}function u(){for(let d=e,h=n.length;d<h;d++){const f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function xb(){let n=new WeakMap;function e(i,s){const r=n.get(i);let a;return r===void 0?(a=new ud,n.set(i,[a])):s>=r.length?(a=new ud,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function _b(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new V,color:new tt};break;case"SpotLight":t={position:new V,direction:new V,color:new tt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new V,color:new tt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new V,skyColor:new tt,groundColor:new tt};break;case"RectAreaLight":t={color:new tt,position:new V,halfWidth:new V,halfHeight:new V};break}return n[e.id]=t,t}}}function vb(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let yb=0;function Sb(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Mb(n){const e=new _b,t=vb(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new V);const s=new V,r=new yt,a=new yt;function o(c){let u=0,d=0,h=0;for(let M=0;M<9;M++)i.probe[M].set(0,0,0);let f=0,p=0,x=0,g=0,m=0,_=0,y=0,b=0,w=0,A=0,R=0;c.sort(Sb);for(let M=0,E=c.length;M<E;M++){const D=c[M],F=D.color,O=D.intensity,G=D.distance;let q=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===vs?q=D.shadow.map.texture:q=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=F.r*O,d+=F.g*O,h+=F.b*O;else if(D.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(D.sh.coefficients[k],O);R++}else if(D.isDirectionalLight){const k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const X=D.shadow,Z=t.get(D);Z.shadowIntensity=X.intensity,Z.shadowBias=X.bias,Z.shadowNormalBias=X.normalBias,Z.shadowRadius=X.radius,Z.shadowMapSize=X.mapSize,i.directionalShadow[f]=Z,i.directionalShadowMap[f]=q,i.directionalShadowMatrix[f]=D.shadow.matrix,_++}i.directional[f]=k,f++}else if(D.isSpotLight){const k=e.get(D);k.position.setFromMatrixPosition(D.matrixWorld),k.color.copy(F).multiplyScalar(O),k.distance=G,k.coneCos=Math.cos(D.angle),k.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),k.decay=D.decay,i.spot[x]=k;const X=D.shadow;if(D.map&&(i.spotLightMap[w]=D.map,w++,X.updateMatrices(D),D.castShadow&&A++),i.spotLightMatrix[x]=X.matrix,D.castShadow){const Z=t.get(D);Z.shadowIntensity=X.intensity,Z.shadowBias=X.bias,Z.shadowNormalBias=X.normalBias,Z.shadowRadius=X.radius,Z.shadowMapSize=X.mapSize,i.spotShadow[x]=Z,i.spotShadowMap[x]=q,b++}x++}else if(D.isRectAreaLight){const k=e.get(D);k.color.copy(F).multiplyScalar(O),k.halfWidth.set(D.width*.5,0,0),k.halfHeight.set(0,D.height*.5,0),i.rectArea[g]=k,g++}else if(D.isPointLight){const k=e.get(D);if(k.color.copy(D.color).multiplyScalar(D.intensity),k.distance=D.distance,k.decay=D.decay,D.castShadow){const X=D.shadow,Z=t.get(D);Z.shadowIntensity=X.intensity,Z.shadowBias=X.bias,Z.shadowNormalBias=X.normalBias,Z.shadowRadius=X.radius,Z.shadowMapSize=X.mapSize,Z.shadowCameraNear=X.camera.near,Z.shadowCameraFar=X.camera.far,i.pointShadow[p]=Z,i.pointShadowMap[p]=q,i.pointShadowMatrix[p]=D.shadow.matrix,y++}i.point[p]=k,p++}else if(D.isHemisphereLight){const k=e.get(D);k.skyColor.copy(D.color).multiplyScalar(O),k.groundColor.copy(D.groundColor).multiplyScalar(O),i.hemi[m]=k,m++}}g>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=xe.LTC_FLOAT_1,i.rectAreaLTC2=xe.LTC_FLOAT_2):(i.rectAreaLTC1=xe.LTC_HALF_1,i.rectAreaLTC2=xe.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const L=i.hash;(L.directionalLength!==f||L.pointLength!==p||L.spotLength!==x||L.rectAreaLength!==g||L.hemiLength!==m||L.numDirectionalShadows!==_||L.numPointShadows!==y||L.numSpotShadows!==b||L.numSpotMaps!==w||L.numLightProbes!==R)&&(i.directional.length=f,i.spot.length=x,i.rectArea.length=g,i.point.length=p,i.hemi.length=m,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=b+w-A,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,L.directionalLength=f,L.pointLength=p,L.spotLength=x,L.rectAreaLength=g,L.hemiLength=m,L.numDirectionalShadows=_,L.numPointShadows=y,L.numSpotShadows=b,L.numSpotMaps=w,L.numLightProbes=R,i.version=yb++)}function l(c,u){let d=0,h=0,f=0,p=0,x=0;const g=u.matrixWorldInverse;for(let m=0,_=c.length;m<_;m++){const y=c[m];if(y.isDirectionalLight){const b=i.directional[d];b.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),d++}else if(y.isSpotLight){const b=i.spot[f];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),b.direction.sub(s),b.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const b=i.rectArea[p];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(g),a.identity(),r.copy(y.matrixWorld),r.premultiply(g),a.extractRotation(r),b.halfWidth.set(y.width*.5,0,0),b.halfHeight.set(0,y.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),p++}else if(y.isPointLight){const b=i.point[h];b.position.setFromMatrixPosition(y.matrixWorld),b.position.applyMatrix4(g),h++}else if(y.isHemisphereLight){const b=i.hemi[x];b.direction.setFromMatrixPosition(y.matrixWorld),b.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:i}}function dd(n){const e=new Mb(n),t=[],i=[];function s(u){c.camera=u,t.length=0,i.length=0}function r(u){t.push(u)}function a(u){i.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function bb(n){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new dd(n),e.set(s,[o])):r>=a.length?(o=new dd(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const Eb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tb=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,wb=[new V(1,0,0),new V(-1,0,0),new V(0,1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1)],Ab=[new V(0,-1,0),new V(0,-1,0),new V(0,0,1),new V(0,0,-1),new V(0,-1,0),new V(0,-1,0)],hd=new yt,Ns=new V,lo=new V;function Cb(n,e,t){let i=new Ql;const s=new nt,r=new nt,a=new bt,o=new z_,l=new G_,c={},u=t.maxTextureSize,d={[mi]:Ht,[Ht]:mi,[Tn]:Tn},h=new Cn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:Eb,fragmentShader:Tb}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const p=new Xt;p.setAttribute("position",new xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Gt(p,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=kr;let m=this.type;this.render=function(A,R,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;A.type===gx&&(We("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),A.type=kr);const M=n.getRenderTarget(),E=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Yn),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=m!==this.type;O&&R.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(q=>q.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,q=A.length;G<q;G++){const k=A[G],X=k.shadow;if(X===void 0){We("WebGLShadowMap:",k,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;s.copy(X.mapSize);const Z=X.getFrameExtents();if(s.multiply(Z),r.copy(X.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Z.x),s.x=r.x*Z.x,X.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Z.y),s.y=r.y*Z.y,X.mapSize.y=r.y)),X.map===null||O===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Os){if(k.isPointLight){We("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new Fn(s.x,s.y,{format:vs,type:Zn,minFilter:Ot,magFilter:Ot,generateMipmaps:!1}),X.map.texture.name=k.name+".shadowMap",X.map.depthTexture=new Js(s.x,s.y,Ln),X.map.depthTexture.name=k.name+".shadowMapDepth",X.map.depthTexture.format=Jn,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=It,X.map.depthTexture.magFilter=It}else{k.isPointLight?(X.map=new df(s.x),X.map.depthTexture=new V_(s.x,On)):(X.map=new Fn(s.x,s.y),X.map.depthTexture=new Js(s.x,s.y,On)),X.map.depthTexture.name=k.name+".shadowMap",X.map.depthTexture.format=Jn;const ue=n.state.buffers.depth.getReversed();this.type===kr?(X.map.depthTexture.compareFunction=ue?Kl:$l,X.map.depthTexture.minFilter=Ot,X.map.depthTexture.magFilter=Ot):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=It,X.map.depthTexture.magFilter=It)}X.camera.updateProjectionMatrix()}const ce=X.map.isWebGLCubeRenderTarget?6:1;for(let ue=0;ue<ce;ue++){if(X.map.isWebGLCubeRenderTarget)n.setRenderTarget(X.map,ue),n.clear();else{ue===0&&(n.setRenderTarget(X.map),n.clear());const te=X.getViewport(ue);a.set(r.x*te.x,r.y*te.y,r.x*te.z,r.y*te.w),F.viewport(a)}if(k.isPointLight){const te=X.camera,Pe=X.matrix,De=k.distance||te.far;De!==te.far&&(te.far=De,te.updateProjectionMatrix()),Ns.setFromMatrixPosition(k.matrixWorld),te.position.copy(Ns),lo.copy(te.position),lo.add(wb[ue]),te.up.copy(Ab[ue]),te.lookAt(lo),te.updateMatrixWorld(),Pe.makeTranslation(-Ns.x,-Ns.y,-Ns.z),hd.multiplyMatrices(te.projectionMatrix,te.matrixWorldInverse),X._frustum.setFromProjectionMatrix(hd,te.coordinateSystem,te.reversedDepth)}else X.updateMatrices(k);i=X.getFrustum(),b(R,L,X.camera,k,this.type)}X.isPointLightShadow!==!0&&this.type===Os&&_(X,L),X.needsUpdate=!1}m=this.type,g.needsUpdate=!1,n.setRenderTarget(M,E,D)};function _(A,R){const L=e.update(x);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Fn(s.x,s.y,{format:vs,type:Zn})),h.uniforms.shadow_pass.value=A.map.depthTexture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(R,null,L,h,x,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(R,null,L,f,x,null)}function y(A,R,L,M){let E=null;const D=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)E=D;else if(E=L.isPointLight===!0?l:o,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0||R.alphaToCoverage===!0){const F=E.uuid,O=R.uuid;let G=c[F];G===void 0&&(G={},c[F]=G);let q=G[O];q===void 0&&(q=E.clone(),G[O]=q,R.addEventListener("dispose",w)),E=q}if(E.visible=R.visible,E.wireframe=R.wireframe,M===Os?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:d[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaToCoverage===!0?.5:R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,L.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const F=n.properties.get(E);F.light=L}return E}function b(A,R,L,M,E){if(A.visible===!1)return;if(A.layers.test(R.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&E===Os)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);const O=e.update(A),G=A.material;if(Array.isArray(G)){const q=O.groups;for(let k=0,X=q.length;k<X;k++){const Z=q[k],ce=G[Z.materialIndex];if(ce&&ce.visible){const ue=y(A,ce,M,E);A.onBeforeShadow(n,A,R,L,O,ue,Z),n.renderBufferDirect(L,null,O,ue,A,Z),A.onAfterShadow(n,A,R,L,O,ue,Z)}}}else if(G.visible){const q=y(A,G,M,E);A.onBeforeShadow(n,A,R,L,O,q,null),n.renderBufferDirect(L,null,O,q,A,null),A.onAfterShadow(n,A,R,L,O,q,null)}}const F=A.children;for(let O=0,G=F.length;O<G;O++)b(F[O],R,L,M,E)}function w(A){A.target.removeEventListener("dispose",w);for(const L in c){const M=c[L],E=A.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}const Rb={[wo]:Ao,[Co]:Do,[Ro]:Lo,[xs]:Po,[Ao]:wo,[Do]:Co,[Lo]:Ro,[Po]:xs};function Pb(n,e){function t(){let I=!1;const ge=new bt;let oe=null;const ye=new bt(0,0,0,0);return{setMask:function(re){oe!==re&&!I&&(n.colorMask(re,re,re,re),oe=re)},setLocked:function(re){I=re},setClear:function(re,ee,ae,Ge,ft){ft===!0&&(re*=Ge,ee*=Ge,ae*=Ge),ge.set(re,ee,ae,Ge),ye.equals(ge)===!1&&(n.clearColor(re,ee,ae,Ge),ye.copy(ge))},reset:function(){I=!1,oe=null,ye.set(-1,0,0,0)}}}function i(){let I=!1,ge=!1,oe=null,ye=null,re=null;return{setReversed:function(ee){if(ge!==ee){const ae=e.get("EXT_clip_control");ee?ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.ZERO_TO_ONE_EXT):ae.clipControlEXT(ae.LOWER_LEFT_EXT,ae.NEGATIVE_ONE_TO_ONE_EXT),ge=ee;const Ge=re;re=null,this.setClear(Ge)}},getReversed:function(){return ge},setTest:function(ee){ee?ne(n.DEPTH_TEST):_e(n.DEPTH_TEST)},setMask:function(ee){oe!==ee&&!I&&(n.depthMask(ee),oe=ee)},setFunc:function(ee){if(ge&&(ee=Rb[ee]),ye!==ee){switch(ee){case wo:n.depthFunc(n.NEVER);break;case Ao:n.depthFunc(n.ALWAYS);break;case Co:n.depthFunc(n.LESS);break;case xs:n.depthFunc(n.LEQUAL);break;case Ro:n.depthFunc(n.EQUAL);break;case Po:n.depthFunc(n.GEQUAL);break;case Do:n.depthFunc(n.GREATER);break;case Lo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ye=ee}},setLocked:function(ee){I=ee},setClear:function(ee){re!==ee&&(ge&&(ee=1-ee),n.clearDepth(ee),re=ee)},reset:function(){I=!1,oe=null,ye=null,re=null,ge=!1}}}function s(){let I=!1,ge=null,oe=null,ye=null,re=null,ee=null,ae=null,Ge=null,ft=null;return{setTest:function(ct){I||(ct?ne(n.STENCIL_TEST):_e(n.STENCIL_TEST))},setMask:function(ct){ge!==ct&&!I&&(n.stencilMask(ct),ge=ct)},setFunc:function(ct,ln,_n){(oe!==ct||ye!==ln||re!==_n)&&(n.stencilFunc(ct,ln,_n),oe=ct,ye=ln,re=_n)},setOp:function(ct,ln,_n){(ee!==ct||ae!==ln||Ge!==_n)&&(n.stencilOp(ct,ln,_n),ee=ct,ae=ln,Ge=_n)},setLocked:function(ct){I=ct},setClear:function(ct){ft!==ct&&(n.clearStencil(ct),ft=ct)},reset:function(){I=!1,ge=null,oe=null,ye=null,re=null,ee=null,ae=null,Ge=null,ft=null}}}const r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,f=[],p=null,x=!1,g=null,m=null,_=null,y=null,b=null,w=null,A=null,R=new tt(0,0,0),L=0,M=!1,E=null,D=null,F=null,O=null,G=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,X=0;const Z=n.getParameter(n.VERSION);Z.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(Z)[1]),k=X>=1):Z.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),k=X>=2);let ce=null,ue={};const te=n.getParameter(n.SCISSOR_BOX),Pe=n.getParameter(n.VIEWPORT),De=new bt().fromArray(te),Qe=new bt().fromArray(Pe);function it(I,ge,oe,ye){const re=new Uint8Array(4),ee=n.createTexture();n.bindTexture(I,ee),n.texParameteri(I,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(I,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ae=0;ae<oe;ae++)I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,ye,0,n.RGBA,n.UNSIGNED_BYTE,re):n.texImage2D(ge+ae,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,re);return ee}const $={};$[n.TEXTURE_2D]=it(n.TEXTURE_2D,n.TEXTURE_2D,1),$[n.TEXTURE_CUBE_MAP]=it(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[n.TEXTURE_2D_ARRAY]=it(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),$[n.TEXTURE_3D]=it(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(n.DEPTH_TEST),a.setFunc(xs),Fe(!1),et(hu),ne(n.CULL_FACE),Le(Yn);function ne(I){u[I]!==!0&&(n.enable(I),u[I]=!0)}function _e(I){u[I]!==!1&&(n.disable(I),u[I]=!1)}function Oe(I,ge){return d[I]!==ge?(n.bindFramebuffer(I,ge),d[I]=ge,I===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=ge),I===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function pe(I,ge){let oe=f,ye=!1;if(I){oe=h.get(ge),oe===void 0&&(oe=[],h.set(ge,oe));const re=I.textures;if(oe.length!==re.length||oe[0]!==n.COLOR_ATTACHMENT0){for(let ee=0,ae=re.length;ee<ae;ee++)oe[ee]=n.COLOR_ATTACHMENT0+ee;oe.length=re.length,ye=!0}}else oe[0]!==n.BACK&&(oe[0]=n.BACK,ye=!0);ye&&n.drawBuffers(oe)}function le(I){return p!==I?(n.useProgram(I),p=I,!0):!1}const qe={[Ii]:n.FUNC_ADD,[_x]:n.FUNC_SUBTRACT,[vx]:n.FUNC_REVERSE_SUBTRACT};qe[yx]=n.MIN,qe[Sx]=n.MAX;const Re={[Mx]:n.ZERO,[bx]:n.ONE,[Ex]:n.SRC_COLOR,[Eo]:n.SRC_ALPHA,[Px]:n.SRC_ALPHA_SATURATE,[Cx]:n.DST_COLOR,[wx]:n.DST_ALPHA,[Tx]:n.ONE_MINUS_SRC_COLOR,[To]:n.ONE_MINUS_SRC_ALPHA,[Rx]:n.ONE_MINUS_DST_COLOR,[Ax]:n.ONE_MINUS_DST_ALPHA,[Dx]:n.CONSTANT_COLOR,[Lx]:n.ONE_MINUS_CONSTANT_COLOR,[Ix]:n.CONSTANT_ALPHA,[Nx]:n.ONE_MINUS_CONSTANT_ALPHA};function Le(I,ge,oe,ye,re,ee,ae,Ge,ft,ct){if(I===Yn){x===!0&&(_e(n.BLEND),x=!1);return}if(x===!1&&(ne(n.BLEND),x=!0),I!==xx){if(I!==g||ct!==M){if((m!==Ii||b!==Ii)&&(n.blendEquation(n.FUNC_ADD),m=Ii,b=Ii),ct)switch(I){case fs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pn:n.blendFunc(n.ONE,n.ONE);break;case fu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case pu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:lt("WebGLState: Invalid blending: ",I);break}else switch(I){case fs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case fu:lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case pu:lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:lt("WebGLState: Invalid blending: ",I);break}_=null,y=null,w=null,A=null,R.set(0,0,0),L=0,g=I,M=ct}return}re=re||ge,ee=ee||oe,ae=ae||ye,(ge!==m||re!==b)&&(n.blendEquationSeparate(qe[ge],qe[re]),m=ge,b=re),(oe!==_||ye!==y||ee!==w||ae!==A)&&(n.blendFuncSeparate(Re[oe],Re[ye],Re[ee],Re[ae]),_=oe,y=ye,w=ee,A=ae),(Ge.equals(R)===!1||ft!==L)&&(n.blendColor(Ge.r,Ge.g,Ge.b,ft),R.copy(Ge),L=ft),g=I,M=!1}function ze(I,ge){I.side===Tn?_e(n.CULL_FACE):ne(n.CULL_FACE);let oe=I.side===Ht;ge&&(oe=!oe),Fe(oe),I.blending===fs&&I.transparent===!1?Le(Yn):Le(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const ye=I.stencilWrite;o.setTest(ye),ye&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),je(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ne(n.SAMPLE_ALPHA_TO_COVERAGE):_e(n.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(I){E!==I&&(I?n.frontFace(n.CW):n.frontFace(n.CCW),E=I)}function et(I){I!==px?(ne(n.CULL_FACE),I!==D&&(I===hu?n.cullFace(n.BACK):I===mx?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):_e(n.CULL_FACE),D=I}function P(I){I!==F&&(k&&n.lineWidth(I),F=I)}function je(I,ge,oe){I?(ne(n.POLYGON_OFFSET_FILL),(O!==ge||G!==oe)&&(n.polygonOffset(ge,oe),O=ge,G=oe)):_e(n.POLYGON_OFFSET_FILL)}function Be(I){I?ne(n.SCISSOR_TEST):_e(n.SCISSOR_TEST)}function rt(I){I===void 0&&(I=n.TEXTURE0+q-1),ce!==I&&(n.activeTexture(I),ce=I)}function be(I,ge,oe){oe===void 0&&(ce===null?oe=n.TEXTURE0+q-1:oe=ce);let ye=ue[oe];ye===void 0&&(ye={type:void 0,texture:void 0},ue[oe]=ye),(ye.type!==I||ye.texture!==ge)&&(ce!==oe&&(n.activeTexture(oe),ce=oe),n.bindTexture(I,ge||$[I]),ye.type=I,ye.texture=ge)}function C(){const I=ue[ce];I!==void 0&&I.type!==void 0&&(n.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(I){lt("WebGLState:",I)}}function N(){try{n.compressedTexImage3D(...arguments)}catch(I){lt("WebGLState:",I)}}function K(){try{n.texSubImage2D(...arguments)}catch(I){lt("WebGLState:",I)}}function Q(){try{n.texSubImage3D(...arguments)}catch(I){lt("WebGLState:",I)}}function Y(){try{n.compressedTexSubImage2D(...arguments)}catch(I){lt("WebGLState:",I)}}function we(){try{n.compressedTexSubImage3D(...arguments)}catch(I){lt("WebGLState:",I)}}function de(){try{n.texStorage2D(...arguments)}catch(I){lt("WebGLState:",I)}}function Ee(){try{n.texStorage3D(...arguments)}catch(I){lt("WebGLState:",I)}}function Ie(){try{n.texImage2D(...arguments)}catch(I){lt("WebGLState:",I)}}function se(){try{n.texImage3D(...arguments)}catch(I){lt("WebGLState:",I)}}function fe(I){De.equals(I)===!1&&(n.scissor(I.x,I.y,I.z,I.w),De.copy(I))}function Me(I){Qe.equals(I)===!1&&(n.viewport(I.x,I.y,I.z,I.w),Qe.copy(I))}function Ae(I,ge){let oe=c.get(ge);oe===void 0&&(oe=new WeakMap,c.set(ge,oe));let ye=oe.get(I);ye===void 0&&(ye=n.getUniformBlockIndex(ge,I.name),oe.set(I,ye))}function he(I,ge){const ye=c.get(ge).get(I);l.get(ge)!==ye&&(n.uniformBlockBinding(ge,ye,I.__bindingPointIndex),l.set(ge,ye))}function Ye(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ce=null,ue={},d={},h=new WeakMap,f=[],p=null,x=!1,g=null,m=null,_=null,y=null,b=null,w=null,A=null,R=new tt(0,0,0),L=0,M=!1,E=null,D=null,F=null,O=null,G=null,De.set(0,0,n.canvas.width,n.canvas.height),Qe.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:_e,bindFramebuffer:Oe,drawBuffers:pe,useProgram:le,setBlending:Le,setMaterial:ze,setFlipSided:Fe,setCullFace:et,setLineWidth:P,setPolygonOffset:je,setScissorTest:Be,activeTexture:rt,bindTexture:be,unbindTexture:C,compressedTexImage2D:v,compressedTexImage3D:N,texImage2D:Ie,texImage3D:se,updateUBOMapping:Ae,uniformBlockBinding:he,texStorage2D:de,texStorage3D:Ee,texSubImage2D:K,texSubImage3D:Q,compressedTexSubImage2D:Y,compressedTexSubImage3D:we,scissor:fe,viewport:Me,reset:Ye}}function Db(n,e,t,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new nt,u=new WeakMap;let d;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(C,v){return f?new OffscreenCanvas(C,v):na("canvas")}function x(C,v,N){let K=1;const Q=be(C);if((Q.width>N||Q.height>N)&&(K=N/Math.max(Q.width,Q.height)),K<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const Y=Math.floor(K*Q.width),we=Math.floor(K*Q.height);d===void 0&&(d=p(Y,we));const de=v?p(Y,we):d;return de.width=Y,de.height=we,de.getContext("2d").drawImage(C,0,0,Y,we),We("WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+Y+"x"+we+")."),de}else return"data"in C&&We("WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),C;return C}function g(C){return C.generateMipmaps}function m(C){n.generateMipmap(C)}function _(C){return C.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?n.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(C,v,N,K,Q=!1){if(C!==null){if(n[C]!==void 0)return n[C];We("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let Y=v;if(v===n.RED&&(N===n.FLOAT&&(Y=n.R32F),N===n.HALF_FLOAT&&(Y=n.R16F),N===n.UNSIGNED_BYTE&&(Y=n.R8)),v===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.R8UI),N===n.UNSIGNED_SHORT&&(Y=n.R16UI),N===n.UNSIGNED_INT&&(Y=n.R32UI),N===n.BYTE&&(Y=n.R8I),N===n.SHORT&&(Y=n.R16I),N===n.INT&&(Y=n.R32I)),v===n.RG&&(N===n.FLOAT&&(Y=n.RG32F),N===n.HALF_FLOAT&&(Y=n.RG16F),N===n.UNSIGNED_BYTE&&(Y=n.RG8)),v===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.RG8UI),N===n.UNSIGNED_SHORT&&(Y=n.RG16UI),N===n.UNSIGNED_INT&&(Y=n.RG32UI),N===n.BYTE&&(Y=n.RG8I),N===n.SHORT&&(Y=n.RG16I),N===n.INT&&(Y=n.RG32I)),v===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.RGB8UI),N===n.UNSIGNED_SHORT&&(Y=n.RGB16UI),N===n.UNSIGNED_INT&&(Y=n.RGB32UI),N===n.BYTE&&(Y=n.RGB8I),N===n.SHORT&&(Y=n.RGB16I),N===n.INT&&(Y=n.RGB32I)),v===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(Y=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(Y=n.RGBA16UI),N===n.UNSIGNED_INT&&(Y=n.RGBA32UI),N===n.BYTE&&(Y=n.RGBA8I),N===n.SHORT&&(Y=n.RGBA16I),N===n.INT&&(Y=n.RGBA32I)),v===n.RGB&&(N===n.UNSIGNED_INT_5_9_9_9_REV&&(Y=n.RGB9_E5),N===n.UNSIGNED_INT_10F_11F_11F_REV&&(Y=n.R11F_G11F_B10F)),v===n.RGBA){const we=Q?ea:st.getTransfer(K);N===n.FLOAT&&(Y=n.RGBA32F),N===n.HALF_FLOAT&&(Y=n.RGBA16F),N===n.UNSIGNED_BYTE&&(Y=we===ht?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(Y=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(Y=n.RGB5_A1)}return(Y===n.R16F||Y===n.R32F||Y===n.RG16F||Y===n.RG32F||Y===n.RGBA16F||Y===n.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function b(C,v){let N;return C?v===null||v===On||v===$s?N=n.DEPTH24_STENCIL8:v===Ln?N=n.DEPTH32F_STENCIL8:v===Ys&&(N=n.DEPTH24_STENCIL8,We("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===On||v===$s?N=n.DEPTH_COMPONENT24:v===Ln?N=n.DEPTH_COMPONENT32F:v===Ys&&(N=n.DEPTH_COMPONENT16),N}function w(C,v){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==It&&C.minFilter!==Ot?Math.log2(Math.max(v.width,v.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?v.mipmaps.length:1}function A(C){const v=C.target;v.removeEventListener("dispose",A),L(v),v.isVideoTexture&&u.delete(v)}function R(C){const v=C.target;v.removeEventListener("dispose",R),E(v)}function L(C){const v=i.get(C);if(v.__webglInit===void 0)return;const N=C.source,K=h.get(N);if(K){const Q=K[v.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&M(C),Object.keys(K).length===0&&h.delete(N)}i.remove(C)}function M(C){const v=i.get(C);n.deleteTexture(v.__webglTexture);const N=C.source,K=h.get(N);delete K[v.__cacheKey],a.memory.textures--}function E(C){const v=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let Q=0;Q<v.__webglFramebuffer[K].length;Q++)n.deleteFramebuffer(v.__webglFramebuffer[K][Q]);else n.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)n.deleteFramebuffer(v.__webglFramebuffer[K]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const N=C.textures;for(let K=0,Q=N.length;K<Q;K++){const Y=i.get(N[K]);Y.__webglTexture&&(n.deleteTexture(Y.__webglTexture),a.memory.textures--),i.remove(N[K])}i.remove(C)}let D=0;function F(){D=0}function O(){const C=D;return C>=s.maxTextures&&We("WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),D+=1,C}function G(C){const v=[];return v.push(C.wrapS),v.push(C.wrapT),v.push(C.wrapR||0),v.push(C.magFilter),v.push(C.minFilter),v.push(C.anisotropy),v.push(C.internalFormat),v.push(C.format),v.push(C.type),v.push(C.generateMipmaps),v.push(C.premultiplyAlpha),v.push(C.flipY),v.push(C.unpackAlignment),v.push(C.colorSpace),v.join()}function q(C,v){const N=i.get(C);if(C.isVideoTexture&&Be(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&N.__version!==C.version){const K=C.image;if(K===null)We("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)We("WebGLRenderer: Texture marked for update but image is incomplete");else{$(N,C,v);return}}else C.isExternalTexture&&(N.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+v)}function k(C,v){const N=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&N.__version!==C.version){$(N,C,v);return}else C.isExternalTexture&&(N.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+v)}function X(C,v){const N=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&N.__version!==C.version){$(N,C,v);return}t.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+v)}function Z(C,v){const N=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&N.__version!==C.version){ne(N,C,v);return}t.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+v)}const ce={[Uo]:n.REPEAT,[jn]:n.CLAMP_TO_EDGE,[Fo]:n.MIRRORED_REPEAT},ue={[It]:n.NEAREST,[Ox]:n.NEAREST_MIPMAP_NEAREST,[pr]:n.NEAREST_MIPMAP_LINEAR,[Ot]:n.LINEAR,[Ia]:n.LINEAR_MIPMAP_NEAREST,[Bi]:n.LINEAR_MIPMAP_LINEAR},te={[zx]:n.NEVER,[Xx]:n.ALWAYS,[Gx]:n.LESS,[$l]:n.LEQUAL,[Hx]:n.EQUAL,[Kl]:n.GEQUAL,[Wx]:n.GREATER,[jx]:n.NOTEQUAL};function Pe(C,v){if(v.type===Ln&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ot||v.magFilter===Ia||v.magFilter===pr||v.magFilter===Bi||v.minFilter===Ot||v.minFilter===Ia||v.minFilter===pr||v.minFilter===Bi)&&We("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(C,n.TEXTURE_WRAP_S,ce[v.wrapS]),n.texParameteri(C,n.TEXTURE_WRAP_T,ce[v.wrapT]),(C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY)&&n.texParameteri(C,n.TEXTURE_WRAP_R,ce[v.wrapR]),n.texParameteri(C,n.TEXTURE_MAG_FILTER,ue[v.magFilter]),n.texParameteri(C,n.TEXTURE_MIN_FILTER,ue[v.minFilter]),v.compareFunction&&(n.texParameteri(C,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(C,n.TEXTURE_COMPARE_FUNC,te[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===It||v.minFilter!==pr&&v.minFilter!==Bi||v.type===Ln&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const N=e.get("EXT_texture_filter_anisotropic");n.texParameterf(C,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function De(C,v){let N=!1;C.__webglInit===void 0&&(C.__webglInit=!0,v.addEventListener("dispose",A));const K=v.source;let Q=h.get(K);Q===void 0&&(Q={},h.set(K,Q));const Y=G(v);if(Y!==C.__cacheKey){Q[Y]===void 0&&(Q[Y]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Q[Y].usedTimes++;const we=Q[C.__cacheKey];we!==void 0&&(Q[C.__cacheKey].usedTimes--,we.usedTimes===0&&M(v)),C.__cacheKey=Y,C.__webglTexture=Q[Y].texture}return N}function Qe(C,v,N){return Math.floor(Math.floor(C/N)/v)}function it(C,v,N,K){const Y=C.updateRanges;if(Y.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,N,K,v.data);else{Y.sort((se,fe)=>se.start-fe.start);let we=0;for(let se=1;se<Y.length;se++){const fe=Y[we],Me=Y[se],Ae=fe.start+fe.count,he=Qe(Me.start,v.width,4),Ye=Qe(fe.start,v.width,4);Me.start<=Ae+1&&he===Ye&&Qe(Me.start+Me.count-1,v.width,4)===he?fe.count=Math.max(fe.count,Me.start+Me.count-fe.start):(++we,Y[we]=Me)}Y.length=we+1;const de=n.getParameter(n.UNPACK_ROW_LENGTH),Ee=n.getParameter(n.UNPACK_SKIP_PIXELS),Ie=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let se=0,fe=Y.length;se<fe;se++){const Me=Y[se],Ae=Math.floor(Me.start/4),he=Math.ceil(Me.count/4),Ye=Ae%v.width,I=Math.floor(Ae/v.width),ge=he,oe=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ye),n.pixelStorei(n.UNPACK_SKIP_ROWS,I),t.texSubImage2D(n.TEXTURE_2D,0,Ye,I,ge,oe,N,K,v.data)}C.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,de),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ee),n.pixelStorei(n.UNPACK_SKIP_ROWS,Ie)}}function $(C,v,N){let K=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=n.TEXTURE_3D);const Q=De(C,v),Y=v.source;t.bindTexture(K,C.__webglTexture,n.TEXTURE0+N);const we=i.get(Y);if(Y.version!==we.__version||Q===!0){t.activeTexture(n.TEXTURE0+N);const de=st.getPrimaries(st.workingColorSpace),Ee=v.colorSpace===ui?null:st.getPrimaries(v.colorSpace),Ie=v.colorSpace===ui||de===Ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let se=x(v.image,!1,s.maxTextureSize);se=rt(v,se);const fe=r.convert(v.format,v.colorSpace),Me=r.convert(v.type);let Ae=y(v.internalFormat,fe,Me,v.colorSpace,v.isVideoTexture);Pe(K,v);let he;const Ye=v.mipmaps,I=v.isVideoTexture!==!0,ge=we.__version===void 0||Q===!0,oe=Y.dataReady,ye=w(v,se);if(v.isDepthTexture)Ae=b(v.format===Vi,v.type),ge&&(I?t.texStorage2D(n.TEXTURE_2D,1,Ae,se.width,se.height):t.texImage2D(n.TEXTURE_2D,0,Ae,se.width,se.height,0,fe,Me,null));else if(v.isDataTexture)if(Ye.length>0){I&&ge&&t.texStorage2D(n.TEXTURE_2D,ye,Ae,Ye[0].width,Ye[0].height);for(let re=0,ee=Ye.length;re<ee;re++)he=Ye[re],I?oe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,he.width,he.height,fe,Me,he.data):t.texImage2D(n.TEXTURE_2D,re,Ae,he.width,he.height,0,fe,Me,he.data);v.generateMipmaps=!1}else I?(ge&&t.texStorage2D(n.TEXTURE_2D,ye,Ae,se.width,se.height),oe&&it(v,se,fe,Me)):t.texImage2D(n.TEXTURE_2D,0,Ae,se.width,se.height,0,fe,Me,se.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){I&&ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Ae,Ye[0].width,Ye[0].height,se.depth);for(let re=0,ee=Ye.length;re<ee;re++)if(he=Ye[re],v.format!==An)if(fe!==null)if(I){if(oe)if(v.layerUpdates.size>0){const ae=Hu(he.width,he.height,v.format,v.type);for(const Ge of v.layerUpdates){const ft=he.data.subarray(Ge*ae/he.data.BYTES_PER_ELEMENT,(Ge+1)*ae/he.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,Ge,he.width,he.height,1,fe,ft)}v.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,he.width,he.height,se.depth,fe,he.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Ae,he.width,he.height,se.depth,0,he.data,0,0);else We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else I?oe&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,he.width,he.height,se.depth,fe,Me,he.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Ae,he.width,he.height,se.depth,0,fe,Me,he.data)}else{I&&ge&&t.texStorage2D(n.TEXTURE_2D,ye,Ae,Ye[0].width,Ye[0].height);for(let re=0,ee=Ye.length;re<ee;re++)he=Ye[re],v.format!==An?fe!==null?I?oe&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,he.width,he.height,fe,he.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Ae,he.width,he.height,0,he.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):I?oe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,he.width,he.height,fe,Me,he.data):t.texImage2D(n.TEXTURE_2D,re,Ae,he.width,he.height,0,fe,Me,he.data)}else if(v.isDataArrayTexture)if(I){if(ge&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ye,Ae,se.width,se.height,se.depth),oe)if(v.layerUpdates.size>0){const re=Hu(se.width,se.height,v.format,v.type);for(const ee of v.layerUpdates){const ae=se.data.subarray(ee*re/se.data.BYTES_PER_ELEMENT,(ee+1)*re/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ee,se.width,se.height,1,fe,Me,ae)}v.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,fe,Me,se.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ae,se.width,se.height,se.depth,0,fe,Me,se.data);else if(v.isData3DTexture)I?(ge&&t.texStorage3D(n.TEXTURE_3D,ye,Ae,se.width,se.height,se.depth),oe&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,fe,Me,se.data)):t.texImage3D(n.TEXTURE_3D,0,Ae,se.width,se.height,se.depth,0,fe,Me,se.data);else if(v.isFramebufferTexture){if(ge)if(I)t.texStorage2D(n.TEXTURE_2D,ye,Ae,se.width,se.height);else{let re=se.width,ee=se.height;for(let ae=0;ae<ye;ae++)t.texImage2D(n.TEXTURE_2D,ae,Ae,re,ee,0,fe,Me,null),re>>=1,ee>>=1}}else if(Ye.length>0){if(I&&ge){const re=be(Ye[0]);t.texStorage2D(n.TEXTURE_2D,ye,Ae,re.width,re.height)}for(let re=0,ee=Ye.length;re<ee;re++)he=Ye[re],I?oe&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,fe,Me,he):t.texImage2D(n.TEXTURE_2D,re,Ae,fe,Me,he);v.generateMipmaps=!1}else if(I){if(ge){const re=be(se);t.texStorage2D(n.TEXTURE_2D,ye,Ae,re.width,re.height)}oe&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Me,se)}else t.texImage2D(n.TEXTURE_2D,0,Ae,fe,Me,se);g(v)&&m(K),we.__version=Y.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function ne(C,v,N){if(v.image.length!==6)return;const K=De(C,v),Q=v.source;t.bindTexture(n.TEXTURE_CUBE_MAP,C.__webglTexture,n.TEXTURE0+N);const Y=i.get(Q);if(Q.version!==Y.__version||K===!0){t.activeTexture(n.TEXTURE0+N);const we=st.getPrimaries(st.workingColorSpace),de=v.colorSpace===ui?null:st.getPrimaries(v.colorSpace),Ee=v.colorSpace===ui||we===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Ie=v.isCompressedTexture||v.image[0].isCompressedTexture,se=v.image[0]&&v.image[0].isDataTexture,fe=[];for(let ee=0;ee<6;ee++)!Ie&&!se?fe[ee]=x(v.image[ee],!0,s.maxCubemapSize):fe[ee]=se?v.image[ee].image:v.image[ee],fe[ee]=rt(v,fe[ee]);const Me=fe[0],Ae=r.convert(v.format,v.colorSpace),he=r.convert(v.type),Ye=y(v.internalFormat,Ae,he,v.colorSpace),I=v.isVideoTexture!==!0,ge=Y.__version===void 0||K===!0,oe=Q.dataReady;let ye=w(v,Me);Pe(n.TEXTURE_CUBE_MAP,v);let re;if(Ie){I&&ge&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Ye,Me.width,Me.height);for(let ee=0;ee<6;ee++){re=fe[ee].mipmaps;for(let ae=0;ae<re.length;ae++){const Ge=re[ae];v.format!==An?Ae!==null?I?oe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae,0,0,Ge.width,Ge.height,Ae,Ge.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae,Ye,Ge.width,Ge.height,0,Ge.data):We("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae,0,0,Ge.width,Ge.height,Ae,he,Ge.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae,Ye,Ge.width,Ge.height,0,Ae,he,Ge.data)}}}else{if(re=v.mipmaps,I&&ge){re.length>0&&ye++;const ee=be(fe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Ye,ee.width,ee.height)}for(let ee=0;ee<6;ee++)if(se){I?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,fe[ee].width,fe[ee].height,Ae,he,fe[ee].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ye,fe[ee].width,fe[ee].height,0,Ae,he,fe[ee].data);for(let ae=0;ae<re.length;ae++){const ft=re[ae].image[ee].image;I?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae+1,0,0,ft.width,ft.height,Ae,he,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae+1,Ye,ft.width,ft.height,0,Ae,he,ft.data)}}else{I?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,0,0,Ae,he,fe[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0,Ye,Ae,he,fe[ee]);for(let ae=0;ae<re.length;ae++){const Ge=re[ae];I?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae+1,0,0,Ae,he,Ge.image[ee]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ee,ae+1,Ye,Ae,he,Ge.image[ee])}}}g(v)&&m(n.TEXTURE_CUBE_MAP),Y.__version=Q.version,v.onUpdate&&v.onUpdate(v)}C.__version=v.version}function _e(C,v,N,K,Q,Y){const we=r.convert(N.format,N.colorSpace),de=r.convert(N.type),Ee=y(N.internalFormat,we,de,N.colorSpace),Ie=i.get(v),se=i.get(N);if(se.__renderTarget=v,!Ie.__hasExternalTextures){const fe=Math.max(1,v.width>>Y),Me=Math.max(1,v.height>>Y);Q===n.TEXTURE_3D||Q===n.TEXTURE_2D_ARRAY?t.texImage3D(Q,Y,Ee,fe,Me,v.depth,0,we,de,null):t.texImage2D(Q,Y,Ee,fe,Me,0,we,de,null)}t.bindFramebuffer(n.FRAMEBUFFER,C),je(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,K,Q,se.__webglTexture,0,P(v)):(Q===n.TEXTURE_2D||Q>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,K,Q,se.__webglTexture,Y),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Oe(C,v,N){if(n.bindRenderbuffer(n.RENDERBUFFER,C),v.depthBuffer){const K=v.depthTexture,Q=K&&K.isDepthTexture?K.type:null,Y=b(v.stencilBuffer,Q),we=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;je(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,P(v),Y,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,P(v),Y,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Y,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,we,n.RENDERBUFFER,C)}else{const K=v.textures;for(let Q=0;Q<K.length;Q++){const Y=K[Q],we=r.convert(Y.format,Y.colorSpace),de=r.convert(Y.type),Ee=y(Y.internalFormat,we,de,Y.colorSpace);je(v)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,P(v),Ee,v.width,v.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,P(v),Ee,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Ee,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function pe(C,v,N){const K=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,C),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=i.get(v.depthTexture);if(Q.__renderTarget=v,(!Q.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),K){if(Q.__webglInit===void 0&&(Q.__webglInit=!0,v.depthTexture.addEventListener("dispose",A)),Q.__webglTexture===void 0){Q.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,Q.__webglTexture),Pe(n.TEXTURE_CUBE_MAP,v.depthTexture);const Ie=r.convert(v.depthTexture.format),se=r.convert(v.depthTexture.type);let fe;v.depthTexture.format===Jn?fe=n.DEPTH_COMPONENT24:v.depthTexture.format===Vi&&(fe=n.DEPTH24_STENCIL8);for(let Me=0;Me<6;Me++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Me,0,fe,v.width,v.height,0,Ie,se,null)}}else q(v.depthTexture,0);const Y=Q.__webglTexture,we=P(v),de=K?n.TEXTURE_CUBE_MAP_POSITIVE_X+N:n.TEXTURE_2D,Ee=v.depthTexture.format===Vi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(v.depthTexture.format===Jn)je(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Ee,de,Y,0,we):n.framebufferTexture2D(n.FRAMEBUFFER,Ee,de,Y,0);else if(v.depthTexture.format===Vi)je(v)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Ee,de,Y,0,we):n.framebufferTexture2D(n.FRAMEBUFFER,Ee,de,Y,0);else throw new Error("Unknown depthTexture format")}function le(C){const v=i.get(C),N=C.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==C.depthTexture){const K=C.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){const Q=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",Q)};K.addEventListener("dispose",Q),v.__depthDisposeCallback=Q}v.__boundDepthTexture=K}if(C.depthTexture&&!v.__autoAllocateDepthBuffer)if(N)for(let K=0;K<6;K++)pe(v.__webglFramebuffer[K],C,K);else{const K=C.texture.mipmaps;K&&K.length>0?pe(v.__webglFramebuffer[0],C,0):pe(v.__webglFramebuffer,C,0)}else if(N){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=n.createRenderbuffer(),Oe(v.__webglDepthbuffer[K],C,!1);else{const Q=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer[K];n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,Y)}}else{const K=C.texture.mipmaps;if(K&&K.length>0?t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Oe(v.__webglDepthbuffer,C,!1);else{const Q=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,Y),n.framebufferRenderbuffer(n.FRAMEBUFFER,Q,n.RENDERBUFFER,Y)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function qe(C,v,N){const K=i.get(C);v!==void 0&&_e(K.__webglFramebuffer,C,C.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&le(C)}function Re(C){const v=C.texture,N=i.get(C),K=i.get(v);C.addEventListener("dispose",R);const Q=C.textures,Y=C.isWebGLCubeRenderTarget===!0,we=Q.length>1;if(we||(K.__webglTexture===void 0&&(K.__webglTexture=n.createTexture()),K.__version=v.version,a.memory.textures++),Y){N.__webglFramebuffer=[];for(let de=0;de<6;de++)if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[de]=[];for(let Ee=0;Ee<v.mipmaps.length;Ee++)N.__webglFramebuffer[de][Ee]=n.createFramebuffer()}else N.__webglFramebuffer[de]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let de=0;de<v.mipmaps.length;de++)N.__webglFramebuffer[de]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(we)for(let de=0,Ee=Q.length;de<Ee;de++){const Ie=i.get(Q[de]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=n.createTexture(),a.memory.textures++)}if(C.samples>0&&je(C)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let de=0;de<Q.length;de++){const Ee=Q[de];N.__webglColorRenderbuffer[de]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[de]);const Ie=r.convert(Ee.format,Ee.colorSpace),se=r.convert(Ee.type),fe=y(Ee.internalFormat,Ie,se,Ee.colorSpace,C.isXRRenderTarget===!0),Me=P(C);n.renderbufferStorageMultisample(n.RENDERBUFFER,Me,fe,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,N.__webglColorRenderbuffer[de])}n.bindRenderbuffer(n.RENDERBUFFER,null),C.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),Oe(N.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(Y){t.bindTexture(n.TEXTURE_CUBE_MAP,K.__webglTexture),Pe(n.TEXTURE_CUBE_MAP,v);for(let de=0;de<6;de++)if(v.mipmaps&&v.mipmaps.length>0)for(let Ee=0;Ee<v.mipmaps.length;Ee++)_e(N.__webglFramebuffer[de][Ee],C,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ee);else _e(N.__webglFramebuffer[de],C,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);g(v)&&m(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(we){for(let de=0,Ee=Q.length;de<Ee;de++){const Ie=Q[de],se=i.get(Ie);let fe=n.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(fe=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(fe,se.__webglTexture),Pe(fe,Ie),_e(N.__webglFramebuffer,C,Ie,n.COLOR_ATTACHMENT0+de,fe,0),g(Ie)&&m(fe)}t.unbindTexture()}else{let de=n.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(de=C.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(de,K.__webglTexture),Pe(de,v),v.mipmaps&&v.mipmaps.length>0)for(let Ee=0;Ee<v.mipmaps.length;Ee++)_e(N.__webglFramebuffer[Ee],C,v,n.COLOR_ATTACHMENT0,de,Ee);else _e(N.__webglFramebuffer,C,v,n.COLOR_ATTACHMENT0,de,0);g(v)&&m(de),t.unbindTexture()}C.depthBuffer&&le(C)}function Le(C){const v=C.textures;for(let N=0,K=v.length;N<K;N++){const Q=v[N];if(g(Q)){const Y=_(C),we=i.get(Q).__webglTexture;t.bindTexture(Y,we),m(Y),t.unbindTexture()}}}const ze=[],Fe=[];function et(C){if(C.samples>0){if(je(C)===!1){const v=C.textures,N=C.width,K=C.height;let Q=n.COLOR_BUFFER_BIT;const Y=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,we=i.get(C),de=v.length>1;if(de)for(let Ie=0;Ie<v.length;Ie++)t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const Ee=C.texture.mipmaps;Ee&&Ee.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let Ie=0;Ie<v.length;Ie++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Q|=n.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Q|=n.STENCIL_BUFFER_BIT)),de){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,we.__webglColorRenderbuffer[Ie]);const se=i.get(v[Ie]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,se,0)}n.blitFramebuffer(0,0,N,K,0,0,N,K,Q,n.NEAREST),l===!0&&(ze.length=0,Fe.length=0,ze.push(n.COLOR_ATTACHMENT0+Ie),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ze.push(Y),Fe.push(Y),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,Fe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ze))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),de)for(let Ie=0;Ie<v.length;Ie++){t.bindFramebuffer(n.FRAMEBUFFER,we.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,we.__webglColorRenderbuffer[Ie]);const se=i.get(v[Ie]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,we.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,se,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){const v=C.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function P(C){return Math.min(s.maxSamples,C.samples)}function je(C){const v=i.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Be(C){const v=a.render.frame;u.get(C)!==v&&(u.set(C,v),C.update())}function rt(C,v){const N=C.colorSpace,K=C.format,Q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||N!==ys&&N!==ui&&(st.getTransfer(N)===ht?(K!==An||Q!==an)&&We("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):lt("WebGLTextures: Unsupported texture color space:",N)),v}function be(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=F,this.setTexture2D=q,this.setTexture2DArray=k,this.setTexture3D=X,this.setTextureCube=Z,this.rebindTextures=qe,this.setupRenderTarget=Re,this.updateRenderTargetMipmap=Le,this.updateMultisampleRenderTarget=et,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=je,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Lb(n,e){function t(i,s=ui){let r;const a=st.getTransfer(s);if(i===an)return n.UNSIGNED_BYTE;if(i===Wl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===jl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===$h)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Kh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===qh)return n.BYTE;if(i===Yh)return n.SHORT;if(i===Ys)return n.UNSIGNED_SHORT;if(i===Hl)return n.INT;if(i===On)return n.UNSIGNED_INT;if(i===Ln)return n.FLOAT;if(i===Zn)return n.HALF_FLOAT;if(i===Zh)return n.ALPHA;if(i===Jh)return n.RGB;if(i===An)return n.RGBA;if(i===Jn)return n.DEPTH_COMPONENT;if(i===Vi)return n.DEPTH_STENCIL;if(i===Qh)return n.RED;if(i===Xl)return n.RED_INTEGER;if(i===vs)return n.RG;if(i===ql)return n.RG_INTEGER;if(i===Yl)return n.RGBA_INTEGER;if(i===zr||i===Gr||i===Hr||i===Wr)if(a===ht)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===zr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===zr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Gr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Hr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Oo||i===Bo||i===Vo||i===ko)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Oo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Bo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Vo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ko)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===zo||i===Go||i===Ho||i===Wo||i===jo||i===Xo||i===qo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===zo||i===Go)return a===ht?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ho)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Wo)return r.COMPRESSED_R11_EAC;if(i===jo)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Xo)return r.COMPRESSED_RG11_EAC;if(i===qo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Yo||i===$o||i===Ko||i===Zo||i===Jo||i===Qo||i===el||i===tl||i===nl||i===il||i===sl||i===rl||i===al||i===ol)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Yo)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===$o)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ko)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Zo)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Jo)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Qo)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===el)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===tl)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===nl)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===il)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===sl)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===rl)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===al)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ol)return a===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ll||i===cl||i===ul)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ll)return a===ht?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===cl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ul)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===dl||i===hl||i===fl||i===pl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===dl)return r.COMPRESSED_RED_RGTC1_EXT;if(i===hl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===fl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===$s?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const Ib=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Nb=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Ub{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new hf(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new Cn({vertexShader:Ib,fragmentShader:Nb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Gt(new pa(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Fb extends Ms{constructor(e,t){super();const i=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,p=null;const x=typeof XRWebGLBinding<"u",g=new Ub,m={},_=t.getContextAttributes();let y=null,b=null;const w=[],A=[],R=new nt;let L=null;const M=new rn;M.viewport=new bt;const E=new rn;E.viewport=new bt;const D=[M,E],F=new X_;let O=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ne=w[$];return ne===void 0&&(ne=new eo,w[$]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function($){let ne=w[$];return ne===void 0&&(ne=new eo,w[$]=ne),ne.getGripSpace()},this.getHand=function($){let ne=w[$];return ne===void 0&&(ne=new eo,w[$]=ne),ne.getHandSpace()};function q($){const ne=A.indexOf($.inputSource);if(ne===-1)return;const _e=w[ne];_e!==void 0&&(_e.update($.inputSource,$.frame,c||a),_e.dispatchEvent({type:$.type,data:$.inputSource}))}function k(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",X);for(let $=0;$<w.length;$++){const ne=A[$];ne!==null&&(A[$]=null,w[$].disconnect(ne))}O=null,G=null,g.reset();for(const $ in m)delete m[$];e.setRenderTarget(y),f=null,h=null,d=null,s=null,b=null,it.stop(),i.isPresenting=!1,e.setPixelRatio(L),e.setSize(R.width,R.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,i.isPresenting===!0&&We("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&We("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(y=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",k),s.addEventListener("inputsourceschange",X),_.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(R),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,Oe=null,pe=null;_.depth&&(pe=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=_.stencil?Vi:Jn,Oe=_.stencil?$s:On);const le={colorFormat:t.RGBA8,depthFormat:pe,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(le),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),b=new Fn(h.textureWidth,h.textureHeight,{format:An,type:an,depthTexture:new Js(h.textureWidth,h.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const _e={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,_e),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Fn(f.framebufferWidth,f.framebufferHeight,{format:An,type:an,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),it.setContext(s),it.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function X($){for(let ne=0;ne<$.removed.length;ne++){const _e=$.removed[ne],Oe=A.indexOf(_e);Oe>=0&&(A[Oe]=null,w[Oe].disconnect(_e))}for(let ne=0;ne<$.added.length;ne++){const _e=$.added[ne];let Oe=A.indexOf(_e);if(Oe===-1){for(let le=0;le<w.length;le++)if(le>=A.length){A.push(_e),Oe=le;break}else if(A[le]===null){A[le]=_e,Oe=le;break}if(Oe===-1)break}const pe=w[Oe];pe&&pe.connect(_e)}}const Z=new V,ce=new V;function ue($,ne,_e){Z.setFromMatrixPosition(ne.matrixWorld),ce.setFromMatrixPosition(_e.matrixWorld);const Oe=Z.distanceTo(ce),pe=ne.projectionMatrix.elements,le=_e.projectionMatrix.elements,qe=pe[14]/(pe[10]-1),Re=pe[14]/(pe[10]+1),Le=(pe[9]+1)/pe[5],ze=(pe[9]-1)/pe[5],Fe=(pe[8]-1)/pe[0],et=(le[8]+1)/le[0],P=qe*Fe,je=qe*et,Be=Oe/(-Fe+et),rt=Be*-Fe;if(ne.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(rt),$.translateZ(Be),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),pe[10]===-1)$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const be=qe+Be,C=Re+Be,v=P-rt,N=je+(Oe-rt),K=Le*Re/C*be,Q=ze*Re/C*be;$.projectionMatrix.makePerspective(v,N,K,Q,be,C),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function te($,ne){ne===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ne.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let ne=$.near,_e=$.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(_e=g.depthFar)),F.near=E.near=M.near=ne,F.far=E.far=M.far=_e,(O!==F.near||G!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),O=F.near,G=F.far),F.layers.mask=$.layers.mask|6,M.layers.mask=F.layers.mask&3,E.layers.mask=F.layers.mask&5;const Oe=$.parent,pe=F.cameras;te(F,Oe);for(let le=0;le<pe.length;le++)te(pe[le],Oe);pe.length===2?ue(F,M,E):F.projectionMatrix.copy(M.projectionMatrix),Pe($,F,Oe)};function Pe($,ne,_e){_e===null?$.matrix.copy(ne.matrixWorld):($.matrix.copy(_e.matrixWorld),$.matrix.invert(),$.matrix.multiply(ne.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Zs*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function($){l=$,h!==null&&(h.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(F)},this.getCameraTexture=function($){return m[$]};let De=null;function Qe($,ne){if(u=ne.getViewerPose(c||a),p=ne,u!==null){const _e=u.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let Oe=!1;_e.length!==F.cameras.length&&(F.cameras.length=0,Oe=!0);for(let Re=0;Re<_e.length;Re++){const Le=_e[Re];let ze=null;if(f!==null)ze=f.getViewport(Le);else{const et=d.getViewSubImage(h,Le);ze=et.viewport,Re===0&&(e.setRenderTargetTextures(b,et.colorTexture,et.depthStencilTexture),e.setRenderTarget(b))}let Fe=D[Re];Fe===void 0&&(Fe=new rn,Fe.layers.enable(Re),Fe.viewport=new bt,D[Re]=Fe),Fe.matrix.fromArray(Le.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(Le.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set(ze.x,ze.y,ze.width,ze.height),Re===0&&(F.matrix.copy(Fe.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Oe===!0&&F.cameras.push(Fe)}const pe=s.enabledFeatures;if(pe&&pe.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const Re=d.getDepthInformation(_e[0]);Re&&Re.isValid&&Re.texture&&g.init(Re,s.renderState)}if(pe&&pe.includes("camera-access")&&x){e.state.unbindTexture(),d=i.getBinding();for(let Re=0;Re<_e.length;Re++){const Le=_e[Re].camera;if(Le){let ze=m[Le];ze||(ze=new hf,m[Le]=ze);const Fe=d.getCameraImage(Le);ze.sourceTexture=Fe}}}}for(let _e=0;_e<w.length;_e++){const Oe=A[_e],pe=w[_e];Oe!==null&&pe!==void 0&&pe.update(Oe,ne,c||a)}De&&De($,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),p=null}const it=new mf;it.setAnimationLoop(Qe),this.setAnimationLoop=function($){De=$},this.dispose=function(){}}}const Ai=new Qn,Ob=new yt;function Bb(n,e){function t(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function i(g,m){m.color.getRGB(g.fogColor.value,lf(n)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function s(g,m,_,y,b){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),d(g,m)):m.isMeshPhongMaterial?(r(g,m),u(g,m)):m.isMeshStandardMaterial?(r(g,m),h(g,m),m.isMeshPhysicalMaterial&&f(g,m,b)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),x(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(a(g,m),m.isLineDashedMaterial&&o(g,m)):m.isPointsMaterial?l(g,m,_,y):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,t(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ht&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,t(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ht&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,t(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,t(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const _=e.get(m),y=_.envMap,b=_.envMapRotation;y&&(g.envMap.value=y,Ai.copy(b),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),g.envMapRotation.value.setFromMatrix4(Ob.makeRotationFromEuler(Ai)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap&&(g.lightMap.value=m.lightMap,g.lightMapIntensity.value=m.lightMapIntensity,t(m.lightMap,g.lightMapTransform)),m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,g.aoMapTransform))}function a(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform))}function o(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,_,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*_,g.scale.value=y*.5,m.map&&(g.map.value=m.map,t(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,t(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,t(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function u(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function h(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,g.roughnessMapTransform)),m.envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,_){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ht&&g.clearcoatNormalScale.value.negate())),m.dispersion>0&&(g.dispersion.value=m.dispersion),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=_.texture,g.transmissionSamplerSize.value.set(_.width,_.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function x(g,m){const _=e.get(m).light;g.referencePosition.value.setFromMatrixPosition(_.matrixWorld),g.nearDistance.value=_.shadow.camera.near,g.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Vb(n,e,t,i){let s={},r={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,y){const b=y.program;i.uniformBlockBinding(_,b)}function c(_,y){let b=s[_.id];b===void 0&&(p(_),b=u(_),s[_.id]=b,_.addEventListener("dispose",g));const w=y.program;i.updateUBOMapping(_,w);const A=e.render.frame;r[_.id]!==A&&(h(_),r[_.id]=A)}function u(_){const y=d();_.__bindingPointIndex=y;const b=n.createBuffer(),w=_.__size,A=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,w,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,b),b}function d(){for(let _=0;_<o;_++)if(a.indexOf(_)===-1)return a.push(_),_;return lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const y=s[_.id],b=_.uniforms,w=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let A=0,R=b.length;A<R;A++){const L=Array.isArray(b[A])?b[A]:[b[A]];for(let M=0,E=L.length;M<E;M++){const D=L[M];if(f(D,A,M,w)===!0){const F=D.__offset,O=Array.isArray(D.value)?D.value:[D.value];let G=0;for(let q=0;q<O.length;q++){const k=O[q],X=x(k);typeof k=="number"||typeof k=="boolean"?(D.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,F+G,D.__data)):k.isMatrix3?(D.__data[0]=k.elements[0],D.__data[1]=k.elements[1],D.__data[2]=k.elements[2],D.__data[3]=0,D.__data[4]=k.elements[3],D.__data[5]=k.elements[4],D.__data[6]=k.elements[5],D.__data[7]=0,D.__data[8]=k.elements[6],D.__data[9]=k.elements[7],D.__data[10]=k.elements[8],D.__data[11]=0):(k.toArray(D.__data,G),G+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(_,y,b,w){const A=_.value,R=y+"_"+b;if(w[R]===void 0)return typeof A=="number"||typeof A=="boolean"?w[R]=A:w[R]=A.clone(),!0;{const L=w[R];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return w[R]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function p(_){const y=_.uniforms;let b=0;const w=16;for(let R=0,L=y.length;R<L;R++){const M=Array.isArray(y[R])?y[R]:[y[R]];for(let E=0,D=M.length;E<D;E++){const F=M[E],O=Array.isArray(F.value)?F.value:[F.value];for(let G=0,q=O.length;G<q;G++){const k=O[G],X=x(k),Z=b%w,ce=Z%X.boundary,ue=Z+ce;b+=ce,ue!==0&&w-ue<X.storage&&(b+=w-ue),F.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=b,b+=X.storage}}}const A=b%w;return A>0&&(b+=w-A),_.__size=b,_.__cache={},this}function x(_){const y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?We("WebGLRenderer: Texture samplers can not be part of an uniforms group."):We("WebGLRenderer: Unsupported uniform value type.",_),y}function g(_){const y=_.target;y.removeEventListener("dispose",g);const b=a.indexOf(y.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function m(){for(const _ in s)n.deleteBuffer(s[_]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}const kb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Rn=null;function zb(){return Rn===null&&(Rn=new U_(kb,16,16,vs,Zn),Rn.name="DFG_LUT",Rn.minFilter=Ot,Rn.magFilter=Ot,Rn.wrapS=jn,Rn.wrapT=jn,Rn.generateMipmaps=!1,Rn.needsUpdate=!0),Rn}class Gb{constructor(e={}){const{canvas:t=qx(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=an}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=a;const x=f,g=new Set([Yl,ql,Xl]),m=new Set([an,On,Ys,$s,Wl,jl]),_=new Uint32Array(4),y=new Int32Array(4);let b=null,w=null;const A=[],R=[];let L=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let E=!1;this._outputColorSpace=gn;let D=0,F=0,O=null,G=-1,q=null;const k=new bt,X=new bt;let Z=null;const ce=new tt(0);let ue=0,te=t.width,Pe=t.height,De=1,Qe=null,it=null;const $=new bt(0,0,te,Pe),ne=new bt(0,0,te,Pe);let _e=!1;const Oe=new Ql;let pe=!1,le=!1;const qe=new yt,Re=new V,Le=new bt,ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Fe=!1;function et(){return O===null?De:1}let P=i;function je(T,U){return t.getContext(T,U)}try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Gl}`),t.addEventListener("webglcontextlost",Ge,!1),t.addEventListener("webglcontextrestored",ft,!1),t.addEventListener("webglcontextcreationerror",ct,!1),P===null){const U="webgl2";if(P=je(U,T),P===null)throw je(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw lt("WebGLRenderer: "+T.message),T}let Be,rt,be,C,v,N,K,Q,Y,we,de,Ee,Ie,se,fe,Me,Ae,he,Ye,I,ge,oe,ye,re;function ee(){Be=new zS(P),Be.init(),oe=new Lb(P,Be),rt=new LS(P,Be,e,oe),be=new Pb(P,Be),rt.reversedDepthBuffer&&h&&be.buffers.depth.setReversed(!0),C=new WS(P),v=new mb,N=new Db(P,Be,be,v,rt,oe,C),K=new NS(M),Q=new kS(M),Y=new Y_(P),ye=new PS(P,Y),we=new GS(P,Y,C,ye),de=new XS(P,we,Y,C),Ye=new jS(P,rt,N),Me=new IS(v),Ee=new pb(M,K,Q,Be,rt,ye,Me),Ie=new Bb(M,v),se=new xb,fe=new bb(Be),he=new RS(M,K,Q,be,de,p,l),Ae=new Cb(M,de,rt),re=new Vb(P,C,rt,be),I=new DS(P,Be,C),ge=new HS(P,Be,C),C.programs=Ee.programs,M.capabilities=rt,M.extensions=Be,M.properties=v,M.renderLists=se,M.shadowMap=Ae,M.state=be,M.info=C}ee(),x!==an&&(L=new YS(x,t.width,t.height,s,r));const ae=new Fb(M,P);this.xr=ae,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const T=Be.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Be.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return De},this.setPixelRatio=function(T){T!==void 0&&(De=T,this.setSize(te,Pe,!1))},this.getSize=function(T){return T.set(te,Pe)},this.setSize=function(T,U,W=!0){if(ae.isPresenting){We("WebGLRenderer: Can't change size while VR device is presenting.");return}te=T,Pe=U,t.width=Math.floor(T*De),t.height=Math.floor(U*De),W===!0&&(t.style.width=T+"px",t.style.height=U+"px"),L!==null&&L.setSize(t.width,t.height),this.setViewport(0,0,T,U)},this.getDrawingBufferSize=function(T){return T.set(te*De,Pe*De).floor()},this.setDrawingBufferSize=function(T,U,W){te=T,Pe=U,De=W,t.width=Math.floor(T*W),t.height=Math.floor(U*W),this.setViewport(0,0,T,U)},this.setEffects=function(T){if(x===an){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let U=0;U<T.length;U++)if(T[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}L.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(k)},this.getViewport=function(T){return T.copy($)},this.setViewport=function(T,U,W,H){T.isVector4?$.set(T.x,T.y,T.z,T.w):$.set(T,U,W,H),be.viewport(k.copy($).multiplyScalar(De).round())},this.getScissor=function(T){return T.copy(ne)},this.setScissor=function(T,U,W,H){T.isVector4?ne.set(T.x,T.y,T.z,T.w):ne.set(T,U,W,H),be.scissor(X.copy(ne).multiplyScalar(De).round())},this.getScissorTest=function(){return _e},this.setScissorTest=function(T){be.setScissorTest(_e=T)},this.setOpaqueSort=function(T){Qe=T},this.setTransparentSort=function(T){it=T},this.getClearColor=function(T){return T.copy(he.getClearColor())},this.setClearColor=function(){he.setClearColor(...arguments)},this.getClearAlpha=function(){return he.getClearAlpha()},this.setClearAlpha=function(){he.setClearAlpha(...arguments)},this.clear=function(T=!0,U=!0,W=!0){let H=0;if(T){let B=!1;if(O!==null){const me=O.texture.format;B=g.has(me)}if(B){const me=O.texture.type,Se=m.has(me),ve=he.getClearColor(),Te=he.getClearAlpha(),Ce=ve.r,ke=ve.g,Ne=ve.b;Se?(_[0]=Ce,_[1]=ke,_[2]=Ne,_[3]=Te,P.clearBufferuiv(P.COLOR,0,_)):(y[0]=Ce,y[1]=ke,y[2]=Ne,y[3]=Te,P.clearBufferiv(P.COLOR,0,y))}else H|=P.COLOR_BUFFER_BIT}U&&(H|=P.DEPTH_BUFFER_BIT),W&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ge,!1),t.removeEventListener("webglcontextrestored",ft,!1),t.removeEventListener("webglcontextcreationerror",ct,!1),he.dispose(),se.dispose(),fe.dispose(),v.dispose(),K.dispose(),Q.dispose(),de.dispose(),ye.dispose(),re.dispose(),Ee.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",cr),ae.removeEventListener("sessionend",j),J.stop()};function Ge(T){T.preventDefault(),vu("WebGLRenderer: Context Lost."),E=!0}function ft(){vu("WebGLRenderer: Context Restored."),E=!1;const T=C.autoReset,U=Ae.enabled,W=Ae.autoUpdate,H=Ae.needsUpdate,B=Ae.type;ee(),C.autoReset=T,Ae.enabled=U,Ae.autoUpdate=W,Ae.needsUpdate=H,Ae.type=B}function ct(T){lt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ln(T){const U=T.target;U.removeEventListener("dispose",ln),_n(U)}function _n(T){or(T),v.remove(T)}function or(T){const U=v.get(T).programs;U!==void 0&&(U.forEach(function(W){Ee.releaseProgram(W)}),T.isShaderMaterial&&Ee.releaseShaderCache(T))}this.renderBufferDirect=function(T,U,W,H,B,me){U===null&&(U=ze);const Se=B.isMesh&&B.matrixWorld.determinant()<0,ve=un(T,U,W,H,B);be.setMaterial(H,Se);let Te=W.index,Ce=1;if(H.wireframe===!0){if(Te=we.getWireframeAttribute(W),Te===void 0)return;Ce=2}const ke=W.drawRange,Ne=W.attributes.position;let Ze=ke.start*Ce,pt=(ke.start+ke.count)*Ce;me!==null&&(Ze=Math.max(Ze,me.start*Ce),pt=Math.min(pt,(me.start+me.count)*Ce)),Te!==null?(Ze=Math.max(Ze,0),pt=Math.min(pt,Te.count)):Ne!=null&&(Ze=Math.max(Ze,0),pt=Math.min(pt,Ne.count));const St=pt-Ze;if(St<0||St===1/0)return;ye.setup(B,H,ve,W,Te);let Mt,mt=I;if(Te!==null&&(Mt=Y.get(Te),mt=ge,mt.setIndex(Mt)),B.isMesh)H.wireframe===!0?(be.setLineWidth(H.wireframeLinewidth*et()),mt.setMode(P.LINES)):mt.setMode(P.TRIANGLES);else if(B.isLine){let Ue=H.linewidth;Ue===void 0&&(Ue=1),be.setLineWidth(Ue*et()),B.isLineSegments?mt.setMode(P.LINES):B.isLineLoop?mt.setMode(P.LINE_LOOP):mt.setMode(P.LINE_STRIP)}else B.isPoints?mt.setMode(P.POINTS):B.isSprite&&mt.setMode(P.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Ks("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),mt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))mt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Ue=B._multiDrawStarts,dt=B._multiDrawCounts,ot=B._multiDrawCount,Qt=Te?Y.get(Te).bytesPerElement:1,Wi=v.get(H).currentProgram.getUniforms();for(let en=0;en<ot;en++)Wi.setValue(P,"_gl_DrawID",en),mt.render(Ue[en]/Qt,dt[en])}else if(B.isInstancedMesh)mt.renderInstances(Ze,St,B.count);else if(W.isInstancedBufferGeometry){const Ue=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,dt=Math.min(W.instanceCount,Ue);mt.renderInstances(Ze,St,dt)}else mt.render(Ze,St)};function lr(T,U,W){T.transparent===!0&&T.side===Tn&&T.forceSinglePass===!1?(T.side=Ht,T.needsUpdate=!0,Dt(T,U,W),T.side=mi,T.needsUpdate=!0,Dt(T,U,W),T.side=Tn):Dt(T,U,W)}this.compile=function(T,U,W=null){W===null&&(W=T),w=fe.get(W),w.init(U),R.push(w),W.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),T!==W&&T.traverseVisible(function(B){B.isLight&&B.layers.test(U.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),w.setupLights();const H=new Set;return T.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const me=B.material;if(me)if(Array.isArray(me))for(let Se=0;Se<me.length;Se++){const ve=me[Se];lr(ve,W,B),H.add(ve)}else lr(me,W,B),H.add(me)}),w=R.pop(),H},this.compileAsync=function(T,U,W=null){const H=this.compile(T,U,W);return new Promise(B=>{function me(){if(H.forEach(function(Se){v.get(Se).currentProgram.isReady()&&H.delete(Se)}),H.size===0){B(T);return}setTimeout(me,10)}Be.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let Ts=null;function xa(T){Ts&&Ts(T)}function cr(){J.stop()}function j(){J.start()}const J=new mf;J.setAnimationLoop(xa),typeof self<"u"&&J.setContext(self),this.setAnimationLoop=function(T){Ts=T,ae.setAnimationLoop(T),T===null?J.stop():J.start()},ae.addEventListener("sessionstart",cr),ae.addEventListener("sessionend",j),this.render=function(T,U){if(U!==void 0&&U.isCamera!==!0){lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;const W=ae.enabled===!0&&ae.isPresenting===!0,H=L!==null&&(O===null||W)&&L.begin(M,O);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(L===null||L.isCompositing()===!1)&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(U),U=ae.getCamera()),T.isScene===!0&&T.onBeforeRender(M,T,U,O),w=fe.get(T,R.length),w.init(U),R.push(w),qe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Oe.setFromProjectionMatrix(qe,In,U.reversedDepth),le=this.localClippingEnabled,pe=Me.init(this.clippingPlanes,le),b=se.get(T,A.length),b.init(),A.push(b),ae.enabled===!0&&ae.isPresenting===!0){const Se=M.xr.getDepthSensingMesh();Se!==null&&ie(Se,U,-1/0,M.sortObjects)}ie(T,U,0,M.sortObjects),b.finish(),M.sortObjects===!0&&b.sort(Qe,it),Fe=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,Fe&&he.addToRenderList(b,T),this.info.render.frame++,pe===!0&&Me.beginShadows();const B=w.state.shadowsArray;if(Ae.render(B,T,U),pe===!0&&Me.endShadows(),this.info.autoReset===!0&&this.info.reset(),(H&&L.hasRenderPass())===!1){const Se=b.opaque,ve=b.transmissive;if(w.setupLights(),U.isArrayCamera){const Te=U.cameras;if(ve.length>0)for(let Ce=0,ke=Te.length;Ce<ke;Ce++){const Ne=Te[Ce];He(Se,ve,T,Ne)}Fe&&he.render(T);for(let Ce=0,ke=Te.length;Ce<ke;Ce++){const Ne=Te[Ce];Xe(b,T,Ne,Ne.viewport)}}else ve.length>0&&He(Se,ve,T,U),Fe&&he.render(T),Xe(b,T,U)}O!==null&&F===0&&(N.updateMultisampleRenderTarget(O),N.updateRenderTargetMipmap(O)),H&&L.end(M),T.isScene===!0&&T.onAfterRender(M,T,U),ye.resetDefaultState(),G=-1,q=null,R.pop(),R.length>0?(w=R[R.length-1],pe===!0&&Me.setGlobalState(M.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?b=A[A.length-1]:b=null};function ie(T,U,W,H){if(T.visible===!1)return;if(T.layers.test(U.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(U);else if(T.isLight)w.pushLight(T),T.castShadow&&w.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Oe.intersectsSprite(T)){H&&Le.setFromMatrixPosition(T.matrixWorld).applyMatrix4(qe);const Se=de.update(T),ve=T.material;ve.visible&&b.push(T,Se,ve,W,Le.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Oe.intersectsObject(T))){const Se=de.update(T),ve=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Le.copy(T.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),Le.copy(Se.boundingSphere.center)),Le.applyMatrix4(T.matrixWorld).applyMatrix4(qe)),Array.isArray(ve)){const Te=Se.groups;for(let Ce=0,ke=Te.length;Ce<ke;Ce++){const Ne=Te[Ce],Ze=ve[Ne.materialIndex];Ze&&Ze.visible&&b.push(T,Se,Ze,W,Le.z,Ne)}}else ve.visible&&b.push(T,Se,ve,W,Le.z,null)}}const me=T.children;for(let Se=0,ve=me.length;Se<ve;Se++)ie(me[Se],U,W,H)}function Xe(T,U,W,H){const{opaque:B,transmissive:me,transparent:Se}=T;w.setupLightsView(W),pe===!0&&Me.setGlobalState(M.clippingPlanes,W),H&&be.viewport(k.copy(H)),B.length>0&&_t(B,U,W),me.length>0&&_t(me,U,W),Se.length>0&&_t(Se,U,W),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function He(T,U,W,H){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[H.id]===void 0){const Ze=Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[H.id]=new Fn(1,1,{generateMipmaps:!0,type:Ze?Zn:an,minFilter:Bi,samples:rt.samples,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace})}const me=w.state.transmissionRenderTarget[H.id],Se=H.viewport||k;me.setSize(Se.z*M.transmissionResolutionScale,Se.w*M.transmissionResolutionScale);const ve=M.getRenderTarget(),Te=M.getActiveCubeFace(),Ce=M.getActiveMipmapLevel();M.setRenderTarget(me),M.getClearColor(ce),ue=M.getClearAlpha(),ue<1&&M.setClearColor(16777215,.5),M.clear(),Fe&&he.render(W);const ke=M.toneMapping;M.toneMapping=Un;const Ne=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),w.setupLightsView(H),pe===!0&&Me.setGlobalState(M.clippingPlanes,H),_t(T,W,H),N.updateMultisampleRenderTarget(me),N.updateRenderTargetMipmap(me),Be.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let pt=0,St=U.length;pt<St;pt++){const Mt=U[pt],{object:mt,geometry:Ue,material:dt,group:ot}=Mt;if(dt.side===Tn&&mt.layers.test(H.layers)){const Qt=dt.side;dt.side=Ht,dt.needsUpdate=!0,at(mt,W,H,Ue,dt,ot),dt.side=Qt,dt.needsUpdate=!0,Ze=!0}}Ze===!0&&(N.updateMultisampleRenderTarget(me),N.updateRenderTargetMipmap(me))}M.setRenderTarget(ve,Te,Ce),M.setClearColor(ce,ue),Ne!==void 0&&(H.viewport=Ne),M.toneMapping=ke}function _t(T,U,W){const H=U.isScene===!0?U.overrideMaterial:null;for(let B=0,me=T.length;B<me;B++){const Se=T[B],{object:ve,geometry:Te,group:Ce}=Se;let ke=Se.material;ke.allowOverride===!0&&H!==null&&(ke=H),ve.layers.test(W.layers)&&at(ve,U,W,Te,ke,Ce)}}function at(T,U,W,H,B,me){T.onBeforeRender(M,U,W,H,B,me),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),B.onBeforeRender(M,U,W,H,T,me),B.transparent===!0&&B.side===Tn&&B.forceSinglePass===!1?(B.side=Ht,B.needsUpdate=!0,M.renderBufferDirect(W,U,H,B,T,me),B.side=mi,B.needsUpdate=!0,M.renderBufferDirect(W,U,H,B,T,me),B.side=Tn):M.renderBufferDirect(W,U,H,B,T,me),T.onAfterRender(M,U,W,H,B,me)}function Dt(T,U,W){U.isScene!==!0&&(U=ze);const H=v.get(T),B=w.state.lights,me=w.state.shadowsArray,Se=B.state.version,ve=Ee.getParameters(T,B.state,me,U,W),Te=Ee.getProgramCacheKey(ve);let Ce=H.programs;H.environment=T.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(T.isMeshStandardMaterial?Q:K).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?U.environmentRotation:T.envMapRotation,Ce===void 0&&(T.addEventListener("dispose",ln),Ce=new Map,H.programs=Ce);let ke=Ce.get(Te);if(ke!==void 0){if(H.currentProgram===ke&&H.lightsStateVersion===Se)return cn(T,ve),ke}else ve.uniforms=Ee.getUniforms(T),T.onBeforeCompile(ve,M),ke=Ee.acquireProgram(ve,Te),Ce.set(Te,ke),H.uniforms=ve.uniforms;const Ne=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ne.clippingPlanes=Me.uniform),cn(T,ve),H.needsLights=Kt(T),H.lightsStateVersion=Se,H.needsLights&&(Ne.ambientLightColor.value=B.state.ambient,Ne.lightProbe.value=B.state.probe,Ne.directionalLights.value=B.state.directional,Ne.directionalLightShadows.value=B.state.directionalShadow,Ne.spotLights.value=B.state.spot,Ne.spotLightShadows.value=B.state.spotShadow,Ne.rectAreaLights.value=B.state.rectArea,Ne.ltc_1.value=B.state.rectAreaLTC1,Ne.ltc_2.value=B.state.rectAreaLTC2,Ne.pointLights.value=B.state.point,Ne.pointLightShadows.value=B.state.pointShadow,Ne.hemisphereLights.value=B.state.hemi,Ne.directionalShadowMap.value=B.state.directionalShadowMap,Ne.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ne.spotShadowMap.value=B.state.spotShadowMap,Ne.spotLightMatrix.value=B.state.spotLightMatrix,Ne.spotLightMap.value=B.state.spotLightMap,Ne.pointShadowMap.value=B.state.pointShadowMap,Ne.pointShadowMatrix.value=B.state.pointShadowMatrix),H.currentProgram=ke,H.uniformsList=null,ke}function vn(T){if(T.uniformsList===null){const U=T.currentProgram.getUniforms();T.uniformsList=jr.seqWithValue(U.seq,T.uniforms)}return T.uniformsList}function cn(T,U){const W=v.get(T);W.outputColorSpace=U.outputColorSpace,W.batching=U.batching,W.batchingColor=U.batchingColor,W.instancing=U.instancing,W.instancingColor=U.instancingColor,W.instancingMorph=U.instancingMorph,W.skinning=U.skinning,W.morphTargets=U.morphTargets,W.morphNormals=U.morphNormals,W.morphColors=U.morphColors,W.morphTargetsCount=U.morphTargetsCount,W.numClippingPlanes=U.numClippingPlanes,W.numIntersection=U.numClipIntersection,W.vertexAlphas=U.vertexAlphas,W.vertexTangents=U.vertexTangents,W.toneMapping=U.toneMapping}function un(T,U,W,H,B){U.isScene!==!0&&(U=ze),N.resetTextureUnits();const me=U.fog,Se=H.isMeshStandardMaterial?U.environment:null,ve=O===null?M.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:ys,Te=(H.isMeshStandardMaterial?Q:K).get(H.envMap||Se),Ce=H.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,ke=!!W.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ne=!!W.morphAttributes.position,Ze=!!W.morphAttributes.normal,pt=!!W.morphAttributes.color;let St=Un;H.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(St=M.toneMapping);const Mt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,mt=Mt!==void 0?Mt.length:0,Ue=v.get(H),dt=w.state.lights;if(pe===!0&&(le===!0||T!==q)){const Bt=T===q&&H.id===G;Me.setState(H,T,Bt)}let ot=!1;H.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==dt.state.version||Ue.outputColorSpace!==ve||B.isBatchedMesh&&Ue.batching===!1||!B.isBatchedMesh&&Ue.batching===!0||B.isBatchedMesh&&Ue.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ue.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ue.instancing===!1||!B.isInstancedMesh&&Ue.instancing===!0||B.isSkinnedMesh&&Ue.skinning===!1||!B.isSkinnedMesh&&Ue.skinning===!0||B.isInstancedMesh&&Ue.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ue.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ue.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ue.instancingMorph===!1&&B.morphTexture!==null||Ue.envMap!==Te||H.fog===!0&&Ue.fog!==me||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==Me.numPlanes||Ue.numIntersection!==Me.numIntersection)||Ue.vertexAlphas!==Ce||Ue.vertexTangents!==ke||Ue.morphTargets!==Ne||Ue.morphNormals!==Ze||Ue.morphColors!==pt||Ue.toneMapping!==St||Ue.morphTargetsCount!==mt)&&(ot=!0):(ot=!0,Ue.__version=H.version);let Qt=Ue.currentProgram;ot===!0&&(Qt=Dt(H,U,B));let Wi=!1,en=!1,ws=!1;const gt=Qt.getUniforms(),qt=Ue.uniforms;if(be.useProgram(Qt.program)&&(Wi=!0,en=!0,ws=!0),H.id!==G&&(G=H.id,en=!0),Wi||q!==T){be.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),gt.setValue(P,"projectionMatrix",T.projectionMatrix),gt.setValue(P,"viewMatrix",T.matrixWorldInverse);const Yt=gt.map.cameraPosition;Yt!==void 0&&Yt.setValue(P,Re.setFromMatrixPosition(T.matrixWorld)),rt.logarithmicDepthBuffer&&gt.setValue(P,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&gt.setValue(P,"isOrthographic",T.isOrthographicCamera===!0),q!==T&&(q=T,en=!0,ws=!0)}if(Ue.needsLights&&(dt.state.directionalShadowMap.length>0&&gt.setValue(P,"directionalShadowMap",dt.state.directionalShadowMap,N),dt.state.spotShadowMap.length>0&&gt.setValue(P,"spotShadowMap",dt.state.spotShadowMap,N),dt.state.pointShadowMap.length>0&&gt.setValue(P,"pointShadowMap",dt.state.pointShadowMap,N)),B.isSkinnedMesh){gt.setOptional(P,B,"bindMatrix"),gt.setOptional(P,B,"bindMatrixInverse");const Bt=B.skeleton;Bt&&(Bt.boneTexture===null&&Bt.computeBoneTexture(),gt.setValue(P,"boneTexture",Bt.boneTexture,N))}B.isBatchedMesh&&(gt.setOptional(P,B,"batchingTexture"),gt.setValue(P,"batchingTexture",B._matricesTexture,N),gt.setOptional(P,B,"batchingIdTexture"),gt.setValue(P,"batchingIdTexture",B._indirectTexture,N),gt.setOptional(P,B,"batchingColorTexture"),B._colorsTexture!==null&&gt.setValue(P,"batchingColorTexture",B._colorsTexture,N));const dn=W.morphAttributes;if((dn.position!==void 0||dn.normal!==void 0||dn.color!==void 0)&&Ye.update(B,W,Qt),(en||Ue.receiveShadow!==B.receiveShadow)&&(Ue.receiveShadow=B.receiveShadow,gt.setValue(P,"receiveShadow",B.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(qt.envMap.value=Te,qt.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(qt.envMapIntensity.value=U.environmentIntensity),qt.dfgLUT!==void 0&&(qt.dfgLUT.value=zb()),en&&(gt.setValue(P,"toneMappingExposure",M.toneMappingExposure),Ue.needsLights&&Bn(qt,ws),me&&H.fog===!0&&Ie.refreshFogUniforms(qt,me),Ie.refreshMaterialUniforms(qt,H,De,Pe,w.state.transmissionRenderTarget[T.id]),jr.upload(P,vn(Ue),qt,N)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(jr.upload(P,vn(Ue),qt,N),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&gt.setValue(P,"center",B.center),gt.setValue(P,"modelViewMatrix",B.modelViewMatrix),gt.setValue(P,"normalMatrix",B.normalMatrix),gt.setValue(P,"modelMatrix",B.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Bt=H.uniformsGroups;for(let Yt=0,_a=Bt.length;Yt<_a;Yt++){const _i=Bt[Yt];re.update(_i,Qt),re.bind(_i,Qt)}}return Qt}function Bn(T,U){T.ambientLightColor.needsUpdate=U,T.lightProbe.needsUpdate=U,T.directionalLights.needsUpdate=U,T.directionalLightShadows.needsUpdate=U,T.pointLights.needsUpdate=U,T.pointLightShadows.needsUpdate=U,T.spotLights.needsUpdate=U,T.spotLightShadows.needsUpdate=U,T.rectAreaLights.needsUpdate=U,T.hemisphereLights.needsUpdate=U}function Kt(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(T,U,W){const H=v.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),v.get(T.texture).__webglTexture=U,v.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:W,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,U){const W=v.get(T);W.__webglFramebuffer=U,W.__useDefaultFramebuffer=U===void 0};const Zt=P.createFramebuffer();this.setRenderTarget=function(T,U=0,W=0){O=T,D=U,F=W;let H=null,B=!1,me=!1;if(T){const ve=v.get(T);if(ve.__useDefaultFramebuffer!==void 0){be.bindFramebuffer(P.FRAMEBUFFER,ve.__webglFramebuffer),k.copy(T.viewport),X.copy(T.scissor),Z=T.scissorTest,be.viewport(k),be.scissor(X),be.setScissorTest(Z),G=-1;return}else if(ve.__webglFramebuffer===void 0)N.setupRenderTarget(T);else if(ve.__hasExternalTextures)N.rebindTextures(T,v.get(T.texture).__webglTexture,v.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const ke=T.depthTexture;if(ve.__boundDepthTexture!==ke){if(ke!==null&&v.has(ke)&&(T.width!==ke.image.width||T.height!==ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");N.setupDepthRenderbuffer(T)}}const Te=T.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(me=!0);const Ce=v.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ce[U])?H=Ce[U][W]:H=Ce[U],B=!0):T.samples>0&&N.useMultisampledRTT(T)===!1?H=v.get(T).__webglMultisampledFramebuffer:Array.isArray(Ce)?H=Ce[W]:H=Ce,k.copy(T.viewport),X.copy(T.scissor),Z=T.scissorTest}else k.copy($).multiplyScalar(De).floor(),X.copy(ne).multiplyScalar(De).floor(),Z=_e;if(W!==0&&(H=Zt),be.bindFramebuffer(P.FRAMEBUFFER,H)&&be.drawBuffers(T,H),be.viewport(k),be.scissor(X),be.setScissorTest(Z),B){const ve=v.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+U,ve.__webglTexture,W)}else if(me){const ve=U;for(let Te=0;Te<T.textures.length;Te++){const Ce=v.get(T.textures[Te]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+Te,Ce.__webglTexture,W,ve)}}else if(T!==null&&W!==0){const ve=v.get(T.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ve.__webglTexture,W)}G=-1},this.readRenderTargetPixels=function(T,U,W,H,B,me,Se,ve=0){if(!(T&&T.isWebGLRenderTarget)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=v.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Se!==void 0&&(Te=Te[Se]),Te){be.bindFramebuffer(P.FRAMEBUFFER,Te);try{const Ce=T.textures[ve],ke=Ce.format,Ne=Ce.type;if(!rt.textureFormatReadable(ke)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!rt.textureTypeReadable(Ne)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=T.width-H&&W>=0&&W<=T.height-B&&(T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ve),P.readPixels(U,W,H,B,oe.convert(ke),oe.convert(Ne),me))}finally{const Ce=O!==null?v.get(O).__webglFramebuffer:null;be.bindFramebuffer(P.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(T,U,W,H,B,me,Se,ve=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=v.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Se!==void 0&&(Te=Te[Se]),Te)if(U>=0&&U<=T.width-H&&W>=0&&W<=T.height-B){be.bindFramebuffer(P.FRAMEBUFFER,Te);const Ce=T.textures[ve],ke=Ce.format,Ne=Ce.type;if(!rt.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!rt.textureTypeReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ze=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ze),P.bufferData(P.PIXEL_PACK_BUFFER,me.byteLength,P.STREAM_READ),T.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ve),P.readPixels(U,W,H,B,oe.convert(ke),oe.convert(Ne),0);const pt=O!==null?v.get(O).__webglFramebuffer:null;be.bindFramebuffer(P.FRAMEBUFFER,pt);const St=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Yx(P,St,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ze),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,me),P.deleteBuffer(Ze),P.deleteSync(St),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,U=null,W=0){const H=Math.pow(2,-W),B=Math.floor(T.image.width*H),me=Math.floor(T.image.height*H),Se=U!==null?U.x:0,ve=U!==null?U.y:0;N.setTexture2D(T,0),P.copyTexSubImage2D(P.TEXTURE_2D,W,0,0,Se,ve,B,me),be.unbindTexture()};const Jt=P.createFramebuffer(),xi=P.createFramebuffer();this.copyTextureToTexture=function(T,U,W=null,H=null,B=0,me=null){me===null&&(B!==0?(Ks("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),me=B,B=0):me=0);let Se,ve,Te,Ce,ke,Ne,Ze,pt,St;const Mt=T.isCompressedTexture?T.mipmaps[me]:T.image;if(W!==null)Se=W.max.x-W.min.x,ve=W.max.y-W.min.y,Te=W.isBox3?W.max.z-W.min.z:1,Ce=W.min.x,ke=W.min.y,Ne=W.isBox3?W.min.z:0;else{const dn=Math.pow(2,-B);Se=Math.floor(Mt.width*dn),ve=Math.floor(Mt.height*dn),T.isDataArrayTexture?Te=Mt.depth:T.isData3DTexture?Te=Math.floor(Mt.depth*dn):Te=1,Ce=0,ke=0,Ne=0}H!==null?(Ze=H.x,pt=H.y,St=H.z):(Ze=0,pt=0,St=0);const mt=oe.convert(U.format),Ue=oe.convert(U.type);let dt;U.isData3DTexture?(N.setTexture3D(U,0),dt=P.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(N.setTexture2DArray(U,0),dt=P.TEXTURE_2D_ARRAY):(N.setTexture2D(U,0),dt=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,U.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,U.unpackAlignment);const ot=P.getParameter(P.UNPACK_ROW_LENGTH),Qt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Wi=P.getParameter(P.UNPACK_SKIP_PIXELS),en=P.getParameter(P.UNPACK_SKIP_ROWS),ws=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,Mt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Mt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ce),P.pixelStorei(P.UNPACK_SKIP_ROWS,ke),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ne);const gt=T.isDataArrayTexture||T.isData3DTexture,qt=U.isDataArrayTexture||U.isData3DTexture;if(T.isDepthTexture){const dn=v.get(T),Bt=v.get(U),Yt=v.get(dn.__renderTarget),_a=v.get(Bt.__renderTarget);be.bindFramebuffer(P.READ_FRAMEBUFFER,Yt.__webglFramebuffer),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,_a.__webglFramebuffer);for(let _i=0;_i<Te;_i++)gt&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,v.get(T).__webglTexture,B,Ne+_i),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,v.get(U).__webglTexture,me,St+_i)),P.blitFramebuffer(Ce,ke,Se,ve,Ze,pt,Se,ve,P.DEPTH_BUFFER_BIT,P.NEAREST);be.bindFramebuffer(P.READ_FRAMEBUFFER,null),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(B!==0||T.isRenderTargetTexture||v.has(T)){const dn=v.get(T),Bt=v.get(U);be.bindFramebuffer(P.READ_FRAMEBUFFER,Jt),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,xi);for(let Yt=0;Yt<Te;Yt++)gt?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,dn.__webglTexture,B,Ne+Yt):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,dn.__webglTexture,B),qt?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Bt.__webglTexture,me,St+Yt):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Bt.__webglTexture,me),B!==0?P.blitFramebuffer(Ce,ke,Se,ve,Ze,pt,Se,ve,P.COLOR_BUFFER_BIT,P.NEAREST):qt?P.copyTexSubImage3D(dt,me,Ze,pt,St+Yt,Ce,ke,Se,ve):P.copyTexSubImage2D(dt,me,Ze,pt,Ce,ke,Se,ve);be.bindFramebuffer(P.READ_FRAMEBUFFER,null),be.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else qt?T.isDataTexture||T.isData3DTexture?P.texSubImage3D(dt,me,Ze,pt,St,Se,ve,Te,mt,Ue,Mt.data):U.isCompressedArrayTexture?P.compressedTexSubImage3D(dt,me,Ze,pt,St,Se,ve,Te,mt,Mt.data):P.texSubImage3D(dt,me,Ze,pt,St,Se,ve,Te,mt,Ue,Mt):T.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,me,Ze,pt,Se,ve,mt,Ue,Mt.data):T.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,me,Ze,pt,Mt.width,Mt.height,mt,Mt.data):P.texSubImage2D(P.TEXTURE_2D,me,Ze,pt,Se,ve,mt,Ue,Mt);P.pixelStorei(P.UNPACK_ROW_LENGTH,ot),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Qt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Wi),P.pixelStorei(P.UNPACK_SKIP_ROWS,en),P.pixelStorei(P.UNPACK_SKIP_IMAGES,ws),me===0&&U.generateMipmaps&&P.generateMipmap(dt),be.unbindTexture()},this.initRenderTarget=function(T){v.get(T).__webglFramebuffer===void 0&&N.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?N.setTextureCube(T,0):T.isData3DTexture?N.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?N.setTexture2DArray(T,0):N.setTexture2D(T,0),be.unbindTexture()},this.resetState=function(){D=0,F=0,O=null,be.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}}class Hb{constructor(){vi(this,"silenceThreshold",.02);vi(this,"silenceDuration",1500);vi(this,"lastSpeechTime",Date.now());vi(this,"isSilenceDetecting",!1);vi(this,"onSilenceCallback",null);vi(this,"silenceCheckInterval",null);this.audioContext=null,this.analyser=null,this.dataArray=null,this.source=null,this.isInitialized=!1,this.mode="idle"}async init(e){if(!this.isInitialized)try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.analyser=this.audioContext.createAnalyser(),this.analyser.fftSize=512,this.bufferLength=this.analyser.frequencyBinCount,this.dataArray=new Uint8Array(this.bufferLength),e&&(this.source=this.audioContext.createMediaStreamSource(e),this.source.connect(this.analyser)),this.isInitialized=!0,console.log("[AudioReactiveEngine] Initialized")}catch(t){console.error("[AudioReactiveEngine] Init Error:",t)}}setMode(e){this.mode=e,this.audioContext&&this.audioContext.state==="suspended"&&this.audioContext.resume()}getFrequencyData(){return this.isInitialized?this.mode==="listening"?(this.analyser.getByteFrequencyData(this.dataArray),this.dataArray):this.mode==="speaking"?this.simulateAudioData(!0):this.simulateAudioData(!1):new Uint8Array(this.bufferLength).fill(0)}getAudioData(){const e=this.getFrequencyData();if(!e)return 0;let t=0;const i=Math.min(e.length,20);for(let s=0;s<i;s++)t+=e[s];return Math.min(t/(255*i)*1.5,1)}setOnSilence(e){this.onSilenceCallback=e}startSilenceDetection(){this.isSilenceDetecting||(this.isSilenceDetecting=!0,this.lastSpeechTime=Date.now(),console.log("[AudioReactiveEngine] Starting VAD..."),this.silenceCheckInterval=setInterval(()=>{if(!this.isInitialized||this.mode!=="listening")return;if(this.calculateRMS()>this.silenceThreshold)this.lastSpeechTime=Date.now();else{const t=Date.now()-this.lastSpeechTime;t>this.silenceDuration&&(console.log("[AudioReactiveEngine] Silence Detected ("+t+"ms)"),this.onSilenceCallback&&(this.onSilenceCallback(),this.lastSpeechTime=Date.now()))}},100))}stopSilenceDetection(){this.isSilenceDetecting=!1,this.silenceCheckInterval&&(clearInterval(this.silenceCheckInterval),this.silenceCheckInterval=null)}calculateRMS(){if(!this.analyser||!this.dataArray)return 0;this.analyser.getByteTimeDomainData(this.dataArray);let e=0;for(let i=0;i<this.bufferLength;i++){const s=(this.dataArray[i]-128)/128;e+=s*s}return Math.sqrt(e/this.bufferLength)}simulateAudioData(e){const t=new Uint8Array(this.bufferLength);if(!e){for(let s=0;s<this.bufferLength;s++)t[s]=Math.random()*10;return t}const i=Date.now()/100;for(let s=0;s<this.bufferLength;s++){const r=Math.sin(s*.1+i)*Math.cos(s*.5+i*2);t[s]=Math.abs(r*150)+50}return t}cleanup(){this.audioContext&&this.audioContext.close(),this.isInitialized=!1}}const En=new Hb,Wb=`
varying vec3 vNormal;
varying vec3 vPosition; 
void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,jb=`
varying vec3 vNormal;
varying vec3 vPosition;
uniform float time;
uniform float audioIntensity;
uniform vec3 baseColor;
uniform vec3 glowColor;

void main() {
    // Fresnel Effect (Rim lighting)
    vec3 viewDirection = normalize(cameraPosition - vPosition); // Approximate for local
    // Actually in ShaderMaterial, viewMatrix transforms geometry. 
    // Let's use standard dot product for rim.
    // vNormal is already view-space in ThreeJS if passed correctly, but we computed it manually.
    // Standard Rim: dot(view, normal)
    
    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
    
    // Pulsing inner glow
    float pulse = sin(time * 3.0) * 0.5 + 0.5;
    vec3 atmosphere = glowColor * intensity * (1.0 + audioIntensity * 2.0);
    
    // Base transparency look
    float op = 0.2 + intensity * 0.8;
    
    gl_FragColor = vec4(baseColor + atmosphere, op);
}
`,Xb=({mode:n})=>{const e=z.useRef(null);z.useRef(null);const t=z.useRef(null),i=z.useRef(null),s=z.useRef(null),r=z.useRef(n);return z.useEffect(()=>{r.current=n},[n]),z.useEffect(()=>{if(!e.current)return;const a=e.current.clientWidth,o=e.current.clientHeight,l=new N_,c=new rn(75,a/o,.1,1e3);c.position.z=8;const u=new Gb({alpha:!0,antialias:!0});u.setSize(a,o),u.setPixelRatio(window.devicePixelRatio),e.current.appendChild(u.domElement);const d=new ds(1.2,3),h=new Cn({uniforms:{time:{value:0},audioIntensity:{value:0},baseColor:{value:new tt(26367)},glowColor:{value:new tt(65535)}},vertexShader:Wb,fragmentShader:jb,transparent:!0,blending:Pn,depthWrite:!1,side:Tn}),f=new Gt(d,h);f.position.y=-3.5,l.add(f),t.current=f;const p=new ia(1.6,32,32),x=new Ni({color:52479,transparent:!0,opacity:.08,blending:Pn}),g=new Gt(p,x);f.add(g);const m=new tc(2.3,2.5,64),_=new Ni({color:65535,transparent:!0,opacity:.12,blending:Pn,side:Tn}),y=new Gt(m,_);y.rotation.x=Math.PI*.5,f.add(y);const b=250,w=new Xt,A=new Float32Array(b*3),R=new Float32Array(b*3),L=new Float32Array(b*3),M=new ds(1.7,2),E=M.attributes.position.array;for(let le=0;le<b;le++){const qe=Math.floor(Math.random()*(E.length/3))*3,Re=.15;A[le*3]=E[qe]+(Math.random()-.5)*Re,A[le*3+1]=E[qe+1]+(Math.random()-.5)*Re,A[le*3+2]=E[qe+2]+(Math.random()-.5)*Re,R[le*3]=A[le*3],R[le*3+1]=A[le*3+1],R[le*3+2]=A[le*3+2];const Le=.4+Math.random()*.6;L[le*3]=Le*.5,L[le*3+1]=Le,L[le*3+2]=Le}w.setAttribute("position",new xn(A,3)),w.setAttribute("color",new xn(L,3));const D=new ml({size:.12,transparent:!0,opacity:.9,blending:Pn,vertexColors:!0}),F=new Bu(w,D);f.add(F),i.current=F;const O=new ds(1.7,2),G=new Ni({color:43775,wireframe:!0,transparent:!0,opacity:.15,blending:Pn}),q=new Gt(O,G);f.add(q),s.current=q;const k=new us;l.add(k);const X=50,Z=[65535,16711935,65416,16755200,6702335,56831];for(let le=0;le<X;le++){const qe=Math.random()*.15+.03,Re=new ds(qe,0),Le=Z[Math.floor(Math.random()*Z.length)],ze=new Ni({color:Le,transparent:!0,opacity:.5+Math.random()*.4,blending:Pn}),Fe=new Gt(Re,ze),et=6+Math.random()*14,P=Math.random()*Math.PI*2,je=Math.random()*Math.PI;Fe.position.set(et*Math.sin(je)*Math.cos(P),et*Math.sin(je)*Math.sin(P),et*Math.cos(je)),Fe.userData={velocity:new V((Math.random()-.5)*.015,(Math.random()-.5)*.015,(Math.random()-.5)*.015),rotSpeed:{x:(Math.random()-.5)*.04,y:(Math.random()-.5)*.04},pulseSpeed:1+Math.random()*2,baseOpacity:.5+Math.random()*.4},k.add(Fe)}const ce=new Xt,ue=[],te=[];for(let le=0;le<800;le++){const qe=(Math.random()-.5)*120,Re=(Math.random()-.5)*120,Le=(Math.random()-.5)*60-20;ue.push(qe,Re,Le);const ze=.5+Math.random()*.5;Math.random()>.8?te.push(.3*ze,ze,ze):Math.random()>.7?te.push(ze,.6*ze,ze):te.push(ze,ze,ze)}ce.setAttribute("position",new At(ue,3)),ce.setAttribute("color",new At(te,3));const Pe=new ml({size:.1,transparent:!0,opacity:.6,vertexColors:!0,blending:Pn}),De=new Bu(ce,Pe);l.add(De);const Qe=new us;l.add(Qe);const it=[13158,3342438,26163];for(let le=0;le<5;le++){const qe=new ia(8+Math.random()*6,8,8),Re=new Ni({color:it[le%it.length],transparent:!0,opacity:.02,blending:Pn,side:Ht}),Le=new Gt(qe,Re);Le.position.set((Math.random()-.5)*20,(Math.random()-.5)*20,-15+Math.random()*10),Qe.add(Le)}const $=new j_(2241348,2);l.add($);const ne=new Gu(65535,3,50);ne.position.set(0,-4,5),l.add(ne);const _e=new Gu(16711935,1,30);_e.position.set(5,0,-5),l.add(_e);let Oe;const pe=()=>{Oe=requestAnimationFrame(pe),h.uniforms.time.value+=.02;const le=h.uniforms.time.value;let qe=En.getAudioData();isNaN(qe)&&(qe=0),h.uniforms.audioIntensity.value=Si.lerp(h.uniforms.audioIntensity.value,qe,.1);const Re=r.current;let Le=.005,ze=1,Fe=new tt(26367),et=new tt(65535);if(Re==="listening"?(Le=.008,ze=1+Math.sin(le*2)*.04,Fe.set(56831),et.set(65535)):Re==="processing"?(Le=.04,ze=.92+Math.sin(le*4)*.03,Fe.set(11158783),et.set(16711935)):Re==="speaking"?(Le=.01,ze=1+qe*.4,Fe.set(65416),et.set(4521898)):(Fe.set(8806),et.set(17544)),h.uniforms.baseColor.value.lerp(Fe,.05),h.uniforms.glowColor.value.lerp(et,.05),g.material.opacity=.06+Math.sin(le*1.5)*.03+qe*.08,g.material.color.lerp(et,.05),y.rotation.z+=.003,y.material.opacity=.08+Math.sin(le*1.2)*.04+qe*.1,f.rotation.y+=Le,f.rotation.z+=Le*.5,f.scale.setScalar(Si.lerp(f.scale.x,ze,.1)),Re==="listening"){const P=i.current.geometry.attributes.position.array;for(let je=0;je<b;je++){const Be=je*3,rt=R[Be],be=R[Be+1],C=R[Be+2],v=.2+Math.sin(le+rt*3)*.1;P[Be]=rt*(1+v*qe*2),P[Be+1]=be*(1+v*qe*2),P[Be+2]=C*(1+v*qe*2)}i.current.geometry.attributes.position.needsUpdate=!0}else{const P=i.current.geometry.attributes.position.array;for(let je=0;je<b;je++){const Be=je*3;P[Be]=Si.lerp(P[Be],R[Be],.1),P[Be+1]=Si.lerp(P[Be+1],R[Be+1],.1),P[Be+2]=Si.lerp(P[Be+2],R[Be+2],.1)}i.current.geometry.attributes.position.needsUpdate=!0}if(Re==="speaking"){const P=Math.min(qe*1.5,1);s.current.material.opacity=.15+P*.4,s.current.scale.setScalar(1+P*.05),i.current.rotation.y-=Le*1.5}else s.current.material.opacity=Si.lerp(s.current.material.opacity,.15,.1),s.current.scale.setScalar(Si.lerp(s.current.scale.x,1,.1));k.children.forEach(P=>{P.rotation.x+=P.userData.rotSpeed.x,P.rotation.y+=P.userData.rotSpeed.y,P.material.opacity=P.userData.baseOpacity+Math.sin(le*P.userData.pulseSpeed)*.15,P.position.add(P.userData.velocity),P.position.x>20&&(P.position.x=-20),P.position.x<-20&&(P.position.x=20),P.position.y>20&&(P.position.y=-20),P.position.y<-20&&(P.position.y=20),P.position.z>10&&(P.position.z=-10),P.position.z<-10&&(P.position.z=10)}),De.rotation.y+=2e-4,De.rotation.x+=1e-4,Qe.children.forEach((P,je)=>{P.rotation.y+=.001*(je+1),P.material.opacity=.02+Math.sin(le*.3+je)*.008}),ne.color.lerp(et,.05),ne.intensity=2+qe*3,u.render(l,c)};return pe(),()=>{cancelAnimationFrame(Oe),e.current&&u.domElement&&e.current.contains(u.domElement)&&e.current.removeChild(u.domElement),d.dispose(),h.dispose(),M.dispose(),D.dispose(),O.dispose(),G.dispose(),ce.dispose(),Pe.dispose(),p.dispose(),x.dispose(),m.dispose(),_.dispose(),k.children.forEach(le=>{le.geometry&&le.geometry.dispose(),le.material&&le.material.dispose()}),Qe.children.forEach(le=>{le.geometry&&le.geometry.dispose(),le.material&&le.material.dispose()}),u.dispose()}},[]),S.jsx("div",{ref:e,className:"w-full h-full"})},qb=({isOpen:n,onClose:e,status:t,transcript:i,messages:s,currentLang:r="en-US",onLanguageChange:a,isSongMode:o,onToggleSongMode:l})=>{const c=z.useRef(null);if(z.useEffect(()=>{c.current&&(c.current.scrollTop=c.current.scrollHeight)},[s,i]),!n)return null;const u=t==="listening"?"listening":t==="speaking"?"speaking":t==="processing"?"processing":"idle",d=[{code:"en-US",label:"ENG",flag:"🇺🇸"},{code:"hi-IN",label:"HIN",flag:"🇮🇳"},{code:"te-IN",label:"TEL",flag:"🇮🇳"}];return S.jsxs("div",{style:{position:"fixed",inset:0,zIndex:9999,background:"#000",display:"flex",flexDirection:"column",overflow:"hidden"},children:[S.jsx("div",{style:{position:"absolute",inset:0,zIndex:0},children:S.jsx(Xb,{mode:u})}),S.jsxs("div",{style:{position:"relative",zIndex:2,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px 8px 14px",flexShrink:0},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",background:"rgba(6, 182, 212, 0.15)",border:"1px solid rgba(6, 182, 212, 0.4)",borderRadius:"24px",padding:"7px 16px",backdropFilter:"blur(6px)"},children:[S.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:t==="listening"?"#06b6d4":t==="speaking"?"#a855f7":"#f59e0b",boxShadow:t==="listening"?"0 0 12px #06b6d4":t==="speaking"?"0 0 12px #a855f7":"0 0 12px #f59e0b",animation:"voicePulse 2s infinite"}}),S.jsx("span",{style:{color:"#f1f5f9",fontSize:"11px",fontWeight:700,fontFamily:"monospace",letterSpacing:"0.15em"},children:t==="listening"?"LISTENING MODE":t==="speaking"?"SPEAKING MODE":"PROCESSING..."})]}),S.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[S.jsx("button",{onClick:l,title:o?"Song Search: ON":"Song Search: OFF",style:{background:o?"rgba(168, 85, 247, 0.25)":"rgba(255, 255, 255, 0.06)",border:o?"1px solid rgba(168, 85, 247, 0.6)":"1px solid rgba(255, 255, 255, 0.15)",borderRadius:"50%",width:"36px",height:"36px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all 0.3s ease",boxShadow:o?"0 0 16px rgba(168, 85, 247, 0.4)":"none",position:"relative",overflow:"hidden"},children:S.jsx("div",{style:{display:"flex",alignItems:"flex-end",gap:"2px",height:"16px"},children:[0,1,2].map(h=>S.jsx("div",{style:{width:"3px",borderRadius:"2px",background:o?"#a855f7":"#94a3b8",transition:"background 0.3s",animation:o?`musicBar${h} 0.8s ease-in-out infinite alternate`:"none",height:o?h===1?"14px":"8px":"6px"}},h))})}),S.jsx("button",{onClick:e,style:{background:"rgba(255, 255, 255, 0.06)",border:"1px solid rgba(255, 255, 255, 0.15)",borderRadius:"24px",padding:"7px 16px",color:"#cbd5e1",fontSize:"10px",fontWeight:700,fontFamily:"monospace",letterSpacing:"0.15em",cursor:"pointer",transition:"all 0.2s"},children:"EXIT DIMENSION"})]})]}),S.jsx("div",{style:{position:"relative",zIndex:2,display:"flex",justifyContent:"center",gap:"8px",padding:"4px 14px",flexShrink:0},children:d.map(h=>S.jsxs("button",{onClick:()=>a&&a(h.code),style:{background:r===h.code?"rgba(6, 182, 212, 0.25)":"rgba(255, 255, 255, 0.05)",border:r===h.code?"1px solid rgba(6, 182, 212, 0.5)":"1px solid rgba(255, 255, 255, 0.1)",borderRadius:"16px",padding:"4px 12px",color:r===h.code?"#fff":"#94a3b8",fontSize:"10px",fontWeight:700,fontFamily:"monospace",cursor:"pointer",display:"flex",alignItems:"center",gap:"5px",transition:"all 0.2s"},children:[S.jsx("span",{children:h.flag}),S.jsx("span",{children:h.label})]},h.code))}),S.jsxs("div",{ref:c,style:{position:"relative",zIndex:1,flex:1,overflowY:"auto",overflowX:"hidden",padding:"4px 14px",paddingBottom:"10px",display:"flex",flexDirection:"column",gap:"10px"},children:[S.jsx("div",{style:{flex:1}}),s&&s.map((h,f)=>S.jsxs("div",{style:{display:"flex",justifyContent:h.sender==="user"?"flex-end":"flex-start",alignItems:"flex-start"},children:[h.sender!=="user"&&S.jsx("div",{style:{width:"7px",height:"7px",borderRadius:"50%",background:"#06b6d4",marginTop:"12px",marginRight:"8px",flexShrink:0,boxShadow:"0 0 6px rgba(6,182,212,0.6)"}}),S.jsx("div",{style:{maxWidth:"82%",padding:"10px 14px",borderRadius:h.sender==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",fontSize:"13px",lineHeight:"1.5",...h.sender==="user"?{background:"rgba(6, 182, 212, 0.12)",border:"1px solid rgba(6, 182, 212, 0.25)",color:"#e0f7fa",backdropFilter:"blur(4px)"}:{background:"rgba(255, 255, 255, 0.05)",border:"1px solid rgba(255, 255, 255, 0.08)",color:"#e2e8f0",backdropFilter:"blur(4px)"}},children:h.message})]},f))]}),S.jsxs("div",{style:{position:"relative",zIndex:2,flexShrink:0,textAlign:"center",pointerEvents:"none"},children:[i&&S.jsx("div",{style:{padding:"4px 14px"},children:S.jsxs("div",{style:{display:"inline-block",padding:"7px 20px",borderRadius:"18px",fontSize:"14px",fontFamily:"monospace",background:"rgba(255, 255, 255, 0.08)",border:"1px dashed rgba(255, 255, 255, 0.3)",color:"#ffffff",animation:"voicePulse 1.5s infinite",letterSpacing:"0.03em",textShadow:"0 0 10px rgba(255, 255, 255, 0.5)"},children:[i,"..."]})}),S.jsx("div",{style:{color:"#e2e8f0",fontSize:"14px",fontFamily:"monospace",letterSpacing:"0.18em",fontWeight:500,textShadow:"0 0 12px rgba(226, 232, 240, 0.4)",padding:"4px 0 2px 0"},children:t==="listening"?"LISTENING...":t==="speaking"?"SPEAKING...":"THINKING..."}),S.jsx("div",{style:{color:"#94a3b8",fontSize:"9px",fontFamily:"monospace",letterSpacing:"0.2em",fontWeight:600,textShadow:"0 0 6px rgba(148, 163, 184, 0.4)",marginBottom:"8px"},children:'SAY "HEY NOVA" OR "STOP" TO INTERRUPT'}),o&&S.jsx("div",{style:{color:"#a855f7",fontSize:"10px",fontFamily:"monospace",fontWeight:"bold",animation:"voicePulse 1.5s infinite",letterSpacing:"0.15em",textShadow:"0 0 10px rgba(168, 85, 247, 0.5)",marginBottom:"4px"},children:"🎵 SONG SEARCH ACTIVE"}),S.jsx("div",{style:{height:"200px"}})]}),S.jsx("style",{children:`
                @keyframes voicePulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                @keyframes musicBar0 {
                    0% { height: 4px; }
                    100% { height: 14px; }
                }
                @keyframes musicBar1 {
                    0% { height: 14px; }
                    100% { height: 6px; }
                }
                @keyframes musicBar2 {
                    0% { height: 6px; }
                    100% { height: 12px; }
                }
            `})]})},Yb={_cachedVoice:null,scoreVoice(n){let e=0;n.localService&&(e+=10);const t=n.name.toLowerCase();return t.includes("neural")&&(e+=50),t.includes("natural")&&(e+=40),t.includes("premium")&&(e+=30),t.includes("enhanced")&&(e+=20),t.includes("google")&&(e+=15),t.includes("samantha")&&(e+=25),t.includes("ava")&&(e+=25),t.includes("desktop")&&(e-=10),t.includes("mobile")&&(e-=5),e},async getBestVoice(n="en-US"){let e=window.speechSynthesis.getVoices();e.length===0&&(await new Promise(r=>{const a=()=>{e=window.speechSynthesis.getVoices(),window.speechSynthesis.removeEventListener("voiceschanged",a),r()};window.speechSynthesis.addEventListener("voiceschanged",a),setTimeout(r,1e3)}),e=window.speechSynthesis.getVoices());const t=n.split("-")[0];let i=e.filter(r=>r.lang.startsWith(t));if(i.length===0&&(console.warn(`[VoiceSelector] No voice found for ${n}, falling back to English`),i=e.filter(r=>r.lang.startsWith("en"))),i.length===0)return null;i.sort((r,a)=>this.scoreVoice(a)-this.scoreVoice(r));const s=i[0];return console.log(`[VoiceSelector] Selected for ${n}: ${s.name} (Score: ${this.scoreVoice(s)})`),s}},ai={queue:[],isPlaying:!1,currentUtterance:null,monitorInterval:null,config:{basePitch:1,baseRate:1.05,pitchVariance:.05,rateVariance:.05},chunkText(n){const e=n.split(/([.?!:\n;])\s*/),t=[];for(let i=0;i<e.length;i+=2){const s=e[i],r=e[i+1]||"",a=(s+r).trim();if(a)if(a.length<200)t.push(a);else{const o=a.split(/([,])\s*/);let l="";for(let c=0;c<o.length;c+=2){const u=o[c],d=o[c+1]||"",h=(u+d).trim();(l+h).length<200?l+=(l?" ":"")+h:(l&&t.push(l),l=h)}l&&t.push(l)}}return t},async speak(n,e="en-US"){if(!n)return;console.log(`[SpeechEngine] Queueing text (${e}):`,n),this.queueTimeout&&clearTimeout(this.queueTimeout),this.chunkText(n).forEach(i=>{i.trim()&&this.queue.push({text:i.trim(),lang:e})}),this.isPlaying||this.processQueue()},async processQueue(){if(this.queue.length===0){this.isPlaying=!1,console.log("[SpeechEngine] Queue empty, playback finished.");return}this.isPlaying=!0;const n=this.queue.shift();console.log("[SpeechEngine] Processing queue, item:",n);const e=await Yb.getBestVoice(n.lang||"en-US");if(!e){console.warn("[SpeechEngine] No suitable voice found! Retrying..."),setTimeout(()=>this.processQueue(),500);return}const t=this.config.basePitch+(Math.random()*this.config.pitchVariance*2-this.config.pitchVariance),i=this.config.baseRate+(Math.random()*this.config.rateVariance*2-this.config.rateVariance),s=new SpeechSynthesisUtterance(n.text);s.voice=e,s.pitch=parseFloat(t.toFixed(2)),s.rate=parseFloat(i.toFixed(2)),s.volume=1,s.onend=()=>{console.log("[SpeechEngine] Utterance ended."),this.currentUtterance=null,this.queueTimeout=setTimeout(()=>{this.processQueue()},this.config.pauseBetweenChunks||50)},s.onerror=r=>{if(r.error==="interrupted"||r.error==="canceled"){this.currentUtterance=null;return}console.warn("[SpeechEngine] TTS Error:",r.error,r),this.currentUtterance=null,setTimeout(()=>this.processQueue(),50)},this.currentUtterance=s;try{window.speechSynthesis.paused&&window.speechSynthesis.resume(),window.speechSynthesis.speak(s),this.keepAlive()}catch(r){console.error("[SpeechEngine] Failed to call speak:",r)}},keepAliveTimer:null,keepAlive(){this.keepAliveTimer&&clearInterval(this.keepAliveTimer),this.keepAliveTimer=setInterval(()=>{window.speechSynthesis.speaking&&!window.speechSynthesis.paused?(window.speechSynthesis.pause(),window.speechSynthesis.resume()):clearInterval(this.keepAliveTimer)},1e4)},stop(){this.queue=[],this.isPlaying=!1,this.keepAliveTimer&&clearInterval(this.keepAliveTimer),window.speechSynthesis&&window.speechSynthesis.cancel(),this.monitorInterval&&(clearInterval(this.monitorInterval),this.monitorInterval=null),this.currentUtterance=null},startMonitor(){}};let pn=null,oi=!1,bn=!1,Fr=null,Us=null,sn=null;const Ci={currentLang:"en-US",setLanguage(n){console.log(`[VoiceService] Setting language to: ${n}`),this.currentLang=n,oi&&(this.stopListening(),setTimeout(()=>this.startListening(),100))},async init(){},async startVoiceMode(n,e){Us=n,sn=e,bn=!0;try{Fr||(Fr=await navigator.mediaDevices.getUserMedia({audio:!0}),await En.init(Fr),En.setOnSilence(()=>{console.log("[VoiceService] VAD Silence Detected -> Stopping Listening"),oi&&bn&&this.stopListeningForProcessing()}))}catch(t){console.error("[VoiceService] Failed to get Mic Stream:",t)}this.startListening()},stopVoiceMode(){bn=!1,this.stopListening(),ai.stop(),En.stopSilenceDetection(),En.setMode("idle"),sn&&sn("idle")},pause(){bn=!1,this.stopListening()},resume(){bn=!0,this.startListening()},getStream(){return Fr},startListening(){if(bn&&!oi){if(!("webkitSpeechRecognition"in window)){console.error("Browser does not support Speech Recognition");return}sn&&sn(ai.isPlaying?"speaking":"listening"),En.setMode("listening"),En.startSilenceDetection(),pn=new webkitSpeechRecognition,pn.continuous=!0,pn.interimResults=!0,pn.lang=this.currentLang,pn.onstart=()=>{oi=!0,console.log("[VoiceService] Listening started...")},pn.onresult=n=>{let e="",t="";for(let s=n.resultIndex;s<n.results.length;++s)n.results[s].isFinal?t+=n.results[s][0].transcript:e+=n.results[s][0].transcript;const i=(t+e).toLowerCase();ai.isPlaying&&(["stop","nova","hey nova","wait","quiet","stfu","shush"].some(a=>i.includes(a))||i.trim().length>6)&&(console.log("[VoiceService] Barge-In Detected! Interrupting speech."),ai.stop(),sn&&sn("listening")),Us&&Us(t+e,!1),t.trim()&&(console.log("[VoiceService] Final Transcript:",t),Us&&Us(t,!0))},pn.onerror=n=>{if(n.error==="no-speech"){console.debug("[VoiceService] No speech detected (retrying...)");return}if(n.error==="aborted"){console.debug("[VoiceService] Recognition aborted (benign)");return}console.warn("[VoiceService] STT Error:",n.error)},pn.onend=()=>{oi=!1,console.log("[VoiceService] Recognition ended."),bn&&!ai.isPlaying&&setTimeout(()=>{bn&&!oi&&this.startListening()},100)};try{pn.start()}catch(n){console.error("Failed to start recognition:",n)}}},stopListening(){En.stopSilenceDetection(),pn&&(pn.stop(),pn=null),oi=!1},stopListeningForProcessing(){this.stopListening(),sn&&sn("processing")},speak(n){n&&(sn&&sn("speaking"),!oi&&bn&&this.startListening(),En.setMode("speaking"),ai.speak(n,this.currentLang),this.monitorSpeechEnd())},monitorSpeechEnd(){this.speechMonitor&&clearInterval(this.speechMonitor),this.speechMonitor=setInterval(()=>{ai.isPlaying||(clearInterval(this.speechMonitor),this.speechMonitor=null,bn&&sn&&(sn("listening"),En.startSilenceDetection(),En.setMode("listening")))},100)},interrupt(){ai.stop(),bn&&this.startListening()},stop(){this.stopVoiceMode()}},fd={isDetecting:!1,shouldStop:!1,startContinuousDetection(n="en-US",e,t,i){if(this.isDetecting)return;this.isDetecting=!0,this.shouldStop=!1,console.log(`[SongService] Starting CONTINUOUS song detection (${n})...`);const s=()=>{if(this.shouldStop){this.isDetecting=!1;return}const r=new webkitSpeechRecognition;r.lang=n,r.continuous=!1,r.interimResults=!0;let a="",o=null;r.onresult=l=>{let c="";for(let u=l.resultIndex;u<l.results.length;++u)l.results[u].isFinal?a+=l.results[u][0].transcript+" ":c+=l.results[u][0].transcript;i&&i(a+c),o&&clearTimeout(o),o=setTimeout(()=>r.stop(),3e3)},r.onerror=l=>{l.error==="no-speech"||l.error==="aborted"||l.error==="network"||console.warn("[SongService] Speech Error:",l.error)},r.onend=async()=>{const l=a.trim();if(l.length>8){console.log("[SongService] Captured potential lyrics:",l);try{let c=await va.chatCompletion([{role:"system",content:'Identify the song from lyrics. Return JSON: {"title": "Title", "artist": "Artist"}. If unsure, return null.'},{role:"user",content:`Lyrics: "${l}"`}],null,{temperature:0}),u=c.replace(/```json/g,"").replace(/```/g,"").trim(),d=JSON.parse(u);if(!d||!d.title){console.log("[SongService] LLM uncertain. Searching DuckDuckGo..."),i&&i("🔎 Searching web for lyrics...");const h=`song lyrics "${l}"`,f=await jf.search(h);if(f&&f.length>0){const p=f.map(x=>x.title+": "+x.snippet).join(`
`);console.log("[SongService] Search Context:",p),c=await va.chatCompletion([{role:"system",content:'Identify the song from these search results. Return JSON: {"title": "Title", "artist": "Artist"}. If still unknown, return null.'},{role:"user",content:`Search Results for lyrics "${l}":
${p}`}],null,{temperature:0}),u=c.replace(/```json/g,"").replace(/```/g,"").trim(),d=JSON.parse(u)}}d&&d.title&&e(d)}catch(c){console.error("[SongService] Identification error:",c),t&&t(c)}}this.shouldStop?this.isDetecting=!1:setTimeout(s,500)};try{r.start(),setTimeout(()=>{this.isDetecting&&!this.shouldStop&&r.stop()},8e3)}catch(l){console.error("Start error:",l),this.shouldStop||setTimeout(s,1e3)}};s()},stopDetection(){this.shouldStop=!0,this.isDetecting=!1,console.log("[SongService] Stopping detection loop.")},async identifySong(n="en-US"){return this.isDetecting?null:(this.isDetecting=!0,console.log(`[SongService] Starting lyric-based song identification (${n})...`),new Promise(e=>{const t=new webkitSpeechRecognition;t.lang=n,t.continuous=!1,t.interimResults=!0;let i="",s=null;t.onresult=r=>{let a="";for(let o=r.resultIndex;o<r.results.length;++o)r.results[o].isFinal?i+=r.results[o][0].transcript+" ":a+=r.results[o][0].transcript;console.log("[SongService] Hearing:",i+a),s&&clearTimeout(s),s=setTimeout(()=>t.stop(),4e3)},t.onend=async()=>{this.isDetecting=!1;const r=i.trim();if(console.log("[SongService] Captured Lyrics:",r),r.length<5){e(null);return}try{const o=(await va.chatCompletion([{role:"system",content:'You are a music expert. Identify the song from the provided lyrics. Return ONLY a JSON object: {"title": "Song Name", "artist": "Artist Name"}. If unknown, return null.'},{role:"user",content:`Identify this song from these lyrics: "${r}"`}],null,{temperature:0})).replace(/```json/g,"").replace(/```/g,"").trim(),l=JSON.parse(o);e(l)}catch(a){console.error("[SongService] Identification failed:",a),e(null)}},t.onerror=r=>{if(r.error==="aborted"){console.log("[SongService] Recognition aborted (benign).");return}console.error("[SongService] Speech Error:",r.error),(r.error==="not-allowed"||r.error==="service-not-allowed")&&e(null),r.error!=="no-speech"&&t.stop()},t.start(),setTimeout(()=>{this.isDetecting&&t.stop()},1e4)}))}},$b=({isOpen:n,onClose:e,onFileUpload:t,isImageGenEnabled:i,toggleImageGen:s,isWebSearchEnabled:r,toggleWebSearch:a,isShoppingMode:o,toggleShopping:l,isAgenticMode:c,toggleAgentic:u})=>{if(!n)return null;const d=[{icon:"Paperclip",label:"Add photos & files",onClick:t,color:"text-neon-blue"},{icon:"Palette",label:"Create image",onClick:s,active:i,color:"text-neon-magenta"},{icon:"Globe",label:"Deep research",onClick:a,active:r,color:"text-neon-cyan"},{icon:"ShoppingBag",label:"Shopping research",onClick:l,active:o,color:"text-green-400"},{icon:"Zap",label:"Agent Mode",onClick:u,active:c,color:"text-neon-violet"}];return S.jsxs("div",{className:"absolute bottom-16 left-2 z-50 animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200",children:[S.jsx("div",{className:"glass-panel border border-neon-cyan/30 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] w-64 overflow-hidden backdrop-blur-xl",children:S.jsx("div",{className:"p-1.5 space-y-0.5",children:d.map((h,f)=>S.jsxs("button",{onClick:()=>{h.onClick(),e()},className:`
                                w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg transition-all duration-200 group
                                ${h.active?"bg-neon-cyan/10 text-white shadow-[0_0_10px_rgba(6,182,212,0.2)] border border-neon-cyan/20":"text-gray-300 hover:bg-white/5 hover:text-white hover:pl-4"}
                            `,children:[S.jsx("span",{className:`${h.color} ${h.active?"opacity-100":"opacity-80 group-hover:opacity-100"} transition-opacity`,children:S.jsx(Lt,{name:h.icon,size:18,className:h.active?"animate-pulse":""})}),S.jsx("span",{className:"flex-1 text-left font-body tracking-wide",children:h.label}),h.active&&S.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_5px_theme('colors.neon.cyan')]"})]},f))})}),S.jsx("div",{className:"fixed inset-0 z-[-1]",onClick:e})]})},co=({isExpanded:n,logs:e=[],status:t,estimatedTime:i=12})=>{const[s,r]=z.useState(n),[a,o]=z.useState(0),l=t||"idle",c=["thinking","navigating","planning","validating","extracting","active"].includes(l),u=l==="completed"||l==="idle";z.useEffect(()=>{let f;return c&&(f=setInterval(()=>{o(p=>p+1)},1e3)),()=>{f&&clearInterval(f)}},[c]);const h=(()=>{if(!c)return null;const f=a-i;return f<=0?null:f<15?"Almost there, hang tight...":f<45?"Still working on it, please wait...":f<90?"Taking a bit longer than usual, almost done...":"Please wait a few more moments, we're close..."})();return S.jsxs("div",{className:"my-3 border border-white/10 rounded-xl overflow-hidden bg-black/40 backdrop-blur-md",children:[S.jsxs("div",{className:"flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors",onClick:()=>r(!s),children:[S.jsxs("div",{className:"flex items-center gap-3",children:[S.jsx("div",{className:"relative flex items-center justify-center w-6 h-6",children:c?S.jsxs(S.Fragment,{children:[S.jsx("span",{className:"absolute inset-0 border-2 border-neon-cyan/30 rounded-full animate-ping"}),S.jsx(Lt,{name:"Cpu",className:"w-4 h-4 text-neon-cyan animate-pulse"})]}):u?S.jsx(Lt,{name:"CheckCircle2",className:"w-5 h-5 text-green-500"}):S.jsx(Lt,{name:"AlertCircle",className:"w-5 h-5 text-red-500"})}),S.jsxs("div",{className:"flex flex-col",children:[S.jsx("span",{className:`text-sm font-semibold tracking-wide ${c?"animate-shimmer bg-[linear-gradient(110deg,#00f0ff,45%,#fff,55%,#00f0ff)] bg-[length:200%_100%] bg-clip-text text-transparent":"text-white/80"}`,children:c?"Agent Reasoning...":u?"Task Completed":"Issue Detected"}),c&&S.jsxs("div",{className:"flex flex-col gap-0.5 mt-0.5",children:[S.jsxs("div",{className:"flex items-center gap-2 text-[10px] font-mono text-neon-cyan/70",children:[S.jsxs("span",{children:["Thought for ",a,"s"]}),S.jsx("span",{className:"w-1 h-1 rounded-full bg-white/20"}),S.jsxs("span",{children:["Est: ",i<60?`${i}s`:`${Math.floor(i/60)}m ${i%60}s`]})]}),h&&S.jsxs("span",{className:"text-[10px] font-mono text-amber-400/80 animate-pulse",children:["⏳ ",h]})]}),u&&a>0&&S.jsxs("div",{className:"text-[10px] font-mono text-green-500/70 mt-0.5",children:["Finished in ",a,"s"]})]})]}),S.jsx(hs.div,{animate:{rotate:s?180:0},transition:{duration:.2},children:S.jsx(Lt,{name:"ChevronDown",className:"w-4 h-4 text-white/40"})})]}),S.jsx(cx,{initial:!1,children:s&&S.jsx(hs.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.3,ease:"easeInOut"},className:"border-t border-white/10",children:S.jsxs("div",{className:"p-4 bg-black/60 font-mono text-xs max-h-[300px] overflow-y-auto space-y-2 custom-scrollbar",children:[e.length===0?S.jsx("div",{className:"text-white/30 italic",children:"Initializing cognitive modules..."}):e.map((f,p)=>S.jsxs(hs.div,{initial:{opacity:0,x:-10},animate:{opacity:1,x:0},className:`flex gap-3 ${f.type==="thought"?"pl-2 border-l-2 border-amber-400/30":""}`,children:[S.jsx("span",{className:"text-white/30 shrink-0",children:f.timestamp||new Date().toLocaleTimeString()}),S.jsxs("span",{className:`flex-1 ${f.type==="thought"?"text-amber-300/80 italic":p===e.length-1&&c?"text-neon-cyan":"text-white/70"}`,children:[f.type!=="thought"&&S.jsx("span",{className:"text-neon-magenta/50 mr-2",children:"➜"}),f.message,f.url&&S.jsx("div",{className:"text-[10px] text-white/30 truncate mt-1 max-w-[200px]",children:f.url})]})]},p)),c&&S.jsxs("div",{className:"flex gap-3",children:[S.jsx("span",{className:"text-white/30 shrink-0 opacity-0",children:"00:00:00"}),S.jsx("span",{className:"w-2 h-3 bg-neon-cyan animate-pulse mt-0.5"})]})]})})})]})},Kb=({status:n="active",currentMessage:e="Generating Image..."})=>{const[t,i]=z.useState(0),s=n==="active"||n==="generating_image";z.useEffect(()=>{let a;return s&&(a=setInterval(()=>{i(o=>o+1)},1e3)),()=>{a&&clearInterval(a)}},[s]);const r=()=>{if(!s)return"Synthesis Complete";const a=Math.floor(t/4)%5;return["Synthesizing visual lattice...","Weaving photonic threads...","Aligning quantum pixels...","Crystallizing neural patterns...","Rendering dimensional layers..."][a]};return S.jsx(hs.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},transition:{duration:.5,ease:"easeOut"},className:"my-4 relative",children:S.jsxs("div",{className:"nova-image-loader relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl",children:[S.jsx("div",{className:"relative flex justify-center items-center p-6",children:S.jsxs("div",{className:"nova-loader-glow relative w-48 h-48 rounded-xl overflow-hidden",children:[S.jsx("img",{src:"/nova_loader.png",alt:"Nova Intelligence",className:"w-full h-full object-cover rounded-xl",style:{filter:s?"brightness(1.1) saturate(1.2)":"brightness(0.8) saturate(0.7)"}}),s&&S.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer-sweep rounded-xl"})]})}),S.jsxs("div",{className:"px-6 pb-5 text-center",children:[S.jsx("div",{className:"text-[10px] font-mono tracking-[0.4em] text-neon-cyan/50 uppercase mb-2",children:"Nova Intelligence"}),S.jsx("div",{className:`text-sm font-semibold mb-1 ${s?"animate-shimmer bg-[linear-gradient(110deg,#00f0ff,45%,#fff,55%,#00f0ff)] bg-[length:200%_100%] bg-clip-text text-transparent":"text-green-400"}`,children:e}),S.jsx(hs.div,{initial:{opacity:0,y:5},animate:{opacity:1,y:0},transition:{duration:.4},className:"text-[11px] font-mono text-violet-300/60 italic",children:r()},r()),s&&S.jsxs("div",{className:"mt-2 text-[10px] font-mono text-white/30",children:[t,"s elapsed"]})]}),S.jsx("div",{className:"absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent"})]})})},Zb=({products:n=[],winnerProduct:e,winnerUrl:t,onAddToCart:i,onCompare:s})=>{const[r,a]=z.useState({});if(!n||n.length===0)return null;const o=(d,h,f,p)=>{a(x=>({...x,[`${d}-${h}`]:!0})),d==="cart"?i(f):d==="compare"&&s(f,p)},l=d=>{if(!d||d==="Check Site")return!1;const h=d.toLowerCase();return!(h.includes("/s?k=")||h.includes("/s/")||h.includes("/search")||h.includes("duckduckgo.com")||h.includes("/browse/"))},c=d=>!d||d==="Check Site"||!l(d)?"Search on Amazon":"View Product",u=(d,h)=>!d||d==="Check Site"?`https://www.amazon.in/s?k=${encodeURIComponent(h||"")}`:d;return S.jsxs("div",{className:"mt-4 flex flex-col gap-3",children:[S.jsx("h3",{className:"text-sm font-semibold text-white/90 px-1 border-b border-white/10 pb-2",children:"Recommended Products"}),n.map((d,h)=>{const f=d.url||t,p=d.name||e,x=l(f);return S.jsxs("div",{className:"bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-3 pb-4 flex flex-col gap-2 relative group shadow-lg",children:[d.badge&&S.jsx("div",{className:"absolute top-0 right-0 bg-neon-cyan/20 text-neon-cyan text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10",children:d.badge.toUpperCase()}),S.jsxs("div",{className:"flex gap-3 items-start",children:[d.image?S.jsx("img",{src:d.image,alt:d.name,className:"w-16 h-16 object-cover rounded-lg bg-black/40 border border-white/5"}):S.jsx("div",{className:"w-16 h-16 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center text-xl",children:"🛒"}),S.jsxs("div",{className:"flex-1 flex flex-col min-w-0",children:[S.jsx("h4",{className:"text-sm font-medium text-white/90 truncate pr-16",children:p}),S.jsx("p",{className:"text-xs text-neon-cyan font-mono mt-1",children:d.price}),d.score&&S.jsxs("p",{className:"text-[10px] text-white/50 mt-1",children:["Score: ",d.score,"/10"]})]})]}),d.specs&&d.specs.length>0&&S.jsx("ul",{className:"mt-2 space-y-1",children:d.specs.slice(0,3).map((g,m)=>S.jsxs("li",{className:"text-[11px] text-white/60 flex items-start gap-1",children:[S.jsx("span",{className:"text-neon-magenta mt-[2px]",children:"•"}),S.jsx("span",{children:g})]},m))}),d.explanation&&S.jsx("div",{className:"mt-2 text-[11px] text-neon-cyan/80 bg-neon-cyan/5 p-2 rounded-lg border border-neon-cyan/10",children:d.explanation}),S.jsxs("div",{className:"flex flex-col gap-2 mt-3 pt-3 border-t border-white/10",children:[S.jsx("a",{href:u(f,p),target:"_blank",rel:"noreferrer",className:"w-full px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium text-white/80 transition-colors text-center cursor-pointer block",children:c(f)}),x&&S.jsxs("button",{onClick:()=>o("cart",h,f,p),disabled:r[`cart-${h}`],className:`w-full px-3 py-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${r[`cart-${h}`]?"bg-green-500/20 text-green-400 border border-green-500/30":"bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30"}`,children:[S.jsx("span",{children:"🛒"}),r[`cart-${h}`]?"Adding...":"Add to Cart"]}),x&&S.jsxs("button",{onClick:()=>o("compare",h,f,p),disabled:r[`compare-${h}`],className:"w-full px-3 py-2 bg-neon-magenta/10 hover:bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/30 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5",children:[S.jsx("span",{children:"⚡"}),r[`compare-${h}`]?"Comparing...":"Compare on Flash.co"]})]})]},h)})]})},Jb={keywords:["reference","refer","based on this","use this image","take this page image","use this as inspiration","from this page","use this"],shouldTrigger(n,e){if(!e)return!1;const t=n.toLowerCase();return this.keywords.some(i=>t.includes(i.toLowerCase()))}},pd={async checkLimits(){const n=await ut.get("vision_rate_limits")||{visionRequestsThisMinute:0,visionRequestsToday:0,lastMinuteTimestamp:Date.now(),lastDayTimestamp:Date.now()},e=Date.now(),t=24*60*60*1e3;e-n.lastDayTimestamp>t&&(n.visionRequestsToday=0,n.lastDayTimestamp=e);const i=60*1e3;return e-n.lastMinuteTimestamp>i&&(n.visionRequestsThisMinute=0,n.lastMinuteTimestamp=e),n.visionRequestsThisMinute>=5?(console.warn("Vision Reference RPM limit reached (< 5/min)"),!1):n.visionRequestsToday>=100?(console.warn("Vision Reference daily limit reached (< 100/day)"),!1):(n.visionRequestsThisMinute+=1,n.visionRequestsToday+=1,await ut.set("vision_rate_limits",n),!0)}},Or={debounceCache:{lastAnalyzedUrl:null,lastVisionTimestamp:0},async captureAndProcessScreenshot(){return new Promise((n,e)=>{chrome.tabs.query({active:!0,currentWindow:!0},t=>{if(!t||t.length===0){n(null);return}const i=t[0],s=i.url,r=Date.now();if(this.debounceCache.lastAnalyzedUrl===s&&r-this.debounceCache.lastVisionTimestamp<1e4){console.log("VisionClient: Debounce active, skipping capture."),n(null);return}chrome.tabs.captureVisibleTab(i.windowId,{format:"jpeg",quality:50},a=>{if(chrome.runtime.lastError||!a){console.error("VisionClient capture error:",chrome.runtime.lastError),n(null);return}this.debounceCache.lastAnalyzedUrl=s,this.debounceCache.lastVisionTimestamp=r;const o=new Image;o.onload=()=>{const l=document.createElement("canvas"),c=1024,u=1024;let d=o.width,h=o.height;d>h&&d>c?(h*=c/d,d=c):h>u&&(d*=u/h,h=u),l.width=d,l.height=h,l.getContext("2d").drawImage(o,0,0,d,h),n(l.toDataURL("image/jpeg",.8))},o.onerror=()=>n(a),o.src=a})})})},async analyzeScreenshot(n){var d;if(!n)return null;const e=await ut.get("image_settings"),t=(d=e==null?void 0:e.providers)==null?void 0:d.a4f;if(!t||!t.apiKey)return console.warn("VisionClient: A4F API key not found in image settings."),null;const i=t.apiKey,s="https://api.a4f.co/v1/chat/completions",r=`You are an expert image content extractor.
CRITICAL INSTRUCTION: You are looking at a screenshot of a webpage. Do NOT extract, read, or output any text from headers, sidebars, navigation menus, or body paragraphs on the page.
ONLY describe the content of the main IMAGE (or images) shown in the screenshot. If there is text mathematically rendered *inside* the photograph or artwork itself, extract that.
Return your description as a raw string prompt suitable for an image generation model. Do NOT use JSON formatting or arrays.`,a=`Extract ONLY the image content from the screenshot below and describe it in high detail so it can be sent to an image generation model.
Ignore all the surrounding UI, text, and headers on the page.`,o="provider-6/llama-4-scout-17b-16e-instruct",l="provider-6/llama-4-maverick-17b-128e-instruct",c=async h=>{var x,g,m;const f=new AbortController,p=setTimeout(()=>f.abort(),4e3);try{const _=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({model:h,messages:[{role:"system",content:r},{role:"user",content:[{type:"text",text:a},{type:"image_url",image_url:{url:n}}]}]}),signal:f.signal});return clearTimeout(p),_.ok?{isRawText:!0,content:(m=(g=(x=(await _.json()).choices[0])==null?void 0:x.message)==null?void 0:g.content)==null?void 0:m.trim()}:null}catch{return clearTimeout(p),null}};let u=await c(o);return u||(console.log("VisionClient: Primary model failed or timed out. Falling back to maverick..."),u=await c(l)),u},async reverseEngineerImage(n){var d;if(!n)return null;const e=await ut.get("image_settings"),t=(d=e==null?void 0:e.providers)==null?void 0:d.a4f;if(!t||!t.apiKey)return console.warn("VisionClient: A4F API key not found in image settings for Reverse Engineering."),null;const i=t.apiKey,s="https://api.a4f.co/v1/chat/completions",r=`You are a world-class prompt engineer and professional photographer.
Your goal is to look at the main image within the user's screenshot and reverse-engineer it into the PERFECT highly-detailed text-to-image prompt.
Ignore all website navigation, text, or UI surrounding the image. Focus only on the photograph or artwork itself.

Return ONLY the raw prompt string. Do NOT format as JSON. Do NOT include introductory text like "Here is the prompt:".`,a=`Deduce the EXACT "Prompt Recipe" required to generate the main image visible in this screenshot.
If it is a photograph, specify: Camera gear, lens (e.g., 35mm), aperture (e.g., f/1.8), lighting setup (e.g., volumetric, softbox), subject details, background, and mood.
If it is artwork/3D, specify: Art style, rendering engine (e.g., Octane, Unreal Engine 5), artist influences, mood, and visual details.

Example Output format:
"Product shot of [item], shot on [camera], [lens], [aperture], [lighting], [background style], [resolution], [vibe keywords]"`,o="provider-6/llama-4-scout-17b-16e-instruct",l="provider-6/llama-4-maverick-17b-128e-instruct",c=async h=>{var x,g,m;const f=new AbortController,p=setTimeout(()=>f.abort(),8e3);try{const _=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({model:h,messages:[{role:"system",content:r},{role:"user",content:[{type:"text",text:a},{type:"image_url",image_url:{url:n}}]}]}),signal:f.signal});return clearTimeout(p),_.ok?(m=(g=(x=(await _.json()).choices[0])==null?void 0:x.message)==null?void 0:g.content)==null?void 0:m.trim():null}catch{return clearTimeout(p),null}};let u=await c(o);return u||(u=await c(l)),u}},Qb={composeFinalPrompt(n,e){if(!n)return e;if(n.isRawText&&n.content)return`=== EXTRACTED VISUAL DETAILS ===
${n.content}

=== USER PROMPT ===
${e}`;let t=`=== EXTRACTED VISUAL DETAILS ===
`;return n.image_subject&&(t+=`- Subject: ${n.image_subject}
`),n.text_inside_image&&(t+=`- Text to include: "${n.text_inside_image}"
`),n.visual_mood&&(t+=`- Mood: ${n.visual_mood}
`),n.lighting_style&&(t+=`- Lighting: ${n.lighting_style}
`),t+=`
=== USER PROMPT ===
${e}`,t}},eE=({isOpen:n,onClose:e,isImageMode:t,currentTextModel:i,currentImageModel:s,onModelSelect:r})=>{const[a,o]=z.useState([]),[l,c]=z.useState([]),[u,d]=z.useState(null);z.useEffect(()=>{f()},[t]);const h=(_,y)=>({openai:["gpt-5.2-pro","gpt-5.1","o3-pro","o1-preview","gpt-5","gpt-4.1-mini","gpt-4o","gpt-4-turbo-2024-04-09","gpt-4-0613","gpt-4-32k-0613","gpt-3.5-turbo-0125","gpt-3.5-turbo-instruct","davinci-002","babbage-002"],google:["gemini-3-pro","gemini-3-flash","gemini-2.5-pro","gemini-2.5-flash","gemini-2.0-flash-001","gemini-2.0-flash-lite","gemini-1.5-pro-001","gemini-1.5-flash-001","gemini-1.5-pro","gemini-1.5-flash","gemini-1.0-pro"],anthropic:["claude-opus-4.6","claude-sonnet-4.5","claude-haiku-4.5","claude-3-7-sonnet-20250219","claude-3-opus-20240229","claude-3-sonnet-20240229","claude-3-5-sonnet-20240620","claude-2.0","claude-2.1","claude-1.0","claude-instant-1.2"],xai:["grok-4.1","grok-4","grok-4-fast-reasoning","grok-2-vision-1212","grok-vision-beta","grok-3","grok-3-mini-beta","grok-2-1212","grok-1.5","grok-beta"],typegpt:["zai-org/GLM-4.6","deepseek-ai/DeepSeek-R1-0528","Qwen/Qwen3-235B-A22B-Thinking-2507","Qwen/Qwen3-235B-A22B-Instruct-2507","moonshotai/kimi-k2-instruct-0905","moonshotai/kimi-k2-thinking","moonshotai/kimi-k2-instruct","qwen/qwen3-coder-480b-a35b-instruct","deepseek-ai/deepseek-r1","deepseek-ai/deepseek-r1-0528","openai/gpt-oss-120b","openai/gpt-oss-20b","mistralai/mistral-large-3-675b-instruct-2512","deepseek-ai/deepseek-v3.1-terminus","deepseek-ai/deepseek-v3.1","mistralai/mistral-large","mistralai/mistral-small-24b-instruct","mistralai/magistral-small-2506","mistralai/mistral-small-3.1-24b-instruct-2503","mistralai/ministral-14b-instruct-2512","qwen/qwen3-next-80b-a3b-thinking","qwen/qwen3-next-80b-a3b-instruct"]})[_]||y||[],f=async()=>{if(t){const _=await ut.get("image_settings");if(_!=null&&_.providers){const y=Object.entries(_.providers).map(([w,A])=>({id:w,name:p(w),models:g(w),icon:x(w)}));c(y);const b=y.find(w=>w.models.some(A=>A.id===s));b&&d(b.id)}}else{const _=await ut.get("llm_providers");if(_){const y=_.map(w=>({...w,models:h(w.id,w.models)}));o(y);const b=y.find(w=>w.models.includes(i));b&&d(b.id)}}},p=_=>({openai:"OpenAI (DALL-E)",google:"Google (Imagen)",xai:"xAI (Grok)",a4f:"A4F",infip:"Infip.pro"})[_]||_,x=_=>_==="openai"?S.jsx(ic,{size:16}):_==="google"?S.jsx("span",{className:"text-xs font-bold",children:"G"}):_==="xai"?S.jsx(sc,{size:16}):_==="typegpt"||_==="a4f"?S.jsx(rc,{size:16}):_==="anthropic"?S.jsx(ac,{size:16}):S.jsx(Of,{size:16}),g=(_,y)=>({openai:[{id:"gpt-image-1.5",name:"GPT-Image 1.5"},{id:"dall-e-3",name:"DALL-E 3"},{id:"dall-e-2",name:"DALL-E 2"}],google:[{id:"gemini-3-pro",name:"Gemini 3 Pro"},{id:"imagen-3.0-generate-001",name:"Imagen 3"},{id:"gemini-2.5-flash",name:"Gemini Flash"}],xai:[{id:"grok-4",name:"Grok 4"},{id:"grok-2-image",name:"Grok 2 Image"}],a4f:[{id:"provider-4/imagen-4",name:"Imagen 4"},{id:"provider-4/flux-schnell",name:"Flux Schnell"},{id:"provider-4/imagen-3.5",name:"Imagen 3.5"},{id:"provider-4/sdxl-lite",name:"SDXL Lite"},{id:"provider-4/z-image-turbo",name:"Z-Image Turbo"},{id:"provider-4/flux-2-klein-4b",name:"Flux 2 Klein 4B"},{id:"provider-4/flux-2-klein-9b",name:"Flux 2 Klein 9B"},{id:"provider-4/phoenix",name:"Phoenix"},{id:"provider-4/flux-2-dev",name:"Flux 2 Dev"}],infip:[{id:"z-image-turbo",name:"Z-Image Turbo ★"},{id:"nano-banana",name:"Nano Banana ★"},{id:"img3",name:"Img3 (x4)"},{id:"qwen",name:"Qwen (x4)"},{id:"lucid-origin",name:"Lucid Origin (x4)"},{id:"phoenix",name:"Phoenix (x4)"},{id:"sdxl",name:"SDXL (x4)"},{id:"sdxl-lite",name:"SDXL Lite (x4)"},{id:"img4",name:"Image 4"},{id:"flux-schnell",name:"Flux Schnell"}]})[_]||[],m=t?l:a;return n?S.jsxs("div",{className:"absolute bottom-16 left-2 z-50 w-64 bg-black/90 border border-neon-cyan/30 rounded-lg backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-bottom-2",children:[S.jsxs("div",{className:"p-2 bg-white/5 border-b border-white/10 flex items-center justify-between",children:[S.jsx("span",{className:"text-xs font-mono text-neon-cyan font-bold uppercase",children:t?"Image Models":"LLM Models"}),S.jsx("button",{onClick:e,className:"text-gray-400 hover:text-white",children:S.jsx(sc,{size:14})})]}),S.jsxs("div",{className:"max-h-60 overflow-y-auto custom-scrollbar",children:[m.map(_=>{const y=u===_.id,b=_.models;return S.jsxs("div",{className:"border-b border-white/5 last:border-0",children:[S.jsxs("button",{onClick:()=>d(y?null:_.id),className:`w-full flex items-center justify-between p-2 text-sm hover:bg-white/5 transition-colors ${y?"text-white":"text-gray-400"}`,children:[S.jsxs("div",{className:"flex items-center gap-2",children:[S.jsx("span",{className:y?"text-neon-cyan":"",children:t?x(_.id):_.icon==="Sparkles"?S.jsx(ic,{size:14}):_.icon==="Zap"?S.jsx(ac,{size:14}):S.jsx(rc,{size:14})}),S.jsx("span",{children:_.name})]}),y?S.jsx(Bf,{size:14}):S.jsx(Vf,{size:14})]}),y&&S.jsx("div",{className:"bg-black/40",children:b.map(w=>{const A=typeof w=="string"?w:w.id,R=typeof w=="string"?w:w.name,L=t?s===A:i===A;return S.jsxs("button",{onClick:()=>{r(_.id,A),e()},className:`w-full text-left px-8 py-1.5 text-xs flex items-center justify-between hover:bg-neon-cyan/10 transition-colors ${L?"text-neon-cyan":"text-gray-400"}`,children:[S.jsx("span",{className:"truncate pr-2",children:R}),L&&S.jsx(kf,{size:12})]},A)})})]},_.id)}),m.length===0&&S.jsxs("div",{className:"p-4 text-center text-xs text-gray-500",children:["No enabled providers found.",S.jsx("br",{}),"Check Settings."]})]})]}):null},dE=()=>{const[n,e]=z.useState(null),[t,i]=z.useState(!0),[s,r]=z.useState(!1),[a,o]=z.useState("gpt-4-turbo"),[l,c]=z.useState("dall-e-3");z.useEffect(()=>{(async()=>{var Xe,He;const J=await ut.get("model_settings");J!=null&&J.plannerModel&&o(J.plannerModel);const ie=await ut.get("image_settings");if(ie!=null&&ie.activeProvider){const _t=ie.activeProvider,at=(He=(Xe=ie.providers)==null?void 0:Xe[_t])==null?void 0:He.model;at&&c(at)}})()},[]);const u=async(j,J)=>{if(te){c(J);const ie=await ut.get("image_settings")||{};ie.providers||(ie.providers={}),ie.activeProvider=j,ie.providers[j]||(ie.providers[j]={}),ie.providers[j].model=J,await ut.set("image_settings",ie)}else{o(J);const ie=await ut.get("model_settings")||{};ie.plannerModel=J,ie.navigatorModel=J,ie.validatorModel=J,await ut.set("model_settings",ie)}},[d,h]=z.useState(!1),[f,p]=z.useState("idle"),[x,g]=z.useState(""),[m,_]=z.useState(0),[y,b]=z.useState(null),[w,A]=z.useState([]),[R,L]=z.useState([]),[M,E]=z.useState(null),[D,F]=z.useState([]),[O,G]=z.useState(!1),[q,k]=z.useState(""),[X,Z]=z.useState([]),[ce,ue]=z.useState(!1),[te,Pe]=z.useState(!1),[De,Qe]=z.useState(!1),[it,$]=z.useState("idle"),[ne,_e]=z.useState(""),[Oe,pe]=z.useState([]),[le,qe]=z.useState("en-US"),Re=z.useRef(""),Le=z.useRef(!1),[ze,Fe]=z.useState(75),[et,P]=z.useState(12),je=z.useRef(null),Be=z.useRef(null);z.useEffect(()=>{oc.auth.getSession().then(({data:{session:J}})=>{e(J),i(!1)});const{data:{subscription:j}}=oc.auth.onAuthStateChange((J,ie)=>{e(ie)});return()=>j.unsubscribe()},[]);const rt=z.useCallback(async()=>{const j=await ut.get("conversations_index",[]);return L(j),j},[]);z.useEffect(()=>{if(!n)return;(async()=>{const J=await rt(),ie=await ut.get("last_active_conversation_id"),Xe=sessionStorage.getItem("nova_session_active"),He=J.some(_t=>_t.id===ie);if(Xe&&ie&&He)b(ie);else if(!y){const _t=`conv-${Date.now()}`;b(_t),sessionStorage.setItem("nova_session_active","true")}})()},[n,rt]),z.useEffect(()=>{y&&(ut.set("last_active_conversation_id",y),(async()=>{const J=await ut.get(`conversation_${y}`,[]);A(J)})())},[y]);const be=z.useCallback(async(j,J)=>{var cn,un,Bn;if(!j||J.length===0)return;const ie=await ut.get("conversations_index",[]),Xe=ie.filter(Kt=>Kt.id!==j);let He="New Conversation";const _t=ie.find(Kt=>Kt.id===j),at=J.some(Kt=>Kt.isVoice);if(_t&&_t.title!=="New Conversation")He=_t.title;else{const Kt=J.filter(Jt=>Jt.sender==="user"),Zt=J.filter(Jt=>Jt.sender==="agent");if(Kt.length>=1&&Zt.length>=1){try{const xi=J.slice(0,4).map(T=>({role:T.sender==="user"?"user":"assistant",content:T.message}));chrome.runtime.sendMessage({type:"GENERATE_TITLE",messages:xi},T=>{T!=null&&T.title&&ut.get("conversations_index",[]).then(U=>{const W=U.map(H=>H.id===j?{...H,title:T.title}:H);ut.set("conversations_index",W),L(W)})})}catch{}const Jt=Kt[0];He=Jt.message.slice(0,35)+(Jt.message.length>35?"...":"")}else{const Jt=Kt[0];Jt&&(He=Jt.message.slice(0,35)+(Jt.message.length>35?"...":""))}}const vn=[{id:j,title:He,lastMessage:(cn=J[J.length-1])==null?void 0:cn.message,timestamp:new Date().toISOString(),messageCount:J.length,preview:(Bn=(un=J[J.length-1])==null?void 0:un.message)==null?void 0:Bn.slice(0,100),hasVoiceMessages:at},...Xe];await ut.set("conversations_index",vn),L(vn)},[]);z.useEffect(()=>{w.length>0&&y&&(ut.set(`conversation_${y}`,w),be(y,w))},[w,y,be]),z.useEffect(()=>{(async()=>{const J=await ut.get("conversations_index",[]);L(J)})()},[w]);const C=()=>{var j;je!=null&&je.current&&(je.current.scrollTop=(j=je==null?void 0:je.current)==null?void 0:j.scrollHeight)};z.useEffect(()=>{C()},[w,M,f]),z.useEffect(()=>{if(typeof chrome<"u"&&chrome.runtime){const j=J=>{if(J.type==="AGENT_PROGRESS"){const{status:ie,message:Xe,result:He,plan:_t}=J.data;if(ie==="thinking"?(p("thinking"),g(Xe)):ie==="planning"?(p("planning"),g(Xe),_(25)):ie==="waiting_approval"?(p("waiting_approval"),g("Waiting for plan approval"),A(at=>[...at,{id:Date.now(),sender:"system",type:"plan_review",plan:_t,timestamp:new Date}])):ie==="navigating"?(p("navigating"),g(Xe),_(50)):ie==="validating"?(p("validating"),g(Xe),_(85)):ie==="generating_image"?(p("generating_image"),g(Xe),_(60)):(ie==="idle"||ie==="completed")&&(p("idle"),g(""),_(100),ie==="completed"&&Fe(at=>Math.min(at+15,100))),["planning","navigating","validating","generating_image","thinking"].includes(ie)){const at=J.data.logEntry||{type:ie==="navigating"?"navigate":ie==="thinking"?"think":ie==="planning"?"plan":ie==="generating_image"?"image":"validate",message:Xe,url:J.data.url||"",timestamp:new Date().toLocaleTimeString()};F(Dt=>[...Dt,at]),E(Dt=>({agentType:ie,activity:Xe,progress:ie==="planning"?25:ie==="navigating"?50:ie==="generating_image"?60:ie==="thinking"?35:90,status:"active",details:Dt?[...Dt.details||[],Xe]:[Xe]}))}if((ie==="idle"||ie==="completed")&&He){let at=He.summary||He.message||"Task completed successfully";if(He.images&&He.images.length>0){const cn=He.images.map(un=>`![Generated Image](${typeof un=="object"?un.url||un.image_url||un.data:un})`).join(`

`);at=`${at}

${cn}`}const Dt=He.images&&He.images.length>0&&typeof He.images[0]=="object"?He.images[0].model||He.images[0].provider:null,vn={id:Date.now()+1,sender:"agent",message:at,timestamp:new Date,agentStatus:null,metadata:{imageModel:Dt},images:He.images,taskSummary:He.taskSummary||null,logs:[...D],isShopping:He.isShopping||!1,products:He.products||[],winnerProduct:He.winnerProduct||null,winnerUrl:He.winnerUrl||null,needsProceed:He.needsProceed||!1};A(cn=>[...cn,vn]),E(null),F([]),p("idle"),_(0)}else if(ie==="error"){const at={id:Date.now()+1,sender:"system",message:"❌ Task Failed",timestamp:new Date,agentStatus:null,metadata:{type:"error",errorDetails:Xe||"An unknown error occurred."}};A(Dt=>[...Dt,at]),E(null),F([]),p("idle"),_(0)}}};return chrome.runtime.onMessage.addListener(j),()=>chrome.runtime.onMessage.removeListener(j)}},[]);const[v,N]=z.useState(!1),[K,Q]=z.useState(!1),[Y,we]=z.useState(!1),[de,Ee]=z.useState(!1),Ie=z.useRef(null),se=z.useRef(""),fe=async()=>{if(!("webkitSpeechRecognition"in window)){alert("Speech recognition not supported");return}try{await navigator.mediaDevices.getUserMedia({audio:!0});const j=new window.webkitSpeechRecognition;j.continuous=!0,j.interimResults=!0,se.current=q,j.onresult=J=>{let ie="",Xe="";for(let at=J.resultIndex;at<J.results.length;++at)J.results[at].isFinal?Xe+=J.results[at][0].transcript:ie+=J.results[at][0].transcript;let He="";for(let at=0;at<J.results.length;++at)He+=J.results[at][0].transcript;const _t=se.current.length>0?" ":"";k(se.current+_t+He)},j.onerror=J=>{console.error("Speech Error: "+J.error),Me(),J.error==="not-allowed"&&alert("Microphone permission denied.")},Ie.current=j,j.start(),we(!0)}catch(j){console.error("Failed to start recording",j),we(!1)}},Me=()=>{Ie.current&&(Ie.current.stop(),Ie.current=null),we(!1)},Ae=()=>{Y?Me():fe()},he=()=>{if(De){Ye();return}Qe(!0),pe([]),_e(""),Re.current="",Le.current=!1,Ci.setLanguage(le);try{Ci.startVoiceMode((j,J)=>{_e(j),Re.current=j},j=>{if($(j),j==="processing"&&Re.current.trim()&&!Le.current){Le.current=!0;const J=Re.current.trim();_e(""),Re.current="",pe(Xe=>[...Xe,{sender:"user",message:J}]);const ie={id:Date.now(),sender:"user",message:J,timestamp:new Date,isVoice:!0};A(Xe=>[...Xe,ie]),chrome.runtime.sendMessage({type:"PROCESS_VOICE_COMMAND",prompt:J,history:w.slice(-6)},Xe=>{if(Le.current=!1,Xe&&Xe.message){pe(_t=>[..._t,{sender:"nova",message:Xe.message}]);const He={id:Date.now()+1,sender:"agent",message:Xe.message,timestamp:new Date,isVoice:!0};A(_t=>[..._t,He]),Ci.speak(Xe.message)}})}})}catch(j){console.error("[VoiceMode] Failed to start:",j)}},Ye=()=>{try{Ci.stopVoiceMode()}catch(j){console.error(j)}try{window.speechSynthesis.cancel()}catch{}Qe(!1),$("idle"),_e(""),pe([])},[I,ge]=z.useState(!1),oe=async()=>{I?(ge(!1),fd.stopDetection(),Ci.resume(),$("listening"),pe(j=>[...j,{sender:"nova",message:"Song detection stopped. I'm listening to you again."}])):(ge(!0),Ci.pause(),$("processing"),pe(j=>[...j,{sender:"nova",message:"🎵 Global Song Search ACTIVATED. I'll keep listening until I catch a song..."}]),fd.startContinuousDetection(le,j=>{pe(J=>[...J,{sender:"nova",message:`🎵 MATCH FOUND: "${j.title}" by ${j.artist}!`}]),ae({text:`Found song: "${j.title}" by ${j.artist}". Tell me about it.`})},j=>{},j=>{_e(`🎵 ${j}`)}))},ye=async()=>{if(!await pd.checkLimits()){alert("Vision rate limit reached. Please try again later.");return}E({agentType:"thinking",activity:"Reverse engineering image...",progress:50,status:"active",details:["Capturing screen for analysis..."]});try{const J=await Or.captureAndProcessScreenshot();if(!J)throw new Error("Failed to capture screen or no image found.");E({agentType:"thinking",activity:"Analyzing visual elements...",progress:80,status:"active",details:["Extracting camera settings, lighting, and style..."]});const ie=await Or.reverseEngineerImage(J);if(ie)k(ie),A(Xe=>[...Xe,{id:Date.now(),sender:"system",message:`✨ **Prompt Recipe Extracted!**

I have analyzed the screen and populated the chat input with the generative recipe. You can tweak it or send it to generate your image.`,timestamp:new Date}]);else throw new Error("Failed to extract prompt recipe.")}catch(J){console.error(J),A(ie=>[...ie,{id:Date.now(),sender:"system",message:"❌ I can't see any photo from the page to extract visuals.",timestamp:new Date}])}finally{E(null),p("idle")}},re=async j=>{A(J=>[...J,{id:Date.now(),sender:"user",message:"Please add this product to my cart.",timestamp:new Date}]),E({agentType:"shopping",status:"active"}),p("Navigating to store to scan cart options...");try{const J=await chrome.runtime.sendMessage({type:"START_CART_AUTOMATION",url:j});if(E(null),p("idle"),J&&J.message)A(ie=>[...ie,{id:Date.now()+1,sender:"agent",message:J.message,timestamp:new Date}]);else throw new Error("Automation failed")}catch{E(null),p("idle"),A(ie=>[...ie,{id:Date.now()+1,sender:"system",message:"❌ Failed to start cart automation. Check if the store loaded correctly.",timestamp:new Date}])}},ee=async(j,J)=>{A(ie=>[...ie,{id:Date.now(),sender:"user",message:`Compare prices for ${J}`,timestamp:new Date}]),E({agentType:"shopping",status:"active"}),p(`Opening Flash.co and comparing prices for ${J}...`);try{const ie=await chrome.runtime.sendMessage({type:"FLASH_COMPARE",url:j,name:J});if(E(null),p("idle"),ie&&ie.message)A(Xe=>[...Xe,{id:Date.now()+1,sender:"agent",message:ie.message,timestamp:new Date}]);else throw new Error("Comparison failed")}catch{E(null),p("idle"),A(Xe=>[...Xe,{id:Date.now()+1,sender:"system",message:"❌ Comparison Error: Extension connection dropped or timed out.",timestamp:new Date}])}},ae=async({text:j,attachments:J,modeOverrides:ie=null})=>{const Xe=Y,He={id:Date.now(),sender:"user",message:j,timestamp:new Date,attachments:(J==null?void 0:J.map(Zt=>({name:Zt.name,type:Zt.type,size:Zt.size})))||[],isVoice:Xe};A(Zt=>[...Zt,He]),k(""),Z([]);const _t=ie?ie.isAgentic:O,at=ie?ie.isWebSearch:v,Dt=ie?ie.isShopping:K,vn=ie?ie.isImage:te,{textContent:cn,imageDataUrls:un}=await lc.read(J),Bn=cn?`${j}

[Attached Content]:
${cn}`:j,Kt=w.slice(-10).map(Zt=>({role:Zt.sender==="user"?"user":"assistant",content:Zt.message}));if(typeof chrome<"u"&&chrome.runtime){if(!(await ut.get("llm_providers",[])).some(T=>T.isEnabled&&T.apiKey&&T.apiKey.trim().length>0)){A(T=>[...T,{id:Date.now(),sender:"system",message:`⚠️ **Missing API Key**

Please go to **Settings** (⚙️) and configure an LLM Provider (e.g., TypeGPT, OpenAI) to start chatting.`,timestamp:new Date}]),p("idle");return}if(vn&&(at||Dt||_t)){alert("Please turn off Agent Modes (Web, Shopping, Agent) to use Image Generation.");return}let xi=Bn;if(vn&&Jb.shouldTrigger(Bn,!0)&&await pd.checkLimits()){E({agentType:"thinking",activity:"Analyzing page visuals...",progress:20,status:"active",details:["Extracting visual references from current tab..."]});const U=await Or.captureAndProcessScreenshot();if(U){const W=await Or.analyzeScreenshot(U);W&&(xi=Qb.composeFinalPrompt(W,Bn))}}chrome.runtime.sendMessage({type:"START_AGENT_TASK",prompt:xi,history:Kt,imageAttachments:un||[],isAgentic:_t,isWebSearchEnabled:at,isShoppingMode:Dt,isImageGen:vn}),p("thinking")}},Ge=()=>{chrome.runtime.sendMessage({type:"APPROVE_PLAN"}),p("navigating")},ft=()=>{chrome.runtime.sendMessage({type:"REJECT_PLAN"}),p("idle"),A(j=>[...j,{id:Date.now(),sender:"system",message:"Plan rejected.",timestamp:new Date}])},ct=async j=>{const J=R.filter(ie=>ie.id!==j);if(L(J),await ut.set("conversations_index",J),await ut.remove(`conversation_${j}`),j===y)if(J.length>0)b(J[0].id);else{const ie=`conv-${Date.now()}`;b(ie)}},ln=()=>{chrome.runtime.sendMessage({type:"STOP_AGENT_TASK"}),p("idle"),E(null),A(j=>[...j,{id:Date.now(),sender:"system",message:"🛑 Task stopped by user.",timestamp:new Date}])},_n=async()=>{try{const j=await ut.get("conversations_index",[]);for(const ie of j)await ut.remove(`conversation_${ie.id}`);await ut.set("conversations_index",[]),await ut.remove("last_active_conversation_id"),L([]),A([]);const J=`conv-${Date.now()}`;b(J)}catch(j){console.error("Clear all failed",j)}},or=z.useCallback(()=>{A([]);const j=`conv-${Date.now()}`;b(j),E(null),p("idle"),L(J=>[{id:j,title:"New Conversation",timestamp:new Date().toISOString()},...J])},[]),lr=j=>{b(j),h(!1)},Ts=j=>{let J=null;for(let ie=j;ie>=0;ie--)if(w[ie]&&w[ie].sender==="user"){J=w[ie];break}J&&ae({text:J.message,attachments:J.attachments||[]})},xa=j=>{j&&ae({text:j,attachments:[]})},cr=async()=>{if(!(!q||q.trim().length===0)){Ee(!0);try{const j=await chrome.runtime.sendMessage({type:"ENHANCE_PROMPT",prompt:q});j&&j.enhancedPrompt&&k(j.enhancedPrompt)}catch(j){console.error("Enhancement failed",j)}finally{Ee(!1)}}};return t?S.jsx("div",{className:"h-full bg-black flex items-center justify-center text-neon-cyan font-mono animate-pulse",children:"SYSTEM INITIALIZING..."}):S.jsxs(S.Fragment,{children:[De&&Mf.createPortal(S.jsx(qb,{isOpen:De,onClose:Ye,status:it,transcript:ne,messages:Oe,currentLang:le,onLanguageChange:j=>{qe(j),Ci.setLanguage(j)},isSongMode:I,onToggleSongMode:oe}),document.body),S.jsx(Wf,{level:et,xp:ze,onToggleSidebar:()=>h(!d),onNewChat:or,children:S.jsxs("div",{className:"flex-1 flex flex-col h-full overflow-hidden relative text-[110%]",children:[S.jsx("div",{ref:je,className:"flex-1 overflow-y-auto px-1 py-4 scroll-smooth",children:S.jsxs("div",{className:"max-w-4xl mx-auto pb-4 min-h-full flex flex-col justify-end",children:[w.length===0&&S.jsxs("div",{className:"flex-1 flex flex-col justify-center items-center opacity-70",children:[S.jsx("div",{className:"text-neon-cyan font-heading text-2xl tracking-[0.3em] animate-pulse drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] opacity-100 font-bold relative text-center",children:"SYSTEM ONLINE"}),te&&S.jsxs("div",{className:"mt-8 flex flex-col items-center gap-3 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500",children:[S.jsxs("div",{className:"w-full bg-white/5 border border-white/10 p-3 rounded-lg mb-2 text-center text-[10px] text-white/70",children:[S.jsx("span",{className:"opacity-100",children:"💡"})," ",S.jsx("strong",{children:"Vision Guide:"})," If generating from a reference photo on screen, please keep the page steady and ensure the image is fully visible."]}),S.jsxs("div",{className:"w-full bg-neon-cyan/5 border border-neon-cyan/20 p-3 rounded-lg border-l-2 border-l-neon-cyan mb-2 text-left text-[10px] text-white/80 transition-all hover:bg-neon-cyan/10 flex flex-col gap-1",children:[S.jsxs("div",{className:"font-bold flex items-center gap-1",children:[S.jsx("span",{className:"text-[12px]",children:"ℹ️"})," Free Tier API Rate Limits"]}),S.jsxs("div",{className:"pl-4 font-mono space-y-1 mt-1 text-white/60",children:[S.jsxs("div",{children:["• ",S.jsx("span",{className:"text-neon-cyan",children:"provider-6/llama-4-scout-17b-16e-instruct"}),":",S.jsx("br",{}),"  ",S.jsx("b",{children:"64 reqs/day"})]}),S.jsxs("div",{children:["• ",S.jsx("span",{className:"text-neon-cyan",children:"provider-6/llama-4-maverick-17b-128e-instruct"}),":",S.jsx("br",{}),"  ",S.jsx("b",{children:"26 reqs/day"})]})]})]}),S.jsx("h3",{className:"text-neon-magenta text-xs font-mono mb-2 tracking-widest uppercase opacity-80",children:"Pre-Prompts"}),S.jsx("button",{onClick:()=>ae({text:"Generate a futuristic neon city skyline at night",attachments:[]}),className:"w-full text-sm text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-magenta/50 rounded-xl transition-all shadow-sm hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] text-white/90",children:"🌆 Futuristic neon city skyline at night"}),S.jsx("button",{onClick:()=>ae({text:"Create a highly detailed 3D render of a cute astronaut cat",attachments:[]}),className:"w-full text-sm text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-magenta/50 rounded-xl transition-all shadow-sm hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] text-white/90",children:"🐱 Detailed 3D render of a cute astronaut cat"}),S.jsx("button",{onClick:()=>ae({text:"A cinematic wide shot of a mythical forest with glowing plants",attachments:[]}),className:"w-full text-sm text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-magenta/50 rounded-xl transition-all shadow-sm hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] text-white/90",children:"🌲 Cinematic wide shot of a mythical forest"})]})]}),w.map(j=>S.jsx("div",{className:"mb-2 w-full",children:j.type==="plan_review"?S.jsx(Oh,{plan:j.plan,onApprove:Ge,onReject:ft}):S.jsxs(S.Fragment,{children:[S.jsx(hx,{message:{role:j.sender==="user"?"user":"assistant",content:j.message,timestamp:j.timestamp,isVoice:j.isVoice||!1,attachments:j.attachments||[],metadata:j.agentStatus?{type:"agent_activity",activity:j.agentStatus,status:"active"}:void 0},isLast:!0,onRetry:()=>Ts(w.indexOf(j)),onEdit:J=>xa(J),onRemix:J=>{Pe(!0),G(!1),N(!1),Q(!1),ae({text:J,attachments:[]})}}),j.needsProceed&&!j.shoppingActionTaken&&S.jsx("div",{className:"mt-2 ml-4 mb-4",children:S.jsxs("button",{onClick:()=>{ae({text:"PROCEED_TO_WEB_SEARCH",attachments:[],modeOverrides:{isWebSearch:!1,isShopping:!0,isAgentic:!1,isImage:!1}}),A(J=>J.map(ie=>ie.id===j.id?{...ie,shoppingActionTaken:!0}:ie))},className:"px-4 py-2 bg-neon-cyan/10 hover:bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30 rounded font-mono text-[11px] shadow-sm transition-all flex items-center gap-2",children:[S.jsx("span",{children:"🌐"})," Ready to proceed for web search?"]})}),j.logs&&j.logs.length>0&&S.jsx(co,{logs:j.logs,status:"completed",isExpanded:!1,estimatedTime:0}),j.isShopping&&S.jsx(Zb,{products:j.products,winnerProduct:j.winnerProduct,winnerUrl:j.winnerUrl,onAddToCart:J=>re(J||j.winnerUrl),onCompare:(J,ie)=>ee(J||j.winnerUrl,ie||j.winnerProduct)})]})},j.id)),M&&S.jsx("div",{className:"mb-6",children:te?S.jsx(Kb,{status:M.status,currentMessage:M.activity||"Generating Image..."}):!O&&!v&&!K&&M.agentType==="thinking"||K&&M.activity==="Analyzing user constraints..."?S.jsx(co,{logs:D,status:"thinking",isExpanded:!0,estimatedTime:15}):S.jsx(co,{logs:D,status:M.status,isExpanded:!0,estimatedTime:120})})]})}),S.jsxs("div",{className:"flex-shrink-0 pt-2 pb-1 relative z-30",children:[S.jsx($b,{isOpen:ce,onClose:()=>ue(!1),onFileUpload:()=>{var j;return(j=Be.current)==null?void 0:j.click()},isImageGenEnabled:te,toggleImageGen:()=>{if(!n)return alert("Please Log In.");Pe(j=>!j),N(!1),Q(!1),G(!1)},isWebSearchEnabled:v,toggleWebSearch:()=>{if(!n)return alert("Please Log In.");N(j=>!j),Pe(!1),Q(!1),G(!1)},isShoppingMode:K,toggleShopping:()=>{if(!n)return alert("Please Log In.");Q(j=>!j),Pe(!1),N(!1),G(!1)},isAgenticMode:O,toggleAgentic:()=>{if(!n)return alert("Please Log In.");G(j=>!j),Pe(!1),N(!1),Q(!1)}}),S.jsx("input",{type:"file",multiple:!0,ref:Be,className:"hidden",accept:"image/*,video/*,.pdf,.doc,.docx,.txt,.md,.json,.csv,.xlsx,.xls,.js,.jsx,.ts,.tsx,.py,.html,.css,.xml,.yaml,.yml,.log,.sh,.bat,.c,.cpp,.java,.rb,.go,.rs,.swift,.kt",onChange:j=>{var J;if((J=j.target.files)!=null&&J.length){const Xe=Array.from(j.target.files).map(He=>({name:He.name,type:lc.categorizeFile(He),size:He.size,file:He}));Z(He=>[...He,...Xe]),j.target.value=""}}}),S.jsxs("div",{className:"flex gap-2 mb-2 px-2 overflow-x-auto no-scrollbar",children:[te&&S.jsx("span",{className:"text-[9px] font-mono px-2 py-0.5 rounded border border-neon-blue text-neon-blue bg-neon-blue/10",children:"IMG GEN"}),v&&S.jsx("span",{className:"text-[9px] font-mono px-2 py-0.5 rounded border border-neon-cyan text-neon-cyan bg-neon-cyan/10",children:"WEB SEARCH"}),K&&S.jsx("span",{className:"text-[9px] font-mono px-2 py-0.5 rounded border border-neon-magenta text-neon-magenta bg-neon-magenta/10",children:"SHOPPING"}),O&&S.jsx("span",{className:"text-[9px] font-mono px-2 py-0.5 rounded border border-neon-violet text-neon-violet bg-neon-violet/10",children:"AGENTIC"})]}),S.jsxs("div",{className:"relative px-2 mb-1 flex justify-between items-center w-full",children:[S.jsxs("div",{className:"flex items-center",children:[S.jsx(eE,{isOpen:s,onClose:()=>r(!1),isImageMode:te,currentTextModel:a,currentImageModel:l,onModelSelect:u}),S.jsxs("button",{onClick:()=>r(!s),className:"flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 border border-white/5 text-[10px] font-mono text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all backdrop-blur-sm",children:[S.jsx("span",{className:`w-1.5 h-1.5 rounded-full ${te?"bg-neon-magenta shadow-[0_0_5px_#f0f]":"bg-neon-cyan shadow-[0_0_5px_#0ff]"}`}),S.jsx("span",{className:"truncate max-w-[150px]",children:te?l||"Default Image":a||"Default Model"}),S.jsx(zf,{size:10,className:`transition-transform ${s?"rotate-180":""}`})]})]}),te&&S.jsxs("button",{onClick:ye,title:"Reverse Engineering analyzes an image on your screen and extracts a detailed generative prompt (recipes like camera gear, style, subject) that you can use to recreate it.",className:"text-[10px] px-2 py-1 bg-neon-cyan/10 hover:bg-neon-cyan/30 border border-neon-cyan/50 text-neon-cyan rounded transition-all shadow-sm flex items-center gap-1 group ml-2",children:[S.jsx("span",{children:"🔍"}),S.jsx("span",{className:"font-bold tracking-wide",children:"Rev Eng Screen"})]}),S.jsxs("button",{onClick:he,title:"Open Voice Agent (multilingual voice assistant)",className:`text-[10px] px-2 py-1 rounded transition-all shadow-sm flex items-center gap-1 ml-auto ${De?"bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400":"bg-neon-magenta/10 hover:bg-neon-magenta/30 border border-neon-magenta/50 text-neon-magenta"}`,children:[S.jsx("span",{children:"🎙️"}),S.jsx("span",{className:"font-bold tracking-wide",children:De?"Close Voice":"Voice Agent"})]})]}),S.jsx(fx,{onSendMessage:ae,disabled:f!=="idle",value:q,onChange:k,onVoiceToggle:Ae,isRecording:Y,onEnhance:cr,isEnhancing:de,attachments:X,onAddAttachments:j=>Z(J=>[...J,...j]),onRemoveAttachment:j=>Z(J=>J.filter((ie,Xe)=>Xe!==j)),isProcessing:f!=="idle",onStop:ln,onPlusClick:()=>ue(!ce)})]}),S.jsx(Xf,{isOpen:d,onToggle:()=>h(!d),conversations:R,activeConversationId:y,onSelectConversation:lr,onNewConversation:or,onDeleteConversation:ct,onClearAll:_n})]})})]})};export{dE as default};
