import {
  Controller,
  ConvectorController,
  Invokable
} from '@worldsibu/convector-core-controller';
import {
  Invoice, Claim, ClaimResponse, Identifier, CodeableConcept,
  ClaimResponseItem, InvoiceLineItemPriceComponent, Patient,
  Organization
} from './financial.model';
import { InvoiceStatus } from './utils/enums';
import { AdjudicationItem, InvoiceData, AccountData, Consumer } from './utils/params.model';
import {
  buildNarrative, buildInvoiceLineItems, buildClaimResponseIdentifier,
  buildReference, buildCoding, buildTotalCosts, buildTotalBenefits,
  buildAdjudicationItem, buildMoney, createAccount, createInvoice
} from './utils';

@Controller('payment')
export class PaymentController extends ConvectorController {
  /**
   * Pay an invoice by Id
   * @param invoice Invoice Id
   */
  @Invokable()
  public async make(id: string) {
    let invoice = await Invoice.getOne(id);
    // TODO: Check user based on this.sender;
    invoice.status = InvoiceStatus.BALANCED;
    await invoice.save();
  }

}