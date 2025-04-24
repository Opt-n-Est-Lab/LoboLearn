import { finalizeBatchedMigration } from '@prairielearn/migrations';
export default async function () {
    await finalizeBatchedMigration('20250212010945_variants__authn_user_id__backfill');
}
//# sourceMappingURL=20250212011728_variants__authn_user_id__backfill__finalize.js.map