import { ConvectorModel, FlatConvectorModel } from '@worldsibu/convector-core-model';
export declare type date = string;
export declare type instant = string;
export declare type time = string;
export declare type dateTime = string;
export declare type base64Binary = string;
export declare type decimal = number;
export declare type url = string;
export declare type code = string;
export declare type integer = number;
export declare type uri = string;
export declare type canonical = string;
export declare type markdown = string;
export declare type id = string;
export declare type oid = string;
export declare type uuid = string;
export declare type unsignedInt = number;
export declare type positiveInt = number;
export declare type xhtml = string;
export declare class Financial extends ConvectorModel<Financial> {
    readonly type: string;
}
export declare abstract class Element<T extends Element<any>> extends ConvectorModel<T> {
    id: string;
    extension?: Array<FlatConvectorModel<Extension>>;
}
export declare class Quantity extends Element<Quantity> {
    readonly type: string;
    value?: number;
    comparator?: string;
    unit?: string;
    system?: string;
    code?: string;
}
export declare class Extension extends Element<Extension> {
    id: string;
    extension?: Array<FlatConvectorModel<Extension>>;
    readonly type: string;
    url?: string;
    valueInteger?: number;
    valueDecimal?: number;
    valueDateTime?: date;
    valueString?: string;
    valueUri?: string;
    valueBoolean?: string;
    valueCode?: string;
    valueBase64Binary?: string;
    valueCoding?: FlatConvectorModel<Coding>;
    valueCodeableConcept?: FlatConvectorModel<CodeableConcept>;
    valueIdentifier?: FlatConvectorModel<Identifier>;
    valueQuantity?: FlatConvectorModel<Quantity>;
    valueRange?: FlatConvectorModel<Range>;
    valuePeriod?: FlatConvectorModel<Period>;
    valueRatio?: FlatConvectorModel<Ratio>;
    valueHumanName?: FlatConvectorModel<HumanName>;
    valueAddress?: FlatConvectorModel<Address>;
}
export declare abstract class BackboneElement extends Element<BackboneElement> {
    modifierExtension?: Extension;
}
export declare class SimpleQuantity extends Quantity {
    readonly type: string;
}
export declare abstract class Resource<T extends Resource<any>> extends ConvectorModel<T> {
    id: string;
    implicitRules?: uri;
    language?: code;
    meta?: FlatConvectorModel<Meta>;
}
export declare abstract class DomainResource extends Resource<DomainResource> {
    resourceType: string;
    text?: FlatConvectorModel<Narrative>;
    contained?: FlatConvectorModel<Resource<any>>;
    extension?: Extension;
    modifierExtension?: Extension;
}
export declare class Period extends Element<Period> {
    readonly type: string;
    start?: Date;
    end?: Date;
}
export declare class Identifier extends Element<Identifier> {
    readonly type: string;
    use?: string;
    type_?: FlatConvectorModel<CodeableConcept>;
    system?: string;
    value?: string;
    period?: FlatConvectorModel<Period>;
    assigner?: FlatConvectorModel<Reference>;
}
export declare class Timing extends Element<Timing> {
    readonly type: string;
    event?: Array<Date>;
    repeat?: FlatConvectorModel<TimingRepeat>;
    code?: FlatConvectorModel<CodeableConcept>;
}
export declare class CodeableConcept extends Element<CodeableConcept> {
    readonly type: string;
    coding?: Array<FlatConvectorModel<Coding>>;
    text?: string;
}
export declare class Money extends Element<Money> {
    readonly type: string;
    value?: number;
    currency?: string;
}
export declare class Annotation extends Element<Annotation> {
    readonly type: string;
    authorReference?: FlatConvectorModel<Reference>;
    authorString?: string;
    time?: Date;
    text: string;
}
export declare class SampledData extends Element<SampledData> {
    readonly type: string;
    origin: FlatConvectorModel<SimpleQuantity>;
    period: number;
    factor?: number;
    lowerLimit?: number;
    upperLimit?: number;
    dimensions: number;
    data?: string;
}
export declare class Reference extends Element<Reference> {
    readonly type: string;
    reference?: string;
    type_?: string;
    identifier?: FlatConvectorModel<Identifier>;
    display?: string;
}
export declare class Meta extends Element<Meta> {
    readonly type: string;
    versionId?: string;
    lastUpdated?: string;
    source?: string;
    profile?: Array<string>;
    security?: Array<FlatConvectorModel<Coding>>;
    tag?: Array<FlatConvectorModel<Coding>>;
}
export declare class Narrative extends Element<Narrative> {
    readonly type: string;
    status: string;
    div: xhtml;
}
export declare class ContactPoint extends Element<ContactPoint> {
    readonly type: string;
    system?: string;
    value?: string;
    use?: string;
    rank?: number;
    period?: FlatConvectorModel<Period>;
}
export declare class TimingRepeat extends BackboneElement {
    readonly type: string;
    boundsDuration?: FlatConvectorModel<Duration>;
    boundsRange?: FlatConvectorModel<Range>;
    boundsPeriod?: FlatConvectorModel<Period>;
    count?: number;
    countMax?: number;
    duration?: number;
    durationMax?: number;
    durationUnit?: string;
    frequency?: number;
    frequencyMax?: number;
    period?: number;
    periodMax?: number;
    periodUnit?: string;
    dayOfWeek?: Array<string>;
    timeOfDay?: Array<string>;
    when?: Array<string>;
    offset?: number;
}
export declare class Attachment extends Element<Attachment> {
    readonly type: string;
    contentType?: string;
    language?: string;
    data?: string;
    url?: string;
    size?: number;
    hash?: string;
    title?: string;
    creation?: Date;
}
export declare class Address extends Element<Address> {
    readonly type: string;
    use?: string;
    type_?: string;
    text?: string;
    line?: Array<string>;
    city?: string;
    district?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    period?: FlatConvectorModel<Period>;
}
export declare class Coding extends Element<Coding> {
    readonly type: string;
    system?: string;
    version?: string;
    code?: string;
    display?: string;
    userSelected?: boolean;
}
export declare class Range extends Element<Range> {
    readonly type: string;
    low?: FlatConvectorModel<SimpleQuantity>;
    high?: FlatConvectorModel<SimpleQuantity>;
}
export declare class Ratio extends Element<Ratio> {
    readonly type: string;
    numerator?: FlatConvectorModel<Quantity>;
    denominator?: FlatConvectorModel<Quantity>;
}
export declare class HumanName extends Element<HumanName> {
    readonly type: string;
    use?: string;
    text?: string;
    family?: string;
    given?: Array<string>;
    prefix?: Array<string>;
    suffix?: Array<string>;
    period?: FlatConvectorModel<Period>;
}
export declare class Duration extends Element<Duration> {
    readonly type: string;
}
export declare class Age extends Element<Age> {
    readonly type: string;
}
export declare class AccountCoverage extends BackboneElement {
    readonly type: string;
    coverage: FlatConvectorModel<Reference>;
    priority?: number;
}
export declare class AccountGuarantor extends BackboneElement {
    readonly type: string;
    party: FlatConvectorModel<Reference>;
    onHold?: boolean;
    period?: FlatConvectorModel<Period>;
}
export declare class Account extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    status: string;
    type_?: FlatConvectorModel<CodeableConcept>;
    name?: string;
    subject?: Array<FlatConvectorModel<Reference>>;
    servicePeriod?: FlatConvectorModel<Period>;
    coverage?: Array<FlatConvectorModel<AccountCoverage>>;
    owner?: FlatConvectorModel<Reference>;
    description?: string;
    guarantor?: Array<FlatConvectorModel<AccountGuarantor>>;
    partOf?: FlatConvectorModel<Reference>;
}
export declare class ChargeItemPerformer extends BackboneElement {
    readonly type: string;
    function_?: FlatConvectorModel<CodeableConcept>;
    actor: FlatConvectorModel<Reference>;
}
export declare class ChargeItem extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    definitionUri?: Array<string>;
    definitionCanonical?: Array<string>;
    status: string;
    partOf?: Array<FlatConvectorModel<Reference>>;
    code: FlatConvectorModel<CodeableConcept>;
    subject: FlatConvectorModel<Reference>;
    context?: FlatConvectorModel<Reference>;
    occurrenceDateTime?: Date;
    occurrencePeriod?: FlatConvectorModel<Period>;
    occurrenceTiming?: FlatConvectorModel<Timing>;
    performer?: Array<FlatConvectorModel<ChargeItemPerformer>>;
    performingOrganization?: FlatConvectorModel<Reference>;
    requestingOrganization?: FlatConvectorModel<Reference>;
    costCenter?: FlatConvectorModel<Reference>;
    quantity?: FlatConvectorModel<Quantity>;
    bodysite?: Array<FlatConvectorModel<CodeableConcept>>;
    factorOverride?: number;
    priceOverride?: FlatConvectorModel<Money>;
    overrideReason?: string;
    enterer?: FlatConvectorModel<Reference>;
    enteredDate?: Date;
    reason?: Array<FlatConvectorModel<CodeableConcept>>;
    service?: Array<FlatConvectorModel<Reference>>;
    productReference?: FlatConvectorModel<Reference>;
    productCodeableConcept?: FlatConvectorModel<CodeableConcept>;
    account?: Array<FlatConvectorModel<Reference>>;
    note?: Array<FlatConvectorModel<Annotation>>;
    supportingInformation?: Array<FlatConvectorModel<Reference>>;
}
export declare class ClaimRelated extends BackboneElement {
    readonly type: string;
    claim?: FlatConvectorModel<Reference>;
    relationship?: FlatConvectorModel<CodeableConcept>;
    reference?: FlatConvectorModel<Identifier>;
}
export declare class ClaimPayee extends BackboneElement {
    readonly type: string;
    type_: FlatConvectorModel<CodeableConcept>;
    party?: FlatConvectorModel<Reference>;
}
export declare class ClaimCareTeam extends BackboneElement {
    readonly type: string;
    sequence: number;
    provider: FlatConvectorModel<Reference>;
    responsible?: boolean;
    role?: FlatConvectorModel<CodeableConcept>;
    qualification?: FlatConvectorModel<CodeableConcept>;
}
export declare class ClaimSupportingInfo extends BackboneElement {
    readonly type: string;
    sequence: number;
    category: FlatConvectorModel<CodeableConcept>;
    code?: FlatConvectorModel<CodeableConcept>;
    timingDate?: Date;
    timingPeriod?: FlatConvectorModel<Period>;
    valueBoolean?: boolean;
    valueString?: string;
    valueQuantity?: FlatConvectorModel<Quantity>;
    valueAttachment?: FlatConvectorModel<Attachment>;
    valueReference?: FlatConvectorModel<Reference>;
    reason?: FlatConvectorModel<CodeableConcept>;
}
export declare class ClaimDiagnosis extends BackboneElement {
    readonly type: string;
    sequence: number;
    diagnosisCodeableConcept: FlatConvectorModel<CodeableConcept>;
    diagnosisReference: FlatConvectorModel<Reference>;
    type_?: Array<FlatConvectorModel<CodeableConcept>>;
    onAdmission?: FlatConvectorModel<CodeableConcept>;
    packageCode?: FlatConvectorModel<CodeableConcept>;
}
export declare class ClaimProcedure extends BackboneElement {
    readonly type: string;
    sequence: number;
    type_?: Array<FlatConvectorModel<CodeableConcept>>;
    date?: Date;
    procedureCodeableConcept: FlatConvectorModel<CodeableConcept>;
    procedureReference: FlatConvectorModel<Reference>;
    udi?: Array<FlatConvectorModel<Reference>>;
}
export declare class ClaimInsurance extends BackboneElement {
    readonly type: string;
    sequence: number;
    focal: boolean;
    identifier?: FlatConvectorModel<Identifier>;
    coverage: FlatConvectorModel<Reference>;
    businessArrangement?: string;
    preAuthRef?: Array<string>;
    claimResponse?: FlatConvectorModel<Reference>;
}
export declare class ClaimAccident extends BackboneElement {
    readonly type: string;
    date: Date;
    type_?: FlatConvectorModel<CodeableConcept>;
    locationAddress?: FlatConvectorModel<Address>;
    locationReference?: FlatConvectorModel<Reference>;
}
export declare class ClaimItem extends BackboneElement {
    readonly type: string;
    sequence: number;
    careTeamSequence?: Array<number>;
    diagnosisSequence?: Array<number>;
    procedureSequence?: Array<number>;
    informationSequence?: Array<number>;
    revenue?: FlatConvectorModel<CodeableConcept>;
    category?: FlatConvectorModel<CodeableConcept>;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    programCode?: Array<FlatConvectorModel<CodeableConcept>>;
    servicedDate?: Date;
    servicedPeriod?: FlatConvectorModel<Period>;
    locationCodeableConcept?: FlatConvectorModel<CodeableConcept>;
    locationAddress?: FlatConvectorModel<Address>;
    locationReference?: FlatConvectorModel<Reference>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    udi?: Array<FlatConvectorModel<Reference>>;
    bodySite?: FlatConvectorModel<CodeableConcept>;
    subSite?: Array<FlatConvectorModel<CodeableConcept>>;
    encounter?: Array<FlatConvectorModel<Reference>>;
    detail?: Array<FlatConvectorModel<ClaimItemDetail>>;
}
export declare class ClaimItemDetail extends BackboneElement {
    readonly type: string;
    sequence: number;
    revenue?: FlatConvectorModel<CodeableConcept>;
    category?: FlatConvectorModel<CodeableConcept>;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    programCode?: Array<FlatConvectorModel<CodeableConcept>>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    udi?: Array<FlatConvectorModel<Reference>>;
    subDetail?: Array<FlatConvectorModel<ClaimItemDetailSubDetail>>;
}
export declare class ClaimItemDetailSubDetail extends BackboneElement {
    readonly type: string;
    sequence: number;
    revenue?: FlatConvectorModel<CodeableConcept>;
    category?: FlatConvectorModel<CodeableConcept>;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    programCode?: Array<FlatConvectorModel<CodeableConcept>>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    udi?: Array<FlatConvectorModel<Reference>>;
}
export declare class Claim extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    status: string;
    type_: FlatConvectorModel<CodeableConcept>;
    subType?: FlatConvectorModel<CodeableConcept>;
    use: string;
    patient: FlatConvectorModel<Reference>;
    billablePeriod?: FlatConvectorModel<Period>;
    created: Date;
    enterer?: FlatConvectorModel<Reference>;
    insurer?: FlatConvectorModel<Reference>;
    provider: FlatConvectorModel<Reference>;
    priority: FlatConvectorModel<CodeableConcept>;
    fundsReserve?: FlatConvectorModel<CodeableConcept>;
    related?: Array<FlatConvectorModel<ClaimRelated>>;
    prescription?: FlatConvectorModel<Reference>;
    originalPrescription?: FlatConvectorModel<Reference>;
    payee?: FlatConvectorModel<ClaimPayee>;
    referral?: FlatConvectorModel<Reference>;
    facility?: FlatConvectorModel<Reference>;
    careTeam?: Array<FlatConvectorModel<ClaimCareTeam>>;
    supportingInfo?: Array<FlatConvectorModel<ClaimSupportingInfo>>;
    diagnosis?: Array<FlatConvectorModel<ClaimDiagnosis>>;
    procedure?: Array<FlatConvectorModel<ClaimProcedure>>;
    insurance?: Array<FlatConvectorModel<ClaimInsurance>>;
    accident?: FlatConvectorModel<ClaimAccident>;
    item?: Array<FlatConvectorModel<ClaimItem>>;
    total?: FlatConvectorModel<Money>;
}
export declare class ClaimResponseItem extends BackboneElement {
    readonly type: string;
    itemSequence: number;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;
    detail?: Array<FlatConvectorModel<ClaimResponseItemDetail>>;
}
export declare class ClaimResponseItemAdjudication extends BackboneElement {
    readonly type: string;
    category: FlatConvectorModel<CodeableConcept>;
    reason?: FlatConvectorModel<CodeableConcept>;
    amount?: FlatConvectorModel<Money>;
    value?: number;
}
export declare class ClaimResponseItemDetail extends BackboneElement {
    readonly type: string;
    detailSequence: number;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;
    subDetail?: Array<FlatConvectorModel<ClaimResponseItemDetailSubDetail>>;
}
export declare class ClaimResponseItemDetailSubDetail extends BackboneElement {
    readonly type: string;
    subDetailSequence: number;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;
}
export declare class ClaimResponseAddItem extends BackboneElement {
    readonly type: string;
    itemSequence?: Array<number>;
    detailSequence?: Array<number>;
    subdetailSequence?: Array<number>;
    provider?: Array<FlatConvectorModel<Reference>>;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    programCode?: Array<FlatConvectorModel<CodeableConcept>>;
    servicedDate?: Date;
    servicedPeriod?: FlatConvectorModel<Period>;
    locationCodeableConcept?: FlatConvectorModel<CodeableConcept>;
    locationAddress?: FlatConvectorModel<Address>;
    locationReference?: FlatConvectorModel<Reference>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    bodySite?: FlatConvectorModel<CodeableConcept>;
    subSite?: Array<FlatConvectorModel<CodeableConcept>>;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;
    detail?: Array<FlatConvectorModel<ClaimResponseAddItemDetail>>;
}
export declare class ClaimResponseAddItemDetail extends BackboneElement {
    readonly type: string;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;
    subDetail?: Array<FlatConvectorModel<ClaimResponseAddItemDetailSubDetail>>;
}
export declare class ClaimResponseAddItemDetailSubDetail extends BackboneElement {
    readonly type: string;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;
}
export declare class ClaimResponseTotal extends BackboneElement {
    readonly type: string;
    category: FlatConvectorModel<CodeableConcept>;
    amount: FlatConvectorModel<Money>;
}
export declare class ClaimResponsePayment extends BackboneElement {
    readonly type: string;
    type_: FlatConvectorModel<CodeableConcept>;
    adjustment?: FlatConvectorModel<Money>;
    adjustmentReason?: FlatConvectorModel<CodeableConcept>;
    date?: Date;
    amount: FlatConvectorModel<Money>;
    identifier?: FlatConvectorModel<Identifier>;
}
export declare class ClaimResponseProcessNote extends BackboneElement {
    readonly type: string;
    number?: number;
    type_?: string;
    text: string;
    language?: FlatConvectorModel<CodeableConcept>;
}
export declare class ClaimResponseInsurance extends BackboneElement {
    readonly type: string;
    sequence: number;
    focal: boolean;
    coverage: FlatConvectorModel<Reference>;
    businessArrangement?: string;
    claimResponse?: FlatConvectorModel<Reference>;
}
export declare class ClaimResponseError extends BackboneElement {
    readonly type: string;
    itemSequence?: number;
    detailSequence?: number;
    subDetailSequence?: number;
    code: FlatConvectorModel<CodeableConcept>;
}
export declare class ClaimResponse extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    status: string;
    type_: FlatConvectorModel<CodeableConcept>;
    subType?: FlatConvectorModel<CodeableConcept>;
    use: string;
    patient: FlatConvectorModel<Reference>;
    created: Date;
    insurer: FlatConvectorModel<Reference>;
    requestor?: FlatConvectorModel<Reference>;
    request?: FlatConvectorModel<Reference>;
    outcome: string;
    disposition?: string;
    preAuthRef?: string;
    preAuthPeriod?: FlatConvectorModel<Period>;
    payeeType?: FlatConvectorModel<CodeableConcept>;
    item?: Array<FlatConvectorModel<ClaimResponseItem>>;
    addItem?: Array<FlatConvectorModel<ClaimResponseAddItem>>;
    adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;
    total?: Array<FlatConvectorModel<ClaimResponseTotal>>;
    payment?: FlatConvectorModel<ClaimResponsePayment>;
    fundsReserve?: FlatConvectorModel<CodeableConcept>;
    formCode?: FlatConvectorModel<CodeableConcept>;
    form?: FlatConvectorModel<Attachment>;
    processNote?: Array<FlatConvectorModel<ClaimResponseProcessNote>>;
    communicationRequest?: Array<FlatConvectorModel<Reference>>;
    insurance?: Array<FlatConvectorModel<ClaimResponseInsurance>>;
    error?: Array<FlatConvectorModel<ClaimResponseError>>;
}
export declare class CoverageClass extends BackboneElement {
    readonly type: string;
    type_: FlatConvectorModel<CodeableConcept>;
    value: string;
    name?: string;
}
export declare class CoverageCostToBeneficiary extends BackboneElement {
    readonly type: string;
    type_?: FlatConvectorModel<CodeableConcept>;
    valueQuantity: FlatConvectorModel<SimpleQuantity>;
    valueMoney: FlatConvectorModel<Money>;
    exception?: Array<FlatConvectorModel<CoverageCostToBeneficiaryException>>;
}
export declare class CoverageCostToBeneficiaryException extends BackboneElement {
    readonly type: string;
    type_: FlatConvectorModel<CodeableConcept>;
    period?: FlatConvectorModel<Period>;
}
export declare class Coverage extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    status: string;
    type_?: FlatConvectorModel<CodeableConcept>;
    policyHolder?: FlatConvectorModel<Reference>;
    subscriber?: FlatConvectorModel<Reference>;
    subscriberId?: string;
    beneficiary: FlatConvectorModel<Reference>;
    dependent?: string;
    relationship?: FlatConvectorModel<CodeableConcept>;
    period?: FlatConvectorModel<Period>;
    payor?: Array<FlatConvectorModel<Reference>>;
    class_?: Array<FlatConvectorModel<CoverageClass>>;
    order?: number;
    network?: string;
    costToBeneficiary?: Array<FlatConvectorModel<CoverageCostToBeneficiary>>;
    subrogation?: boolean;
    contract?: Array<FlatConvectorModel<Reference>>;
}
export declare class EncounterStatusHistory extends BackboneElement {
    readonly type: string;
    status: string;
    period: FlatConvectorModel<Period>;
}
export declare class EncounterClassHistory extends BackboneElement {
    readonly type: string;
    class_: FlatConvectorModel<Coding>;
    period: FlatConvectorModel<Period>;
}
export declare class EncounterParticipant extends BackboneElement {
    readonly type: string;
    type_?: Array<FlatConvectorModel<CodeableConcept>>;
    period?: FlatConvectorModel<Period>;
    individual?: FlatConvectorModel<Reference>;
}
export declare class EncounterDiagnosis extends BackboneElement {
    readonly type: string;
    condition: FlatConvectorModel<Reference>;
    use?: FlatConvectorModel<CodeableConcept>;
    rank?: number;
}
export declare class EncounterHospitalization extends BackboneElement {
    readonly type: string;
    preAdmissionIdentifier?: FlatConvectorModel<Identifier>;
    origin?: FlatConvectorModel<Reference>;
    admitSource?: FlatConvectorModel<CodeableConcept>;
    reAdmission?: FlatConvectorModel<CodeableConcept>;
    dietPreference?: Array<FlatConvectorModel<CodeableConcept>>;
    specialCourtesy?: Array<FlatConvectorModel<CodeableConcept>>;
    specialArrangement?: Array<FlatConvectorModel<CodeableConcept>>;
    destination?: FlatConvectorModel<Reference>;
    dischargeDisposition?: FlatConvectorModel<CodeableConcept>;
}
export declare class EncounterLocation extends BackboneElement {
    readonly type: string;
    location: FlatConvectorModel<Reference>;
    status?: string;
    physicalType?: FlatConvectorModel<CodeableConcept>;
    period?: FlatConvectorModel<Period>;
}
export declare class Encounter extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    status: string;
    statusHistory?: Array<FlatConvectorModel<EncounterStatusHistory>>;
    class_: FlatConvectorModel<Coding>;
    classHistory?: Array<FlatConvectorModel<EncounterClassHistory>>;
    type_?: Array<FlatConvectorModel<CodeableConcept>>;
    serviceType?: FlatConvectorModel<CodeableConcept>;
    priority?: FlatConvectorModel<CodeableConcept>;
    subject?: FlatConvectorModel<Reference>;
    episodeOfCare?: Array<FlatConvectorModel<Reference>>;
    basedOn?: Array<FlatConvectorModel<Reference>>;
    participant?: Array<FlatConvectorModel<EncounterParticipant>>;
    appointment?: Array<FlatConvectorModel<Reference>>;
    period?: FlatConvectorModel<Period>;
    length?: FlatConvectorModel<Duration>;
    reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;
    reasonReference?: Array<FlatConvectorModel<Reference>>;
    diagnosis?: Array<FlatConvectorModel<EncounterDiagnosis>>;
    account?: Array<FlatConvectorModel<Reference>>;
    hospitalization?: FlatConvectorModel<EncounterHospitalization>;
    location?: Array<FlatConvectorModel<EncounterLocation>>;
    serviceProvider?: FlatConvectorModel<Reference>;
    partOf?: FlatConvectorModel<Reference>;
}
export declare class ExplanationOfBenefitRelated extends BackboneElement {
    readonly type: string;
    claim?: FlatConvectorModel<Reference>;
    relationship?: FlatConvectorModel<CodeableConcept>;
    reference?: FlatConvectorModel<Identifier>;
}
export declare class ExplanationOfBenefitPayee extends BackboneElement {
    readonly type: string;
    type_?: FlatConvectorModel<CodeableConcept>;
    party?: FlatConvectorModel<Reference>;
}
export declare class ExplanationOfBenefitCareTeam extends BackboneElement {
    readonly type: string;
    sequence: number;
    provider: FlatConvectorModel<Reference>;
    responsible?: boolean;
    role?: FlatConvectorModel<CodeableConcept>;
    qualification?: FlatConvectorModel<CodeableConcept>;
}
export declare class ExplanationOfBenefitSupportingInfo extends BackboneElement {
    readonly type: string;
    sequence: number;
    category: FlatConvectorModel<CodeableConcept>;
    code?: FlatConvectorModel<CodeableConcept>;
    timingDate?: Date;
    timingPeriod?: FlatConvectorModel<Period>;
    valueBoolean?: boolean;
    valueString?: string;
    valueQuantity?: FlatConvectorModel<Quantity>;
    valueAttachment?: FlatConvectorModel<Attachment>;
    valueReference?: FlatConvectorModel<Reference>;
    reason?: FlatConvectorModel<Coding>;
}
export declare class ExplanationOfBenefitDiagnosis extends BackboneElement {
    readonly type: string;
    sequence: number;
    diagnosisCodeableConcept: FlatConvectorModel<CodeableConcept>;
    diagnosisReference: FlatConvectorModel<Reference>;
    type_?: Array<FlatConvectorModel<CodeableConcept>>;
    onAdmission?: FlatConvectorModel<CodeableConcept>;
    packageCode?: FlatConvectorModel<CodeableConcept>;
}
export declare class ExplanationOfBenefitProcedure extends BackboneElement {
    readonly type: string;
    sequence: number;
    type_?: Array<FlatConvectorModel<CodeableConcept>>;
    date?: Date;
    procedureCodeableConcept: FlatConvectorModel<CodeableConcept>;
    procedureReference: FlatConvectorModel<Reference>;
    udi?: Array<FlatConvectorModel<Reference>>;
}
export declare class ExplanationOfBenefitInsurance extends BackboneElement {
    readonly type: string;
    focal: boolean;
    coverage: FlatConvectorModel<Reference>;
    preAuthRef?: Array<string>;
}
export declare class ExplanationOfBenefitAccident extends BackboneElement {
    readonly type: string;
    date?: Date;
    type_?: FlatConvectorModel<CodeableConcept>;
    locationAddress?: FlatConvectorModel<Address>;
    locationReference?: FlatConvectorModel<Reference>;
}
export declare class ExplanationOfBenefitItem extends BackboneElement {
    readonly type: string;
    sequence: number;
    careTeamSequence?: Array<number>;
    diagnosisSequence?: Array<number>;
    procedureSequence?: Array<number>;
    informationSequence?: Array<number>;
    revenue?: FlatConvectorModel<CodeableConcept>;
    category?: FlatConvectorModel<CodeableConcept>;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    programCode?: Array<FlatConvectorModel<CodeableConcept>>;
    servicedDate?: Date;
    servicedPeriod?: FlatConvectorModel<Period>;
    locationCodeableConcept?: FlatConvectorModel<CodeableConcept>;
    locationAddress?: FlatConvectorModel<Address>;
    locationReference?: FlatConvectorModel<Reference>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    udi?: Array<FlatConvectorModel<Reference>>;
    bodySite?: FlatConvectorModel<CodeableConcept>;
    subSite?: Array<FlatConvectorModel<CodeableConcept>>;
    encounter?: Array<FlatConvectorModel<Reference>>;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;
    detail?: Array<FlatConvectorModel<ExplanationOfBenefitItemDetail>>;
}
export declare class ExplanationOfBenefitItemAdjudication extends BackboneElement {
    readonly type: string;
    category: FlatConvectorModel<CodeableConcept>;
    reason?: FlatConvectorModel<CodeableConcept>;
    amount?: FlatConvectorModel<Money>;
    value?: number;
}
export declare class ExplanationOfBenefitItemDetail extends BackboneElement {
    readonly type: string;
    sequence: number;
    revenue?: FlatConvectorModel<CodeableConcept>;
    category?: FlatConvectorModel<CodeableConcept>;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    programCode?: Array<FlatConvectorModel<CodeableConcept>>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    udi?: Array<FlatConvectorModel<Reference>>;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;
    subDetail?: Array<FlatConvectorModel<ExplanationOfBenefitItemDetailSubDetail>>;
}
export declare class ExplanationOfBenefitItemDetailSubDetail extends BackboneElement {
    readonly type: string;
    sequence: number;
    revenue?: FlatConvectorModel<CodeableConcept>;
    category?: FlatConvectorModel<CodeableConcept>;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    programCode?: Array<FlatConvectorModel<CodeableConcept>>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    udi?: Array<FlatConvectorModel<Reference>>;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;
}
export declare class ExplanationOfBenefitAddItem extends BackboneElement {
    readonly type: string;
    itemSequence?: Array<number>;
    detailSequence?: Array<number>;
    subDetailSequence?: Array<number>;
    provider?: Array<FlatConvectorModel<Reference>>;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    programCode?: Array<FlatConvectorModel<CodeableConcept>>;
    servicedDate?: Date;
    servicedPeriod?: FlatConvectorModel<Period>;
    locationCodeableConcept?: FlatConvectorModel<CodeableConcept>;
    locationAddress?: FlatConvectorModel<Address>;
    locationReference?: FlatConvectorModel<Reference>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    bodySite?: FlatConvectorModel<CodeableConcept>;
    subSite?: Array<FlatConvectorModel<CodeableConcept>>;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;
    detail?: Array<FlatConvectorModel<ExplanationOfBenefitAddItemDetail>>;
}
export declare class ExplanationOfBenefitAddItemDetail extends BackboneElement {
    readonly type: string;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;
    subDetail?: Array<FlatConvectorModel<ExplanationOfBenefitAddItemDetailSubDetail>>;
}
export declare class ExplanationOfBenefitAddItemDetailSubDetail extends BackboneElement {
    readonly type: string;
    productOrService: FlatConvectorModel<CodeableConcept>;
    modifier?: Array<FlatConvectorModel<CodeableConcept>>;
    quantity?: FlatConvectorModel<SimpleQuantity>;
    unitPrice?: FlatConvectorModel<Money>;
    factor?: number;
    net?: FlatConvectorModel<Money>;
    noteNumber?: Array<number>;
    adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;
}
export declare class ExplanationOfBenefitTotal extends BackboneElement {
    readonly type: string;
    category: FlatConvectorModel<CodeableConcept>;
    amount: FlatConvectorModel<Money>;
}
export declare class ExplanationOfBenefitPayment extends BackboneElement {
    readonly type: string;
    type_?: FlatConvectorModel<CodeableConcept>;
    adjustment?: FlatConvectorModel<Money>;
    adjustmentReason?: FlatConvectorModel<CodeableConcept>;
    date?: Date;
    amount?: FlatConvectorModel<Money>;
    identifier?: FlatConvectorModel<Identifier>;
}
export declare class ExplanationOfBenefitProcessNote extends BackboneElement {
    readonly type: string;
    number?: number;
    type_?: string;
    text?: string;
    language?: FlatConvectorModel<CodeableConcept>;
}
export declare class ExplanationOfBenefitBenefitBalance extends BackboneElement {
    readonly type: string;
    category: FlatConvectorModel<CodeableConcept>;
    excluded?: boolean;
    name?: string;
    description?: string;
    network?: FlatConvectorModel<CodeableConcept>;
    unit?: FlatConvectorModel<CodeableConcept>;
    term?: FlatConvectorModel<CodeableConcept>;
    financial?: Array<FlatConvectorModel<ExplanationOfBenefitBenefitBalanceFinancial>>;
}
export declare class ExplanationOfBenefitBenefitBalanceFinancial extends BackboneElement {
    readonly type: string;
    type_: FlatConvectorModel<CodeableConcept>;
    allowedUnsignedInt?: number;
    allowedString?: string;
    allowedMoney?: FlatConvectorModel<Money>;
    usedUnsignedInt?: number;
    usedMoney?: FlatConvectorModel<Money>;
}
export declare class ExplanationOfBenefit extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    status: string;
    type_: FlatConvectorModel<CodeableConcept>;
    subType?: FlatConvectorModel<CodeableConcept>;
    use: string;
    patient: FlatConvectorModel<Reference>;
    billablePeriod?: FlatConvectorModel<Period>;
    created: Date;
    enterer?: FlatConvectorModel<Reference>;
    insurer: FlatConvectorModel<Reference>;
    provider: FlatConvectorModel<Reference>;
    priority?: FlatConvectorModel<CodeableConcept>;
    fundsReserveRequested?: FlatConvectorModel<CodeableConcept>;
    fundsReserve?: FlatConvectorModel<CodeableConcept>;
    related?: Array<FlatConvectorModel<ExplanationOfBenefitRelated>>;
    prescription?: FlatConvectorModel<Reference>;
    originalPrescription?: FlatConvectorModel<Reference>;
    payee?: FlatConvectorModel<ExplanationOfBenefitPayee>;
    referral?: FlatConvectorModel<Reference>;
    facility?: FlatConvectorModel<Reference>;
    claim?: FlatConvectorModel<Reference>;
    claimResponse?: FlatConvectorModel<Reference>;
    outcome: string;
    disposition?: string;
    preAuthRef?: Array<string>;
    preAuthRefPeriod?: Array<FlatConvectorModel<Period>>;
    careTeam?: Array<FlatConvectorModel<ExplanationOfBenefitCareTeam>>;
    supportingInfo?: Array<FlatConvectorModel<ExplanationOfBenefitSupportingInfo>>;
    diagnosis?: Array<FlatConvectorModel<ExplanationOfBenefitDiagnosis>>;
    procedure?: Array<FlatConvectorModel<ExplanationOfBenefitProcedure>>;
    precedence?: number;
    insurance?: Array<FlatConvectorModel<ExplanationOfBenefitInsurance>>;
    accident?: FlatConvectorModel<ExplanationOfBenefitAccident>;
    item?: Array<FlatConvectorModel<ExplanationOfBenefitItem>>;
    addItem?: Array<FlatConvectorModel<ExplanationOfBenefitAddItem>>;
    adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;
    total?: Array<FlatConvectorModel<ExplanationOfBenefitTotal>>;
    payment?: FlatConvectorModel<ExplanationOfBenefitPayment>;
    formCode?: FlatConvectorModel<CodeableConcept>;
    form?: FlatConvectorModel<Attachment>;
    processNote?: Array<FlatConvectorModel<ExplanationOfBenefitProcessNote>>;
    benefitPeriod?: FlatConvectorModel<Period>;
    benefitBalance?: Array<FlatConvectorModel<ExplanationOfBenefitBenefitBalance>>;
}
export declare class InvoiceParticipant extends BackboneElement {
    readonly type: string;
    role?: FlatConvectorModel<CodeableConcept>;
    actor: FlatConvectorModel<Reference>;
}
export declare class InvoiceLineItem extends BackboneElement {
    readonly type: string;
    sequence?: number;
    chargeItemReference: FlatConvectorModel<Reference>;
    chargeItemCodeableConcept: FlatConvectorModel<CodeableConcept>;
    priceComponent?: Array<FlatConvectorModel<InvoiceLineItemPriceComponent>>;
}
export declare class InvoiceLineItemPriceComponent extends BackboneElement {
    readonly type: string;
    type_: string;
    code?: FlatConvectorModel<CodeableConcept>;
    factor?: number;
    amount?: FlatConvectorModel<Money>;
}
export declare class Invoice extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    status: string;
    cancelledReason?: string;
    type_?: FlatConvectorModel<CodeableConcept>;
    subject?: FlatConvectorModel<Reference>;
    recipient?: FlatConvectorModel<Reference>;
    date?: Date;
    participant?: Array<FlatConvectorModel<InvoiceParticipant>>;
    issuer?: FlatConvectorModel<Reference>;
    account?: FlatConvectorModel<Reference>;
    lineItem?: Array<FlatConvectorModel<InvoiceLineItem>>;
    totalPriceComponent?: Array<FlatConvectorModel<InvoiceLineItemPriceComponent>>;
    totalNet?: FlatConvectorModel<Money>;
    totalGross?: FlatConvectorModel<Money>;
    paymentTerms?: string;
    note?: Array<FlatConvectorModel<Annotation>>;
}
export declare class OrganizationContact extends BackboneElement {
    readonly type: string;
    purpose?: FlatConvectorModel<CodeableConcept>;
    name?: FlatConvectorModel<HumanName>;
    telecom?: Array<FlatConvectorModel<ContactPoint>>;
    address?: FlatConvectorModel<Address>;
}
export declare class Organization extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    active?: boolean;
    type_?: Array<FlatConvectorModel<CodeableConcept>>;
    name?: string;
    alias?: Array<string>;
    telecom?: Array<FlatConvectorModel<ContactPoint>>;
    address?: Array<FlatConvectorModel<Address>>;
    partOf?: FlatConvectorModel<Reference>;
    contact?: Array<FlatConvectorModel<OrganizationContact>>;
    endpoint?: Array<FlatConvectorModel<Reference>>;
}
export declare class PatientContact extends BackboneElement {
    readonly type: string;
    relationship?: Array<FlatConvectorModel<CodeableConcept>>;
    name?: FlatConvectorModel<HumanName>;
    telecom?: Array<FlatConvectorModel<ContactPoint>>;
    address?: FlatConvectorModel<Address>;
    gender?: string;
    organization?: FlatConvectorModel<Reference>;
    period?: FlatConvectorModel<Period>;
}
export declare class PatientCommunication extends BackboneElement {
    readonly type: string;
    language: FlatConvectorModel<CodeableConcept>;
    preferred?: boolean;
}
export declare class PatientLink extends BackboneElement {
    readonly type: string;
    other: FlatConvectorModel<Reference>;
    type_: string;
}
export declare class Patient extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    active?: boolean;
    name?: Array<FlatConvectorModel<HumanName>>;
    telecom?: Array<FlatConvectorModel<ContactPoint>>;
    gender?: string;
    birthDate?: Date;
    deceasedBoolean?: boolean;
    deceasedDateTime?: Date;
    address?: Array<FlatConvectorModel<Address>>;
    maritalStatus?: FlatConvectorModel<CodeableConcept>;
    multipleBirthBoolean?: boolean;
    multipleBirthInteger?: number;
    photo?: Array<FlatConvectorModel<Attachment>>;
    contact?: Array<FlatConvectorModel<PatientContact>>;
    communication?: Array<FlatConvectorModel<PatientCommunication>>;
    generalPractitioner?: Array<FlatConvectorModel<Reference>>;
    managingOrganization?: FlatConvectorModel<Reference>;
    link?: Array<FlatConvectorModel<PatientLink>>;
}
export declare class PaymentNotice extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    status: string;
    request?: FlatConvectorModel<Reference>;
    response?: FlatConvectorModel<Reference>;
    created: Date;
    provider?: FlatConvectorModel<Reference>;
    payment: FlatConvectorModel<Reference>;
    paymentDate?: Date;
    payee?: FlatConvectorModel<Reference>;
    recipient: FlatConvectorModel<Reference>;
    amount: FlatConvectorModel<Money>;
    paymentStatus?: FlatConvectorModel<CodeableConcept>;
}
export declare class PaymentReconciliationDetail extends BackboneElement {
    readonly type: string;
    identifier?: FlatConvectorModel<Identifier>;
    predecessor?: FlatConvectorModel<Identifier>;
    type_: FlatConvectorModel<CodeableConcept>;
    request?: FlatConvectorModel<Reference>;
    submitter?: FlatConvectorModel<Reference>;
    response?: FlatConvectorModel<Reference>;
    date?: Date;
    responsible?: FlatConvectorModel<Reference>;
    payee?: FlatConvectorModel<Reference>;
    amount?: FlatConvectorModel<Money>;
}
export declare class PaymentReconciliationProcessNote extends BackboneElement {
    readonly type: string;
    type_?: string;
    text?: string;
}
export declare class PaymentReconciliation extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    status: string;
    period?: FlatConvectorModel<Period>;
    created: Date;
    paymentIssuer?: FlatConvectorModel<Reference>;
    request?: FlatConvectorModel<Reference>;
    requestor?: FlatConvectorModel<Reference>;
    outcome?: string;
    disposition?: string;
    paymentDate: Date;
    paymentAmount: FlatConvectorModel<Money>;
    paymentIdentifier?: FlatConvectorModel<Identifier>;
    detail?: Array<FlatConvectorModel<PaymentReconciliationDetail>>;
    formCode?: FlatConvectorModel<CodeableConcept>;
    processNote?: Array<FlatConvectorModel<PaymentReconciliationProcessNote>>;
}
export declare class PractitionerQualification extends BackboneElement {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    code: FlatConvectorModel<CodeableConcept>;
    period?: FlatConvectorModel<Period>;
    issuer?: FlatConvectorModel<Reference>;
}
export declare class Practitioner extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    active?: boolean;
    name?: Array<FlatConvectorModel<HumanName>>;
    telecom?: Array<FlatConvectorModel<ContactPoint>>;
    address?: Array<FlatConvectorModel<Address>>;
    gender?: string;
    birthDate?: Date;
    photo?: Array<FlatConvectorModel<Attachment>>;
    qualification?: Array<FlatConvectorModel<PractitionerQualification>>;
    communication?: Array<FlatConvectorModel<CodeableConcept>>;
}
export declare class ProcedurePerformer extends BackboneElement {
    readonly type: string;
    function_?: FlatConvectorModel<CodeableConcept>;
    actor: FlatConvectorModel<Reference>;
    onBehalfOf?: FlatConvectorModel<Reference>;
}
export declare class ProcedureFocalDevice extends BackboneElement {
    readonly type: string;
    action?: FlatConvectorModel<CodeableConcept>;
    manipulated: FlatConvectorModel<Reference>;
}
export declare class Procedure extends DomainResource {
    readonly type: string;
    identifier?: Array<FlatConvectorModel<Identifier>>;
    instantiatesCanonical?: Array<string>;
    instantiatesUri?: Array<string>;
    basedOn?: Array<FlatConvectorModel<Reference>>;
    partOf?: Array<FlatConvectorModel<Reference>>;
    status: string;
    statusReason?: FlatConvectorModel<CodeableConcept>;
    category?: FlatConvectorModel<CodeableConcept>;
    code?: FlatConvectorModel<CodeableConcept>;
    subject: FlatConvectorModel<Reference>;
    encounter?: FlatConvectorModel<Reference>;
    performedDateTime?: Date;
    performedPeriod?: FlatConvectorModel<Period>;
    performedString?: string;
    performedAge?: FlatConvectorModel<Age>;
    performedRange?: FlatConvectorModel<Range>;
    recorder?: FlatConvectorModel<Reference>;
    asserter?: FlatConvectorModel<Reference>;
    performer?: Array<FlatConvectorModel<ProcedurePerformer>>;
    location?: FlatConvectorModel<Reference>;
    reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;
    reasonReference?: Array<FlatConvectorModel<Reference>>;
    bodySite?: Array<FlatConvectorModel<CodeableConcept>>;
    outcome?: FlatConvectorModel<CodeableConcept>;
    report?: Array<FlatConvectorModel<Reference>>;
    complication?: Array<FlatConvectorModel<CodeableConcept>>;
    complicationDetail?: Array<FlatConvectorModel<Reference>>;
    followUp?: Array<FlatConvectorModel<CodeableConcept>>;
    note?: Array<FlatConvectorModel<Annotation>>;
    focalDevice?: Array<FlatConvectorModel<ProcedureFocalDevice>>;
    usedReference?: Array<FlatConvectorModel<Reference>>;
    usedCode?: Array<FlatConvectorModel<CodeableConcept>>;
}
