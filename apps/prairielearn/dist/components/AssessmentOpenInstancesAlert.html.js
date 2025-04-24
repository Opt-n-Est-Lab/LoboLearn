import { html } from '@prairielearn/html';
export function AssessmentOpenInstancesAlert({ numOpenInstances, assessmentId, urlPrefix, }) {
    if (numOpenInstances === 0)
        return '';
    return html `
    <div class="alert alert-warning" role="alert">
      This assessment currently has
      ${numOpenInstances === 1 ? 'one open instance.' : `${numOpenInstances} open instances.`}
      Please ensure all students have completed their assessments before grading. You may close all
      open instances on the
      <a href="${urlPrefix}/assessment/${assessmentId}/instances">Students tab</a>.
    </div>
  `;
}
//# sourceMappingURL=AssessmentOpenInstancesAlert.html.js.map