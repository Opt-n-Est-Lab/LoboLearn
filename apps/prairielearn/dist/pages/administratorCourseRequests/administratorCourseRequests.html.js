import { html } from '@prairielearn/html';
import { CourseRequestsTable } from '../../components/CourseRequestsTable.html.js';
import { PageLayout } from '../../components/PageLayout.html.js';
import {} from '../../lib/course-request.js';
import {} from '../../lib/db-types.js';
export function AdministratorCourseRequests({ rows, institutions, coursesRoot, resLocals, }) {
    return PageLayout({
        resLocals,
        pageTitle: 'Course Requests',
        navContext: {
            type: 'plain',
            page: 'admin',
            subPage: 'courses',
        },
        options: {
            fullWidth: true,
        },
        content: html `
      <h1 class="visually-hidden">All Course Requests</h1>
      ${CourseRequestsTable({
            rows,
            institutions,
            coursesRoot,
            showAll: true,
            csrfToken: resLocals.__csrf_token,
            urlPrefix: resLocals.urlPrefix,
        })}
    `,
    });
}
//# sourceMappingURL=administratorCourseRequests.html.js.map