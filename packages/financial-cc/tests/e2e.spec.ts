// tslint:disable:no-unused-expression
import { join } from 'path';
import { expect } from 'chai';
import { MockControllerAdapter } from '@worldsibu/convector-adapter-mock';
import { OrganizationController } from '../src/organization.controller';
import 'mocha';
import { ClientFactory } from '@worldsibu/convector-core-adapter';
import {
    PatientController, Organization, Patient, Claim,
    ChargeItem, Account, Procedure, Invoice
} from '../src';
import { ClaimController, PaymentController } from '../src';
import { CreateClaim, AdjudicateClaim, InvoiceStatus } from '../src/utils';
import { Encounter } from '../dist/src';

const log = console.log;

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

    const providerId = 'XYZ_Provider';
    const payerId = 'ABC_Healthcare';
    const patientId = 'Bob';
    const claimId = 'Claim-1';
    const accountId = 'Account-1';
    const invoiceId = 'Invoice-1';

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

    it('should create default organization Provider', async () => {
        provider = new Organization({
            'resourceType': 'Organization',
            'id': 'XYZ_Provider',
            'identifier': [
                {
                    'use': 'usual',
                    'system': 'Blockchain:Provider',
                    'value': 'XYZ_Provider'
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
        await ctrl.org.create(provider);
        let createdProvider = await adapter.getById<Organization>(providerId);
        expect(createdProvider.id).to.equal(providerId);
    });

    it('should create default organization Payer', async () => {
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
            'id': patientId,
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
                    '$class': 'org.fhir.datatypes.Identifier',
                    'use': 'usual',
                    'system': 'Blockchain:Provider',
                    'value': 'Provider::Provida'
                }
            }
        });
        await ctrl.patient.create(patient);

        let createdPatient = await adapter.getById<Patient>(patientId);
        expect(createdPatient.id).to.equal(patientId);
    });

    it('create a claim (encounter, chargeItems, procedures)', async () => {
        const claim = new CreateClaim({
            txDate: new Date(),
            // 'patientId': 'resource:org.fhir.core.Patient#Bob',
            'patientId': patientId,
            // 'providerId': 'resource:org.fhir.core.Organization#XYZ_Provider',
            'providerId': providerId,
            'encounterUid': 'Encounter-1',
            'claimUid': claimId,
            // 'payerId': 'resource:org.fhir.core.Organization#ABC_Healthcare',
            'payerId': payerId,
            'services': [
                {
                    'hcpcsCode': '99230',
                    'quantity': 1,
                    'unitPrice': 45,
                    'procedureUid': 'Procedure-1',
                    'chargeItemUid': 'ChargeItem-1'
                },
                {
                    'hcpcsCode': '90756',
                    'quantity': 3,
                    'unitPrice': 55,
                    'procedureUid': 'Procedure-2',
                    'chargeItemUid': 'ChargeItem-2'
                }
            ]
        });
        await ctrl.claim.create(claim);
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

    it('adjudicate a claim (create a claim response, invoice, account)', async () => {
        const claim = new AdjudicateClaim({
            txDate: new Date(),
            'uid': 'ClaimResponse-1',
            // 'claimUid': 'resource:org.fhir.core.Claim#Claim-1',
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

    it('make a payment', async () => {
        log('Checking that payment was not made before');
        let invoice = await adapter.getById<Invoice>(invoiceId);
        expect(invoice.status).to.not.equal(InvoiceStatus.BALANCED);
        await ctrl.payment.make(invoiceId);
        invoice = await adapter.getById<Invoice>(invoiceId);
        expect(invoice.status).to.equal(InvoiceStatus.BALANCED);
        log('Payment successfully applied');
    });
});