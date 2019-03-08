import {
    Controller,
    ConvectorController,
    Invokable,
    Param
} from '@worldsibu/convector-core-controller';
import * as fhirTypes from './utils/fhirTypes';
import {
    Claim, ClaimResponse, CodeableConcept, ClaimResponseItem,
    InvoiceLineItemPriceComponent, Patient, Organization,
    Encounter, Period, Quantity, Procedure, ProcedurePerformer, ChargeItem, ClaimPayee, ClaimCareTeam, ClaimItem, ClaimProcedure, SimpleQuantity, EncounterStatusHistory, Account, Invoice, Identifier
} from './financial.model';
import {
    InvoiceData, AccountData,
    buildIdentifier, IdentifierTypes, ResourceTypes, CreateClaim, AdjudicateClaim, ServiceItem, AccountStatus, InvoiceStatus
} from './utils/';
import {
    buildNarrative, buildInvoiceLineItems,
    buildReference, buildCoding, buildTotalCosts, buildTotalBenefits,
    buildAdjudicationItem, buildMoney
} from './utils';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';

@Controller('claim')
export class ClaimController extends ConvectorController {

    @Invokable()
    public async create(
        @Param(CreateClaim)
        data: CreateClaim) {
        const id = data.encounterUid;

        // Hydrate objects
        data.patient = <Patient>(await Patient.getOne(data.patientId)).toJSON();
        data.payer = <Organization>(await Organization.getOne(data.payerId)).toJSON();
        data.provider = <Organization>(await Organization.getOne(data.providerId)).toJSON();

        if (!data.patient) {
            throw new Error(`Patient with id ${data.patientId} doesn\'t exist`);
        }
        if (!data.payer) {
            throw new Error(`Payer with id ${data.payerId} doesn\'t exist`);
        }
        if (!data.provider) {
            throw new Error(`Provider with id ${data.providerId} doesn\'t exist`);
        }

        const encounter = new Encounter(id);
        // TODO: check this
        // Build the identifier for the Encounter from the id
        const identifier = buildIdentifier(id, 'usual', IdentifierTypes.ENCOUNTER);
        encounter.identifier = [identifier];

        const class_ = buildCoding('OBSENC', 'observation encounter', 'https://www.hl7.org/fhir/v3/ActCode/cs.html');
        class_.userSelected = false;

        encounter.class_ = class_;

        encounter.resourceType = ResourceTypes.ENCOUNTER;
        encounter.text = buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">Encounter with patient @${data.patient.id}</div>`);
        encounter.status = 'in-progress';

        // Use the first identifier in patient for the subject identifier
        // For this POC, patient should only ever HAVE one identifier
        //TODO add blockchain identifier verification, IE check coding
        encounter.subject = buildReference(data.patient.identifier[0]);

        // Same goes here
        encounter.serviceProvider = buildReference(data.provider.identifier[0]);

        //TODO add logic to verify/create identifiers. For now, POC will assume identifiers are created from id on asset creation

        // Set Encounter start-date to now
        encounter.period = new Period();

        encounter.period.start = fhirTypes.date(data.txDate);

        data.encounter = encounter;
        // Note Encounter assets are defined in the core model file
        // Add the Encounter to the ledger
        for (let service of data.services) {
            service.encounter = encounter;
            await this.createService(service, data.txDate);
        }
        await this.closeEncounter(data, data.txDate);
    }

    @Invokable()
    public async adjudicate(
        @Param(AdjudicateClaim)
        data: AdjudicateClaim) {
        const id = data.uid;
        const claimResponse = new ClaimResponse(id);

        // Hydrate objects
        data.claim = await Claim.getOne(data.claimUid);

        let invoiceLineItems = await buildInvoiceLineItems(data.claim.item);
        claimResponse.identifier = [buildIdentifier(id, 'usual', IdentifierTypes.CLAIMRESPONSE)];
        claimResponse.resourceType = ResourceTypes.CLAIMRESPONSE;

        claimResponse.text = buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">ClaimResponse for Claim @${data.claim.id}</div>`);
        claimResponse.status = 'active';
        claimResponse.use = 'claim';
        claimResponse.patient = data.claim.patient;

        claimResponse.created = fhirTypes.date(data.txDate);
        claimResponse.insurer = data.claim.insurer;

        claimResponse.requestor = buildReference(data.claim.provider.identifier);
        claimResponse.request = buildReference(data.claim.identifier[0]);

        claimResponse.outcome = 'complete';

        claimResponse.type_ = new CodeableConcept();
        claimResponse.type_.coding = [];

        const claimType = buildCoding('professional', 'Professional', 'http://hl7.org/fhir/ValueSet/claim-type');

        claimResponse.type_.coding.push(claimType);
        claimResponse.type_.text = 'Professional';

        // Placeholder disposition
        claimResponse.disposition = 'Claim fully settled as per contract.';

        // Build the payee from original claim
        claimResponse.payeeType = data.claim.payee.type_;

        //-----------------------------
        // Build the adjudicated items, processing net along the way
        //-----------------------------
        let { totalCost } = buildTotalCosts();
        let { totalBenefit } = buildTotalBenefits();

        let invoiceTotalNet = 0;
        let invoiceTotalGross = 0;

        claimResponse.item = [];
        let counterAdjudicationItems = 0;
        for (let adjudicationItem of data.adjudications) {
            // Make a new ClaimResponseItem for each item
            let claimResponseItem = new ClaimResponseItem();
            claimResponseItem.itemSequence = adjudicationItem.sequenceNumber;
            claimResponseItem.adjudication = [];

            // Process possible adjudications
            let itemTotalCost = 0;
            let itemTotalBenefit = 0;

            //TODO: Total

            if (adjudicationItem.adjudication && adjudicationItem.adjudication.eligible) {
                claimResponseItem.adjudication.push(
                    buildAdjudicationItem('eligible', adjudicationItem.adjudication.eligible));
                itemTotalCost += adjudicationItem.adjudication.eligible;
            }

            // Copay
            if (adjudicationItem.adjudication && adjudicationItem.adjudication.copay) {
                claimResponseItem.adjudication.push(
                    buildAdjudicationItem('copay', adjudicationItem.adjudication.copay));
            }

            // Eligible Percent
            if (adjudicationItem.adjudication && adjudicationItem.adjudication.eligpercent) {
                claimResponseItem.adjudication.push(
                    buildAdjudicationItem('eligpercent', adjudicationItem.adjudication.eligpercent));
            }

            // Benefit
            if (adjudicationItem.adjudication && adjudicationItem.adjudication.eligpercent) {
                claimResponseItem.adjudication.push(
                    buildAdjudicationItem('benefit', adjudicationItem.adjudication.benefit));
                itemTotalBenefit += adjudicationItem.adjudication.benefit;
            }

            // Deductible
            if (adjudicationItem.adjudication && adjudicationItem.adjudication.eligpercent) {
                claimResponseItem.adjudication.push(
                    buildAdjudicationItem('deductible', adjudicationItem.adjudication.deductible));
                itemTotalBenefit += adjudicationItem.adjudication.benefit;
            }

            let lineItemPriceComponents = [];
            let lineItemPriceComponent = new InvoiceLineItemPriceComponent();
            lineItemPriceComponent.type_ = 'base';
            lineItemPriceComponent.amount = buildMoney(itemTotalCost);

            lineItemPriceComponents.push(lineItemPriceComponent);

            let lineItemPriceComponent2 = new InvoiceLineItemPriceComponent();
            lineItemPriceComponent2.type_ = 'deduction';
            lineItemPriceComponent2.amount = buildMoney(itemTotalBenefit)

            lineItemPriceComponents.push(lineItemPriceComponent2);

            invoiceLineItems[counterAdjudicationItems].priceComponent = lineItemPriceComponents;

            // Apply the item's cost and benefit towards the total
            totalCost.amount.value += itemTotalCost;
            totalBenefit.amount.value += itemTotalBenefit;

            invoiceTotalGross += itemTotalCost;
            invoiceTotalNet += itemTotalCost - itemTotalBenefit;

            // Add the ClaimResponseItem to the ClaimResponse
            claimResponse.item.push(claimResponseItem);

            counterAdjudicationItems++;
        }

        claimResponse.total = [];
        claimResponse.total.push(totalCost);
        claimResponse.total.push(totalBenefit);

        // TODO: Do some payment data here maybe

        // Save to the blockchain
        claimResponse.save();
        // Calculate amount
        let amountOwed = totalBenefit.amount.value - totalCost.amount.value;

        let accountData: AccountData = {
            patientUid: claimResponse.patient.identifier.value,
            ownerUid: claimResponse.requestor.identifier.value,
            amount: amountOwed,
            accountUid: data.accountUid
        };

        await this.createAccount(accountData, data.txDate);

        let invoiceData: InvoiceData = {
            patientUid: claimResponse.patient.identifier.value,
            ownerUid: claimResponse.requestor.identifier.value,
            amount: amountOwed,
            claimUid: data.claimUid,
            claim: data.claim,
            invoiceUid: data.invoiceUid,
            accountUid: data.accountUid,
            invoiceLineItems: invoiceLineItems,
            invoiceTotalNet: invoiceTotalNet,
            invoiceTotalGross: invoiceTotalGross
        };

        await this.createInvoice(invoiceData, data.txDate);
    }

    async createService(data: FlatConvectorModel<ServiceItem>, txDate: Date) {
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
        procedure.performedDateTime = fhirTypes.date(txDate);
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
        chargeItem.enteredDate = fhirTypes.date(txDate);
        chargeItem.enterer = data.encounter.serviceProvider;

        //TODO
        //Account??

        const service = buildReference(procedure.identifier[0]);
        chargeItem.service = [service];

        await chargeItem.save();
    }

    async closeEncounter(data: CreateClaim, txDate: Date) {
        //--------------------------------------------
        // First, attempt to create a new Claim object
        //--------------------------------------------
        const id = data.claimUid.includes('resource:org.fhir.core.Claim#') ? data.claimUid :
            `resource:org.fhir.core.Claim#${data.claimUid}`;

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
        claim.created = fhirTypes.date(txDate);

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
        data.encounter.period.end = fhirTypes.date(txDate);
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

        await new Encounter(data.encounter).save();
    }


    async createAccount(data: AccountData, invoiceDate: Date) {
        const id = data.accountUid;

        data.patient = await Patient.getOne(data.patientUid);
        data.owner = await Organization.getOne(data.ownerUid);

        const account = new Account(id);

        // Build the identifier for the Account from the id
        const identifier = buildIdentifier(id, 'usual', IdentifierTypes.ACCOUNT);
        account.identifier = [identifier];

        // Set the necessary DomainResource stuff
        account.resourceType = ResourceTypes.ACCOUNT;
        account.text = buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">Account record for ${data.patient.id}.</div>`);
        account.status = AccountStatus.ACTIVE;

        // Set account type to a patient billing invoice
        account.type_ = new CodeableConcept();
        account.type_.coding = [buildCoding('PBILLACCT', 'patient billing account', 'http://hl7.org/fhir/v3/ActCode')];
        account.type_.text = 'patient';
        account.name = `Patient billing account for ${data.patient.id}`;

        // Build Reference to patient
        account.subject = [];
        const subject = buildReference(data.patient.identifier[0]);
        account.subject.push(subject);

        // Build Reference to owner
        account.owner = buildReference(data.owner.identifier[0]);
        account.description = `Account for tracking charges incurred during encounter.`;

        account.save();
    }

    async createInvoice(data: InvoiceData, invoiceDate: Date) {
        const id = data.invoiceUid;

        data.patient = await Patient.getOne(data.patientUid);
        data.owner = await Organization.getOne(data.ownerUid);

        const invoice = new Invoice(id);

        // Build the identifier for the Account from the id
        const identifier = buildIdentifier(id, 'usual', IdentifierTypes.INVOICE);
        invoice.identifier = [identifier];

        // Set the necessary DomainResource stuff
        invoice.resourceType = ResourceTypes.INVOICE;
        invoice.text = buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">Invoice record for ${data.patient.id}.</div>`);
        invoice.status = InvoiceStatus.ISSUED;

        // Set account type to a patient billing invoice
        invoice.type_ = new CodeableConcept();
        invoice.type_.coding = [buildCoding('PATIENT', 'patient invoice')]
        invoice.type_.text = 'patient';

        // Build Reference to patient
        const subject = buildReference(data.patient.identifier[0]);
        invoice.subject = subject;

        const recipient = buildReference(data.patient.identifier[0]);
        invoice.recipient = recipient;

        invoice.date = fhirTypes.date(invoiceDate);

        // Build Reference to owner
        invoice.issuer = buildReference(data.owner.identifier[0]);

        let accountIdentifier = new Identifier();
        accountIdentifier.value = data.accountUid;
        invoice.account = buildReference(accountIdentifier);

        invoice.lineItem = data.invoiceLineItems;

        invoice.totalNet = buildMoney(data.invoiceTotalNet);
        invoice.totalGross = buildMoney(data.invoiceTotalGross);

        // Add Account to ledger
        await invoice.save();
    }
}