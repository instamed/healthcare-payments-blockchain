import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import {
  Invoice, Patient, Organization
} from '../models/financial.model';
import { InvoiceStatus } from '../utils/enums';
import { ConsumerParticipant } from '../models/participant.model';
import { PublicModelRouter } from '../models/public.model';
import { ChaincodeTx } from '@worldsibu/convector-core-chaincode';
import { PrivateCollectionsRoutes } from '..';

class parse {
  constructor(data) {
    Object.assign(this, data);
    console.log(data);
  }
}

@Controller('payment')
export class PaymentController extends ConvectorController<ChaincodeTx> {

  @Invokable()
  public async getOneInvoice(
    @Param(yup.string())
    invoiceId) {
    return await this.getInvoice(invoiceId);
  }
  /**
   * Pay an invoice by Id
   * @param invoice Invoice Id
   */
  @Invokable()
  public async make() {
    const invoice = await this.tx.getTransientValue('invoice', parse) as any;
    console.log(invoice);
    let provider = await Organization.getOne(invoice.issuer.identifier.value);
    let fingerprint = provider.identities.find(identity => identity.status).fingerprint;

    if (fingerprint != this.sender) {
      throw new Error(`Current identity is not authorized to set invoice ${invoice.id} status to balanced`);
    }

    invoice.status = InvoiceStatus.BALANCED;

    await this.saveInvoice(invoice);
  }

  async getInvoice(id: string) {
    let publicCoordinates = await PublicModelRouter.getOne(id);
    return await Invoice.getOne(id, Invoice, {
      privateCollection: publicCoordinates.collection
    });
  }
  async saveInvoice(invoice: Invoice) {
    const collections = new PrivateCollectionsRoutes(invoice.recipient.identifier.value,
      invoice.issuer.identifier.value, invoice.issuer.identifier.value);
    await collections.load();
    await new Invoice(invoice).save({
      privateCollection: collections.invoice
    });
    let publicModel = new PublicModelRouter(invoice.id);
    publicModel.collection = collections.invoice;
    await publicModel.save();
  }
}