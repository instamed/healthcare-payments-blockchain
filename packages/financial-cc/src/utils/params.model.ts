import { InvoiceLineItem } from '..';
import { Patient, Organization, Claim } from '../financial.model';

export class AdjudicationItem {
    sequeanceNumber: number;
    adjudication: Adjudication;
}
export class Adjudication {
    elegible: number;
    copay?: number;
    eligpercent?: number;
    benefit?: number;
    deductible?: number;
}
export class AccountData {
    patient: string | Patient;
    owner: string | Organization;
    amount: number;
    accountUid: string;
}
export class InvoiceData {
    patient: string | Patient;
    owner: string | Organization;
    amount: number;
    claimUid: string | Claim;
    invoiceUid: string;
    accountUid: string;
    invoiceLineItems: InvoiceLineItem[];
    invoiceTotalNet: number;
    invoiceTotalGross: number;
}

/**
 * TODO: look for actual structure
 */
export class Consumer { }
export class ServiceItem {
    hcpcsCode: string;
    unitPrice: number;
    procedureUid: string;
    chargeItemUid: string;
}