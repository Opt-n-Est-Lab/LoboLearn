import { html } from '@prairielearn/html';
export function IssueBadge({ count, suppressLink, issueQid, issueAid, urlPrefix, className, }) {
    // Convert explicitly to a number because some unvalidated queries still return a string (via bigint)
    if (Number(count) === 0)
        return '';
    if (suppressLink) {
        return html `<span class="badge rounded-pill text-bg-danger ${className ?? ''}">${count}</span>`;
    }
    let query = 'is%3Aopen';
    if (issueQid) {
        query += `+qid%3A${encodeURIComponent(issueQid)}`;
    }
    if (issueAid) {
        query += `+assessment%3A${encodeURIComponent(issueAid)}`;
    }
    return html `
    <a
      class="badge rounded-pill text-bg-danger ${className ?? ''}"
      href="${urlPrefix}/course_admin/issues?q=${query}"
      aria-label="${count} open ${count === 1 ? 'issue' : 'issues'}"
    >
      ${count}
    </a>
  `;
}
//# sourceMappingURL=IssueBadge.html.js.map