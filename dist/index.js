import { jsx as _jsx } from "react/jsx-runtime";
import { TILES } from "./tiles.js";
export { MOODS, PALETTES, TILES, } from "./tiles.js";
/** This release's tiles on jsDelivr; serve your own copy of tiles/ with `base`. */
export const CDN = "https://cdn.jsdelivr.net/gh/sinbad-io/gradient@v0.1.0/tiles/";
function mulberry32(seed) {
    let t = seed | 0;
    return () => {
        t = (t + 0x6d2b79f5) | 0;
        let x = Math.imul(t ^ (t >>> 15), 1 | t);
        x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
        return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
}
/** A 32-bit hash of a string: the same id is always the same seed. */
export function seedOf(value) {
    let hash = 0;
    for (let i = 0; i < value.length; i++)
        hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
    return hash;
}
/** One seed is one tile, forever. Unfiltered, seeds in a row walk the library and never share a palette. */
export function pickTile(seed, { mood, palette } = {}) {
    const n0 = typeof seed === "string" ? seedOf(seed) : seed;
    let pool = TILES;
    if (mood)
        pool = pool.filter((t) => t.mood === mood);
    if (palette)
        pool = pool.filter((t) => t.palette === palette);
    if (pool.length === 0)
        pool = TILES;
    const n = pool.length;
    if (!mood && !palette)
        return pool[(((n0 - 1) % n) + n) % n];
    const next = mulberry32(n0 >>> 0);
    next();
    next();
    next();
    return pool[Math.floor(next() * n)];
}
/** A tile's image; `base` ends in a slash. */
export function tileUrl(tile, base = CDN) {
    return `${base}${typeof tile === "string" ? tile : tile.id}.webp`;
}
const IMAGE = {
    position: "absolute",
    inset: 0,
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
};
/** A photograph of light through paper for a seed. The box has no content of its own, so give it a size. */
export function Gradient({ seed = 1, mood, palette, tile, base = CDN, style, ...props }) {
    const chosen = (tile && TILES.find((t) => t.id === tile)) ||
        pickTile(seed, { mood, palette });
    return (_jsx("div", { ...props, "data-tile": chosen.id, style: {
            position: "relative",
            overflow: "hidden",
            backgroundColor: chosen.tone,
            ...style,
        }, children: _jsx("img", { src: tileUrl(chosen, base), alt: "", "aria-hidden": "true", draggable: false, decoding: "async", style: IMAGE }) }));
}
