import {
    Controller,
    ConvectorController,
    Invokable} from '@worldsibu/convector-core-controller';
import {
    Identifier, Patient, Organization} from './financial.model';
import { Consumer } from './utils/params.model';
import { buildNarrative, IdentifierTypes, ResourceTypes } from './utils';

@Controller('patient')
export class PatientController extends ConvectorController {
    @Invokable()
    public async create(data: {
        uid: string,
        consumer: Consumer,
        patientName: string,
        managingOrganization?: Organization,
        generalPractitioner?: Organization
    }) {
        const id = data.uid;
        const patient = new Patient(id);

        const identifier = new Identifier();
        identifier.value = id;
        identifier.system = IdentifierTypes.PATIENT;
        identifier.use = 'usual';
        patient.identifier = [identifier];

        // Set the necessary DomainResource stuff
        patient.resourceType = ResourceTypes.PATIENT;
        patient.text = buildNarrative('generated',
            `<div xmlns=\"http://www.w3.org/1999/xhtml\">Patient record for ${data.patientName}.</div>`);

        patient.active = true;

        await patient.save();
    }
}