import {
  Controller,
  ConvectorController,
  Invokable,
  Param
} from '@worldsibu/convector-core';
import * as yup from 'yup';
import { Organization, FeeExtensionsConfig } from '../models';

class parse {
  constructor(data) {
    Object.assign(this, data);
    console.log(data);
  }
}

@Controller('feeExtensions')
export class FeeExtensionsController extends ConvectorController {
  @Invokable()
  public async initConfig(
      @Param(yup.string())
      orgId: string,

      @Param(FeeExtensionsConfig)
      config: FeeExtensionsConfig
      ) {
        let provider = await Organization.getOne(orgId);
        let fingerprint = provider.identities.find(identity => identity.status).fingerprint;
    
        if (fingerprint != this.sender) {
          throw new Error(`Current identity is not authorized`);
        }
        
        config.id = FeeExtensionsConfig.ID;
        await config.save();
  }

  @Invokable()
  public async updateConfig(
      @Param(yup.string())
      orgId: string,

      @Param(yup.string())
      fee: string,

      @Param(yup.number())
      value: number
      ) {
        let provider = await Organization.getOne(orgId);
        let fingerprint = provider.identities.find(identity => identity.status).fingerprint;
    
        if (fingerprint != this.sender) {
          throw new Error(`Current identity is not authorized`);
        }

        const config = await FeeExtensionsConfig.getOne(FeeExtensionsConfig.ID);

        if(!config) throw new Error(`FeeExtensionsConfig not found, id: ${FeeExtensionsConfig.ID}`);

        if(!config[fee]) 
          throw new Error(`Fee: "${fee}" does not exist in config object: ${config}`);

        config[fee] = value;

        await config.save();
  }
}
