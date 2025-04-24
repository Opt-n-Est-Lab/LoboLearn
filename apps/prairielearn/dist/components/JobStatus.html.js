import { html } from '@prairielearn/html';
export function JobStatus({ status }) {
    if (status === 'Running') {
        return html `<span class="badge text-bg-primary">Running</span>`;
    }
    else if (status === 'Success') {
        return html `<span class="badge text-bg-success">Success</span>`;
    }
    else if (status === 'Error') {
        return html `<span class="badge text-bg-danger">Error</span>`;
    }
    return html `<span class="badge text-bg-secondary">Unknown</span>`;
}
//# sourceMappingURL=JobStatus.html.js.map