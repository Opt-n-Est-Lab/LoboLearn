import signature from 'cookie-signature';
export function shouldSecureCookie(req, secure) {
    if (typeof secure === 'function') {
        return secure(req);
    }
    if (secure === 'auto') {
        return req.protocol === 'https';
    }
    return secure;
}
export function getSessionIdFromCookie(sessionCookie, secrets) {
    // Try each secret until we find one that works.
    if (sessionCookie) {
        for (const secret of secrets) {
            const value = signature.unsign(sessionCookie, secret);
            if (value !== false) {
                return value;
            }
        }
    }
    return null;
}
//# sourceMappingURL=cookie.js.map