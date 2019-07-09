import { ConvectorModel, Default, ReadOnly, Required, Validate } from '@worldsibu/convector-core';
import * as yup from 'yup';

export class PublicModelRouter extends ConvectorModel<PublicModelRouter> {
    @Default('fhir.datatypes.public.router')
    @ReadOnly()
    public readonly type: string;

    @Required()
    @Validate(yup.string())
    public collection: string;
 }