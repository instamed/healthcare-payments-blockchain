import { Init } from '../convectorUtils';
import { Invoice } from 'financial-cc';

export async function make(invoiceId: string) {
    const ctrls = await Init('paymentmaker');
    let invoice = await ctrls.payment.$query().getOneInvoice(invoiceId);
    console.log(invoice);
    await ctrls.payment.$config({ transient: { invoice: new Invoice(invoice).toJSON() } }).make();
}