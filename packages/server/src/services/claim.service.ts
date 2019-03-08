import { Init, CreateClaim, AdjudicateClaim } from '../convectorUtils';

export async function create(newClaim: CreateClaim) {
    const ctrls = await Init();
    await ctrls.claim.create(newClaim);
}

export async function adjudicate(claim: AdjudicateClaim) {
    const ctrls = await Init();
    await ctrls.claim.adjudicate(claim);
}
export async function getAll() {
}