import { type HtmlSafeString } from '@prairielearn/html';
/**
 * Use this function as an HTML component encode data that will be passed to the client.
 *
 * @param data The data to encode.
 * @param elementId The element ID to use for the encoded data.
 *
 */
export declare function EncodedData<T = unknown>(data: T, elementId: string): HtmlSafeString;
/**
 * Decode data that was passed to the client from in HTML component using EncodeData().
 *
 * @param elementId The element ID that stores the encoded data, from from EncodedData().
 * @returns The decoded data.
 */
export declare function decodeData<T = any>(elementId: string): T;
