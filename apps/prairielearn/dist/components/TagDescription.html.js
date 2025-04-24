import { html } from '@prairielearn/html';
import {} from '../lib/db-types.js';
export function TagDescription(tag) {
    if (!tag.implicit) {
        return tag.description;
    }
    return html `
    <span class="text-muted">
      Auto-generated from use in a question; add this tag to your infoCourse.json file to customize
    </span>
  `;
}
//# sourceMappingURL=TagDescription.html.js.map