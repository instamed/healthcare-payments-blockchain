import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Participant } from './participant.model';

@Controller('participant')
export class ParticipantController extends ConvectorController {
  @Invokable()
  public async create(
    @Param(Participant)
    participant: Participant
  ) {
    await participant.save();
  }
}