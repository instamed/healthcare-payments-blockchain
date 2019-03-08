import { couchQueryAll } from '../convectorUtils';
import { Account } from 'financial-cc';

export async function getAll() {
    return await couchQueryAll('accounts_all', Account);
}
