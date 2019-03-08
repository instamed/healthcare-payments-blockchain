import { couchQueryAll } from '../convectorUtils';
import { Invoice } from 'financial-cc';

export async function getAll() {
    return await couchQueryAll('invoices_all', Invoice);
}
