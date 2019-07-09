import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core';
import { Patient, Organization } from './financial.model';
import { x509Identities } from '../utils/identities.model';

export abstract class Participant<T extends Participant<any>> extends ConvectorModel<T> {

}

export class ConsumerParticipant extends Participant<ConsumerParticipant>{
  @Default('org.fhir.users.Consumer')
  @ReadOnly()
  @Required()
  public readonly type: string;

  @Validate(yup.string())
  public patientUid?: string;

  @Validate(Patient.schema())
  public patient?: Patient;

  @Validate(yup.array(x509Identities))
  public identities: x509Identities[];
}

export class ProviderParticipant extends Participant<ProviderParticipant>{
  @Default('org.fhir.users.Provider')
  @ReadOnly()
  @Required()
  public readonly type: string;

  @Required()
  @Validate(yup.string())
  public providerUid: string;

  @Validate(Organization.schema())
  public provider?: Organization;
}

export class PayerParticipant extends Participant<PayerParticipant>{
  @Default('org.fhir.users.Payer')
  @ReadOnly()
  @Required()
  public readonly type: string;

  @Required()
  @Validate(yup.string())
  public payerUid: string;

  @Validate(Organization.schema())
  public payer?: Organization;
}