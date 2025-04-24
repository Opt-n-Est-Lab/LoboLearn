import { z } from 'zod';
import { HttpStatusError } from '@prairielearn/error';
import { loadSqlEquiv, queryOptionalRow } from '@prairielearn/postgres';
import { AdministratorSchema, InstitutionSchema } from '../../lib/db-types.js';
const sql = loadSqlEquiv(import.meta.url);
export async function selectAndAuthzInstitutionAsAdmin({ institution_id, user_id, access_as_administrator, }) {
    const result = await queryOptionalRow(sql.select_institution_as_admin, { institution_id, user_id }, z.object({
        institution: InstitutionSchema,
        administrator: AdministratorSchema.nullable(),
        institution_administrator: AdministratorSchema.nullable(),
    }));
    if (result &&
        (result.institution_administrator || (result.administrator && access_as_administrator))) {
        return result.institution;
    }
    throw new HttpStatusError(403, 'Not authorized');
}
//# sourceMappingURL=selectAndAuthz.js.map