import { html } from '@prairielearn/html';
export function AssessmentSetHeading({ assessment_set }) {
    if (!assessment_set.implicit) {
        return assessment_set.heading;
    }
    return html `
    ${assessment_set.name}
    <span class="text-muted">
      (Auto-generated from use in an assessment; add this assessment set to your infoCourse.json
      file to customize)
    </span>
  `;
}
//# sourceMappingURL=AssessmentSetHeading.html.js.map