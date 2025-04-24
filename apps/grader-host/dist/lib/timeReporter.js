import { z } from 'zod';
import * as sqldb from '@prairielearn/postgres';
const sql = sqldb.loadSqlEquiv(import.meta.url);
export function reportReceivedTime(jobId) {
    return sqldb.queryRow(sql.update_job_received_time, { job_id: jobId }, z.date());
}
export function reportStartTime(jobId) {
    return sqldb.queryRow(sql.update_job_start_time, { job_id: jobId }, z.date());
}
export function reportEndTime(jobId) {
    return sqldb.queryRow(sql.update_job_end_time, { job_id: jobId }, z.date());
}
//# sourceMappingURL=timeReporter.js.map