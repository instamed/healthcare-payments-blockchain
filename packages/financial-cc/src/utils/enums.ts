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
    PROCEDURE = 'Procedure',
    CHARGEITEM = 'ChargeItem',
    PATIENT = 'Patient',
    CLAIMRESPONSE = 'ClaimResponse',
    CLAIM = 'Claim',
    ENCOUNTER = 'Encounter'
}