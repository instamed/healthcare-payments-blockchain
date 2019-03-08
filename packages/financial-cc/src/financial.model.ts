import * as fhirTypes from './utils/fhirTypes';
import * as yup from 'yup';
import {
   ConvectorModel,
   FlatConvectorModel,
   ReadOnly,
   Required,
   Validate,
   Default
} from '@worldsibu/convector-core-model';

export type date = string;
export type instant = string;
export type time = string;
export type dateTime = string;
export type base64Binary = string;
export type decimal = number;
export type url = string;
export type code = string;
export type integer = number;
export type uri = string;
export type canonical = string;
export type markdown = string;
export type id = string;
export type oid = string;
export type uuid = string;
export type unsignedInt = number;
export type positiveInt = number;
export type xhtml = string;
//export type timestamp = string;

export class Financial extends ConvectorModel<Financial>{

   @ReadOnly()
   public readonly type = 'fhir.datatypes.Financial';
}

export abstract class Element<T extends Element<any>> extends ConvectorModel<T> {

   @Validate(yup.string())
   public id: string;

   @Validate(yup.lazy(() => yup.array(Extension.schema())))
   public extension?: Array<FlatConvectorModel<Extension>>;
}


export class Quantity extends Element<Quantity> {
   @Default('fhir.datatypes.Quantity')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public value?: number;

   @Validate(yup.string())
   public comparator?: string;

   @Validate(yup.string())
   public unit?: string;

   @Validate(yup.string())
   public system?: string;

   @Validate(yup.string())
   public code?: string;

}

export class Extension extends Element<Extension> {

   @Validate(yup.string())
   public id: string;

   @Validate(yup.lazy(() => yup.array(Extension.schema())))
   public extension?: Array<FlatConvectorModel<Extension>>;

   @Default('fhir.datatypes.Extension')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.number())
   public valueInteger?: number;

   @Validate(yup.number())
   public valueDecimal?: number;

   // Primitives
   // @Validate(yup.string())
   // TODO
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDateTime?: date;

   @Validate(yup.string())
   public valueString?: string;

   @Validate(yup.string())
   public valueUri?: string;

   @Validate(yup.bool())
   public valueBoolean?: string;

   //o xx valueInstant optional
   @Validate(yup.string())
   public valueCode?: string;

   @Validate(yup.string())
   public valueBase64Binary?: string;

   // Complex
   @Validate(yup.lazy(() => Coding.schema()))
   public valueCoding?: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public valueCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   //o Attachment valueAttachment optional

   @Validate(yup.lazy(() => Identifier.schema()))
   public valueIdentifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Range.schema()))
   public valueRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Period.schema()))
   public valuePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public valueRatio?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => HumanName.schema()))
   public valueHumanName?: FlatConvectorModel<HumanName>;

   @Validate(yup.lazy(() => Address.schema()))
   public valueAddress?: FlatConvectorModel<Address>;

   //o ContactPoint valueContactPoint optional
   //o Schedule valueSchedule optional
   //o Reference valueReference optional
}

export abstract class BackboneElement extends Element<BackboneElement> {

   @Validate(yup.lazy(() => Extension.schema()))
   public modifierExtension?: Extension;

}

//SimpleQuantity is a restriction of Quantity without comparator
export class SimpleQuantity extends Quantity {

   @Default('fhir.datatypes.SimpleQuantity')
   @ReadOnly()
   public readonly type: string;

}

// Asset inhertitance datatypes
export abstract class Resource<T extends Resource<any>> extends ConvectorModel<T> { // identified by id

   @Required()
   @Validate(yup.string())
   public id: string;

   @Validate(yup.string())
   public implicitRules?: uri;

   @Validate(yup.string())
   public language?: code;

   @Validate(yup.lazy(() => Meta.schema()))
   public meta?: FlatConvectorModel<Meta>;
}

export abstract class DomainResource<T extends DomainResource<any>> extends Resource<T> {
   @Required()
   @Validate(yup.string())
   public resourceType: string;

   @Validate(yup.lazy(() => Narrative.schema()))
   public text?: FlatConvectorModel<Narrative>;

   @Validate(yup.lazy(() => Resource.schema()))
   public contained?: FlatConvectorModel<Resource<any>>;

   @Validate(yup.lazy(() => Extension.schema()))
   public extension?: Extension;

   @Validate(yup.lazy(() => Extension.schema()))
   public modifierExtension?: Extension;
}


export class Period extends Element<Period> {
   @Default('fhir.datatypes.Period')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public start?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public end?: date;

}

export class Identifier extends Element<Identifier> {
   @Default('fhir.datatypes.Identifier')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public use?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public system?: string;

   @Validate(yup.string())
   public value?: string;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Reference.schema()))
   public assigner?: FlatConvectorModel<Reference>; //Organization

}

export class Timing extends Element<Timing> {
   @Default('fhir.datatypes.Timing')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.date()))
   public event?: Array<date>;

   @Validate(yup.lazy(() => TimingRepeat.schema()))
   public repeat?: FlatConvectorModel<TimingRepeat>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

}

export class CodeableConcept extends Element<CodeableConcept> {
   @Default('fhir.datatypes.CodeableConcept')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public coding?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.string())
   public text?: string;

}

export class Money extends Element<Money> {
   @Default('fhir.datatypes.Money')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public value?: number;

   @Validate(yup.string())
   public currency?: string;

}

export class Annotation extends Element<Annotation> {
   @Default('fhir.datatypes.Annotation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public authorReference?: FlatConvectorModel<Reference>; //Practitioner|Patient|RelatedPerson|Organization

   @Validate(yup.string())
   public authorString?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public time?: date;

   @Required()
   @Validate(yup.string())
   public text: string;

}

export class SampledData extends Element<SampledData> {
   @Default('fhir.datatypes.SampledData')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public origin: FlatConvectorModel<SimpleQuantity>;

   @Required()
   @Validate(yup.number())
   public period: number;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.number())
   public lowerLimit?: number;

   @Validate(yup.number())
   public upperLimit?: number;

   @Required()
   @Validate(yup.number())
   public dimensions: number;

   @Validate(yup.string())
   public data?: string;

}

export class Reference extends Element<Reference> {
   @Default('fhir.datatypes.Reference')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public reference?: string;

   @Validate(yup.string())
   public type_?: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public display?: string;

}

export class Meta extends Element<Meta> {
   @Default('fhir.datatypes.Meta')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public versionId?: string;

   @Validate(yup.string())
   public lastUpdated?: string;

   @Validate(yup.string())
   public source?: string;

   @Validate(yup.array(yup.string()))
   public profile?: Array<string>; //StructureDefinition

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public security?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public tag?: Array<FlatConvectorModel<Coding>>;

}

export class Narrative extends Element<Narrative> {
   @Default('fhir.datatypes.Narrative')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.string())
   public div: xhtml;

}

export class ContactPoint extends Element<ContactPoint> {
   @Default('fhir.datatypes.ContactPoint')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public system?: string;

   @Validate(yup.string())
   public value?: string;

   @Validate(yup.string())
   public use?: string;

   @Validate(yup.number())
   public rank?: number;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

}

export class TimingRepeat extends BackboneElement {
   @Default('fhir.datatypes.Timing.TimingRepeat')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Duration.schema()))
   public boundsDuration?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => Range.schema()))
   public boundsRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Period.schema()))
   public boundsPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.number())
   public count?: number;

   @Validate(yup.number())
   public countMax?: number;

   @Validate(yup.number())
   public duration?: number;

   @Validate(yup.number())
   public durationMax?: number;

   @Validate(yup.string())
   public durationUnit?: string;

   @Validate(yup.number())
   public frequency?: number;

   @Validate(yup.number())
   public frequencyMax?: number;

   @Validate(yup.number())
   public period?: number;

   @Validate(yup.number())
   public periodMax?: number;

   @Validate(yup.string())
   public periodUnit?: string;

   @Validate(yup.array(yup.string()))
   public dayOfWeek?: Array<string>;

   @Validate(yup.array(yup.string()))
   public timeOfDay?: Array<string>;

   @Validate(yup.array(yup.string()))
   public when?: Array<string>;

   @Validate(yup.number())
   public offset?: number;

}

export class Attachment extends Element<Attachment> {
   @Default('fhir.datatypes.Attachment')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public contentType?: string;

   @Validate(yup.string())
   public language?: string;

   @Validate(yup.string())
   public data?: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.number())
   public size?: number;

   @Validate(yup.string())
   public hash?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public creation?: date;

}

export class Address extends Element<Address> {
   @Default('fhir.datatypes.Address')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public use?: string;

   @Validate(yup.string())
   public type_?: string;

   @Validate(yup.string())
   public text?: string;

   @Validate(yup.array(yup.string()))
   public line?: Array<string>;

   @Validate(yup.string())
   public city?: string;

   @Validate(yup.string())
   public district?: string;

   @Validate(yup.string())
   public state?: string;

   @Validate(yup.string())
   public postalCode?: string;

   @Validate(yup.string())
   public country?: string;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

}

export class Coding extends Element<Coding> {
   @Default('fhir.datatypes.Coding')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public system?: string;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public code?: string;

   @Validate(yup.string())
   public display?: string;

   @Validate(yup.boolean())
   public userSelected?: boolean;

}

export class Range extends Element<Range> {
   @Default('fhir.datatypes.Range')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public low?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public high?: FlatConvectorModel<SimpleQuantity>;

}

export class Ratio extends Element<Ratio> {
   @Default('fhir.datatypes.Ratio')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Quantity.schema()))
   public numerator?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public denominator?: FlatConvectorModel<Quantity>;

}

export class HumanName extends Element<HumanName> {
   @Default('fhir.datatypes.HumanName')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public use?: string;

   @Validate(yup.string())
   public text?: string;

   @Validate(yup.string())
   public family?: string;

   @Validate(yup.array(yup.string()))
   public given?: Array<string>;

   @Validate(yup.array(yup.string()))
   public prefix?: Array<string>;

   @Validate(yup.array(yup.string()))
   public suffix?: Array<string>;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

}

export class Duration extends Element<Duration> {
   @Default('fhir.datatypes.Duration')
   @ReadOnly()
   public readonly type: string;

}

export class Age extends Element<Age> {
   @Default('fhir.datatypes.Age')
   @ReadOnly()
   public readonly type: string;

}

export class AccountCoverage extends BackboneElement {
   @Default('fhir.datatypes.Account.AccountCoverage')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public coverage: FlatConvectorModel<Reference>; //Coverage

   @Validate(yup.number())
   public priority?: number;

}

export class AccountGuarantor extends BackboneElement {
   @Default('fhir.datatypes.Account.AccountGuarantor')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public party: FlatConvectorModel<Reference>; //Patient|RelatedPerson|Organization

   @Validate(yup.boolean())
   public onHold?: boolean;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

}

export class Account extends DomainResource<Account> {
   @Default('fhir.datatypes.Account')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public subject?: Array<FlatConvectorModel<Reference>>; //Patient|Device|Practitioner|PractitionerRole|Location|HealthcareService|Organization

   @Validate(yup.lazy(() => Period.schema()))
   public servicePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(AccountCoverage.schema())))
   public coverage?: Array<FlatConvectorModel<AccountCoverage>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public owner?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(AccountGuarantor.schema())))
   public guarantor?: Array<FlatConvectorModel<AccountGuarantor>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public partOf?: FlatConvectorModel<Reference>; //Account

}


export class ChargeItemPerformer extends BackboneElement {
   @Default('fhir.datatypes.ChargeItem.ChargeItemPerformer')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public function_?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public actor: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|CareTeam|Patient|Device|RelatedPerson

}

export class ChargeItem extends DomainResource<ChargeItem> {
   @Default('fhir.datatypes.ChargeItem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public definitionUri?: Array<string>;

   @Validate(yup.array(yup.string()))
   public definitionCanonical?: Array<string>; //ChargeItemDefinition

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //ChargeItem

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public context?: FlatConvectorModel<Reference>; //Encounter|EpisodeOfCare

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public occurrenceDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public occurrencePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Timing.schema()))
   public occurrenceTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => yup.array(ChargeItemPerformer.schema())))
   public performer?: Array<FlatConvectorModel<ChargeItemPerformer>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public performingOrganization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public requestingOrganization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public costCenter?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Quantity.schema()))
   public quantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public bodysite?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.number())
   public factorOverride?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public priceOverride?: FlatConvectorModel<Money>;

   @Validate(yup.string())
   public overrideReason?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public enterer?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|Patient|Device|RelatedPerson

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public enteredDate?: date;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reason?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public service?: Array<FlatConvectorModel<Reference>>; //DiagnosticReport|ImagingStudy|Immunization|MedicationAdministration|MedicationDispense|Observation|Procedure|SupplyDelivery

   @Validate(yup.lazy(() => Reference.schema()))
   public productReference?: FlatConvectorModel<Reference>; //Device|Medication|Substance

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public account?: Array<FlatConvectorModel<Reference>>; //Account

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingInformation?: Array<FlatConvectorModel<Reference>>; //Any

}


export class ClaimRelated extends BackboneElement {
   @Default('fhir.datatypes.Claim.ClaimRelated')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public claim?: FlatConvectorModel<Reference>; //Claim

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public relationship?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public reference?: FlatConvectorModel<Identifier>;

}

export class ClaimPayee extends BackboneElement {
   @Default('fhir.datatypes.Claim.ClaimPayee')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public party?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|Patient|RelatedPerson

}

export class ClaimCareTeam extends BackboneElement {
   @Default('fhir.datatypes.Claim.ClaimCareTeam')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public provider: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.boolean())
   public responsible?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public role?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public qualification?: FlatConvectorModel<CodeableConcept>;

}

export class ClaimSupportingInfo extends BackboneElement {
   @Default('fhir.datatypes.Claim.ClaimSupportingInfo')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timingDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public timingPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.boolean())
   public valueBoolean?: boolean;

   @Validate(yup.string())
   public valueString?: string;

   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity?: FlatConvectorModel<Quantity>;

   //   @Validate(yup.lazy(() => Attachment.schema()))
   public valueAttachment?: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => Reference.schema()))
   public valueReference?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public reason?: FlatConvectorModel<CodeableConcept>;

}

export class ClaimDiagnosis extends BackboneElement {
   @Default('fhir.datatypes.Claim.ClaimDiagnosis')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public diagnosisCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public diagnosisReference: FlatConvectorModel<Reference>; //Condition

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public onAdmission?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public packageCode?: FlatConvectorModel<CodeableConcept>;

}

export class ClaimProcedure extends BackboneElement {
   @Default('fhir.datatypes.Claim.ClaimProcedure')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public procedureCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public procedureReference: FlatConvectorModel<Reference>; //Procedure

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public udi?: Array<FlatConvectorModel<Reference>>; //Device

}

export class ClaimInsurance extends BackboneElement {
   @Default('fhir.datatypes.Claim.ClaimInsurance')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Required()
   @Validate(yup.boolean())
   public focal: boolean;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public coverage: FlatConvectorModel<Reference>; //Coverage

   @Validate(yup.string())
   public businessArrangement?: string;

   @Validate(yup.array(yup.string()))
   public preAuthRef?: Array<string>;

   @Validate(yup.lazy(() => Reference.schema()))
   public claimResponse?: FlatConvectorModel<Reference>; //ClaimResponse

}

export class ClaimAccident extends BackboneElement {
   @Default('fhir.datatypes.Claim.ClaimAccident')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date: date;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Address.schema()))
   public locationAddress?: FlatConvectorModel<Address>;

   @Validate(yup.lazy(() => Reference.schema()))
   public locationReference?: FlatConvectorModel<Reference>; //Location

}

export class ClaimItem extends BackboneElement {
   @Default('fhir.datatypes.Claim.ClaimItem')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Validate(yup.array(yup.number()))
   public careTeamSequence?: Array<number>;

   @Validate(yup.array(yup.number()))
   public diagnosisSequence?: Array<number>;

   @Validate(yup.array(yup.number()))
   public procedureSequence?: Array<number>;

   @Validate(yup.array(yup.number()))
   public informationSequence?: Array<number>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public revenue?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public programCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public servicedDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public servicedPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public locationCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Address.schema()))
   public locationAddress?: FlatConvectorModel<Address>;

   @Validate(yup.lazy(() => Reference.schema()))
   public locationReference?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public udi?: Array<FlatConvectorModel<Reference>>; //Device

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public bodySite?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public subSite?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public encounter?: Array<FlatConvectorModel<Reference>>; //Encounter

   @Validate(yup.lazy(() => yup.array(ClaimItemDetail.schema())))
   public detail?: Array<FlatConvectorModel<ClaimItemDetail>>;

}

export class ClaimItemDetail extends BackboneElement {
   @Default('fhir.datatypes.Claim.ClaimItemDetail')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public revenue?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public programCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public udi?: Array<FlatConvectorModel<Reference>>; //Device

   @Validate(yup.lazy(() => yup.array(ClaimItemDetailSubDetail.schema())))
   public subDetail?: Array<FlatConvectorModel<ClaimItemDetailSubDetail>>;

}

export class ClaimItemDetailSubDetail extends BackboneElement {
   @Default('fhir.datatypes.Claim.ClaimItemDetailSubDetail')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public revenue?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public programCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public udi?: Array<FlatConvectorModel<Reference>>; //Device

}

export class Claim extends DomainResource<Claim> {
   @Default('fhir.datatypes.Claim')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   // // TODO: this is new
   // @Required()
   // @Validate(yup.string())
   // public encounterUid: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subType?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public use: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => Period.schema()))
   public billablePeriod?: FlatConvectorModel<Period>;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public enterer?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => Reference.schema()))
   public insurer?: FlatConvectorModel<Reference>; //Organization

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public provider: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public priority: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public fundsReserve?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(ClaimRelated.schema())))
   public related?: Array<FlatConvectorModel<ClaimRelated>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public prescription?: FlatConvectorModel<Reference>; //DeviceRequest|MedicationRequest|VisionPrescription

   @Validate(yup.lazy(() => Reference.schema()))
   public originalPrescription?: FlatConvectorModel<Reference>; //DeviceRequest|MedicationRequest|VisionPrescription

   @Validate(yup.lazy(() => ClaimPayee.schema()))
   public payee?: FlatConvectorModel<ClaimPayee>;

   @Validate(yup.lazy(() => Reference.schema()))
   public referral?: FlatConvectorModel<Reference>; //ServiceRequest

   @Validate(yup.lazy(() => Reference.schema()))
   public facility?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => yup.array(ClaimCareTeam.schema())))
   public careTeam?: Array<FlatConvectorModel<ClaimCareTeam>>;

   @Validate(yup.lazy(() => yup.array(ClaimSupportingInfo.schema())))
   public supportingInfo?: Array<FlatConvectorModel<ClaimSupportingInfo>>;

   @Validate(yup.lazy(() => yup.array(ClaimDiagnosis.schema())))
   public diagnosis?: Array<FlatConvectorModel<ClaimDiagnosis>>;

   @Validate(yup.lazy(() => yup.array(ClaimProcedure.schema())))
   public procedure?: Array<FlatConvectorModel<ClaimProcedure>>;

   @Validate(yup.lazy(() => yup.array(ClaimInsurance.schema())))
   public insurance?: Array<FlatConvectorModel<ClaimInsurance>>;

   @Validate(yup.lazy(() => ClaimAccident.schema()))
   public accident?: FlatConvectorModel<ClaimAccident>;

   @Validate(yup.lazy(() => yup.array(ClaimItem.schema())))
   public item?: Array<FlatConvectorModel<ClaimItem>>;

   @Validate(yup.lazy(() => Money.schema()))
   public total?: FlatConvectorModel<Money>;

}


export class ClaimResponseItem extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseItem')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public itemSequence: number;

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseItemDetail.schema())))
   public detail?: Array<FlatConvectorModel<ClaimResponseItemDetail>>;

}

export class ClaimResponseItemAdjudication extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseItemAdjudication')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public reason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Money.schema()))
   public amount?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public value?: number;

}

export class ClaimResponseItemDetail extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseItemDetail')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public detailSequence: number;

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseItemDetailSubDetail.schema())))
   public subDetail?: Array<FlatConvectorModel<ClaimResponseItemDetailSubDetail>>;

}

export class ClaimResponseItemDetailSubDetail extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseItemDetailSubDetail')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public subDetailSequence: number;

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;

}

export class ClaimResponseAddItem extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseAddItem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.number()))
   public itemSequence?: Array<number>;

   @Validate(yup.array(yup.number()))
   public detailSequence?: Array<number>;

   @Validate(yup.array(yup.number()))
   public subdetailSequence?: Array<number>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public provider?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Organization

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public programCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public servicedDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public servicedPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public locationCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Address.schema()))
   public locationAddress?: FlatConvectorModel<Address>;

   @Validate(yup.lazy(() => Reference.schema()))
   public locationReference?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public bodySite?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public subSite?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseAddItemDetail.schema())))
   public detail?: Array<FlatConvectorModel<ClaimResponseAddItemDetail>>;

}

export class ClaimResponseAddItemDetail extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseAddItemDetail')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseAddItemDetailSubDetail.schema())))
   public subDetail?: Array<FlatConvectorModel<ClaimResponseAddItemDetailSubDetail>>;

}

export class ClaimResponseAddItemDetailSubDetail extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseAddItemDetailSubDetail')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;

}

export class ClaimResponseTotal extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseTotal')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Money.schema()))
   public amount: FlatConvectorModel<Money>;

}

export class ClaimResponsePayment extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponsePayment')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Money.schema()))
   public adjustment?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public adjustmentReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Required()
   @Validate(yup.lazy(() => Money.schema()))
   public amount: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

}

export class ClaimResponseProcessNote extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseProcessNote')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public number?: number;

   @Validate(yup.string())
   public type_?: string;

   @Required()
   @Validate(yup.string())
   public text: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public language?: FlatConvectorModel<CodeableConcept>;

}

export class ClaimResponseInsurance extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseInsurance')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Required()
   @Validate(yup.boolean())
   public focal: boolean;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public coverage: FlatConvectorModel<Reference>; //Coverage

   @Validate(yup.string())
   public businessArrangement?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public claimResponse?: FlatConvectorModel<Reference>; //ClaimResponse

}

export class ClaimResponseError extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseError')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public itemSequence?: number;

   @Validate(yup.number())
   public detailSequence?: number;

   @Validate(yup.number())
   public subDetailSequence?: number;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

}

export class ClaimResponse extends DomainResource<ClaimResponse> {
   @Default('fhir.datatypes.ClaimResponse')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subType?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public use: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created: date;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public insurer: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public requestor?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public request?: FlatConvectorModel<Reference>; //Claim

   @Required()
   @Validate(yup.string())
   public outcome: string;

   @Validate(yup.string())
   public disposition?: string;

   @Validate(yup.string())
   public preAuthRef?: string;

   @Validate(yup.lazy(() => Period.schema()))
   public preAuthPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public payeeType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseItem.schema())))
   public item?: Array<FlatConvectorModel<ClaimResponseItem>>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseAddItem.schema())))
   public addItem?: Array<FlatConvectorModel<ClaimResponseAddItem>>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseTotal.schema())))
   public total?: Array<FlatConvectorModel<ClaimResponseTotal>>;

   @Validate(yup.lazy(() => ClaimResponsePayment.schema()))
   public payment?: FlatConvectorModel<ClaimResponsePayment>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public fundsReserve?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public formCode?: FlatConvectorModel<CodeableConcept>;

   //   @Validate(yup.lazy(() => Attachment.schema()))
   public form?: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseProcessNote.schema())))
   public processNote?: Array<FlatConvectorModel<ClaimResponseProcessNote>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public communicationRequest?: Array<FlatConvectorModel<Reference>>; //CommunicationRequest

   @Validate(yup.lazy(() => yup.array(ClaimResponseInsurance.schema())))
   public insurance?: Array<FlatConvectorModel<ClaimResponseInsurance>>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseError.schema())))
   public error?: Array<FlatConvectorModel<ClaimResponseError>>;

}


export class CoverageClass extends BackboneElement {
   @Default('fhir.datatypes.Coverage.CoverageClass')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public value: string;

   @Validate(yup.string())
   public name?: string;

}

export class CoverageCostToBeneficiary extends BackboneElement {
   @Default('fhir.datatypes.Coverage.CoverageCostToBeneficiary')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public valueQuantity: FlatConvectorModel<SimpleQuantity>;

   @Required()
   @Validate(yup.lazy(() => Money.schema()))
   public valueMoney: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => yup.array(CoverageCostToBeneficiaryException.schema())))
   public exception?: Array<FlatConvectorModel<CoverageCostToBeneficiaryException>>;

}

export class CoverageCostToBeneficiaryException extends BackboneElement {
   @Default('fhir.datatypes.Coverage.CoverageCostToBeneficiaryException')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

}

export class Coverage extends DomainResource<Coverage> {
   @Default('fhir.datatypes.Coverage')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public policyHolder?: FlatConvectorModel<Reference>; //Patient|RelatedPerson|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public subscriber?: FlatConvectorModel<Reference>; //Patient|RelatedPerson

   @Validate(yup.string())
   public subscriberId?: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public beneficiary: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.string())
   public dependent?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public relationship?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public payor?: Array<FlatConvectorModel<Reference>>; //Organization|Patient|RelatedPerson

   @Validate(yup.lazy(() => yup.array(CoverageClass.schema())))
   public class_?: Array<FlatConvectorModel<CoverageClass>>;

   @Validate(yup.number())
   public order?: number;

   @Validate(yup.string())
   public network?: string;

   @Validate(yup.lazy(() => yup.array(CoverageCostToBeneficiary.schema())))
   public costToBeneficiary?: Array<FlatConvectorModel<CoverageCostToBeneficiary>>;

   @Validate(yup.boolean())
   public subrogation?: boolean;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public contract?: Array<FlatConvectorModel<Reference>>; //Contract

}


export class EncounterStatusHistory extends BackboneElement {
   @Default('fhir.datatypes.Encounter.EncounterStatusHistory')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.lazy(() => Period.schema()))
   public period: FlatConvectorModel<Period>;

}

export class EncounterClassHistory extends BackboneElement {
   @Default('fhir.datatypes.Encounter.EncounterClassHistory')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public class_: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.lazy(() => Period.schema()))
   public period: FlatConvectorModel<Period>;

}

export class EncounterParticipant extends BackboneElement {
   @Default('fhir.datatypes.Encounter.EncounterParticipant')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Reference.schema()))
   public individual?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|RelatedPerson

}

export class EncounterDiagnosis extends BackboneElement {
   @Default('fhir.datatypes.Encounter.EncounterDiagnosis')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public condition: FlatConvectorModel<Reference>; //Condition|Procedure

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public use?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public rank?: number;

}

export class EncounterHospitalization extends BackboneElement {
   @Default('fhir.datatypes.Encounter.EncounterHospitalization')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public preAdmissionIdentifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => Reference.schema()))
   public origin?: FlatConvectorModel<Reference>; //Location|Organization

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public admitSource?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public reAdmission?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public dietPreference?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public specialCourtesy?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public specialArrangement?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public destination?: FlatConvectorModel<Reference>; //Location|Organization

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public dischargeDisposition?: FlatConvectorModel<CodeableConcept>;

}

export class EncounterLocation extends BackboneElement {
   @Default('fhir.datatypes.Encounter.EncounterLocation')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public location: FlatConvectorModel<Reference>; //Location

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public physicalType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

}

export class Encounter extends DomainResource<Encounter> {
   @Default('fhir.datatypes.Encounter')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => yup.array(EncounterStatusHistory.schema())))
   public statusHistory?: Array<FlatConvectorModel<EncounterStatusHistory>>;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public class_: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => yup.array(EncounterClassHistory.schema())))
   public classHistory?: Array<FlatConvectorModel<EncounterClassHistory>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public serviceType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public priority?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public episodeOfCare?: Array<FlatConvectorModel<Reference>>; //EpisodeOfCare

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //ServiceRequest

   @Validate(yup.lazy(() => yup.array(EncounterParticipant.schema())))
   public participant?: Array<FlatConvectorModel<EncounterParticipant>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public appointment?: Array<FlatConvectorModel<Reference>>; //Appointment

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Duration.schema()))
   public length?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Procedure|Observation|ImmunizationRecommendation

   @Validate(yup.lazy(() => yup.array(EncounterDiagnosis.schema())))
   public diagnosis?: Array<FlatConvectorModel<EncounterDiagnosis>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public account?: Array<FlatConvectorModel<Reference>>; //Account

   @Validate(yup.lazy(() => EncounterHospitalization.schema()))
   public hospitalization?: FlatConvectorModel<EncounterHospitalization>;

   @Validate(yup.lazy(() => yup.array(EncounterLocation.schema())))
   public location?: Array<FlatConvectorModel<EncounterLocation>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public serviceProvider?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public partOf?: FlatConvectorModel<Reference>; //Encounter

}


export class ExplanationOfBenefitRelated extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitRelated')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public claim?: FlatConvectorModel<Reference>; //Claim

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public relationship?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public reference?: FlatConvectorModel<Identifier>;

}

export class ExplanationOfBenefitPayee extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitPayee')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public party?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|Patient|RelatedPerson

}

export class ExplanationOfBenefitCareTeam extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitCareTeam')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public provider: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.boolean())
   public responsible?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public role?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public qualification?: FlatConvectorModel<CodeableConcept>;

}

export class ExplanationOfBenefitSupportingInfo extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitSupportingInfo')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timingDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public timingPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.boolean())
   public valueBoolean?: boolean;

   @Validate(yup.string())
   public valueString?: string;

   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity?: FlatConvectorModel<Quantity>;

   //   @Validate(yup.lazy(() => Attachment.schema()))
   public valueAttachment?: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => Reference.schema()))
   public valueReference?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => Coding.schema()))
   public reason?: FlatConvectorModel<Coding>;

}

export class ExplanationOfBenefitDiagnosis extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitDiagnosis')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public diagnosisCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public diagnosisReference: FlatConvectorModel<Reference>; //Condition

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public onAdmission?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public packageCode?: FlatConvectorModel<CodeableConcept>;

}

export class ExplanationOfBenefitProcedure extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitProcedure')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public procedureCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public procedureReference: FlatConvectorModel<Reference>; //Procedure

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public udi?: Array<FlatConvectorModel<Reference>>; //Device

}

export class ExplanationOfBenefitInsurance extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitInsurance')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.boolean())
   public focal: boolean;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public coverage: FlatConvectorModel<Reference>; //Coverage

   @Validate(yup.array(yup.string()))
   public preAuthRef?: Array<string>;

}

export class ExplanationOfBenefitAccident extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitAccident')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Address.schema()))
   public locationAddress?: FlatConvectorModel<Address>;

   @Validate(yup.lazy(() => Reference.schema()))
   public locationReference?: FlatConvectorModel<Reference>; //Location

}

export class ExplanationOfBenefitItem extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitItem')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Validate(yup.array(yup.number()))
   public careTeamSequence?: Array<number>;

   @Validate(yup.array(yup.number()))
   public diagnosisSequence?: Array<number>;

   @Validate(yup.array(yup.number()))
   public procedureSequence?: Array<number>;

   @Validate(yup.array(yup.number()))
   public informationSequence?: Array<number>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public revenue?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public programCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public servicedDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public servicedPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public locationCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Address.schema()))
   public locationAddress?: FlatConvectorModel<Address>;

   @Validate(yup.lazy(() => Reference.schema()))
   public locationReference?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public udi?: Array<FlatConvectorModel<Reference>>; //Device

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public bodySite?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public subSite?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public encounter?: Array<FlatConvectorModel<Reference>>; //Encounter

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitItemDetail.schema())))
   public detail?: Array<FlatConvectorModel<ExplanationOfBenefitItemDetail>>;

}

export class ExplanationOfBenefitItemAdjudication extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitItemAdjudication')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public reason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Money.schema()))
   public amount?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public value?: number;

}

export class ExplanationOfBenefitItemDetail extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitItemDetail')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public revenue?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public programCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public udi?: Array<FlatConvectorModel<Reference>>; //Device

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitItemDetailSubDetail.schema())))
   public subDetail?: Array<FlatConvectorModel<ExplanationOfBenefitItemDetailSubDetail>>;

}

export class ExplanationOfBenefitItemDetailSubDetail extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitItemDetailSubDetail')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public revenue?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public programCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public udi?: Array<FlatConvectorModel<Reference>>; //Device

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;

}

export class ExplanationOfBenefitAddItem extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitAddItem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.number()))
   public itemSequence?: Array<number>;

   @Validate(yup.array(yup.number()))
   public detailSequence?: Array<number>;

   @Validate(yup.array(yup.number()))
   public subDetailSequence?: Array<number>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public provider?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Organization

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public programCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public servicedDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public servicedPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public locationCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Address.schema()))
   public locationAddress?: FlatConvectorModel<Address>;

   @Validate(yup.lazy(() => Reference.schema()))
   public locationReference?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public bodySite?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public subSite?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitAddItemDetail.schema())))
   public detail?: Array<FlatConvectorModel<ExplanationOfBenefitAddItemDetail>>;

}

export class ExplanationOfBenefitAddItemDetail extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitAddItemDetail')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitAddItemDetailSubDetail.schema())))
   public subDetail?: Array<FlatConvectorModel<ExplanationOfBenefitAddItemDetailSubDetail>>;

}

export class ExplanationOfBenefitAddItemDetailSubDetail extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitAddItemDetailSubDetail')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.array(yup.number()))
   public noteNumber?: Array<number>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;

}

export class ExplanationOfBenefitTotal extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitTotal')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Money.schema()))
   public amount: FlatConvectorModel<Money>;

}

export class ExplanationOfBenefitPayment extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitPayment')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Money.schema()))
   public adjustment?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public adjustmentReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.lazy(() => Money.schema()))
   public amount?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

}

export class ExplanationOfBenefitProcessNote extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitProcessNote')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public number?: number;

   @Validate(yup.string())
   public type_?: string;

   @Validate(yup.string())
   public text?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public language?: FlatConvectorModel<CodeableConcept>;

}

export class ExplanationOfBenefitBenefitBalance extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitBenefitBalance')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public excluded?: boolean;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public network?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public unit?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public term?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitBenefitBalanceFinancial.schema())))
   public financial?: Array<FlatConvectorModel<ExplanationOfBenefitBenefitBalanceFinancial>>;

}

export class ExplanationOfBenefitBenefitBalanceFinancial extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitBenefitBalanceFinancial')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public allowedUnsignedInt?: number;

   @Validate(yup.string())
   public allowedString?: string;

   @Validate(yup.lazy(() => Money.schema()))
   public allowedMoney?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public usedUnsignedInt?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public usedMoney?: FlatConvectorModel<Money>;

}

export class ExplanationOfBenefit extends DomainResource<ExplanationOfBenefit> {
   @Default('fhir.datatypes.ExplanationOfBenefit')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subType?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public use: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => Period.schema()))
   public billablePeriod?: FlatConvectorModel<Period>;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public enterer?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public insurer: FlatConvectorModel<Reference>; //Organization

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public provider: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public priority?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public fundsReserveRequested?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public fundsReserve?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitRelated.schema())))
   public related?: Array<FlatConvectorModel<ExplanationOfBenefitRelated>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public prescription?: FlatConvectorModel<Reference>; //MedicationRequest|VisionPrescription

   @Validate(yup.lazy(() => Reference.schema()))
   public originalPrescription?: FlatConvectorModel<Reference>; //MedicationRequest

   @Validate(yup.lazy(() => ExplanationOfBenefitPayee.schema()))
   public payee?: FlatConvectorModel<ExplanationOfBenefitPayee>;

   @Validate(yup.lazy(() => Reference.schema()))
   public referral?: FlatConvectorModel<Reference>; //ServiceRequest

   @Validate(yup.lazy(() => Reference.schema()))
   public facility?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => Reference.schema()))
   public claim?: FlatConvectorModel<Reference>; //Claim

   @Validate(yup.lazy(() => Reference.schema()))
   public claimResponse?: FlatConvectorModel<Reference>; //ClaimResponse

   @Required()
   @Validate(yup.string())
   public outcome: string;

   @Validate(yup.string())
   public disposition?: string;

   @Validate(yup.array(yup.string()))
   public preAuthRef?: Array<string>;

   @Validate(yup.lazy(() => yup.array(Period.schema())))
   public preAuthRefPeriod?: Array<FlatConvectorModel<Period>>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitCareTeam.schema())))
   public careTeam?: Array<FlatConvectorModel<ExplanationOfBenefitCareTeam>>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitSupportingInfo.schema())))
   public supportingInfo?: Array<FlatConvectorModel<ExplanationOfBenefitSupportingInfo>>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitDiagnosis.schema())))
   public diagnosis?: Array<FlatConvectorModel<ExplanationOfBenefitDiagnosis>>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitProcedure.schema())))
   public procedure?: Array<FlatConvectorModel<ExplanationOfBenefitProcedure>>;

   @Validate(yup.number())
   public precedence?: number;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitInsurance.schema())))
   public insurance?: Array<FlatConvectorModel<ExplanationOfBenefitInsurance>>;

   @Validate(yup.lazy(() => ExplanationOfBenefitAccident.schema()))
   public accident?: FlatConvectorModel<ExplanationOfBenefitAccident>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitItem.schema())))
   public item?: Array<FlatConvectorModel<ExplanationOfBenefitItem>>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitAddItem.schema())))
   public addItem?: Array<FlatConvectorModel<ExplanationOfBenefitAddItem>>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitTotal.schema())))
   public total?: Array<FlatConvectorModel<ExplanationOfBenefitTotal>>;

   @Validate(yup.lazy(() => ExplanationOfBenefitPayment.schema()))
   public payment?: FlatConvectorModel<ExplanationOfBenefitPayment>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public formCode?: FlatConvectorModel<CodeableConcept>;

   //   @Validate(yup.lazy(() => Attachment.schema()))
   public form?: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitProcessNote.schema())))
   public processNote?: Array<FlatConvectorModel<ExplanationOfBenefitProcessNote>>;

   @Validate(yup.lazy(() => Period.schema()))
   public benefitPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitBenefitBalance.schema())))
   public benefitBalance?: Array<FlatConvectorModel<ExplanationOfBenefitBenefitBalance>>;

}


export class InvoiceParticipant extends BackboneElement {
   @Default('fhir.datatypes.Invoice.InvoiceParticipant')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public role?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public actor: FlatConvectorModel<Reference>; //Practitioner|Organization|Patient|PractitionerRole|Device|RelatedPerson

}

export class InvoiceLineItem extends BackboneElement {
   @Default('fhir.datatypes.Invoice.InvoiceLineItem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public sequence?: number;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public chargeItemReference: FlatConvectorModel<Reference>; //ChargeItem

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public chargeItemCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(InvoiceLineItemPriceComponent.schema())))
   public priceComponent?: Array<FlatConvectorModel<InvoiceLineItemPriceComponent>>;

}

export class InvoiceLineItemPriceComponent extends BackboneElement {
   @Default('fhir.datatypes.Invoice.InvoiceLineItemPriceComponent')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public amount?: FlatConvectorModel<Money>;

}

export class Invoice extends DomainResource<Invoice> {
   @Default('fhir.datatypes.Invoice')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.string())
   public cancelledReason?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public recipient?: FlatConvectorModel<Reference>; //Organization|Patient|RelatedPerson

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.lazy(() => yup.array(InvoiceParticipant.schema())))
   public participant?: Array<FlatConvectorModel<InvoiceParticipant>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public issuer?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public account?: FlatConvectorModel<Reference>; //Account

   @Validate(yup.lazy(() => yup.array(InvoiceLineItem.schema())))
   public lineItem?: Array<FlatConvectorModel<InvoiceLineItem>>;

   @Validate(yup.lazy(() => yup.array(InvoiceLineItemPriceComponent.schema())))
   public totalPriceComponent?: Array<FlatConvectorModel<InvoiceLineItemPriceComponent>>;

   @Validate(yup.lazy(() => Money.schema()))
   public totalNet?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => Money.schema()))
   public totalGross?: FlatConvectorModel<Money>;

   @Validate(yup.string())
   public paymentTerms?: string;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class OrganizationContact extends BackboneElement {
   @Default('fhir.datatypes.Organization.OrganizationContact')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public purpose?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => HumanName.schema()))
   public name?: FlatConvectorModel<HumanName>;

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.lazy(() => Address.schema()))
   public address?: FlatConvectorModel<Address>;

}

export class Organization extends DomainResource<Organization> {
   @Default('fhir.datatypes.Organization')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.boolean())
   public active?: boolean;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.array(yup.string()))
   public alias?: Array<string>;

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.lazy(() => yup.array(Address.schema())))
   public address?: Array<FlatConvectorModel<Address>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public partOf?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(OrganizationContact.schema())))
   public contact?: Array<FlatConvectorModel<OrganizationContact>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public endpoint?: Array<FlatConvectorModel<Reference>>; //Endpoint

}


export class PatientContact extends BackboneElement {
   @Default('fhir.datatypes.Patient.PatientContact')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public relationship?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => HumanName.schema()))
   public name?: FlatConvectorModel<HumanName>;

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.lazy(() => Address.schema()))
   public address?: FlatConvectorModel<Address>;

   @Validate(yup.string())
   public gender?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public organization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

}

export class PatientCommunication extends BackboneElement {
   @Default('fhir.datatypes.Patient.PatientCommunication')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public language: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public preferred?: boolean;

}

export class PatientLink extends BackboneElement {
   @Default('fhir.datatypes.Patient.PatientLink')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public other: FlatConvectorModel<Reference>; //Patient|RelatedPerson

   @Required()
   @Validate(yup.string())
   public type_: string;

}

export class Patient extends DomainResource<Patient> {
   @Default('fhir.datatypes.Patient')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.boolean())
   public active?: boolean;

   @Validate(yup.lazy(() => yup.array(HumanName.schema())))
   public name?: Array<FlatConvectorModel<HumanName>>;

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.string())
   public gender?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public birthDate?: date;

   @Validate(yup.boolean())
   public deceasedBoolean?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public deceasedDateTime?: date;

   @Validate(yup.lazy(() => yup.array(Address.schema())))
   public address?: Array<FlatConvectorModel<Address>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public maritalStatus?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public multipleBirthBoolean?: boolean;

   @Validate(yup.number())
   public multipleBirthInteger?: number;

   //   @Validate(yup.lazy(() => yup.array(Attachment.schema())))
   public photo?: Array<FlatConvectorModel<Attachment>>;

   @Validate(yup.lazy(() => yup.array(PatientContact.schema())))
   public contact?: Array<FlatConvectorModel<PatientContact>>;

   @Validate(yup.lazy(() => yup.array(PatientCommunication.schema())))
   public communication?: Array<FlatConvectorModel<PatientCommunication>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public generalPractitioner?: Array<FlatConvectorModel<Reference>>; //Organization|Practitioner|PractitionerRole

   @Validate(yup.lazy(() => Reference.schema()))
   public managingOrganization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(PatientLink.schema())))
   public link?: Array<FlatConvectorModel<PatientLink>>;

}


export class PaymentNotice extends DomainResource<PaymentNotice> {
   @Default('fhir.datatypes.PaymentNotice')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public request?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => Reference.schema()))
   public response?: FlatConvectorModel<Reference>; //Any

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public provider?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public payment: FlatConvectorModel<Reference>; //PaymentReconciliation

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public paymentDate?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public payee?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public recipient: FlatConvectorModel<Reference>; //Organization

   @Required()
   @Validate(yup.lazy(() => Money.schema()))
   public amount: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public paymentStatus?: FlatConvectorModel<CodeableConcept>;

}


export class PaymentReconciliationDetail extends BackboneElement {
   @Default('fhir.datatypes.PaymentReconciliation.PaymentReconciliationDetail')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public predecessor?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public request?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => Reference.schema()))
   public submitter?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public response?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public responsible?: FlatConvectorModel<Reference>; //PractitionerRole

   @Validate(yup.lazy(() => Reference.schema()))
   public payee?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => Money.schema()))
   public amount?: FlatConvectorModel<Money>;

}

export class PaymentReconciliationProcessNote extends BackboneElement {
   @Default('fhir.datatypes.PaymentReconciliation.PaymentReconciliationProcessNote')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public type_?: string;

   @Validate(yup.string())
   public text?: string;

}

export class PaymentReconciliation extends DomainResource<PaymentReconciliation> {
   @Default('fhir.datatypes.PaymentReconciliation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public paymentIssuer?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public request?: FlatConvectorModel<Reference>; //Task

   @Validate(yup.lazy(() => Reference.schema()))
   public requestor?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.string())
   public outcome?: string;

   @Validate(yup.string())
   public disposition?: string;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public paymentDate: date;

   @Required()
   @Validate(yup.lazy(() => Money.schema()))
   public paymentAmount: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public paymentIdentifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => yup.array(PaymentReconciliationDetail.schema())))
   public detail?: Array<FlatConvectorModel<PaymentReconciliationDetail>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public formCode?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(PaymentReconciliationProcessNote.schema())))
   public processNote?: Array<FlatConvectorModel<PaymentReconciliationProcessNote>>;

}


export class PractitionerQualification extends BackboneElement {
   @Default('fhir.datatypes.Practitioner.PractitionerQualification')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Reference.schema()))
   public issuer?: FlatConvectorModel<Reference>; //Organization

}

export class Practitioner extends DomainResource<Practitioner> {
   @Default('fhir.datatypes.Practitioner')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.boolean())
   public active?: boolean;

   @Validate(yup.lazy(() => yup.array(HumanName.schema())))
   public name?: Array<FlatConvectorModel<HumanName>>;

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.lazy(() => yup.array(Address.schema())))
   public address?: Array<FlatConvectorModel<Address>>;

   @Validate(yup.string())
   public gender?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public birthDate?: date;

   //   @Validate(yup.lazy(() => yup.array(Attachment.schema())))
   public photo?: Array<FlatConvectorModel<Attachment>>;

   @Validate(yup.lazy(() => yup.array(PractitionerQualification.schema())))
   public qualification?: Array<FlatConvectorModel<PractitionerQualification>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public communication?: Array<FlatConvectorModel<CodeableConcept>>;

}


export class ProcedurePerformer extends BackboneElement {
   @Default('fhir.datatypes.Procedure.ProcedurePerformer')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public function_?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public actor: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|Patient|RelatedPerson|Device

   @Validate(yup.lazy(() => Reference.schema()))
   public onBehalfOf?: FlatConvectorModel<Reference>; //Organization

}

export class ProcedureFocalDevice extends BackboneElement {
   @Default('fhir.datatypes.Procedure.ProcedureFocalDevice')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public action?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public manipulated: FlatConvectorModel<Reference>; //Device

}

export class Procedure extends DomainResource<Procedure> {
   @Default('fhir.datatypes.Procedure')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public instantiatesCanonical?: Array<string>; //PlanDefinition|ActivityDefinition|Measure|OperationDefinition|Questionnaire

   @Validate(yup.array(yup.string()))
   public instantiatesUri?: Array<string>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //CarePlan|ServiceRequest

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //Procedure|Observation|MedicationAdministration

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public statusReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public performedDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public performedPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string())
   public performedString?: string;

   @Validate(yup.lazy(() => Age.schema()))
   public performedAge?: FlatConvectorModel<Age>;

   @Validate(yup.lazy(() => Range.schema()))
   public performedRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Reference.schema()))
   public recorder?: FlatConvectorModel<Reference>; //Patient|RelatedPerson|Practitioner|PractitionerRole

   @Validate(yup.lazy(() => Reference.schema()))
   public asserter?: FlatConvectorModel<Reference>; //Patient|RelatedPerson|Practitioner|PractitionerRole

   @Validate(yup.lazy(() => yup.array(ProcedurePerformer.schema())))
   public performer?: Array<FlatConvectorModel<ProcedurePerformer>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public location?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|Procedure|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public bodySite?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public outcome?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public report?: Array<FlatConvectorModel<Reference>>; //DiagnosticReport|DocumentReference|Composition

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public complication?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public complicationDetail?: Array<FlatConvectorModel<Reference>>; //Condition

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public followUp?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(ProcedureFocalDevice.schema())))
   public focalDevice?: Array<FlatConvectorModel<ProcedureFocalDevice>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public usedReference?: Array<FlatConvectorModel<Reference>>; //Device|Medication|Substance

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public usedCode?: Array<FlatConvectorModel<CodeableConcept>>;

}

