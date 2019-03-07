import { InvoiceLineItem } from '..';
import { Patient, Organization, Claim, Encounter, Procedure, ChargeItem, Account, date } from '../financial.model';
import { FlatConvectorModel, Validate, ConvectorModel, Default, ReadOnly, Required } from '@worldsibu/convector-core-model';
import * as yup from 'yup';

export class AdjudicationItem {
    sequenceNumber: number;
    adjudication: Adjudication;
}
export class Adjudication {
    eligible: number;
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
export class ServiceItem extends ConvectorModel<ServiceItem> {
    @Default('fhir.datatypes.ServiceItem')
    @ReadOnly()
    public readonly type: string;

    @Required()
    @Validate(yup.string())
    hcpcsCode: string;
    
    @Required()
    @Validate(yup.number())
    quantity: number;
    
    @Required()
    @Validate(yup.number())
    unitPrice: number;

    @Required()
    @Validate(yup.string())
    procedureUid: string;

    @Required()
    @Validate(yup.string())
    chargeItemUid: string;

    /** TODO: Composer model didnt have this */
    @Validate(yup.lazy(() => yup.array(Encounter.schema())))
    encounter?: Encounter;

    @Validate(yup.lazy(() => yup.array(Procedure.schema())))
    procedure?: Procedure;

    @Validate(yup.lazy(() => yup.array(ChargeItem.schema())))
    chargeItem?: ChargeItem;
}

/**
 * TODO: This didnt exist
 */
export class CreateClaim extends ConvectorModel<CreateClaim> {
    @Default('fhir.datatypes.CreateClaim')
    @ReadOnly()
    public readonly type: string;

    @Required()
    @Validate(yup.string())
    encounterUid: string;

    @Required()
    @Validate(yup.string())
    claimUid: string;

    @Validate(yup.lazy(() => yup.array(ServiceItem.schema())))
    public services?: Array<FlatConvectorModel<ServiceItem>>;

    @Validate(yup.string())
    patientId: string;
    
    @Validate(yup.lazy(() => yup.array(Patient.schema())))
    patient: Patient;

    @Validate(yup.string())
    providerId: string;
    
    @Validate(yup.lazy(() => yup.array(Organization.schema())))
    provider: Organization;

    @Validate(yup.string())
    payerId: string;

    @Validate(yup.lazy(() => yup.array(Organization.schema())))
    payer: Organization;

    @Validate(yup.lazy(() => Encounter.schema()))
    encounter?: Encounter;

    @Validate(yup.lazy(() => yup.array(Account.schema())))
    account?: Account;

    /**
     * Special date for the tx outside the chain
     */
    @Required()
    @Validate(yup.date())
    txDate: Date;
}