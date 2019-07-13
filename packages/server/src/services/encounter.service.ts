import { couchQueryAll } from '../convectorUtils';
import { Encounter } from 'financial-cc';
import { collections } from '../utils/collections';

export async function getAll(user?: string) {
    let resCols = await collections();
    return await couchQueryAll('encounters_all', Encounter, null,
        resCols.encounter, user);
}
