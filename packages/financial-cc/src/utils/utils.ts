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
import { ServiceItem } from './params.model';
import { Procedure } from '../financial.model';

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

export function buildIdentifier(id: string, use?: string, system?: string) {
    let identifier = new Identifier();
    identifier.use = use || 'usual';
    identifier.system = system || 'Blockchain:ClaimResponse';
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

export async function createService(data: ServiceItem) {
    const procedureId = data.procedureUid;
    const procedure = new Procedure(procedureId);
    data.procedure = procedure;

    procedure.identifier = [identifier];
    /**
 
      // Build the identifier for the Procedure from the id
      const identifier = factory.newConcept('org.fhir.datatypes', 'Identifier');
      identifier.use = "usual";
      identifier.system = "Blockchain:Procedure";
      identifier.value = procedure_id;
      procedure.identifier = [];
      procedure.identifier.push(identifier);
      
      procedure.resourceType = "Procedure";
      procedure.text = factory.newConcept('org.fhir.datatypes', 'Narrative');
      procedure.text.status = "generated";
      procedure.text.div = "<div xmlns=\"http://www.w3.org/1999/xhtml\">Procedure for encounter @" + data.encounter.id + "</div>";
      procedure.status = "completed";
      
      // Use same subject as the Encounter's patient
      procedure.subject = data.encounter.subject;
      
      // Set context to be a reference to the Encounter's first identifier (Should only be one for PoC)
      procedure.encounter = factory.newConcept('org.fhir.datatypes', 'Reference');
      procedure.encounter.identifier = data.encounter.identifier[0];
      
      
      // Set performer to the providing Organization
      const performer = factory.newConcept('org.fhir.procedure.datatypes', 'ProcedurePerformer');
      performer.actor = data.encounter.serviceProvider;
      performer.onBehalfOf = data.encounter.serviceProvider;
      procedure.performer = [];
      procedure.performer.push(performer);
      
      
      // Set HCPCS code
      procedure.code = factory.newConcept('org.fhir.datatypes', 'CodeableConcept');
      //!TODO ADD CODING LOGIC
      procedure.code.coding = [];
      procedure.code.coding.push(factory.newConcept('org.fhir.datatypes', 'Coding'));
      procedure.code.coding[0].system = "https://www.hl7.org/fhir/cpt.html";
      procedure.code.coding[0].code = data.hcpcs_code;
      
      
      // Add the transaction date as the performed date for the PoC
      procedure.performedDateTime = new Date();
      
      //TODO add logic to verify/create identifiers. For now, POC will assume identifiers are created from id on asset creation
      
      // Note Encounter assets are defined in the core model file
      let assetRegistry = await getAssetRegistry('org.fhir.core.Procedure');
      // Add the Encounter to the asset registry
      await assetRegistry.add(procedure);
      
      
      //-----------------------------------------------
      //-Now add ChargeItem corresponding to procedure-
      //-----------------------------------------------
      
      // Make a unique ID for ChargeItem
      const chargeItem_id = data.uid_chargeItem;
      
      const chargeItem = factory.newResource('org.fhir.core', 'ChargeItem', chargeItem_id);
      data.chargeItem = chargeItem;
      // Build the identifier for the ChargeItem from the id
      const chargeItemIdentifier = factory.newConcept('org.fhir.datatypes', 'Identifier');
      chargeItemIdentifier.system = "Blockchain:ChargeItem";
      chargeItemIdentifier.value = chargeItem_id;
      // Unlike procedures, ChargeItems have only one Identifier in data spec
    
      chargeItemIdentifier.use = "usual";
      
      chargeItem.identifier = [];
      chargeItem.identifier.push(chargeItemIdentifier);
      
      chargeItem.resourceType = "ChargeItem";
      chargeItem.text = factory.newConcept('org.fhir.datatypes', 'Narrative');
      chargeItem.text.status = "generated";
      chargeItem.text.div = "<div xmlns=\"http://www.w3.org/1999/xhtml\">ChargeItem for encounter @" + data.encounter.id + "</div>";
      chargeItem.status = "billable";
      
      
      chargeItem.code = factory.newConcept('org.fhir.datatypes', 'CodeableConcept');
      chargeItem.code.text = "Some kind of billing code goes here. I don't really know, the FHIR example is in German";
      
      chargeItem.subject = data.encounter.subject;
      chargeItem.context = factory.newConcept('org.fhir.datatypes', 'Reference');
      chargeItem.context.identifier = data.encounter.identifier[0];
      
      chargeItem.performingOrganization = data.encounter.serviceProvider;
      chargeItem.quantity = factory.newConcept('org.fhir.datatypes', 'Quantity');
      chargeItem.quantity.value = data.quantity;
      
      //Naughty according to FHIR, but I'm going to do it for the PoC
      // In actual application, a Contract Management System would instead be implemented.
      chargeItem.priceOverride = factory.newConcept('org.fhir.datatypes', 'Money');
      chargeItem.priceOverride.currency = "USD";
      chargeItem.priceOverride.value = data.unitPrice;
      chargeItem.overrideReason = "Prices will be stored here for PoC to make workflow more applicable.";
        
      
      
      chargeItem.enteredDate = new Date();
      
      chargeItem.enterer = data.encounter.serviceProvider;
      
      //TODO
      //Account??
      
      const service = factory.newConcept('org.fhir.datatypes', 'Reference');
      service.identifier = procedure.identifier[0];
      chargeItem.service = [];
      chargeItem.service.push(service);
      
      // Note ChargeItem assets are defined in the core model file
      //assetRegistry = await getAssetRegistry('org.fhir.core.ChargeItem');
      // Add the Encounter to the asset registry
      //await assetRegistry.add(chargeItem);
     */
}

export async function closeEncounter() {

}