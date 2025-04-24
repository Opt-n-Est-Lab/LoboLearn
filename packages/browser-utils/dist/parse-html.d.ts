import type { HtmlSafeString } from '@prairielearn/html';
export declare function parseHTML(document: Document, html: string | HtmlSafeString): DocumentFragment;
/**
 * Like {@link parseHTML}, but returns an {@link Element} instead of a
 * {@link DocumentFragment}. If the HTML being parsed does not contain
 * exactly one element, an error is thrown.
 */
export declare function parseHTMLElement<T extends Element = Element>(document: Document, html: string | HtmlSafeString): T;
