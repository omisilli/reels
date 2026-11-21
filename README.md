# reels

Shoppable reels for a store: a strip of video cards on the page — each card
a group of clips, each clip with its own product — that opens into a full
view. No dependencies.

> **Work in progress.** This first part is the strip on the page. The full
> view — up and down between groups, left and right within one, the product
> beside the video on a computer and under it on a phone — comes next.

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
                <header><!-- avatar, name, a Follow link --></header>
                <button data-pg-reels-sound aria-pressed="false" aria-label="Sound">…</button>
                <button data-pg-reels-open aria-label="Enlarge">…</button>
            </div>
            <div data-pg-reels-bars></div>
            <div data-pg-reels-products>
                <a data-pg-reels-product href="/carafe">…</a>
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
the product's look are yours; the package only marks and moves.

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
  `data-pg-reels-open`: the event `pg-reels:open` on the section, with
  `detail.group` and `detail.clip`. The full view will answer it.
- **Reduced motion:** nothing plays by itself; a bar pressed shows its clip.

## CSS

| Variable | Default | What |
| -------- | ------- | ---- |
| `--pg-reels-show` | `4` | Cards across the strip; a fraction shows part of the next — `1.5` on a phone: one card and half the next |
| `--pg-reels-gap` | `1rem` | Between the cards |
| `--pg-reels-ratio` | `9 / 16` | The card's shape |
| `--pg-reels-duration` | `5s` | A picture's time |

The card holds the shape, the clip fills it — the house way for pictures
and videos: the box has the shape, what is inside is 100% of it.

## Example

[`examples/static/index.html`](examples/static/index.html) — six groups of
one to three clips, videos and pictures, each clip with a product. The
pictures are from stories' example; the video is stories' too.
