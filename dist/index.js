/*
 * reels — shoppable reels for a store: a strip of video cards on the page,
 * each card a group of clips, each clip with its own product.
 *
 *   <section data-pg-reels>
 *       <button data-pg-reels-prev aria-controls="strip">‹</button>
 *       <div data-pg-reels-strip id="strip">
 *           <article data-pg-reels-group>
 *               <div data-pg-reels-card>               the 9:16 card
 *                   <figure data-pg-reels-clip>        a clip: a video…
 *                       <video src="a.mp4" poster="a.jpg" muted playsinline preload="none"></video>
 *                   </figure>
 *                   <figure data-pg-reels-clip data-pg-reels-duration="5s">
 *                       <img src="b.jpg" alt="" />      …or a picture, for a while
 *                   </figure>
 *                   <button data-pg-reels-sound aria-pressed="false">…</button>
 *                   <button data-pg-reels-open>…</button>
 *               </div>
 *               <div data-pg-reels-bars></div>          filled here: a bar per clip
 *               <div data-pg-reels-products>            one per clip, in order
 *                   <a data-pg-reels-product href="/a">…</a>
 *                   <a data-pg-reels-product href="/b">…</a>
 *               </div>
 *           </article>
 *       </div>
 *       <button data-pg-reels-next aria-controls="strip">›</button>
 *   </section>
 *
 * On the page: every card in sight plays, muted until its sound button is
 * pressed (sound is one card's alone: another card's button pressed gives
 * it to that card; the card going out of sight takes it away) — its clips
 * one after another, round and round, as stories do, a picture for its
 * data-pg-reels-duration;
 * the bars under it fill as each plays. A bar pressed is that clip at
 * once. The clip playing shows its product: the products under the card
 * are one per clip, and only the playing one's shows. So with view
 * counts: one data-pg-reels-views a clip, in order, and only the playing
 * clip's shows — or one for the whole group, always shown. The others wait
 * on their posters. Out of sight, nothing plays.
 *
 * The strip scrolls sideways — a finger, a wheel, its arrows; it never
 * moves by itself. data-pg-reels-start / -end on the section while it
 * stands at either end (the arrows' to hide or dim).
 *
 * A card pressed — anywhere but its own buttons and links — or its
 * data-pg-reels-open: the full view opens on that group and clip. First
 * the event pg-reels:open on the section (detail: group, clip); a site
 * that calls preventDefault() on it opens its own.
 *
 * The full view — a <dialog>, built here on <body>, its contents copies:
 * the clip playing, the group's data-pg-reels-head, the clip's product.
 * Within a group: the bars on top, a press on the video's right or left,
 * the ‹ › on either side of the video and its panel (none before the
 * first clip or after the last), → and ←. Between groups: a finger (or the mouse) dragging the video up
 * or down — it follows, the next group coming in under it, and let go
 * goes on or back — its ↑ and ↓ buttons, a wheel, ↑ and ↓; after a
 * group's last clip, the next group. The product changes once it has
 * landed. Held
 * down — a finger, the mouse — it stands still; its sound, play / pause
 * and close at the video's top right, the clip's view count under them
 * (its data-pg-reels-views, the site's); a close at the window's top
 * right too, on a computer.
 * Esc, Back, the dark around it close it too. The
 * product: on a computer a panel beside the video — the product's
 * <template data-pg-reels-detail>, the site's markup: a title (its
 * data-pg-reels-title goes to the panel's head, beside the close), a big
 * picture (data-pg-reels-big), small ones (data-pg-reels-thumb, a press
 * shows it big), variants (data-pg-reels-variant buttons: each its
 * price, its gallery — data-pg-reels-gallery of the same name — and its
 * link), the price, a link (its data-pg-reels-foot is pinned to
 * the panel's foot, the rest scrolling above it) — on a phone under the
 * video, the product as on the card, and its details opened by a button.
 *
 * Marks written here: data-pg-reels-current on the playing clip and its
 * product, on each group's own clip and product too; data-pg-reels-playing
 * on the group that plays; aria-current on its bar, data-pg-reels-done on
 * the bars before it, and --pg-reels-progress (0 to 1) on the bar playing.
 *
 * Seen: a group whose every clip has been shown in the full view is seen —
 * data-pg-reels-seen="true" on it ("false" before), for its ring to go
 * pale as stories' do; for --pg-reels-seen-for (24h by default), then
 * bright again; --pg-reels-seen: off and never. With a data-pg-reels-id on
 * the group it is remembered in this browser; forgetReelsSeen() forgets it
 * all — every ring bright again, at once.
 *
 * CSS, per screen size: --pg-reels-show (cards across: 4; 1.5 on a phone
 * shows one and half the next), --pg-reels-gap, --pg-reels-duration (a
 * picture's time, 5s) — see index.css.
 *
 * With reduced motion asked for, nothing plays by itself: the posters, and
 * a bar pressed shows its clip. React's markup is never moved: the bars go
 * into the empty data-pg-reels-bars; everything else only gets marks.
 *
 * No dependencies.
 */
const ROOT = "data-pg-reels";
const STRIP = "data-pg-reels-strip";
const GROUP = "data-pg-reels-group";
const CARD = "data-pg-reels-card";
const CLIP = "data-pg-reels-clip";
const BARS = "data-pg-reels-bars";
const BAR = "data-pg-reels-bar";
const PRODUCT = "data-pg-reels-product";
const CURRENT = "data-pg-reels-current";
const PLAYING = "data-pg-reels-playing";
const DONE = "data-pg-reels-done";
const DURATION = "data-pg-reels-duration";
const SOUND = "data-pg-reels-sound";
const SOUND_ON = "data-pg-reels-sound-on";
const OPEN = "data-pg-reels-open";
const PREV = "data-pg-reels-prev";
const NEXT = "data-pg-reels-next";
const START = "data-pg-reels-start";
const END = "data-pg-reels-end";
const PROGRESS = "--pg-reels-progress";
const HEAD = "data-pg-reels-head";
const DETAIL = "data-pg-reels-detail";
const BIG = "data-pg-reels-big";
const THUMB = "data-pg-reels-thumb";
const VIEWER = "data-pg-reels-viewer";
const VIEW_BAR = "data-pg-reels-view-bar";
const PAUSED = "data-pg-reels-paused";
const HELD = "data-pg-reels-held";
const DETAILS = "data-pg-reels-details";
const NO_PRODUCT = "data-pg-reels-no-product";
const TITLE = "data-pg-reels-title";
const FOOT = "data-pg-reels-foot";
const ID = "data-pg-reels-id";
const VIEWS = "data-pg-reels-views";
const VARIANT = "data-pg-reels-variant";
const VARIANT_PRICE = "data-pg-reels-variant-price";
const VARIANT_HREF = "data-pg-reels-variant-href";
const GALLERY = "data-pg-reels-gallery";
const PRICE = "data-pg-reels-price";
const SEEN = "data-pg-reels-seen";
const SEEN_KEY = "pg-reels-seen";
const SLIDING = "data-pg-reels-sliding";
/* A finger this far up or down, more than across: the video follows it. */
const DRAG_PX = 10;
/* Let go this fast (px a ms) the way it was going: on, however short. */
const FLICK = 0.45;
/* Held this long, a press stops it — not a tap. */
const HOLD_MS = 220;
/* A wheel's turn this far is a step; then a pause before the next. */
const WHEEL_PX = 60;
const WHEEL_REST_MS = 700;
/* A picture's time when nothing says. */
const PICTURE_MS = 5000;
/* In sight enough to play: this much of the card. */
const IN_SIGHT = 0.6;
const px = (value) => parseFloat(value) || 0;
/* A time — seconds or ms written — in ms. */
function timeOf(raw, fallback) {
    const text = (raw ?? "").trim();
    const n = Number.parseFloat(text);
    if (!Number.isFinite(n))
        return fallback;
    return Math.max(0, text.endsWith("ms") ? n : n * 1000);
}
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const videoOf = (clip) => clip?.querySelector("video") ?? null;
/* A picture's time: its own data-pg-reels-duration, or the page's
   --pg-reels-duration, or 5s. */
function pictureTime(g, clip) {
    const own = clip.getAttribute(DURATION);
    if (own)
        return timeOf(own, PICTURE_MS);
    return timeOf(getComputedStyle(g.el).getPropertyValue("--pg-reels-duration"), PICTURE_MS);
}
/* ---------- Sound ----------
   One sound at a time: the playing card's, or the full view's. */
let sound = false;
/* ---------- Copies for the full view ---------- */
/* A copy of the site's markup for the full view: no ids — they stay
   unique — and none of this file's marks. */
function copyOf(el) {
    const copy = el.cloneNode(true);
    [copy, ...copy.querySelectorAll("*")].forEach((x) => {
        x.removeAttribute("id");
        [CURRENT, PLAYING, DONE].forEach((name) => x.removeAttribute(name));
    });
    copy.querySelectorAll(`[${DETAIL}]`).forEach((t) => t.remove());
    return copy;
}
const svg = (paths) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const ICONS = {
    soundOff: '<path d="M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6"/>',
    soundOn: '<path d="M4 9h4l5-4v14l-5-4H4zM17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    play: '<path d="M7 5v14l12-7z"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    down: '<path d="M12 5v14M19 12l-7 7-7-7"/>',
    chevron: '<path d="m6 15 6-6 6 6"/>',
    prev: '<path d="m15 6-6 6 6 6"/>',
    next: '<path d="m9 6 6 6-6 6"/>',
};
/* ---------- One group ---------- */
function partsOf(el, root) {
    const own = (x) => x.closest(`[${GROUP}]`) === el;
    const clips = [...el.querySelectorAll(`[${CLIP}]`)].filter(own);
    const products = [...el.querySelectorAll(`[${PRODUCT}]`)].filter(own);
    // A view count a clip, in order — or one, the group's.
    const views = [...el.querySelectorAll(`[${VIEWS}]`)].filter(own);
    const holder = [...el.querySelectorAll(`[${BARS}]`)].find(own);
    // One bar a clip — made here, in the empty holder, once.
    let bars = [];
    if (holder) {
        if (holder.children.length !== clips.length) {
            holder.replaceChildren(...clips.map((_, i) => {
                const bar = document.createElement("button");
                bar.type = "button";
                bar.setAttribute(BAR, "");
                bar.setAttribute("aria-label", `Clip ${i + 1} of ${clips.length}`);
                bar.append(document.createElement("span"));
                return bar;
            }));
        }
        bars = [...holder.children];
    }
    const current = clips.findIndex((c) => c.hasAttribute(CURRENT));
    return { el, root, clips, products, views, bars, at: Math.max(0, current), ratio: 0, shown: 0, since: 0 };
}
/* Show clip `i` of the group: its clip, its product, its bar. */
function show(g, i) {
    const n = g.clips.length;
    if (!n)
        return;
    const was = g.clips[g.at];
    if (was && g.at !== i) {
        const v = videoOf(was);
        if (v) {
            v.pause();
            v.currentTime = 0;
        }
    }
    g.at = ((i % n) + n) % n;
    g.shown = 0;
    g.since = performance.now();
    g.clips.forEach((c, k) => c.toggleAttribute(CURRENT, k === g.at));
    g.products.forEach((p, k) => p.toggleAttribute(CURRENT, k === g.at));
    g.views.forEach((v, k) => v.toggleAttribute(CURRENT, g.views.length === 1 || k === g.at));
    g.bars.forEach((b, k) => {
        b.toggleAttribute(DONE, k < g.at);
        if (k === g.at)
            b.setAttribute("aria-current", "true");
        else
            b.removeAttribute("aria-current");
        b.style.setProperty(PROGRESS, k < g.at ? "1" : "0");
    });
}
/* ---------- Seen, kept in this browser ----------
   A group is seen once every one of its clips has been shown in the full
   view. Set on the section or above:
     --pg-reels-seen       all (default) · off: the rings never go pale
     --pg-reels-seen-for   how long it stays seen: 24h (default), 1h, 30m,
                           7d — then bright again; forever: until forgotten */
// Groups with a data-pg-reels-id: in localStorage, as { id: when }.
// Without: this visit only.
const seenHere = new WeakMap();
const SEEN_FOR_DEFAULT = 24 * 60 * 60 * 1000;
function seenMap() {
    try {
        const kept = JSON.parse(localStorage.getItem(SEEN_KEY) || "{}");
        // An older list of ids: seen now.
        if (Array.isArray(kept))
            return Object.fromEntries(kept.map((id) => [String(id), Date.now()]));
        return kept && typeof kept === "object" ? kept : {};
    }
    catch {
        return {};
    }
}
/* "24h", "30m", "90s", "500ms", "7d" → ms; "forever" → Infinity. */
function spanOf(raw) {
    const text = raw.trim().toLowerCase();
    if (!text)
        return SEEN_FOR_DEFAULT;
    if (text === "forever" || text === "none")
        return Infinity;
    const m = /^(-?[\d.]+)\s*(ms|s|m|h|d)?$/.exec(text);
    if (!m)
        return SEEN_FOR_DEFAULT;
    const n = Number(m[1]);
    const unit = { ms: 1, s: 1000, m: 60000, h: 3600000, d: 86400000 }[(m[2] ?? "ms")];
    return Number.isFinite(n) ? Math.max(0, n * unit) : SEEN_FOR_DEFAULT;
}
function seenRules(el) {
    const cs = getComputedStyle(el);
    return {
        off: cs.getPropertyValue("--pg-reels-seen").trim() === "off",
        span: spanOf(cs.getPropertyValue("--pg-reels-seen-for")),
    };
}
function isSeen(el, map = seenMap()) {
    const { off, span } = seenRules(el);
    if (off)
        return false;
    const id = el.getAttribute(ID);
    const when = id ? map[id] : seenHere.get(el);
    return typeof when === "number" && Date.now() - when < span;
}
function markSeen(el) {
    if (seenRules(el).off)
        return;
    const id = el.getAttribute(ID);
    if (!id)
        seenHere.set(el, Date.now());
    else {
        const map = seenMap();
        map[id] = Date.now();
        try {
            localStorage.setItem(SEEN_KEY, JSON.stringify(map));
        }
        catch {
            // Private mode, or storage full: seen for this visit only.
            seenHere.set(el, Date.now());
        }
    }
    paintSeen();
}
function paintSeen() {
    const map = seenMap();
    document.querySelectorAll(`[${GROUP}]`).forEach((el) => {
        const value = String(isSeen(el, map));
        if (el.getAttribute(SEEN) !== value)
            el.setAttribute(SEEN, value);
    });
}
/* Forget what was seen, in this browser: every ring bright again, at once
   — no reload. */
export function forgetReelsSeen() {
    try {
        localStorage.removeItem(SEEN_KEY);
    }
    catch {
        // Storage blocked: nothing kept, nothing to forget.
    }
    document.querySelectorAll(`[${GROUP}]`).forEach((el) => seenHere.delete(el));
    watched = new WeakMap();
    paintSeen();
}
// The clips of each group shown in the full view so far, this visit.
let watched = new WeakMap();
/* ---------- Everything on the page ---------- */
let live = null;
/* Start watching every reels section on the page, those rendered later
   too; returns the cleanup for a React effect. Only the newest call
   answers. */
export function initReels() {
    if (typeof document === "undefined")
        return () => { };
    const self = {};
    live = self;
    const groups = new Map();
    // The groups playing: every one in sight.
    const playing = new Set();
    let frame = 0;
    // Which groups play: every one at least IN_SIGHT in sight.
    const sights = typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                const g = groups.get(e.target.closest(`[${GROUP}]`));
                if (g)
                    g.ratio = e.isIntersecting ? e.intersectionRatio : 0;
            });
            choose();
        }, { threshold: [0, 0.25, 0.5, 0.6, 0.75, 0.9, 1] });
    const choose = () => {
        if (live !== self || view.open)
            return;
        let changed = false;
        groups.forEach((g) => {
            const on = g.ratio >= IN_SIGHT;
            if (on === playing.has(g))
                return;
            changed = true;
            if (on) {
                playing.add(g);
                start(g);
            }
            else {
                playing.delete(g);
                stop(g);
            }
        });
        // The card with the sound gone out of sight: the sound goes too.
        if (sound && (!owner || !playing.has(owner))) {
            sound = false;
            changed = true;
        }
        if (changed)
            applySound();
    };
    const stopAll = () => {
        playing.forEach(stop);
        playing.clear();
    };
    // The group whose sound button turned it on — or the one last seen in
    // the full view.
    let owner = null;
    const applySound = () => {
        groups.forEach((g) => {
            const on = sound && !view.open && g === owner && playing.has(g);
            g.clips.forEach((c) => {
                const v = videoOf(c);
                if (v)
                    v.muted = !on;
            });
            g.el.querySelectorAll(`[${SOUND}]`).forEach((b) => b.setAttribute("aria-pressed", String(on)));
        });
        document.querySelectorAll(`[${ROOT}]`).forEach((r) => r.toggleAttribute(SOUND_ON, sound && !view.open && !!owner && playing.has(owner) && owner.root === r));
        const v = viewVideo();
        if (v)
            v.muted = !sound;
        dialog.querySelector(`[${SOUND}]`)?.setAttribute("aria-pressed", String(sound && view.open));
    };
    const start = (g) => {
        g.el.setAttribute(PLAYING, "");
        if (reduced())
            return;
        const clip = g.clips[g.at];
        const v = videoOf(clip);
        g.since = performance.now();
        if (v) {
            v.muted = !(sound && g === owner);
            v.preload = "auto";
            v.play().catch(() => { });
        }
        tick();
    };
    const stop = (g) => {
        g.el.removeAttribute(PLAYING);
        const clip = g.clips[g.at];
        videoOf(clip)?.pause();
        // A picture keeps the time it has shown.
        g.shown += performance.now() - g.since;
    };
    // One frame loop for every group that plays: its bar fills; a picture
    // whose time is up — data-pg-reels-duration, --pg-reels-duration — or
    // a video ended, is the next clip.
    const tick = () => {
        if (frame)
            return;
        frame = requestAnimationFrame(function step(now) {
            frame = 0;
            if (live !== self || !playing.size || reduced())
                return;
            const due = [];
            playing.forEach((g) => {
                const clip = g.clips[g.at];
                const v = videoOf(clip);
                let progress;
                if (v)
                    progress = v.duration ? v.currentTime / v.duration : 0;
                else
                    progress = (g.shown + now - g.since) / Math.max(1, pictureTime(g, clip));
                g.bars[g.at]?.style.setProperty(PROGRESS, String(Math.min(1, progress)));
                if (!v && progress >= 1)
                    due.push(g);
            });
            // The loop goes on first: next() asks for it too, and is
            // answered by this one.
            frame = requestAnimationFrame(step);
            due.forEach(next);
        });
    };
    const next = (g) => {
        show(g, g.at + 1);
        if (playing.has(g))
            start(g);
    };
    // A video that ends: the next clip.
    const onEnded = (event) => {
        const clip = event.target.closest(`[${CLIP}]`);
        const g = clip && groups.get(clip.closest(`[${GROUP}]`));
        if (g && g.clips[g.at] === clip)
            next(g);
    };
    // The strip's ends: data-pg-reels-start / -end on the section.
    const ends = (root) => {
        const strip = root.querySelector(`[${STRIP}]`);
        if (!strip)
            return;
        root.toggleAttribute(START, strip.scrollLeft <= 1);
        root.toggleAttribute(END, strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1);
    };
    const onScroll = (event) => {
        const strip = event.target;
        if (strip instanceof HTMLElement && strip.hasAttribute(STRIP))
            ends(strip.closest(`[${ROOT}]`));
    };
    // Look round the page: every group, its parts.
    const look = () => {
        if (live !== self)
            return;
        const now = new Set();
        document.querySelectorAll(`[${ROOT}]`).forEach((root) => {
            root.querySelectorAll(`[${GROUP}]`).forEach((el) => {
                if (el.closest(`[${ROOT}]`) !== root)
                    return;
                now.add(el);
                if (groups.has(el))
                    return;
                const g = partsOf(el, root);
                groups.set(el, g);
                show(g, g.at);
                const card = el.querySelector(`[${CARD}]`) ?? el;
                sights?.observe(card);
            });
            ends(root);
        });
        paintSeen();
        groups.forEach((g, el) => {
            if (now.has(el))
                return;
            if (playing.has(g)) {
                stop(g);
                playing.delete(g);
            }
            groups.delete(el);
        });
        applySound();
        if (!sights) {
            // No observer: the first plays.
            const first = groups.values().next().value;
            if (first && !playing.size) {
                first.ratio = 1;
                choose();
            }
        }
    };
    // Presses: a bar, the sound, the arrows, the card.
    const onClick = (event) => {
        if (live !== self || !(event.target instanceof Element))
            return;
        const t = event.target;
        const bar = t.closest(`[${BAR}]`);
        if (bar) {
            const g = groups.get(bar.closest(`[${GROUP}]`));
            if (!g)
                return;
            const was = playing.has(g);
            show(g, g.bars.indexOf(bar));
            if (was)
                start(g);
            return;
        }
        const soundButton = t.closest(`[${SOUND}]`);
        if (soundButton) {
            const g = groups.get(soundButton.closest(`[${GROUP}]`));
            if (!g || view.open)
                sound = !sound;
            // The card with the sound: off. Another card's: the sound is
            // that card's — it plays, the others are muted.
            else if (g === owner && sound)
                sound = false;
            else {
                if (!playing.has(g)) {
                    playing.add(g);
                    start(g);
                }
                sound = true;
                owner = g;
            }
            applySound();
            return;
        }
        const arrow = t.closest(`[${PREV}], [${NEXT}]`);
        if (arrow) {
            const id = arrow.getAttribute("aria-controls");
            const strip = (id ? document.getElementById(id) : null) ?? arrow.closest(`[${ROOT}]`)?.querySelector(`[${STRIP}]`);
            const first = strip?.querySelector(`[${GROUP}]`);
            if (!strip || !first)
                return;
            const gap = px(getComputedStyle(strip).columnGap);
            const by = first.getBoundingClientRect().width + gap;
            strip.scrollBy({ left: arrow.hasAttribute(NEXT) ? by : -by, behavior: reduced() ? "instant" : "smooth" });
            return;
        }
        // The card — not a link or a button of its own — or its open
        // button: the full view's to show.
        const openButton = t.closest(`[${OPEN}]`);
        const card = t.closest(`[${CARD}]`);
        if (!openButton && (!card || t.closest("a, button, input, select, textarea")))
            return;
        const groupEl = (openButton ?? card).closest(`[${GROUP}]`);
        const g = groupEl && groups.get(groupEl);
        if (!g)
            return;
        const asked = new CustomEvent("pg-reels:open", { bubbles: true, cancelable: true, detail: { group: g.el, clip: g.at } });
        if (g.root.dispatchEvent(asked))
            openView(g, g.at);
    };
    /* ---------- The full view ---------- */
    const dialog = document.createElement("dialog");
    dialog.setAttribute(VIEWER, "");
    dialog.setAttribute("aria-label", "Reels");
    dialog.setAttribute("data-lenis-prevent", "");
    // Opened, the focus is the view's own — not its first button's: the
    // keys work at once, no ring on a button nobody chose.
    dialog.tabIndex = -1;
    dialog.innerHTML = `
        <button type="button" data-pg-reels-close aria-label="Close">${svg(ICONS.close)}</button>
        <div data-pg-reels-stage>
            <div data-pg-reels-view-steps>
                <button type="button" data-pg-reels-view-up aria-label="Previous reel">${svg(ICONS.up)}</button>
                <button type="button" data-pg-reels-view-down aria-label="Next reel">${svg(ICONS.down)}</button>
            </div>
            <div data-pg-reels-pair>
            <button type="button" data-pg-reels-view-side="prev" aria-label="Previous">${svg(ICONS.prev)}</button>
            <div data-pg-reels-column>
            <div data-pg-reels-feed>
            <div data-pg-reels-view-peek="before" aria-hidden="true" hidden></div>
            <div data-pg-reels-screen>
                <div data-pg-reels-view-media></div>
                <button type="button" data-pg-reels-view-back tabindex="-1" aria-label="Previous clip"></button>
                <button type="button" data-pg-reels-view-on tabindex="-1" aria-label="Next clip"></button>
                <div data-pg-reels-view-top>
                    <div data-pg-reels-view-bars></div>
                    <div data-pg-reels-view-row>
                        <div data-pg-reels-view-head></div>
                        <div data-pg-reels-view-tools>
                            <button type="button" ${SOUND} aria-pressed="false" aria-label="Sound">${svg(ICONS.soundOff)}${svg(ICONS.soundOn)}</button>
                            <button type="button" data-pg-reels-view-play aria-label="Pause">${svg(ICONS.pause)}${svg(ICONS.play)}</button>
                            <button type="button" data-pg-reels-view-close aria-label="Close">${svg(ICONS.close)}</button>
                            <div data-pg-reels-view-views></div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" data-pg-reels-view-peek="after" tabindex="-1" aria-label="Next reel" hidden></button>
            </div>
            </div>
            <aside data-pg-reels-panel>
                <div data-pg-reels-panel-head>
                    <div data-pg-reels-panel-title></div>
                </div>
                <div data-pg-reels-panel-band>
                    <div data-pg-reels-panel-summary></div>
                    <button type="button" data-pg-reels-panel-toggle aria-expanded="false">Details ${svg(ICONS.chevron)}</button>
                </div>
                <div data-pg-reels-panel-detail></div>
                <div data-pg-reels-panel-foot></div>
            </aside>
            <button type="button" data-pg-reels-view-side="next" aria-label="Next">${svg(ICONS.next)}</button>
            </div>
        </div>`;
    const part = (name) => dialog.querySelector(`[data-pg-reels-${name}]`);
    const media = part("view-media");
    const feed = part("feed");
    const screen = part("screen");
    const before = dialog.querySelector('[data-pg-reels-view-peek="before"]');
    const after = dialog.querySelector('[data-pg-reels-view-peek="after"]');
    const viewBars = part("view-bars");
    const playButton = part("view-play");
    const upButton = part("view-up");
    const sidePrev = dialog.querySelector('[data-pg-reels-view-side="prev"]');
    const sideNext = dialog.querySelector('[data-pg-reels-view-side="next"]');
    const downButton = part("view-down");
    const toggle = part("panel-toggle");
    document.body.append(dialog);
    // The band at a phone's foot, its height for the site:
    // --pg-reels-band on the view, 0 where the product is beside it.
    const band = part("panel-band");
    const panel = part("panel");
    const bandSize = new ResizeObserver(() => {
        const cs = getComputedStyle(panel);
        const h = band.offsetHeight ? band.offsetHeight + px(cs.paddingTop) + px(cs.paddingBottom) : 0;
        dialog.style.setProperty("--pg-reels-band", `${h}px`);
    });
    bandSize.observe(band);
    const view = {
        open: false,
        list: [],
        gi: 0,
        ci: 0,
        paused: false,
        // Held down, dragged, sliding: standing still for now.
        held: false,
        shown: 0,
        since: 0,
        pushed: false,
        frame: 0,
    };
    const viewVideo = () => media.querySelector("video");
    const current = () => view.list[view.gi];
    let headOf = null;
    // A group's first clip, for the video above or under the one shown:
    // a picture, or a video on its poster — never playing.
    const peekOf = (holder, g) => {
        holder.replaceChildren(...(g ? [copyOf(g.clips[0])] : []));
        holder.hidden = !g;
        holder.querySelectorAll("video").forEach((x) => {
            x.muted = true;
            x.preload = "none";
            x.removeAttribute("autoplay");
        });
    };
    // Show the view's clip, with its head, its bars, its product — and the
    // groups above and under it, ready to slide in.
    const render = () => {
        const g = current();
        const n = g.clips.length;
        const clip = g.clips[view.ci];
        viewVideo()?.pause();
        const head = g.el.querySelector(`[${HEAD}]`);
        part("view-head").replaceChildren(...(head ? [copyOf(head)] : []));
        // The clip's view count — the site's, written in its card — under
        // the close; the group's, when the card has only one.
        const views = g.views.length === 1 ? g.views[0] : g.views[view.ci];
        part("view-views").replaceChildren(...(views ? [copyOf(views)] : []));
        // The head as it was before this group was looked at — its ring
        // bright the first time, through all its clips — and from now on,
        // seen.
        if (headOf !== g) {
            headOf = g;
            part("view-head").setAttribute(SEEN, String(isSeen(g.el)));
        }
        // This clip shown; every clip of the group shown: seen.
        const shown = watched.get(g.el) ?? new Set();
        shown.add(view.ci);
        watched.set(g.el, shown);
        if (shown.size >= n)
            markSeen(g.el);
        viewBars.replaceChildren(...g.clips.map((_, i) => {
            const bar = document.createElement("button");
            bar.type = "button";
            bar.setAttribute(VIEW_BAR, "");
            bar.setAttribute("aria-label", `Clip ${i + 1} of ${n}`);
            bar.append(document.createElement("span"));
            bar.toggleAttribute(DONE, i < view.ci);
            if (i === view.ci)
                bar.setAttribute("aria-current", "true");
            bar.style.setProperty(PROGRESS, i < view.ci ? "1" : "0");
            return bar;
        }));
        viewBars.hidden = n < 2;
        const copy = copyOf(clip);
        const v = copy.querySelector("video");
        if (v) {
            v.muted = !sound;
            v.preload = "auto";
            v.loop = false;
        }
        media.replaceChildren(copy);
        peekOf(before, view.list[view.gi - 1]);
        peekOf(after, view.list[view.gi + 1]);
        const product = g.products[view.ci];
        part("panel-summary").replaceChildren(...(product ? [copyOf(product)] : []));
        // The details: in the product, or in the clip — a <template>, or
        // any element kept hidden (React: a <template>'s markup is not
        // hydrated, and a link cannot sit inside the product's link but
        // in a template). A template parsed from HTML keeps its markup in
        // .content; one rendered by script holds it as children. Its
        // data-pg-reels-title goes to the panel's head, beside the close.
        const detail = product?.querySelector(`[${DETAIL}]`) ?? clip.querySelector(`[${DETAIL}]`);
        const from = detail instanceof HTMLTemplateElement && detail.content.childNodes.length ? detail.content : detail;
        const holder = document.createElement("div");
        holder.append(...(from ? [...from.childNodes].map((x) => x.cloneNode(true)) : []));
        const title = holder.querySelector(`[${TITLE}]`);
        part("panel-title").replaceChildren(...(title ? [title] : []));
        // Its data-pg-reels-foot — the link to the product — to the
        // panel's foot, always in sight under what scrolls.
        const foot = holder.querySelector(`[${FOOT}]`);
        part("panel-foot").replaceChildren(...(foot ? [foot] : []));
        part("panel-detail").replaceChildren(...holder.childNodes);
        part("panel-detail").scrollTop = 0;
        // Its variants: the one marked current, or the first, chosen.
        const variants = panel.querySelectorAll(`[${VARIANT}]`);
        if (variants.length)
            chooseVariant([...variants].find((x) => x.hasAttribute(CURRENT)) ?? variants[0]);
        dialog.toggleAttribute(NO_PRODUCT, !product);
        upButton.disabled = view.gi === 0;
        downButton.disabled = view.gi === view.list.length - 1;
        // The arrows beside the video: none before the very first clip,
        // none after the very last.
        sidePrev.hidden = view.gi === 0 && view.ci === 0;
        sideNext.hidden = view.gi === view.list.length - 1 && view.ci === n - 1;
        view.shown = 0;
        view.since = performance.now();
        playView();
    };
    const playView = () => {
        const v = viewVideo();
        const still = view.paused || view.held;
        dialog.toggleAttribute(PAUSED, view.paused);
        playButton.setAttribute("aria-label", view.paused ? "Play" : "Pause");
        if (still) {
            v?.pause();
            return;
        }
        view.since = performance.now();
        v?.play().catch(() => { });
        tickView();
    };
    // Still for now — held, dragged, sliding — its time kept.
    const holdView = () => {
        if (view.held)
            return;
        if (!view.paused)
            view.shown += performance.now() - view.since;
        view.held = true;
        viewVideo()?.pause();
    };
    const letGo = () => {
        view.held = false;
        playView();
    };
    const tickView = () => {
        if (view.frame)
            return;
        view.frame = requestAnimationFrame(function step(now) {
            view.frame = 0;
            if (!view.open || view.paused || view.held)
                return;
            const g = current();
            const clip = g.clips[view.ci];
            const v = viewVideo();
            const progress = v ? (v.duration ? v.currentTime / v.duration : 0) : (view.shown + now - view.since) / Math.max(1, pictureTime(g, clip));
            viewBars.children[view.ci]?.setAttribute("style", `${PROGRESS}: ${Math.min(1, progress)}`);
            if (!v && progress >= 1) {
                nextClip(true);
                return;
            }
            view.frame = requestAnimationFrame(step);
        });
    };
    /* Between groups: the video and the one above or under it move
       together — after a finger, or by themselves — by a video and its
       gap; landed, the one that came in is the one shown, its product in
       the panel. */
    let sliding = false;
    const shift = () => screen.offsetHeight + px(getComputedStyle(feed).rowGap);
    const setY = (y) => {
        feed.style.transform = y ? `translateY(${y}px)` : "";
    };
    const can = (dir) => view.gi + dir >= 0 && view.gi + dir < view.list.length;
    const EASE = "cubic-bezier(0.2, 0, 0, 1)";
    // `last`: land on the group's last clip — going back from a first clip.
    const slide = (dir, from = 0, last = false) => {
        if (sliding)
            return;
        const land = () => {
            view.gi += dir;
            view.ci = last ? current().clips.length - 1 : 0;
            view.held = false;
            dialog.removeAttribute(SLIDING);
            render();
        };
        if (!can(dir))
            return settle(from);
        if (reduced()) {
            setY(0);
            return land();
        }
        sliding = true;
        holdView();
        dialog.setAttribute(SLIDING, "");
        const by = shift();
        const to = -dir * by;
        setY(0);
        const run = feed.animate({ transform: [`translateY(${from}px)`, `translateY(${to}px)`] }, { duration: Math.max(140, (340 * Math.abs(to - from)) / by), easing: EASE, fill: "forwards" });
        run.onfinish = () => {
            land();
            run.cancel();
            sliding = false;
        };
    };
    // Not far enough: back where it was.
    const settle = (from) => {
        const done = () => {
            dialog.removeAttribute(SLIDING);
            letGo();
        };
        setY(0);
        if (!from || reduced())
            return done();
        sliding = true;
        const run = feed.animate({ transform: [`translateY(${from}px)`, "none"] }, { duration: 220, easing: EASE });
        run.onfinish = () => {
            sliding = false;
            done();
        };
    };
    // Within a group, and on to the next — after the last group, the first.
    const nextClip = (auto = false) => {
        if (view.ci < current().clips.length - 1) {
            view.ci += 1;
            render();
        }
        else if (can(1))
            slide(1);
        else if (auto && view.list.length > 1) {
            view.gi = 0;
            view.ci = 0;
            render();
        }
        else {
            view.ci = 0;
            render();
        }
    };
    const prevClip = () => {
        if (view.ci > 0) {
            view.ci -= 1;
            render();
        }
        else if (can(-1))
            slide(-1, 0, true);
        else
            render();
    };
    const nextGroup = () => slide(1);
    const prevGroup = () => slide(-1);
    const openView = (g, clip) => {
        // Opened from a card the sound was not on: none.
        if (g !== owner)
            sound = false;
        stopAll();
        // Every group of its section, in the page's order.
        headOf = null;
        view.list = [...groups.values()].filter((x) => x.root === g.root).sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        view.gi = view.list.indexOf(g);
        view.ci = clip;
        view.open = true;
        // Reduced motion: it waits for its play button.
        view.paused = reduced();
        view.held = false;
        dialog.removeAttribute(DETAILS);
        dialog.removeAttribute(SLIDING);
        setY(0);
        toggle.setAttribute("aria-expanded", "false");
        if (!dialog.open)
            dialog.showModal();
        dialog.focus({ preventScroll: true });
        try {
            history.pushState({ ...(history.state ?? {}), pgReels: true }, "");
            view.pushed = true;
        }
        catch {
            view.pushed = false;
        }
        render();
        applySound();
    };
    // Closed: the card it came from shows the clip last seen; the strip
    // plays again. A Back step of its own is taken back — unless Back
    // closed it.
    const closeView = (byBack = false) => {
        if (!view.open)
            return;
        view.open = false;
        viewVideo()?.pause();
        if (view.frame)
            cancelAnimationFrame(view.frame);
        view.frame = 0;
        feed.getAnimations().forEach((a) => a.cancel());
        sliding = false;
        press = null;
        const g = current();
        if (g)
            show(g, view.ci);
        // Its sound goes on with the card last seen, if that one plays.
        owner = g ?? null;
        if (dialog.open)
            dialog.close();
        media.replaceChildren();
        if (view.pushed && !byBack)
            history.back();
        view.pushed = false;
        choose();
        applySound();
        paintSeen();
    };
    const onViewClick = (event) => {
        if (!(event.target instanceof Element))
            return;
        const t = event.target;
        if (swallow) {
            swallow = false;
            event.preventDefault();
            return;
        }
        // The dark around it.
        if (t === dialog || t.hasAttribute("data-pg-reels-stage"))
            return closeView();
        if (t.closest("[data-pg-reels-view-close], [data-pg-reels-close]"))
            return closeView();
        if (sliding)
            return;
        if (t.closest('[data-pg-reels-view-on], [data-pg-reels-view-side="next"]'))
            return nextClip();
        if (t.closest('[data-pg-reels-view-back], [data-pg-reels-view-side="prev"]'))
            return prevClip();
        if (t.closest("[data-pg-reels-view-up]"))
            return prevGroup();
        if (t.closest('[data-pg-reels-view-down], [data-pg-reels-view-peek="after"]'))
            return nextGroup();
        const bar = t.closest(`[${VIEW_BAR}]`);
        if (bar) {
            view.ci = [...viewBars.children].indexOf(bar);
            return render();
        }
        if (t.closest("[data-pg-reels-view-play]"))
            return togglePause();
        if (t.closest("[data-pg-reels-panel-toggle]")) {
            const open = !dialog.hasAttribute(DETAILS);
            dialog.toggleAttribute(DETAILS, open);
            toggle.setAttribute("aria-expanded", String(open));
            return;
        }
        // A variant pressed: its price, its pictures, its link.
        const variant = t.closest(`[${VARIANT}]`);
        if (variant && panel.contains(variant))
            return chooseVariant(variant);
        // A small picture of the product, pressed: shown big — in its own
        // gallery, when each variant has one — and brought into sight,
        // when the row of them scrolls.
        const thumb = t.closest(`[${THUMB}]`);
        if (thumb) {
            const detail = thumb.closest(`[${GALLERY}]`) ?? thumb.closest("[data-pg-reels-panel-detail]");
            const big = detail?.querySelector(`[${BIG}] img, img[${BIG}]`);
            const src = thumb.getAttribute(THUMB) || thumb.querySelector("img")?.src;
            if (big && src)
                big.src = src;
            detail?.querySelectorAll(`[${THUMB}]`).forEach((x) => x.toggleAttribute(CURRENT, x === thumb));
            thumb.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduced() ? "instant" : "smooth" });
        }
    };
    /* A variant chosen — 1 kg, 500 g; a colour — in the panel: it is
       data-pg-reels-current (aria-pressed too); the gallery of the same
       name shows, the others hide; data-pg-reels-price shows its price;
       the foot's link goes to its page. */
    const chooseVariant = (variant) => {
        const name = variant.getAttribute(VARIANT);
        panel.querySelectorAll(`[${VARIANT}]`).forEach((x) => {
            x.toggleAttribute(CURRENT, x === variant);
            if (x.tagName === "BUTTON")
                x.setAttribute("aria-pressed", String(x === variant));
        });
        const galleries = panel.querySelectorAll(`[${GALLERY}]`);
        if ([...galleries].some((x) => x.getAttribute(GALLERY) === name))
            galleries.forEach((x) => x.toggleAttribute(CURRENT, x.getAttribute(GALLERY) === name));
        const price = variant.getAttribute(VARIANT_PRICE);
        if (price !== null)
            panel.querySelectorAll(`[${PRICE}]`).forEach((x) => (x.textContent = price));
        const href = variant.getAttribute(VARIANT_HREF);
        if (href)
            panel.querySelectorAll(`a[${FOOT}]`).forEach((x) => (x.href = href));
    };
    const togglePause = () => {
        if (!view.paused && !view.held)
            view.shown += performance.now() - view.since;
        view.paused = !view.paused;
        playView();
    };
    dialog.addEventListener("click", onViewClick);
    dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        closeView();
    });
    // A video that ends in the view: the next clip.
    media.addEventListener("ended", () => nextClip(true), true);
    /* A press on the video. Held: still, the controls out of the way.
       Dragged up or down — at once, or after holding it: the video follows the finger — the next group
       coming in under it, or the one before above it — and let go, goes
       on to it if pulled far enough or flicked, or back if not. A press
       that was either is no tap. */
    let press = null;
    let swallow = false;
    const noTap = () => {
        swallow = true;
        setTimeout(() => (swallow = false));
    };
    // How far the video moves for a finger's `dy`: past the first or the
    // last group, a quarter — it gives, and comes back.
    const pulled = (dy) => (can(dy < 0 ? 1 : -1) ? dy : dy / 4);
    screen.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || sliding || event.target.closest("button:not([data-pg-reels-view-on]):not([data-pg-reels-view-back]), a"))
            return;
        const timer = window.setTimeout(() => {
            if (!press || press.drag)
                return;
            dialog.setAttribute(HELD, "");
            holdView();
        }, HOLD_MS);
        press = { id: event.pointerId, x: event.clientX, y: event.clientY, timer, drag: false, lastY: event.clientY, lastT: event.timeStamp, speed: 0 };
    });
    screen.addEventListener("pointermove", (event) => {
        if (!press || press.id !== event.pointerId)
            return;
        const dx = event.clientX - press.x;
        const dy = event.clientY - press.y;
        if (!press.drag) {
            if (Math.hypot(dx, dy) > 10)
                clearTimeout(press.timer);
            if (Math.abs(dy) < DRAG_PX || Math.abs(dy) < Math.abs(dx))
                return;
            // Held first, then dragged: a drag all the same.
            press.drag = true;
            dialog.removeAttribute(HELD);
            screen.setPointerCapture(event.pointerId);
            holdView();
            dialog.setAttribute(SLIDING, "");
        }
        // The finger's speed, px a ms, smoothed.
        const dt = Math.max(1, event.timeStamp - press.lastT);
        press.speed = press.speed * 0.6 + ((event.clientY - press.lastY) / dt) * 0.4;
        press.lastY = event.clientY;
        press.lastT = event.timeStamp;
        setY(pulled(dy));
    });
    const release = (event) => {
        if (!press || press.id !== event.pointerId)
            return;
        const p = press;
        press = null;
        clearTimeout(p.timer);
        if (p.drag) {
            noTap();
            const dy = event.clientY - p.y;
            const dir = dy < 0 ? 1 : -1;
            const far = Math.abs(dy) > shift() * 0.2;
            const flick = Math.abs(p.speed) > FLICK && Math.sign(p.speed) === Math.sign(dy);
            if (event.type === "pointerup" && can(dir) && (far || flick))
                slide(dir, pulled(dy));
            else
                settle(pulled(dy));
            return;
        }
        if (dialog.hasAttribute(HELD)) {
            dialog.removeAttribute(HELD);
            noTap();
            letGo();
        }
    };
    screen.addEventListener("pointerup", release);
    screen.addEventListener("pointercancel", release);
    // A wheel, a trackpad: a step per turn, then a rest.
    let wheelSum = 0;
    let wheelRest = 0;
    dialog.addEventListener("wheel", (event) => {
        if (event.target.closest("[data-pg-reels-panel]"))
            return;
        event.preventDefault();
        if (event.timeStamp < wheelRest || sliding || press)
            return;
        wheelSum += event.deltaY;
        if (Math.abs(wheelSum) < WHEEL_PX)
            return;
        if (wheelSum > 0)
            nextGroup();
        else
            prevGroup();
        wheelSum = 0;
        wheelRest = event.timeStamp + WHEEL_REST_MS;
    }, { passive: false });
    dialog.addEventListener("keydown", (event) => {
        if (!view.open || event.altKey || event.ctrlKey || event.metaKey)
            return;
        const onControl = event.target.closest("button, a, input, textarea, select");
        if (sliding && event.key.startsWith("Arrow"))
            return event.preventDefault();
        if (event.key === "ArrowDown" || event.key === "PageDown")
            nextGroup();
        else if (event.key === "ArrowUp" || event.key === "PageUp")
            prevGroup();
        else if (event.key === "ArrowRight")
            nextClip();
        else if (event.key === "ArrowLeft")
            prevClip();
        else if ((event.key === " " || event.key === "k") && !onControl)
            togglePause();
        else
            return;
        event.preventDefault();
    });
    // Back closes it.
    const onPop = () => {
        if (view.open) {
            view.pushed = false;
            closeView(true);
        }
    };
    addEventListener("popstate", onPop);
    // Rendered later — React, a list that arrives — or taken away.
    const mo = new MutationObserver((records) => {
        if (records.some((r) => [...r.addedNodes, ...r.removedNodes].some((n) => n instanceof Element && (n.matches(`[${ROOT}], [${GROUP}]`) || !!n.querySelector(`[${GROUP}]`)))))
            look();
    });
    mo.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("click", onClick);
    document.addEventListener("ended", onEnded, true);
    document.addEventListener("scroll", onScroll, true);
    const onResize = () => document.querySelectorAll(`[${ROOT}]`).forEach(ends);
    addEventListener("resize", onResize);
    const onHidden = () => {
        if (view.open) {
            if (document.hidden)
                holdView();
            else if (!press && !sliding)
                letGo();
            return;
        }
        playing.forEach(document.hidden ? stop : start);
        // Back after a while: what was seen may have run out.
        if (!document.hidden)
            paintSeen();
    };
    document.addEventListener("visibilitychange", onHidden);
    look();
    return () => {
        mo.disconnect();
        sights?.disconnect();
        document.removeEventListener("click", onClick);
        document.removeEventListener("ended", onEnded, true);
        document.removeEventListener("scroll", onScroll, true);
        removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onHidden);
        if (frame)
            cancelAnimationFrame(frame);
        stopAll();
        removeEventListener("popstate", onPop);
        if (view.open)
            closeView();
        bandSize.disconnect();
        dialog.remove();
        if (live === self)
            live = null;
    };
}
