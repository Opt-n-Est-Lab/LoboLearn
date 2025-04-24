import {} from 'express';
import { AugmentedError } from '@prairielearn/error';
export default function (req, res, next) {
    next(new AugmentedError('Not Found', {
        status: 404,
        data: {
            url: req.url,
            method: req.method,
            authz_data: res.locals.authz_data,
        },
    }));
}
//# sourceMappingURL=notFound.js.map