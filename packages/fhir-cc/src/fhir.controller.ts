import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Invoice } from './fhir.model';
import { InvoiceStatus } from './invoiceStatusEnum';

@Controller('fhir')
export class FhirController extends ConvectorController {

  @Invokable()
  public async createClaim() {

  }

  @Invokable()
  public async adjudicateClaim() {

  }

  /**
   * Pay an invoice by Id
   * @param invoice Invoice Id
   */

  @Invokable()
  public async makePayment(id: string) {
    let invoice = await Invoice.getOne(id);
    // TODO: Check user
    invoice.status = InvoiceStatus.BALANCED;
    await invoice.save();
  }

}