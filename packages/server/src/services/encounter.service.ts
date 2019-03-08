import { couchQueryAll } from '../convectorUtils';
import { Encounter } from 'financial-cc';

export async function getAll() {
    return await couchQueryAll('encounters_all', Encounter);
}
