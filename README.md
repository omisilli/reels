# reels

Shoppable reels for a store: a strip of video cards on the page — each card
a group of clips, each clip with its own product — that opens into a full
view. No dependencies.

```sh
npm install github:omisilli/reels#v1.0.0
```

```ts
import { initReels } from "@plusguard/reels";
import "@plusguard/reels/index.css";

initReels(); // every reels section on the page, those rendered later too
```

### Without a build step

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/omisilli/reels@v1.0.0/index.css" />
<script type="module">
    import { initReels } from "https://cdn.jsdelivr.net/gh/omisilli/reels@v1.0.0/dist/index.js";
    initReels();
</script>
```

## The markup

```html
<section data-pg-reels>
    <button data-pg-reels-prev aria-controls="strip" aria-label="Previous">‹</button>
    <div data-pg-reels-strip id="strip">
        <article data-pg-reels-group>
            <div data-pg-reels-card>
                <figure data-pg-reels-clip>
                    <video src="a.mp4" poster="a.jpg" muted playsinline preload="none"></video>
                    <figcaption><small>Tap to enlarge</small>Blown by hand</figcaption>
                </figure>
                <figure data-pg-reels-clip data-pg-reels-duration="5s">
                    <img src="b.jpg" alt="" />
                    <figcaption>Morning in the studio</figcaption>
                </figure>
                <header data-pg-reels-head><!-- avatar, name, a Follow link --></header>
                <button data-pg-reels-sound aria-pressed="false" aria-label="Sound">…</button>
                <button data-pg-reels-open aria-label="Enlarge">…</button>
            </div>
            <div data-pg-reels-bars></div>
            <div data-pg-reels-products>
                <a data-pg-reels-product href="/carafe">
                    <!-- picture, name, price, an arrow -->
                    <template data-pg-reels-detail>
                        <h2>Glass pour-over carafe</h2>
                        <div class="pg-imageGroup" data-pg-reels-big><img src="carafe-1.jpg" alt="" /></div>
                        <button type="button" class="pg-imageGroup" data-pg-reels-thumb="carafe-1.jpg"><img src="carafe-1.jpg" alt="" /></button>
                        <button type="button" class="pg-imageGroup" data-pg-reels-thumb="carafe-2.jpg"><img src="carafe-2.jpg" alt="" /></button>
                        <p>$34</p>
                        <a href="/carafe">Go to product</a>
                    </template>
                </a>
                <a data-pg-reels-product href="/throw">…</a>
            </div>
        </article>
        <!-- more groups -->
    </div>
    <button data-pg-reels-next aria-controls="strip" aria-label="Next">›</button>
</section>
```

A group is a card and what is under it: its clips, one bar a clip, one
product a clip, in the same order. A clip is a video — with its `poster` —
or a picture shown for a while. The header, the buttons, the caption and
the product's look are yours; the package only marks and moves. The
`<template data-pg-reels-detail>` in a product is its details for the full
view — not shown on the page. It may be any element instead, in the
product or in the clip — `<div data-pg-reels-detail hidden>`; `index.css`
keeps it hidden and the full view copies what is inside. React's way (see
below).

## What it does

- **The card most in sight plays** — only that one, muted. Its clips play
  one after another, round and round, as stories do: a video to its end, a
  picture for `data-pg-reels-duration` (or `--pg-reels-duration`, 5s). The
  bars under the card fill as each plays; a bar pressed is that clip at
  once. Out of sight, nothing plays; the others wait on their posters.
- **The product is the clip's.** The products under a card are one a clip;
  the playing one's shows (`data-pg-reels-current`).
- **Sound is the page's.** A sound button pressed turns sound on for every
  card; the card it is on plays at once.
- **The strip scrolls sideways** — a finger, a wheel, its arrows, one card
  a press. It never moves by itself. `data-pg-reels-start` / `-end` on the
  section while it stands at either end, for the arrows.
- **A card pressed** — anywhere but its own links and buttons — or its
  `data-pg-reels-open`: the full view, on that group and clip. First the
  event `pg-reels:open` on the section, with `detail.group` and
  `detail.clip`; `preventDefault()` on it and the site opens its own.
- **Reduced motion:** nothing plays by itself; a bar pressed shows its clip.

## The full view

A `<dialog>` the package builds on `<body>` — its own buttons and icons;
in it, copies of the site's markup: the clip, the group's
`data-pg-reels-head`, the clip's product and its details.

- **Within a group:** the bars on top (none for a single clip), a press on
  the video's right or left third, → and ←. Its clips play on, a video to
  its end, a picture for its time; after the group's last clip, the next
  group — after the last group, the first.
- **Between groups:** the ↑ ↓ buttons beside the video, a wheel or a
  trackpad, ↑ and ↓ — on a phone, a swipe up or down.
- **Held down** — a finger, the mouse — it stands still, the controls
  out of the way; let go and it goes on. Its play / pause button, Space.
  Sound is the page's: one press for the strip and the view.
- **The product:** on a computer, a panel beside the video — the
  product's `data-pg-reels-detail` template, the site's markup: a
  `data-pg-reels-thumb` pressed puts its picture (the attribute's value, or
  its own `<img>`) into `data-pg-reels-big`, and is
  `data-pg-reels-current`. On a phone the video fills the screen; the
  product, as on the card, is a band at its foot, and a Details button
  above the band's right opens the template under it. A clip without a
  product: no panel.
- **Closing:** its ✕, Esc, the dark around it, the browser's Back (opened,
  it adds a step to the history). The card it came from shows the clip
  last seen; the strip plays again.
- **The page under it** does not scroll (`overflow: hidden` on `<html>`
  while it is open); `data-lenis-prevent` on the view for Lenis.
- **Reduced motion:** it opens still, for its play button.

## CSS

| Variable | Default | What |
| -------- | ------- | ---- |
| `--pg-reels-show` | `4` | Cards across the strip; a fraction shows part of the next — `1.5` on a phone: one card and half the next |
| `--pg-reels-gap` | `1rem` | Between the cards |
| `--pg-reels-ratio` | `9 / 16` | The card's shape |
| `--pg-reels-duration` | `5s` | A picture's time |
| `--pg-reels-panel` | `22rem` | The full view: the product panel's width on a computer |
| `--pg-reels-band` | — | Written by the script on the view: the band's height at a phone's foot (0 on a computer) — to keep a caption above it |

The card holds the shape, the clip fills it — the house way for pictures
and videos: the box has the shape, what is inside is 100% of it.

## Attributes

| Attribute | On | |
| --------- | -- | --- |
| `data-pg-reels` | the section | |
| `data-pg-reels-strip` | the row | Scrolls sideways |
| `data-pg-reels-group` | each group | A card and what is under it |
| `data-pg-reels-card` | the card | The shape; its clips fill it |
| `data-pg-reels-clip` | each clip | A video with its poster, or a picture |
| `data-pg-reels-duration` | a clip | A picture's time — `5s`, `4000ms` |
| `data-pg-reels-head` | in the card | Copied to the full view's top |
| `data-pg-reels-bars` | under the card, empty | Its bars are written here, one a clip |
| `data-pg-reels-product` | one a clip | The clip's product |
| `data-pg-reels-detail` | a `<template>` in a product — or any element, hidden, in the product or the clip | Its details, for the full view |
| `data-pg-reels-big`, `-thumb` | in the template | The big picture; the small ones that switch it |
| `data-pg-reels-sound` | a button | Sound on and off, for the page |
| `data-pg-reels-open` | a button | The full view |
| `data-pg-reels-prev`, `-next` | buttons, `aria-controls` | The strip, a card back or on |
| `data-pg-reels-current` | a clip, a product, a bar, a thumb | Written: the one showing |
| `data-pg-reels-playing` | a group | Written: the one playing |
| `data-pg-reels-start`, `-end` | the section | Written: the strip at either end |
| `data-pg-reels-sound-on` | the section | Written: sound is on |
| `data-pg-reels-viewer` | the `<dialog>` | The full view, built by the script; `-paused`, `-held`, `-details` (phone: details open) and `-no-product` on it |

## React (Next)

```tsx
"use client";

import { useEffect } from "react";
import { initReels } from "@plusguard/reels";

export function ReelsInit() {
    useEffect(() => initReels(), []);
    return null;
}
```

Mount it once, high in the tree; sections and groups rendered later —
a route change, a list that arrives — are taken up too. React's markup is
never moved: the package writes its marks as attributes, fills the empty
`data-pg-reels-bars` that React renders, and builds the full view on
`<body>` from copies. If `initReels` is called again before the first
cleanup runs (React remounting in development), only the newest call
answers.

The details: React does not hydrate what is inside a `<template>`, and the
details' own link cannot sit inside the product's link but in a template.
So in React they go in the clip, as an element kept hidden:

```tsx
<figure data-pg-reels-clip>
    <video src={clip.video} poster={clip.poster} muted playsInline preload="none" />
    <figcaption>{clip.caption}</figcaption>
    <div data-pg-reels-detail hidden>
        {/* title, data-pg-reels-big, data-pg-reels-thumb buttons, price, link */}
    </div>
</figure>
```

Give its pictures `loading="lazy"`: hidden, they load when the full view
shows them. See [`examples/react/Example.tsx`](examples/react/Example.tsx)
— the section from data, and `pg-reels:open` counted.

## Example

[`examples/static/index.html`](examples/static/index.html) — six groups of
one to three clips, videos and pictures, each clip with a product and its
details: a big picture, three small ones, the price, a line about it, a
link. The pictures are from stories' example; the video is stories' too.
