import _ from 'lodash';
import {} from '@prairielearn/html';
export { formatErrorStack, formatErrorStackSafe } from './format.js';
export function make(status, message, data) {
    const err = new Error(message);
    err.status = status;
    if (data)
        err.data = data;
    return err;
}
export function makeWithData(message, data) {
    const err = new Error(message);
    err.data = data;
    return err;
}
export function makeWithInfo(message, info) {
    const err = new Error(message);
    err.info = info;
    return err;
}
export function addData(err, data) {
    const newErr = (_.isError(err) ? err : new Error(String(err)));
    newErr.data = newErr.data || {};
    Object.assign(newErr.data, data);
    return newErr;
}
export function newMessage(err, newMsg) {
    const newErr = (_.isError(err) ? err : new Error(String(err)));
    newErr.data = newErr.data || {};
    newErr.data._previousMessages = newErr.data._previousMessages || [];
    newErr.data._previousMessages.splice(0, 0, newErr.message);
    newErr.message = `${newMsg}: ${newErr.message}`;
    return newErr;
}
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
export function augmentError(err, { status, message, data }) {
    let newErr;
    if (err instanceof Error) {
        const combinedMessage = message ? `${message}: ${err.message}` : err.message;
        newErr = new Error(combinedMessage, { cause: err });
    }
    else {
        newErr = new Error(message ?? String(err));
    }
    newErr.status = status ?? 500;
    newErr.data = data;
    return newErr;
}
export class AugmentedError extends Error {
    status;
    data;
    info;
    constructor(message, options) {
        super(message, { cause: options.cause });
        this.status = options.status ?? 500;
        this.data = options.data;
        this.info = options.info?.toString();
    }
}
export class HttpStatusError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
//# sourceMappingURL=index.js.map