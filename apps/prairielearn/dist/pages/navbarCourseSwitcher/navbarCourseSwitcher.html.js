import { html } from '@prairielearn/html';
import {} from '../../lib/db-types.js';
import { idsEqual } from '../../lib/id.js';
export function NavbarCourseSwitcher({ courses, current_course_id, plainUrlPrefix, }) {
    return html `
    ${courses.map((c) => {
        return html `
        <a
          class="dropdown-item ${idsEqual(c.id, current_course_id) ? 'active' : ''}"
          aria-current="${idsEqual(c.id, current_course_id) ? 'page' : ''}"
          href="${plainUrlPrefix}/course/${c.id}/course_admin"
        >
          ${c.short_name}
        </a>
      `;
    })}
  `.toString();
}
//# sourceMappingURL=navbarCourseSwitcher.html.js.map