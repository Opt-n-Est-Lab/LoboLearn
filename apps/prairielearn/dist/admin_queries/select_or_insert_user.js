import { runLegacySqlAdminQuery } from './util.js';
export default async function (params) {
    return runLegacySqlAdminQuery(import.meta.url, params);
}
//# sourceMappingURL=select_or_insert_user.js.map