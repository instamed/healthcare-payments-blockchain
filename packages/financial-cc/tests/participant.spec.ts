// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import * as chai from 'chai';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { OrganizationController } from '../src/organization.controller';
import 'mocha';
import * as chaiAsPromised from 'chai-as-promised';
import { ClientFactory } from '@worldsibu/convector-core-adapter';
import {
    PatientController, Organization, Patient, ParticipantController,
    ConsumerParticipant, ProviderParticipant, PayerParticipant
} from '../src';

const log = console.log;

describe('Fhir Financial - Participants', () => {
    chai.use(chaiAsPromised);
    let adapter: MockControllerAdapter;
    let ctrl: {
        org: OrganizationController,
        participant: ParticipantController,
        patient: PatientController
    };
    let provider = new Organization;
    let payer = new Organization;

    const providerId = 'resource:org.fhir.core.Organization#XYZ_Provider';
    const payerId = 'resource:org.fhir.core.Organization#ABC_Healthcare';
    const patientId = 'resource:org.fhir.core.Patient#Bob';
    const consumerParticipantId2 = 'Consumer::Bob2';

    const mockIdentity = 'B6:0B:37:7C:DF:D2:7A:08:0B:98:BF:52:A4:2C:DC:4E:CC:70:91:E1';

    before('Init controllers', async () => {
        adapter = new MockControllerAdapter();
        await adapter.init([{
            version: '*',
            controller: 'OrganizationController',
            name: join(__dirname, '..')
        }, {
            version: '*',
            controller: 'ParticipantController',
            name: join(__dirname, '..')
        }, {
            version: '*',
            controller: 'PatientController',
            name: join(__dirname, '..')
        }]);

        ctrl = {
            org: ClientFactory(OrganizationController, adapter),
            participant: ClientFactory(ParticipantController, adapter),
            patient: ClientFactory(PatientController, adapter)
        };
    });

    before('Mock previous organizations', async () => {
        provider = new Organization({
            'resourceType': 'Organization',
            'id': providerId,
            'identifier': [
                {
                    'use': 'usual',
                    'system': 'Blockchain:Provider',
                    'value': providerId
                }
            ],
            'active': true,
            'type_': [
                {
                    'coding': [
                        {
                            'system': 'http://hl7.org/fhir/organization-type',
                            'code': 'prov',
                            'display': 'Healthcare Provider'
                        }
                    ]
                }
            ],
            'name': 'XYZ Health Services',
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
        });
        await ctrl.org.create(provider, mockIdentity);
        let createdProvider = await adapter.getById<Organization>(providerId);
        expect(createdProvider.id).to.equal(providerId);
    });

    before('Mock previous organizations', async () => {
        payer = new Organization(
            {
                'resourceType': 'Organization',
                'id': payerId,
                'identifier': [
                    {
                        'use': 'usual',
                        'system': 'Blockchain:Payer',
                        'value': payerId
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

        await ctrl.org.create(payer, mockIdentity);

        let createdPayer = await adapter.getById<Organization>(payerId);
        expect(createdPayer.id).to.equal(payerId);
    });

    it('should create a patient', async () => {
        const patient = new Patient({
            'resourceType': 'Patient',
            'id': patientId,
            'identifier': [
                {
                    'use': 'usual',
                    'system': 'Blockchain:Patient',
                    'value': patientId
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
            'birthDate': '1944-11-17',
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
            },
            'managingOrganization': {
                'identifier': {
                    'use': 'usual',
                    'system': 'Blockchain:Provider',
                    'value': 'Provider::Provida'
                }
            }
        });
        await ctrl.patient.create(patient);

        let createdPatient = await adapter.getById<Patient>(patientId);
        expect(createdPatient.id).to.equal(patientId);
        log('Patient fully qualified name set');
    });

    it('should create a Consumer participant', async () => {
        const consumerParticipantId = 'Consumer::Bob';
        const participant = new ConsumerParticipant({
            id: consumerParticipantId
        });

        await ctrl.participant.createConsumer(participant, mockIdentity);

        let createdParticipant = await adapter.getById<ConsumerParticipant>(consumerParticipantId);
        expect(createdParticipant).to.exist;
        expect(createdParticipant.id).to.equal(consumerParticipantId);
    });

    it('should create a second Consumer participant associated to a Patient', async () => {
        const consumerParticipantId = 'Consumer::Bob2';
        const participant = new ConsumerParticipant({
            id: consumerParticipantId2,
            patientUid: patientId
        });

        await ctrl.participant.createConsumer(participant, mockIdentity);

        let createdParticipant = await adapter.getById<ConsumerParticipant>(consumerParticipantId);
        expect(createdParticipant).to.exist;
        expect(createdParticipant.patientUid).to.equal(patientId);
    });

    it('should fail to create a Provider participant', async () => {
        const participantId = 'Provider::Provida';
        const participant = new ProviderParticipant({
            id: participantId,
            providerUid: providerId + 'failme'
        });

        await expect(ctrl.participant.createProvider(participant)).to.be.eventually.rejected;
    });

    it('should fail to create a Payer participant', async () => {
        const participantId = 'Payer::Insura';
        const participant = new PayerParticipant({
            id: participantId,
            payerUid: payerId + 'failme'
        });

        await expect(ctrl.participant.createPayer(participant)).to.be.eventually.rejected;
    });


});