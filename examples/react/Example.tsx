"use client";

import { useEffect, type CSSProperties } from "react";
import { initReels } from "@plusguard/reels";
import "@plusguard/reels/index.css";

/*
 * Next (App Router). Mount once, high in the tree — the root layout:
 *
 *   <body>
 *       <ReelsInit />
 *       {children}
 *   </body>
 *
 * It watches every reels section on the page, those rendered later too — a
 * route change, a list that arrives. React's markup is never moved: the
 * package writes its marks (data-pg-reels-current, -playing…) as
 * attributes, fills the empty data-pg-reels-bars, and builds the full view
 * on <body> from copies. Called again before the first cleanup runs (React
 * remounting in development), only the newest call answers.
 */
export function ReelsInit() {
    useEffect(() => initReels(), []);

    // The full view about to open: here, counted. preventDefault() on it
    // and the package opens nothing — the site's own view instead.
    useEffect(() => {
        const onOpen = (e: Event) => {
            const { group, clip } = (e as CustomEvent<{ group: HTMLElement; clip: number }>).detail;
            navigator.sendBeacon?.("/api/reels/opened", JSON.stringify({ reel: group.dataset.reel, clip }));
        };
        document.addEventListener("pg-reels:open", onOpen);
        return () => document.removeEventListener("pg-reels:open", onOpen);
    }, []);

    return null;
}

/*
 * The data — from your CMS, say. A reel is a group of clips; each clip a
 * video (with its poster) or a picture shown for `duration` ms, and each
 * clip with its own product.
 */
type Product = {
    name: string;
    category: { name: string; href: string };
    price: string;
    href: string;
    image: string;
    images: string[]; // the details' pictures, the first shown big
    about?: string;
};
type Clip = ({ video: string; poster: string } | { image: string; duration?: number }) & {
    caption: string;
    product: Product;
};
type Reel = {
    id: string;
    account: { name: string; avatar: string; profile: string };
    clips: Clip[];
};

/* Settings are CSS variables: a style prop here, a class or a media query
   in a stylesheet just the same — --pg-reels-show: 1.5 on a phone. */
type Vars = CSSProperties & Record<`--pg-reels${string}`, string | number>;

export function Reels({ reels, label = "Reels" }: { reels: Reel[]; label?: string }) {
    return (
        <section data-pg-reels className="reels" aria-label={label} style={{ "--pg-reels-gap": "1rem" } as Vars}>
            <button type="button" className="arrow" data-pg-reels-prev aria-controls="reels-strip" aria-label="Previous">
                <Icon d="m15 5-7 7 7 7" />
            </button>
            <div data-pg-reels-strip id="reels-strip">
                {reels.map((reel) => (
                    <article key={reel.id} data-pg-reels-group data-reel={reel.id}>
                        <div data-pg-reels-card>
                            {reel.clips.map((clip, i) => (
                                <ClipView key={i} clip={clip} />
                            ))}
                            <header className="reel-head" data-pg-reels-head>
                                <span className="pg-imageGroup avatar">
                                    <img src={reel.account.avatar} alt="" />
                                </span>
                                <span className="who">
                                    <b>{reel.account.name}</b>
                                    <a href={reel.account.profile} target="_blank" rel="noopener" className="follow">
                                        Follow
                                    </a>
                                </span>
                            </header>
                            <div className="reel-tools">
                                <button type="button" data-pg-reels-sound aria-pressed="false" aria-label="Sound">
                                    <Icon className="is-off" d="M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6" />
                                    <Icon className="is-on" d="M4 9h4l5-4v14l-5-4H4zM17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />
                                </button>
                                <button type="button" data-pg-reels-open aria-label="Enlarge">
                                    <Icon d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                                </button>
                            </div>
                        </div>
                        {/* Empty: the package writes a bar a clip. */}
                        <div data-pg-reels-bars />
                        <div data-pg-reels-products>
                            {reel.clips.map(({ product }, i) => (
                                <a key={i} data-pg-reels-product href={product.href}>
                                    <span className="pg-imageGroup">
                                        <img src={product.image} alt="" loading="lazy" />
                                    </span>
                                    <span>
                                        <b>{product.name}</b>
                                        <small>{product.category.name}</small>
                                    </span>
                                    <span className="go" aria-hidden="true">
                                        →
                                    </span>
                                </a>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
            <button type="button" className="arrow" data-pg-reels-next aria-controls="reels-strip" aria-label="Next">
                <Icon d="m9 5 7 7-7 7" />
            </button>
        </section>
    );
}

/*
 * A clip, and its product's details for the full view. In plain HTML the
 * details are a <template data-pg-reels-detail> in the product; in React
 * they are an element kept hidden, in the clip — a <template>'s markup is
 * not hydrated by React, and the details' own link cannot sit inside the
 * product's link. index.css keeps it hidden; the full view copies what is
 * inside it.
 */
function ClipView({ clip }: { clip: Clip }) {
    const { product } = clip;
    return (
        <figure data-pg-reels-clip data-pg-reels-duration={"image" in clip && clip.duration ? `${clip.duration}ms` : undefined}>
            {"video" in clip ? (
                <video src={clip.video} poster={clip.poster} muted playsInline preload="none" />
            ) : (
                <img src={clip.image} alt="" loading="lazy" />
            )}
            <figcaption>
                {/* The product's category: a tag on the video in the full view, a
                    line over the caption on the card (the site's CSS). */}
                <a className="tag" href={product.category.href}>
                    <Icon d="M6 8h12l-1 12H7zM9 8a3 3 0 0 1 6 0" />
                    {product.category.name}
                </a>
                <small>{product.category.name}</small>
                {clip.caption}
            </figcaption>
            <div data-pg-reels-detail hidden>
                <div className="detail">
                    <a className="detail-cat" href={product.category.href}>
                        {product.category.name}
                    </a>
                    <h2 data-pg-reels-title>{product.name}</h2>
                    <div className="pg-imageGroup detail-big" data-pg-reels-big>
                        <img src={product.images[0]} alt="" loading="lazy" />
                    </div>
                    <div className="detail-thumbs">
                        {product.images.map((src, i) => (
                            <button
                                key={src}
                                type="button"
                                className="pg-imageGroup"
                                data-pg-reels-thumb={src}
                                data-pg-reels-current={i === 0 ? "" : undefined}
                                aria-label={`Picture ${i + 1}`}
                            >
                                <img src={src} alt="" loading="lazy" />
                            </button>
                        ))}
                    </div>
                    <p className="detail-price">{product.price}</p>
                    <p className="detail-name">{product.name}</p>
                    {product.about && <p className="detail-blurb">{product.about}</p>}
                    <a className="detail-go" href={product.href}>
                        Go to product →
                    </a>
                </div>
            </div>
        </figure>
    );
}

function Icon({ d, className }: { d: string; className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path d={d} />
        </svg>
    );
}

/* For example: */
export const reels: Reel[] = [
    {
        id: "studio",
        account: { name: "plusguard", avatar: "/media/avatar-plusguard.jpg", profile: "https://www.instagram.com/" },
        clips: [
            {
                video: "/media/bubbles.mp4",
                poster: "/media/bubbles-poster.jpg",
                caption: "Blown by hand, one at a time",
                product: {
                    name: "Glass pour-over carafe",
                    category: { name: "Kitchen", href: "/kitchen" },
                    price: "$34",
                    href: "/products/carafe",
                    image: "/media/story-mist.jpg",
                    images: ["/media/story-mist.jpg", "/media/story-river.jpg", "/media/story-field.jpg"],
                    about: "Mouth-blown borosilicate, 600 ml.",
                },
            },
            {
                image: "/media/story-river.jpg",
                duration: 6000,
                caption: "Packed for the river",
                product: {
                    name: "Linen shirt, relaxed",
                    category: { name: "Clothing", href: "/clothing" },
                    price: "$58",
                    href: "/products/linen-shirt",
                    image: "/media/story-river.jpg",
                    images: ["/media/story-river.jpg", "/media/story-canoe.jpg"],
                },
            },
        ],
    },
];
