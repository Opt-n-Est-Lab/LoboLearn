import { type SessionStore, type SessionStoreData } from './store.js';
export declare class MemoryStore implements SessionStore {
    private sessions;
    set(id: string, session: any, expiresAt: Date): Promise<void>;
    get(id: string): Promise<SessionStoreData | null>;
    destroy(id: string): Promise<void>;
}
