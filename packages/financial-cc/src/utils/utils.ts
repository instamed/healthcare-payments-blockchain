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
import { ServiceItem, CreateClaim } from './params.model';
import { Procedure, ProcedurePerformer, Quantity, Claim, Resource, ClaimPayee, ClaimCareTeam, ClaimProcedure, SimpleQuantity, EncounterStatusHistory, Period } from '../financial.model';
import { IdentifierTypes, ResourceTypes } from './enums';

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

/**
 * 
 * @param value 
 * @param use 
 * @param system 
 */
export function buildIdentifier(value: string, use?: string, system?: IdentifierTypes) {
    let identifier = new Identifier();
    identifier.use = use || 'usual';
    identifier.system = system;
    identifier.value = value;
    return identifier;
}

export async function createAccount(data: AccountData, invoiceDate: Date) {
    const id = data.accountUid;

    data.patient = await Patient.getOne(data.patient.toString());
    data.owner = await Organization.getOne(data.owner.toString());

    const account = new Account(id);

    // Build the identifier for the Account from the id
    const identifier = buildIdentifier(id, 'usual', IdentifierTypes.ACCOUNT);
    account.identifier.push(identifier);

    // Set the necessary DomainResource stuff
    account.resourceType = ResourceTypes.ACCOUNT;
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
    const identifier = buildIdentifier(id, 'usual', IdentifierTypes.INVOICE);
    invoice.identifier.push(identifier);

    // Set the necessary DomainResource stuff
    invoice.resourceType = ResourceTypes.INVOICE;
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
    coding.code = code || '';
    coding.display = display || '';
    coding.system = system || '';
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

export async function createService(data: ServiceItem, txDate: Date) {
    const procedureId = data.procedureUid;
    const procedure = new Procedure(procedureId);
    data.procedure = procedure;
    // Build the identifier for the Procedure from the id
    const identifier = buildIdentifier(procedureId, 'usual', IdentifierTypes.PROCEDURE);
    procedure.identifier = [identifier];

    procedure.resourceType = ResourceTypes.PROCEDURE;
    procedure.text = buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">Procedure for encounter @${data.encounter.id}</div>`)
    procedure.status = 'completed';

    // Use same subject as the Encounter's patient
    procedure.subject = data.encounter.subject;

    // Set context to be a reference to the Encounter's first identifier (Should only be one for PoC)
    procedure.encounter = buildReference(data.encounter.identifier[0]);

    // Set performer to the providing Organization
    const performer = new ProcedurePerformer();
    performer.actor = data.encounter.serviceProvider;
    performer.onBehalfOf = data.encounter.serviceProvider;
    procedure.performer = [performer];

    // Set HCPCS code
    procedure.code = new CodeableConcept();
    //!TODO ADD CODING LOGIC
    procedure.code.coding = [buildCoding(data.hcpcsCode, null, `https://www.hl7.org/fhir/cpt.html`)];

    // Add the transaction date as the performed date for the PoC
    procedure.performedDateTime = txDate;
    //TODO add logic to verify/create identifiers. For now, POC will assume identifiers are created from id on asset creation

    await procedure.save();

    //-----------------------------------------------
    //-Now add ChargeItem corresponding to procedure-
    //-----------------------------------------------
    // Make a unique ID for ChargeItem
    const chargeItem = new ChargeItem(data.chargeItemUid);
    data.chargeItem = chargeItem;


    // Build the identifier for the ChargeItem from the id
    const chargeItemIdentifier = buildIdentifier(data.chargeItemUid, 'usual', IdentifierTypes.CHARGEITEM);


    // Unlike procedures, ChargeItems have only one Identifier in data spec
    chargeItem.identifier = [chargeItemIdentifier];
    chargeItem.resourceType = ResourceTypes.CHARGEITEM;
    chargeItem.text = buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">ChargeItem for encounter @${data.encounter.id}</div>`);
    chargeItem.status = 'billable';

    chargeItem.code = new CodeableConcept();
    // TODO: check this message
    chargeItem.code.text = 'Some kind of billing code goes here. I don\'t really know, the FHIR example is in German';
    chargeItem.subject = data.encounter.subject;
    chargeItem.context = buildReference(data.encounter.identifier[0]);
    chargeItem.performingOrganization = data.encounter.serviceProvider;
    chargeItem.quantity = new Quantity();
    chargeItem.quantity.value = data.quantity;

    // Naughty according to FHIR, but I'm going to do it for the PoC
    // In actual application, a Contract Management System would instead be implemented.
    chargeItem.priceOverride = buildMoney(data.unitPrice);
    chargeItem.overrideReason = `Prices will be stored here for PoC to make workflow more applicable.`;
    chargeItem.enteredDate = txDate;
    chargeItem.enterer = data.encounter.serviceProvider;

    //TODO
    //Account??

    const service = buildReference(procedure.identifier[0]);
    chargeItem.service = [service];

    // TODO: No save here?
    // Note ChargeItem assets are defined in the core model file
    //assetRegistry = await getAssetRegistry('org.fhir.core.ChargeItem');
    // Add the Encounter to the asset registry
    //await assetRegistry.add(chargeItem);

    // await chargeItem.save();
}

export async function closeEncounter(data: CreateClaim, txDate: Date) {
    //--------------------------------------------
    // First, attempt to create a new Claim object
    //--------------------------------------------
    const id = data.claimUid;

    const claim = new Claim(id);
    const identifier = buildIdentifier(id, 'usual', IdentifierTypes.CLAIM);
    claim.identifier = [identifier];
    claim.resourceType = ResourceTypes.CLAIM;
    claim.text = buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">Claim for Encounter @${data.encounter.id}</div>`)
    claim.status = 'active';
    claim.use = 'complete';

    // Maybe add some type coding here in the future
    claim.type_ = new CodeableConcept();
    const claimType = buildCoding('professional', 'Professional', 'http://hl7.org/fhir/ValueSet/claim-type');

    claim.type_.coding = [claimType];

    claim.priority = new CodeableConcept();
    const priorityType = buildCoding('normal', 'Normal', 'http://terminology.hl7.org/CodeSystem/processpriority');
    claim.priority.coding = [priorityType];
    claim.priority.text = 'Normal';

    // Use the reference in Encounter for the patient identifier
    claim.patient = data.encounter.subject;

    // Set the created date to time of transaction
    claim.created = txDate;

    // Set the insurer to be the payer
    // Uses the first identifier, under the assumption it should have only one
    claim.insurer = buildReference(data.payer.identifier[0])
    // Set the organization to be the provider
    claim.provider = data.encounter.serviceProvider;

    // Set the payee to be the provider
    claim.payee = new ClaimPayee();
    claim.payee.type_ = new CodeableConcept();
    claim.payee.type_.coding = [buildCoding('provider', 'http://hl7.org/fhir/remittance-outcome')];

    claim.payee.party = data.encounter.serviceProvider;

    // Set the care team to be the provider organization
    claim.careTeam = [new ClaimCareTeam()];
    claim.careTeam[0].sequence = 1;
    claim.careTeam[0].provider = data.encounter.serviceProvider;
    claim.careTeam[0].responsible = true;

    // Build the items
    let assetRegistry = new ChargeItem();
    let procedureRegistry = new Procedure();
    let results = [];

    //let results = await query('selectChargeItemsByEncounter', {encounter_id: data.encounter.id});
    claim.item = [];
    claim.procedure = [];

    let counter = 0;
    for (let service of data.services) {
        let item = new ClaimItem();
        let chargeItem = data.services[counter].chargeItem;

        // Skip ChargeItems not properly labeled as billable status
        if (chargeItem.status != 'billable') {
            continue;
        }

        item.sequence = counter + 1;

        item.encounter = [buildReference(data.encounter.identifier[0])];

        item.careTeamSequence = [1];

        claim.procedure.push(new ClaimProcedure());
        claim.procedure[counter].sequence = counter + 1;

        // TODO: doesnt exist `performedDateTime`
        // claim.procedure[counter].date = chargeItem.service[0].performedDateTime;

        claim.procedure[counter].procedureReference = chargeItem.service[0];

        let procedureEntity = data.services[counter].procedure;
        claim.procedure[counter].procedureCodeableConcept = procedureEntity.code;

        item.procedureSequence = [counter + 1];
        item.procedureSequence.push();

        item.productOrService = procedureEntity.code;

        item.quantity = new SimpleQuantity();
        item.quantity.value = chargeItem.quantity.value;

        item.unitPrice = buildMoney(chargeItem.priceOverride.value);

        // TODO: `code` prop doesnt exist
        // item.unitPrice.currency = chargeItem.priceOverride.code;
        item.net = buildMoney(chargeItem.priceOverride.value * chargeItem.quantity.value);
        claim.item.push(item);

        // Update the ChargeItems
        chargeItem.status = 'billed';
        await chargeItem.save();
        counter++;
    }
    claim.total = buildMoney(0);

    for (let i = 0; i < claim.item.length; i++) {
        claim.total.value += claim.item[i].net.value;
    }

    await claim.save();

    // Add Claim to registry
    // Update the Encounter records
    data.encounter.period.end = new Date();
    let statusHistory = new EncounterStatusHistory();
    statusHistory.status = data.encounter.status;

    if (!data.encounter.statusHistory) {
        data.encounter.statusHistory = [];
        statusHistory.period = data.encounter.period;
    } else {
        statusHistory.period = new Period();
        // TODO: end doesnt exist
        //   statusHistory.period.start = data.encounter.statusHistory[data.encounter.statusHistory.length-1].end;
        statusHistory.period.end = data.encounter.period.end;
    }
    data.encounter.statusHistory.push(statusHistory);
    data.encounter.status = 'finished';

    await data.encounter.save();
}