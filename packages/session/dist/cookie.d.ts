import type { Request } from 'express';
export type CookieSecure = boolean | 'auto' | ((req: Request) => boolean);
export declare function shouldSecureCookie(req: Request, secure: CookieSecure): boolean;
export declare function getSessionIdFromCookie(sessionCookie: string | null | undefined, secrets: string[]): string | null;
