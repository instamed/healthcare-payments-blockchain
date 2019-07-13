import { couchQueryAll } from '../convectorUtils';
import { Account } from 'financial-cc';
import { collections } from '../utils/collections';

export async function getAll(user?: string) {
    let resCols = await collections();
    return await couchQueryAll('accounts_all', Account, null, resCols.account, user);
}
