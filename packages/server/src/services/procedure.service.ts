import { couchQueryAll } from '../convectorUtils';
import { Procedure } from 'financial-cc';
import { collections } from '../utils/collections';

export async function getAll(user?: string) {
    let resCols = await collections();
    return await couchQueryAll('procedures_all', Procedure, null,
    resCols.procedure, user);
}
