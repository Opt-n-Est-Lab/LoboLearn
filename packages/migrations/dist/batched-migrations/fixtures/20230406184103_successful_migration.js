import { makeBatchedMigration } from '../batched-migration.js';
export default makeBatchedMigration({
    async getParameters() {
        return {
            min: 1n,
            max: 100n,
            batchSize: 10,
        };
    },
    async execute(_min, _max) { },
});
//# sourceMappingURL=20230406184103_successful_migration.js.map