import {} from 'express';
import { config } from './config.js';
export function getCanonicalHost(req) {
    if (config.serverCanonicalHost)
        return config.serverCanonicalHost;
    return `${req.protocol}://${req.get('host')}`;
}
export function getSearchParams(req) {
    return new URL(req.originalUrl, getCanonicalHost(req)).searchParams;
}
//# sourceMappingURL=url.js.map