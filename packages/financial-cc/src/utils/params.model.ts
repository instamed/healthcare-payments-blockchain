import { InvoiceLineItem } from '..';
import { Patient, Organization, Claim, Encounter, Procedure, ChargeItem, Account } from '../financial.model';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';

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
/**
 * TODO: Check for this
 */
export class ServiceItem {
    hcpcsCode: string;
    quantity: number;
    unitPrice: number;
    procedureUid: string;
    chargeItemUid: string;
    /** TODO: Composer model didnt have this */
    encounter: Encounter;
    procedure: Procedure;
    chargeItem: ChargeItem;
}

/**
 * This didnt exist
 */
export class CreateClaim {
    encounterUid: string;
    encounter?: Encounter;
    claimUid: string;
    services: ServiceItem[];
    patient: Patient;
    provider: Organization;
    payer: Organization;
    account?: Account;
    txDate: Date;
}