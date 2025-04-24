import { AsyncLocalStorage } from 'node:async_hooks';
import {} from 'express';
const als = new AsyncLocalStorage();
export class CanonicalLogger {
    _data = {};
    append(entries) {
        Object.assign(this._data, entries);
    }
    increment(key, value = 1) {
        this._data[key] = (this._data[key] || 0) + value;
    }
    data() {
        return this._data;
    }
}
export function getCanonicalLogger() {
    return als.getStore() ?? null;
}
export function canonicalLoggerMiddleware() {
    return (req, res, next) => {
        const canonicalLogger = new CanonicalLogger();
        als.run(canonicalLogger, () => next());
    };
}
export const canonicalLogger = {
    append(entries) {
        getCanonicalLogger()?.append(entries);
    },
    increment(key, value) {
        getCanonicalLogger()?.increment(key, value);
    },
    data() {
        return getCanonicalLogger()?.data() ?? {};
    },
};
//# sourceMappingURL=canonical-logger.js.map