declare module 'gifenc' {
    /**
     * Options for the GIFEncoder constructor.
     */
    export interface GIFEncoderOptions {
        /** If false, you must manually call writeHeader(). Defaults to true. */
        auto?: boolean;
        /** Initial capacity of the internal buffer. */
        initialCapacity?: number;
    }

    /**
     * Per-frame options for the writeFrame method.
     */
    export interface FrameOptions {
        /** The color palette (array of colors). Required for the first frame. */
        palette?: number[][];
        /** Delay in milliseconds between frames. */
        delay?: number;
        /** Whether to use transparency. */
        transparent?: boolean;
        /** The index of the transparent color in the palette. */
        transparentIndex?: number;
        /** Disposal method (0-3). */
        dispose?: number;
    }

    /**
     * The GIFEncoder instance returned by the GIFEncoder() call.
     */
    export interface GIFEncoderInstance {
        /**
         * Writes a single frame into the GIF stream.
         * @param index Uint8Array bitmap image where each value is an index into the color palette.
         * @param width Frame width.
         * @param height Frame height.
         * @param opts Per-frame options.
         */
        writeFrame(
            index: Uint8Array | Uint8ClampedArray,
            width: number,
            height: number,
            opts?: FrameOptions
        ): void;

        /** Writes the GIF end-of-stream character. */
        finish(): void;

        /** Returns a copy of the encoded bytes as a Uint8Array. */
        bytes(): Uint8Array;

        /** Returns a direct view into the encoded bytes without copying. */
        bytesView(): Uint8Array;

        /** Manually writes the GIF header. Only needed if auto: false was passed to the constructor. */
        writeHeader(): void;
    }

    /**
     * Creates a new GIFEncoder instance.
     */
    export function GIFEncoder(opts?: GIFEncoderOptions): GIFEncoderInstance;

    /**
     * Quantizes an image bitmap into a palette.
     */
    export function quantize(
        data: Uint8ClampedArray | Uint8Array,
        numColors: number,
        options?: {
            format?: 'rgb444' | 'rgb565' | 'rgba4444';
            oneBitAlpha?: boolean;
            clearAlpha?: boolean;
        }
    ): number[][];

    /**
     * Maps image data to a palette, creating an indexed bitmap.
     */
    export function applyPalette(
        data: Uint8ClampedArray | Uint8Array,
        palette: number[][]
    ): Uint8Array;
}
