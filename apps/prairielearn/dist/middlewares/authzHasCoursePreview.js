import {} from 'express';
import { HttpStatusError } from '@prairielearn/error';
export default function (req, res, next) {
    if (!res.locals.authz_data.has_course_permission_preview) {
        return next(new HttpStatusError(403, 'Requires course preview access'));
    }
    next();
}
//# sourceMappingURL=authzHasCoursePreview.js.map