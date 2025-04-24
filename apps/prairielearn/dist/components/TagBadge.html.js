import { html, joinHtml } from '@prairielearn/html';
export function TagBadge(tag) {
    return html `<span class="badge color-${tag.color}">${tag.name}</span>`;
}
export function TagBadgeList(tags) {
    return joinHtml(tags?.map(TagBadge) ?? [], ' ');
}
//# sourceMappingURL=TagBadge.html.js.map