// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { OrganizationController } from '../src/';
import 'mocha';
import { ClientFactory, ConvectorControllerClient } from '@worldsibu/convector-core';
import {
    PatientController, Organization, Patient, Claim, Encounter,
    ChargeItem, Account, Procedure, Invoice, ParticipantController,
    ConsumerParticipant, ProviderParticipant, PayerParticipant,
    ClaimController, PaymentController, GovernanceController, GovernanceCollections
} from '../src';
import { CreateClaim, AdjudicateClaim } from '../src/utils/params.model';
import { InvoiceStatus } from '../src/utils/enums';

const log = console.log;

describe.only('Fhir Financial', () => {
    let adapter: MockControllerAdapter;
    let ctrl: {
        org: OrganizationController,
        participant: ParticipantController,
        patient: ConvectorControllerClient<PatientController>,
        claim: ConvectorControllerClient<ClaimController>,
        payment: ConvectorControllerClient<PaymentController>,
        governance: GovernanceController
    };
    let provider = new Organization;
    let payer = new Organization;

    const providerId = 'resource:org.fhir.core.Organization#XYZ_Provider';
    const payerId = 'resource:org.fhir.core.Organization#ABC_Healthcare';
    const patientId = 'resource:org.fhir.core.Patient#Bob';
    const claimId = 'resource:org.fhir.core.Claim#Claim-1';
    const accountId = 'resource:org.fhir.core.Account#Account-1';
    const invoiceId = 'resource:org.fhir.core.Invoice#Invoice-1';

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
        }, {
            version: '*',
            controller: 'PaymentController',
            name: join(__dirname, '..')
        }, {
            version: '*',
            controller: 'ClaimController',
            name: join(__dirname, '..')
        }, {
            version: '*',
            controller: 'GovernanceController',
            name: join(__dirname, '..')
        }]);

        ctrl = {
            org: ClientFactory(OrganizationController, adapter),
            participant: ClientFactory(ParticipantController, adapter),
            patient: ClientFactory(PatientController, adapter),
            payment: ClientFactory(PaymentController, adapter),
            claim: ClientFactory(ClaimController, adapter),
            governance: ClientFactory(GovernanceController, adapter)
        };
    });

    it('should configure the governance collections', async () => {
        await ctrl.governance.updateOrganizationsList(['XYZ_Provider', 'ABC_Healthcare', 'InstaMed']);
        let result = new GovernanceCollections(await ctrl.governance.getOrganizationsList());

        expect(result).to.exist;
        expect(result.organizations).to.exist;
        expect(result.organizations.length).to.eq(3);
    });

    it('should show all the possible permutations', async () => {
        console.log(await ctrl.governance.getPrivateCollections());
    });

    it('should create a Provider organization', async () => {
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

    it('should create a Payer organization', async () => {
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

    it('should create a Provider participant', async () => {
        const participantId = 'Provider::Provida';
        const participant = new ProviderParticipant({
            id: participantId,
            providerUid: providerId
        });

        await ctrl.participant.createProvider(participant);

        let createdParticipant = await adapter.getById<ProviderParticipant>(participantId);
        expect(createdParticipant).to.exist;
        expect(createdParticipant.id).to.equal(participantId);
    });

    it('should create a Payer participant', async () => {
        const participantId = 'Payer::Insura';
        const participant = new PayerParticipant({
            id: participantId,
            payerUid: payerId
        });

        await ctrl.participant.createPayer(participant);

        let createdParticipant = await adapter.getById<PayerParticipant>(participantId);
        expect(createdParticipant).to.exist;
        expect(createdParticipant.id).to.equal(participantId);
    });

    it('create a claim (encounter, chargeItems, procedures)', async () => {
        const claim = new CreateClaim({
            txDate: new Date(),
            'patientId': patientId,
            'providerId': providerId,
            'encounterUid': 'resource:org.fhir.core.Encounter#Encounter-1',
            'claimUid': claimId,
            'payerId': payerId,
            'services': [
                {
                    'hcpcsCode': '99230',
                    'quantity': 1,
                    'unitPrice': 45,
                    'procedureUid': 'resource:org.fhir.core.Procedure#Procedure-1',
                    'chargeItemUid': 'resource:org.fhir.core.ChargeItem#ChargeItem-1'
                },
                {
                    'hcpcsCode': '90756',
                    'quantity': 3,
                    'unitPrice': 55,
                    'procedureUid': 'resource:org.fhir.core.Procedure#Procedure-2',
                    'chargeItemUid': 'resource:org.fhir.core.ChargeItem#ChargeItem-2'
                }
            ]
        });
        await ctrl.claim.$config({
            transient: { data: claim.toJSON() }
        }).create();

        const createdClaim = await adapter.getById<Claim>(claimId);
        expect(createdClaim.id).to.equal(claimId);
        log(`Claim with id '${createdClaim.id}' created successfully`);

        const procedure1 = await adapter.getById<Procedure>(claim.services[0].procedureUid);
        expect(procedure1.id, 'Procedure 1 was not created successfully').to.exist;
        log(`Procedure with id '${procedure1.id}' created successfully`);

        const procedure2 = await adapter.getById<Procedure>(claim.services[1].procedureUid);
        expect(procedure2.id, 'Procedure 2 was not created successfully').to.exist;
        log(`Procedure with id '${procedure2.id}' created successfully`);

        const chargeItem1 = await adapter.getById<ChargeItem>(claim.services[0].chargeItemUid);
        expect(chargeItem1.id, 'Charge item 1 was not created successfully').to.exist;
        log(`ChargeItem with id '${chargeItem1.id}' created successfully`);

        const chargeItem2 = await adapter.getById<ChargeItem>(claim.services[1].chargeItemUid);
        expect(chargeItem2.id, 'Charge item 2 was not created successfully').to.exist;
        log(`ChargeItem with id '${chargeItem2.id}' created successfully`);

        const encounter = await adapter.getById<Encounter>(claim.encounterUid);
        expect(encounter.id, 'Encounter was not created successfully').to.exist;
        log(`Encounter with id '${encounter.id}' created successfully`);
    });

    it('should adjudicate a claim (create a claim response, invoice, account)', async () => {
        debugger;
        const claim = new AdjudicateClaim({
            txDate: new Date(),
            'uid': 'resource:org.fhir.core.ClaimResponse#ClaimResponse-1',
            'claimUid': claimId,
            'accountUid': accountId,
            'invoiceUid': invoiceId,
            'adjudications': [{
                'sequenceNumber': 1,
                'adjudication': {
                    'eligible': 20,
                    'copay': 10,
                    'eligpercent': 80,
                    'benefit': 6
                }
            },
            {
                'sequenceNumber': 2,
                'adjudication': {
                    'eligible': 40,
                    'copay': 10,
                    'eligpercent': 80,
                    'benefit': 22
                }
            }
            ]
        });
        await ctrl.claim.adjudicate(claim);
        const claimResponseCreated = await adapter.getById<Account>(claim.uid);
        expect(claimResponseCreated.id).to.equal(claim.uid);
        log(`Claim response with id '${claim.uid}' created successfully`);

        const createdAccount = await adapter.getById<Account>(claim.accountUid);
        expect(createdAccount.id).to.equal(claim.accountUid);
        log(`Account with id '${claim.accountUid}' created successfully`);

        const createdInvoice = await adapter.getById<Account>(claim.invoiceUid);
        expect(createdInvoice.id).to.equal(claim.invoiceUid);
        log(`Invoice with id '${claim.invoiceUid}' created successfully`);
    });

    it('should make a payment', async () => {
        log('Checking that payment was not made before');
        let invoice = await adapter.getById<Invoice>(invoiceId);
        expect(invoice.status).to.not.equal(InvoiceStatus.BALANCED);
        await ctrl.payment.make(invoiceId);
        invoice = await adapter.getById<Invoice>(invoiceId);
        expect(invoice.status).to.equal(InvoiceStatus.BALANCED);
        log('Payment successfully applied');
    });
});