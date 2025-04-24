import { v4 as uuidv4 } from 'uuid';
export default async function ({ count }) {
    const rows = Array.from(Array(Number(count)), () => ({ uuid: uuidv4() }));
    return { rows, columns: ['uuid'] };
}
//# sourceMappingURL=generate_uuids.js.map