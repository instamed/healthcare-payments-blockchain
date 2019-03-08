import {
    ClaimResponseItemAdjudication, CodeableConcept,
    ClaimResponseTotal, ClaimItem, InvoiceLineItem, ChargeItem,
    Identifier, Patient, Organization, Account, Invoice,
    Narrative, Coding, Money, Reference
} from '..';
import * as fhirTypes from './fhirTypes';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import {
    AccountData, InvoiceData,
    AccountStatus, InvoiceStatus, Currencies
} from './';
import { ServiceItem, CreateClaim } from './params.model';
import { Procedure, ProcedurePerformer, Quantity, Claim, Resource, ClaimPayee, ClaimCareTeam, ClaimProcedure, SimpleQuantity, EncounterStatusHistory, Period, Encounter } from '../financial.model';
import { IdentifierTypes, ResourceTypes } from './enums';

/**
   * 
   * @param type eligible|copay|eligpercent
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

    const totalCostCategory = this.buildCoding('submitted', 'Submitted Amount',
        'http://terminology.hl7.org/CodeSystem/adjudication');

    totalCost.category.coding = [totalCostCategory];
    return { totalCost, totalCostCategory };
}

export function buildTotalBenefits() {
    const totalBenefit = new ClaimResponseTotal();
    totalBenefit.amount = this.buildMoney(0)
    totalBenefit.category = new CodeableConcept();
    const totalBenefitCategory = this.buildCoding('benefit', 'Benefit Amount', 'http://terminology.hl7.org/CodeSystem/adjudication');
    totalBenefit.category.coding = [totalBenefitCategory];
    return { totalBenefit, totalBenefitCategory };
}

export async function buildInvoiceLineItems(items: FlatConvectorModel<ClaimItem>[]) {
    let invoiceLineItems: InvoiceLineItem[] = [];
    for (let item of items) {
        let encounterId = item.encounter[0].identifier.value;

        // TODO: work this out with couch
        // this.tx.stub.getQueryResultAsList();
        let chargeItems = (await ChargeItem.getAll('fhir.datatypes.ChargeItem'))
            .map(item => item.toJSON())
            .filter(chargeItem => chargeItem.context.identifier.value === encounterId);

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
