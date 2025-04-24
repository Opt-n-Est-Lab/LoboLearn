export function parseHTML(document, html) {
    if (typeof html !== 'string')
        html = html.toString();
    const template = document.createElement('template');
    template.innerHTML = html;
    return document.importNode(template.content, true);
}
/**
 * Like {@link parseHTML}, but returns an {@link Element} instead of a
 * {@link DocumentFragment}. If the HTML being parsed does not contain
 * exactly one element, an error is thrown.
 */
export function parseHTMLElement(document, html) {
    const documentFragment = parseHTML(document, html);
    if (documentFragment.childElementCount !== 1) {
        throw new Error('Expected HTML to contain exactly one element');
    }
    return documentFragment.firstElementChild;
}
//# sourceMappingURL=parse-html.js.map