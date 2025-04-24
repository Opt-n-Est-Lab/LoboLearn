import { runLegacySqlAdminQuery } from './util.js';
export default async function (params) {
    return runLegacySqlAdminQuery(import.meta.url, params);
}
//# sourceMappingURL=db_query_cancel.js.map