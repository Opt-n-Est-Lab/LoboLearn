import { html } from '@prairielearn/html';
import { run } from '@prairielearn/run';
import { idsEqual } from '../lib/id.js';
/**
 * Dropdown that lets users navigate between assessments in a
 * course instance.
 */
export function AssessmentNavigation({ subPage, courseInstance, assessment, assessments, }) {
    // Target subpage for the dropdown links to assessments.
    const targetSubPage = run(() => {
        if (!subPage)
            return '';
        if (subPage === 'assessment_instance')
            return 'instances';
        if (subPage === 'file_edit')
            return 'file_view';
        return subPage;
    });
    return html `
    <div class="dropdown bg-light pt-2 px-3">
      <button
        type="button"
        class="btn btn-ghost dropdown-toggle dropdown-menu-right d-flex justify-content-between align-items-center"
        style="max-width: 100%;"
        aria-label="Change assessment"
        aria-haspopup="true"
        aria-expanded="false"
        data-bs-toggle="dropdown"
        data-bs-boundary="window"
      >
        <span class="h6 mb-0 me-1 overflow-hidden text-truncate">${assessment.title}</span>
      </button>
      <div class="dropdown-menu py-0 overflow-hidden">
        <div style="max-height: 50vh" class="overflow-auto">
          ${assessments.map((a) => {
        return html `
              <a
                class="dropdown-item ${idsEqual(assessment.id, a.id) ? 'active' : ''}"
                aria-current="${idsEqual(assessment.id, a.id) ? 'page' : ''}"
                href="/pl/course_instance/${courseInstance.id}/instructor/assessment/${a.id}/${targetSubPage}"
              >
                ${a.title}
              </a>
            `;
    })}
        </div>
      </div>
    </div>
  `;
}
//# sourceMappingURL=AssessmentNavigation.html.js.map