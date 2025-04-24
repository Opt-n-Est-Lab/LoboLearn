import {} from './store.js';
export class MemoryStore {
    sessions = new Map();
    async set(id, session, expiresAt) {
        this.sessions.set(id, {
            expiresAt,
            data: JSON.stringify(session),
        });
    }
    async get(id) {
        const value = this.sessions.get(id);
        if (!value)
            return null;
        return {
            expiresAt: value.expiresAt,
            data: JSON.parse(value.data),
        };
    }
    async destroy(id) {
        this.sessions.delete(id);
    }
}
//# sourceMappingURL=memory-store.js.map