let overlayRoot = null;
let overlays = [];
let enabled = false;

const ROOT_ID = "__rockett_dom_overlay__";

function createRoot() {
    if (overlayRoot) return overlayRoot;
    overlayRoot = document.createElement("div");
    overlayRoot.id = ROOT_ID;
    overlayRoot.style.position = "fixed";
    overlayRoot.style.inset = "0";
    overlayRoot.style.pointerEvents = "none";
    overlayRoot.style.zIndex = "2147483647";
    document.documentElement.appendChild(overlayRoot);
    return overlayRoot;
}

function clear() {
    overlays.forEach(o => o.remove());
    overlays = [];
}

function isVisible(el) {
    const r = el.getBoundingClientRect();
    return (
        r.width >= 10 &&
        r.height >= 10 &&
        r.bottom > 0 &&
        r.right > 0 &&
        r.top < innerHeight &&
        r.left < innerWidth
    );
}

function colorFor(id) {
    const hue = (id * 47) % 360;
    return {
        border: `hsl(${hue},90%,45%)`,
        bg: `hsla(${hue},90%,50%,0.08)`
    };
}

function drawBox(id, rect) {
    const { border, bg } = colorFor(id);

    const box = document.createElement("div");
    box.style.position = "absolute";
    box.style.left = rect.left + "px";
    box.style.top = rect.top + "px";
    box.style.width = rect.width + "px";
    box.style.height = rect.height + "px";
    box.style.border = `2px solid ${border}`;
    box.style.background = bg;
    box.style.borderRadius = "4px";
    box.style.boxSizing = "border-box";

    const badge = document.createElement("div");
    badge.textContent = id;
    badge.style.position = "absolute";
    badge.style.top = "-14px";
    badge.style.left = "-14px";
    badge.style.width = "22px";
    badge.style.height = "22px";
    badge.style.borderRadius = "50%";
    badge.style.background = border;
    badge.style.color = "#fff";
    badge.style.font = "bold 11px monospace";
    badge.style.display = "flex";
    badge.style.alignItems = "center";
    badge.style.justifyContent = "center";

    box.appendChild(badge);
    overlayRoot.appendChild(box);
    overlays.push(box);
}

function scan() {
    if (!enabled) return;

    clear();
    createRoot();

    const nodes = document.querySelectorAll('[data-rockett-id]');

    nodes.forEach(el => {
        if (!isVisible(el)) return;
        const id = el.getAttribute('data-rockett-id');
        drawBox(id, el.getBoundingClientRect());
    });
}

let raf = null;
function schedule() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(scan);
}

export function enableDomOverlay() {
    if (enabled) return;
    enabled = true;
    scan();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
}

export function disableDomOverlay() {
    enabled = false;
    clear();
    overlayRoot?.remove();
    overlayRoot = null;
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
}
