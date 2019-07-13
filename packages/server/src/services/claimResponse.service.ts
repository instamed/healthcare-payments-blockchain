import { couchQueryAll } from '../convectorUtils';
import { ClaimResponse } from 'financial-cc';
import { collections } from '../utils/collections';

export async function getAll(user?: string) {
    let resCols = await collections();

    return await couchQueryAll('claimResponses_all', ClaimResponse,
        null, resCols.claimResponse, user);
}
