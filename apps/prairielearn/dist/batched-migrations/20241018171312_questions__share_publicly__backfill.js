import { makeBatchedMigration } from '@prairielearn/migrations';
import { loadSqlEquiv, queryAsync, queryOneRowAsync } from '@prairielearn/postgres';
const sql = loadSqlEquiv(import.meta.url);
export default makeBatchedMigration({
    async getParameters() {
        const result = await queryOneRowAsync('SELECT MAX(id) as max from questions;', {});
        return {
            min: 1n,
            max: result.rows[0].max,
            batchSize: 1000,
        };
    },
    async execute(start, end) {
        await queryAsync(sql.backfill_share_publicly, { start, end });
    },
});
//# sourceMappingURL=20241018171312_questions__share_publicly__backfill.js.map