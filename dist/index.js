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
 * On the page: the card most in sight plays — only that one, muted until
 * its sound button is pressed (sound is the page's: on for one, on for
 * all) — its clips one after another, round and round, as stories do;
 * the bars under it fill as each plays. A bar pressed is that clip at
 * once. The clip playing shows its product: the products under the card
 * are one per clip, and only the playing one's shows. The others wait on
 * their posters. Out of sight, nothing plays.
 *
 * The strip scrolls sideways — a finger, a wheel, its arrows; it never
 * moves by itself. data-pg-reels-start / -end on the section while it
 * stands at either end (the arrows' to hide or dim).
 *
 * A card pressed — anywhere but its own buttons and links — or its
 * data-pg-reels-open: the event pg-reels:open on the section, with the
 * group and the clip, for the full view.
 *
 * Marks written here: data-pg-reels-current on the playing clip and its
 * product, on each group's own clip and product too; data-pg-reels-playing
 * on the group that plays; aria-current on its bar, data-pg-reels-done on
 * the bars before it, and --pg-reels-progress (0 to 1) on the bar playing.
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
/* ---------- The page's sound ---------- */
let sound = false;
function setSound(on) {
    sound = on;
    document.querySelectorAll(`[${CLIP}] video`).forEach((v) => (v.muted = !on));
    document.querySelectorAll(`[${SOUND}]`).forEach((b) => b.setAttribute("aria-pressed", String(on)));
    document.querySelectorAll(`[${ROOT}]`).forEach((r) => r.toggleAttribute(SOUND_ON, on));
}
/* ---------- One group ---------- */
function partsOf(el, root) {
    const own = (x) => x.closest(`[${GROUP}]`) === el;
    const clips = [...el.querySelectorAll(`[${CLIP}]`)].filter(own);
    const products = [...el.querySelectorAll(`[${PRODUCT}]`)].filter(own);
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
    return { el, root, clips, products, bars, at: Math.max(0, current), ratio: 0, shown: 0, since: 0 };
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
    g.bars.forEach((b, k) => {
        b.toggleAttribute(DONE, k < g.at);
        if (k === g.at)
            b.setAttribute("aria-current", "true");
        else
            b.removeAttribute("aria-current");
        b.style.setProperty(PROGRESS, k < g.at ? "1" : "0");
    });
}
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
    let playing = null;
    let frame = 0;
    // Which group plays: the one most in sight, over IN_SIGHT.
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
        if (live !== self)
            return;
        let best = null;
        groups.forEach((g) => {
            if (g.ratio >= IN_SIGHT && (!best || g.ratio > best.ratio))
                best = g;
        });
        if (best !== playing) {
            if (playing)
                stop(playing);
            playing = best;
            if (playing)
                start(playing);
        }
    };
    const start = (g) => {
        g.el.setAttribute(PLAYING, "");
        if (reduced())
            return;
        const clip = g.clips[g.at];
        const v = videoOf(clip);
        g.since = performance.now();
        if (v) {
            v.muted = !sound;
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
    // One frame loop, for the group that plays: its bar fills; a picture
    // whose time is up, or a video ended, is the next clip.
    const tick = () => {
        if (frame)
            return;
        frame = requestAnimationFrame(function step(now) {
            frame = 0;
            const g = playing;
            if (live !== self || !g || reduced())
                return;
            const clip = g.clips[g.at];
            const v = videoOf(clip);
            let progress;
            if (v)
                progress = v.duration ? v.currentTime / v.duration : 0;
            else
                progress = (g.shown + now - g.since) / Math.max(1, pictureTime(g, clip));
            g.bars[g.at]?.style.setProperty(PROGRESS, String(Math.min(1, progress)));
            if (!v && progress >= 1)
                next(g);
            frame = requestAnimationFrame(step);
        });
    };
    const next = (g) => {
        show(g, g.at + 1);
        if (g === playing)
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
            root.toggleAttribute(SOUND_ON, sound);
        });
        groups.forEach((g, el) => {
            if (now.has(el))
                return;
            if (g === playing) {
                stop(g);
                playing = null;
            }
            groups.delete(el);
        });
        document.querySelectorAll(`[${CLIP}] video`).forEach((v) => (v.muted = !sound));
        if (!sights) {
            // No observer: the first plays.
            const first = groups.values().next().value;
            if (first && !playing) {
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
            const was = g === playing;
            show(g, g.bars.indexOf(bar));
            if (was)
                start(g);
            return;
        }
        if (t.closest(`[${SOUND}]`)) {
            setSound(!sound);
            const g = groups.get(t.closest(`[${GROUP}]`));
            // Sound on for a card not playing: it plays now.
            if (g && sound && g !== playing) {
                if (playing)
                    stop(playing);
                playing = g;
                start(g);
            }
            else if (playing)
                videoOf(playing.clips[playing.at])?.play().catch(() => { });
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
        g.root.dispatchEvent(new CustomEvent("pg-reels:open", { bubbles: true, detail: { group: g.el, clip: g.at } }));
    };
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
        if (!playing)
            return;
        if (document.hidden)
            stop(playing);
        else
            start(playing);
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
        if (playing)
            stop(playing);
        if (live === self)
            live = null;
    };
}
