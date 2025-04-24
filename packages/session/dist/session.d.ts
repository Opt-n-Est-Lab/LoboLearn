import type { Request } from 'express';
import { type SessionStore } from './store.js';
export interface Session {
    id: string;
    destroy(): Promise<void>;
    regenerate(): Promise<void>;
    setExpiration(expiry: Date | number): void;
    getExpirationDate(): Date;
    [key: string]: any;
}
export declare function generateSessionId(): Promise<string>;
export declare function loadSession(sessionId: string, req: Request, store: SessionStore, maxAge: number): Promise<Session>;
export declare function makeSession(sessionId: string, req: Request, store: SessionStore, expirationDate: Date | null, maxAge: number): Session;
export declare function hashSession(session: Session): string;
export declare function truncateExpirationDate(date: Date): Date;
