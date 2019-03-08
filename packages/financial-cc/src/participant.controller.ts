import {
    Controller,
    ConvectorController,
    Invokable,
    Param
} from '@worldsibu/convector-core-controller';
import * as yup from 'yup';
import { ConsumerParticipant, ProviderParticipant, PayerParticipant } from './participant.model';

@Controller('participant')
export class ParticipantController extends ConvectorController {
    @Invokable()
    public async createConsumer(
        @Param(ConsumerParticipant)
        participant: ConsumerParticipant) {
        participant.id = participant.id.includes('Consumer::') ? participant.id :
            `Consumer::${participant.id}`;
        await participant.save();
    }
    @Invokable()
    public async createProvider(
        @Param(ProviderParticipant)
        participant: ProviderParticipant) {
        participant.id = participant.id.includes('Provider::') ? participant.id :
            `Provider::${participant.id}`;
        await participant.save();
    }
    @Invokable()
    public async createPayer(
        @Param(PayerParticipant)
        participant: PayerParticipant) {
        participant.id = participant.id.includes('Payer::') ? participant.id :
            `Payer::${participant.id}`;
        await participant.save();
    }
}