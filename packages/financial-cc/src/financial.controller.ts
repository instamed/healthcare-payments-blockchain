import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import {
  Invoice, Claim, ClaimResponse, ChargeItem, InvoiceLineItem,
  Reference, ClaimItem, Identifier, Narrative, CodeableConcept, Coding, ClaimResponseTotal, Money, ClaimResponseInsurance, ClaimResponseItem, ClaimResponseItemAdjudication, InvoiceLineItemPriceComponent, Patient, Organization, Account
} from './financial.model';
import { InvoiceStatus, AccountStatus, Currencies } from './enums';
import { AdjudicationItem, InvoiceData, AccountData } from './params.model';
import { FlatConvectorModel } from '@worldsibu/convector-core-model';
import { ChaincodeTx } from '@worldsibu/convector-core-chaincode';

@Controller('financial')
export class FinancialController extends ConvectorController<ChaincodeTx> {

  @Invokable()
  public async createClaim() {

  }

  @Invokable()
  public async adjudicateClaim(data: {
    uid: string,
    accountUid: string,
    invoiceUid: string,
    claim: Claim,
    adjudications: AdjudicationItem[],
    claimDate: Date
  }) {
    const id = data.uid;
    const claimResponse = new ClaimResponse(id);
    let invoiceLineItems = await this.buildInvoiceLineItems(data.claim.item);
    claimResponse.identifier = [this.buildClaimResponseIdentifier(id)];
    claimResponse.resourceType = 'ClaimResponse';

    claimResponse.text = this.buildNarrative('generated', `<div xmlns=\"http://www.w3.org/1999/xhtml\">ClaimResponse for Claim @${data.claim.id}</div>`);

    claimResponse.use = 'claim';
    claimResponse.patient = data.claim.patient;
    claimResponse.created = data.claimDate;
    claimResponse.insurer = data.claim.insurer;

    claimResponse.requestor = this.buildReference(data.claim.provider.identifier);
    claimResponse.request = this.buildReference(data.claim.identifier[0]);

    claimResponse.outcome = 'complete';

    claimResponse.type_ = new CodeableConcept();
    claimResponse.type_.coding = [];

    const claimType = this.buildCoding('professional', 'Professional', 'http://hl7.org/fhir/ValueSet/claim-type');

    claimResponse.type_.coding.push(claimType);
    claimResponse.type_.text = 'Professional';

    // Placeholder disposition
    claimResponse.disposition = 'Claim fully settled as per contract.';

    // Build the payee from original claim
    claimResponse.payeeType = data.claim.payee.type_;

    //-----------------------------
    // Build the adjudicated items, processing net along the way
    //-----------------------------
    let { totalCost, totalCostCategory } = this.buildTotalCosts();
    let { totalBenefit, totalBenefitCategory } = this.buildTotalBenefits();

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
          this.buildAdjudicationItem('elegible', adjudicationItem.adjudication.elegible));
        itemTotalCost += adjudicationItem.adjudication.elegible;
      }

      // Copay
      if (adjudicationItem.adjudication && adjudicationItem.adjudication.copay) {
        claimResponseItem.adjudication.push(
          this.buildAdjudicationItem('copay', adjudicationItem.adjudication.copay));
      }

      // Eligible Percent
      if (adjudicationItem.adjudication && adjudicationItem.adjudication.eligpercent) {
        claimResponseItem.adjudication.push(
          this.buildAdjudicationItem('eligpercent', adjudicationItem.adjudication.eligpercent));
      }

      // Benefit
      if (adjudicationItem.adjudication && adjudicationItem.adjudication.eligpercent) {
        claimResponseItem.adjudication.push(
          this.buildAdjudicationItem('benefit', adjudicationItem.adjudication.benefit));
        itemTotalBenefit += adjudicationItem.adjudication.benefit;
      }

      // Deductible
      if (adjudicationItem.adjudication && adjudicationItem.adjudication.eligpercent) {
        claimResponseItem.adjudication.push(
          this.buildAdjudicationItem('deductible', adjudicationItem.adjudication.deductible));
        itemTotalBenefit += adjudicationItem.adjudication.benefit;
      }

      let lineItemPriceComponents = [];
      let lineItemPriceComponent = new InvoiceLineItemPriceComponent();
      lineItemPriceComponent.type_ = 'base';
      lineItemPriceComponent.amount = this.buildMoney(itemTotalCost);

      lineItemPriceComponents.push(lineItemPriceComponent);

      let lineItemPriceComponent2 = new InvoiceLineItemPriceComponent();
      lineItemPriceComponent2.type_ = 'deduction';
      lineItemPriceComponent2.amount = this.buildMoney(itemTotalBenefit)

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
    await this.createAccount(accountData, data.claimDate);

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
    await this.createInvoice(invoiceData, data.claimDate);
  }

  /**
   * 
   * @param type elegible|copay|eligpercent
   * @param val Amount value for Adjudication
   */
  buildAdjudicationItem(type: string, val: number) {
    let adjudication = new ClaimResponseItemAdjudication();
    adjudication.category = new CodeableConcept();
    adjudication.category.coding = [this.buildCoding(type)];
    adjudication.amount = this.buildMoney(val);
    return adjudication;
  }

  buildTotalCosts() {
    const totalCost = new ClaimResponseTotal();
    totalCost.amount = this.buildMoney(0)
    totalCost.category = new CodeableConcept();
    totalCost.category.coding = [];

    const totalCostCategory = this.buildCoding('submitted', 'Submitted Amount',
      'http://terminology.hl7.org/CodeSystem/adjudication');

    totalCost.category.coding.push(totalCostCategory);
    return { totalCost, totalCostCategory };
  }

  buildTotalBenefits() {
    const totalBenefit = new ClaimResponseTotal();
    totalBenefit.amount = this.buildMoney(0)
    totalBenefit.category = new CodeableConcept();
    totalBenefit.category.coding = [];

    const totalBenefitCategory = this.buildCoding('benefit', 'Benefit Amount', 'http://terminology.hl7.org/CodeSystem/adjudication');

    totalBenefit.category.coding.push(totalBenefitCategory);
    return { totalBenefit, totalBenefitCategory };
  }

  async buildInvoiceLineItems(items: FlatConvectorModel<ClaimItem>[]) {
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

  buildClaimResponseIdentifier(id: string) {
    let identifier = new Identifier();
    identifier.use = 'usual';
    identifier.system = 'Blockchain:ClaimResponse';
    identifier.value = id;
    return identifier;
  }

  async createAccount(data: AccountData, invoiceDate: Date) {
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

  async createInvoice(data: InvoiceData, invoiceDate: Date) {
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
  buildNarrative(status?: string, div?: string) {
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
  buildCoding(code?: string, display?: string, system?: string) {
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
  buildReference(identifier: Identifier) {
    let reference = new Reference();
    reference.identifier = identifier;
    return reference;
  }

  /**
   * Create a new instance of `Money`
   * @param value 
   * @param currency 
   */
  buildMoney(value: number, currency?: string) {
    let amount = new Money();
    amount.value = value;
    amount.currency = currency || Currencies.USD;
    return amount;
  }

  /**
   * Pay an invoice by Id
   * @param invoice Invoice Id
   */

  @Invokable()
  public async makePayment(id: string) {
    let invoice = await Invoice.getOne(id);
    // TODO: Check user based on this.sender;
    invoice.status = InvoiceStatus.BALANCED;
    await invoice.save();
  }

}