import { ConvectorModel, Default, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';

export class PublicClaim extends ConvectorModel<PublicClaim> {
    @Default('fhir.datatypes.public.Claim')
    @ReadOnly()
    public readonly type: string;

    @Required()
    @Validate(yup.string())
    public collection: string;
 }