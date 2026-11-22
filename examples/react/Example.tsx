"use client";

import { useEffect, type CSSProperties } from "react";
import { initReels, forgetReelsSeen } from "@plusguard/reels";
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

/* Every ring bright again, at once — no reload. */
export function ForgetSeen({ className }: { className?: string }) {
    return (
        <button type="button" className={className} onClick={forgetReelsSeen}>
            Forget what was seen
        </button>
    );
}

/*
 * The data — from your CMS, say (see data.ts: the static example's six
 * groups). A reel is a group of clips; each clip a video (with its poster)
 * or a picture shown for `duration` ms, and each clip with its own product
 * — or a category in its place.
 */
export type Variant = { id: string; label: string; price: string; href: string; images: string[] };
export type Product = {
    name: string; // under the card; "Marine Enginar Salatası, 425 g"
    fullName?: string; // under the price, when it differs from the name
    category: { name: string; href: string }; // heads the panel
    href: string;
    image: string; // under the card
    price?: string;
    about?: string;
    images?: string[]; // the details' pictures, the first shown big
    // Weights, colours: each its own pictures, price and page.
    variants?: Variant[];
    fromPrice?: string; // under the card, when there are variants: "from ₺110"
    // A category in the product's place: a few of its products.
    list?: { count: string; items: { name: string; price: string; image: string; href: string }[] };
};
export type Clip = ({ video: string; poster: string } | { image: string; duration?: number }) & {
    caption: string;
    views: { short: string; full: string }; // "12.4K", "12,400" — this clip's, your own count
    product: Product;
};
export type Reel = {
    id: string;
    account: { name: string; avatar: string; profile: string };
    clips: Clip[];
};

/* Settings are CSS variables: a style prop here, a class or a media query
   in a stylesheet just the same — --pg-reels-show: 1.5 on a phone. */
export type Vars = CSSProperties & Record<`--pg-reels${string}`, string | number>;

export function Reels({ reels, label = "Reels", style }: { reels: Reel[]; label?: string; style?: Vars }) {
    return (
        <section data-pg-reels className="reels" aria-label={label} style={style}>
            <button type="button" className="arrow" data-pg-reels-prev aria-controls="reels-strip" aria-label="Previous">
                <Icon d="m15 5-7 7 7 7" />
            </button>
            <div data-pg-reels-strip id="reels-strip">
                {reels.map((reel) => (
                    // data-pg-reels-id: what was seen is remembered by it.
                    <article key={reel.id} data-pg-reels-group data-pg-reels-id={reel.id} data-reel={reel.id}>
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
                            {/* The top right: the sound and the full view's button, the view
                                count under them — one a clip, in order: the playing clip's shows. */}
                            <div className="reel-tools">
                                {reel.clips.map(({ views }, i) => (
                                    <span key={i} className="views" data-pg-reels-views aria-label={`${views.full} views`}>
                                        {views.short}
                                        {/* An eye, after the number: the pupil filled, a glint in it. */}
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M1.75 12C3.9 7.6 7.6 5 12 5s8.1 2.6 10.25 7C20.1 16.4 16.4 19 12 19S3.9 16.4 1.75 12z" />
                                            <path className="pupil" d="M12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5zM10.6 9.7a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
                                        </svg>
                                    </span>
                                ))}
                                <button type="button" data-pg-reels-open aria-label="Enlarge">
                                    <Icon d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                                </button>
                                <button type="button" data-pg-reels-sound aria-pressed="false" aria-label="Sound">
                                    <Icon className="is-off" d="M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6" />
                                    <Icon className="is-on" d="M4 9h4l5-4v14l-5-4H4zM17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />
                                </button>
                            </div>
                        </div>
                        {/* Empty: the package writes a bar a clip. */}
                        <div data-pg-reels-bars />
                        <div data-pg-reels-products>
                            {reel.clips.map(({ product }, i) => (
                                <a key={i} data-pg-reels-product href={product.href} target="_blank" rel="noopener">
                                    <span className="pg-imageGroup">
                                        <img src={product.image} alt="" loading="lazy" />
                                    </span>
                                    <span>
                                        <span className="label">In the video</span>
                                        {/* Two lines' room for the name in the site's CSS (line-clamp: 2). */}
                                        <b>{product.name}</b>
                                        <small>
                                            <span className="price">{product.list ? product.list.count : (product.fromPrice ?? product.price)}</span>
                                        </small>
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
                {/* The category: a tag on the video in the full view, a line
                    over the caption on the card (the site's CSS). */}
                <a className="tag" href={product.category.href} target="_blank" rel="noopener">
                    <Icon d="M6 8h12l-1 12H7zM9 8a3 3 0 0 1 6 0" />
                    {product.category.name}
                </a>
                <small>{product.category.name}</small>
                {clip.caption}
            </figcaption>
            <div data-pg-reels-detail hidden>
                <Detail product={product} />
            </div>
        </figure>
    );
}

/* The details: the panel beside the video, the sheet under it on a phone. */
function Detail({ product }: { product: Product }) {
    const { variants, list } = product;
    return (
        <div className="detail">
            {/* Heads the panel; the name is under the price. */}
            <a className="detail-cat" data-pg-reels-title href={product.category.href} target="_blank" rel="noopener">
                {product.category.name}
            </a>
            {list && <p className="detail-count">{list.count}</p>}
            {variants ? (
                // One gallery a variant; the package shows the chosen one's.
                variants.map((v, i) => (
                    <div key={v.id} data-pg-reels-gallery={v.id} data-pg-reels-current={i === 0 ? "" : undefined}>
                        <Gallery images={v.images} />
                    </div>
                ))
            ) : list ? (
                <div className="pg-imageGroup detail-big">
                    <img src={product.image} alt="" loading="lazy" />
                </div>
            ) : (
                <Gallery images={product.images ?? [product.image]} />
            )}
            {variants ? (
                <>
                    <p className="detail-price" data-pg-reels-price>
                        {variants[0].price}
                    </p>
                    <div className="detail-variants" role="group" aria-label="Variant">
                        {variants.map((v, i) => (
                            <button
                                key={v.id}
                                type="button"
                                data-pg-reels-variant={v.id}
                                data-pg-reels-variant-price={v.price}
                                data-pg-reels-variant-href={v.href}
                                data-pg-reels-current={i === 0 ? "" : undefined}
                            >
                                {v.label}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                product.price && <p className="detail-price">{product.price}</p>
            )}
            {!list && <p className="detail-name">{product.fullName ?? product.name}</p>}
            {product.about && <p className="detail-blurb">{product.about}</p>}
            {list && (
                <div className="detail-list">
                    {list.items.map((item) => (
                        <a key={item.name} href={item.href} target="_blank" rel="noopener">
                            <span className="pg-imageGroup">
                                <img src={item.image} alt="" loading="lazy" />
                            </span>
                            <b>{item.name}</b>
                            <small>{item.price}</small>
                        </a>
                    ))}
                </div>
            )}
            {/* Pinned to the panel's foot, under what scrolls. */}
            <a className="detail-go" data-pg-reels-foot href={product.href} target="_blank" rel="noopener">
                {list ? "Go to category →" : "Go to product →"}
            </a>
        </div>
    );
}

/* A big picture and the small ones that switch it. */
function Gallery({ images }: { images: string[] }) {
    return (
        <>
            <div className="pg-imageGroup detail-big" data-pg-reels-big>
                <img src={images[0]} alt="" loading="lazy" />
            </div>
            {images.length > 1 && (
                <div className="detail-thumbs">
                    {images.map((src, i) => (
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
            )}
        </>
    );
}

function Icon({ d, className }: { d: string; className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path d={d} />
        </svg>
    );
}
