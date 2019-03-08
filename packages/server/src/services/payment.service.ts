import { Init } from '../convectorUtils';

export async function make(invoiceId: string) {
    const ctrls = await Init();
    await ctrls.payment.make(invoiceId);
}