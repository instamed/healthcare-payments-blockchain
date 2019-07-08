import * as yup from 'yup';
import { ConvectorModel, Default, ReadOnly, 
    Required, Validate } from '@worldsibu/convector-core';

export class GovernanceCollections<T extends GovernanceCollections<any>> extends ConvectorModel<T> {
    @Default('org.fhir.governance.Organizations')
    @ReadOnly()
    @Required()
    public readonly type: string;

    @Validate(yup.array(yup.string()))
    public organizations?: string[];
}