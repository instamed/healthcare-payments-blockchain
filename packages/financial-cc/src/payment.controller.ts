import {
  Controller,
  ConvectorController,
  Invokable
} from '@worldsibu/convector-core';
import {
  Invoice, Patient, Organization
} from './financial.model';
import { InvoiceStatus } from './utils/enums';
import { ConsumerParticipant } from './participant.model';

@Controller('payment')
export class PaymentController extends ConvectorController {
  /**
   * Pay an invoice by Id
   * @param invoice Invoice Id
   */
  @Invokable()
  public async make(id: string) {
    let invoice = await Invoice.getOne(id);

    let provider = await Organization.getOne(invoice.issuer.identifier.value);
    let fingerprint = provider.identities.find(identity => identity.status).fingerprint;

    if (fingerprint != this.sender) {
      throw new Error(`Current identity is not authorized to set invoice ${invoice.id} status to balanced`);
    }

    invoice.status = InvoiceStatus.BALANCED;
    await invoice.save();
  }

}