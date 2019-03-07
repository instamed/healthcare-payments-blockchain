// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { OrganizationController } from '../src/organization.controller';
import 'mocha';
import { ClientFactory } from '@worldsibu/convector-core-adapter';
import { PatientController, Organization, Identifier, Patient } from '../src';
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
    let provider = new Organization;
    let payer = new Organization;


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

    it('Create default organization Provider', async () => {
        const providerId = 'XYZ_Provider';
        provider = new Organization(providerId);
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
        console.log(createdProvider);
        expect(createdProvider.id).to.equal(providerId);
    });

    it('Create default organization Payer', async () => {
        const payerId = 'ABC_Healthcare';
        payer = new Organization(
            {
                'resourceType': 'Organization',
                'id': payerId,
                'identifier': [
                    {
                        'use': 'usual',
                        'system': 'Blockchain:Payer',
                        'value': 'ABC_Healthcare'
                    }
                ],
                'active': true,
                'type_': [
                    {
                        'coding': [
                            {
                                'system': 'http://hl7.org/fhir/organization-type',
                                'code': 'ins',
                                'display': 'Insurance Company'
                            }
                        ]
                    }
                ],
                'name': 'ABC Healthcare Insurance',
                'telecom': [
                    {
                        'system': 'phone',
                        'value': '098-765 4321'
                    }
                ],
                'address': [
                    {
                        'line': [
                            'Somewhere Newport Beach'
                        ]
                    }
                ],
                'contact': [
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
                            'text': 'Insurance Management Guy'
                        },
                        'telecom': [
                            {
                                'system': 'phone',
                                'value': '1-234-567-8910'
                            },
                            {
                                'system': 'email',
                                'value': 'cool_guy@insura.com'
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
            });

        await ctrl.org.create(payer);

        let createdPayer = await adapter.getById<Organization>(payerId);
        expect(createdPayer.id).to.equal(payerId);
    });

    it('should create a patient', async () => {
        const patient = new Patient({
            'resourceType': 'Patient',
            'id': 'Bob',
            'identifier': [
                {
                    'use': 'usual',
                    'system': 'Blockchain:Patient',
                    'value': 'Bob'
                }
            ],
            'active': true,
            'name': [
                {
                    'use': 'usual',
                    'family': 'Testington',
                    'given': [
                        'Bob'
                    ],
                    'suffix': [
                        'Mr'
                    ]
                }
            ],
            'telecom': [
                {
                    'system': 'phone',
                    'value': '1234567890',
                    'use': 'mobile'
                },
                {
                    'system': 'email',
                    'value': 'bob_test@instamed.com',
                    'use': 'home'
                }
            ],
            'gender': 'male',
            'birthDate': new Date('1944-11-17'),
            'deceasedBoolean': false,
            'address': [
                {
                    'use': 'home',
                    'line': [
                        '123 Test Way'
                    ],
                    'city': 'Newport Beach',
                    'postalCode': '12345',
                    'country': 'USA'
                }
            ],
            'maritalStatus': {
                'coding': [
                    {
                        'system': 'http://hl7.org/fhir/v3/MaritalStatus',
                        'code': 'M',
                        'display': 'Married'
                    }
                ],
                'text': 'Married'
            }
        });
        await ctrl.patient.create(patient);

        let createdPayer = await adapter.getById<Organization>(payerId);
        expect(createdPayer.id).to.equal(payerId);
    });


    it('should make a payment', async () => {
        // await ctrl.payment.make(testingID);
        // const invoice = await adapter.getById<Invoice>(testingID);
        // expect(invoice.status).to.be(InvoiceStatus.BALANCED);
    });
});