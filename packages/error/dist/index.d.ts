import { type HtmlSafeString } from '@prairielearn/html';
export { formatErrorStack, formatErrorStackSafe } from './format.js';
interface ErrorWithData extends Error {
    data: any;
}
interface ErrorWithInfo extends Error {
    info: string;
}
interface ErrorWithStatus extends Error {
    status: number;
}
interface ErrorWithStatusAndData extends ErrorWithData, ErrorWithStatus {
}
export declare function make(status: number, message: string): ErrorWithStatus;
export declare function make(status: number, message: string, data: any): ErrorWithStatusAndData;
export declare function makeWithData(message: string, data: any): ErrorWithData;
export declare function makeWithInfo(message: string, info: string): ErrorWithInfo;
export declare function addData(err: any, data: any): ErrorWithData;
export declare function newMessage(err: any, newMsg: string): ErrorWithData;
/**
 * Create a new error based an existing one, optionally adding status, message,
 * and/or data. The existing error will be set as the `cause` of the new error.
 *
 * @param err An existing error.
 * @param param.status Status code to set on the new error.
 * @param param.message Message to add to the new error.
 * @param param.data Data to set on the new error.
 * @returns The augmented error.
 */
export declare function augmentError(err: any, { status, message, data }: {
    status?: number;
    message?: string;
    data?: any;
}): ErrorWithStatusAndData;
export interface AugmentedErrorOptions {
    status?: number;
    data?: any;
    info?: HtmlSafeString;
    cause?: unknown;
}
export declare class AugmentedError extends Error {
    status: number;
    data?: any;
    info?: string;
    constructor(message: string, options: AugmentedErrorOptions);
}
export declare class HttpStatusError extends Error {
    status: number;
    constructor(status: number, message: string);
}
