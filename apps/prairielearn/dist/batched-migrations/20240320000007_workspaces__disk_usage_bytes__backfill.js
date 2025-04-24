import { makeBatchedMigration } from '@prairielearn/migrations';
import { queryOneRowAsync, queryRows } from '@prairielearn/postgres';
import { updateWorkspaceDiskUsage } from '@prairielearn/workspace-utils';
import { config } from '../lib/config.js';
import { WorkspaceSchema } from '../lib/db-types.js';
export default makeBatchedMigration({
    async getParameters() {
        const result = await queryOneRowAsync('SELECT MAX(id) as max from workspaces;', {});
        return {
            min: 1n,
            max: result.rows[0].max,
            batchSize: 100,
        };
    },
    async execute(min, max) {
        // We skip all workspaces that already have a disk usage value.
        const workspaces = await queryRows('SELECT * FROM workspaces WHERE id >= $min AND id <= $max AND disk_usage_bytes IS NULL', { min, max }, WorkspaceSchema);
        for (const workspace of workspaces) {
            await updateWorkspaceDiskUsage(workspace.id, config.workspaceHomeDirRoot);
        }
    },
});
//# sourceMappingURL=20240320000007_workspaces__disk_usage_bytes__backfill.js.map