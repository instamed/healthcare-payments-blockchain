import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { Participant } from '../src/participant.model';
import { ControllerAdapter } from '@worldsibu/convector-core-adapter';


export class ParticipantControllerClient extends ConvectorController {
  public name = 'participant';

  constructor(public adapter: ControllerAdapter, public user?: string) {
    super()
  }

  
  public async create(
    
    participant: Participant
  ) {

          return await this.adapter.invoke(this.name, 'create', this.user, participant);
        
  }
}