import { couchQueryAll } from '../convectorUtils';
import { ChargeItem } from 'financial-cc';

export async function getAll() {
    return await couchQueryAll('chargeItems_all', ChargeItem);
}
