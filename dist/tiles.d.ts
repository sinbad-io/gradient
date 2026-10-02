export type Mood = "bands" | "bloom" | "cross" | "curve" | "fan" | "field" | "fold" | "gel" | "layers" | "leaf" | "petals" | "streaks" | "surf" | "swell" | "wall" | "wave" | "wind";
export type Palette = "blue" | "cyan" | "green" | "lime" | "periwinkle" | "pink";
export interface Tile {
    readonly id: string;
    readonly mood: Mood;
    readonly palette: Palette;
    /** The tile's mean colour, for the box while the image loads. */
    readonly tone: string;
}
export declare const MOODS: readonly Mood[];
export declare const PALETTES: readonly Palette[];
export declare const TILES: readonly Tile[];
