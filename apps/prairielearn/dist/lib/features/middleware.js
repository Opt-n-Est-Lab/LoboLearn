import {} from 'express';
import { z } from 'zod';
import {} from './manager.js';
import { features } from './index.js';
/**
 * Middleware that allows per-request overriding of enabled features.
 *
 * Middleware that allows a special `_features` query parameter can be used to
 * enable or disable specific features for the lifetime of a request.
 *
 * - `?_features=feature1,feature2` enables `feature1` and `feature2`
 * - `?_features=!feature1,feature2` disables `feature1` and enables `feature2`
 *
 * The provided function is executed to determine whether the user for this
 * request is allowed to override feature flags. This should generally be
 * limited to administrators.
 */
export function featuresMiddleware(auth) {
    return (req, res, next) => {
        if (!auth(req, res)) {
            return next();
        }
        const rawFeatureOverrides = z
            .string()
            .parse(req.query._features ?? '')
            .split(',')
            .filter((f) => f.length > 0);
        const featureOverrides = {};
        for (const featureOverride of rawFeatureOverrides) {
            if (featureOverride.startsWith('!')) {
                featureOverrides[featureOverride.slice(1)] = false;
            }
            else {
                featureOverrides[featureOverride] = true;
            }
        }
        features.runWithOverrides(featureOverrides, next);
    };
}
//# sourceMappingURL=middleware.js.map