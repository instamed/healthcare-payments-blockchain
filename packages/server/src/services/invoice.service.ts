import { couchQueryAll } from '../convectorUtils';
import { Invoice } from 'financial-cc';
import { collections } from '../utils/collections';

export async function getAll(user?: string) {
    let resCols = await collections();
    return await couchQueryAll('invoices_all', Invoice, null,
        resCols.invoice, user);
}
