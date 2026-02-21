declare module 'gifenc' {
    export function GIFEncoder(): any;
    export function quantize(data: Uint8ClampedArray | Uint8Array, numColors: number, options?: any): any;
    export function applyPalette(data: Uint8ClampedArray | Uint8Array, palette: any): any;
}
