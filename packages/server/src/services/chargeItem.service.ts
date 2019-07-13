import { couchQueryAll } from '../convectorUtils';
import { ChargeItem } from 'financial-cc';
import { collections } from '../utils/collections';

export async function getAll(user?: string) {
    let resCols = await collections();
    return await couchQueryAll('chargeItems_all', ChargeItem,
        null, resCols.chargeItem, user);
}
