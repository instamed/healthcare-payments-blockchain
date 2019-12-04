import { Init } from '../convectorUtils';
import { Invoice } from 'financial-cc';

export async function make(invoiceId: string, user: string) {
    // Switch to another identity to make payment
    const ctrls = await Init(user);
    let invoice = await ctrls.payment.$query().getOneInvoice(invoiceId);
    console.log(invoice);
    await ctrls.payment.$config({ transient: { invoice: new Invoice(invoice).toJSON() } }).make();
}
