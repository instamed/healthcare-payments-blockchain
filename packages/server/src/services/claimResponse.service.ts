import { couchQueryAll } from '../convectorUtils';
import { ClaimResponse } from 'financial-cc';

export async function getAll() {
    return await couchQueryAll('claimResponses_all', ClaimResponse);
}
