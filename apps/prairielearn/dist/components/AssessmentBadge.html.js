import { html } from '@prairielearn/html';
export function AssessmentBadge({ assessment, hideLink = false, urlPrefix, plainUrlPrefix, course_instance_id, publicURL = false, }) {
    if (hideLink) {
        return html `<span class="badge color-${assessment.color}">${assessment.label}</span>`;
    }
    if (publicURL) {
        urlPrefix = `${plainUrlPrefix}/public/course_instance/${course_instance_id}`;
    }
    else if (urlPrefix === undefined) {
        // Construct the URL prefix with the appropriate course instance
        urlPrefix = `${plainUrlPrefix}/course_instance/${course_instance_id}/instructor`;
    }
    return html `
    <a
      href="${urlPrefix}/assessment/${assessment.assessment_id}"
      class="btn btn-badge color-${assessment.color}"
    >
      ${assessment.label}
    </a>
  `;
}
//# sourceMappingURL=AssessmentBadge.html.js.map