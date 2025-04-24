import { Stringifier, type Options as StringifierOptions, stringify } from 'csv-stringify';
import { type Handler as TransformHandler } from 'stream-transform';
export { stringify, Stringifier };
export interface StringifyNonblockingOptions extends StringifierOptions {
    batchSize?: number;
}
/**
 * Streaming transform from an array of objects to a CSV that doesn't
 * block the event loop.
 */
export declare function stringifyNonblocking(data: any[], options?: StringifyNonblockingOptions): Stringifier;
interface StringifyOptions<T = any, U = any> extends Pick<StringifierOptions, 'columns' | 'header'> {
    transform?: TransformHandler<T, U>;
}
/**
 * Transforms an object stream into a CSV stream.
 *
 * This is a thin wrapper around `stringify` from the `csv-stringify` package
 * with added support for transforming the input stream.
 *
 * Works best when combined with the `pipeline` function from
 * `node:stream/promises`, which will help ensure that errors are handled properly.
 */
export declare function stringifyStream<T = any, U = any>(options?: StringifyOptions<T, U>): NodeJS.ReadWriteStream;
