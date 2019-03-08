import { couchQueryAll } from '../convectorUtils';
import { Procedure } from 'financial-cc';

export async function getAll() {
    return await couchQueryAll('procedures_all', Procedure);
}
