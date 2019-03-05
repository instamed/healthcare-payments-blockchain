// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import 'mocha';

import { Fhir } from '../src/fhir.model';
import { FhirControllerClient } from '../client';

describe('Fhir', () => {
    let modelSample: Fhir;
    let adapter: MockControllerAdapter;
    let fhirCtrl: FhirControllerClient;

    before(async () => {
        const now = new Date().getTime();
        modelSample = new Fhir();
        modelSample.id = uuid();
        modelSample.name = 'Test';
        modelSample.created = now;
        modelSample.modified = now;
        // Mocks the blockchain execution environment
        adapter = new MockControllerAdapter();
        fhirCtrl = new FhirControllerClient(adapter);

        await adapter.init([
            {
            version: '*',
            controller: 'FhirController',
            name: join(__dirname, '..')
            }
        ]);

    });

    it('should create a default model', async () => {
    await fhirCtrl.create(modelSample);

    const justSavedModel = await adapter.getById<Fhir>(modelSample.id);

    expect(justSavedModel.id).to.exist;
    });
});