import {
    Controller,
    ConvectorController,
    Invokable,
    Param
} from '@worldsibu/convector-core-controller';
import { Patient } from './financial.model';
import * as yup from 'yup';
import { FQDNObjects } from './utils';

@Controller('patient')
export class PatientController extends ConvectorController {
    /**
     * Create a new Patient.
     * @param patient 
     */
    @Invokable()
    public async create(
        @Param(Patient)
        patient: Patient) {
        patient.id = patient.id.includes(FQDNObjects.PATIENT.toString()) ? patient.id :
            `${FQDNObjects.PATIENT}#${patient.id}`;
            
        await patient.save();
    }
}