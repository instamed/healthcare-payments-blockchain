import { InvoiceLineItem } from './financial.model';
import { ConvectorModel } from '@worldsibu/convector-core';

export class TransientInvoiceLineItem extends ConvectorModel<TransientInvoiceLineItem> {
    type: string;
    items: InvoiceLineItem[];
}