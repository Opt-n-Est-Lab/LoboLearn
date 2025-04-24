import {} from 'express';
import { HttpStatusError } from '@prairielearn/error';
export default function (req, res, next) {
    if (!res.locals.authz_data.authn_has_course_permission_preview &&
        !res.locals.authz_data.authn_has_course_instance_permission_view) {
        return next(new HttpStatusError(403, 'Requires either course preview access or student data view access'));
    }
    next();
}
//# sourceMappingURL=authzAuthnHasCoursePreviewOrInstanceView.js.map