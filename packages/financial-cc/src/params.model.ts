import { InvoiceLineItem } from '.';
import { Patient, Organization } from './financial.model';

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
    claimUid: string;
    invoiceUid: string;
    accountUid: string;
    invoiceLineItems: InvoiceLineItem[];
    invoiceTotalNet: number;
    invoiceTotalGross: number;
}