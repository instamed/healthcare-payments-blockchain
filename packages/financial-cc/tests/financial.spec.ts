// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { OrganizationController } from '../src/organization.controller';
import 'mocha';
import { ClientFactory } from '@worldsibu/convector-core-adapter';
import { PatientController, Organization, Identifier } from '../src';
import { ClaimController, PaymentController, Invoice } from '../src';
import { ResourceTypes, buildCoding } from '../src/utils';


describe('Fhir Financial', () => {
    let adapter: MockControllerAdapter;
    let ctrl: {
        org: OrganizationController,
        patient: PatientController,
        claim: ClaimController,
        payment: PaymentController
    };
    const testingID = 'invoice1';

    before('Init controllers', async () => {
        adapter = new MockControllerAdapter();
        await adapter.init([{
            version: '*',
            controller: 'OrganizationController',
            name: join(__dirname, '..')
        }, {
            version: '*',
            controller: 'PatientController',
            name: join(__dirname, '..')
        }, {
            version: '*',
            controller: 'PaymentController',
            name: join(__dirname, '..')
        }, {
            version: '*',
            controller: 'ClaimController',
            name: join(__dirname, '..')
        }]);

        ctrl = {
            org: ClientFactory(OrganizationController, adapter),
            patient: ClientFactory(PatientController, adapter),
            payment: ClientFactory(PaymentController, adapter),
            claim: ClientFactory(ClaimController, adapter)
        };
    });

    before('Create default organization Provider', async () => {
        const providerId = 'XYZ_Provider';
        let provider = new Organization(providerId);
        provider.resourceType = ResourceTypes.ORGANIZATION;
        provider.active = true;
        provider.name = 'XYZ Health Services';
        provider.type_ = [
            buildCoding('prov', 'Healthcare Provider', 'http://hl7.org/fhir/organization-type')
        ];
        provider.telecom = [
            {
                system: 'phone',
                value: '098-765 4321'
            }
        ];
        provider.address = [{ line: ['Somewhere Newport Beach'] }];
        provider.contact = [
            {
                'purpose': {
                    'coding': [
                        {
                            'system': 'http://terminology.hl7.org/CodeSystem/contactentity-type',
                            'code': 'ADMIN'
                        }
                    ]
                },
                'name': {
                    'text': 'Dr. Provida'
                },
                'telecom': [
                    {
                        'system': 'phone',
                        'value': '022-655 2321'
                    },
                    {
                        'system': 'email',
                        'value': 'dr@XYZ_Provider.com'
                    },
                    {
                        'system': 'fax',
                        'value': '022-655 2322'
                    }
                ],
                'address': {
                    'line': [
                        'Somewhere Newport Beach'
                    ]
                }
            }
        ]
        await ctrl.org.create(provider);

        let createdProvider = await adapter.getById<Organization>(providerId);
        
        expect(createdProvider.id).to.be(providerId);
    });


    it('should make a payment', async () => {
        // await ctrl.payment.make(testingID);
        // const invoice = await adapter.getById<Invoice>(testingID);
        // expect(invoice.status).to.be(InvoiceStatus.BALANCED);
    });
});