import * as yup from 'yup';
import {
  ConvectorModel,
  Default,
  ReadOnly,
  Required,
  Validate
} from '@worldsibu/convector-core-model';

export class Participant extends ConvectorModel<Participant> {
  @ReadOnly()
  @Required()
  public type = 'org.fhir.users.';

  @Required()
  @Validate(yup.string())
  public name: string;

  @Required()
  @Validate(yup.string())
  public organization: string;
}

export enum ParticipantType {
  CONSUMER = 'Consumer',
  PAYER = 'Payer',
  PROVIDER = 'Provider'
}