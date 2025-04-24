import { enqueueBatchedMigration } from '@prairielearn/migrations';
export default async function () {
    await enqueueBatchedMigration('20231122001903_variants__broken_at__backfill');
}
//# sourceMappingURL=20231122001903_variants__broken_at__backfill.mjs.map