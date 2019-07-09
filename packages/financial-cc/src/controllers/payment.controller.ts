import {
  Controller,
  ConvectorController,
  Invokable
} from '@worldsibu/convector-core';
import {
  Invoice, Patient, Organization
} from '../models/financial.model';
import { InvoiceStatus } from '../utils/enums';
import { ConsumerParticipant } from '../models/participant.model';
import { PublicModelRouter } from '../models/public.model';

@Controller('payment')
export class PaymentController extends ConvectorController {
  /**
   * Pay an invoice by Id
   * @param invoice Invoice Id
   */
  @Invokable()
  public async make(id: string) {
    let invoice = await this.getInvoice(id);

    let provider = await Organization.getOne(invoice.issuer.identifier.value);
    let fingerprint = provider.identities.find(identity => identity.status).fingerprint;

    if (fingerprint != this.sender) {
      throw new Error(`Current identity is not authorized to set invoice ${invoice.id} status to balanced`);
    }

    invoice.status = InvoiceStatus.BALANCED;
    await invoice.save();
  }

  async getInvoice(id: string) {
    let publicCoordinates = await PublicModelRouter.getOne(id);
    return await Invoice.getOne(id, Invoice, {
      privateCollection: publicCoordinates.collection
    });
  }
}