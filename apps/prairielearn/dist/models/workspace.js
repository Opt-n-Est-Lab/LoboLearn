import { loadSqlEquiv, queryRow } from '@prairielearn/postgres';
import { IdSchema, WorkspaceSchema } from '../lib/db-types.js';
const sql = loadSqlEquiv(import.meta.url);
export function selectWorkspace(workspace_id) {
    return queryRow(sql.select_workspace, { workspace_id }, WorkspaceSchema);
}
export function selectVariantIdForWorkspace(workspace_id) {
    return queryRow(sql.select_variant_id_for_workspace, { workspace_id }, IdSchema);
}
//# sourceMappingURL=workspace.js.map