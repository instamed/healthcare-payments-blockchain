import { Init, CreateClaim, AdjudicateClaim, couchQueryAll } from '../convectorUtils';
import { Claim, InvoiceLineItem, TransientInvoiceLineItem } from 'financial-cc';
import { collections } from '../utils/collections';

export async function create(newClaim: CreateClaim) {
    const ctrls = await Init();
    await ctrls.claim.$config({ transient: { data: new CreateClaim(newClaim).toJSON() } }).create();
}

export async function adjudicate(toAdjudicateClaim: AdjudicateClaim) {
    const ctrls = await Init();

    let lines = await ctrls.claim.$query().getInvoiceLineItems(toAdjudicateClaim.claimUid);

    lines = lines.map(item => new InvoiceLineItem(item).toJSON() as any);
    const invoiceLines = new TransientInvoiceLineItem();
    invoiceLines.items = lines;

    let claim = await ctrls.claim.$query().getOne(toAdjudicateClaim.claimUid);

    await ctrls.claim.$config({
        transient: {
            data: new AdjudicateClaim(toAdjudicateClaim).toJSON(),
            invoices: invoiceLines.toJSON(),
            claim: new Claim(claim).toJSON(),
        }
    }).adjudicate();
}

export async function getAll(user?: string) {
    let resCols = await collections();
    console.log(!!user);
    return await couchQueryAll('claims_all', Claim, null, resCols.claim, user);
}
