import { finalizeBatchedMigration } from '@prairielearn/migrations';
export default async function () {
    await finalizeBatchedMigration('20231122001903_variants__broken_at__backfill');
}
//# sourceMappingURL=20231128190800_variants__broken_at__backfill__finalize.mjs.map