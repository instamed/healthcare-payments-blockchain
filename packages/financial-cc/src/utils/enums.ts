export enum FQDNObjects {
    CLAIM = 'resource:org.fhir.core.Claim',
    ORGANIZATION = 'resource:org.fhir.core.Organization',
    CONSUMERPARTICIPANT = 'Consumer::',
    PROVIDERPARTICIPANT = 'Provider::',
    PAYERPARTICIPANT = 'Payer::',
    PATIENT = 'resource:org.fhir.core.Patient',
    CONSORTIUMADMINPARTICIPANT = 'consortiumAdmin::'
}
export enum InvoiceStatus {
    BALANCED = 'balanced',
    ISSUED = 'issued'
}
export enum AccountStatus {
    ACTIVE = 'active'
}
export enum Currencies {
    USD = 'USD'
}
export enum IdentifierTypes {
    ENCOUNTER = 'Blockchain:Encounter',
    CLAIMRESPONSE = 'Blockchain:ClaimResponse',
    CLAIM = 'Blockchain:Claim',
    PATIENT = 'Blockchain:Patient',
    ACCOUNT = 'Blockchain:Account',
    INVOICE = 'Blockchain:Invoice',
    PROCEDURE = 'Blockchain:Procedure',
    CHARGEITEM = 'Blockchain:ChargeItem',
}
export enum ResourceTypes {
    ACCOUNT = 'Account',
    INVOICE = 'Invoice',
    ORGANIZATION = 'Organization',
    PROCEDURE = 'Procedure',
    CHARGEITEM = 'ChargeItem',
    PATIENT = 'Patient',
    CLAIMRESPONSE = 'ClaimResponse',
    CLAIM = 'Claim',
    ENCOUNTER = 'Encounter',
    BASIC = 'Basic'
}
export enum EncounterStatus {
    INPROGRESS = 'in-progress',
    FINISHED = 'finished'
}
export enum NarrativeStatus {
    GENERATED = 'generated'
}
export enum IdentifierUses {
    USUAL = 'usual'
}
export enum ClaimStatus {
    ACTIVE = 'active'
}
export enum ClaimUses {
    COMPLETE = 'complete'
}
export enum ClaimResponseStatus {
    ACTIVE = 'active'
}
export enum ClaimResponseUses {
    CLAIM = 'claim'
}
export enum ClaimResponseOutcomes {
    COMPLETE = 'complete'
}
export enum ChargeItemStatus {
    BILLABLE = 'billable',
    BILLED = 'billed'
}
export enum ProcedureStatus {
    COMPLETED = 'completed'
}
export enum InvoiceLineItemPriceComponentTypes {
    BASE = 'base',
    DEDUCTION = 'deduction'
}
export enum CodingTypes {
    SUBMITTED = 'submitted',
    BENEFIT = 'benefit',
    DEDUCTIBLE = 'deductible',
    COPAY = 'copay',
    ELEGIBLE = 'eligible',
    ELIGPERCENT = 'eligpercent',
    PROFESSIONAL = 'professional',
    OBSENC = 'OBSENC',
    NORMAL = 'normal',
    PROVIDER = 'provider',
    PBILLACCT = 'PBILLACCT',
    PATIENT = 'PATIENT',
    FINANCIALTX = 'Financial Transaction'
}
