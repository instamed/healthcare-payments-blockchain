import * as yup from 'yup';
import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import {
  Invoice, Organization, Basic, CodeableConcept
} from '../models/financial.model';
import { InvoiceStatus, CodingTypes, ResourceTypes } from '../utils/enums';
import { PublicModelRouter } from '../models/public.model';
import { ChaincodeTx } from '@worldsibu/convector-core-chaincode';
import { PrivateCollectionsRoutes } from '..';
import { FeeExtensionsConfig } from '../models/feeExtensions.model';
import { buildCoding } from '../utils/utils';
import * as uuid from 'uuid';

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

    const newBasic: Basic = new Basic({
      id: `${new Basic().type}#${invoice.id}`,
      code: new CodeableConcept(),
      resourceType: ResourceTypes.BASIC,
      extension: await FeeExtensionsConfig.getFeeExtension(ResourceTypes.BASIC)
    });

    newBasic.code.coding = [ buildCoding(CodingTypes.FINANCIALTX) ];

    await newBasic.save();
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
