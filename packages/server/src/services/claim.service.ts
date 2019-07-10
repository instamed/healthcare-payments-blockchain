import { Init, CreateClaim, AdjudicateClaim, couchQueryAll } from '../convectorUtils';
import { Claim } from 'financial-cc';

export async function create(newClaim: CreateClaim) {
    const ctrls = await Init();
    await ctrls.claim.$config({ transient: { data: new CreateClaim(newClaim).toJSON() } }).create();
}

export async function adjudicate(claim: AdjudicateClaim) {
    const ctrls = await Init();
    await ctrls.claim.$config({ transient: { data: claim.toJSON() } }).adjudicate();
}

export async function getAll() {
    return await couchQueryAll('claims_all', Claim);
}
