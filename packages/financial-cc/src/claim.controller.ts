import {
    Controller,
    ConvectorController,
    Invokable,
    Param
} from '@worldsibu/convector-core-controller';
import * as fhirTypes from './utils/fhirTypes';
import {
    Claim, ClaimResponse, CodeableConcept, ClaimResponseItem, InvoiceLineItemPriceComponent, Patient, Organization, Account, Encounter, Period, Resource
} from './financial.model';
import { AdjudicationItem, InvoiceData, AccountData, ServiceItem, buildIdentifier, IdentifierTypes, ResourceTypes, createService, closeEncounter, CreateClaim } from './utils/';
import {
    buildNarrative, buildInvoiceLineItems,
    buildReference, buildCoding, buildTotalCosts, buildTotalBenefits,
    buildAdjudicationItem, buildMoney, createAccount, createInvoice
} from './utils';

@Controller('claim')
export class ClaimController extends ConvectorController {

    @Invokable()
    public async create(
        @Param(CreateClaim)
        data: CreateClaim) {
        debugger;
        const id = data.encounterUid;

        // Hydrate objects
        data.patient = await Patient.getOne(data.patientId);
        data.payer = await Organization.getOne(data.payerId);
        data.provider = await Organization.getOne(data.providerId);

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
        data.encounter = encounter;

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

        debugger;
        // Note Encounter assets are defined in the core model file
        // Add the Encounter to the ledger
        for (let service of data.services) {
            service.encounter = encounter;
            await createService(service, data.txDate);
        }
        await closeEncounter(data, data.txDate);
    }

    @Invokable()
    public async adjudicate(data: {
        uid: string,
        accountUid: string,
        invoiceUid: string,
        claim: Claim,
        adjudications: AdjudicationItem[],
        claimDate: Date
    }) {
        const id = data.uid;
        const claimResponse = new ClaimResponse(id);
        let invoiceLineItems = await buildInvoiceLineItems(data.claim.item);
        claimResponse.identifier = [buildIdentifier(id, 'usual', IdentifierTypes.CLAIMRESPONSE)];
        claimResponse.resourceType = ResourceTypes.CLAIMRESPONSE;

        claimResponse.text = buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">ClaimResponse for Claim @${data.claim.id}</div>`);

        claimResponse.use = 'claim';
        claimResponse.patient = data.claim.patient;
        claimResponse.created = fhirTypes.date(data.claimDate);
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
            patient: claimResponse.patient.identifier.value,
            owner: claimResponse.requestor.identifier.value,
            amount: amountOwed,
            accountUid: data.accountUid
        };

        console.log(accountData);
        await createAccount(accountData, data.claimDate);

        let invoiceData: InvoiceData = {
            patient: claimResponse.patient.identifier.value,
            owner: claimResponse.requestor.identifier.value,
            amount: amountOwed,
            claimUid: data.claim,
            invoiceUid: data.invoiceUid,
            accountUid: data.accountUid,
            invoiceLineItems: invoiceLineItems,
            invoiceTotalNet: invoiceTotalNet,
            invoiceTotalGross: invoiceTotalGross
        };

        console.log(invoiceData);
        await createInvoice(invoiceData, data.claimDate);
    }
}