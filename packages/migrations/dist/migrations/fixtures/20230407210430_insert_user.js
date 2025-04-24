import { queryAsync } from '@prairielearn/postgres';
export default async function migrate() {
    await queryAsync("INSERT INTO users (name) VALUES ('Test User')", {});
}
//# sourceMappingURL=20230407210430_insert_user.js.map