import * as opentelemetry from '@prairielearn/opentelemetry';
import { loadSqlEquiv, queryAsync, queryOptionalRow } from '@prairielearn/postgres';
import {} from '@prairielearn/session';
import { UserSessionSchema } from './db-types.js';
const sql = loadSqlEquiv(import.meta.url);
export class PostgresSessionStore {
    setCounter;
    getCounter;
    destroyCounter;
    constructor() {
        const meter = opentelemetry.metrics.getMeter('prairielearn');
        this.setCounter = opentelemetry.getCounter(meter, 'session_store.set', {
            valueType: opentelemetry.ValueType.INT,
        });
        this.getCounter = opentelemetry.getCounter(meter, 'session_store.get', {
            valueType: opentelemetry.ValueType.INT,
        });
        this.destroyCounter = opentelemetry.getCounter(meter, 'session_store.destroy', {
            valueType: opentelemetry.ValueType.INT,
        });
    }
    async set(session_id, data, expires_at) {
        this.setCounter.add(1);
        await queryAsync(sql.set_session, {
            session_id,
            data: JSON.stringify(data),
            expires_at,
            user_id: data?.user_id ?? null,
        });
    }
    async get(session_id) {
        this.getCounter.add(1);
        const session = await queryOptionalRow(sql.get_session, { session_id }, UserSessionSchema);
        if (!session) {
            return null;
        }
        return {
            data: session.data,
            expiresAt: session.expires_at,
        };
    }
    async destroy(session_id) {
        this.destroyCounter.add(1);
        await queryAsync(sql.destroy_session, { session_id });
    }
}
//# sourceMappingURL=session-store.js.map