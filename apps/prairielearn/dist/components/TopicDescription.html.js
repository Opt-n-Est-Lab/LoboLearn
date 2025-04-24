import { html } from '@prairielearn/html';
import {} from '../lib/db-types.js';
export function TopicDescription(topic) {
    if (!topic.implicit) {
        return topic.description;
    }
    return html `
    <span class="text-muted">
      Auto-generated from use in a question; add this topic to your infoCourse.json file to
      customize
    </span>
  `;
}
//# sourceMappingURL=TopicDescription.html.js.map