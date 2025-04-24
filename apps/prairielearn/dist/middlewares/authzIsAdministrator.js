import {} from 'express';
import { HttpStatusError } from '@prairielearn/error';
export default function (req, res, next) {
    if (!res.locals.is_administrator) {
        return next(new HttpStatusError(403, 'Requires administrator privileges'));
    }
    next();
}
//# sourceMappingURL=authzIsAdministrator.js.map