import {
    Controller,
    ConvectorController,
    Invokable,
    Param} from '@worldsibu/convector-core-controller';
import {
    Identifier, Patient, Organization} from './financial.model';
import { Consumer } from './utils/params.model';
import { buildNarrative, IdentifierTypes, ResourceTypes } from './utils';

@Controller('patient')
export class PatientController extends ConvectorController {
    @Invokable()
    public async create(
        @Param(Patient)
        patient: Patient) {
        await patient.save();
    }
}