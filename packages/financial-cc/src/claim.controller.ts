import {
    Controller,
    ConvectorController,
    Invokable
} from '@worldsibu/convector-core-controller';

import {
    Claim, ClaimResponse, CodeableConcept, ClaimResponseItem, InvoiceLineItemPriceComponent, Patient, Organization, Account, Encounter
} from './financial.model';
import { AdjudicationItem, InvoiceData, AccountData, ServiceItem } from './utils/';
import {
    buildNarrative, buildInvoiceLineItems, buildClaimResponseIdentifier,
    buildReference, buildCoding, buildTotalCosts, buildTotalBenefits,
    buildAdjudicationItem, buildMoney, createAccount, createInvoice
} from './utils';

@Controller('claim')
export class ClaimController extends ConvectorController {

    @Invokable()
    public async create(data: {
        encounterUid: string,
        claimUid: string,
        services: ServiceItem[],
        patient: Patient,
        provider: Organization,
        payer: Organization,
        account?: Account
    }) {
        const id = data.encounterUid;
        const encounter = new Encounter(id);
        
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
        claimResponse.identifier = [buildClaimResponseIdentifier(id)];
        claimResponse.resourceType = 'ClaimResponse';

        claimResponse.text = buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">ClaimResponse for Claim @${data.claim.id}</div>`);

        claimResponse.use = 'claim';
        claimResponse.patient = data.claim.patient;
        claimResponse.created = data.claimDate;
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
            claimResponseItem.itemSequence = adjudicationItem.sequeanceNumber;
            claimResponseItem.adjudication = [];

            // Process possible adjudications
            let itemTotalCost = 0;
            let itemTotalBenefit = 0;

            //TODO: Total


            if (adjudicationItem.adjudication && adjudicationItem.adjudication.elegible) {
                claimResponseItem.adjudication.push(
                    buildAdjudicationItem('elegible', adjudicationItem.adjudication.elegible));
                itemTotalCost += adjudicationItem.adjudication.elegible;
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