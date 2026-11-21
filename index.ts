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
 * data-pg-reels-open: the full view opens on that group and clip. First
 * the event pg-reels:open on the section (detail: group, clip); a site
 * that calls preventDefault() on it opens its own.
 *
 * The full view — a <dialog>, built here on <body>, its contents copies:
 * the clip playing, the group's data-pg-reels-head, the clip's product.
 * Within a group: the bars on top, a press on the video's right or left,
 * → and ←. Between groups: its ↑ and ↓ buttons, a wheel, a finger's swipe
 * up or down, ↑ and ↓; after a group's last clip, the next group. Held
 * down — a finger, the mouse — it stands still; its own play / pause, its
 * sound, its close. Esc, Back, the dark around it close it too. The
 * product: on a computer a panel beside the video — the product's
 * <template data-pg-reels-detail>, the site's markup: a title, a big
 * picture (data-pg-reels-big), small ones (data-pg-reels-thumb, a press
 * shows it big), the price, a link — on a phone under the video, the
 * product as on the card, and its details opened by a button.
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

/* A drag this long, up or down, is the next or the one before. */
const SWIPE_PX = 60;
/* Held this long, a press stops it — not a tap. */
const HOLD_MS = 220;
/* A wheel's turn this far is a step; then a pause before the next. */
const WHEEL_PX = 60;
const WHEEL_REST_MS = 700;

/* A picture's time when nothing says. */
const PICTURE_MS = 5000;
/* In sight enough to play: this much of the card. */
const IN_SIGHT = 0.6;

type Group = {
    el: HTMLElement;
    root: HTMLElement;
    clips: HTMLElement[];
    products: HTMLElement[];
    bars: HTMLElement[];
    at: number;
    ratio: number;
    // A picture's time: how long it has shown, ms, and since when.
    shown: number;
    since: number;
};

const px = (value: string): number => parseFloat(value) || 0;

/* A time — seconds or ms written — in ms. */
function timeOf(raw: string | null | undefined, fallback: number): number {
    const text = (raw ?? "").trim();
    const n = Number.parseFloat(text);
    if (!Number.isFinite(n)) return fallback;
    return Math.max(0, text.endsWith("ms") ? n : n * 1000);
}

const reduced = (): boolean => matchMedia("(prefers-reduced-motion: reduce)").matches;
const videoOf = (clip: HTMLElement | undefined): HTMLVideoElement | null => clip?.querySelector("video") ?? null;

/* A picture's time: its own data-pg-reels-duration, or the page's
   --pg-reels-duration, or 5s. */
function pictureTime(g: Group, clip: HTMLElement): number {
    const own = clip.getAttribute(DURATION);
    if (own) return timeOf(own, PICTURE_MS);
    return timeOf(getComputedStyle(g.el).getPropertyValue("--pg-reels-duration"), PICTURE_MS);
}

/* ---------- The page's sound ---------- */

let sound = false;

function setSound(on: boolean): void {
    sound = on;
    document.querySelectorAll<HTMLVideoElement>(`[${CLIP}] video`).forEach((v) => (v.muted = !on));
    document.querySelectorAll<HTMLElement>(`[${SOUND}]`).forEach((b) => b.setAttribute("aria-pressed", String(on)));
    document.querySelectorAll<HTMLElement>(`[${ROOT}]`).forEach((r) => r.toggleAttribute(SOUND_ON, on));
}

/* ---------- Copies for the full view ---------- */

/* A copy of the site's markup for the full view: no ids — they stay
   unique — and none of this file's marks. */
function copyOf(el: Element): HTMLElement {
    const copy = el.cloneNode(true) as HTMLElement;
    [copy, ...copy.querySelectorAll<HTMLElement>("*")].forEach((x) => {
        x.removeAttribute("id");
        [CURRENT, PLAYING, DONE].forEach((name) => x.removeAttribute(name));
    });
    copy.querySelectorAll(`[${DETAIL}]`).forEach((t) => t.remove());
    return copy;
}

const svg = (paths: string): string =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
const ICONS = {
    soundOff: '<path d="M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6"/>',
    soundOn: '<path d="M4 9h4l5-4v14l-5-4H4zM17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12"/>',
    pause: '<path d="M8 5v14M16 5v14"/>',
    play: '<path d="M7 5v14l12-7z"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    up: '<path d="m6 15 6-6 6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
};

/* ---------- One group ---------- */

function partsOf(el: HTMLElement, root: HTMLElement): Group {
    const own = (x: Element): boolean => x.closest(`[${GROUP}]`) === el;
    const clips = [...el.querySelectorAll<HTMLElement>(`[${CLIP}]`)].filter(own);
    const products = [...el.querySelectorAll<HTMLElement>(`[${PRODUCT}]`)].filter(own);
    const holder = [...el.querySelectorAll<HTMLElement>(`[${BARS}]`)].find(own);
    // One bar a clip — made here, in the empty holder, once.
    let bars: HTMLElement[] = [];
    if (holder) {
        if (holder.children.length !== clips.length) {
            holder.replaceChildren(
                ...clips.map((_, i) => {
                    const bar = document.createElement("button");
                    bar.type = "button";
                    bar.setAttribute(BAR, "");
                    bar.setAttribute("aria-label", `Clip ${i + 1} of ${clips.length}`);
                    bar.append(document.createElement("span"));
                    return bar;
                }),
            );
        }
        bars = [...holder.children] as HTMLElement[];
    }
    const current = clips.findIndex((c) => c.hasAttribute(CURRENT));
    return { el, root, clips, products, bars, at: Math.max(0, current), ratio: 0, shown: 0, since: 0 };
}

/* Show clip `i` of the group: its clip, its product, its bar. */
function show(g: Group, i: number): void {
    const n = g.clips.length;
    if (!n) return;
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
        if (k === g.at) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
        b.style.setProperty(PROGRESS, k < g.at ? "1" : "0");
    });
}

/* ---------- Everything on the page ---------- */

let live: object | null = null;

/* Start watching every reels section on the page, those rendered later
   too; returns the cleanup for a React effect. Only the newest call
   answers. */
export function initReels(): () => void {
    if (typeof document === "undefined") return () => {};
    const self = {};
    live = self;

    const groups = new Map<HTMLElement, Group>();
    let playing: Group | null = null;
    let frame = 0;

    // Which group plays: the one most in sight, over IN_SIGHT.
    const sights =
        typeof IntersectionObserver === "undefined"
            ? null
            : new IntersectionObserver(
                  (entries) => {
                      entries.forEach((e) => {
                          const g = groups.get(e.target.closest<HTMLElement>(`[${GROUP}]`)!);
                          if (g) g.ratio = e.isIntersecting ? e.intersectionRatio : 0;
                      });
                      choose();
                  },
                  { threshold: [0, 0.25, 0.5, 0.6, 0.75, 0.9, 1] },
              );

    const choose = (): void => {
        if (live !== self || view.open) return;
        let best: Group | null = null;
        groups.forEach((g) => {
            if (g.ratio >= IN_SIGHT && (!best || g.ratio > best.ratio)) best = g;
        });
        if (best !== playing) {
            if (playing) stop(playing);
            playing = best;
            if (playing) start(playing);
        }
    };

    const start = (g: Group): void => {
        g.el.setAttribute(PLAYING, "");
        if (reduced()) return;
        const clip = g.clips[g.at];
        const v = videoOf(clip);
        g.since = performance.now();
        if (v) {
            v.muted = !sound;
            v.preload = "auto";
            v.play().catch(() => {});
        }
        tick();
    };
    const stop = (g: Group): void => {
        g.el.removeAttribute(PLAYING);
        const clip = g.clips[g.at];
        videoOf(clip)?.pause();
        // A picture keeps the time it has shown.
        g.shown += performance.now() - g.since;
    };

    // One frame loop, for the group that plays: its bar fills; a picture
    // whose time is up, or a video ended, is the next clip.
    const tick = (): void => {
        if (frame) return;
        frame = requestAnimationFrame(function step(now) {
            frame = 0;
            const g = playing;
            if (live !== self || !g || reduced()) return;
            const clip = g.clips[g.at];
            const v = videoOf(clip);
            let progress: number;
            if (v) progress = v.duration ? v.currentTime / v.duration : 0;
            else progress = (g.shown + now - g.since) / Math.max(1, pictureTime(g, clip));
            g.bars[g.at]?.style.setProperty(PROGRESS, String(Math.min(1, progress)));
            if (!v && progress >= 1) next(g);
            frame = requestAnimationFrame(step);
        });
    };

    const next = (g: Group): void => {
        show(g, g.at + 1);
        if (g === playing) start(g);
    };

    // A video that ends: the next clip.
    const onEnded = (event: Event): void => {
        const clip = (event.target as Element).closest<HTMLElement>(`[${CLIP}]`);
        const g = clip && groups.get(clip.closest<HTMLElement>(`[${GROUP}]`)!);
        if (g && g.clips[g.at] === clip) next(g);
    };

    // The strip's ends: data-pg-reels-start / -end on the section.
    const ends = (root: HTMLElement): void => {
        const strip = root.querySelector<HTMLElement>(`[${STRIP}]`);
        if (!strip) return;
        root.toggleAttribute(START, strip.scrollLeft <= 1);
        root.toggleAttribute(END, strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 1);
    };
    const onScroll = (event: Event): void => {
        const strip = event.target as HTMLElement;
        if (strip instanceof HTMLElement && strip.hasAttribute(STRIP)) ends(strip.closest<HTMLElement>(`[${ROOT}]`)!);
    };

    // Look round the page: every group, its parts.
    const look = (): void => {
        if (live !== self) return;
        const now = new Set<HTMLElement>();
        document.querySelectorAll<HTMLElement>(`[${ROOT}]`).forEach((root) => {
            root.querySelectorAll<HTMLElement>(`[${GROUP}]`).forEach((el) => {
                if (el.closest(`[${ROOT}]`) !== root) return;
                now.add(el);
                if (groups.has(el)) return;
                const g = partsOf(el, root);
                groups.set(el, g);
                show(g, g.at);
                const card = el.querySelector<HTMLElement>(`[${CARD}]`) ?? el;
                sights?.observe(card);
            });
            ends(root);
            root.toggleAttribute(SOUND_ON, sound);
        });
        groups.forEach((g, el) => {
            if (now.has(el)) return;
            if (g === playing) {
                stop(g);
                playing = null;
            }
            groups.delete(el);
        });
        document.querySelectorAll<HTMLVideoElement>(`[${CLIP}] video`).forEach((v) => (v.muted = !sound));
        if (!sights) {
            // No observer: the first plays.
            const first = groups.values().next().value as Group | undefined;
            if (first && !playing) {
                first.ratio = 1;
                choose();
            }
        }
    };

    // Presses: a bar, the sound, the arrows, the card.
    const onClick = (event: MouseEvent): void => {
        if (live !== self || !(event.target instanceof Element)) return;
        const t = event.target;

        const bar = t.closest<HTMLElement>(`[${BAR}]`);
        if (bar) {
            const g = groups.get(bar.closest<HTMLElement>(`[${GROUP}]`)!);
            if (!g) return;
            const was = g === playing;
            show(g, g.bars.indexOf(bar));
            if (was) start(g);
            return;
        }

        if (t.closest(`[${SOUND}]`)) {
            setSound(!sound);
            const g = groups.get(t.closest<HTMLElement>(`[${GROUP}]`)!);
            // Sound on for a card not playing: it plays now.
            if (g && sound && g !== playing) {
                if (playing) stop(playing);
                playing = g;
                start(g);
            } else if (playing) videoOf(playing.clips[playing.at])?.play().catch(() => {});
            return;
        }

        const arrow = t.closest<HTMLElement>(`[${PREV}], [${NEXT}]`);
        if (arrow) {
            const id = arrow.getAttribute("aria-controls");
            const strip = (id ? document.getElementById(id) : null) ?? arrow.closest(`[${ROOT}]`)?.querySelector<HTMLElement>(`[${STRIP}]`);
            const first = strip?.querySelector<HTMLElement>(`[${GROUP}]`);
            if (!strip || !first) return;
            const gap = px(getComputedStyle(strip).columnGap);
            const by = first.getBoundingClientRect().width + gap;
            strip.scrollBy({ left: arrow.hasAttribute(NEXT) ? by : -by, behavior: reduced() ? "instant" : "smooth" });
            return;
        }

        // The card — not a link or a button of its own — or its open
        // button: the full view's to show.
        const openButton = t.closest(`[${OPEN}]`);
        const card = t.closest<HTMLElement>(`[${CARD}]`);
        if (!openButton && (!card || t.closest("a, button, input, select, textarea"))) return;
        const groupEl = (openButton ?? card)!.closest<HTMLElement>(`[${GROUP}]`);
        const g = groupEl && groups.get(groupEl);
        if (!g) return;
        const asked = new CustomEvent("pg-reels:open", { bubbles: true, cancelable: true, detail: { group: g.el, clip: g.at } });
        if (g.root.dispatchEvent(asked)) openView(g, g.at);
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
        <div data-pg-reels-stage>
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
                        </div>
                    </div>
                </div>
            </div>
            <div data-pg-reels-view-steps>
                <button type="button" data-pg-reels-view-up aria-label="Previous reel">${svg(ICONS.up)}</button>
                <button type="button" data-pg-reels-view-down aria-label="Next reel">${svg(ICONS.down)}</button>
            </div>
            <aside data-pg-reels-panel>
                <button type="button" data-pg-reels-panel-close aria-label="Close">${svg(ICONS.close)}</button>
                <div data-pg-reels-panel-band>
                    <div data-pg-reels-panel-summary></div>
                    <button type="button" data-pg-reels-panel-toggle aria-expanded="false">Details ${svg(ICONS.up)}</button>
                </div>
                <div data-pg-reels-panel-detail></div>
            </aside>
        </div>`;
    const part = (name: string): HTMLElement => dialog.querySelector<HTMLElement>(`[data-pg-reels-${name}]`)!;
    const media = part("view-media");
    const viewBars = part("view-bars");
    const playButton = part("view-play");
    const upButton = part("view-up") as HTMLButtonElement;
    const downButton = part("view-down") as HTMLButtonElement;
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
        list: [] as Group[],
        gi: 0,
        ci: 0,
        paused: false,
        held: false,
        shown: 0,
        since: 0,
        pushed: false,
        frame: 0,
    };
    const viewVideo = (): HTMLVideoElement | null => media.querySelector("video");
    const current = (): Group => view.list[view.gi];

    // Show the view's clip — `dir` 1 or -1 slides it in from below or
    // above — with its head, bars and product.
    const render = (dir: number): void => {
        const g = current();
        const n = g.clips.length;
        const clip = g.clips[view.ci];
        viewVideo()?.pause();

        const head = g.el.querySelector(`[${HEAD}]`);
        part("view-head").replaceChildren(...(head ? [copyOf(head)] : []));

        viewBars.replaceChildren(
            ...g.clips.map((_, i) => {
                const bar = document.createElement("button");
                bar.type = "button";
                bar.setAttribute(VIEW_BAR, "");
                bar.setAttribute("aria-label", `Clip ${i + 1} of ${n}`);
                bar.append(document.createElement("span"));
                bar.toggleAttribute(DONE, i < view.ci);
                if (i === view.ci) bar.setAttribute("aria-current", "true");
                bar.style.setProperty(PROGRESS, i < view.ci ? "1" : "0");
                return bar;
            }),
        );
        viewBars.hidden = n < 2;

        const copy = copyOf(clip);
        const v = copy.querySelector("video");
        if (v) {
            v.muted = !sound;
            v.preload = "auto";
            v.loop = false;
        }
        media.replaceChildren(copy);
        if (dir && !reduced()) media.animate({ transform: [`translateY(${dir * 100}%)`, "none"] }, { duration: 320, easing: "cubic-bezier(0.2, 0, 0, 1)" });

        const product = g.products[view.ci];
        part("panel-summary").replaceChildren(...(product ? [copyOf(product)] : []));
        // The details: in the product, or in the clip — a <template>, or
        // any element kept hidden (React: a <template>'s markup is not
        // hydrated, and a link cannot sit inside the product's link but
        // in a template). A template parsed from HTML keeps its markup in
        // .content; one rendered by script holds it as children.
        const detail = product?.querySelector(`[${DETAIL}]`) ?? clip.querySelector(`[${DETAIL}]`);
        const from: ParentNode | null = detail instanceof HTMLTemplateElement && detail.content.childNodes.length ? detail.content : detail;
        part("panel-detail").replaceChildren(...(from ? [...from.childNodes].map((n) => n.cloneNode(true)) : []));
        dialog.toggleAttribute(NO_PRODUCT, !product);

        upButton.disabled = view.gi === 0;
        downButton.disabled = view.gi === view.list.length - 1;
        view.shown = 0;
        view.since = performance.now();
        playView();
    };

    const playView = (): void => {
        const v = viewVideo();
        const still = view.paused || view.held;
        dialog.toggleAttribute(PAUSED, view.paused);
        playButton.setAttribute("aria-label", view.paused ? "Play" : "Pause");
        if (still) {
            v?.pause();
            return;
        }
        view.since = performance.now();
        v?.play().catch(() => {});
        tickView();
    };
    const holdView = (): void => {
        viewVideo()?.pause();
        view.shown += performance.now() - view.since;
    };
    const tickView = (): void => {
        if (view.frame) return;
        view.frame = requestAnimationFrame(function step(now) {
            view.frame = 0;
            if (!view.open || view.paused || view.held) return;
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

    // Within a group, and on to the next — after the last group, the first.
    const nextClip = (auto = false): void => {
        if (view.ci < current().clips.length - 1) {
            view.ci += 1;
            render(0);
        } else nextGroup(auto);
    };
    const prevClip = (): void => {
        if (view.ci > 0) {
            view.ci -= 1;
            render(0);
        } else if (view.gi > 0) {
            view.gi -= 1;
            view.ci = current().clips.length - 1;
            render(-1);
        } else {
            view.ci = 0;
            render(0);
        }
    };
    const nextGroup = (wrap = false): void => {
        if (view.gi < view.list.length - 1) view.gi += 1;
        else if (wrap) view.gi = 0;
        else return;
        view.ci = 0;
        render(1);
    };
    const prevGroup = (): void => {
        if (view.gi === 0) return;
        view.gi -= 1;
        view.ci = 0;
        render(-1);
    };

    const openView = (g: Group, clip: number): void => {
        if (playing) {
            stop(playing);
            playing = null;
        }
        // Every group of its section, in the page's order.
        view.list = [...groups.values()].filter((x) => x.root === g.root).sort((a, b) => (a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
        view.gi = view.list.indexOf(g);
        view.ci = clip;
        view.open = true;
        // Reduced motion: it waits for its play button.
        view.paused = reduced();
        view.held = false;
        dialog.removeAttribute(DETAILS);
        toggle.setAttribute("aria-expanded", "false");
        if (!dialog.open) dialog.showModal();
        dialog.focus({ preventScroll: true });
        try {
            history.pushState({ ...(history.state ?? {}), pgReels: true }, "");
            view.pushed = true;
        } catch {
            view.pushed = false;
        }
        render(0);
    };

    // Closed: the card it came from shows the clip last seen; the strip
    // plays again. A Back step of its own is taken back — unless Back
    // closed it.
    const closeView = (byBack = false): void => {
        if (!view.open) return;
        view.open = false;
        viewVideo()?.pause();
        if (view.frame) cancelAnimationFrame(view.frame);
        view.frame = 0;
        const g = current();
        if (g) show(g, view.ci);
        if (dialog.open) dialog.close();
        media.replaceChildren();
        if (view.pushed && !byBack) history.back();
        view.pushed = false;
        choose();
    };

    const onViewClick = (event: MouseEvent): void => {
        if (!(event.target instanceof Element)) return;
        const t = event.target;
        if (swallow) {
            swallow = false;
            event.preventDefault();
            return;
        }
        // The dark around it.
        if (t === dialog || t.hasAttribute("data-pg-reels-stage")) return closeView();
        if (t.closest("[data-pg-reels-view-close], [data-pg-reels-panel-close]")) return closeView();
        if (t.closest("[data-pg-reels-view-on]")) return nextClip();
        if (t.closest("[data-pg-reels-view-back]")) return prevClip();
        if (t.closest("[data-pg-reels-view-up]")) return prevGroup();
        if (t.closest("[data-pg-reels-view-down]")) return nextGroup();
        const bar = t.closest<HTMLElement>(`[${VIEW_BAR}]`);
        if (bar) {
            view.ci = [...viewBars.children].indexOf(bar);
            return render(0);
        }
        if (t.closest("[data-pg-reels-view-play]")) {
            view.paused = !view.paused;
            if (view.paused) holdView();
            return playView();
        }
        if (t.closest("[data-pg-reels-panel-toggle]")) {
            const open = !dialog.hasAttribute(DETAILS);
            dialog.toggleAttribute(DETAILS, open);
            toggle.setAttribute("aria-expanded", String(open));
            return;
        }
        // A small picture of the product, pressed: shown big.
        const thumb = t.closest<HTMLElement>(`[${THUMB}]`);
        if (thumb) {
            const detail = thumb.closest("[data-pg-reels-panel-detail]");
            const big = detail?.querySelector<HTMLImageElement>(`[${BIG}] img, img[${BIG}]`);
            const src = thumb.getAttribute(THUMB) || thumb.querySelector("img")?.src;
            if (big && src) big.src = src;
            detail?.querySelectorAll(`[${THUMB}]`).forEach((x) => x.toggleAttribute(CURRENT, x === thumb));
        }
    };
    dialog.addEventListener("click", onViewClick);
    dialog.addEventListener("cancel", (event) => {
        event.preventDefault();
        closeView();
    });
    // A video that ends in the view: the next clip.
    media.addEventListener("ended", () => nextClip(true), true);

    // Held down: still. Swiped up or down: the next group or the one
    // before. A press that was either is no tap.
    let press: { id: number; x: number; y: number; t: number; timer: number } | null = null;
    let swallow = false;
    const screen = part("screen");
    screen.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || (event.target as Element).closest("button:not([data-pg-reels-view-on]):not([data-pg-reels-view-back]), a")) return;
        const timer = window.setTimeout(() => {
            view.held = true;
            dialog.setAttribute(HELD, "");
            holdView();
            playView();
        }, HOLD_MS);
        press = { id: event.pointerId, x: event.clientX, y: event.clientY, t: event.timeStamp, timer };
    });
    const release = (event: PointerEvent): void => {
        if (!press || press.id !== event.pointerId) return;
        clearTimeout(press.timer);
        const dx = event.clientX - press.x;
        const dy = event.clientY - press.y;
        const wasHeld = view.held;
        press = null;
        if (wasHeld) {
            view.held = false;
            dialog.removeAttribute(HELD);
            swallow = true;
            setTimeout(() => (swallow = false));
            playView();
            return;
        }
        if (event.type === "pointerup" && Math.abs(dy) > SWIPE_PX && Math.abs(dy) > Math.abs(dx)) {
            swallow = true;
            setTimeout(() => (swallow = false));
            if (dy < 0) nextGroup();
            else prevGroup();
        }
    };
    screen.addEventListener("pointerup", release);
    screen.addEventListener("pointercancel", release);
    screen.addEventListener("pointermove", (event) => {
        // A drag is no hold.
        if (press && press.id === event.pointerId && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 10) clearTimeout(press.timer);
    });

    // A wheel, a trackpad: a step per turn, then a rest.
    let wheelSum = 0;
    let wheelRest = 0;
    dialog.addEventListener(
        "wheel",
        (event) => {
            if ((event.target as Element).closest("[data-pg-reels-panel]")) return;
            event.preventDefault();
            if (event.timeStamp < wheelRest) return;
            wheelSum += event.deltaY;
            if (Math.abs(wheelSum) < WHEEL_PX) return;
            if (wheelSum > 0) nextGroup();
            else prevGroup();
            wheelSum = 0;
            wheelRest = event.timeStamp + WHEEL_REST_MS;
        },
        { passive: false },
    );

    dialog.addEventListener("keydown", (event) => {
        if (!view.open || event.altKey || event.ctrlKey || event.metaKey) return;
        const onControl = (event.target as Element).closest("button, a, input, textarea, select");
        if (event.key === "ArrowDown" || event.key === "PageDown") nextGroup();
        else if (event.key === "ArrowUp" || event.key === "PageUp") prevGroup();
        else if (event.key === "ArrowRight") nextClip();
        else if (event.key === "ArrowLeft") prevClip();
        else if ((event.key === " " || event.key === "k") && !onControl) {
            view.paused = !view.paused;
            if (view.paused) holdView();
            playView();
        } else return;
        event.preventDefault();
    });

    // Back closes it.
    const onPop = (): void => {
        if (view.open) {
            view.pushed = false;
            closeView(true);
        }
    };
    addEventListener("popstate", onPop);

    // Rendered later — React, a list that arrives — or taken away.
    const mo = new MutationObserver((records) => {
        if (records.some((r) => [...r.addedNodes, ...r.removedNodes].some((n) => n instanceof Element && (n.matches(`[${ROOT}], [${GROUP}]`) || !!n.querySelector(`[${GROUP}]`))))) look();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("click", onClick);
    document.addEventListener("ended", onEnded, true);
    document.addEventListener("scroll", onScroll, true);
    const onResize = (): void => document.querySelectorAll<HTMLElement>(`[${ROOT}]`).forEach(ends);
    addEventListener("resize", onResize);
    const onHidden = (): void => {
        if (view.open) {
            if (document.hidden) holdView();
            else playView();
            return;
        }
        if (!playing) return;
        if (document.hidden) stop(playing);
        else start(playing);
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
        if (frame) cancelAnimationFrame(frame);
        if (playing) stop(playing);
        removeEventListener("popstate", onPop);
        if (view.open) closeView();
        bandSize.disconnect();
        dialog.remove();
        if (live === self) live = null;
    };
}
