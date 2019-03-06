import {
    ClaimResponseItemAdjudication, CodeableConcept,
    ClaimResponseTotal, ClaimItem, InvoiceLineItem, ChargeItem,
    Identifier, Patient, Organization, Account, Invoice,
    Narrative, Coding, Money, Reference
} from '..';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import {
    AccountData, InvoiceData,
    AccountStatus, InvoiceStatus, Currencies
} from './';

/**
   * 
   * @param type elegible|copay|eligpercent
   * @param val Amount value for Adjudication
   */
export function buildAdjudicationItem(type: string, val: number) {
    let adjudication = new ClaimResponseItemAdjudication();
    adjudication.category = new CodeableConcept();
    adjudication.category.coding = [this.buildCoding(type)];
    adjudication.amount = this.buildMoney(val);
    return adjudication;
}

export function buildTotalCosts() {
    const totalCost = new ClaimResponseTotal();
    totalCost.amount = this.buildMoney(0)
    totalCost.category = new CodeableConcept();
    totalCost.category.coding = [];

    const totalCostCategory = this.buildCoding('submitted', 'Submitted Amount',
        'http://terminology.hl7.org/CodeSystem/adjudication');

    totalCost.category.coding.push(totalCostCategory);
    return { totalCost, totalCostCategory };
}

export function buildTotalBenefits() {
    const totalBenefit = new ClaimResponseTotal();
    totalBenefit.amount = this.buildMoney(0)
    totalBenefit.category = new CodeableConcept();
    totalBenefit.category.coding = [];

    const totalBenefitCategory = this.buildCoding('benefit', 'Benefit Amount', 'http://terminology.hl7.org/CodeSystem/adjudication');

    totalBenefit.category.coding.push(totalBenefitCategory);
    return { totalBenefit, totalBenefitCategory };
}

export async function buildInvoiceLineItems(items: FlatConvectorModel<ClaimItem>[]) {
    let invoiceLineItems: InvoiceLineItem[] = [];
    for (let item of items) {
        let encounterId = item.encounter[0].identifier.value;

        // TODO: work this out with couch
        // this.tx.stub.getQueryResultAsList();
        let chargeItems = (await ChargeItem.getAll()).filter(chargeItem => chargeItem.context.identifier.value === encounterId);

        let key = 0;
        for (let chargeItem of chargeItems) {
            key++;
            let newInvoiceLine = new InvoiceLineItem();
            newInvoiceLine.sequence = key;
            let reference = this.buildReference(chargeItem.identifier[0]);
            newInvoiceLine.chargeItemReference = reference;
            newInvoiceLine.chargeItemCodeableConcept = chargeItem.code;
            invoiceLineItems.push(newInvoiceLine);
        }
    }
    return invoiceLineItems;
}

export function buildClaimResponseIdentifier(id: string) {
    let identifier = new Identifier();
    identifier.use = 'usual';
    identifier.system = 'Blockchain:ClaimResponse';
    identifier.value = id;
    return identifier;
}

export async function createAccount(data: AccountData, invoiceDate: Date) {
    const id = data.accountUid;

    data.patient = await Patient.getOne(data.patient.toString());
    data.owner = await Organization.getOne(data.owner.toString());

    const account = new Account(id);

    // Build the identifier for the Account from the id
    const identifier = new Identifier();
    identifier.use = 'usual';
    identifier.system = 'Blockchain:Account';
    identifier.value = id;
    account.identifier.push(identifier);

    // Set the necessary DomainResource stuff
    account.resourceType = 'Account';
    account.text = this.buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">Account record for ${data.patient.id}.</div>`);
    account.status = AccountStatus.ACTIVE;

    // Set account type to a patient billing invoice
    account.type_ = new CodeableConcept();
    account.type_.coding = [this.buildCoding('PBILLACCT', 'patient billing account', 'http://hl7.org/fhir/v3/ActCode')];
    account.type_.text = 'patient';
    account.name = `Patient billing account for ${data.patient.id}`;

    // Build Reference to patient
    account.subject = [];
    const subject = this.buildReference(data.patient.identifier[0]);
    account.subject.push(subject);

    // Build Reference to owner
    account.owner = this.buildReference(data.owner.identifier[0]);
    account.description = `Account for tracking charges incurred during encounter.`;

    account.save();
}

export async function createInvoice(data: InvoiceData, invoiceDate: Date) {
    const id = data.invoiceUid;

    data.patient = await Patient.getOne(data.patient.toString());
    data.owner = await Organization.getOne(data.owner.toString());

    data['claim'] = data.claimUid;

    const invoice = new Invoice(id);

    // Build the identifier for the Account from the id
    const identifier = new Identifier();
    identifier.use = 'usual';
    identifier.system = 'Blockchain:Invoice';
    identifier.value = id;
    invoice.identifier.push(identifier);

    // Set the necessary DomainResource stuff
    invoice.resourceType = 'Invoice';
    invoice.text = this.buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">Invoice record for ${data.patient.id}.</div>`);
    invoice.status = InvoiceStatus.ISSUED;

    // Set account type to a patient billing invoice
    invoice.type_ = new CodeableConcept();
    invoice.type_.coding = [this.buildCoding('PATIENT', 'patient invoice')]
    invoice.type_.text = 'patient';

    // Build Reference to patient
    const subject = this.buildReference(data.patient.identifier[0]);
    invoice.subject = subject;

    const recipient = this.buildReference(data.patient.identifier[0]);
    invoice.recipient = recipient;

    invoice.date = invoiceDate;

    // Build Reference to owner
    invoice.issuer = this.buildReference(data.owner.identifier[0]);

    let accountIdentifier = new Identifier();
    accountIdentifier.value = data.accountUid;
    invoice.account = this.buildReference(accountIdentifier);

    invoice.lineItem = data.invoiceLineItems;

    invoice.totalNet = this.buildMoney(data.invoiceTotalNet);
    invoice.totalGross = this.buildMoney(data.invoiceTotalGross);

    // Add Account to ledger
    await invoice.save();
}

/**
 * Create a new instance of `Narrative`
 * @param status 
 * @param div 
 */
export function buildNarrative(status?: string, div?: string) {
    const narrative = new Narrative();
    narrative.status = status;
    narrative.div = div;
    return narrative;
}

/**
 * Create a new instance of `Coding`
 * @param code 
 * @param display 
 * @param system 
 */
export function buildCoding(code?: string, display?: string, system?: string) {
    const coding = new Coding();
    coding.code = code;
    coding.display = display;
    coding.system = system;
    return coding;
}

/**
 * Create a new instance of `Identifier`
 * @param identifier 
 */
export function buildReference(identifier: Identifier | FlatConvectorModel<Identifier>) {
    let reference = new Reference();
    reference.identifier = identifier;
    return reference;
}

/**
 * Create a new instance of `Money`
 * @param value 
 * @param currency 
 */
export function buildMoney(value: number, currency?: string) {
    let amount = new Money();
    amount.value = value;
    amount.currency = currency || Currencies.USD;
    return amount;
}