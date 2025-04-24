import { runLegacySqlAdminQuery } from './util.js';
export default async function (params) {
    return runLegacySqlAdminQuery(import.meta.url, params);
}
//# sourceMappingURL=find_courses_by_user.js.map