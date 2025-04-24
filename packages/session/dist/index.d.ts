import { type CookieSecure } from './cookie.js';
import { type Session } from './session.js';
import { type SessionStore } from './store.js';
declare global {
    namespace Express {
        interface Request {
            session: Session;
        }
    }
}
interface CookieOptions {
    secure?: CookieSecure;
    httpOnly?: boolean;
    domain?: string;
    sameSite?: boolean | 'none' | 'lax' | 'strict';
    maxAge?: number;
}
export interface SessionOptions {
    secret: string | string[];
    store: SessionStore;
    cookie?: CookieOptions & {
        /**
         * The name of the session cookie. The session is always read from this
         * named cookie, but it may be written to multiple cookies if `writeNames`
         * is provided.
         */
        name?: string;
        /**
         * Multiple write names can be provided to allow for a session cookie to be
         * written to multiple names. This can be useful for a migration of a cookie
         * to an explicit subdomain, for example.
         */
        writeNames?: string[];
        /**
         * Used with `writeNames` to provide additional options for each written cookie.
         */
        writeOverrides?: Omit<CookieOptions, 'secure'>[];
    };
}
export type { SessionStore };
export declare function createSessionMiddleware(options: SessionOptions): import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
