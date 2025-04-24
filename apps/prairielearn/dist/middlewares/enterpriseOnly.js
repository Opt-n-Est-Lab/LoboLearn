import {} from 'express';
import { isEnterprise } from '../lib/license.js';
export function enterpriseOnly(load) {
    if (isEnterprise()) {
        return load();
    }
    return (req, res, next) => next();
}
//# sourceMappingURL=enterpriseOnly.js.map