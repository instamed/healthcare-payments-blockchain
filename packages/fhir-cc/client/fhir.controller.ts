import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core-controller';

import { } from '../src/fhir.model';
import { ControllerAdapter } from '@worldsibu/convector-core-adapter';


export class FhirControllerClient extends ConvectorController {
  public name = 'fhir';

  constructor(public adapter: ControllerAdapter, public user?: string) {
    super()
  }

  
  public async createClaim() {

          return await this.adapter.invoke(this.name, 'createClaim', this.user, );
        
  }

  
  public async adjudicateClaim() {

          return await this.adapter.invoke(this.name, 'adjudicateClaim', this.user, );
        
  }

  
  public async makePayment() {

          return await this.adapter.invoke(this.name, 'makePayment', this.user, );
        
  }
}