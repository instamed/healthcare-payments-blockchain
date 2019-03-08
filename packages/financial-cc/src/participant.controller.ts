import {
    Controller,
    ConvectorController,
    Invokable,
    Param
} from '@worldsibu/convector-core-controller';
import * as yup from 'yup';
import { ConsumerParticipant, ProviderParticipant, PayerParticipant } from './participant.model';
import { Patient } from './financial.model';
import { Organization } from '../../../chaincode-financial/packages/financial-cc/dist/src';

@Controller('participant')
export class ParticipantController extends ConvectorController {
    @Invokable()
    public async createConsumer(
        @Param(ConsumerParticipant)
        participant: ConsumerParticipant) {
        participant.id = participant.id.includes('Consumer::') ? participant.id :
            `Consumer::${participant.id}`;

        if (participant.patientUid) {
            // Check if patient exists
            let patient = await Patient.getOne(participant.patientUid);
            if (!patient || !patient.id) {
                throw new Error(`Associated Patient with ID ${participant.patientUid} does not exist`);
            }
        }
        await participant.save();
    }
    @Invokable()
    public async createProvider(
        @Param(ProviderParticipant)
        participant: ProviderParticipant) {
        participant.id = participant.id.includes('Provider::') ? participant.id :
            `Provider::${participant.id}`;

        let provider = await Organization.getOne(participant.providerUid);
        if (!provider || !provider.id) {
            throw new Error(`Associated Provider Organization with ID ${participant.providerUid} does not exist`);
        }

        await participant.save();
    }
    @Invokable()
    public async createPayer(
        @Param(PayerParticipant)
        participant: PayerParticipant) {
        participant.id = participant.id.includes('Payer::') ? participant.id :
            `Payer::${participant.id}`;

        let provider = await Organization.getOne(participant.payerUid);
        if (!provider || !provider.id) {
            throw new Error(`Associated Payer Organization with ID ${participant.payerUid} does not exist`);
        }
        
        await participant.save();
    }
}