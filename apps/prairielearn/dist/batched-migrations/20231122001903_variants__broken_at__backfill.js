import { makeBatchedMigration } from '@prairielearn/migrations';
import { loadSqlEquiv, queryAsync, queryOneRowAsync } from '@prairielearn/postgres';
const sql = loadSqlEquiv(import.meta.url);
export default makeBatchedMigration({
    async getParameters() {
        const result = await queryOneRowAsync('SELECT MAX(id) as max from variants;', {});
        return {
            min: 1n,
            max: result.rows[0].max,
            batchSize: 1000,
        };
    },
    async execute(start, end) {
        await queryAsync(sql.update_variants_broken_at, { start, end });
    },
});
//# sourceMappingURL=20231122001903_variants__broken_at__backfill.js.map