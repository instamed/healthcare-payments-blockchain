// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as uuid from 'uuid/v4';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import 'mocha';

import { FinancialControllerClient, Invoice } from '../client';
import { InvoiceStatus } from '../src/invoiceStatusEnum';

describe('Fhir', () => {
    // let modelSample: Fhir;
    let adapter: MockControllerAdapter;
    let ctrl: FinancialControllerClient;
    const testingID = 'invoice1';

    before(async () => {
        adapter = new MockControllerAdapter();
        ctrl = new FinancialControllerClient(adapter);
        await adapter.init([
            {
                version: '*',
                controller: 'FinancialController',
                name: join(__dirname, '..')
            }
        ]);
    });

    before(async ()=>{

    });

    it('should make a payment', async () => {
        await ctrl.makePayment(testingID);
        const invoice = await adapter.getById<Invoice>(testingID);
        expect(invoice.status).to.be(InvoiceStatus.BALANCED);
    });
});