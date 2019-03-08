import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';
import { Patient, Organization } from './financial.model';

export abstract class Participant<T extends Participant<any>> extends ConvectorModel<T> {

}

export class ConsumerParticipant extends Participant<ConsumerParticipant>{
  @ReadOnly()
  @Required()
  public readonly type = 'org.fhir.users.Consumer';

  @Validate(yup.string())
  public patientUid?: string;

  @Validate(Patient.schema())
  public patient?: Patient;
}

export class ProviderParticipant extends Participant<ProviderParticipant>{
  @ReadOnly()
  @Required()
  public readonly type = 'org.fhir.users.Provider';

  @Required()
  @Validate(yup.string())
  public providerUid: string;

  @Validate(Organization.schema())
  public provider?: Organization;
}

export class PayerParticipant extends Participant<PayerParticipant>{
  @ReadOnly()
  @Required()
  public readonly type = 'org.fhir.users.Payer';

  @Required()
  @Validate(yup.string())
  public payerUid: string;

  @Validate(Organization.schema())
  public payer?: Organization;
}