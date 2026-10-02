import type { HTMLAttributes } from "react";
import { type Mood, type Palette, type Tile } from "./tiles.js";
export { MOODS, PALETTES, TILES, type Mood, type Palette, type Tile, } from "./tiles.js";
/** The tiles on jsDelivr, pinned to the commit that added them; serve your own copy of tiles/ with `base`. */
export declare const CDN = "https://cdn.jsdelivr.net/gh/sinbad-io/gradient@1938c62079a7f01146b3d3e577aa4986d68948c9/tiles/";
/** A 32-bit hash of a string: the same id is always the same seed. */
export declare function seedOf(value: string): number;
export interface PickOptions {
    readonly mood?: Mood;
    readonly palette?: Palette;
}
/** One seed is one tile, forever. Unfiltered, seeds in a row walk the library and never share a palette. */
export declare function pickTile(seed: number | string, { mood, palette }?: PickOptions): Tile;
/** A tile's image; `base` ends in a slash. */
export declare function tileUrl(tile: Tile | string, base?: string): string;
export interface GradientProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** Anything stable about the subject: an id, not a name. */
    readonly seed?: number | string;
    readonly mood?: Mood;
    readonly palette?: Palette;
    /** One tile by its id, over the seed's pick. */
    readonly tile?: string;
    /** Where tiles/ is served; ends in a slash. */
    readonly base?: string;
}
/** A photograph of light through paper for a seed. The box has no content of its own, so give it a size. */
export declare function Gradient({ seed, mood, palette, tile, base, style, ...props }: GradientProps): import("react").JSX.Element;
