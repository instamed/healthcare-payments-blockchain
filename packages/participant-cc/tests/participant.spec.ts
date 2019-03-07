// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import 'mocha';

import { Participant } from '../src/participant.model';
import { ParticipantControllerClient } from '../client';

describe('Participant', () => {
    let modelSample: Participant;
    let adapter: MockControllerAdapter;
    let participantCtrl: ParticipantControllerClient;

    before(async () => {
        const now = new Date().getTime();
        modelSample = new Participant();
        modelSample.id = uuid();
        modelSample.name = 'Test';
        // Mocks the blockchain execution environment
        adapter = new MockControllerAdapter();
        participantCtrl = new ParticipantControllerClient(adapter);

        await adapter.init([
            {
                version: '*',
                controller: 'ParticipantController',
                name: join(__dirname, '..')
            }
        ]);

    });

    it('should create a default model', async () => {
        // await participantCtrl.create(modelSample);

        // const justSavedModel = await adapter.getById<Participant>(modelSample.id);

        // expect(justSavedModel.id).to.exist;
    });
});