import { FlatConvectorModel } from '@worldsibu/convector-core';

import { Currencies, CodingTypes } from './enums';
import {
    ClaimResponseItemAdjudication, CodeableConcept,
    ClaimResponseTotal, ClaimItem, InvoiceLineItem, ChargeItem,
    Identifier, Narrative, Coding, Money, Reference
} from '../models/financial.model';

/**
   * 
   * @param type eligible|copay|eligpercent
   * @param val Amount value for Adjudication
   */
export function buildAdjudicationItem(type: string, val: number) {
    let adjudication = new ClaimResponseItemAdjudication();
    adjudication.category = new CodeableConcept();
    adjudication.category.coding = [buildCoding(type)];
    adjudication.amount = buildMoney(val);
    return adjudication;
}

export function buildTotalCosts() {
    const totalCost = new ClaimResponseTotal();
    totalCost.amount = buildMoney(0)
    totalCost.category = new CodeableConcept();

    const totalCostCategory = buildCoding(CodingTypes.SUBMITTED, 'Submitted Amount',
        'http://terminology.hl7.org/CodeSystem/adjudication');

    totalCost.category.coding = [totalCostCategory];
    return { totalCost, totalCostCategory };
}

export function buildTotalBenefits() {
    const totalBenefit = new ClaimResponseTotal();
    totalBenefit.amount = buildMoney(0)
    totalBenefit.category = new CodeableConcept();
    const totalBenefitCategory = buildCoding(CodingTypes.BENEFIT, 'Benefit Amount', 'http://terminology.hl7.org/CodeSystem/adjudication');
    totalBenefit.category.coding = [totalBenefitCategory];
    return { totalBenefit, totalBenefitCategory };
}

export async function buildInvoiceLineItems(items: FlatConvectorModel<ClaimItem>[]) {
    let invoiceLineItems: InvoiceLineItem[] = [];
    for (let item of items) {
        let encounterId = item.encounter[0].identifier.value;

        let chargeItems =  <ChargeItem[]>(await ChargeItem.query(ChargeItem,
            {
                'selector': {
                    'context.identifier.value': encounterId
                }
            }))
            
        let key = 0;
        for (let chargeItem of chargeItems) {
            key++;
            let newInvoiceLine = new InvoiceLineItem();
            newInvoiceLine.sequence = key;
            let reference = buildReference(chargeItem.identifier[0]);
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
export function buildIdentifier(value: string, use?: string, system?: string) {
    let identifier = new Identifier();
    identifier.use = use;
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
export function buildCoding(code: string, display?: string, system?: string) {
    const coding = new Coding();
    coding.code = code;
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
