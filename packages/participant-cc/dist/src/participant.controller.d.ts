import { ConvectorController } from '@worldsibu/convector-core-controller';
import { Participant } from './participant.model';
export declare class ParticipantController extends ConvectorController {
    create(participant: Participant): Promise<void>;
}
