import crypto from 'node:crypto';
import uid from 'uid-safe';
import {} from './store.js';
export async function generateSessionId() {
    return await uid(24);
}
export async function loadSession(sessionId, req, store, maxAge) {
    const sessionStoreData = await store.get(sessionId);
    const expiresAt = sessionStoreData?.expiresAt ?? null;
    const session = makeSession(sessionId, req, store, expiresAt, maxAge);
    if (sessionStoreData == null) {
        // Immediately persis the new session to the store so that it's assigned
        // an ID and available to query later on in the same request.
        await store.set(sessionId, session, 
        // Cookies only support second-level resolution. To ensure consistency
        // between the cookie and the store, truncate the expiration date to
        // the nearest second.
        truncateExpirationDate(session.getExpirationDate()));
    }
    // Copy session data into the session object.
    if (sessionStoreData != null) {
        const { data } = sessionStoreData;
        for (const prop in data) {
            if (!(prop in session)) {
                session[prop] = data[prop];
            }
        }
    }
    return session;
}
export function makeSession(sessionId, req, store, expirationDate, maxAge) {
    const session = {};
    let expiresAt = expirationDate;
    defineStaticProperty(session, 'id', sessionId);
    defineStaticProperty(session, 'destroy', async () => {
        delete req.session;
        await store.destroy(sessionId);
    });
    defineStaticProperty(session, 'regenerate', async () => {
        await store.destroy(sessionId);
        req.session = makeSession(await generateSessionId(), req, store, null, maxAge);
    });
    defineStaticProperty(session, 'getExpirationDate', () => {
        if (expiresAt == null) {
            expiresAt = new Date(Date.now() + maxAge);
        }
        return expiresAt;
    });
    defineStaticProperty(session, 'setExpiration', (expiration) => {
        if (typeof expiration === 'number') {
            expiresAt = new Date(Date.now() + expiration);
        }
        else {
            expiresAt = expiration;
        }
    });
    return session;
}
export function hashSession(session) {
    const str = JSON.stringify(session);
    return crypto.createHash('sha1').update(str, 'utf8').digest('hex');
}
function defineStaticProperty(obj, name, fn) {
    Object.defineProperty(obj, name, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: fn,
    });
}
export function truncateExpirationDate(date) {
    const time = date.getTime();
    const truncatedTime = Math.floor(time / 1000) * 1000;
    return new Date(truncatedTime);
}
//# sourceMappingURL=session.js.map