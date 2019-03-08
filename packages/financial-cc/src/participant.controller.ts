import {
    Controller,
    ConvectorController,
    Invokable,
    Param
} from '@worldsibu/convector-core-controller';
import { Participant, ParticipantType } from './';
import * as yup from 'yup';

@Controller('participant')
export class ParticipantController extends ConvectorController {
    /**
     * Create a new Patient.
     * @param patient 
     */
    @Invokable()
    public async create(
        @Param(Participant)
        participant: Participant,
        @Param(yup.string())
        type: ParticipantType) {
        debugger;
        switch (type) {
            case ParticipantType.CONSUMER:
                participant.id = participant.id.includes('Consumer::') ? participant.id :
                    `Consumer::${participant.id}`;
                participant.type = `org.fhir.users.Consumer`;
                break;
            case ParticipantType.PAYER:
                participant.id = participant.id.includes('Payer::') ? participant.id :
                    `Payer::${participant.id}`;
                participant.type = `org.fhir.users.Payer`;
                break;
            case ParticipantType.PROVIDER:
                participant.id = participant.id.includes('Provider::') ? participant.id :
                    `Provider::${participant.id}`;
                participant.type = `org.fhir.users.Provider`;
                break;
        }
        await participant.save();
    }
}