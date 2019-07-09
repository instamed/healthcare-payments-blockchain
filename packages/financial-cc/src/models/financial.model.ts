import * as fhirTypes from '../utils/fhirTypes';
import * as yup from 'yup';
import {
   ConvectorModel,
   FlatConvectorModel,
   ReadOnly,
   Required,
   Validate,
   Default
} from '@worldsibu/convector-core';
import { x509Identities } from '../utils/identities.model';

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
   // TODO: fix this
   @Default('fhir.datatypes.Financial')
   @ReadOnly()
   public readonly type: string;
}

export abstract class Element<T extends Element<any>> extends ConvectorModel<T> {
  
  @Validate(yup.string())
  public id: string;

  @Validate(yup.lazy(()=> yup.array(Extension.schema())))
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
export class  SimpleQuantity extends Quantity {

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

export class BundleEntry extends BackboneElement {
   @Default('fhir.datatypes.Bundle.BundleEntry')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(BundleLink.schema())))
   public link?: Array<FlatConvectorModel<BundleLink>>;

   @Validate(yup.string())
   public fullUrl?: string;

   @Validate(yup.lazy(() => Resource.schema()))
   public resource?: FlatConvectorModel<Resource<any>>;

   @Validate(yup.lazy(() => BundleEntrySearch.schema()))
   public search?: FlatConvectorModel<BundleEntrySearch>;

   @Validate(yup.lazy(() => BundleEntryRequest.schema()))
   public request?: FlatConvectorModel<BundleEntryRequest>;

   @Validate(yup.lazy(() => BundleEntryResponse.schema()))
   public response?: FlatConvectorModel<BundleEntryResponse>;

}

export class BundleEntryResponse extends BackboneElement {
   @Default('fhir.datatypes.Bundle.BundleEntryResponse')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.string())
   public location?: string;

   @Validate(yup.string())
   public etag?: string;

   @Validate(yup.string())
   public lastModified?: string;

   @Validate(yup.lazy(() => Resource.schema()))
   public outcome?: FlatConvectorModel<Resource<any>>;

}

export class ParametersParameter extends BackboneElement {
   @Default('fhir.datatypes.Parameters.ParametersParameter')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.lazy(() => Resource.schema()))
   public resource?: FlatConvectorModel<Resource<any>>;

   @Validate(yup.lazy(() => yup.array(ParametersParameter.schema())))
   public part?: Array<FlatConvectorModel<ParametersParameter>>;

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

   @Validate(yup.array(x509Identities))
   public identities: x509Identities[];
}


export class Dosage extends DomainResource<Dosage> {
   @Default('fhir.datatypes.Dosage')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public sequence?: number;

   @Validate(yup.string())
   public text_?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public additionalInstruction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public patientInstruction?: string;

   @Validate(yup.lazy(() => Timing.schema()))
   public timing?: FlatConvectorModel<Timing>;

   @Validate(yup.boolean())
   public asNeededBoolean?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public asNeededCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public site?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public route?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public method?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(DosageDoseAndRate.schema())))
   public doseAndRate?: Array<FlatConvectorModel<DosageDoseAndRate>>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public maxDosePerPeriod?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public maxDosePerAdministration?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public maxDosePerLifetime?: FlatConvectorModel<SimpleQuantity>;

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

   @Validate(yup.array(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date')))
   public event? : Array<date>;

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
   public profile? : Array<string>; //StructureDefinition

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
   public dayOfWeek? : Array<string>;

   @Validate(yup.array(yup.string()))
   public timeOfDay? : Array<string>;

   @Validate(yup.array(yup.string()))
   public when? : Array<string>;

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
   public line? : Array<string>;

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
   public given? : Array<string>;

   @Validate(yup.array(yup.string()))
   public prefix? : Array<string>;

   @Validate(yup.array(yup.string()))
   public suffix? : Array<string>;

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


export class ActivityDefinitionParticipant extends BackboneElement {
   @Default('fhir.datatypes.ActivityDefinition.ActivityDefinitionParticipant')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public role?: FlatConvectorModel<CodeableConcept>;

}

export class ActivityDefinitionDynamicValue extends BackboneElement {
   @Default('fhir.datatypes.ActivityDefinition.ActivityDefinitionDynamicValue')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public path: string;

   @Required()
   @Validate(yup.lazy(() => Expression.schema()))
   public expression: FlatConvectorModel<Expression>;

}

export class ActivityDefinition extends DomainResource<ActivityDefinition> {
   @Default('fhir.datatypes.ActivityDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public subtitle?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subjectCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subjectReference?: FlatConvectorModel<Reference>; //Group

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public usage?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public topic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public author?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public editor?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public reviewer?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public endorser?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.array(yup.string()))
   public library? : Array<string>; //Library

   @Validate(yup.string())
   public kind?: string;

   @Validate(yup.string())
   public profile?: string; //StructureDefinition

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public intent?: string;

   @Validate(yup.string())
   public priority?: string;

   @Validate(yup.boolean())
   public doNotPerform?: boolean;

   @Validate(yup.lazy(() => Timing.schema()))
   public timingTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timingDateTime?: date;

   @Validate(yup.lazy(() => Age.schema()))
   public timingAge?: FlatConvectorModel<Age>;

   @Validate(yup.lazy(() => Period.schema()))
   public timingPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Range.schema()))
   public timingRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Duration.schema()))
   public timingDuration?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => Reference.schema()))
   public location?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => yup.array(ActivityDefinitionParticipant.schema())))
   public participant?: Array<FlatConvectorModel<ActivityDefinitionParticipant>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public productReference?: FlatConvectorModel<Reference>; //Medication|Substance

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => yup.array(Dosage.schema())))
   public dosage?: Array<FlatConvectorModel<Dosage>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public bodySite?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public specimenRequirement?: Array<FlatConvectorModel<Reference>>; //SpecimenDefinition

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public observationRequirement?: Array<FlatConvectorModel<Reference>>; //ObservationDefinition

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public observationResultRequirement?: Array<FlatConvectorModel<Reference>>; //ObservationDefinition

   @Validate(yup.string())
   public transform?: string; //StructureMap

   @Validate(yup.lazy(() => yup.array(ActivityDefinitionDynamicValue.schema())))
   public dynamicValue?: Array<FlatConvectorModel<ActivityDefinitionDynamicValue>>;

}


export class AdverseEventSuspectEntity extends BackboneElement {
   @Default('fhir.datatypes.AdverseEvent.AdverseEventSuspectEntity')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public instance: FlatConvectorModel<Reference>; //Immunization|Procedure|Substance|Medication|MedicationAdministration|MedicationStatement|Device

   @Validate(yup.lazy(() => yup.array(AdverseEventSuspectEntityCausality.schema())))
   public causality?: Array<FlatConvectorModel<AdverseEventSuspectEntityCausality>>;

}

export class AdverseEventSuspectEntityCausality extends BackboneElement {
   @Default('fhir.datatypes.AdverseEvent.AdverseEventSuspectEntityCausality')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public assessment?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public productRelatedness?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public author?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public method?: FlatConvectorModel<CodeableConcept>;

}

export class AdverseEvent extends DomainResource<AdverseEvent> {
   @Default('fhir.datatypes.AdverseEvent')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.string())
   public actuality: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public event?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group|Practitioner|RelatedPerson

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public detected?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public recordedDate?: date;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public resultingCondition?: Array<FlatConvectorModel<Reference>>; //Condition

   @Validate(yup.lazy(() => Reference.schema()))
   public location?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public seriousness?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public severity?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public outcome?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public recorder?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|RelatedPerson

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public contributor?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Device

   @Validate(yup.lazy(() => yup.array(AdverseEventSuspectEntity.schema())))
   public suspectEntity?: Array<FlatConvectorModel<AdverseEventSuspectEntity>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public subjectMedicalHistory?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|AllergyIntolerance|FamilyMemberHistory|Immunization|Procedure|Media|DocumentReference

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public referenceDocument?: Array<FlatConvectorModel<Reference>>; //DocumentReference

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public study?: Array<FlatConvectorModel<Reference>>; //ResearchStudy

}


export class AllergyIntoleranceReaction extends BackboneElement {
   @Default('fhir.datatypes.AllergyIntolerance.AllergyIntoleranceReaction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public substance?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public manifestation?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public onset?: date;

   @Validate(yup.string())
   public severity?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public exposureRoute?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}

export class AllergyIntolerance extends DomainResource<AllergyIntolerance> {
   @Default('fhir.datatypes.AllergyIntolerance')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public clinicalStatus?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public verificationStatus?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public type_?: string;

   @Validate(yup.array(yup.string()))
   public category? : Array<string>;

   @Validate(yup.string())
   public criticality?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public onsetDateTime?: date;

   @Validate(yup.lazy(() => Age.schema()))
   public onsetAge?: FlatConvectorModel<Age>;

   @Validate(yup.lazy(() => Period.schema()))
   public onsetPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Range.schema()))
   public onsetRange?: FlatConvectorModel<Range>;

   @Validate(yup.string())
   public onsetString?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public recordedDate?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public recorder?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Patient|RelatedPerson

   @Validate(yup.lazy(() => Reference.schema()))
   public asserter?: FlatConvectorModel<Reference>; //Patient|RelatedPerson|Practitioner|PractitionerRole

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastOccurrence?: date;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(AllergyIntoleranceReaction.schema())))
   public reaction?: Array<FlatConvectorModel<AllergyIntoleranceReaction>>;

}


export class AppointmentParticipant extends BackboneElement {
   @Default('fhir.datatypes.Appointment.AppointmentParticipant')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public actor?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|RelatedPerson|Device|HealthcareService|Location

   @Validate(yup.string())
   public required?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

}

export class Appointment extends DomainResource<Appointment> {
   @Default('fhir.datatypes.Appointment')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public cancelationReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public serviceCategory?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public serviceType?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public specialty?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public appointmentType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Procedure|Observation|ImmunizationRecommendation

   @Validate(yup.number())
   public priority?: number;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingInformation?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.string())
   public start?: string;

   @Validate(yup.string())
   public end?: string;

   @Validate(yup.number())
   public minutesDuration?: number;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public slot?: Array<FlatConvectorModel<Reference>>; //Slot

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created?: date;

   @Validate(yup.string())
   public comment?: string;

   @Validate(yup.string())
   public patientInstruction?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //ServiceRequest

   @Validate(yup.lazy(() => yup.array(AppointmentParticipant.schema())))
   public participant?: Array<FlatConvectorModel<AppointmentParticipant>>;

   @Validate(yup.lazy(() => yup.array(Period.schema())))
   public requestedPeriod?: Array<FlatConvectorModel<Period>>;

}


export class AppointmentResponse extends DomainResource<AppointmentResponse> {
   @Default('fhir.datatypes.AppointmentResponse')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public appointment: FlatConvectorModel<Reference>; //Appointment

   @Validate(yup.string())
   public start?: string;

   @Validate(yup.string())
   public end?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public participantType?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public actor?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|RelatedPerson|Device|HealthcareService|Location

   @Required()
   @Validate(yup.string())
   public participantStatus: string;

   @Validate(yup.string())
   public comment?: string;

}


export class AuditEventAgent extends BackboneElement {
   @Default('fhir.datatypes.AuditEvent.AuditEventAgent')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public role?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public who?: FlatConvectorModel<Reference>; //PractitionerRole|Practitioner|Organization|Device|Patient|RelatedPerson

   @Validate(yup.string())
   public altId?: string;

   @Validate(yup.string())
   public name?: string;

   @Required()
   @Validate(yup.boolean())
   public requestor: boolean;

   @Validate(yup.lazy(() => Reference.schema()))
   public location?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.array(yup.string()))
   public policy? : Array<string>;

   @Validate(yup.lazy(() => Coding.schema()))
   public media?: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => AuditEventAgentNetwork.schema()))
   public network?: FlatConvectorModel<AuditEventAgentNetwork>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public purposeOfUse?: Array<FlatConvectorModel<CodeableConcept>>;

}

export class AuditEventAgentNetwork extends BackboneElement {
   @Default('fhir.datatypes.AuditEvent.AuditEventAgentNetwork')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public address?: string;

   @Validate(yup.string())
   public type_?: string;

}

export class AuditEventSource extends BackboneElement {
   @Default('fhir.datatypes.AuditEvent.AuditEventSource')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public site?: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public observer: FlatConvectorModel<Reference>; //PractitionerRole|Practitioner|Organization|Device|Patient|RelatedPerson

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public type_?: Array<FlatConvectorModel<Coding>>;

}

export class AuditEventEntity extends BackboneElement {
   @Default('fhir.datatypes.AuditEvent.AuditEventEntity')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public what?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => Coding.schema()))
   public type_?: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => Coding.schema()))
   public role?: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => Coding.schema()))
   public lifecycle?: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public securityLabel?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public query?: string;

   @Validate(yup.lazy(() => yup.array(AuditEventEntityDetail.schema())))
   public detail?: Array<FlatConvectorModel<AuditEventEntityDetail>>;

}

export class AuditEventEntityDetail extends BackboneElement {
   @Default('fhir.datatypes.AuditEvent.AuditEventEntityDetail')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Required()
   @Validate(yup.string())
   public valueString: string;

   @Required()
   @Validate(yup.string())
   public valueBase64Binary: string;

}

export class AuditEvent extends DomainResource<AuditEvent> {
   @Default('fhir.datatypes.AuditEvent')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public type_: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public subtype?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.string())
   public action?: string;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Required()
   @Validate(yup.string())
   public recorded: string;

   @Validate(yup.string())
   public outcome?: string;

   @Validate(yup.string())
   public outcomeDesc?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public purposeOfEvent?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(AuditEventAgent.schema())))
   public agent?: Array<FlatConvectorModel<AuditEventAgent>>;

   @Required()
   @Validate(yup.lazy(() => AuditEventSource.schema()))
   public source: FlatConvectorModel<AuditEventSource>;

   @Validate(yup.lazy(() => yup.array(AuditEventEntity.schema())))
   public entity?: Array<FlatConvectorModel<AuditEventEntity>>;

}


export class Basic extends DomainResource<Basic> {
   @Default('fhir.datatypes.Basic')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public author?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Patient|RelatedPerson|Organization

}


export class Binary extends DomainResource<Binary> {
   @Default('fhir.datatypes.Binary')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public contentType: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public securityContext?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.string())
   public data?: string;

}


export class BiologicallyDerivedProductCollection extends BackboneElement {
   @Default('fhir.datatypes.BiologicallyDerivedProduct.BiologicallyDerivedProductCollection')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public collector?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => Reference.schema()))
   public source?: FlatConvectorModel<Reference>; //Patient|Organization

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public collectedDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public collectedPeriod?: FlatConvectorModel<Period>;

}

export class BiologicallyDerivedProductProcessing extends BackboneElement {
   @Default('fhir.datatypes.BiologicallyDerivedProduct.BiologicallyDerivedProductProcessing')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public procedure?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public additive?: FlatConvectorModel<Reference>; //Substance

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timeDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public timePeriod?: FlatConvectorModel<Period>;

}

export class BiologicallyDerivedProductManipulation extends BackboneElement {
   @Default('fhir.datatypes.BiologicallyDerivedProduct.BiologicallyDerivedProductManipulation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timeDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public timePeriod?: FlatConvectorModel<Period>;

}

export class BiologicallyDerivedProductStorage extends BackboneElement {
   @Default('fhir.datatypes.BiologicallyDerivedProduct.BiologicallyDerivedProductStorage')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.number())
   public temperature?: number;

   @Validate(yup.string())
   public scale?: string;

   @Validate(yup.lazy(() => Period.schema()))
   public duration?: FlatConvectorModel<Period>;

}

export class BiologicallyDerivedProduct extends DomainResource<BiologicallyDerivedProduct> {
   @Default('fhir.datatypes.BiologicallyDerivedProduct')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public productCategory?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productCode?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public request?: Array<FlatConvectorModel<Reference>>; //ServiceRequest

   @Validate(yup.number())
   public quantity?: number;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public parent?: Array<FlatConvectorModel<Reference>>; //BiologicallyDerivedProduct

   @Validate(yup.lazy(() => BiologicallyDerivedProductCollection.schema()))
   public collection?: FlatConvectorModel<BiologicallyDerivedProductCollection>;

   @Validate(yup.lazy(() => yup.array(BiologicallyDerivedProductProcessing.schema())))
   public processing?: Array<FlatConvectorModel<BiologicallyDerivedProductProcessing>>;

   @Validate(yup.lazy(() => BiologicallyDerivedProductManipulation.schema()))
   public manipulation?: FlatConvectorModel<BiologicallyDerivedProductManipulation>;

   @Validate(yup.lazy(() => yup.array(BiologicallyDerivedProductStorage.schema())))
   public storage?: Array<FlatConvectorModel<BiologicallyDerivedProductStorage>>;

}


export class BodyStructure extends DomainResource<BodyStructure> {
   @Default('fhir.datatypes.BodyStructure')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.boolean())
   public active?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public morphology?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public location?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public locationQualifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public description?: string;

//   @Validate(yup.lazy(() => yup.array(Attachment.schema())))
   public image?: Array<FlatConvectorModel<Attachment>>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

}


export class BundleLink extends BackboneElement {
   @Default('fhir.datatypes.Bundle.BundleLink')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public relation: string;

   @Required()
   @Validate(yup.string())
   public url: string;

}

export class BundleEntrySearch extends BackboneElement {
   @Default('fhir.datatypes.Bundle.BundleEntrySearch')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public mode?: string;

   @Validate(yup.number())
   public score?: number;

}

export class BundleEntryRequest extends BackboneElement {
   @Default('fhir.datatypes.Bundle.BundleEntryRequest')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public method: string;

   @Required()
   @Validate(yup.string())
   public url: string;

   @Validate(yup.string())
   public ifNoneMatch?: string;

   @Validate(yup.string())
   public ifModifiedSince?: string;

   @Validate(yup.string())
   public ifMatch?: string;

   @Validate(yup.string())
   public ifNoneExist?: string;

}

export class Bundle extends DomainResource<Bundle> {
   @Default('fhir.datatypes.Bundle')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public timestamp?: string;

   @Validate(yup.number())
   public total?: number;

   @Validate(yup.lazy(() => yup.array(BundleLink.schema())))
   public link?: Array<FlatConvectorModel<BundleLink>>;

   @Validate(yup.lazy(() => yup.array(BundleEntry.schema())))
   public entry?: Array<FlatConvectorModel<BundleEntry>>;

   @Validate(yup.lazy(() => Signature.schema()))
   public signature?: FlatConvectorModel<Signature>;

}


export class CapabilityStatementSoftware extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementSoftware')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public releaseDate?: date;

}

export class CapabilityStatementImplementation extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementImplementation')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public description: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public custodian?: FlatConvectorModel<Reference>; //Organization

}

export class CapabilityStatementRest extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementRest')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public mode: string;

   @Validate(yup.string())
   public documentation?: string;

   @Validate(yup.lazy(() => CapabilityStatementRestSecurity.schema()))
   public security?: FlatConvectorModel<CapabilityStatementRestSecurity>;

   @Validate(yup.lazy(() => yup.array(CapabilityStatementRestResource.schema())))
   public resource?: Array<FlatConvectorModel<CapabilityStatementRestResource>>;

   @Validate(yup.lazy(() => yup.array(CapabilityStatementRestInteraction.schema())))
   public interaction?: Array<FlatConvectorModel<CapabilityStatementRestInteraction>>;

   @Validate(yup.lazy(() => yup.array(CapabilityStatementRestResourceSearchParam.schema())))
   public searchParam?: Array<FlatConvectorModel<CapabilityStatementRestResourceSearchParam>>;

   @Validate(yup.lazy(() => yup.array(CapabilityStatementRestResourceOperation.schema())))
   public operation?: Array<FlatConvectorModel<CapabilityStatementRestResourceOperation>>;

   @Validate(yup.array(yup.string()))
   public compartment? : Array<string>; //CompartmentDefinition

}

export class CapabilityStatementRestSecurity extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementRestSecurity')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.boolean())
   public cors?: boolean;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public service?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public description?: string;

}

export class CapabilityStatementRestResource extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementRestResource')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public profile?: string; //StructureDefinition

   @Validate(yup.array(yup.string()))
   public supportedProfile? : Array<string>; //StructureDefinition

   @Validate(yup.string())
   public documentation?: string;

   @Validate(yup.lazy(() => yup.array(CapabilityStatementRestResourceInteraction.schema())))
   public interaction?: Array<FlatConvectorModel<CapabilityStatementRestResourceInteraction>>;

   @Validate(yup.string())
   public versioning?: string;

   @Validate(yup.boolean())
   public readHistory?: boolean;

   @Validate(yup.boolean())
   public updateCreate?: boolean;

   @Validate(yup.boolean())
   public conditionalCreate?: boolean;

   @Validate(yup.string())
   public conditionalRead?: string;

   @Validate(yup.boolean())
   public conditionalUpdate?: boolean;

   @Validate(yup.string())
   public conditionalDelete?: string;

   @Validate(yup.array(yup.string()))
   public referencePolicy? : Array<string>;

   @Validate(yup.array(yup.string()))
   public searchInclude? : Array<string>;

   @Validate(yup.array(yup.string()))
   public searchRevInclude? : Array<string>;

   @Validate(yup.lazy(() => yup.array(CapabilityStatementRestResourceSearchParam.schema())))
   public searchParam?: Array<FlatConvectorModel<CapabilityStatementRestResourceSearchParam>>;

   @Validate(yup.lazy(() => yup.array(CapabilityStatementRestResourceOperation.schema())))
   public operation?: Array<FlatConvectorModel<CapabilityStatementRestResourceOperation>>;

}

export class CapabilityStatementRestResourceInteraction extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementRestResourceInteraction')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.string())
   public documentation?: string;

}

export class CapabilityStatementRestResourceSearchParam extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementRestResourceSearchParam')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public definition?: string; //SearchParameter

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public documentation?: string;

}

export class CapabilityStatementRestResourceOperation extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementRestResourceOperation')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Required()
   @Validate(yup.string())
   public definition: string; //OperationDefinition

   @Validate(yup.string())
   public documentation?: string;

}

export class CapabilityStatementRestInteraction extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementRestInteraction')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.string())
   public documentation?: string;

}

export class CapabilityStatementMessaging extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementMessaging')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CapabilityStatementMessagingEndpoint.schema())))
   public endpoint?: Array<FlatConvectorModel<CapabilityStatementMessagingEndpoint>>;

   @Validate(yup.number())
   public reliableCache?: number;

   @Validate(yup.string())
   public documentation?: string;

   @Validate(yup.lazy(() => yup.array(CapabilityStatementMessagingSupportedMessage.schema())))
   public supportedMessage?: Array<FlatConvectorModel<CapabilityStatementMessagingSupportedMessage>>;

}

export class CapabilityStatementMessagingEndpoint extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementMessagingEndpoint')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public protocol: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.string())
   public address: string;

}

export class CapabilityStatementMessagingSupportedMessage extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementMessagingSupportedMessage')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public mode: string;

   @Required()
   @Validate(yup.string())
   public definition: string; //MessageDefinition

}

export class CapabilityStatementDocument extends BackboneElement {
   @Default('fhir.datatypes.CapabilityStatement.CapabilityStatementDocument')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public mode: string;

   @Validate(yup.string())
   public documentation?: string;

   @Required()
   @Validate(yup.string())
   public profile: string; //StructureDefinition

}

export class CapabilityStatement extends DomainResource<CapabilityStatement> {
   @Default('fhir.datatypes.CapabilityStatement')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Required()
   @Validate(yup.string())
   public kind: string;

   @Validate(yup.array(yup.string()))
   public instantiates? : Array<string>; //CapabilityStatement

   @Validate(yup.array(yup.string()))
   public imports? : Array<string>; //CapabilityStatement

   @Validate(yup.lazy(() => CapabilityStatementSoftware.schema()))
   public software?: FlatConvectorModel<CapabilityStatementSoftware>;

   @Validate(yup.lazy(() => CapabilityStatementImplementation.schema()))
   public implementation?: FlatConvectorModel<CapabilityStatementImplementation>;

   @Required()
   @Validate(yup.string())
   public fhirVersion: string;

   @Validate(yup.array(yup.string()))
   public format? : Array<string>;

   @Validate(yup.array(yup.string()))
   public patchFormat? : Array<string>;

   @Validate(yup.array(yup.string()))
   public implementationGuide? : Array<string>; //ImplementationGuide

   @Validate(yup.lazy(() => yup.array(CapabilityStatementRest.schema())))
   public rest?: Array<FlatConvectorModel<CapabilityStatementRest>>;

   @Validate(yup.lazy(() => yup.array(CapabilityStatementMessaging.schema())))
   public messaging?: Array<FlatConvectorModel<CapabilityStatementMessaging>>;

   @Validate(yup.lazy(() => yup.array(CapabilityStatementDocument.schema())))
   public document?: Array<FlatConvectorModel<CapabilityStatementDocument>>;

}


export class CarePlanActivity extends BackboneElement {
   @Default('fhir.datatypes.CarePlan.CarePlanActivity')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public outcomeCodeableConcept?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public outcomeReference?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public progress?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public reference?: FlatConvectorModel<Reference>; //Appointment|CommunicationRequest|DeviceRequest|MedicationRequest|NutritionOrder|Task|ServiceRequest|VisionPrescription|RequestGroup

   @Validate(yup.lazy(() => CarePlanActivityDetail.schema()))
   public detail?: FlatConvectorModel<CarePlanActivityDetail>;

}

export class CarePlanActivityDetail extends BackboneElement {
   @Default('fhir.datatypes.CarePlan.CarePlanActivityDetail')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public kind?: string;

   @Validate(yup.array(yup.string()))
   public instantiatesCanonical? : Array<string>; //PlanDefinition|ActivityDefinition|Questionnaire|Measure|OperationDefinition

   @Validate(yup.array(yup.string()))
   public instantiatesUri? : Array<string>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public goal?: Array<FlatConvectorModel<Reference>>; //Goal

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public statusReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public doNotPerform?: boolean;

   @Validate(yup.lazy(() => Timing.schema()))
   public scheduledTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => Period.schema()))
   public scheduledPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string())
   public scheduledString?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public location?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public performer?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Organization|RelatedPerson|Patient|CareTeam|HealthcareService|Device

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public productReference?: FlatConvectorModel<Reference>; //Medication|Substance

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public dailyAmount?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.string())
   public description?: string;

}

export class CarePlan extends DomainResource<CarePlan> {
   @Default('fhir.datatypes.CarePlan')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public instantiatesCanonical? : Array<string>; //PlanDefinition|Questionnaire|Measure|ActivityDefinition|OperationDefinition

   @Validate(yup.array(yup.string()))
   public instantiatesUri? : Array<string>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //CarePlan

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public replaces?: Array<FlatConvectorModel<Reference>>; //CarePlan

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //CarePlan

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.string())
   public intent: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public description?: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public author?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|Device|RelatedPerson|Organization|CareTeam

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public contributor?: Array<FlatConvectorModel<Reference>>; //Patient|Practitioner|PractitionerRole|Device|RelatedPerson|Organization|CareTeam

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public careTeam?: Array<FlatConvectorModel<Reference>>; //CareTeam

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public addresses?: Array<FlatConvectorModel<Reference>>; //Condition

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingInfo?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public goal?: Array<FlatConvectorModel<Reference>>; //Goal

   @Validate(yup.lazy(() => yup.array(CarePlanActivity.schema())))
   public activity?: Array<FlatConvectorModel<CarePlanActivity>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class CareTeamParticipant extends BackboneElement {
   @Default('fhir.datatypes.CareTeam.CareTeamParticipant')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public role?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public member?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|RelatedPerson|Patient|Organization|CareTeam

   @Validate(yup.lazy(() => Reference.schema()))
   public onBehalfOf?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

}

export class CareTeam extends DomainResource<CareTeam> {
   @Default('fhir.datatypes.CareTeam')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CareTeamParticipant.schema())))
   public participant?: Array<FlatConvectorModel<CareTeamParticipant>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public managingOrganization?: Array<FlatConvectorModel<Reference>>; //Organization

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class CatalogEntryRelatedEntry extends BackboneElement {
   @Default('fhir.datatypes.CatalogEntry.CatalogEntryRelatedEntry')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public relationtype: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public item: FlatConvectorModel<Reference>; //CatalogEntry

}

export class CatalogEntry extends DomainResource<CatalogEntry> {
   @Default('fhir.datatypes.CatalogEntry')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.boolean())
   public orderable: boolean;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public referencedItem: FlatConvectorModel<Reference>; //Medication|Device|Organization|Practitioner|PractitionerRole|HealthcareService|ActivityDefinition|PlanDefinition|SpecimenDefinition|ObservationDefinition|Binary

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public additionalIdentifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public classification?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => Period.schema()))
   public validityPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public validTo?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastUpdated?: date;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public additionalCharacteristic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public additionalClassification?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CatalogEntryRelatedEntry.schema())))
   public relatedEntry?: Array<FlatConvectorModel<CatalogEntryRelatedEntry>>;

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
   public definitionUri? : Array<string>;

   @Validate(yup.array(yup.string()))
   public definitionCanonical? : Array<string>; //ChargeItemDefinition

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


export class ChargeItemDefinitionApplicability extends BackboneElement {
   @Default('fhir.datatypes.ChargeItemDefinition.ChargeItemDefinitionApplicability')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public language?: string;

   @Validate(yup.string())
   public expression?: string;

}

export class ChargeItemDefinitionPropertyGroup extends BackboneElement {
   @Default('fhir.datatypes.ChargeItemDefinition.ChargeItemDefinitionPropertyGroup')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(ChargeItemDefinitionApplicability.schema())))
   public applicability?: Array<FlatConvectorModel<ChargeItemDefinitionApplicability>>;

   @Validate(yup.lazy(() => yup.array(ChargeItemDefinitionPropertyGroupPriceComponent.schema())))
   public priceComponent?: Array<FlatConvectorModel<ChargeItemDefinitionPropertyGroupPriceComponent>>;

}

export class ChargeItemDefinitionPropertyGroupPriceComponent extends BackboneElement {
   @Default('fhir.datatypes.ChargeItemDefinition.ChargeItemDefinitionPropertyGroupPriceComponent')
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

export class ChargeItemDefinition extends DomainResource<ChargeItemDefinition> {
   @Default('fhir.datatypes.ChargeItemDefinition')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public url: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.array(yup.string()))
   public derivedFromUri? : Array<string>;

   @Validate(yup.array(yup.string()))
   public partOf? : Array<string>; //ChargeItemDefinition

   @Validate(yup.array(yup.string()))
   public replaces? : Array<string>; //ChargeItemDefinition

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public instance?: Array<FlatConvectorModel<Reference>>; //Medication|Substance|Device

   @Validate(yup.lazy(() => yup.array(ChargeItemDefinitionApplicability.schema())))
   public applicability?: Array<FlatConvectorModel<ChargeItemDefinitionApplicability>>;

   @Validate(yup.lazy(() => yup.array(ChargeItemDefinitionPropertyGroup.schema())))
   public propertyGroup?: Array<FlatConvectorModel<ChargeItemDefinitionPropertyGroup>>;

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
   public preAuthRef? : Array<string>;

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
   public careTeamSequence? : Array<number>;

   @Validate(yup.array(yup.number()))
   public diagnosisSequence? : Array<number>;

   @Validate(yup.array(yup.number()))
   public procedureSequence? : Array<number>;

   @Validate(yup.array(yup.number()))
   public informationSequence? : Array<number>;

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
   public noteNumber? : Array<number>;

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
   public noteNumber? : Array<number>;

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
   public noteNumber? : Array<number>;

   @Validate(yup.lazy(() => yup.array(ClaimResponseItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ClaimResponseItemAdjudication>>;

}

export class ClaimResponseAddItem extends BackboneElement {
   @Default('fhir.datatypes.ClaimResponse.ClaimResponseAddItem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.number()))
   public itemSequence? : Array<number>;

   @Validate(yup.array(yup.number()))
   public detailSequence? : Array<number>;

   @Validate(yup.array(yup.number()))
   public subdetailSequence? : Array<number>;

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
   public noteNumber? : Array<number>;

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
   public noteNumber? : Array<number>;

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
   public noteNumber? : Array<number>;

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


export class ClinicalImpressionInvestigation extends BackboneElement {
   @Default('fhir.datatypes.ClinicalImpression.ClinicalImpressionInvestigation')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public item?: Array<FlatConvectorModel<Reference>>; //Observation|QuestionnaireResponse|FamilyMemberHistory|DiagnosticReport|RiskAssessment|ImagingStudy|Media

}

export class ClinicalImpressionFinding extends BackboneElement {
   @Default('fhir.datatypes.ClinicalImpression.ClinicalImpressionFinding')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public itemCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public itemReference?: FlatConvectorModel<Reference>; //Condition|Observation|Media

   @Validate(yup.string())
   public basis?: string;

}

export class ClinicalImpression extends DomainResource<ClinicalImpression> {
   @Default('fhir.datatypes.ClinicalImpression')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public statusReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public description?: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public effectiveDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public assessor?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => Reference.schema()))
   public previous?: FlatConvectorModel<Reference>; //ClinicalImpression

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public problem?: Array<FlatConvectorModel<Reference>>; //Condition|AllergyIntolerance

   @Validate(yup.lazy(() => yup.array(ClinicalImpressionInvestigation.schema())))
   public investigation?: Array<FlatConvectorModel<ClinicalImpressionInvestigation>>;

   @Validate(yup.array(yup.string()))
   public protocol? : Array<string>;

   @Validate(yup.string())
   public summary?: string;

   @Validate(yup.lazy(() => yup.array(ClinicalImpressionFinding.schema())))
   public finding?: Array<FlatConvectorModel<ClinicalImpressionFinding>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public prognosisCodeableConcept?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public prognosisReference?: Array<FlatConvectorModel<Reference>>; //RiskAssessment

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingInfo?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class CodeSystemFilter extends BackboneElement {
   @Default('fhir.datatypes.CodeSystem.CodeSystemFilter')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.array(yup.string()))
   public operator? : Array<string>;

   @Required()
   @Validate(yup.string())
   public value: string;

}

export class CodeSystemProperty extends BackboneElement {
   @Default('fhir.datatypes.CodeSystem.CodeSystemProperty')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.string())
   public uri?: string;

   @Validate(yup.string())
   public description?: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

}

export class CodeSystemConcept extends BackboneElement {
   @Default('fhir.datatypes.CodeSystem.CodeSystemConcept')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.string())
   public display?: string;

   @Validate(yup.string())
   public definition?: string;

   @Validate(yup.lazy(() => yup.array(CodeSystemConceptDesignation.schema())))
   public designation?: Array<FlatConvectorModel<CodeSystemConceptDesignation>>;

   @Validate(yup.lazy(() => yup.array(CodeSystemConceptProperty.schema())))
   public property?: Array<FlatConvectorModel<CodeSystemConceptProperty>>;

   @Validate(yup.lazy(() => yup.array(CodeSystemConcept.schema())))
   public concept?: Array<FlatConvectorModel<CodeSystemConcept>>;

}

export class CodeSystemConceptDesignation extends BackboneElement {
   @Default('fhir.datatypes.CodeSystem.CodeSystemConceptDesignation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public language?: string;

   @Validate(yup.lazy(() => Coding.schema()))
   public use?: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.string())
   public value: string;

}

export class CodeSystemConceptProperty extends BackboneElement {
   @Default('fhir.datatypes.CodeSystem.CodeSystemConceptProperty')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Required()
   @Validate(yup.string())
   public valueCode: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public valueCoding: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.string())
   public valueString: string;

   @Required()
   @Validate(yup.number())
   public valueInteger: number;

   @Required()
   @Validate(yup.boolean())
   public valueBoolean: boolean;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDateTime: date;

   @Required()
   @Validate(yup.number())
   public valueDecimal: number;

}

export class CodeSystem extends DomainResource<CodeSystem> {
   @Default('fhir.datatypes.CodeSystem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.boolean())
   public caseSensitive?: boolean;

   @Validate(yup.string())
   public valueSet?: string; //ValueSet

   @Validate(yup.string())
   public hierarchyMeaning?: string;

   @Validate(yup.boolean())
   public compositional?: boolean;

   @Validate(yup.boolean())
   public versionNeeded?: boolean;

   @Required()
   @Validate(yup.string())
   public content: string;

   @Validate(yup.string())
   public supplements?: string; //CodeSystem

   @Validate(yup.number())
   public count?: number;

   @Validate(yup.lazy(() => yup.array(CodeSystemFilter.schema())))
   public filter?: Array<FlatConvectorModel<CodeSystemFilter>>;

   @Validate(yup.lazy(() => yup.array(CodeSystemProperty.schema())))
   public property?: Array<FlatConvectorModel<CodeSystemProperty>>;

   @Validate(yup.lazy(() => yup.array(CodeSystemConcept.schema())))
   public concept?: Array<FlatConvectorModel<CodeSystemConcept>>;

}


export class CommunicationPayload extends BackboneElement {
   @Default('fhir.datatypes.Communication.CommunicationPayload')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public contentString: string;

//   @Required()
   @Validate(yup.lazy(() => Attachment.schema()))
   public contentAttachment: FlatConvectorModel<Attachment>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public contentReference: FlatConvectorModel<Reference>; //Any

}

export class Communication extends DomainResource<Communication> {
   @Default('fhir.datatypes.Communication')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public instantiatesCanonical? : Array<string>; //PlanDefinition|ActivityDefinition|Measure|OperationDefinition|Questionnaire

   @Validate(yup.array(yup.string()))
   public instantiatesUri? : Array<string>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public inResponseTo?: Array<FlatConvectorModel<Reference>>; //Communication

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public statusReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public priority?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public medium?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public topic?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public about?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public sent?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public received?: date;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public recipient?: Array<FlatConvectorModel<Reference>>; //Device|Organization|Patient|Practitioner|PractitionerRole|RelatedPerson|Group|CareTeam|HealthcareService

   @Validate(yup.lazy(() => Reference.schema()))
   public sender?: FlatConvectorModel<Reference>; //Device|Organization|Patient|Practitioner|PractitionerRole|RelatedPerson|HealthcareService

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => yup.array(CommunicationPayload.schema())))
   public payload?: Array<FlatConvectorModel<CommunicationPayload>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class CommunicationRequestPayload extends BackboneElement {
   @Default('fhir.datatypes.CommunicationRequest.CommunicationRequestPayload')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public contentString: string;

//   @Required()
   @Validate(yup.lazy(() => Attachment.schema()))
   public contentAttachment: FlatConvectorModel<Attachment>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public contentReference: FlatConvectorModel<Reference>; //Any

}

export class CommunicationRequest extends DomainResource<CommunicationRequest> {
   @Default('fhir.datatypes.CommunicationRequest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public replaces?: Array<FlatConvectorModel<Reference>>; //CommunicationRequest

   @Validate(yup.lazy(() => Identifier.schema()))
   public groupIdentifier?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public statusReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public priority?: string;

   @Validate(yup.boolean())
   public doNotPerform?: boolean;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public medium?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public about?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.lazy(() => yup.array(CommunicationRequestPayload.schema())))
   public payload?: Array<FlatConvectorModel<CommunicationRequestPayload>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public occurrenceDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public occurrencePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public authoredOn?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public requester?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|Patient|RelatedPerson|Device

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public recipient?: Array<FlatConvectorModel<Reference>>; //Device|Organization|Patient|Practitioner|PractitionerRole|RelatedPerson|Group|CareTeam|HealthcareService

   @Validate(yup.lazy(() => Reference.schema()))
   public sender?: FlatConvectorModel<Reference>; //Device|Organization|Patient|Practitioner|PractitionerRole|RelatedPerson|HealthcareService

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class CompartmentDefinitionResource extends BackboneElement {
   @Default('fhir.datatypes.CompartmentDefinition.CompartmentDefinitionResource')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.array(yup.string()))
   public param? : Array<string>;

   @Validate(yup.string())
   public documentation?: string;

}

export class CompartmentDefinition extends DomainResource<CompartmentDefinition> {
   @Default('fhir.datatypes.CompartmentDefinition')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public url: string;

   @Validate(yup.string())
   public version?: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.string())
   public purpose?: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Required()
   @Validate(yup.boolean())
   public search: boolean;

   @Validate(yup.lazy(() => yup.array(CompartmentDefinitionResource.schema())))
   public resource?: Array<FlatConvectorModel<CompartmentDefinitionResource>>;

}


export class CompositionAttester extends BackboneElement {
   @Default('fhir.datatypes.Composition.CompositionAttester')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public mode: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public time?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public party?: FlatConvectorModel<Reference>; //Patient|RelatedPerson|Practitioner|PractitionerRole|Organization

}

export class CompositionRelatesTo extends BackboneElement {
   @Default('fhir.datatypes.Composition.CompositionRelatesTo')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Required()
   @Validate(yup.lazy(() => Identifier.schema()))
   public targetIdentifier: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public targetReference: FlatConvectorModel<Reference>; //Composition

}

export class CompositionEvent extends BackboneElement {
   @Default('fhir.datatypes.Composition.CompositionEvent')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public code?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public detail?: Array<FlatConvectorModel<Reference>>; //Any

}

export class CompositionSection extends BackboneElement {
   @Default('fhir.datatypes.Composition.CompositionSection')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public author?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Device|Patient|RelatedPerson|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public focus?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => Narrative.schema()))
   public text?: FlatConvectorModel<Narrative>;

   @Validate(yup.string())
   public mode?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public orderedBy?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public entry?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public emptyReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CompositionSection.schema())))
   public section?: Array<FlatConvectorModel<CompositionSection>>;

}

export class Composition extends DomainResource<Composition> {
   @Default('fhir.datatypes.Composition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date: date;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public author?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Device|Patient|RelatedPerson|Organization

   @Required()
   @Validate(yup.string())
   public title: string;

   @Validate(yup.string())
   public confidentiality?: string;

   @Validate(yup.lazy(() => yup.array(CompositionAttester.schema())))
   public attester?: Array<FlatConvectorModel<CompositionAttester>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public custodian?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(CompositionRelatesTo.schema())))
   public relatesTo?: Array<FlatConvectorModel<CompositionRelatesTo>>;

   @Validate(yup.lazy(() => yup.array(CompositionEvent.schema())))
   public event?: Array<FlatConvectorModel<CompositionEvent>>;

   @Validate(yup.lazy(() => yup.array(CompositionSection.schema())))
   public section?: Array<FlatConvectorModel<CompositionSection>>;

}


export class ConceptMapGroup extends BackboneElement {
   @Default('fhir.datatypes.ConceptMap.ConceptMapGroup')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public source?: string;

   @Validate(yup.string())
   public sourceVersion?: string;

   @Validate(yup.string())
   public target?: string;

   @Validate(yup.string())
   public targetVersion?: string;

   @Validate(yup.lazy(() => yup.array(ConceptMapGroupElement.schema())))
   public element?: Array<FlatConvectorModel<ConceptMapGroupElement>>;

   @Validate(yup.lazy(() => ConceptMapGroupUnmapped.schema()))
   public unmapped?: FlatConvectorModel<ConceptMapGroupUnmapped>;

}

export class ConceptMapGroupElement extends BackboneElement {
   @Default('fhir.datatypes.ConceptMap.ConceptMapGroupElement')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public code?: string;

   @Validate(yup.string())
   public display?: string;

   @Validate(yup.lazy(() => yup.array(ConceptMapGroupElementTarget.schema())))
   public target?: Array<FlatConvectorModel<ConceptMapGroupElementTarget>>;

}

export class ConceptMapGroupElementTarget extends BackboneElement {
   @Default('fhir.datatypes.ConceptMap.ConceptMapGroupElementTarget')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public code?: string;

   @Validate(yup.string())
   public display?: string;

   @Required()
   @Validate(yup.string())
   public equivalence: string;

   @Validate(yup.string())
   public comment?: string;

   @Validate(yup.lazy(() => yup.array(ConceptMapGroupElementTargetDependsOn.schema())))
   public dependsOn?: Array<FlatConvectorModel<ConceptMapGroupElementTargetDependsOn>>;

   @Validate(yup.lazy(() => yup.array(ConceptMapGroupElementTargetDependsOn.schema())))
   public product?: Array<FlatConvectorModel<ConceptMapGroupElementTargetDependsOn>>;

}

export class ConceptMapGroupElementTargetDependsOn extends BackboneElement {
   @Default('fhir.datatypes.ConceptMap.ConceptMapGroupElementTargetDependsOn')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public property: string;

   @Validate(yup.string())
   public system?: string; //CodeSystem

   @Required()
   @Validate(yup.string())
   public value: string;

   @Validate(yup.string())
   public display?: string;

}

export class ConceptMapGroupUnmapped extends BackboneElement {
   @Default('fhir.datatypes.ConceptMap.ConceptMapGroupUnmapped')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public mode: string;

   @Validate(yup.string())
   public code?: string;

   @Validate(yup.string())
   public display?: string;

   @Validate(yup.string())
   public url?: string; //ConceptMap

}

export class ConceptMap extends DomainResource<ConceptMap> {
   @Default('fhir.datatypes.ConceptMap')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string())
   public sourceUri?: string;

   @Validate(yup.string())
   public sourceCanonical?: string; //ValueSet

   @Validate(yup.string())
   public targetUri?: string;

   @Validate(yup.string())
   public targetCanonical?: string; //ValueSet

   @Validate(yup.lazy(() => yup.array(ConceptMapGroup.schema())))
   public group?: Array<FlatConvectorModel<ConceptMapGroup>>;

}


export class ConditionStage extends BackboneElement {
   @Default('fhir.datatypes.Condition.ConditionStage')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public summary?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public assessment?: Array<FlatConvectorModel<Reference>>; //ClinicalImpression|DiagnosticReport|Observation

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

}

export class ConditionEvidence extends BackboneElement {
   @Default('fhir.datatypes.Condition.ConditionEvidence')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public code?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public detail?: Array<FlatConvectorModel<Reference>>; //Any

}

export class Condition extends DomainResource<Condition> {
   @Default('fhir.datatypes.Condition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public clinicalStatus?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public verificationStatus?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public severity?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public bodySite?: Array<FlatConvectorModel<CodeableConcept>>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public onsetDateTime?: date;

   @Validate(yup.lazy(() => Age.schema()))
   public onsetAge?: FlatConvectorModel<Age>;

   @Validate(yup.lazy(() => Period.schema()))
   public onsetPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Range.schema()))
   public onsetRange?: FlatConvectorModel<Range>;

   @Validate(yup.string())
   public onsetString?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public abatementDateTime?: date;

   @Validate(yup.lazy(() => Age.schema()))
   public abatementAge?: FlatConvectorModel<Age>;

   @Validate(yup.lazy(() => Period.schema()))
   public abatementPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Range.schema()))
   public abatementRange?: FlatConvectorModel<Range>;

   @Validate(yup.string())
   public abatementString?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public recordedDate?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public recorder?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Patient|RelatedPerson

   @Validate(yup.lazy(() => Reference.schema()))
   public asserter?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Patient|RelatedPerson

   @Validate(yup.lazy(() => yup.array(ConditionStage.schema())))
   public stage?: Array<FlatConvectorModel<ConditionStage>>;

   @Validate(yup.lazy(() => yup.array(ConditionEvidence.schema())))
   public evidence?: Array<FlatConvectorModel<ConditionEvidence>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class ConsentPolicy extends BackboneElement {
   @Default('fhir.datatypes.Consent.ConsentPolicy')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public authority?: string;

   @Validate(yup.string())
   public uri?: string;

}

export class ConsentVerification extends BackboneElement {
   @Default('fhir.datatypes.Consent.ConsentVerification')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.boolean())
   public verified: boolean;

   @Validate(yup.lazy(() => Reference.schema()))
   public verifiedWith?: FlatConvectorModel<Reference>; //Patient|RelatedPerson

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public verificationDate?: date;

}

export class ConsentProvision extends BackboneElement {
   @Default('fhir.datatypes.Consent.ConsentProvision')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public type_?: string;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(ConsentProvisionActor.schema())))
   public actor?: Array<FlatConvectorModel<ConsentProvisionActor>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public action?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public securityLabel?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public purpose?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public class_?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public code?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Period.schema()))
   public dataPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(ConsentProvisionData.schema())))
   public data?: Array<FlatConvectorModel<ConsentProvisionData>>;

   @Validate(yup.lazy(() => yup.array(ConsentProvision.schema())))
   public provision?: Array<FlatConvectorModel<ConsentProvision>>;

}

export class ConsentProvisionActor extends BackboneElement {
   @Default('fhir.datatypes.Consent.ConsentProvisionActor')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public role: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public reference: FlatConvectorModel<Reference>; //Device|Group|CareTeam|Organization|Patient|Practitioner|RelatedPerson|PractitionerRole

}

export class ConsentProvisionData extends BackboneElement {
   @Default('fhir.datatypes.Consent.ConsentProvisionData')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public meaning: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public reference: FlatConvectorModel<Reference>; //Any

}

export class Consent extends DomainResource<Consent> {
   @Default('fhir.datatypes.Consent')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public scope: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public patient?: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public dateTime?: date;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public performer?: Array<FlatConvectorModel<Reference>>; //Organization|Patient|Practitioner|RelatedPerson|PractitionerRole

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public organization?: Array<FlatConvectorModel<Reference>>; //Organization

//   @Validate(yup.lazy(() => Attachment.schema()))
   public sourceAttachment?: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => Reference.schema()))
   public sourceReference?: FlatConvectorModel<Reference>; //Consent|DocumentReference|Contract|QuestionnaireResponse

   @Validate(yup.lazy(() => yup.array(ConsentPolicy.schema())))
   public policy?: Array<FlatConvectorModel<ConsentPolicy>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public policyRule?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(ConsentVerification.schema())))
   public verification?: Array<FlatConvectorModel<ConsentVerification>>;

   @Validate(yup.lazy(() => ConsentProvision.schema()))
   public provision?: FlatConvectorModel<ConsentProvision>;

}


export class ContactDetail extends DomainResource<ContactDetail> {
   @Default('fhir.datatypes.ContactDetail')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

}


export class ContractContentDefinition extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractContentDefinition')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public publisher?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public publicationDate?: date;

   @Required()
   @Validate(yup.string())
   public publicationStatus: string;

   @Validate(yup.string())
   public copyright?: string;

}

export class ContractTerm extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractTerm')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public issued?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public applies?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public topicCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public topicReference?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public text?: string;

   @Validate(yup.lazy(() => yup.array(ContractTermSecurityLabel.schema())))
   public securityLabel?: Array<FlatConvectorModel<ContractTermSecurityLabel>>;

   @Required()
   @Validate(yup.lazy(() => ContractTermOffer.schema()))
   public offer: FlatConvectorModel<ContractTermOffer>;

   @Validate(yup.lazy(() => yup.array(ContractTermAsset.schema())))
   public asset?: Array<FlatConvectorModel<ContractTermAsset>>;

   @Validate(yup.lazy(() => yup.array(ContractTermAction.schema())))
   public action?: Array<FlatConvectorModel<ContractTermAction>>;

   @Validate(yup.lazy(() => yup.array(ContractTerm.schema())))
   public group?: Array<FlatConvectorModel<ContractTerm>>;

}

export class ContractTermSecurityLabel extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractTermSecurityLabel')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.number()))
   public number? : Array<number>;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public classification: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public category?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public control?: Array<FlatConvectorModel<Coding>>;

}

export class ContractTermOffer extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractTermOffer')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(ContractTermOfferParty.schema())))
   public party?: Array<FlatConvectorModel<ContractTermOfferParty>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public topic?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public decision?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public decisionMode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContractTermOfferAnswer.schema())))
   public answer?: Array<FlatConvectorModel<ContractTermOfferAnswer>>;

   @Validate(yup.string())
   public text?: string;

   @Validate(yup.array(yup.string()))
   public linkId? : Array<string>;

   @Validate(yup.array(yup.number()))
   public securityLabelNumber? : Array<number>;

}

export class ContractTermOfferParty extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractTermOfferParty')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reference?: Array<FlatConvectorModel<Reference>>; //Patient|RelatedPerson|Practitioner|PractitionerRole|Device|Group|Organization

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public role: FlatConvectorModel<CodeableConcept>;

}

export class ContractTermOfferAnswer extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractTermOfferAnswer')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.boolean())
   public valueBoolean: boolean;

   @Required()
   @Validate(yup.number())
   public valueDecimal: number;

   @Required()
   @Validate(yup.number())
   public valueInteger: number;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDate: date;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDateTime: date;

   @Required()
   @Validate(yup.string())
   public valueTime: string;

   @Required()
   @Validate(yup.string())
   public valueString: string;

   @Required()
   @Validate(yup.string())
   public valueUri: string;

//   @Required()
   @Validate(yup.lazy(() => Attachment.schema()))
   public valueAttachment: FlatConvectorModel<Attachment>;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public valueCoding: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity: FlatConvectorModel<Quantity>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public valueReference: FlatConvectorModel<Reference>; //Any

}

export class ContractTermAsset extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractTermAsset')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public scope?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public typeReference?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public subtype?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Coding.schema()))
   public relationship?: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => yup.array(ContractTermAssetContext.schema())))
   public context?: Array<FlatConvectorModel<ContractTermAssetContext>>;

   @Validate(yup.string())
   public condition?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public periodType?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Period.schema())))
   public period?: Array<FlatConvectorModel<Period>>;

   @Validate(yup.lazy(() => yup.array(Period.schema())))
   public usePeriod?: Array<FlatConvectorModel<Period>>;

   @Validate(yup.string())
   public text?: string;

   @Validate(yup.array(yup.string()))
   public linkId? : Array<string>;

   @Validate(yup.lazy(() => yup.array(ContractTermOfferAnswer.schema())))
   public answer?: Array<FlatConvectorModel<ContractTermOfferAnswer>>;

   @Validate(yup.array(yup.number()))
   public securityLabelNumber? : Array<number>;

   @Validate(yup.lazy(() => yup.array(ContractTermAssetValuedItem.schema())))
   public valuedItem?: Array<FlatConvectorModel<ContractTermAssetValuedItem>>;

}

export class ContractTermAssetContext extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractTermAssetContext')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public reference?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public code?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public text?: string;

}

export class ContractTermAssetValuedItem extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractTermAssetValuedItem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public entityCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public entityReference?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public effectiveTime?: date;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.number())
   public factor?: number;

   @Validate(yup.number())
   public points?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public net?: FlatConvectorModel<Money>;

   @Validate(yup.string())
   public payment?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public paymentDate?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public responsible?: FlatConvectorModel<Reference>; //Organization|Patient|Practitioner|PractitionerRole|RelatedPerson

   @Validate(yup.lazy(() => Reference.schema()))
   public recipient?: FlatConvectorModel<Reference>; //Organization|Patient|Practitioner|PractitionerRole|RelatedPerson

   @Validate(yup.array(yup.string()))
   public linkId? : Array<string>;

   @Validate(yup.array(yup.number()))
   public securityLabelNumber? : Array<number>;

}

export class ContractTermAction extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractTermAction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.boolean())
   public doNotPerform?: boolean;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(ContractTermActionSubject.schema())))
   public subject?: Array<FlatConvectorModel<ContractTermActionSubject>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public intent: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.array(yup.string()))
   public linkId? : Array<string>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public status: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public context?: FlatConvectorModel<Reference>; //Encounter|EpisodeOfCare

   @Validate(yup.array(yup.string()))
   public contextLinkId? : Array<string>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public occurrenceDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public occurrencePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Timing.schema()))
   public occurrenceTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public requester?: Array<FlatConvectorModel<Reference>>; //Patient|RelatedPerson|Practitioner|PractitionerRole|Device|Group|Organization

   @Validate(yup.array(yup.string()))
   public requesterLinkId? : Array<string>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public performerType?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public performerRole?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public performer?: FlatConvectorModel<Reference>; //RelatedPerson|Patient|Practitioner|PractitionerRole|CareTeam|Device|Substance|Organization|Location

   @Validate(yup.array(yup.string()))
   public performerLinkId? : Array<string>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport|DocumentReference|Questionnaire|QuestionnaireResponse

   @Validate(yup.array(yup.string()))
   public reason? : Array<string>;

   @Validate(yup.array(yup.string()))
   public reasonLinkId? : Array<string>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.array(yup.number()))
   public securityLabelNumber? : Array<number>;

}

export class ContractTermActionSubject extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractTermActionSubject')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reference?: Array<FlatConvectorModel<Reference>>; //Patient|RelatedPerson|Practitioner|PractitionerRole|Device|Group|Organization

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public role?: FlatConvectorModel<CodeableConcept>;

}

export class ContractSigner extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractSigner')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public type_: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public party: FlatConvectorModel<Reference>; //Organization|Patient|Practitioner|PractitionerRole|RelatedPerson

   @Validate(yup.lazy(() => yup.array(Signature.schema())))
   public signature?: Array<FlatConvectorModel<Signature>>;

}

export class ContractFriendly extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractFriendly')
   @ReadOnly()
   public readonly type: string;

//   @Required()
   @Validate(yup.lazy(() => Attachment.schema()))
   public contentAttachment: FlatConvectorModel<Attachment>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public contentReference: FlatConvectorModel<Reference>; //Composition|DocumentReference|QuestionnaireResponse

}

export class ContractLegal extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractLegal')
   @ReadOnly()
   public readonly type: string;

//   @Required()
   @Validate(yup.lazy(() => Attachment.schema()))
   public contentAttachment: FlatConvectorModel<Attachment>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public contentReference: FlatConvectorModel<Reference>; //Composition|DocumentReference|QuestionnaireResponse

}

export class ContractRule extends BackboneElement {
   @Default('fhir.datatypes.Contract.ContractRule')
   @ReadOnly()
   public readonly type: string;

//   @Required()
   @Validate(yup.lazy(() => Attachment.schema()))
   public contentAttachment: FlatConvectorModel<Attachment>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public contentReference: FlatConvectorModel<Reference>; //DocumentReference

}

export class Contract extends DomainResource<Contract> {
   @Default('fhir.datatypes.Contract')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public legalState?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public instantiatesCanonical?: FlatConvectorModel<Reference>; //Contract

   @Validate(yup.string())
   public instantiatesUri?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public contentDerivative?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public issued?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public applies?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public expirationType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public subject?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public authority?: Array<FlatConvectorModel<Reference>>; //Organization

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public domain?: Array<FlatConvectorModel<Reference>>; //Location

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public site?: Array<FlatConvectorModel<Reference>>; //Location

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public subtitle?: string;

   @Validate(yup.array(yup.string()))
   public alias? : Array<string>;

   @Validate(yup.lazy(() => Reference.schema()))
   public author?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public scope?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public topicCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public topicReference?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public subType?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => ContractContentDefinition.schema()))
   public contentDefinition?: FlatConvectorModel<ContractContentDefinition>;

   @Validate(yup.lazy(() => yup.array(ContractTerm.schema())))
   public term?: Array<FlatConvectorModel<ContractTerm>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingInfo?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public relevantHistory?: Array<FlatConvectorModel<Reference>>; //Provenance

   @Validate(yup.lazy(() => yup.array(ContractSigner.schema())))
   public signer?: Array<FlatConvectorModel<ContractSigner>>;

   @Validate(yup.lazy(() => yup.array(ContractFriendly.schema())))
   public friendly?: Array<FlatConvectorModel<ContractFriendly>>;

   @Validate(yup.lazy(() => yup.array(ContractLegal.schema())))
   public legal?: Array<FlatConvectorModel<ContractLegal>>;

   @Validate(yup.lazy(() => yup.array(ContractRule.schema())))
   public rule?: Array<FlatConvectorModel<ContractRule>>;

//   @Validate(yup.lazy(() => Attachment.schema()))
   public legallyBindingAttachment?: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => Reference.schema()))
   public legallyBindingReference?: FlatConvectorModel<Reference>; //Composition|DocumentReference|QuestionnaireResponse|Contract

}


export class Contributor extends DomainResource<Contributor> {
   @Default('fhir.datatypes.Contributor')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

}


export class Count extends DomainResource<Count> {
   @Default('fhir.datatypes.Count')
   @ReadOnly()
   public readonly type: string;

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


export class CoverageEligibilityRequestSupportingInfo extends BackboneElement {
   @Default('fhir.datatypes.CoverageEligibilityRequest.CoverageEligibilityRequestSupportingInfo')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public sequence: number;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public information: FlatConvectorModel<Reference>; //Any

   @Validate(yup.boolean())
   public appliesToAll?: boolean;

}

export class CoverageEligibilityRequestInsurance extends BackboneElement {
   @Default('fhir.datatypes.CoverageEligibilityRequest.CoverageEligibilityRequestInsurance')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.boolean())
   public focal?: boolean;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public coverage: FlatConvectorModel<Reference>; //Coverage

   @Validate(yup.string())
   public businessArrangement?: string;

}

export class CoverageEligibilityRequestItem extends BackboneElement {
   @Default('fhir.datatypes.CoverageEligibilityRequest.CoverageEligibilityRequestItem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.number()))
   public supportingInfoSequence? : Array<number>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public provider?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Money.schema()))
   public unitPrice?: FlatConvectorModel<Money>;

   @Validate(yup.lazy(() => Reference.schema()))
   public facility?: FlatConvectorModel<Reference>; //Location|Organization

   @Validate(yup.lazy(() => yup.array(CoverageEligibilityRequestItemDiagnosis.schema())))
   public diagnosis?: Array<FlatConvectorModel<CoverageEligibilityRequestItemDiagnosis>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public detail?: Array<FlatConvectorModel<Reference>>; //Any

}

export class CoverageEligibilityRequestItemDiagnosis extends BackboneElement {
   @Default('fhir.datatypes.CoverageEligibilityRequest.CoverageEligibilityRequestItemDiagnosis')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public diagnosisCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public diagnosisReference?: FlatConvectorModel<Reference>; //Condition

}

export class CoverageEligibilityRequest extends DomainResource<CoverageEligibilityRequest> {
   @Default('fhir.datatypes.CoverageEligibilityRequest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public priority?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.array(yup.string()))
   public purpose? : Array<string>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public servicedDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public servicedPeriod?: FlatConvectorModel<Period>;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public enterer?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => Reference.schema()))
   public provider?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public insurer: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public facility?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => yup.array(CoverageEligibilityRequestSupportingInfo.schema())))
   public supportingInfo?: Array<FlatConvectorModel<CoverageEligibilityRequestSupportingInfo>>;

   @Validate(yup.lazy(() => yup.array(CoverageEligibilityRequestInsurance.schema())))
   public insurance?: Array<FlatConvectorModel<CoverageEligibilityRequestInsurance>>;

   @Validate(yup.lazy(() => yup.array(CoverageEligibilityRequestItem.schema())))
   public item?: Array<FlatConvectorModel<CoverageEligibilityRequestItem>>;

}


export class CoverageEligibilityResponseInsurance extends BackboneElement {
   @Default('fhir.datatypes.CoverageEligibilityResponse.CoverageEligibilityResponseInsurance')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public coverage: FlatConvectorModel<Reference>; //Coverage

   @Validate(yup.boolean())
   public inforce?: boolean;

   @Validate(yup.lazy(() => Period.schema()))
   public benefitPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CoverageEligibilityResponseInsuranceItem.schema())))
   public item?: Array<FlatConvectorModel<CoverageEligibilityResponseInsuranceItem>>;

}

export class CoverageEligibilityResponseInsuranceItem extends BackboneElement {
   @Default('fhir.datatypes.CoverageEligibilityResponse.CoverageEligibilityResponseInsuranceItem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public productOrService?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public modifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public provider?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

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

   @Validate(yup.lazy(() => yup.array(CoverageEligibilityResponseInsuranceItemBenefit.schema())))
   public benefit?: Array<FlatConvectorModel<CoverageEligibilityResponseInsuranceItemBenefit>>;

   @Validate(yup.boolean())
   public authorizationRequired?: boolean;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public authorizationSupporting?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public authorizationUrl?: string;

}

export class CoverageEligibilityResponseInsuranceItemBenefit extends BackboneElement {
   @Default('fhir.datatypes.CoverageEligibilityResponse.CoverageEligibilityResponseInsuranceItemBenefit')
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

   @Validate(yup.string())
   public usedString?: string;

   @Validate(yup.lazy(() => Money.schema()))
   public usedMoney?: FlatConvectorModel<Money>;

}

export class CoverageEligibilityResponseError extends BackboneElement {
   @Default('fhir.datatypes.CoverageEligibilityResponse.CoverageEligibilityResponseError')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

}

export class CoverageEligibilityResponse extends DomainResource<CoverageEligibilityResponse> {
   @Default('fhir.datatypes.CoverageEligibilityResponse')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.array(yup.string()))
   public purpose? : Array<string>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public servicedDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public servicedPeriod?: FlatConvectorModel<Period>;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public requestor?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public request: FlatConvectorModel<Reference>; //CoverageEligibilityRequest

   @Required()
   @Validate(yup.string())
   public outcome: string;

   @Validate(yup.string())
   public disposition?: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public insurer: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(CoverageEligibilityResponseInsurance.schema())))
   public insurance?: Array<FlatConvectorModel<CoverageEligibilityResponseInsurance>>;

   @Validate(yup.string())
   public preAuthRef?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public form?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CoverageEligibilityResponseError.schema())))
   public error?: Array<FlatConvectorModel<CoverageEligibilityResponseError>>;

}


export class DataRequirementCodeFilter extends BackboneElement {
   @Default('fhir.datatypes.DataRequirement.DataRequirementCodeFilter')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public path?: string;

   @Validate(yup.string())
   public searchParam?: string;

   @Validate(yup.string())
   public valueSet?: string; //ValueSet

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public code?: Array<FlatConvectorModel<Coding>>;

}

export class DataRequirementDateFilter extends BackboneElement {
   @Default('fhir.datatypes.DataRequirement.DataRequirementDateFilter')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public path?: string;

   @Validate(yup.string())
   public searchParam?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public valuePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Duration.schema()))
   public valueDuration?: FlatConvectorModel<Duration>;

}

export class DataRequirementSort extends BackboneElement {
   @Default('fhir.datatypes.DataRequirement.DataRequirementSort')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public path: string;

   @Required()
   @Validate(yup.string())
   public direction: string;

}

export class DataRequirement extends DomainResource<DataRequirement> {
   @Default('fhir.datatypes.DataRequirement')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.array(yup.string()))
   public profile? : Array<string>; //StructureDefinition

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subjectCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subjectReference?: FlatConvectorModel<Reference>; //Group

   @Validate(yup.array(yup.string()))
   public mustSupport? : Array<string>;

   @Validate(yup.lazy(() => yup.array(DataRequirementCodeFilter.schema())))
   public codeFilter?: Array<FlatConvectorModel<DataRequirementCodeFilter>>;

   @Validate(yup.lazy(() => yup.array(DataRequirementDateFilter.schema())))
   public dateFilter?: Array<FlatConvectorModel<DataRequirementDateFilter>>;

   @Validate(yup.number())
   public limit?: number;

   @Validate(yup.lazy(() => yup.array(DataRequirementSort.schema())))
   public sort?: Array<FlatConvectorModel<DataRequirementSort>>;

}


export class DetectedIssueEvidence extends BackboneElement {
   @Default('fhir.datatypes.DetectedIssue.DetectedIssueEvidence')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public code?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public detail?: Array<FlatConvectorModel<Reference>>; //Any

}

export class DetectedIssueMitigation extends BackboneElement {
   @Default('fhir.datatypes.DetectedIssue.DetectedIssueMitigation')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public action: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public author?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

}

export class DetectedIssue extends DomainResource<DetectedIssue> {
   @Default('fhir.datatypes.DetectedIssue')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public severity?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public patient?: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public identifiedDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public identifiedPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Reference.schema()))
   public author?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Device

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public implicated?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(DetectedIssueEvidence.schema())))
   public evidence?: Array<FlatConvectorModel<DetectedIssueEvidence>>;

   @Validate(yup.string())
   public detail?: string;

   @Validate(yup.string())
   public reference?: string;

   @Validate(yup.lazy(() => yup.array(DetectedIssueMitigation.schema())))
   public mitigation?: Array<FlatConvectorModel<DetectedIssueMitigation>>;

}


export class DeviceUdiCarrier extends BackboneElement {
   @Default('fhir.datatypes.Device.DeviceUdiCarrier')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public deviceIdentifier?: string;

   @Validate(yup.string())
   public issuer?: string;

   @Validate(yup.string())
   public jurisdiction?: string;

   @Validate(yup.string())
   public carrierAIDC?: string;

   @Validate(yup.string())
   public carrierHRF?: string;

   @Validate(yup.string())
   public entryType?: string;

}

export class DeviceDeviceName extends BackboneElement {
   @Default('fhir.datatypes.Device.DeviceDeviceName')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

}

export class DeviceSpecialization extends BackboneElement {
   @Default('fhir.datatypes.Device.DeviceSpecialization')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public systemType: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public version?: string;

}

export class DeviceVersion extends BackboneElement {
   @Default('fhir.datatypes.Device.DeviceVersion')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public component?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.string())
   public value: string;

}

export class DeviceProperty extends BackboneElement {
   @Default('fhir.datatypes.Device.DeviceProperty')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Quantity.schema())))
   public valueQuantity?: Array<FlatConvectorModel<Quantity>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public valueCode?: Array<FlatConvectorModel<CodeableConcept>>;

}

export class Device extends DomainResource<Device> {
   @Default('fhir.datatypes.Device')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public definition?: FlatConvectorModel<Reference>; //DeviceDefinition

   @Validate(yup.lazy(() => yup.array(DeviceUdiCarrier.schema())))
   public udiCarrier?: Array<FlatConvectorModel<DeviceUdiCarrier>>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public statusReason?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public distinctIdentifier?: string;

   @Validate(yup.string())
   public manufacturer?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public manufactureDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public expirationDate?: date;

   @Validate(yup.string())
   public lotNumber?: string;

   @Validate(yup.string())
   public serialNumber?: string;

   @Validate(yup.lazy(() => yup.array(DeviceDeviceName.schema())))
   public deviceName?: Array<FlatConvectorModel<DeviceDeviceName>>;

   @Validate(yup.string())
   public modelNumber?: string;

   @Validate(yup.string())
   public partNumber?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(DeviceSpecialization.schema())))
   public specialization?: Array<FlatConvectorModel<DeviceSpecialization>>;

   @Validate(yup.lazy(() => yup.array(DeviceVersion.schema())))
   public version?: Array<FlatConvectorModel<DeviceVersion>>;

   @Validate(yup.lazy(() => yup.array(DeviceProperty.schema())))
   public property?: Array<FlatConvectorModel<DeviceProperty>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public patient?: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => Reference.schema()))
   public owner?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public contact?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public location?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public safety?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public parent?: FlatConvectorModel<Reference>; //Device

}


export class DeviceDefinitionUdiDeviceIdentifier extends BackboneElement {
   @Default('fhir.datatypes.DeviceDefinition.DeviceDefinitionUdiDeviceIdentifier')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public deviceIdentifier: string;

   @Required()
   @Validate(yup.string())
   public issuer: string;

   @Required()
   @Validate(yup.string())
   public jurisdiction: string;

}

export class DeviceDefinitionDeviceName extends BackboneElement {
   @Default('fhir.datatypes.DeviceDefinition.DeviceDefinitionDeviceName')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

}

export class DeviceDefinitionSpecialization extends BackboneElement {
   @Default('fhir.datatypes.DeviceDefinition.DeviceDefinitionSpecialization')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public systemType: string;

   @Validate(yup.string())
   public version?: string;

}

export class DeviceDefinitionCapability extends BackboneElement {
   @Default('fhir.datatypes.DeviceDefinition.DeviceDefinitionCapability')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public description?: Array<FlatConvectorModel<CodeableConcept>>;

}

export class DeviceDefinitionProperty extends BackboneElement {
   @Default('fhir.datatypes.DeviceDefinition.DeviceDefinitionProperty')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Quantity.schema())))
   public valueQuantity?: Array<FlatConvectorModel<Quantity>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public valueCode?: Array<FlatConvectorModel<CodeableConcept>>;

}

export class DeviceDefinitionMaterial extends BackboneElement {
   @Default('fhir.datatypes.DeviceDefinition.DeviceDefinitionMaterial')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public substance: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public alternate?: boolean;

   @Validate(yup.boolean())
   public allergenicIndicator?: boolean;

}

export class DeviceDefinition extends DomainResource<DeviceDefinition> {
   @Default('fhir.datatypes.DeviceDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(DeviceDefinitionUdiDeviceIdentifier.schema())))
   public udiDeviceIdentifier?: Array<FlatConvectorModel<DeviceDefinitionUdiDeviceIdentifier>>;

   @Validate(yup.string())
   public manufacturerString?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public manufacturerReference?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(DeviceDefinitionDeviceName.schema())))
   public deviceName?: Array<FlatConvectorModel<DeviceDefinitionDeviceName>>;

   @Validate(yup.string())
   public modelNumber?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(DeviceDefinitionSpecialization.schema())))
   public specialization?: Array<FlatConvectorModel<DeviceDefinitionSpecialization>>;

   @Validate(yup.array(yup.string()))
   public version? : Array<string>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public safety?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ProductShelfLife.schema())))
   public shelfLifeStorage?: Array<FlatConvectorModel<ProductShelfLife>>;

   @Validate(yup.lazy(() => ProdCharacteristic.schema()))
   public physicalCharacteristics?: FlatConvectorModel<ProdCharacteristic>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public languageCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(DeviceDefinitionCapability.schema())))
   public capability?: Array<FlatConvectorModel<DeviceDefinitionCapability>>;

   @Validate(yup.lazy(() => yup.array(DeviceDefinitionProperty.schema())))
   public property?: Array<FlatConvectorModel<DeviceDefinitionProperty>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public owner?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public contact?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.string())
   public onlineInformation?: string;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public quantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Reference.schema()))
   public parentDevice?: FlatConvectorModel<Reference>; //DeviceDefinition

   @Validate(yup.lazy(() => yup.array(DeviceDefinitionMaterial.schema())))
   public material?: Array<FlatConvectorModel<DeviceDefinitionMaterial>>;

}


export class DeviceMetricCalibration extends BackboneElement {
   @Default('fhir.datatypes.DeviceMetric.DeviceMetricCalibration')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public type_?: string;

   @Validate(yup.string())
   public state?: string;

   @Validate(yup.string())
   public time?: string;

}

export class DeviceMetric extends DomainResource<DeviceMetric> {
   @Default('fhir.datatypes.DeviceMetric')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public unit?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public source?: FlatConvectorModel<Reference>; //Device

   @Validate(yup.lazy(() => Reference.schema()))
   public parent?: FlatConvectorModel<Reference>; //Device

   @Validate(yup.string())
   public operationalStatus?: string;

   @Validate(yup.string())
   public color?: string;

   @Required()
   @Validate(yup.string())
   public category: string;

   @Validate(yup.lazy(() => Timing.schema()))
   public measurementPeriod?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => yup.array(DeviceMetricCalibration.schema())))
   public calibration?: Array<FlatConvectorModel<DeviceMetricCalibration>>;

}


export class DeviceRequestParameter extends BackboneElement {
   @Default('fhir.datatypes.DeviceRequest.DeviceRequestParameter')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public valueCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Range.schema()))
   public valueRange?: FlatConvectorModel<Range>;

   @Validate(yup.boolean())
   public valueBoolean?: boolean;

}

export class DeviceRequest extends DomainResource<DeviceRequest> {
   @Default('fhir.datatypes.DeviceRequest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public instantiatesCanonical? : Array<string>; //ActivityDefinition|PlanDefinition

   @Validate(yup.array(yup.string()))
   public instantiatesUri? : Array<string>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public priorRequest?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => Identifier.schema()))
   public groupIdentifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public status?: string;

   @Required()
   @Validate(yup.string())
   public intent: string;

   @Validate(yup.string())
   public priority?: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public codeReference: FlatConvectorModel<Reference>; //Device

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public codeCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(DeviceRequestParameter.schema())))
   public parameter?: Array<FlatConvectorModel<DeviceRequestParameter>>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group|Location|Device

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public occurrenceDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public occurrencePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Timing.schema()))
   public occurrenceTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public authoredOn?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public requester?: FlatConvectorModel<Reference>; //Device|Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public performerType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public performer?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|CareTeam|HealthcareService|Patient|Device|RelatedPerson

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public insurance?: Array<FlatConvectorModel<Reference>>; //Coverage|ClaimResponse

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingInfo?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public relevantHistory?: Array<FlatConvectorModel<Reference>>; //Provenance

}


export class DeviceUseStatement extends DomainResource<DeviceUseStatement> {
   @Default('fhir.datatypes.DeviceUseStatement')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //ServiceRequest

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public derivedFrom?: Array<FlatConvectorModel<Reference>>; //ServiceRequest|Procedure|Claim|Observation|QuestionnaireResponse|DocumentReference

   @Validate(yup.lazy(() => Timing.schema()))
   public timingTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => Period.schema()))
   public timingPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timingDateTime?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public recordedOn?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public source?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|RelatedPerson

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public device: FlatConvectorModel<Reference>; //Device

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport|DocumentReference|Media

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public bodySite?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class DiagnosticReportMedia extends BackboneElement {
   @Default('fhir.datatypes.DiagnosticReport.DiagnosticReportMedia')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public comment?: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public link: FlatConvectorModel<Reference>; //Media

}

export class DiagnosticReport extends DomainResource<DiagnosticReport> {
   @Default('fhir.datatypes.DiagnosticReport')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //CarePlan|ImmunizationRecommendation|MedicationRequest|NutritionOrder|ServiceRequest

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group|Device|Location

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public effectiveDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string())
   public issued?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public performer?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Organization|CareTeam

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public resultsInterpreter?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Organization|CareTeam

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public specimen?: Array<FlatConvectorModel<Reference>>; //Specimen

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public result?: Array<FlatConvectorModel<Reference>>; //Observation

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public imagingStudy?: Array<FlatConvectorModel<Reference>>; //ImagingStudy

   @Validate(yup.lazy(() => yup.array(DiagnosticReportMedia.schema())))
   public media?: Array<FlatConvectorModel<DiagnosticReportMedia>>;

   @Validate(yup.string())
   public conclusion?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public conclusionCode?: Array<FlatConvectorModel<CodeableConcept>>;

//   @Validate(yup.lazy(() => yup.array(Attachment.schema())))
   public presentedForm?: Array<FlatConvectorModel<Attachment>>;

}


export class Distance extends DomainResource<Distance> {
   @Default('fhir.datatypes.Distance')
   @ReadOnly()
   public readonly type: string;

}


export class DocumentManifestRelated extends BackboneElement {
   @Default('fhir.datatypes.DocumentManifest.DocumentManifestRelated')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => Reference.schema()))
   public ref?: FlatConvectorModel<Reference>; //Any

}

export class DocumentManifest extends DomainResource<DocumentManifest> {
   @Default('fhir.datatypes.DocumentManifest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public masterIdentifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Practitioner|Group|Device

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created?: date;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public author?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Organization|Device|Patient|RelatedPerson

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public recipient?: Array<FlatConvectorModel<Reference>>; //Patient|Practitioner|PractitionerRole|RelatedPerson|Organization

   @Validate(yup.string())
   public source?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public content?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(DocumentManifestRelated.schema())))
   public related?: Array<FlatConvectorModel<DocumentManifestRelated>>;

}


export class DocumentReferenceRelatesTo extends BackboneElement {
   @Default('fhir.datatypes.DocumentReference.DocumentReferenceRelatesTo')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public target: FlatConvectorModel<Reference>; //DocumentReference

}

export class DocumentReferenceContent extends BackboneElement {
   @Default('fhir.datatypes.DocumentReference.DocumentReferenceContent')
   @ReadOnly()
   public readonly type: string;

//   @Required()
   @Validate(yup.lazy(() => Attachment.schema()))
   public attachment: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => Coding.schema()))
   public format?: FlatConvectorModel<Coding>;

}

export class DocumentReferenceContext extends BackboneElement {
   @Default('fhir.datatypes.DocumentReference.DocumentReferenceContext')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public encounter?: Array<FlatConvectorModel<Reference>>; //Encounter|EpisodeOfCare

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public event?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public facilityType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public practiceSetting?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public sourcePatientInfo?: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public related?: Array<FlatConvectorModel<Reference>>; //Any

}

export class DocumentReference extends DomainResource<DocumentReference> {
   @Default('fhir.datatypes.DocumentReference')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public masterIdentifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.string())
   public docStatus?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Practitioner|Group|Device

   @Validate(yup.string())
   public date?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public author?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Organization|Device|Patient|RelatedPerson

   @Validate(yup.lazy(() => Reference.schema()))
   public authenticator?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public custodian?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(DocumentReferenceRelatesTo.schema())))
   public relatesTo?: Array<FlatConvectorModel<DocumentReferenceRelatesTo>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public securityLabel?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(DocumentReferenceContent.schema())))
   public content?: Array<FlatConvectorModel<DocumentReferenceContent>>;

   @Validate(yup.lazy(() => DocumentReferenceContext.schema()))
   public context?: FlatConvectorModel<DocumentReferenceContext>;

}


export class DosageDoseAndRate extends BackboneElement {
   @Default('fhir.datatypes.Dosage.DosageDoseAndRate')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Range.schema()))
   public doseRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public doseQuantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public rateRatio?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => Range.schema()))
   public rateRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public rateQuantity?: FlatConvectorModel<SimpleQuantity>;

}

export class EffectEvidenceSynthesisSampleSize extends BackboneElement {
   @Default('fhir.datatypes.EffectEvidenceSynthesis.EffectEvidenceSynthesisSampleSize')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.number())
   public numberOfStudies?: number;

   @Validate(yup.number())
   public numberOfParticipants?: number;

}

export class EffectEvidenceSynthesisResultsByExposure extends BackboneElement {
   @Default('fhir.datatypes.EffectEvidenceSynthesis.EffectEvidenceSynthesisResultsByExposure')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public exposureState?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public variantState?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public riskEvidenceSynthesis: FlatConvectorModel<Reference>; //RiskEvidenceSynthesis

}

export class EffectEvidenceSynthesisEffectEstimate extends BackboneElement {
   @Default('fhir.datatypes.EffectEvidenceSynthesis.EffectEvidenceSynthesisEffectEstimate')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public variantState?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public value?: number;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public unitOfMeasure?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(EffectEvidenceSynthesisEffectEstimatePrecisionEstimate.schema())))
   public precisionEstimate?: Array<FlatConvectorModel<EffectEvidenceSynthesisEffectEstimatePrecisionEstimate>>;

}

export class EffectEvidenceSynthesisEffectEstimatePrecisionEstimate extends BackboneElement {
   @Default('fhir.datatypes.EffectEvidenceSynthesis.EffectEvidenceSynthesisEffectEstimatePrecisionEstimate')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public level?: number;

   @Validate(yup.number())
   public from?: number;

   @Validate(yup.number())
   public to?: number;

}

export class EffectEvidenceSynthesisCertainty extends BackboneElement {
   @Default('fhir.datatypes.EffectEvidenceSynthesis.EffectEvidenceSynthesisCertainty')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public rating?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(EffectEvidenceSynthesisCertaintyCertaintySubcomponent.schema())))
   public certaintySubcomponent?: Array<FlatConvectorModel<EffectEvidenceSynthesisCertaintyCertaintySubcomponent>>;

}

export class EffectEvidenceSynthesisCertaintyCertaintySubcomponent extends BackboneElement {
   @Default('fhir.datatypes.EffectEvidenceSynthesis.EffectEvidenceSynthesisCertaintyCertaintySubcomponent')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public rating?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}

export class EffectEvidenceSynthesis extends DomainResource<EffectEvidenceSynthesis> {
   @Default('fhir.datatypes.EffectEvidenceSynthesis')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public topic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public author?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public editor?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public reviewer?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public endorser?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public synthesisType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public studyType?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public population: FlatConvectorModel<Reference>; //EvidenceVariable

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public exposure: FlatConvectorModel<Reference>; //EvidenceVariable

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public exposureAlternative: FlatConvectorModel<Reference>; //EvidenceVariable

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public outcome: FlatConvectorModel<Reference>; //EvidenceVariable

   @Validate(yup.lazy(() => EffectEvidenceSynthesisSampleSize.schema()))
   public sampleSize?: FlatConvectorModel<EffectEvidenceSynthesisSampleSize>;

   @Validate(yup.lazy(() => yup.array(EffectEvidenceSynthesisResultsByExposure.schema())))
   public resultsByExposure?: Array<FlatConvectorModel<EffectEvidenceSynthesisResultsByExposure>>;

   @Validate(yup.lazy(() => yup.array(EffectEvidenceSynthesisEffectEstimate.schema())))
   public effectEstimate?: Array<FlatConvectorModel<EffectEvidenceSynthesisEffectEstimate>>;

   @Validate(yup.lazy(() => yup.array(EffectEvidenceSynthesisCertainty.schema())))
   public certainty?: Array<FlatConvectorModel<EffectEvidenceSynthesisCertainty>>;

}


export class ElementDefinitionSlicing extends BackboneElement {
   @Default('fhir.datatypes.ElementDefinition.ElementDefinitionSlicing')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(ElementDefinitionSlicingDiscriminator.schema())))
   public discriminator?: Array<FlatConvectorModel<ElementDefinitionSlicingDiscriminator>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.boolean())
   public ordered?: boolean;

   @Required()
   @Validate(yup.string())
   public rules: string;

}

export class ElementDefinitionSlicingDiscriminator extends BackboneElement {
   @Default('fhir.datatypes.ElementDefinition.ElementDefinitionSlicingDiscriminator')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Required()
   @Validate(yup.string())
   public path: string;

}

export class ElementDefinitionBase extends BackboneElement {
   @Default('fhir.datatypes.ElementDefinition.ElementDefinitionBase')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public path: string;

   @Required()
   @Validate(yup.number())
   public min: number;

   @Required()
   @Validate(yup.string())
   public max: string;

}

export class ElementDefinitionType extends BackboneElement {
   @Default('fhir.datatypes.ElementDefinition.ElementDefinitionType')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.array(yup.string()))
   public profile? : Array<string>; //StructureDefinition|ImplementationGuide

   @Validate(yup.array(yup.string()))
   public targetProfile? : Array<string>; //StructureDefinition|ImplementationGuide

   @Validate(yup.array(yup.string()))
   public aggregation? : Array<string>;

   @Validate(yup.string())
   public versioning?: string;

}

export class ElementDefinitionExample extends BackboneElement {
   @Default('fhir.datatypes.ElementDefinition.ElementDefinitionExample')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public label: string;

}

export class ElementDefinitionConstraint extends BackboneElement {
   @Default('fhir.datatypes.ElementDefinition.ElementDefinitionConstraint')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public key: string;

   @Validate(yup.string())
   public requirements?: string;

   @Required()
   @Validate(yup.string())
   public severity: string;

   @Required()
   @Validate(yup.string())
   public human: string;

   @Validate(yup.string())
   public expression?: string;

   @Validate(yup.string())
   public xpath?: string;

   @Validate(yup.string())
   public source?: string; //StructureDefinition

}

export class ElementDefinitionBinding extends BackboneElement {
   @Default('fhir.datatypes.ElementDefinition.ElementDefinitionBinding')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public strength: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public valueSet?: string; //ValueSet

}

export class ElementDefinitionMapping extends BackboneElement {
   @Default('fhir.datatypes.ElementDefinition.ElementDefinitionMapping')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public identity: string;

   @Validate(yup.string())
   public language?: string;

   @Required()
   @Validate(yup.string())
   public map: string;

   @Validate(yup.string())
   public comment?: string;

}

export class ElementDefinition extends DomainResource<ElementDefinition> {
   @Default('fhir.datatypes.ElementDefinition')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public path: string;

   @Validate(yup.array(yup.string()))
   public representation? : Array<string>;

   @Validate(yup.string())
   public sliceName?: string;

   @Validate(yup.boolean())
   public sliceIsConstraining?: boolean;

   @Validate(yup.string())
   public label?: string;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public code?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.lazy(() => ElementDefinitionSlicing.schema()))
   public slicing?: FlatConvectorModel<ElementDefinitionSlicing>;

   @Validate(yup.string())
   public short?: string;

   @Validate(yup.string())
   public definition?: string;

   @Validate(yup.string())
   public comment?: string;

   @Validate(yup.string())
   public requirements?: string;

   @Validate(yup.array(yup.string()))
   public alias? : Array<string>;

   @Validate(yup.number())
   public min?: number;

   @Validate(yup.string())
   public max?: string;

   @Validate(yup.lazy(() => ElementDefinitionBase.schema()))
   public base?: FlatConvectorModel<ElementDefinitionBase>;

   @Validate(yup.string())
   public contentReference?: string;

   @Validate(yup.lazy(() => yup.array(ElementDefinitionType.schema())))
   public type_?: Array<FlatConvectorModel<ElementDefinitionType>>;

   @Validate(yup.string())
   public meaningWhenMissing?: string;

   @Validate(yup.string())
   public orderMeaning?: string;

   @Validate(yup.lazy(() => yup.array(ElementDefinitionExample.schema())))
   public example?: Array<FlatConvectorModel<ElementDefinitionExample>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public minValueDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public minValueDateTime?: date;

   @Validate(yup.string())
   public minValueInstant?: string;

   @Validate(yup.string())
   public minValueTime?: string;

   @Validate(yup.number())
   public minValueDecimal?: number;

   @Validate(yup.number())
   public minValueInteger?: number;

   @Validate(yup.number())
   public minValuePositiveInt?: number;

   @Validate(yup.number())
   public minValueUnsignedInt?: number;

   @Validate(yup.lazy(() => Quantity.schema()))
   public minValueQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public maxValueDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public maxValueDateTime?: date;

   @Validate(yup.string())
   public maxValueInstant?: string;

   @Validate(yup.string())
   public maxValueTime?: string;

   @Validate(yup.number())
   public maxValueDecimal?: number;

   @Validate(yup.number())
   public maxValueInteger?: number;

   @Validate(yup.number())
   public maxValuePositiveInt?: number;

   @Validate(yup.number())
   public maxValueUnsignedInt?: number;

   @Validate(yup.lazy(() => Quantity.schema()))
   public maxValueQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.number())
   public maxLength?: number;

   @Validate(yup.array(yup.string()))
   public condition? : Array<string>;

   @Validate(yup.lazy(() => yup.array(ElementDefinitionConstraint.schema())))
   public constraint?: Array<FlatConvectorModel<ElementDefinitionConstraint>>;

   @Validate(yup.boolean())
   public mustSupport?: boolean;

   @Validate(yup.boolean())
   public isModifier?: boolean;

   @Validate(yup.string())
   public isModifierReason?: string;

   @Validate(yup.boolean())
   public isSummary?: boolean;

   @Validate(yup.lazy(() => ElementDefinitionBinding.schema()))
   public binding?: FlatConvectorModel<ElementDefinitionBinding>;

   @Validate(yup.lazy(() => yup.array(ElementDefinitionMapping.schema())))
   public mapping?: Array<FlatConvectorModel<ElementDefinitionMapping>>;

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


export class Endpoint extends DomainResource<Endpoint> {
   @Default('fhir.datatypes.Endpoint')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public connectionType: FlatConvectorModel<Coding>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public managingOrganization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public contact?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public payloadType?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.array(yup.string()))
   public payloadMimeType? : Array<string>;

   @Required()
   @Validate(yup.string())
   public address: string;

   @Validate(yup.array(yup.string()))
   public header? : Array<string>;

}


export class EnrollmentRequest extends DomainResource<EnrollmentRequest> {
   @Default('fhir.datatypes.EnrollmentRequest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public insurer?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public provider?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public candidate?: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => Reference.schema()))
   public coverage?: FlatConvectorModel<Reference>; //Coverage

}


export class EnrollmentResponse extends DomainResource<EnrollmentResponse> {
   @Default('fhir.datatypes.EnrollmentResponse')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public request?: FlatConvectorModel<Reference>; //EnrollmentRequest

   @Validate(yup.string())
   public outcome?: string;

   @Validate(yup.string())
   public disposition?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public organization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public requestProvider?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

}


export class EpisodeOfCareStatusHistory extends BackboneElement {
   @Default('fhir.datatypes.EpisodeOfCare.EpisodeOfCareStatusHistory')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.lazy(() => Period.schema()))
   public period: FlatConvectorModel<Period>;

}

export class EpisodeOfCareDiagnosis extends BackboneElement {
   @Default('fhir.datatypes.EpisodeOfCare.EpisodeOfCareDiagnosis')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public condition: FlatConvectorModel<Reference>; //Condition

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public role?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public rank?: number;

}

export class EpisodeOfCare extends DomainResource<EpisodeOfCare> {
   @Default('fhir.datatypes.EpisodeOfCare')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => yup.array(EpisodeOfCareStatusHistory.schema())))
   public statusHistory?: Array<FlatConvectorModel<EpisodeOfCareStatusHistory>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(EpisodeOfCareDiagnosis.schema())))
   public diagnosis?: Array<FlatConvectorModel<EpisodeOfCareDiagnosis>>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => Reference.schema()))
   public managingOrganization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public referralRequest?: Array<FlatConvectorModel<Reference>>; //ServiceRequest

   @Validate(yup.lazy(() => Reference.schema()))
   public careManager?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public team?: Array<FlatConvectorModel<Reference>>; //CareTeam

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public account?: Array<FlatConvectorModel<Reference>>; //Account

}


export class EventDefinition extends DomainResource<EventDefinition> {
   @Default('fhir.datatypes.EventDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public subtitle?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subjectCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subjectReference?: FlatConvectorModel<Reference>; //Group

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public usage?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public topic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public author?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public editor?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public reviewer?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public endorser?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.lazy(() => yup.array(TriggerDefinition.schema())))
   public trigger?: Array<FlatConvectorModel<TriggerDefinition>>;

}


export class Evidence extends DomainResource<Evidence> {
   @Default('fhir.datatypes.Evidence')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public shortTitle?: string;

   @Validate(yup.string())
   public subtitle?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public topic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public author?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public editor?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public reviewer?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public endorser?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public exposureBackground: FlatConvectorModel<Reference>; //EvidenceVariable

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public exposureVariant?: Array<FlatConvectorModel<Reference>>; //EvidenceVariable

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public outcome?: Array<FlatConvectorModel<Reference>>; //EvidenceVariable

}


export class EvidenceVariableCharacteristic extends BackboneElement {
   @Default('fhir.datatypes.EvidenceVariable.EvidenceVariableCharacteristic')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public definitionReference: FlatConvectorModel<Reference>; //Group

   @Required()
   @Validate(yup.string())
   public definitionCanonical: string; //ActivityDefinition

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public definitionCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Expression.schema()))
   public definitionExpression: FlatConvectorModel<Expression>;

   @Required()
   @Validate(yup.lazy(() => DataRequirement.schema()))
   public definitionDataRequirement: FlatConvectorModel<DataRequirement>;

   @Required()
   @Validate(yup.lazy(() => TriggerDefinition.schema()))
   public definitionTriggerDefinition: FlatConvectorModel<TriggerDefinition>;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public usageContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.boolean())
   public exclude?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public participantEffectiveDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public participantEffectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Duration.schema()))
   public participantEffectiveDuration?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => Timing.schema()))
   public participantEffectiveTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => Duration.schema()))
   public timeFromStart?: FlatConvectorModel<Duration>;

   @Validate(yup.string())
   public groupMeasure?: string;

}

export class EvidenceVariable extends DomainResource<EvidenceVariable> {
   @Default('fhir.datatypes.EvidenceVariable')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public shortTitle?: string;

   @Validate(yup.string())
   public subtitle?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public topic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public author?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public editor?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public reviewer?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public endorser?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.string())
   public type_?: string;

   @Validate(yup.lazy(() => yup.array(EvidenceVariableCharacteristic.schema())))
   public characteristic?: Array<FlatConvectorModel<EvidenceVariableCharacteristic>>;

}


export class ExampleScenarioActor extends BackboneElement {
   @Default('fhir.datatypes.ExampleScenario.ExampleScenarioActor')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public actorId: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public description?: string;

}

export class ExampleScenarioInstance extends BackboneElement {
   @Default('fhir.datatypes.ExampleScenario.ExampleScenarioInstance')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public resourceId: string;

   @Required()
   @Validate(yup.string())
   public resourceType: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(ExampleScenarioInstanceVersion.schema())))
   public version?: Array<FlatConvectorModel<ExampleScenarioInstanceVersion>>;

   @Validate(yup.lazy(() => yup.array(ExampleScenarioInstanceContainedInstance.schema())))
   public containedInstance?: Array<FlatConvectorModel<ExampleScenarioInstanceContainedInstance>>;

}

export class ExampleScenarioInstanceVersion extends BackboneElement {
   @Default('fhir.datatypes.ExampleScenario.ExampleScenarioInstanceVersion')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public versionId: string;

   @Required()
   @Validate(yup.string())
   public description: string;

}

export class ExampleScenarioInstanceContainedInstance extends BackboneElement {
   @Default('fhir.datatypes.ExampleScenario.ExampleScenarioInstanceContainedInstance')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public resourceId: string;

   @Validate(yup.string())
   public versionId?: string;

}

export class ExampleScenarioProcess extends BackboneElement {
   @Default('fhir.datatypes.ExampleScenario.ExampleScenarioProcess')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public title: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public preConditions?: string;

   @Validate(yup.string())
   public postConditions?: string;

   @Validate(yup.lazy(() => yup.array(ExampleScenarioProcessStep.schema())))
   public step?: Array<FlatConvectorModel<ExampleScenarioProcessStep>>;

}

export class ExampleScenarioProcessStep extends BackboneElement {
   @Default('fhir.datatypes.ExampleScenario.ExampleScenarioProcessStep')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(ExampleScenarioProcess.schema())))
   public process?: Array<FlatConvectorModel<ExampleScenarioProcess>>;

   @Validate(yup.boolean())
   public pause?: boolean;

   @Validate(yup.lazy(() => ExampleScenarioProcessStepOperation.schema()))
   public operation?: FlatConvectorModel<ExampleScenarioProcessStepOperation>;

   @Validate(yup.lazy(() => yup.array(ExampleScenarioProcessStepAlternative.schema())))
   public alternative?: Array<FlatConvectorModel<ExampleScenarioProcessStepAlternative>>;

}

export class ExampleScenarioProcessStepOperation extends BackboneElement {
   @Default('fhir.datatypes.ExampleScenario.ExampleScenarioProcessStepOperation')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public number: string;

   @Validate(yup.string())
   public type_?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public initiator?: string;

   @Validate(yup.string())
   public receiver?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.boolean())
   public initiatorActive?: boolean;

   @Validate(yup.boolean())
   public receiverActive?: boolean;

   @Validate(yup.lazy(() => ExampleScenarioInstanceContainedInstance.schema()))
   public request?: FlatConvectorModel<ExampleScenarioInstanceContainedInstance>;

   @Validate(yup.lazy(() => ExampleScenarioInstanceContainedInstance.schema()))
   public response?: FlatConvectorModel<ExampleScenarioInstanceContainedInstance>;

}

export class ExampleScenarioProcessStepAlternative extends BackboneElement {
   @Default('fhir.datatypes.ExampleScenario.ExampleScenarioProcessStepAlternative')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public title: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(ExampleScenarioProcessStep.schema())))
   public step?: Array<FlatConvectorModel<ExampleScenarioProcessStep>>;

}

export class ExampleScenario extends DomainResource<ExampleScenario> {
   @Default('fhir.datatypes.ExampleScenario')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.lazy(() => yup.array(ExampleScenarioActor.schema())))
   public actor?: Array<FlatConvectorModel<ExampleScenarioActor>>;

   @Validate(yup.lazy(() => yup.array(ExampleScenarioInstance.schema())))
   public instance?: Array<FlatConvectorModel<ExampleScenarioInstance>>;

   @Validate(yup.lazy(() => yup.array(ExampleScenarioProcess.schema())))
   public process?: Array<FlatConvectorModel<ExampleScenarioProcess>>;

   @Validate(yup.array(yup.string()))
   public workflow? : Array<string>; //ExampleScenario

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
   public preAuthRef? : Array<string>;

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
   public careTeamSequence? : Array<number>;

   @Validate(yup.array(yup.number()))
   public diagnosisSequence? : Array<number>;

   @Validate(yup.array(yup.number()))
   public procedureSequence? : Array<number>;

   @Validate(yup.array(yup.number()))
   public informationSequence? : Array<number>;

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
   public noteNumber? : Array<number>;

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
   public noteNumber? : Array<number>;

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
   public noteNumber? : Array<number>;

   @Validate(yup.lazy(() => yup.array(ExplanationOfBenefitItemAdjudication.schema())))
   public adjudication?: Array<FlatConvectorModel<ExplanationOfBenefitItemAdjudication>>;

}

export class ExplanationOfBenefitAddItem extends BackboneElement {
   @Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitAddItem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.number()))
   public itemSequence? : Array<number>;

   @Validate(yup.array(yup.number()))
   public detailSequence? : Array<number>;

   @Validate(yup.array(yup.number()))
   public subDetailSequence? : Array<number>;

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
   public noteNumber? : Array<number>;

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
   public noteNumber? : Array<number>;

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
   public noteNumber? : Array<number>;

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
   public preAuthRef? : Array<string>;

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


export class Expression extends DomainResource<Expression> {
   @Default('fhir.datatypes.Expression')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public name?: string;

   @Required()
   @Validate(yup.string())
   public language: string;

   @Validate(yup.string())
   public expression?: string;

   @Validate(yup.string())
   public reference?: string;

}


export class FamilyMemberHistoryCondition extends BackboneElement {
   @Default('fhir.datatypes.FamilyMemberHistory.FamilyMemberHistoryCondition')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public outcome?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public contributedToDeath?: boolean;

   @Validate(yup.lazy(() => Age.schema()))
   public onsetAge?: FlatConvectorModel<Age>;

   @Validate(yup.lazy(() => Range.schema()))
   public onsetRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Period.schema()))
   public onsetPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string())
   public onsetString?: string;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}

export class FamilyMemberHistory extends DomainResource<FamilyMemberHistory> {
   @Default('fhir.datatypes.FamilyMemberHistory')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public instantiatesCanonical? : Array<string>; //PlanDefinition|Questionnaire|ActivityDefinition|Measure|OperationDefinition

   @Validate(yup.array(yup.string()))
   public instantiatesUri? : Array<string>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public dataAbsentReason?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public name?: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public relationship: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public sex?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Period.schema()))
   public bornPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public bornDate?: date;

   @Validate(yup.string())
   public bornString?: string;

   @Validate(yup.lazy(() => Age.schema()))
   public ageAge?: FlatConvectorModel<Age>;

   @Validate(yup.lazy(() => Range.schema()))
   public ageRange?: FlatConvectorModel<Range>;

   @Validate(yup.string())
   public ageString?: string;

   @Validate(yup.boolean())
   public estimatedAge?: boolean;

   @Validate(yup.boolean())
   public deceasedBoolean?: boolean;

   @Validate(yup.lazy(() => Age.schema()))
   public deceasedAge?: FlatConvectorModel<Age>;

   @Validate(yup.lazy(() => Range.schema()))
   public deceasedRange?: FlatConvectorModel<Range>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public deceasedDate?: date;

   @Validate(yup.string())
   public deceasedString?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|AllergyIntolerance|QuestionnaireResponse|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(FamilyMemberHistoryCondition.schema())))
   public condition?: Array<FlatConvectorModel<FamilyMemberHistoryCondition>>;

}


export class Flag extends DomainResource<Flag> {
   @Default('fhir.datatypes.Flag')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Location|Group|Organization|Practitioner|PlanDefinition|Medication|Procedure

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.lazy(() => Reference.schema()))
   public author?: FlatConvectorModel<Reference>; //Device|Organization|Patient|Practitioner|PractitionerRole

}


export class GoalTarget extends BackboneElement {
   @Default('fhir.datatypes.Goal.GoalTarget')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public measure?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public detailQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Range.schema()))
   public detailRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public detailCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public detailString?: string;

   @Validate(yup.boolean())
   public detailBoolean?: boolean;

   @Validate(yup.number())
   public detailInteger?: number;

   @Validate(yup.lazy(() => Ratio.schema()))
   public detailRatio?: FlatConvectorModel<Ratio>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public dueDate?: date;

   @Validate(yup.lazy(() => Duration.schema()))
   public dueDuration?: FlatConvectorModel<Duration>;

}

export class Goal extends DomainResource<Goal> {
   @Default('fhir.datatypes.Goal')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public lifecycleStatus: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public achievementStatus?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public priority?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public description: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group|Organization

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public startDate?: date;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public startCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(GoalTarget.schema())))
   public target?: Array<FlatConvectorModel<GoalTarget>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public statusDate?: date;

   @Validate(yup.string())
   public statusReason?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public expressedBy?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|RelatedPerson

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public addresses?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|MedicationStatement|NutritionOrder|ServiceRequest|RiskAssessment

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public outcomeCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public outcomeReference?: Array<FlatConvectorModel<Reference>>; //Observation

}


export class GraphDefinitionLink extends BackboneElement {
   @Default('fhir.datatypes.GraphDefinition.GraphDefinitionLink')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public path?: string;

   @Validate(yup.string())
   public sliceName?: string;

   @Validate(yup.number())
   public min?: number;

   @Validate(yup.string())
   public max?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(GraphDefinitionLinkTarget.schema())))
   public target?: Array<FlatConvectorModel<GraphDefinitionLinkTarget>>;

}

export class GraphDefinitionLinkTarget extends BackboneElement {
   @Default('fhir.datatypes.GraphDefinition.GraphDefinitionLinkTarget')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public params?: string;

   @Validate(yup.string())
   public profile?: string; //StructureDefinition

   @Validate(yup.lazy(() => yup.array(GraphDefinitionLinkTargetCompartment.schema())))
   public compartment?: Array<FlatConvectorModel<GraphDefinitionLinkTargetCompartment>>;

   @Validate(yup.lazy(() => yup.array(GraphDefinitionLink.schema())))
   public link?: Array<FlatConvectorModel<GraphDefinitionLink>>;

}

export class GraphDefinitionLinkTargetCompartment extends BackboneElement {
   @Default('fhir.datatypes.GraphDefinition.GraphDefinitionLinkTargetCompartment')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public use: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Required()
   @Validate(yup.string())
   public rule: string;

   @Validate(yup.string())
   public expression?: string;

   @Validate(yup.string())
   public description?: string;

}

export class GraphDefinition extends DomainResource<GraphDefinition> {
   @Default('fhir.datatypes.GraphDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.string())
   public version?: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Required()
   @Validate(yup.string())
   public start: string;

   @Validate(yup.string())
   public profile?: string; //StructureDefinition

   @Validate(yup.lazy(() => yup.array(GraphDefinitionLink.schema())))
   public link?: Array<FlatConvectorModel<GraphDefinitionLink>>;

}


export class GroupCharacteristic extends BackboneElement {
   @Default('fhir.datatypes.Group.GroupCharacteristic')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public valueCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.boolean())
   public valueBoolean: boolean;

   @Required()
   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity: FlatConvectorModel<Quantity>;

   @Required()
   @Validate(yup.lazy(() => Range.schema()))
   public valueRange: FlatConvectorModel<Range>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public valueReference: FlatConvectorModel<Reference>;

   @Required()
   @Validate(yup.boolean())
   public exclude: boolean;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

}

export class GroupMember extends BackboneElement {
   @Default('fhir.datatypes.Group.GroupMember')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public entity: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|Device|Medication|Substance|Group

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.boolean())
   public inactive?: boolean;

}

export class Group extends DomainResource<Group> {
   @Default('fhir.datatypes.Group')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.boolean())
   public active?: boolean;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Required()
   @Validate(yup.boolean())
   public actual: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.number())
   public quantity?: number;

   @Validate(yup.lazy(() => Reference.schema()))
   public managingEntity?: FlatConvectorModel<Reference>; //Organization|RelatedPerson|Practitioner|PractitionerRole

   @Validate(yup.lazy(() => yup.array(GroupCharacteristic.schema())))
   public characteristic?: Array<FlatConvectorModel<GroupCharacteristic>>;

   @Validate(yup.lazy(() => yup.array(GroupMember.schema())))
   public member?: Array<FlatConvectorModel<GroupMember>>;

}


export class GuidanceResponse extends DomainResource<GuidanceResponse> {
   @Default('fhir.datatypes.GuidanceResponse')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public requestIdentifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public moduleUri: string;

   @Required()
   @Validate(yup.string())
   public moduleCanonical: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public moduleCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public occurrenceDateTime?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public performer?: FlatConvectorModel<Reference>; //Device

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public evaluationMessage?: Array<FlatConvectorModel<Reference>>; //OperationOutcome

   @Validate(yup.lazy(() => Reference.schema()))
   public outputParameters?: FlatConvectorModel<Reference>; //Parameters

   @Validate(yup.lazy(() => Reference.schema()))
   public result?: FlatConvectorModel<Reference>; //CarePlan|RequestGroup

   @Validate(yup.lazy(() => yup.array(DataRequirement.schema())))
   public dataRequirement?: Array<FlatConvectorModel<DataRequirement>>;

}


export class HealthcareServiceEligibility extends BackboneElement {
   @Default('fhir.datatypes.HealthcareService.HealthcareServiceEligibility')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public comment?: string;

}

export class HealthcareServiceAvailableTime extends BackboneElement {
   @Default('fhir.datatypes.HealthcareService.HealthcareServiceAvailableTime')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.string()))
   public daysOfWeek? : Array<string>;

   @Validate(yup.boolean())
   public allDay?: boolean;

   @Validate(yup.string())
   public availableStartTime?: string;

   @Validate(yup.string())
   public availableEndTime?: string;

}

export class HealthcareServiceNotAvailable extends BackboneElement {
   @Default('fhir.datatypes.HealthcareService.HealthcareServiceNotAvailable')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public description: string;

   @Validate(yup.lazy(() => Period.schema()))
   public during?: FlatConvectorModel<Period>;

}

export class HealthcareService extends DomainResource<HealthcareService> {
   @Default('fhir.datatypes.HealthcareService')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.boolean())
   public active?: boolean;

   @Validate(yup.lazy(() => Reference.schema()))
   public providedBy?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public specialty?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public location?: Array<FlatConvectorModel<Reference>>; //Location

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public comment?: string;

   @Validate(yup.string())
   public extraDetails?: string;

//   @Validate(yup.lazy(() => Attachment.schema()))
   public photo?: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public coverageArea?: Array<FlatConvectorModel<Reference>>; //Location

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public serviceProvisionCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(HealthcareServiceEligibility.schema())))
   public eligibility?: Array<FlatConvectorModel<HealthcareServiceEligibility>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public program?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public characteristic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public communication?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public referralMethod?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.boolean())
   public appointmentRequired?: boolean;

   @Validate(yup.lazy(() => yup.array(HealthcareServiceAvailableTime.schema())))
   public availableTime?: Array<FlatConvectorModel<HealthcareServiceAvailableTime>>;

   @Validate(yup.lazy(() => yup.array(HealthcareServiceNotAvailable.schema())))
   public notAvailable?: Array<FlatConvectorModel<HealthcareServiceNotAvailable>>;

   @Validate(yup.string())
   public availabilityExceptions?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public endpoint?: Array<FlatConvectorModel<Reference>>; //Endpoint

}


export class ImagingStudySeries extends BackboneElement {
   @Default('fhir.datatypes.ImagingStudy.ImagingStudySeries')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public uid: string;

   @Validate(yup.number())
   public number?: number;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public modality: FlatConvectorModel<Coding>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.number())
   public numberOfInstances?: number;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public endpoint?: Array<FlatConvectorModel<Reference>>; //Endpoint

   @Validate(yup.lazy(() => Coding.schema()))
   public bodySite?: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => Coding.schema()))
   public laterality?: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public specimen?: Array<FlatConvectorModel<Reference>>; //Specimen

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public started?: date;

   @Validate(yup.lazy(() => yup.array(ImagingStudySeriesPerformer.schema())))
   public performer?: Array<FlatConvectorModel<ImagingStudySeriesPerformer>>;

   @Validate(yup.lazy(() => yup.array(ImagingStudySeriesInstance.schema())))
   public instance?: Array<FlatConvectorModel<ImagingStudySeriesInstance>>;

}

export class ImagingStudySeriesPerformer extends BackboneElement {
   @Default('fhir.datatypes.ImagingStudy.ImagingStudySeriesPerformer')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public function_?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public actor: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|CareTeam|Patient|Device|RelatedPerson

}

export class ImagingStudySeriesInstance extends BackboneElement {
   @Default('fhir.datatypes.ImagingStudy.ImagingStudySeriesInstance')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public uid: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public sopClass: FlatConvectorModel<Coding>;

   @Validate(yup.number())
   public number?: number;

   @Validate(yup.string())
   public title?: string;

}

export class ImagingStudy extends DomainResource<ImagingStudy> {
   @Default('fhir.datatypes.ImagingStudy')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public modality?: Array<FlatConvectorModel<Coding>>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Device|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public started?: date;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //CarePlan|ServiceRequest|Appointment|AppointmentResponse|Task

   @Validate(yup.lazy(() => Reference.schema()))
   public referrer?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public interpreter?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public endpoint?: Array<FlatConvectorModel<Reference>>; //Endpoint

   @Validate(yup.number())
   public numberOfSeries?: number;

   @Validate(yup.number())
   public numberOfInstances?: number;

   @Validate(yup.lazy(() => Reference.schema()))
   public procedureReference?: FlatConvectorModel<Reference>; //Procedure

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public procedureCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public location?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|Media|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(ImagingStudySeries.schema())))
   public series?: Array<FlatConvectorModel<ImagingStudySeries>>;

}


export class ImmunizationPerformer extends BackboneElement {
   @Default('fhir.datatypes.Immunization.ImmunizationPerformer')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public function_?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public actor: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

}

export class ImmunizationEducation extends BackboneElement {
   @Default('fhir.datatypes.Immunization.ImmunizationEducation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public documentType?: string;

   @Validate(yup.string())
   public reference?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public publicationDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public presentationDate?: date;

}

export class ImmunizationReaction extends BackboneElement {
   @Default('fhir.datatypes.Immunization.ImmunizationReaction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public detail?: FlatConvectorModel<Reference>; //Observation

   @Validate(yup.boolean())
   public reported?: boolean;

}

export class ImmunizationProtocolApplied extends BackboneElement {
   @Default('fhir.datatypes.Immunization.ImmunizationProtocolApplied')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public series?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public authority?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public targetDisease?: Array<FlatConvectorModel<CodeableConcept>>;

   @Required()
   @Validate(yup.number())
   public doseNumberPositiveInt: number;

   @Required()
   @Validate(yup.string())
   public doseNumberString: string;

   @Validate(yup.number())
   public seriesDosesPositiveInt?: number;

   @Validate(yup.string())
   public seriesDosesString?: string;

}

export class Immunization extends DomainResource<Immunization> {
   @Default('fhir.datatypes.Immunization')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public statusReason?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public vaccineCode: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public occurrenceDateTime: date;

   @Required()
   @Validate(yup.string())
   public occurrenceString: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public recorded?: date;

   @Validate(yup.boolean())
   public primarySource?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public reportOrigin?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public location?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => Reference.schema()))
   public manufacturer?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.string())
   public lotNumber?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public expirationDate?: date;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public site?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public route?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public doseQuantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => yup.array(ImmunizationPerformer.schema())))
   public performer?: Array<FlatConvectorModel<ImmunizationPerformer>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport

   @Validate(yup.boolean())
   public isSubpotent?: boolean;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public subpotentReason?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ImmunizationEducation.schema())))
   public education?: Array<FlatConvectorModel<ImmunizationEducation>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public programEligibility?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public fundingSource?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(ImmunizationReaction.schema())))
   public reaction?: Array<FlatConvectorModel<ImmunizationReaction>>;

   @Validate(yup.lazy(() => yup.array(ImmunizationProtocolApplied.schema())))
   public protocolApplied?: Array<FlatConvectorModel<ImmunizationProtocolApplied>>;

}


export class ImmunizationEvaluation extends DomainResource<ImmunizationEvaluation> {
   @Default('fhir.datatypes.ImmunizationEvaluation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public authority?: FlatConvectorModel<Reference>; //Organization

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public targetDisease: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public immunizationEvent: FlatConvectorModel<Reference>; //Immunization

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public doseStatus: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public doseStatusReason?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public series?: string;

   @Validate(yup.number())
   public doseNumberPositiveInt?: number;

   @Validate(yup.string())
   public doseNumberString?: string;

   @Validate(yup.number())
   public seriesDosesPositiveInt?: number;

   @Validate(yup.string())
   public seriesDosesString?: string;

}


export class ImmunizationRecommendationRecommendation extends BackboneElement {
   @Default('fhir.datatypes.ImmunizationRecommendation.ImmunizationRecommendationRecommendation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public vaccineCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public targetDisease?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public contraindicatedVaccineCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public forecastStatus: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public forecastReason?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ImmunizationRecommendationRecommendationDateCriterion.schema())))
   public dateCriterion?: Array<FlatConvectorModel<ImmunizationRecommendationRecommendationDateCriterion>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public series?: string;

   @Validate(yup.number())
   public doseNumberPositiveInt?: number;

   @Validate(yup.string())
   public doseNumberString?: string;

   @Validate(yup.number())
   public seriesDosesPositiveInt?: number;

   @Validate(yup.string())
   public seriesDosesString?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingImmunization?: Array<FlatConvectorModel<Reference>>; //Immunization|ImmunizationEvaluation

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingPatientInformation?: Array<FlatConvectorModel<Reference>>; //Any

}

export class ImmunizationRecommendationRecommendationDateCriterion extends BackboneElement {
   @Default('fhir.datatypes.ImmunizationRecommendation.ImmunizationRecommendationRecommendationDateCriterion')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public value: date;

}

export class ImmunizationRecommendation extends DomainResource<ImmunizationRecommendation> {
   @Default('fhir.datatypes.ImmunizationRecommendation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public authority?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(ImmunizationRecommendationRecommendation.schema())))
   public recommendation?: Array<FlatConvectorModel<ImmunizationRecommendationRecommendation>>;

}


export class ImplementationGuideDependsOn extends BackboneElement {
   @Default('fhir.datatypes.ImplementationGuide.ImplementationGuideDependsOn')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public uri: string; //ImplementationGuide

   @Validate(yup.string())
   public packageId?: string;

   @Validate(yup.string())
   public version?: string;

}

export class ImplementationGuideGlobal extends BackboneElement {
   @Default('fhir.datatypes.ImplementationGuide.ImplementationGuideGlobal')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Required()
   @Validate(yup.string())
   public profile: string; //StructureDefinition

}

export class ImplementationGuideDefinition extends BackboneElement {
   @Default('fhir.datatypes.ImplementationGuide.ImplementationGuideDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(ImplementationGuideDefinitionGrouping.schema())))
   public grouping?: Array<FlatConvectorModel<ImplementationGuideDefinitionGrouping>>;

   @Validate(yup.lazy(() => yup.array(ImplementationGuideDefinitionResource.schema())))
   public resource?: Array<FlatConvectorModel<ImplementationGuideDefinitionResource>>;

   @Validate(yup.lazy(() => ImplementationGuideDefinitionPage.schema()))
   public page?: FlatConvectorModel<ImplementationGuideDefinitionPage>;

   @Validate(yup.lazy(() => yup.array(ImplementationGuideDefinitionParameter.schema())))
   public parameter?: Array<FlatConvectorModel<ImplementationGuideDefinitionParameter>>;

   @Validate(yup.lazy(() => yup.array(ImplementationGuideDefinitionTemplate.schema())))
   public template?: Array<FlatConvectorModel<ImplementationGuideDefinitionTemplate>>;

}

export class ImplementationGuideDefinitionGrouping extends BackboneElement {
   @Default('fhir.datatypes.ImplementationGuide.ImplementationGuideDefinitionGrouping')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public description?: string;

}

export class ImplementationGuideDefinitionResource extends BackboneElement {
   @Default('fhir.datatypes.ImplementationGuide.ImplementationGuideDefinitionResource')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public reference: FlatConvectorModel<Reference>; //Any

   @Validate(yup.array(yup.string()))
   public fhirVersion? : Array<string>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.boolean())
   public exampleBoolean?: boolean;

   @Validate(yup.string())
   public exampleCanonical?: string; //StructureDefinition

   @Validate(yup.string())
   public groupingId?: string;

}

export class ImplementationGuideDefinitionPage extends BackboneElement {
   @Default('fhir.datatypes.ImplementationGuide.ImplementationGuideDefinitionPage')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public nameUrl: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public nameReference: FlatConvectorModel<Reference>; //Binary

   @Required()
   @Validate(yup.string())
   public title: string;

   @Required()
   @Validate(yup.string())
   public generation: string;

   @Validate(yup.lazy(() => yup.array(ImplementationGuideDefinitionPage.schema())))
   public page?: Array<FlatConvectorModel<ImplementationGuideDefinitionPage>>;

}

export class ImplementationGuideDefinitionParameter extends BackboneElement {
   @Default('fhir.datatypes.ImplementationGuide.ImplementationGuideDefinitionParameter')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Required()
   @Validate(yup.string())
   public value: string;

}

export class ImplementationGuideDefinitionTemplate extends BackboneElement {
   @Default('fhir.datatypes.ImplementationGuide.ImplementationGuideDefinitionTemplate')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Required()
   @Validate(yup.string())
   public source: string;

   @Validate(yup.string())
   public scope?: string;

}

export class ImplementationGuideManifest extends BackboneElement {
   @Default('fhir.datatypes.ImplementationGuide.ImplementationGuideManifest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public rendering?: string;

   @Validate(yup.lazy(() => yup.array(ImplementationGuideManifestResource.schema())))
   public resource?: Array<FlatConvectorModel<ImplementationGuideManifestResource>>;

   @Validate(yup.lazy(() => yup.array(ImplementationGuideManifestPage.schema())))
   public page?: Array<FlatConvectorModel<ImplementationGuideManifestPage>>;

   @Validate(yup.array(yup.string()))
   public image? : Array<string>;

   @Validate(yup.array(yup.string()))
   public other? : Array<string>;

}

export class ImplementationGuideManifestResource extends BackboneElement {
   @Default('fhir.datatypes.ImplementationGuide.ImplementationGuideManifestResource')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public reference: FlatConvectorModel<Reference>; //Any

   @Validate(yup.boolean())
   public exampleBoolean?: boolean;

   @Validate(yup.string())
   public exampleCanonical?: string; //StructureDefinition

   @Validate(yup.string())
   public relativePath?: string;

}

export class ImplementationGuideManifestPage extends BackboneElement {
   @Default('fhir.datatypes.ImplementationGuide.ImplementationGuideManifestPage')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.array(yup.string()))
   public anchor? : Array<string>;

}

export class ImplementationGuide extends DomainResource<ImplementationGuide> {
   @Default('fhir.datatypes.ImplementationGuide')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public url: string;

   @Validate(yup.string())
   public version?: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public copyright?: string;

   @Required()
   @Validate(yup.string())
   public packageId: string;

   @Validate(yup.string())
   public license?: string;

   @Validate(yup.array(yup.string()))
   public fhirVersion? : Array<string>;

   @Validate(yup.lazy(() => yup.array(ImplementationGuideDependsOn.schema())))
   public dependsOn?: Array<FlatConvectorModel<ImplementationGuideDependsOn>>;

   @Validate(yup.lazy(() => yup.array(ImplementationGuideGlobal.schema())))
   public global?: Array<FlatConvectorModel<ImplementationGuideGlobal>>;

   @Validate(yup.lazy(() => ImplementationGuideDefinition.schema()))
   public definition?: FlatConvectorModel<ImplementationGuideDefinition>;

   @Validate(yup.lazy(() => ImplementationGuideManifest.schema()))
   public manifest?: FlatConvectorModel<ImplementationGuideManifest>;

}


export class InsurancePlanContact extends BackboneElement {
   @Default('fhir.datatypes.InsurancePlan.InsurancePlanContact')
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

export class InsurancePlanCoverage extends BackboneElement {
   @Default('fhir.datatypes.InsurancePlan.InsurancePlanCoverage')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public network?: Array<FlatConvectorModel<Reference>>; //Organization

   @Validate(yup.lazy(() => yup.array(InsurancePlanCoverageBenefit.schema())))
   public benefit?: Array<FlatConvectorModel<InsurancePlanCoverageBenefit>>;

}

export class InsurancePlanCoverageBenefit extends BackboneElement {
   @Default('fhir.datatypes.InsurancePlan.InsurancePlanCoverageBenefit')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public requirement?: string;

   @Validate(yup.lazy(() => yup.array(InsurancePlanCoverageBenefitLimit.schema())))
   public limit?: Array<FlatConvectorModel<InsurancePlanCoverageBenefitLimit>>;

}

export class InsurancePlanCoverageBenefitLimit extends BackboneElement {
   @Default('fhir.datatypes.InsurancePlan.InsurancePlanCoverageBenefitLimit')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Quantity.schema()))
   public value?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

}

export class InsurancePlanPlan extends BackboneElement {
   @Default('fhir.datatypes.InsurancePlan.InsurancePlanPlan')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public coverageArea?: Array<FlatConvectorModel<Reference>>; //Location

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public network?: Array<FlatConvectorModel<Reference>>; //Organization

   @Validate(yup.lazy(() => yup.array(InsurancePlanPlanGeneralCost.schema())))
   public generalCost?: Array<FlatConvectorModel<InsurancePlanPlanGeneralCost>>;

   @Validate(yup.lazy(() => yup.array(InsurancePlanPlanSpecificCost.schema())))
   public specificCost?: Array<FlatConvectorModel<InsurancePlanPlanSpecificCost>>;

}

export class InsurancePlanPlanGeneralCost extends BackboneElement {
   @Default('fhir.datatypes.InsurancePlan.InsurancePlanPlanGeneralCost')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public groupSize?: number;

   @Validate(yup.lazy(() => Money.schema()))
   public cost?: FlatConvectorModel<Money>;

   @Validate(yup.string())
   public comment?: string;

}

export class InsurancePlanPlanSpecificCost extends BackboneElement {
   @Default('fhir.datatypes.InsurancePlan.InsurancePlanPlanSpecificCost')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(InsurancePlanPlanSpecificCostBenefit.schema())))
   public benefit?: Array<FlatConvectorModel<InsurancePlanPlanSpecificCostBenefit>>;

}

export class InsurancePlanPlanSpecificCostBenefit extends BackboneElement {
   @Default('fhir.datatypes.InsurancePlan.InsurancePlanPlanSpecificCostBenefit')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(InsurancePlanPlanSpecificCostBenefitCost.schema())))
   public cost?: Array<FlatConvectorModel<InsurancePlanPlanSpecificCostBenefitCost>>;

}

export class InsurancePlanPlanSpecificCostBenefitCost extends BackboneElement {
   @Default('fhir.datatypes.InsurancePlan.InsurancePlanPlanSpecificCostBenefitCost')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public applicability?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public qualifiers?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public value?: FlatConvectorModel<Quantity>;

}

export class InsurancePlan extends DomainResource<InsurancePlan> {
   @Default('fhir.datatypes.InsurancePlan')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.array(yup.string()))
   public alias? : Array<string>;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Reference.schema()))
   public ownedBy?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public administeredBy?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public coverageArea?: Array<FlatConvectorModel<Reference>>; //Location

   @Validate(yup.lazy(() => yup.array(InsurancePlanContact.schema())))
   public contact?: Array<FlatConvectorModel<InsurancePlanContact>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public endpoint?: Array<FlatConvectorModel<Reference>>; //Endpoint

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public network?: Array<FlatConvectorModel<Reference>>; //Organization

   @Validate(yup.lazy(() => yup.array(InsurancePlanCoverage.schema())))
   public coverage?: Array<FlatConvectorModel<InsurancePlanCoverage>>;

   @Validate(yup.lazy(() => yup.array(InsurancePlanPlan.schema())))
   public plan?: Array<FlatConvectorModel<InsurancePlanPlan>>;

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


export class Library extends DomainResource<Library> {
   @Default('fhir.datatypes.Library')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public subtitle?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subjectCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subjectReference?: FlatConvectorModel<Reference>; //Group

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public usage?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public topic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public author?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public editor?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public reviewer?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public endorser?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.lazy(() => yup.array(ParameterDefinition.schema())))
   public parameter?: Array<FlatConvectorModel<ParameterDefinition>>;

   @Validate(yup.lazy(() => yup.array(DataRequirement.schema())))
   public dataRequirement?: Array<FlatConvectorModel<DataRequirement>>;

//   @Validate(yup.lazy(() => yup.array(Attachment.schema())))
   public content?: Array<FlatConvectorModel<Attachment>>;

}


export class LinkageItem extends BackboneElement {
   @Default('fhir.datatypes.Linkage.LinkageItem')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public resource: FlatConvectorModel<Reference>; //Any

}

export class Linkage extends DomainResource<Linkage> {
   @Default('fhir.datatypes.Linkage')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.boolean())
   public active?: boolean;

   @Validate(yup.lazy(() => Reference.schema()))
   public author?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => yup.array(LinkageItem.schema())))
   public item?: Array<FlatConvectorModel<LinkageItem>>;

}


export class ListEntry extends BackboneElement {
   @Default('fhir.datatypes.List.ListEntry')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public flag?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public deleted?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public item: FlatConvectorModel<Reference>; //Any

}

export class List extends DomainResource<List> {
   @Default('fhir.datatypes.List')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.string())
   public mode: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group|Device|Location

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public source?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Patient|Device

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public orderedBy?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(ListEntry.schema())))
   public entry?: Array<FlatConvectorModel<ListEntry>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public emptyReason?: FlatConvectorModel<CodeableConcept>;

}


export class LocationPosition extends BackboneElement {
   @Default('fhir.datatypes.Location.LocationPosition')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public longitude: number;

   @Required()
   @Validate(yup.number())
   public latitude: number;

   @Validate(yup.number())
   public altitude?: number;

}

export class LocationHoursOfOperation extends BackboneElement {
   @Default('fhir.datatypes.Location.LocationHoursOfOperation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.string()))
   public daysOfWeek? : Array<string>;

   @Validate(yup.boolean())
   public allDay?: boolean;

   @Validate(yup.string())
   public openingTime?: string;

   @Validate(yup.string())
   public closingTime?: string;

}

export class Location extends DomainResource<Location> {
   @Default('fhir.datatypes.Location')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => Coding.schema()))
   public operationalStatus?: FlatConvectorModel<Coding>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.array(yup.string()))
   public alias? : Array<string>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public mode?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.lazy(() => Address.schema()))
   public address?: FlatConvectorModel<Address>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public physicalType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => LocationPosition.schema()))
   public position?: FlatConvectorModel<LocationPosition>;

   @Validate(yup.lazy(() => Reference.schema()))
   public managingOrganization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public partOf?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => yup.array(LocationHoursOfOperation.schema())))
   public hoursOfOperation?: Array<FlatConvectorModel<LocationHoursOfOperation>>;

   @Validate(yup.string())
   public availabilityExceptions?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public endpoint?: Array<FlatConvectorModel<Reference>>; //Endpoint

}


export class MarketingStatus extends DomainResource<MarketingStatus> {
   @Default('fhir.datatypes.MarketingStatus')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public country: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public jurisdiction?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public status: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Period.schema()))
   public dateRange: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public restoreDate?: date;

}


export class MeasureGroup extends BackboneElement {
   @Default('fhir.datatypes.Measure.MeasureGroup')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(MeasureGroupPopulation.schema())))
   public population?: Array<FlatConvectorModel<MeasureGroupPopulation>>;

   @Validate(yup.lazy(() => yup.array(MeasureGroupStratifier.schema())))
   public stratifier?: Array<FlatConvectorModel<MeasureGroupStratifier>>;

}

export class MeasureGroupPopulation extends BackboneElement {
   @Default('fhir.datatypes.Measure.MeasureGroupPopulation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public description?: string;

   @Required()
   @Validate(yup.lazy(() => Expression.schema()))
   public criteria: FlatConvectorModel<Expression>;

}

export class MeasureGroupStratifier extends BackboneElement {
   @Default('fhir.datatypes.Measure.MeasureGroupStratifier')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => Expression.schema()))
   public criteria?: FlatConvectorModel<Expression>;

   @Validate(yup.lazy(() => yup.array(MeasureGroupStratifierComponent.schema())))
   public component?: Array<FlatConvectorModel<MeasureGroupStratifierComponent>>;

}

export class MeasureGroupStratifierComponent extends BackboneElement {
   @Default('fhir.datatypes.Measure.MeasureGroupStratifierComponent')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public description?: string;

   @Required()
   @Validate(yup.lazy(() => Expression.schema()))
   public criteria: FlatConvectorModel<Expression>;

}

export class MeasureSupplementalData extends BackboneElement {
   @Default('fhir.datatypes.Measure.MeasureSupplementalData')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public usage?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public description?: string;

   @Required()
   @Validate(yup.lazy(() => Expression.schema()))
   public criteria: FlatConvectorModel<Expression>;

}

export class Measure extends DomainResource<Measure> {
   @Default('fhir.datatypes.Measure')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public subtitle?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subjectCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subjectReference?: FlatConvectorModel<Reference>; //Group

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public usage?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public topic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public author?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public editor?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public reviewer?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public endorser?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.array(yup.string()))
   public library? : Array<string>; //Library

   @Validate(yup.string())
   public disclaimer?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public scoring?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public compositeScoring?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public riskAdjustment?: string;

   @Validate(yup.string())
   public rateAggregation?: string;

   @Validate(yup.string())
   public rationale?: string;

   @Validate(yup.string())
   public clinicalRecommendationStatement?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public improvementNotation?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.array(yup.string()))
   public definition? : Array<string>;

   @Validate(yup.string())
   public guidance?: string;

   @Validate(yup.lazy(() => yup.array(MeasureGroup.schema())))
   public group?: Array<FlatConvectorModel<MeasureGroup>>;

   @Validate(yup.lazy(() => yup.array(MeasureSupplementalData.schema())))
   public supplementalData?: Array<FlatConvectorModel<MeasureSupplementalData>>;

}


export class MeasureReportGroup extends BackboneElement {
   @Default('fhir.datatypes.MeasureReport.MeasureReportGroup')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(MeasureReportGroupPopulation.schema())))
   public population?: Array<FlatConvectorModel<MeasureReportGroupPopulation>>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public measureScore?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => yup.array(MeasureReportGroupStratifier.schema())))
   public stratifier?: Array<FlatConvectorModel<MeasureReportGroupStratifier>>;

}

export class MeasureReportGroupPopulation extends BackboneElement {
   @Default('fhir.datatypes.MeasureReport.MeasureReportGroupPopulation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public count?: number;

   @Validate(yup.lazy(() => Reference.schema()))
   public subjectResults?: FlatConvectorModel<Reference>; //List

}

export class MeasureReportGroupStratifier extends BackboneElement {
   @Default('fhir.datatypes.MeasureReport.MeasureReportGroupStratifier')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public code?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(MeasureReportGroupStratifierStratum.schema())))
   public stratum?: Array<FlatConvectorModel<MeasureReportGroupStratifierStratum>>;

}

export class MeasureReportGroupStratifierStratum extends BackboneElement {
   @Default('fhir.datatypes.MeasureReport.MeasureReportGroupStratifierStratum')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public value?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(MeasureReportGroupStratifierStratumComponent.schema())))
   public component?: Array<FlatConvectorModel<MeasureReportGroupStratifierStratumComponent>>;

   @Validate(yup.lazy(() => yup.array(MeasureReportGroupStratifierStratumPopulation.schema())))
   public population?: Array<FlatConvectorModel<MeasureReportGroupStratifierStratumPopulation>>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public measureScore?: FlatConvectorModel<Quantity>;

}

export class MeasureReportGroupStratifierStratumComponent extends BackboneElement {
   @Default('fhir.datatypes.MeasureReport.MeasureReportGroupStratifierStratumComponent')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public value: FlatConvectorModel<CodeableConcept>;

}

export class MeasureReportGroupStratifierStratumPopulation extends BackboneElement {
   @Default('fhir.datatypes.MeasureReport.MeasureReportGroupStratifierStratumPopulation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public count?: number;

   @Validate(yup.lazy(() => Reference.schema()))
   public subjectResults?: FlatConvectorModel<Reference>; //List

}

export class MeasureReport extends DomainResource<MeasureReport> {
   @Default('fhir.datatypes.MeasureReport')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Required()
   @Validate(yup.string())
   public measure: string; //Measure

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|Location|Device|RelatedPerson|Group

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public reporter?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Location|Organization

   @Required()
   @Validate(yup.lazy(() => Period.schema()))
   public period: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public improvementNotation?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(MeasureReportGroup.schema())))
   public group?: Array<FlatConvectorModel<MeasureReportGroup>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public evaluatedResource?: Array<FlatConvectorModel<Reference>>; //Any

}


export class Media extends DomainResource<Media> {
   @Default('fhir.datatypes.Media')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //ServiceRequest|CarePlan

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //Any

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public modality?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public view?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|Group|Device|Specimen|Location

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public createdDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public createdPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string())
   public issued?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public operator?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|CareTeam|Patient|Device|RelatedPerson

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public bodySite?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public deviceName?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public device?: FlatConvectorModel<Reference>; //Device|DeviceMetric|Device

   @Validate(yup.number())
   public height?: number;

   @Validate(yup.number())
   public width?: number;

   @Validate(yup.number())
   public frames?: number;

   @Validate(yup.number())
   public duration?: number;

//   @Required()
   @Validate(yup.lazy(() => Attachment.schema()))
   public content: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class MedicationIngredient extends BackboneElement {
   @Default('fhir.datatypes.Medication.MedicationIngredient')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public itemCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public itemReference: FlatConvectorModel<Reference>; //Substance|Medication

   @Validate(yup.boolean())
   public isActive?: boolean;

   @Validate(yup.lazy(() => Ratio.schema()))
   public strength?: FlatConvectorModel<Ratio>;

}

export class MedicationBatch extends BackboneElement {
   @Default('fhir.datatypes.Medication.MedicationBatch')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public lotNumber?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public expirationDate?: date;

}

export class Medication extends DomainResource<Medication> {
   @Default('fhir.datatypes.Medication')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public manufacturer?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public form?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public amount?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => yup.array(MedicationIngredient.schema())))
   public ingredient?: Array<FlatConvectorModel<MedicationIngredient>>;

   @Validate(yup.lazy(() => MedicationBatch.schema()))
   public batch?: FlatConvectorModel<MedicationBatch>;

}


export class MedicationAdministrationPerformer extends BackboneElement {
   @Default('fhir.datatypes.MedicationAdministration.MedicationAdministrationPerformer')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public function_?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public actor: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Patient|RelatedPerson|Device

}

export class MedicationAdministrationDosage extends BackboneElement {
   @Default('fhir.datatypes.MedicationAdministration.MedicationAdministrationDosage')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public text?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public site?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public route?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public method?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public dose?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public rateRatio?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public rateQuantity?: FlatConvectorModel<SimpleQuantity>;

}

export class MedicationAdministration extends DomainResource<MedicationAdministration> {
   @Default('fhir.datatypes.MedicationAdministration')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public instantiates? : Array<string>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //MedicationAdministration|Procedure

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public statusReason?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public medicationCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public medicationReference: FlatConvectorModel<Reference>; //Medication

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public context?: FlatConvectorModel<Reference>; //Encounter|EpisodeOfCare

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingInformation?: Array<FlatConvectorModel<Reference>>; //Any

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public effectiveDateTime: date;

   @Required()
   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(MedicationAdministrationPerformer.schema())))
   public performer?: Array<FlatConvectorModel<MedicationAdministrationPerformer>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport

   @Validate(yup.lazy(() => Reference.schema()))
   public request?: FlatConvectorModel<Reference>; //MedicationRequest

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public device?: Array<FlatConvectorModel<Reference>>; //Device

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => MedicationAdministrationDosage.schema()))
   public dosage?: FlatConvectorModel<MedicationAdministrationDosage>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public eventHistory?: Array<FlatConvectorModel<Reference>>; //Provenance

}


export class MedicationDispensePerformer extends BackboneElement {
   @Default('fhir.datatypes.MedicationDispense.MedicationDispensePerformer')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public function_?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public actor: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|Patient|Device|RelatedPerson

}

export class MedicationDispenseSubstitution extends BackboneElement {
   @Default('fhir.datatypes.MedicationDispense.MedicationDispenseSubstitution')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.boolean())
   public wasSubstituted: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reason?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public responsibleParty?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole

}

export class MedicationDispense extends DomainResource<MedicationDispense> {
   @Default('fhir.datatypes.MedicationDispense')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //Procedure

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public statusReasonCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public statusReasonReference?: FlatConvectorModel<Reference>; //DetectedIssue

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public medicationCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public medicationReference: FlatConvectorModel<Reference>; //Medication

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public context?: FlatConvectorModel<Reference>; //Encounter|EpisodeOfCare

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingInformation?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(MedicationDispensePerformer.schema())))
   public performer?: Array<FlatConvectorModel<MedicationDispensePerformer>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public location?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public authorizingPrescription?: Array<FlatConvectorModel<Reference>>; //MedicationRequest

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public daysSupply?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public whenPrepared?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public whenHandedOver?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public destination?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public receiver?: Array<FlatConvectorModel<Reference>>; //Patient|Practitioner

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(Dosage.schema())))
   public dosageInstruction?: Array<FlatConvectorModel<Dosage>>;

   @Validate(yup.lazy(() => MedicationDispenseSubstitution.schema()))
   public substitution?: FlatConvectorModel<MedicationDispenseSubstitution>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public detectedIssue?: Array<FlatConvectorModel<Reference>>; //DetectedIssue

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public eventHistory?: Array<FlatConvectorModel<Reference>>; //Provenance

}


export class MedicationKnowledgeRelatedMedicationKnowledge extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeRelatedMedicationKnowledge')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reference?: Array<FlatConvectorModel<Reference>>; //MedicationKnowledge

}

export class MedicationKnowledgeMonograph extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeMonograph')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public source?: FlatConvectorModel<Reference>; //DocumentReference|Media

}

export class MedicationKnowledgeIngredient extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeIngredient')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public itemCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public itemReference: FlatConvectorModel<Reference>; //Substance

   @Validate(yup.boolean())
   public isActive?: boolean;

   @Validate(yup.lazy(() => Ratio.schema()))
   public strength?: FlatConvectorModel<Ratio>;

}

export class MedicationKnowledgeCost extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeCost')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public source?: string;

   @Required()
   @Validate(yup.lazy(() => Money.schema()))
   public cost: FlatConvectorModel<Money>;

}

export class MedicationKnowledgeMonitoringProgram extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeMonitoringProgram')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public name?: string;

}

export class MedicationKnowledgeAdministrationGuidelines extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeAdministrationGuidelines')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeAdministrationGuidelinesDosage.schema())))
   public dosage?: Array<FlatConvectorModel<MedicationKnowledgeAdministrationGuidelinesDosage>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public indicationCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public indicationReference?: FlatConvectorModel<Reference>; //ObservationDefinition

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeAdministrationGuidelinesPatientCharacteristics.schema())))
   public patientCharacteristics?: Array<FlatConvectorModel<MedicationKnowledgeAdministrationGuidelinesPatientCharacteristics>>;

}

export class MedicationKnowledgeAdministrationGuidelinesDosage extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeAdministrationGuidelinesDosage')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Dosage.schema())))
   public dosage?: Array<FlatConvectorModel<Dosage>>;

}

export class MedicationKnowledgeAdministrationGuidelinesPatientCharacteristics extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeAdministrationGuidelinesPatientCharacteristics')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public characteristicCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public characteristicQuantity: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.array(yup.string()))
   public value? : Array<string>;

}

export class MedicationKnowledgeMedicineClassification extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeMedicineClassification')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public classification?: Array<FlatConvectorModel<CodeableConcept>>;

}

export class MedicationKnowledgePackaging extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgePackaging')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

}

export class MedicationKnowledgeDrugCharacteristic extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeDrugCharacteristic')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public valueCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public valueString?: string;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public valueQuantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.string())
   public valueBase64Binary?: string;

}

export class MedicationKnowledgeRegulatory extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeRegulatory')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public regulatoryAuthority: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeRegulatorySubstitution.schema())))
   public substitution?: Array<FlatConvectorModel<MedicationKnowledgeRegulatorySubstitution>>;

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeRegulatorySchedule.schema())))
   public schedule?: Array<FlatConvectorModel<MedicationKnowledgeRegulatorySchedule>>;

   @Validate(yup.lazy(() => MedicationKnowledgeRegulatoryMaxDispense.schema()))
   public maxDispense?: FlatConvectorModel<MedicationKnowledgeRegulatoryMaxDispense>;

}

export class MedicationKnowledgeRegulatorySubstitution extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeRegulatorySubstitution')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.boolean())
   public allowed: boolean;

}

export class MedicationKnowledgeRegulatorySchedule extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeRegulatorySchedule')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public schedule: FlatConvectorModel<CodeableConcept>;

}

export class MedicationKnowledgeRegulatoryMaxDispense extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeRegulatoryMaxDispense')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Duration.schema()))
   public period?: FlatConvectorModel<Duration>;

}

export class MedicationKnowledgeKinetics extends BackboneElement {
   @Default('fhir.datatypes.MedicationKnowledge.MedicationKnowledgeKinetics')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(SimpleQuantity.schema())))
   public areaUnderCurve?: Array<FlatConvectorModel<SimpleQuantity>>;

   @Validate(yup.lazy(() => yup.array(SimpleQuantity.schema())))
   public lethalDose50?: Array<FlatConvectorModel<SimpleQuantity>>;

   @Validate(yup.lazy(() => Duration.schema()))
   public halfLifePeriod?: FlatConvectorModel<Duration>;

}

export class MedicationKnowledge extends DomainResource<MedicationKnowledge> {
   @Default('fhir.datatypes.MedicationKnowledge')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public manufacturer?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public doseForm?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public amount?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.array(yup.string()))
   public synonym? : Array<string>;

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeRelatedMedicationKnowledge.schema())))
   public relatedMedicationKnowledge?: Array<FlatConvectorModel<MedicationKnowledgeRelatedMedicationKnowledge>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public associatedMedication?: Array<FlatConvectorModel<Reference>>; //Medication

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public productType?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeMonograph.schema())))
   public monograph?: Array<FlatConvectorModel<MedicationKnowledgeMonograph>>;

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeIngredient.schema())))
   public ingredient?: Array<FlatConvectorModel<MedicationKnowledgeIngredient>>;

   @Validate(yup.string())
   public preparationInstruction?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public intendedRoute?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeCost.schema())))
   public cost?: Array<FlatConvectorModel<MedicationKnowledgeCost>>;

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeMonitoringProgram.schema())))
   public monitoringProgram?: Array<FlatConvectorModel<MedicationKnowledgeMonitoringProgram>>;

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeAdministrationGuidelines.schema())))
   public administrationGuidelines?: Array<FlatConvectorModel<MedicationKnowledgeAdministrationGuidelines>>;

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeMedicineClassification.schema())))
   public medicineClassification?: Array<FlatConvectorModel<MedicationKnowledgeMedicineClassification>>;

   @Validate(yup.lazy(() => MedicationKnowledgePackaging.schema()))
   public packaging?: FlatConvectorModel<MedicationKnowledgePackaging>;

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeDrugCharacteristic.schema())))
   public drugCharacteristic?: Array<FlatConvectorModel<MedicationKnowledgeDrugCharacteristic>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public contraindication?: Array<FlatConvectorModel<Reference>>; //DetectedIssue

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeRegulatory.schema())))
   public regulatory?: Array<FlatConvectorModel<MedicationKnowledgeRegulatory>>;

   @Validate(yup.lazy(() => yup.array(MedicationKnowledgeKinetics.schema())))
   public kinetics?: Array<FlatConvectorModel<MedicationKnowledgeKinetics>>;

}


export class MedicationRequestDispenseRequest extends BackboneElement {
   @Default('fhir.datatypes.MedicationRequest.MedicationRequestDispenseRequest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => MedicationRequestDispenseRequestInitialFill.schema()))
   public initialFill?: FlatConvectorModel<MedicationRequestDispenseRequestInitialFill>;

   @Validate(yup.lazy(() => Duration.schema()))
   public dispenseInterval?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => Period.schema()))
   public validityPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.number())
   public numberOfRepeatsAllowed?: number;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Duration.schema()))
   public expectedSupplyDuration?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => Reference.schema()))
   public performer?: FlatConvectorModel<Reference>; //Organization

}

export class MedicationRequestDispenseRequestInitialFill extends BackboneElement {
   @Default('fhir.datatypes.MedicationRequest.MedicationRequestDispenseRequestInitialFill')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Duration.schema()))
   public duration?: FlatConvectorModel<Duration>;

}

export class MedicationRequestSubstitution extends BackboneElement {
   @Default('fhir.datatypes.MedicationRequest.MedicationRequestSubstitution')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.boolean())
   public allowedBoolean: boolean;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public allowedCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public reason?: FlatConvectorModel<CodeableConcept>;

}

export class MedicationRequest extends DomainResource<MedicationRequest> {
   @Default('fhir.datatypes.MedicationRequest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public statusReason?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public intent: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public priority?: string;

   @Validate(yup.boolean())
   public doNotPerform?: boolean;

   @Validate(yup.boolean())
   public reportedBoolean?: boolean;

   @Validate(yup.lazy(() => Reference.schema()))
   public reportedReference?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|RelatedPerson|Organization

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public medicationCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public medicationReference: FlatConvectorModel<Reference>; //Medication

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingInformation?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public authoredOn?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public requester?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|Patient|RelatedPerson|Device

   @Validate(yup.lazy(() => Reference.schema()))
   public performer?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|Patient|Device|RelatedPerson|CareTeam

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public performerType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public recorder?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation

   @Validate(yup.array(yup.string()))
   public instantiatesCanonical? : Array<string>;

   @Validate(yup.array(yup.string()))
   public instantiatesUri? : Array<string>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //CarePlan|MedicationRequest|ServiceRequest|ImmunizationRecommendation

   @Validate(yup.lazy(() => Identifier.schema()))
   public groupIdentifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public courseOfTherapyType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public insurance?: Array<FlatConvectorModel<Reference>>; //Coverage|ClaimResponse

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(Dosage.schema())))
   public dosageInstruction?: Array<FlatConvectorModel<Dosage>>;

   @Validate(yup.lazy(() => MedicationRequestDispenseRequest.schema()))
   public dispenseRequest?: FlatConvectorModel<MedicationRequestDispenseRequest>;

   @Validate(yup.lazy(() => MedicationRequestSubstitution.schema()))
   public substitution?: FlatConvectorModel<MedicationRequestSubstitution>;

   @Validate(yup.lazy(() => Reference.schema()))
   public priorPrescription?: FlatConvectorModel<Reference>; //MedicationRequest

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public detectedIssue?: Array<FlatConvectorModel<Reference>>; //DetectedIssue

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public eventHistory?: Array<FlatConvectorModel<Reference>>; //Provenance

}


export class MedicationStatement extends DomainResource<MedicationStatement> {
   @Default('fhir.datatypes.MedicationStatement')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //MedicationRequest|CarePlan|ServiceRequest

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //MedicationAdministration|MedicationDispense|MedicationStatement|Procedure|Observation

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public statusReason?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public medicationCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public medicationReference: FlatConvectorModel<Reference>; //Medication

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public context?: FlatConvectorModel<Reference>; //Encounter|EpisodeOfCare

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public effectiveDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public dateAsserted?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public informationSource?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|RelatedPerson|Organization

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public derivedFrom?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(Dosage.schema())))
   public dosage?: Array<FlatConvectorModel<Dosage>>;

}


export class MedicinalProductName extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProduct.MedicinalProductName')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public productName: string;

   @Validate(yup.lazy(() => yup.array(MedicinalProductNameNamePart.schema())))
   public namePart?: Array<FlatConvectorModel<MedicinalProductNameNamePart>>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductNameCountryLanguage.schema())))
   public countryLanguage?: Array<FlatConvectorModel<MedicinalProductNameCountryLanguage>>;

}

export class MedicinalProductNameNamePart extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProduct.MedicinalProductNameNamePart')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public part: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public type_: FlatConvectorModel<Coding>;

}

export class MedicinalProductNameCountryLanguage extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProduct.MedicinalProductNameCountryLanguage')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public country: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public jurisdiction?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public language: FlatConvectorModel<CodeableConcept>;

}

export class MedicinalProductManufacturingBusinessOperation extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProduct.MedicinalProductManufacturingBusinessOperation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public operationType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public authorisationReferenceNumber?: FlatConvectorModel<Identifier>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public effectiveDate?: date;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public confidentialityIndicator?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public manufacturer?: Array<FlatConvectorModel<Reference>>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public regulator?: FlatConvectorModel<Reference>; //Organization

}

export class MedicinalProductSpecialDesignation extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProduct.MedicinalProductSpecialDesignation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public intendedUse?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public indicationCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public indicationReference?: FlatConvectorModel<Reference>; //MedicinalProductIndication

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public status?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public species?: FlatConvectorModel<CodeableConcept>;

}

export class MedicinalProduct extends DomainResource<MedicinalProduct> {
   @Default('fhir.datatypes.MedicinalProduct')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Coding.schema()))
   public domain?: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public combinedPharmaceuticalDoseForm?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public legalStatusOfSupply?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public additionalMonitoringIndicator?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.array(yup.string()))
   public specialMeasures? : Array<string>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public paediatricUseIndicator?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public productClassification?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(MarketingStatus.schema())))
   public marketingStatus?: Array<FlatConvectorModel<MarketingStatus>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public pharmaceuticalProduct?: Array<FlatConvectorModel<Reference>>; //MedicinalProductPharmaceutical

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public packagedMedicinalProduct?: Array<FlatConvectorModel<Reference>>; //MedicinalProductPackaged

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public attachedDocument?: Array<FlatConvectorModel<Reference>>; //DocumentReference

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public masterFile?: Array<FlatConvectorModel<Reference>>; //DocumentReference

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public contact?: Array<FlatConvectorModel<Reference>>; //Organization|PractitionerRole

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public clinicalTrial?: Array<FlatConvectorModel<Reference>>; //ResearchStudy

   @Validate(yup.lazy(() => yup.array(MedicinalProductName.schema())))
   public name?: Array<FlatConvectorModel<MedicinalProductName>>;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public crossReference?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductManufacturingBusinessOperation.schema())))
   public manufacturingBusinessOperation?: Array<FlatConvectorModel<MedicinalProductManufacturingBusinessOperation>>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductSpecialDesignation.schema())))
   public specialDesignation?: Array<FlatConvectorModel<MedicinalProductSpecialDesignation>>;

}


export class MedicinalProductAuthorizationJurisdictionalAuthorization extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductAuthorization.MedicinalProductAuthorizationJurisdictionalAuthorization')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public country?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public legalStatusOfSupply?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Period.schema()))
   public validityPeriod?: FlatConvectorModel<Period>;

}

export class MedicinalProductAuthorizationProcedure extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductAuthorization.MedicinalProductAuthorizationProcedure')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Period.schema()))
   public datePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public dateDateTime?: date;

   @Validate(yup.lazy(() => yup.array(MedicinalProductAuthorizationProcedure.schema())))
   public application?: Array<FlatConvectorModel<MedicinalProductAuthorizationProcedure>>;

}

export class MedicinalProductAuthorization extends DomainResource<MedicinalProductAuthorization> {
   @Default('fhir.datatypes.MedicinalProductAuthorization')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //MedicinalProduct|MedicinalProductPackaged

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public country?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public status?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public statusDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public restoreDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public validityPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Period.schema()))
   public dataExclusivityPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public dateOfFirstAuthorization?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public internationalBirthDate?: date;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public legalBasis?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductAuthorizationJurisdictionalAuthorization.schema())))
   public jurisdictionalAuthorization?: Array<FlatConvectorModel<MedicinalProductAuthorizationJurisdictionalAuthorization>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public holder?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public regulator?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => MedicinalProductAuthorizationProcedure.schema()))
   public procedure?: FlatConvectorModel<MedicinalProductAuthorizationProcedure>;

}


export class MedicinalProductContraindicationOtherTherapy extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductContraindication.MedicinalProductContraindicationOtherTherapy')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public therapyRelationshipType: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public medicationCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public medicationReference: FlatConvectorModel<Reference>; //MedicinalProduct|Medication|Substance|SubstanceSpecification

}

export class MedicinalProductContraindication extends DomainResource<MedicinalProductContraindication> {
   @Default('fhir.datatypes.MedicinalProductContraindication')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public subject?: Array<FlatConvectorModel<Reference>>; //MedicinalProduct|Medication

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public disease?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public diseaseStatus?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public comorbidity?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public therapeuticIndication?: Array<FlatConvectorModel<Reference>>; //MedicinalProductIndication

   @Validate(yup.lazy(() => yup.array(MedicinalProductContraindicationOtherTherapy.schema())))
   public otherTherapy?: Array<FlatConvectorModel<MedicinalProductContraindicationOtherTherapy>>;

   @Validate(yup.lazy(() => yup.array(Population.schema())))
   public population?: Array<FlatConvectorModel<Population>>;

}


export class MedicinalProductIndicationOtherTherapy extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductIndication.MedicinalProductIndicationOtherTherapy')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public therapyRelationshipType: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public medicationCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public medicationReference: FlatConvectorModel<Reference>; //MedicinalProduct|Medication|Substance|SubstanceSpecification

}

export class MedicinalProductIndication extends DomainResource<MedicinalProductIndication> {
   @Default('fhir.datatypes.MedicinalProductIndication')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public subject?: Array<FlatConvectorModel<Reference>>; //MedicinalProduct|Medication

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public diseaseSymptomProcedure?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public diseaseStatus?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public comorbidity?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public intendedEffect?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public duration?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductIndicationOtherTherapy.schema())))
   public otherTherapy?: Array<FlatConvectorModel<MedicinalProductIndicationOtherTherapy>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public undesirableEffect?: Array<FlatConvectorModel<Reference>>; //MedicinalProductUndesirableEffect

   @Validate(yup.lazy(() => yup.array(Population.schema())))
   public population?: Array<FlatConvectorModel<Population>>;

}


export class MedicinalProductIngredientSpecifiedSubstance extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductIngredient.MedicinalProductIngredientSpecifiedSubstance')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public group: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public confidentiality?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductIngredientSpecifiedSubstanceStrength.schema())))
   public strength?: Array<FlatConvectorModel<MedicinalProductIngredientSpecifiedSubstanceStrength>>;

}

export class MedicinalProductIngredientSpecifiedSubstanceStrength extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductIngredient.MedicinalProductIngredientSpecifiedSubstanceStrength')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Ratio.schema()))
   public presentation: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public presentationLowLimit?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public concentration?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public concentrationLowLimit?: FlatConvectorModel<Ratio>;

   @Validate(yup.string())
   public measurementPoint?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public country?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductIngredientSpecifiedSubstanceStrengthReferenceStrength.schema())))
   public referenceStrength?: Array<FlatConvectorModel<MedicinalProductIngredientSpecifiedSubstanceStrengthReferenceStrength>>;

}

export class MedicinalProductIngredientSpecifiedSubstanceStrengthReferenceStrength extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductIngredient.MedicinalProductIngredientSpecifiedSubstanceStrengthReferenceStrength')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public substance?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Ratio.schema()))
   public strength: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public strengthLowLimit?: FlatConvectorModel<Ratio>;

   @Validate(yup.string())
   public measurementPoint?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public country?: Array<FlatConvectorModel<CodeableConcept>>;

}

export class MedicinalProductIngredientSubstance extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductIngredient.MedicinalProductIngredientSubstance')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductIngredientSpecifiedSubstanceStrength.schema())))
   public strength?: Array<FlatConvectorModel<MedicinalProductIngredientSpecifiedSubstanceStrength>>;

}

export class MedicinalProductIngredient extends DomainResource<MedicinalProductIngredient> {
   @Default('fhir.datatypes.MedicinalProductIngredient')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public role: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public allergenicIndicator?: boolean;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public manufacturer?: Array<FlatConvectorModel<Reference>>; //Organization

   @Validate(yup.lazy(() => yup.array(MedicinalProductIngredientSpecifiedSubstance.schema())))
   public specifiedSubstance?: Array<FlatConvectorModel<MedicinalProductIngredientSpecifiedSubstance>>;

   @Validate(yup.lazy(() => MedicinalProductIngredientSubstance.schema()))
   public substance?: FlatConvectorModel<MedicinalProductIngredientSubstance>;

}


export class MedicinalProductInteractionInteractant extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductInteraction.MedicinalProductInteractionInteractant')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public itemReference: FlatConvectorModel<Reference>; //MedicinalProduct|Medication|Substance|ObservationDefinition

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public itemCodeableConcept: FlatConvectorModel<CodeableConcept>;

}

export class MedicinalProductInteraction extends DomainResource<MedicinalProductInteraction> {
   @Default('fhir.datatypes.MedicinalProductInteraction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public subject?: Array<FlatConvectorModel<Reference>>; //MedicinalProduct|Medication|Substance

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(MedicinalProductInteractionInteractant.schema())))
   public interactant?: Array<FlatConvectorModel<MedicinalProductInteractionInteractant>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public effect?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public incidence?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public management?: FlatConvectorModel<CodeableConcept>;

}


export class MedicinalProductManufactured extends DomainResource<MedicinalProductManufactured> {
   @Default('fhir.datatypes.MedicinalProductManufactured')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public manufacturedDoseForm: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public unitOfPresentation?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Quantity.schema()))
   public quantity: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public manufacturer?: Array<FlatConvectorModel<Reference>>; //Organization

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public ingredient?: Array<FlatConvectorModel<Reference>>; //MedicinalProductIngredient

   @Validate(yup.lazy(() => ProdCharacteristic.schema()))
   public physicalCharacteristics?: FlatConvectorModel<ProdCharacteristic>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public otherCharacteristics?: Array<FlatConvectorModel<CodeableConcept>>;

}


export class MedicinalProductPackagedBatchIdentifier extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductPackaged.MedicinalProductPackagedBatchIdentifier')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Identifier.schema()))
   public outerPackaging: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public immediatePackaging?: FlatConvectorModel<Identifier>;

}

export class MedicinalProductPackagedPackageItem extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductPackaged.MedicinalProductPackagedPackageItem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Quantity.schema()))
   public quantity: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public material?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public alternateMaterial?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public device?: Array<FlatConvectorModel<Reference>>; //DeviceDefinition

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public manufacturedItem?: Array<FlatConvectorModel<Reference>>; //MedicinalProductManufactured

   @Validate(yup.lazy(() => yup.array(MedicinalProductPackagedPackageItem.schema())))
   public packageItem?: Array<FlatConvectorModel<MedicinalProductPackagedPackageItem>>;

   @Validate(yup.lazy(() => ProdCharacteristic.schema()))
   public physicalCharacteristics?: FlatConvectorModel<ProdCharacteristic>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public otherCharacteristics?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ProductShelfLife.schema())))
   public shelfLifeStorage?: Array<FlatConvectorModel<ProductShelfLife>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public manufacturer?: Array<FlatConvectorModel<Reference>>; //Organization

}

export class MedicinalProductPackaged extends DomainResource<MedicinalProductPackaged> {
   @Default('fhir.datatypes.MedicinalProductPackaged')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public subject?: Array<FlatConvectorModel<Reference>>; //MedicinalProduct

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public legalStatusOfSupply?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(MarketingStatus.schema())))
   public marketingStatus?: Array<FlatConvectorModel<MarketingStatus>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public marketingAuthorization?: FlatConvectorModel<Reference>; //MedicinalProductAuthorization

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public manufacturer?: Array<FlatConvectorModel<Reference>>; //Organization

   @Validate(yup.lazy(() => yup.array(MedicinalProductPackagedBatchIdentifier.schema())))
   public batchIdentifier?: Array<FlatConvectorModel<MedicinalProductPackagedBatchIdentifier>>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductPackagedPackageItem.schema())))
   public packageItem?: Array<FlatConvectorModel<MedicinalProductPackagedPackageItem>>;

}


export class MedicinalProductPharmaceuticalCharacteristics extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductPharmaceutical.MedicinalProductPharmaceuticalCharacteristics')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public status?: FlatConvectorModel<CodeableConcept>;

}

export class MedicinalProductPharmaceuticalRouteOfAdministration extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductPharmaceutical.MedicinalProductPharmaceuticalRouteOfAdministration')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public firstDose?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public maxSingleDose?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public maxDosePerDay?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public maxDosePerTreatmentPeriod?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => Duration.schema()))
   public maxTreatmentPeriod?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpecies.schema())))
   public targetSpecies?: Array<FlatConvectorModel<MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpecies>>;

}

export class MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpecies extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductPharmaceutical.MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpecies')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpeciesWithdrawalPeriod.schema())))
   public withdrawalPeriod?: Array<FlatConvectorModel<MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpeciesWithdrawalPeriod>>;

}

export class MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpeciesWithdrawalPeriod extends BackboneElement {
   @Default('fhir.datatypes.MedicinalProductPharmaceutical.MedicinalProductPharmaceuticalRouteOfAdministrationTargetSpeciesWithdrawalPeriod')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public tissue: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Quantity.schema()))
   public value: FlatConvectorModel<Quantity>;

   @Validate(yup.string())
   public supportingInformation?: string;

}

export class MedicinalProductPharmaceutical extends DomainResource<MedicinalProductPharmaceutical> {
   @Default('fhir.datatypes.MedicinalProductPharmaceutical')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public administrableDoseForm: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public unitOfPresentation?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public ingredient?: Array<FlatConvectorModel<Reference>>; //MedicinalProductIngredient

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public device?: Array<FlatConvectorModel<Reference>>; //DeviceDefinition

   @Validate(yup.lazy(() => yup.array(MedicinalProductPharmaceuticalCharacteristics.schema())))
   public characteristics?: Array<FlatConvectorModel<MedicinalProductPharmaceuticalCharacteristics>>;

   @Validate(yup.lazy(() => yup.array(MedicinalProductPharmaceuticalRouteOfAdministration.schema())))
   public routeOfAdministration?: Array<FlatConvectorModel<MedicinalProductPharmaceuticalRouteOfAdministration>>;

}


export class MedicinalProductUndesirableEffect extends DomainResource<MedicinalProductUndesirableEffect> {
   @Default('fhir.datatypes.MedicinalProductUndesirableEffect')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public subject?: Array<FlatConvectorModel<Reference>>; //MedicinalProduct|Medication

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public symptomConditionEffect?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public classification?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public frequencyOfOccurrence?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Population.schema())))
   public population?: Array<FlatConvectorModel<Population>>;

}


export class MessageDefinitionFocus extends BackboneElement {
   @Default('fhir.datatypes.MessageDefinition.MessageDefinitionFocus')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.string())
   public profile?: string; //StructureDefinition

   @Required()
   @Validate(yup.number())
   public min: number;

   @Validate(yup.string())
   public max?: string;

}

export class MessageDefinitionAllowedResponse extends BackboneElement {
   @Default('fhir.datatypes.MessageDefinition.MessageDefinitionAllowedResponse')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public message: string; //MessageDefinition

   @Validate(yup.string())
   public situation?: string;

}

export class MessageDefinition extends DomainResource<MessageDefinition> {
   @Default('fhir.datatypes.MessageDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.array(yup.string()))
   public replaces? : Array<string>; //MessageDefinition

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string())
   public base?: string; //MessageDefinition

   @Validate(yup.array(yup.string()))
   public parent? : Array<string>; //ActivityDefinition|PlanDefinition

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public eventCoding: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.string())
   public eventUri: string;

   @Validate(yup.string())
   public category?: string;

   @Validate(yup.lazy(() => yup.array(MessageDefinitionFocus.schema())))
   public focus?: Array<FlatConvectorModel<MessageDefinitionFocus>>;

   @Validate(yup.string())
   public responseRequired?: string;

   @Validate(yup.lazy(() => yup.array(MessageDefinitionAllowedResponse.schema())))
   public allowedResponse?: Array<FlatConvectorModel<MessageDefinitionAllowedResponse>>;

   @Validate(yup.array(yup.string()))
   public graph? : Array<string>; //GraphDefinition

}


export class MessageHeaderDestination extends BackboneElement {
   @Default('fhir.datatypes.MessageHeader.MessageHeaderDestination')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public target?: FlatConvectorModel<Reference>; //Device

   @Required()
   @Validate(yup.string())
   public endpoint: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public receiver?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

}

export class MessageHeaderSource extends BackboneElement {
   @Default('fhir.datatypes.MessageHeader.MessageHeaderSource')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public software?: string;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.lazy(() => ContactPoint.schema()))
   public contact?: FlatConvectorModel<ContactPoint>;

   @Required()
   @Validate(yup.string())
   public endpoint: string;

}

export class MessageHeaderResponse extends BackboneElement {
   @Default('fhir.datatypes.MessageHeader.MessageHeaderResponse')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public identifier: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public details?: FlatConvectorModel<Reference>; //OperationOutcome

}

export class MessageHeader extends DomainResource<MessageHeader> {
   @Default('fhir.datatypes.MessageHeader')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public eventCoding: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.string())
   public eventUri: string;

   @Validate(yup.lazy(() => yup.array(MessageHeaderDestination.schema())))
   public destination?: Array<FlatConvectorModel<MessageHeaderDestination>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public sender?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public enterer?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => Reference.schema()))
   public author?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Required()
   @Validate(yup.lazy(() => MessageHeaderSource.schema()))
   public source: FlatConvectorModel<MessageHeaderSource>;

   @Validate(yup.lazy(() => Reference.schema()))
   public responsible?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public reason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => MessageHeaderResponse.schema()))
   public response?: FlatConvectorModel<MessageHeaderResponse>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public focus?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.string())
   public definition?: string; //MessageDefinition

}


export class MetadataResource extends DomainResource<MetadataResource> {
   @Default('fhir.datatypes.MetadataResource')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

}


export class MolecularSequenceReferenceSeq extends BackboneElement {
   @Default('fhir.datatypes.MolecularSequence.MolecularSequenceReferenceSeq')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public chromosome?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public genomeBuild?: string;

   @Validate(yup.string())
   public orientation?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public referenceSeqId?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public referenceSeqPointer?: FlatConvectorModel<Reference>; //MolecularSequence

   @Validate(yup.string())
   public referenceSeqString?: string;

   @Validate(yup.string())
   public strand?: string;

   @Validate(yup.number())
   public windowStart?: number;

   @Validate(yup.number())
   public windowEnd?: number;

}

export class MolecularSequenceVariant extends BackboneElement {
   @Default('fhir.datatypes.MolecularSequence.MolecularSequenceVariant')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public start?: number;

   @Validate(yup.number())
   public end?: number;

   @Validate(yup.string())
   public observedAllele?: string;

   @Validate(yup.string())
   public referenceAllele?: string;

   @Validate(yup.string())
   public cigar?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public variantPointer?: FlatConvectorModel<Reference>; //Observation

}

export class MolecularSequenceQuality extends BackboneElement {
   @Default('fhir.datatypes.MolecularSequence.MolecularSequenceQuality')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public standardSequence?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public start?: number;

   @Validate(yup.number())
   public end?: number;

   @Validate(yup.lazy(() => Quantity.schema()))
   public score?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public method?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public truthTP?: number;

   @Validate(yup.number())
   public queryTP?: number;

   @Validate(yup.number())
   public truthFN?: number;

   @Validate(yup.number())
   public queryFP?: number;

   @Validate(yup.number())
   public gtFP?: number;

   @Validate(yup.number())
   public precision?: number;

   @Validate(yup.number())
   public recall?: number;

   @Validate(yup.number())
   public fScore?: number;

   @Validate(yup.lazy(() => MolecularSequenceQualityRoc.schema()))
   public roc?: FlatConvectorModel<MolecularSequenceQualityRoc>;

}

export class MolecularSequenceQualityRoc extends BackboneElement {
   @Default('fhir.datatypes.MolecularSequence.MolecularSequenceQualityRoc')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.number()))
   public score? : Array<number>;

   @Validate(yup.array(yup.number()))
   public numTP? : Array<number>;

   @Validate(yup.array(yup.number()))
   public numFP? : Array<number>;

   @Validate(yup.array(yup.number()))
   public numFN? : Array<number>;

   @Validate(yup.array(yup.number()))
   public precision? : Array<number>;

   @Validate(yup.array(yup.number()))
   public sensitivity? : Array<number>;

   @Validate(yup.array(yup.number()))
   public fMeasure? : Array<number>;

}

export class MolecularSequenceRepository extends BackboneElement {
   @Default('fhir.datatypes.MolecularSequence.MolecularSequenceRepository')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public datasetId?: string;

   @Validate(yup.string())
   public variantsetId?: string;

   @Validate(yup.string())
   public readsetId?: string;

}

export class MolecularSequenceStructureVariant extends BackboneElement {
   @Default('fhir.datatypes.MolecularSequence.MolecularSequenceStructureVariant')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public variantType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public exact?: boolean;

   @Validate(yup.number())
   public length?: number;

   @Validate(yup.lazy(() => MolecularSequenceStructureVariantOuter.schema()))
   public outer?: FlatConvectorModel<MolecularSequenceStructureVariantOuter>;

   @Validate(yup.lazy(() => MolecularSequenceStructureVariantInner.schema()))
   public inner?: FlatConvectorModel<MolecularSequenceStructureVariantInner>;

}

export class MolecularSequenceStructureVariantOuter extends BackboneElement {
   @Default('fhir.datatypes.MolecularSequence.MolecularSequenceStructureVariantOuter')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public start?: number;

   @Validate(yup.number())
   public end?: number;

}

export class MolecularSequenceStructureVariantInner extends BackboneElement {
   @Default('fhir.datatypes.MolecularSequence.MolecularSequenceStructureVariantInner')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public start?: number;

   @Validate(yup.number())
   public end?: number;

}

export class MolecularSequence extends DomainResource<MolecularSequence> {
   @Default('fhir.datatypes.MolecularSequence')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public type_?: string;

   @Required()
   @Validate(yup.number())
   public coordinateSystem: number;

   @Validate(yup.lazy(() => Reference.schema()))
   public patient?: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => Reference.schema()))
   public specimen?: FlatConvectorModel<Reference>; //Specimen

   @Validate(yup.lazy(() => Reference.schema()))
   public device?: FlatConvectorModel<Reference>; //Device

   @Validate(yup.lazy(() => Reference.schema()))
   public performer?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Quantity.schema()))
   public quantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => MolecularSequenceReferenceSeq.schema()))
   public referenceSeq?: FlatConvectorModel<MolecularSequenceReferenceSeq>;

   @Validate(yup.lazy(() => yup.array(MolecularSequenceVariant.schema())))
   public variant?: Array<FlatConvectorModel<MolecularSequenceVariant>>;

   @Validate(yup.string())
   public observedSeq?: string;

   @Validate(yup.lazy(() => yup.array(MolecularSequenceQuality.schema())))
   public quality?: Array<FlatConvectorModel<MolecularSequenceQuality>>;

   @Validate(yup.number())
   public readCoverage?: number;

   @Validate(yup.lazy(() => yup.array(MolecularSequenceRepository.schema())))
   public repository?: Array<FlatConvectorModel<MolecularSequenceRepository>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public pointer?: Array<FlatConvectorModel<Reference>>; //MolecularSequence

   @Validate(yup.lazy(() => yup.array(MolecularSequenceStructureVariant.schema())))
   public structureVariant?: Array<FlatConvectorModel<MolecularSequenceStructureVariant>>;

}


export class MoneyQuantity extends DomainResource<MoneyQuantity> {
   @Default('fhir.datatypes.MoneyQuantity')
   @ReadOnly()
   public readonly type: string;

}


export class NamingSystemUniqueId extends BackboneElement {
   @Default('fhir.datatypes.NamingSystem.NamingSystemUniqueId')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Required()
   @Validate(yup.string())
   public value: string;

   @Validate(yup.boolean())
   public preferred?: boolean;

   @Validate(yup.string())
   public comment?: string;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

}

export class NamingSystem extends DomainResource<NamingSystem> {
   @Default('fhir.datatypes.NamingSystem')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.string())
   public kind: string;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public responsible?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public usage?: string;

   @Validate(yup.lazy(() => yup.array(NamingSystemUniqueId.schema())))
   public uniqueId?: Array<FlatConvectorModel<NamingSystemUniqueId>>;

}


export class NutritionOrderOralDiet extends BackboneElement {
   @Default('fhir.datatypes.NutritionOrder.NutritionOrderOralDiet')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Timing.schema())))
   public schedule?: Array<FlatConvectorModel<Timing>>;

   @Validate(yup.lazy(() => yup.array(NutritionOrderOralDietNutrient.schema())))
   public nutrient?: Array<FlatConvectorModel<NutritionOrderOralDietNutrient>>;

   @Validate(yup.lazy(() => yup.array(NutritionOrderOralDietTexture.schema())))
   public texture?: Array<FlatConvectorModel<NutritionOrderOralDietTexture>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public fluidConsistencyType?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public instruction?: string;

}

export class NutritionOrderOralDietNutrient extends BackboneElement {
   @Default('fhir.datatypes.NutritionOrder.NutritionOrderOralDietNutrient')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public modifier?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public amount?: FlatConvectorModel<SimpleQuantity>;

}

export class NutritionOrderOralDietTexture extends BackboneElement {
   @Default('fhir.datatypes.NutritionOrder.NutritionOrderOralDietTexture')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public modifier?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public foodType?: FlatConvectorModel<CodeableConcept>;

}

export class NutritionOrderSupplement extends BackboneElement {
   @Default('fhir.datatypes.NutritionOrder.NutritionOrderSupplement')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public productName?: string;

   @Validate(yup.lazy(() => yup.array(Timing.schema())))
   public schedule?: Array<FlatConvectorModel<Timing>>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.string())
   public instruction?: string;

}

export class NutritionOrderEnteralFormula extends BackboneElement {
   @Default('fhir.datatypes.NutritionOrder.NutritionOrderEnteralFormula')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public baseFormulaType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public baseFormulaProductName?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public additiveType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public additiveProductName?: string;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public caloricDensity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public routeofAdministration?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(NutritionOrderEnteralFormulaAdministration.schema())))
   public administration?: Array<FlatConvectorModel<NutritionOrderEnteralFormulaAdministration>>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public maxVolumeToDeliver?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.string())
   public administrationInstruction?: string;

}

export class NutritionOrderEnteralFormulaAdministration extends BackboneElement {
   @Default('fhir.datatypes.NutritionOrder.NutritionOrderEnteralFormulaAdministration')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Timing.schema()))
   public schedule?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public rateQuantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public rateRatio?: FlatConvectorModel<Ratio>;

}

export class NutritionOrder extends DomainResource<NutritionOrder> {
   @Default('fhir.datatypes.NutritionOrder')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public instantiatesCanonical? : Array<string>; //ActivityDefinition|PlanDefinition

   @Validate(yup.array(yup.string()))
   public instantiatesUri? : Array<string>;

   @Validate(yup.array(yup.string()))
   public instantiates? : Array<string>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.string())
   public intent: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public dateTime: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public orderer?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public allergyIntolerance?: Array<FlatConvectorModel<Reference>>; //AllergyIntolerance

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public foodPreferenceModifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public excludeFoodModifier?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => NutritionOrderOralDiet.schema()))
   public oralDiet?: FlatConvectorModel<NutritionOrderOralDiet>;

   @Validate(yup.lazy(() => yup.array(NutritionOrderSupplement.schema())))
   public supplement?: Array<FlatConvectorModel<NutritionOrderSupplement>>;

   @Validate(yup.lazy(() => NutritionOrderEnteralFormula.schema()))
   public enteralFormula?: FlatConvectorModel<NutritionOrderEnteralFormula>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class ObservationReferenceRange extends BackboneElement {
   @Default('fhir.datatypes.Observation.ObservationReferenceRange')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public low?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public high?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public appliesTo?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Range.schema()))
   public age?: FlatConvectorModel<Range>;

   @Validate(yup.string())
   public text?: string;

}

export class ObservationComponent extends BackboneElement {
   @Default('fhir.datatypes.Observation.ObservationComponent')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public valueCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public valueString?: string;

   @Validate(yup.boolean())
   public valueBoolean?: boolean;

   @Validate(yup.number())
   public valueInteger?: number;

   @Validate(yup.lazy(() => Range.schema()))
   public valueRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public valueRatio?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => SampledData.schema()))
   public valueSampledData?: FlatConvectorModel<SampledData>;

   @Validate(yup.string())
   public valueTime?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public valuePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public dataAbsentReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public interpretation?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ObservationReferenceRange.schema())))
   public referenceRange?: Array<FlatConvectorModel<ObservationReferenceRange>>;

}

export class Observation extends DomainResource<Observation> {
   @Default('fhir.datatypes.Observation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //CarePlan|DeviceRequest|ImmunizationRecommendation|MedicationRequest|NutritionOrder|ServiceRequest

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //MedicationAdministration|MedicationDispense|MedicationStatement|Procedure|Immunization|ImagingStudy

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group|Device|Location

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public focus?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public effectiveDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Timing.schema()))
   public effectiveTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.string())
   public effectiveInstant?: string;

   @Validate(yup.string())
   public issued?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public performer?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Organization|CareTeam|Patient|RelatedPerson

   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public valueCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public valueString?: string;

   @Validate(yup.boolean())
   public valueBoolean?: boolean;

   @Validate(yup.number())
   public valueInteger?: number;

   @Validate(yup.lazy(() => Range.schema()))
   public valueRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public valueRatio?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => SampledData.schema()))
   public valueSampledData?: FlatConvectorModel<SampledData>;

   @Validate(yup.string())
   public valueTime?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public valuePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public dataAbsentReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public interpretation?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public bodySite?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public method?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public specimen?: FlatConvectorModel<Reference>; //Specimen

   @Validate(yup.lazy(() => Reference.schema()))
   public device?: FlatConvectorModel<Reference>; //Device|DeviceMetric

   @Validate(yup.lazy(() => yup.array(ObservationReferenceRange.schema())))
   public referenceRange?: Array<FlatConvectorModel<ObservationReferenceRange>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public hasMember?: Array<FlatConvectorModel<Reference>>; //Observation|QuestionnaireResponse|MolecularSequence

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public derivedFrom?: Array<FlatConvectorModel<Reference>>; //DocumentReference|ImagingStudy|Media|QuestionnaireResponse|Observation|MolecularSequence

   @Validate(yup.lazy(() => yup.array(ObservationComponent.schema())))
   public component?: Array<FlatConvectorModel<ObservationComponent>>;

}


export class ObservationDefinitionQuantitativeDetails extends BackboneElement {
   @Default('fhir.datatypes.ObservationDefinition.ObservationDefinitionQuantitativeDetails')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public customaryUnit?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public unit?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public conversionFactor?: number;

   @Validate(yup.number())
   public decimalPrecision?: number;

}

export class ObservationDefinitionQualifiedInterval extends BackboneElement {
   @Default('fhir.datatypes.ObservationDefinition.ObservationDefinitionQualifiedInterval')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public category?: string;

   @Validate(yup.lazy(() => Range.schema()))
   public range?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public context?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public appliesTo?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public gender?: string;

   @Validate(yup.lazy(() => Range.schema()))
   public age?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Range.schema()))
   public gestationalAge?: FlatConvectorModel<Range>;

   @Validate(yup.string())
   public condition?: string;

}

export class ObservationDefinition extends DomainResource<ObservationDefinition> {
   @Default('fhir.datatypes.ObservationDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public permittedDataType? : Array<string>;

   @Validate(yup.boolean())
   public multipleResultsAllowed?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public method?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public preferredReportName?: string;

   @Validate(yup.lazy(() => ObservationDefinitionQuantitativeDetails.schema()))
   public quantitativeDetails?: FlatConvectorModel<ObservationDefinitionQuantitativeDetails>;

   @Validate(yup.lazy(() => yup.array(ObservationDefinitionQualifiedInterval.schema())))
   public qualifiedInterval?: Array<FlatConvectorModel<ObservationDefinitionQualifiedInterval>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public validCodedValueSet?: FlatConvectorModel<Reference>; //ValueSet

   @Validate(yup.lazy(() => Reference.schema()))
   public normalCodedValueSet?: FlatConvectorModel<Reference>; //ValueSet

   @Validate(yup.lazy(() => Reference.schema()))
   public abnormalCodedValueSet?: FlatConvectorModel<Reference>; //ValueSet

   @Validate(yup.lazy(() => Reference.schema()))
   public criticalCodedValueSet?: FlatConvectorModel<Reference>; //ValueSet

}


export class OperationDefinitionParameter extends BackboneElement {
   @Default('fhir.datatypes.OperationDefinition.OperationDefinitionParameter')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Required()
   @Validate(yup.string())
   public use: string;

   @Required()
   @Validate(yup.number())
   public min: number;

   @Required()
   @Validate(yup.string())
   public max: string;

   @Validate(yup.string())
   public documentation?: string;

   @Validate(yup.string())
   public type_?: string;

   @Validate(yup.array(yup.string()))
   public targetProfile? : Array<string>; //StructureDefinition

   @Validate(yup.string())
   public searchType?: string;

   @Validate(yup.lazy(() => OperationDefinitionParameterBinding.schema()))
   public binding?: FlatConvectorModel<OperationDefinitionParameterBinding>;

   @Validate(yup.lazy(() => yup.array(OperationDefinitionParameterReferencedFrom.schema())))
   public referencedFrom?: Array<FlatConvectorModel<OperationDefinitionParameterReferencedFrom>>;

   @Validate(yup.lazy(() => yup.array(OperationDefinitionParameter.schema())))
   public part?: Array<FlatConvectorModel<OperationDefinitionParameter>>;

}

export class OperationDefinitionParameterBinding extends BackboneElement {
   @Default('fhir.datatypes.OperationDefinition.OperationDefinitionParameterBinding')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public strength: string;

   @Required()
   @Validate(yup.string())
   public valueSet: string; //ValueSet

}

export class OperationDefinitionParameterReferencedFrom extends BackboneElement {
   @Default('fhir.datatypes.OperationDefinition.OperationDefinitionParameterReferencedFrom')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public source: string;

   @Validate(yup.string())
   public sourceId?: string;

}

export class OperationDefinitionOverload extends BackboneElement {
   @Default('fhir.datatypes.OperationDefinition.OperationDefinitionOverload')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.string()))
   public parameterName? : Array<string>;

   @Validate(yup.string())
   public comment?: string;

}

export class OperationDefinition extends DomainResource<OperationDefinition> {
   @Default('fhir.datatypes.OperationDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.string())
   public version?: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.string())
   public kind: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.boolean())
   public affectsState?: boolean;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.string())
   public comment?: string;

   @Validate(yup.string())
   public base?: string; //OperationDefinition

   @Validate(yup.array(yup.string()))
   public resource? : Array<string>;

   @Required()
   @Validate(yup.boolean())
   public system: boolean;

   @Required()
   @Validate(yup.boolean())
   public type_: boolean;

   @Required()
   @Validate(yup.boolean())
   public instance: boolean;

   @Validate(yup.string())
   public inputProfile?: string; //StructureDefinition

   @Validate(yup.string())
   public outputProfile?: string; //StructureDefinition

   @Validate(yup.lazy(() => yup.array(OperationDefinitionParameter.schema())))
   public parameter?: Array<FlatConvectorModel<OperationDefinitionParameter>>;

   @Validate(yup.lazy(() => yup.array(OperationDefinitionOverload.schema())))
   public overload?: Array<FlatConvectorModel<OperationDefinitionOverload>>;

}


export class OperationOutcomeIssue extends BackboneElement {
   @Default('fhir.datatypes.OperationOutcome.OperationOutcomeIssue')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public severity: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public details?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public diagnostics?: string;

   @Validate(yup.array(yup.string()))
   public location? : Array<string>;

   @Validate(yup.array(yup.string()))
   public expression? : Array<string>;

}

export class OperationOutcome extends DomainResource<OperationOutcome> {
   @Default('fhir.datatypes.OperationOutcome')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(OperationOutcomeIssue.schema())))
   public issue?: Array<FlatConvectorModel<OperationOutcomeIssue>>;

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

export class OrganizationAffiliation extends DomainResource<OrganizationAffiliation> {
   @Default('fhir.datatypes.OrganizationAffiliation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.boolean())
   public active?: boolean;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Reference.schema()))
   public organization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public participatingOrganization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public network?: Array<FlatConvectorModel<Reference>>; //Organization

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public code?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public specialty?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public location?: Array<FlatConvectorModel<Reference>>; //Location

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public healthcareService?: Array<FlatConvectorModel<Reference>>; //HealthcareService

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public endpoint?: Array<FlatConvectorModel<Reference>>; //Endpoint

}


export class ParameterDefinition extends DomainResource<ParameterDefinition> {
   @Default('fhir.datatypes.ParameterDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public name?: string;

   @Required()
   @Validate(yup.string())
   public use: string;

   @Validate(yup.number())
   public min?: number;

   @Validate(yup.string())
   public max?: string;

   @Validate(yup.string())
   public documentation?: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public profile?: string; //StructureDefinition

}


export class Parameters extends DomainResource<Parameters> {
   @Default('fhir.datatypes.Parameters')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(ParametersParameter.schema())))
   public parameter?: Array<FlatConvectorModel<ParametersParameter>>;

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


export class PersonLink extends BackboneElement {
   @Default('fhir.datatypes.Person.PersonLink')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public target: FlatConvectorModel<Reference>; //Patient|Practitioner|RelatedPerson|Person

   @Validate(yup.string())
   public assurance?: string;

}

export class Person extends DomainResource<Person> {
   @Default('fhir.datatypes.Person')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(HumanName.schema())))
   public name?: Array<FlatConvectorModel<HumanName>>;

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.string())
   public gender?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public birthDate?: date;

   @Validate(yup.lazy(() => yup.array(Address.schema())))
   public address?: Array<FlatConvectorModel<Address>>;

//   @Validate(yup.lazy(() => Attachment.schema()))
   public photo?: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => Reference.schema()))
   public managingOrganization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.boolean())
   public active?: boolean;

   @Validate(yup.lazy(() => yup.array(PersonLink.schema())))
   public link?: Array<FlatConvectorModel<PersonLink>>;

}


export class PlanDefinitionGoal extends BackboneElement {
   @Default('fhir.datatypes.PlanDefinition.PlanDefinitionGoal')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public description: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public priority?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public start?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public addresses?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public documentation?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.lazy(() => yup.array(PlanDefinitionGoalTarget.schema())))
   public target?: Array<FlatConvectorModel<PlanDefinitionGoalTarget>>;

}

export class PlanDefinitionGoalTarget extends BackboneElement {
   @Default('fhir.datatypes.PlanDefinition.PlanDefinitionGoalTarget')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public measure?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public detailQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Range.schema()))
   public detailRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public detailCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Duration.schema()))
   public due?: FlatConvectorModel<Duration>;

}

export class PlanDefinitionAction extends BackboneElement {
   @Default('fhir.datatypes.PlanDefinition.PlanDefinitionAction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public prefix?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public textEquivalent?: string;

   @Validate(yup.string())
   public priority?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public code?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reason?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public documentation?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.array(yup.string()))
   public goalId? : Array<string>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subjectCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subjectReference?: FlatConvectorModel<Reference>; //Group

   @Validate(yup.lazy(() => yup.array(TriggerDefinition.schema())))
   public trigger?: Array<FlatConvectorModel<TriggerDefinition>>;

   @Validate(yup.lazy(() => yup.array(PlanDefinitionActionCondition.schema())))
   public condition?: Array<FlatConvectorModel<PlanDefinitionActionCondition>>;

   @Validate(yup.lazy(() => yup.array(DataRequirement.schema())))
   public input?: Array<FlatConvectorModel<DataRequirement>>;

   @Validate(yup.lazy(() => yup.array(DataRequirement.schema())))
   public output?: Array<FlatConvectorModel<DataRequirement>>;

   @Validate(yup.lazy(() => yup.array(PlanDefinitionActionRelatedAction.schema())))
   public relatedAction?: Array<FlatConvectorModel<PlanDefinitionActionRelatedAction>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timingDateTime?: date;

   @Validate(yup.lazy(() => Age.schema()))
   public timingAge?: FlatConvectorModel<Age>;

   @Validate(yup.lazy(() => Period.schema()))
   public timingPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Duration.schema()))
   public timingDuration?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => Range.schema()))
   public timingRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Timing.schema()))
   public timingTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => yup.array(PlanDefinitionActionParticipant.schema())))
   public participant?: Array<FlatConvectorModel<PlanDefinitionActionParticipant>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public groupingBehavior?: string;

   @Validate(yup.string())
   public selectionBehavior?: string;

   @Validate(yup.string())
   public requiredBehavior?: string;

   @Validate(yup.string())
   public precheckBehavior?: string;

   @Validate(yup.string())
   public cardinalityBehavior?: string;

   @Validate(yup.string())
   public definitionCanonical?: string; //ActivityDefinition|PlanDefinition|Questionnaire

   @Validate(yup.string())
   public definitionUri?: string;

   @Validate(yup.string())
   public transform?: string; //StructureMap

   @Validate(yup.lazy(() => yup.array(PlanDefinitionActionDynamicValue.schema())))
   public dynamicValue?: Array<FlatConvectorModel<PlanDefinitionActionDynamicValue>>;

   @Validate(yup.lazy(() => yup.array(PlanDefinitionAction.schema())))
   public action?: Array<FlatConvectorModel<PlanDefinitionAction>>;

}

export class PlanDefinitionActionCondition extends BackboneElement {
   @Default('fhir.datatypes.PlanDefinition.PlanDefinitionActionCondition')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public kind: string;

   @Validate(yup.lazy(() => Expression.schema()))
   public expression?: FlatConvectorModel<Expression>;

}

export class PlanDefinitionActionRelatedAction extends BackboneElement {
   @Default('fhir.datatypes.PlanDefinition.PlanDefinitionActionRelatedAction')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public actionId: string;

   @Required()
   @Validate(yup.string())
   public relationship: string;

   @Validate(yup.lazy(() => Duration.schema()))
   public offsetDuration?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => Range.schema()))
   public offsetRange?: FlatConvectorModel<Range>;

}

export class PlanDefinitionActionParticipant extends BackboneElement {
   @Default('fhir.datatypes.PlanDefinition.PlanDefinitionActionParticipant')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public role?: FlatConvectorModel<CodeableConcept>;

}

export class PlanDefinitionActionDynamicValue extends BackboneElement {
   @Default('fhir.datatypes.PlanDefinition.PlanDefinitionActionDynamicValue')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public path?: string;

   @Validate(yup.lazy(() => Expression.schema()))
   public expression?: FlatConvectorModel<Expression>;

}

export class PlanDefinition extends DomainResource<PlanDefinition> {
   @Default('fhir.datatypes.PlanDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public subtitle?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subjectCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subjectReference?: FlatConvectorModel<Reference>; //Group

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public usage?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public topic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public author?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public editor?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public reviewer?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public endorser?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.array(yup.string()))
   public library? : Array<string>; //Library

   @Validate(yup.lazy(() => yup.array(PlanDefinitionGoal.schema())))
   public goal?: Array<FlatConvectorModel<PlanDefinitionGoal>>;

   @Validate(yup.lazy(() => yup.array(PlanDefinitionAction.schema())))
   public action?: Array<FlatConvectorModel<PlanDefinitionAction>>;

}


export class Population extends DomainResource<Population> {
   @Default('fhir.datatypes.Population')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Range.schema()))
   public ageRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public ageCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public gender?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public race?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public physiologicalCondition?: FlatConvectorModel<CodeableConcept>;

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


export class PractitionerRoleAvailableTime extends BackboneElement {
   @Default('fhir.datatypes.PractitionerRole.PractitionerRoleAvailableTime')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.array(yup.string()))
   public daysOfWeek? : Array<string>;

   @Validate(yup.boolean())
   public allDay?: boolean;

   @Validate(yup.string())
   public availableStartTime?: string;

   @Validate(yup.string())
   public availableEndTime?: string;

}

export class PractitionerRoleNotAvailable extends BackboneElement {
   @Default('fhir.datatypes.PractitionerRole.PractitionerRoleNotAvailable')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public description: string;

   @Validate(yup.lazy(() => Period.schema()))
   public during?: FlatConvectorModel<Period>;

}

export class PractitionerRole extends DomainResource<PractitionerRole> {
   @Default('fhir.datatypes.PractitionerRole')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.boolean())
   public active?: boolean;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Reference.schema()))
   public practitioner?: FlatConvectorModel<Reference>; //Practitioner

   @Validate(yup.lazy(() => Reference.schema()))
   public organization?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public code?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public specialty?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public location?: Array<FlatConvectorModel<Reference>>; //Location

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public healthcareService?: Array<FlatConvectorModel<Reference>>; //HealthcareService

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.lazy(() => yup.array(PractitionerRoleAvailableTime.schema())))
   public availableTime?: Array<FlatConvectorModel<PractitionerRoleAvailableTime>>;

   @Validate(yup.lazy(() => yup.array(PractitionerRoleNotAvailable.schema())))
   public notAvailable?: Array<FlatConvectorModel<PractitionerRoleNotAvailable>>;

   @Validate(yup.string())
   public availabilityExceptions?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public endpoint?: Array<FlatConvectorModel<Reference>>; //Endpoint

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
   public instantiatesCanonical? : Array<string>; //PlanDefinition|ActivityDefinition|Measure|OperationDefinition|Questionnaire

   @Validate(yup.array(yup.string()))
   public instantiatesUri? : Array<string>;

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


export class ProdCharacteristic extends DomainResource<ProdCharacteristic> {
   @Default('fhir.datatypes.ProdCharacteristic')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Quantity.schema()))
   public height?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public width?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public depth?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public weight?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public nominalVolume?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public externalDiameter?: FlatConvectorModel<Quantity>;

   @Validate(yup.string())
   public shape?: string;

   @Validate(yup.array(yup.string()))
   public color? : Array<string>;

   @Validate(yup.array(yup.string()))
   public imprint? : Array<string>;

//   @Validate(yup.lazy(() => yup.array(Attachment.schema())))
   public image?: Array<FlatConvectorModel<Attachment>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public scoring?: FlatConvectorModel<CodeableConcept>;

}


export class ProductShelfLife extends DomainResource<ProductShelfLife> {
   @Default('fhir.datatypes.ProductShelfLife')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Quantity.schema()))
   public period: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public specialPrecautionsForStorage?: Array<FlatConvectorModel<CodeableConcept>>;

}


export class ProvenanceAgent extends BackboneElement {
   @Default('fhir.datatypes.Provenance.ProvenanceAgent')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public role?: Array<FlatConvectorModel<CodeableConcept>>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public who: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|RelatedPerson|Patient|Device|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public onBehalfOf?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|RelatedPerson|Patient|Device|Organization

}

export class ProvenanceEntity extends BackboneElement {
   @Default('fhir.datatypes.Provenance.ProvenanceEntity')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public role: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public what: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => yup.array(ProvenanceAgent.schema())))
   public agent?: Array<FlatConvectorModel<ProvenanceAgent>>;

}

export class Provenance extends DomainResource<Provenance> {
   @Default('fhir.datatypes.Provenance')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public target?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => Period.schema()))
   public occurredPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public occurredDateTime?: date;

   @Required()
   @Validate(yup.string())
   public recorded: string;

   @Validate(yup.array(yup.string()))
   public policy? : Array<string>;

   @Validate(yup.lazy(() => Reference.schema()))
   public location?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reason?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public activity?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(ProvenanceAgent.schema())))
   public agent?: Array<FlatConvectorModel<ProvenanceAgent>>;

   @Validate(yup.lazy(() => yup.array(ProvenanceEntity.schema())))
   public entity?: Array<FlatConvectorModel<ProvenanceEntity>>;

   @Validate(yup.lazy(() => yup.array(Signature.schema())))
   public signature?: Array<FlatConvectorModel<Signature>>;

}


export class QuestionnaireItem extends BackboneElement {
   @Default('fhir.datatypes.Questionnaire.QuestionnaireItem')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public linkId: string;

   @Validate(yup.string())
   public definition?: string;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public code?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.string())
   public prefix?: string;

   @Validate(yup.string())
   public text?: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.lazy(() => yup.array(QuestionnaireItemEnableWhen.schema())))
   public enableWhen?: Array<FlatConvectorModel<QuestionnaireItemEnableWhen>>;

   @Validate(yup.string())
   public enableBehavior?: string;

   @Validate(yup.boolean())
   public required?: boolean;

   @Validate(yup.boolean())
   public repeats?: boolean;

   @Validate(yup.boolean())
   public readOnly?: boolean;

   @Validate(yup.number())
   public maxLength?: number;

   @Validate(yup.string())
   public answerValueSet?: string; //ValueSet

   @Validate(yup.lazy(() => yup.array(QuestionnaireItemAnswerOption.schema())))
   public answerOption?: Array<FlatConvectorModel<QuestionnaireItemAnswerOption>>;

   @Validate(yup.lazy(() => yup.array(QuestionnaireItemInitial.schema())))
   public initial?: Array<FlatConvectorModel<QuestionnaireItemInitial>>;

   @Validate(yup.lazy(() => yup.array(QuestionnaireItem.schema())))
   public item?: Array<FlatConvectorModel<QuestionnaireItem>>;

}

export class QuestionnaireItemEnableWhen extends BackboneElement {
   @Default('fhir.datatypes.Questionnaire.QuestionnaireItemEnableWhen')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public question: string;

   @Required()
   @Validate(yup.string())
   public operator: string;

   @Required()
   @Validate(yup.boolean())
   public answerBoolean: boolean;

   @Required()
   @Validate(yup.number())
   public answerDecimal: number;

   @Required()
   @Validate(yup.number())
   public answerInteger: number;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public answerDate: date;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public answerDateTime: date;

   @Required()
   @Validate(yup.string())
   public answerTime: string;

   @Required()
   @Validate(yup.string())
   public answerString: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public answerCoding: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.lazy(() => Quantity.schema()))
   public answerQuantity: FlatConvectorModel<Quantity>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public answerReference: FlatConvectorModel<Reference>; //Any

}

export class QuestionnaireItemAnswerOption extends BackboneElement {
   @Default('fhir.datatypes.Questionnaire.QuestionnaireItemAnswerOption')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public valueInteger: number;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDate: date;

   @Required()
   @Validate(yup.string())
   public valueTime: string;

   @Required()
   @Validate(yup.string())
   public valueString: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public valueCoding: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public valueReference: FlatConvectorModel<Reference>; //Any

   @Validate(yup.boolean())
   public initialSelected?: boolean;

}

export class QuestionnaireItemInitial extends BackboneElement {
   @Default('fhir.datatypes.Questionnaire.QuestionnaireItemInitial')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.boolean())
   public valueBoolean: boolean;

   @Required()
   @Validate(yup.number())
   public valueDecimal: number;

   @Required()
   @Validate(yup.number())
   public valueInteger: number;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDate: date;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDateTime: date;

   @Required()
   @Validate(yup.string())
   public valueTime: string;

   @Required()
   @Validate(yup.string())
   public valueString: string;

   @Required()
   @Validate(yup.string())
   public valueUri: string;

//   @Required()
   @Validate(yup.lazy(() => Attachment.schema()))
   public valueAttachment: FlatConvectorModel<Attachment>;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public valueCoding: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity: FlatConvectorModel<Quantity>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public valueReference: FlatConvectorModel<Reference>; //Any

}

export class Questionnaire extends DomainResource<Questionnaire> {
   @Default('fhir.datatypes.Questionnaire')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.array(yup.string()))
   public derivedFrom? : Array<string>; //Questionnaire

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.array(yup.string()))
   public subjectType? : Array<string>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public code?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.lazy(() => yup.array(QuestionnaireItem.schema())))
   public item?: Array<FlatConvectorModel<QuestionnaireItem>>;

}


export class QuestionnaireResponseItem extends BackboneElement {
   @Default('fhir.datatypes.QuestionnaireResponse.QuestionnaireResponseItem')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public linkId: string;

   @Validate(yup.string())
   public definition?: string;

   @Validate(yup.string())
   public text?: string;

   @Validate(yup.lazy(() => yup.array(QuestionnaireResponseItemAnswer.schema())))
   public answer?: Array<FlatConvectorModel<QuestionnaireResponseItemAnswer>>;

   @Validate(yup.lazy(() => yup.array(QuestionnaireResponseItem.schema())))
   public item?: Array<FlatConvectorModel<QuestionnaireResponseItem>>;

}

export class QuestionnaireResponseItemAnswer extends BackboneElement {
   @Default('fhir.datatypes.QuestionnaireResponse.QuestionnaireResponseItemAnswer')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.boolean())
   public valueBoolean?: boolean;

   @Validate(yup.number())
   public valueDecimal?: number;

   @Validate(yup.number())
   public valueInteger?: number;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDateTime?: date;

   @Validate(yup.string())
   public valueTime?: string;

   @Validate(yup.string())
   public valueString?: string;

   @Validate(yup.string())
   public valueUri?: string;

//   @Validate(yup.lazy(() => Attachment.schema()))
   public valueAttachment?: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => Coding.schema()))
   public valueCoding?: FlatConvectorModel<Coding>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Reference.schema()))
   public valueReference?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => yup.array(QuestionnaireResponseItem.schema())))
   public item?: Array<FlatConvectorModel<QuestionnaireResponseItem>>;

}

export class QuestionnaireResponse extends DomainResource<QuestionnaireResponse> {
   @Default('fhir.datatypes.QuestionnaireResponse')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //CarePlan|ServiceRequest

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //Observation|Procedure

   @Validate(yup.string())
   public questionnaire?: string; //Questionnaire

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public authored?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public author?: FlatConvectorModel<Reference>; //Device|Practitioner|PractitionerRole|Patient|RelatedPerson|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public source?: FlatConvectorModel<Reference>; //Patient|Practitioner|PractitionerRole|RelatedPerson

   @Validate(yup.lazy(() => yup.array(QuestionnaireResponseItem.schema())))
   public item?: Array<FlatConvectorModel<QuestionnaireResponseItem>>;

}


export class RelatedArtifact extends DomainResource<RelatedArtifact> {
   @Default('fhir.datatypes.RelatedArtifact')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public label?: string;

   @Validate(yup.string())
   public display?: string;

   @Validate(yup.string())
   public citation?: string;

   @Validate(yup.string())
   public url?: string;

//   @Validate(yup.lazy(() => Attachment.schema()))
   public document?: FlatConvectorModel<Attachment>;

   @Validate(yup.string())
   public resource?: string; //Any

}


export class RelatedPersonCommunication extends BackboneElement {
   @Default('fhir.datatypes.RelatedPerson.RelatedPersonCommunication')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public language: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public preferred?: boolean;

}

export class RelatedPerson extends DomainResource<RelatedPerson> {
   @Default('fhir.datatypes.RelatedPerson')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.boolean())
   public active?: boolean;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public relationship?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(HumanName.schema())))
   public name?: Array<FlatConvectorModel<HumanName>>;

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public telecom?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.string())
   public gender?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public birthDate?: date;

   @Validate(yup.lazy(() => yup.array(Address.schema())))
   public address?: Array<FlatConvectorModel<Address>>;

//   @Validate(yup.lazy(() => yup.array(Attachment.schema())))
   public photo?: Array<FlatConvectorModel<Attachment>>;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(RelatedPersonCommunication.schema())))
   public communication?: Array<FlatConvectorModel<RelatedPersonCommunication>>;

}


export class RequestGroupAction extends BackboneElement {
   @Default('fhir.datatypes.RequestGroup.RequestGroupAction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public prefix?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public textEquivalent?: string;

   @Validate(yup.string())
   public priority?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public code?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public documentation?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.lazy(() => yup.array(RequestGroupActionCondition.schema())))
   public condition?: Array<FlatConvectorModel<RequestGroupActionCondition>>;

   @Validate(yup.lazy(() => yup.array(RequestGroupActionRelatedAction.schema())))
   public relatedAction?: Array<FlatConvectorModel<RequestGroupActionRelatedAction>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timingDateTime?: date;

   @Validate(yup.lazy(() => Age.schema()))
   public timingAge?: FlatConvectorModel<Age>;

   @Validate(yup.lazy(() => Period.schema()))
   public timingPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Duration.schema()))
   public timingDuration?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => Range.schema()))
   public timingRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Timing.schema()))
   public timingTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public participant?: Array<FlatConvectorModel<Reference>>; //Patient|Practitioner|PractitionerRole|RelatedPerson|Device

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public groupingBehavior?: string;

   @Validate(yup.string())
   public selectionBehavior?: string;

   @Validate(yup.string())
   public requiredBehavior?: string;

   @Validate(yup.string())
   public precheckBehavior?: string;

   @Validate(yup.string())
   public cardinalityBehavior?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public resource?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => yup.array(RequestGroupAction.schema())))
   public action?: Array<FlatConvectorModel<RequestGroupAction>>;

}

export class RequestGroupActionCondition extends BackboneElement {
   @Default('fhir.datatypes.RequestGroup.RequestGroupActionCondition')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public kind: string;

   @Validate(yup.lazy(() => Expression.schema()))
   public expression?: FlatConvectorModel<Expression>;

}

export class RequestGroupActionRelatedAction extends BackboneElement {
   @Default('fhir.datatypes.RequestGroup.RequestGroupActionRelatedAction')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public actionId: string;

   @Required()
   @Validate(yup.string())
   public relationship: string;

   @Validate(yup.lazy(() => Duration.schema()))
   public offsetDuration?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => Range.schema()))
   public offsetRange?: FlatConvectorModel<Range>;

}

export class RequestGroup extends DomainResource<RequestGroup> {
   @Default('fhir.datatypes.RequestGroup')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public instantiatesCanonical? : Array<string>;

   @Validate(yup.array(yup.string()))
   public instantiatesUri? : Array<string>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public replaces?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => Identifier.schema()))
   public groupIdentifier?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.string())
   public intent: string;

   @Validate(yup.string())
   public priority?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public authoredOn?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public author?: FlatConvectorModel<Reference>; //Device|Practitioner|PractitionerRole

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(RequestGroupAction.schema())))
   public action?: Array<FlatConvectorModel<RequestGroupAction>>;

}


export class ResearchDefinition extends DomainResource<ResearchDefinition> {
   @Default('fhir.datatypes.ResearchDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public shortTitle?: string;

   @Validate(yup.string())
   public subtitle?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subjectCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subjectReference?: FlatConvectorModel<Reference>; //Group

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.array(yup.string()))
   public comment? : Array<string>;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public usage?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public topic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public author?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public editor?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public reviewer?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public endorser?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.array(yup.string()))
   public library? : Array<string>; //Library

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public population: FlatConvectorModel<Reference>; //ResearchElementDefinition

   @Validate(yup.lazy(() => Reference.schema()))
   public exposure?: FlatConvectorModel<Reference>; //ResearchElementDefinition

   @Validate(yup.lazy(() => Reference.schema()))
   public exposureAlternative?: FlatConvectorModel<Reference>; //ResearchElementDefinition

   @Validate(yup.lazy(() => Reference.schema()))
   public outcome?: FlatConvectorModel<Reference>; //ResearchElementDefinition

}


export class ResearchElementDefinitionCharacteristic extends BackboneElement {
   @Default('fhir.datatypes.ResearchElementDefinition.ResearchElementDefinitionCharacteristic')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public definitionCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public definitionCanonical: string; //ValueSet

   @Required()
   @Validate(yup.lazy(() => Expression.schema()))
   public definitionExpression: FlatConvectorModel<Expression>;

   @Required()
   @Validate(yup.lazy(() => DataRequirement.schema()))
   public definitionDataRequirement: FlatConvectorModel<DataRequirement>;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public usageContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.boolean())
   public exclude?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public unitOfMeasure?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public studyEffectiveDescription?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public studyEffectiveDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public studyEffectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Duration.schema()))
   public studyEffectiveDuration?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => Timing.schema()))
   public studyEffectiveTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => Duration.schema()))
   public studyEffectiveTimeFromStart?: FlatConvectorModel<Duration>;

   @Validate(yup.string())
   public studyEffectiveGroupMeasure?: string;

   @Validate(yup.string())
   public participantEffectiveDescription?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public participantEffectiveDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public participantEffectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Duration.schema()))
   public participantEffectiveDuration?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => Timing.schema()))
   public participantEffectiveTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => Duration.schema()))
   public participantEffectiveTimeFromStart?: FlatConvectorModel<Duration>;

   @Validate(yup.string())
   public participantEffectiveGroupMeasure?: string;

}

export class ResearchElementDefinition extends DomainResource<ResearchElementDefinition> {
   @Default('fhir.datatypes.ResearchElementDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.string())
   public shortTitle?: string;

   @Validate(yup.string())
   public subtitle?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public subjectCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subjectReference?: FlatConvectorModel<Reference>; //Group

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.array(yup.string()))
   public comment? : Array<string>;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public usage?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public topic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public author?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public editor?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public reviewer?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public endorser?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.array(yup.string()))
   public library? : Array<string>; //Library

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public variableType?: string;

   @Validate(yup.lazy(() => yup.array(ResearchElementDefinitionCharacteristic.schema())))
   public characteristic?: Array<FlatConvectorModel<ResearchElementDefinitionCharacteristic>>;

}


export class ResearchStudyArm extends BackboneElement {
   @Default('fhir.datatypes.ResearchStudy.ResearchStudyArm')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public description?: string;

}

export class ResearchStudyObjective extends BackboneElement {
   @Default('fhir.datatypes.ResearchStudy.ResearchStudyObjective')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

}

export class ResearchStudy extends DomainResource<ResearchStudy> {
   @Default('fhir.datatypes.ResearchStudy')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public title?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public protocol?: Array<FlatConvectorModel<Reference>>; //PlanDefinition

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //ResearchStudy

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public primaryPurposeType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public phase?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public focus?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public condition?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public keyword?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public location?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public enrollment?: Array<FlatConvectorModel<Reference>>; //Group

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Reference.schema()))
   public sponsor?: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public principalInvestigator?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public site?: Array<FlatConvectorModel<Reference>>; //Location

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public reasonStopped?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(ResearchStudyArm.schema())))
   public arm?: Array<FlatConvectorModel<ResearchStudyArm>>;

   @Validate(yup.lazy(() => yup.array(ResearchStudyObjective.schema())))
   public objective?: Array<FlatConvectorModel<ResearchStudyObjective>>;

}


export class ResearchSubject extends DomainResource<ResearchSubject> {
   @Default('fhir.datatypes.ResearchSubject')
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
   @Validate(yup.lazy(() => Reference.schema()))
   public study: FlatConvectorModel<Reference>; //ResearchStudy

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public individual: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.string())
   public assignedArm?: string;

   @Validate(yup.string())
   public actualArm?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public consent?: FlatConvectorModel<Reference>; //Consent

}


export class RiskAssessmentPrediction extends BackboneElement {
   @Default('fhir.datatypes.RiskAssessment.RiskAssessmentPrediction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public outcome?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public probabilityDecimal?: number;

   @Validate(yup.lazy(() => Range.schema()))
   public probabilityRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public qualitativeRisk?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public relativeRisk?: number;

   @Validate(yup.lazy(() => Period.schema()))
   public whenPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Range.schema()))
   public whenRange?: FlatConvectorModel<Range>;

   @Validate(yup.string())
   public rationale?: string;

}

export class RiskAssessment extends DomainResource<RiskAssessment> {
   @Default('fhir.datatypes.RiskAssessment')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public basedOn?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => Reference.schema()))
   public parent?: FlatConvectorModel<Reference>; //Any

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public method?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public occurrenceDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public occurrencePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Reference.schema()))
   public condition?: FlatConvectorModel<Reference>; //Condition

   @Validate(yup.lazy(() => Reference.schema()))
   public performer?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Device

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basis?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(RiskAssessmentPrediction.schema())))
   public prediction?: Array<FlatConvectorModel<RiskAssessmentPrediction>>;

   @Validate(yup.string())
   public mitigation?: string;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class RiskEvidenceSynthesisSampleSize extends BackboneElement {
   @Default('fhir.datatypes.RiskEvidenceSynthesis.RiskEvidenceSynthesisSampleSize')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.number())
   public numberOfStudies?: number;

   @Validate(yup.number())
   public numberOfParticipants?: number;

}

export class RiskEvidenceSynthesisRiskEstimate extends BackboneElement {
   @Default('fhir.datatypes.RiskEvidenceSynthesis.RiskEvidenceSynthesisRiskEstimate')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public value?: number;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public unitOfMeasure?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public denominatorCount?: number;

   @Validate(yup.number())
   public numeratorCount?: number;

   @Validate(yup.lazy(() => yup.array(RiskEvidenceSynthesisRiskEstimatePrecisionEstimate.schema())))
   public precisionEstimate?: Array<FlatConvectorModel<RiskEvidenceSynthesisRiskEstimatePrecisionEstimate>>;

}

export class RiskEvidenceSynthesisRiskEstimatePrecisionEstimate extends BackboneElement {
   @Default('fhir.datatypes.RiskEvidenceSynthesis.RiskEvidenceSynthesisRiskEstimatePrecisionEstimate')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public level?: number;

   @Validate(yup.number())
   public from?: number;

   @Validate(yup.number())
   public to?: number;

}

export class RiskEvidenceSynthesisCertainty extends BackboneElement {
   @Default('fhir.datatypes.RiskEvidenceSynthesis.RiskEvidenceSynthesisCertainty')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public rating?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(RiskEvidenceSynthesisCertaintyCertaintySubcomponent.schema())))
   public certaintySubcomponent?: Array<FlatConvectorModel<RiskEvidenceSynthesisCertaintyCertaintySubcomponent>>;

}

export class RiskEvidenceSynthesisCertaintyCertaintySubcomponent extends BackboneElement {
   @Default('fhir.datatypes.RiskEvidenceSynthesis.RiskEvidenceSynthesisCertaintyCertaintySubcomponent')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public rating?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}

export class RiskEvidenceSynthesis extends DomainResource<RiskEvidenceSynthesis> {
   @Default('fhir.datatypes.RiskEvidenceSynthesis')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public approvalDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastReviewDate?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public effectivePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public topic?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public author?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public editor?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public reviewer?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public endorser?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.lazy(() => yup.array(RelatedArtifact.schema())))
   public relatedArtifact?: Array<FlatConvectorModel<RelatedArtifact>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public synthesisType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public studyType?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public population: FlatConvectorModel<Reference>; //EvidenceVariable

   @Validate(yup.lazy(() => Reference.schema()))
   public exposure?: FlatConvectorModel<Reference>; //EvidenceVariable

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public outcome: FlatConvectorModel<Reference>; //EvidenceVariable

   @Validate(yup.lazy(() => RiskEvidenceSynthesisSampleSize.schema()))
   public sampleSize?: FlatConvectorModel<RiskEvidenceSynthesisSampleSize>;

   @Validate(yup.lazy(() => RiskEvidenceSynthesisRiskEstimate.schema()))
   public riskEstimate?: FlatConvectorModel<RiskEvidenceSynthesisRiskEstimate>;

   @Validate(yup.lazy(() => yup.array(RiskEvidenceSynthesisCertainty.schema())))
   public certainty?: Array<FlatConvectorModel<RiskEvidenceSynthesisCertainty>>;

}


export class Schedule extends DomainResource<Schedule> {
   @Default('fhir.datatypes.Schedule')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.boolean())
   public active?: boolean;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public serviceCategory?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public serviceType?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public specialty?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public actor?: Array<FlatConvectorModel<Reference>>; //Patient|Practitioner|PractitionerRole|RelatedPerson|Device|HealthcareService|Location

   @Validate(yup.lazy(() => Period.schema()))
   public planningHorizon?: FlatConvectorModel<Period>;

   @Validate(yup.string())
   public comment?: string;

}


export class SearchParameterComponent extends BackboneElement {
   @Default('fhir.datatypes.SearchParameter.SearchParameterComponent')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public definition: string; //SearchParameter

   @Required()
   @Validate(yup.string())
   public expression: string;

}

export class SearchParameter extends DomainResource<SearchParameter> {
   @Default('fhir.datatypes.SearchParameter')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public url: string;

   @Validate(yup.string())
   public version?: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public derivedFrom?: string; //SearchParameter

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Required()
   @Validate(yup.string())
   public description: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.array(yup.string()))
   public base? : Array<string>;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public expression?: string;

   @Validate(yup.string())
   public xpath?: string;

   @Validate(yup.string())
   public xpathUsage?: string;

   @Validate(yup.array(yup.string()))
   public target? : Array<string>;

   @Validate(yup.boolean())
   public multipleOr?: boolean;

   @Validate(yup.boolean())
   public multipleAnd?: boolean;

   @Validate(yup.array(yup.string()))
   public comparator? : Array<string>;

   @Validate(yup.array(yup.string()))
   public modifier? : Array<string>;

   @Validate(yup.array(yup.string()))
   public chain? : Array<string>;

   @Validate(yup.lazy(() => yup.array(SearchParameterComponent.schema())))
   public component?: Array<FlatConvectorModel<SearchParameterComponent>>;

}


export class ServiceRequest extends DomainResource<ServiceRequest> {
   @Default('fhir.datatypes.ServiceRequest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public instantiatesCanonical? : Array<string>; //ActivityDefinition|PlanDefinition

   @Validate(yup.array(yup.string()))
   public instantiatesUri? : Array<string>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //CarePlan|ServiceRequest|MedicationRequest

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public replaces?: Array<FlatConvectorModel<Reference>>; //ServiceRequest

   @Validate(yup.lazy(() => Identifier.schema()))
   public requisition?: FlatConvectorModel<Identifier>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.string())
   public intent: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public priority?: string;

   @Validate(yup.boolean())
   public doNotPerform?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public orderDetail?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public quantityQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public quantityRatio?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => Range.schema()))
   public quantityRange?: FlatConvectorModel<Range>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public subject: FlatConvectorModel<Reference>; //Patient|Group|Location|Device

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public occurrenceDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public occurrencePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Timing.schema()))
   public occurrenceTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.boolean())
   public asNeededBoolean?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public asNeededCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public authoredOn?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public requester?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|Patient|RelatedPerson|Device

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public performerType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public performer?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole|Organization|CareTeam|HealthcareService|Patient|Device|RelatedPerson

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public locationCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public locationReference?: Array<FlatConvectorModel<Reference>>; //Location

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public insurance?: Array<FlatConvectorModel<Reference>>; //Coverage|ClaimResponse

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supportingInfo?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public specimen?: Array<FlatConvectorModel<Reference>>; //Specimen

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public bodySite?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.string())
   public patientInstruction?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public relevantHistory?: Array<FlatConvectorModel<Reference>>; //Provenance

}


export class Signature extends DomainResource<Signature> {
   @Default('fhir.datatypes.Signature')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public type_?: Array<FlatConvectorModel<Coding>>;

   @Required()
   @Validate(yup.string())
   public when: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public who: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|RelatedPerson|Patient|Device|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public onBehalfOf?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|RelatedPerson|Patient|Device|Organization

   @Validate(yup.string())
   public targetFormat?: string;

   @Validate(yup.string())
   public sigFormat?: string;

   @Validate(yup.string())
   public data?: string;

}


export class Slot extends DomainResource<Slot> {
   @Default('fhir.datatypes.Slot')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public serviceCategory?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public serviceType?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public specialty?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public appointmentType?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public schedule: FlatConvectorModel<Reference>; //Schedule

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.string())
   public start: string;

   @Required()
   @Validate(yup.string())
   public end: string;

   @Validate(yup.boolean())
   public overbooked?: boolean;

   @Validate(yup.string())
   public comment?: string;

}


export class SpecimenCollection extends BackboneElement {
   @Default('fhir.datatypes.Specimen.SpecimenCollection')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public collector?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public collectedDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public collectedPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Duration.schema()))
   public duration?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public method?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public bodySite?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public fastingStatusCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Duration.schema()))
   public fastingStatusDuration?: FlatConvectorModel<Duration>;

}

export class SpecimenProcessing extends BackboneElement {
   @Default('fhir.datatypes.Specimen.SpecimenProcessing')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public procedure?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public additive?: Array<FlatConvectorModel<Reference>>; //Substance

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timeDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public timePeriod?: FlatConvectorModel<Period>;

}

export class SpecimenContainer extends BackboneElement {
   @Default('fhir.datatypes.Specimen.SpecimenContainer')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public capacity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public specimenQuantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public additiveCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public additiveReference?: FlatConvectorModel<Reference>; //Substance

}

export class Specimen extends DomainResource<Specimen> {
   @Default('fhir.datatypes.Specimen')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public accessionIdentifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public subject?: FlatConvectorModel<Reference>; //Patient|Group|Device|Substance|Location

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public receivedTime?: date;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public parent?: Array<FlatConvectorModel<Reference>>; //Specimen

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public request?: Array<FlatConvectorModel<Reference>>; //ServiceRequest

   @Validate(yup.lazy(() => SpecimenCollection.schema()))
   public collection?: FlatConvectorModel<SpecimenCollection>;

   @Validate(yup.lazy(() => yup.array(SpecimenProcessing.schema())))
   public processing?: Array<FlatConvectorModel<SpecimenProcessing>>;

   @Validate(yup.lazy(() => yup.array(SpecimenContainer.schema())))
   public container?: Array<FlatConvectorModel<SpecimenContainer>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public condition?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}


export class SpecimenDefinitionTypeTested extends BackboneElement {
   @Default('fhir.datatypes.SpecimenDefinition.SpecimenDefinitionTypeTested')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.boolean())
   public isDerived?: boolean;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public preference: string;

   @Validate(yup.lazy(() => SpecimenDefinitionTypeTestedContainer.schema()))
   public container?: FlatConvectorModel<SpecimenDefinitionTypeTestedContainer>;

   @Validate(yup.string())
   public requirement?: string;

   @Validate(yup.lazy(() => Duration.schema()))
   public retentionTime?: FlatConvectorModel<Duration>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public rejectionCriterion?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(SpecimenDefinitionTypeTestedHandling.schema())))
   public handling?: Array<FlatConvectorModel<SpecimenDefinitionTypeTestedHandling>>;

}

export class SpecimenDefinitionTypeTestedContainer extends BackboneElement {
   @Default('fhir.datatypes.SpecimenDefinition.SpecimenDefinitionTypeTestedContainer')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public material?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public cap?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public capacity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public minimumVolumeQuantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.string())
   public minimumVolumeString?: string;

   @Validate(yup.lazy(() => yup.array(SpecimenDefinitionTypeTestedContainerAdditive.schema())))
   public additive?: Array<FlatConvectorModel<SpecimenDefinitionTypeTestedContainerAdditive>>;

   @Validate(yup.string())
   public preparation?: string;

}

export class SpecimenDefinitionTypeTestedContainerAdditive extends BackboneElement {
   @Default('fhir.datatypes.SpecimenDefinition.SpecimenDefinitionTypeTestedContainerAdditive')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public additiveCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public additiveReference: FlatConvectorModel<Reference>; //Substance

}

export class SpecimenDefinitionTypeTestedHandling extends BackboneElement {
   @Default('fhir.datatypes.SpecimenDefinition.SpecimenDefinitionTypeTestedHandling')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public temperatureQualifier?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Range.schema()))
   public temperatureRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Duration.schema()))
   public maxDuration?: FlatConvectorModel<Duration>;

   @Validate(yup.string())
   public instruction?: string;

}

export class SpecimenDefinition extends DomainResource<SpecimenDefinition> {
   @Default('fhir.datatypes.SpecimenDefinition')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public typeCollected?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public patientPreparation?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public timeAspect?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public collection?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(SpecimenDefinitionTypeTested.schema())))
   public typeTested?: Array<FlatConvectorModel<SpecimenDefinitionTypeTested>>;

}


export class StructureDefinitionMapping extends BackboneElement {
   @Default('fhir.datatypes.StructureDefinition.StructureDefinitionMapping')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public identity: string;

   @Validate(yup.string())
   public uri?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public comment?: string;

}

export class StructureDefinitionContext extends BackboneElement {
   @Default('fhir.datatypes.StructureDefinition.StructureDefinitionContext')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Required()
   @Validate(yup.string())
   public expression: string;

}

export class StructureDefinitionSnapshot extends BackboneElement {
   @Default('fhir.datatypes.StructureDefinition.StructureDefinitionSnapshot')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(ElementDefinition.schema())))
   public element?: Array<FlatConvectorModel<ElementDefinition>>;

}

export class StructureDefinitionDifferential extends BackboneElement {
   @Default('fhir.datatypes.StructureDefinition.StructureDefinitionDifferential')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(ElementDefinition.schema())))
   public element?: Array<FlatConvectorModel<ElementDefinition>>;

}

export class StructureDefinition extends DomainResource<StructureDefinition> {
   @Default('fhir.datatypes.StructureDefinition')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public url: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.lazy(() => yup.array(Coding.schema())))
   public keyword?: Array<FlatConvectorModel<Coding>>;

   @Validate(yup.string())
   public fhirVersion?: string;

   @Validate(yup.lazy(() => yup.array(StructureDefinitionMapping.schema())))
   public mapping?: Array<FlatConvectorModel<StructureDefinitionMapping>>;

   @Required()
   @Validate(yup.string())
   public kind: string;

   @Required()
   @Validate(yup.boolean())
   public abstract: boolean;

   @Validate(yup.lazy(() => yup.array(StructureDefinitionContext.schema())))
   public context?: Array<FlatConvectorModel<StructureDefinitionContext>>;

   @Validate(yup.array(yup.string()))
   public contextInvariant? : Array<string>;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public baseDefinition?: string; //StructureDefinition

   @Validate(yup.string())
   public derivation?: string;

   @Validate(yup.lazy(() => StructureDefinitionSnapshot.schema()))
   public snapshot?: FlatConvectorModel<StructureDefinitionSnapshot>;

   @Validate(yup.lazy(() => StructureDefinitionDifferential.schema()))
   public differential?: FlatConvectorModel<StructureDefinitionDifferential>;

}


export class StructureMapStructure extends BackboneElement {
   @Default('fhir.datatypes.StructureMap.StructureMapStructure')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public url: string; //StructureDefinition

   @Required()
   @Validate(yup.string())
   public mode: string;

   @Validate(yup.string())
   public alias?: string;

   @Validate(yup.string())
   public documentation?: string;

}

export class StructureMapGroup extends BackboneElement {
   @Default('fhir.datatypes.StructureMap.StructureMapGroup')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public extends?: string;

   @Required()
   @Validate(yup.string())
   public typeMode: string;

   @Validate(yup.string())
   public documentation?: string;

   @Validate(yup.lazy(() => yup.array(StructureMapGroupInput.schema())))
   public input?: Array<FlatConvectorModel<StructureMapGroupInput>>;

   @Validate(yup.lazy(() => yup.array(StructureMapGroupRule.schema())))
   public rule?: Array<FlatConvectorModel<StructureMapGroupRule>>;

}

export class StructureMapGroupInput extends BackboneElement {
   @Default('fhir.datatypes.StructureMap.StructureMapGroupInput')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public type_?: string;

   @Required()
   @Validate(yup.string())
   public mode: string;

   @Validate(yup.string())
   public documentation?: string;

}

export class StructureMapGroupRule extends BackboneElement {
   @Default('fhir.datatypes.StructureMap.StructureMapGroupRule')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.lazy(() => yup.array(StructureMapGroupRuleSource.schema())))
   public source?: Array<FlatConvectorModel<StructureMapGroupRuleSource>>;

   @Validate(yup.lazy(() => yup.array(StructureMapGroupRuleTarget.schema())))
   public target?: Array<FlatConvectorModel<StructureMapGroupRuleTarget>>;

   @Validate(yup.lazy(() => yup.array(StructureMapGroupRule.schema())))
   public rule?: Array<FlatConvectorModel<StructureMapGroupRule>>;

   @Validate(yup.lazy(() => yup.array(StructureMapGroupRuleDependent.schema())))
   public dependent?: Array<FlatConvectorModel<StructureMapGroupRuleDependent>>;

   @Validate(yup.string())
   public documentation?: string;

}

export class StructureMapGroupRuleSource extends BackboneElement {
   @Default('fhir.datatypes.StructureMap.StructureMapGroupRuleSource')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public context: string;

   @Validate(yup.number())
   public min?: number;

   @Validate(yup.string())
   public max?: string;

   @Validate(yup.string())
   public type_?: string;

   @Validate(yup.string())
   public element?: string;

   @Validate(yup.string())
   public listMode?: string;

   @Validate(yup.string())
   public variable?: string;

   @Validate(yup.string())
   public condition?: string;

   @Validate(yup.string())
   public check?: string;

   @Validate(yup.string())
   public logMessage?: string;

}

export class StructureMapGroupRuleTarget extends BackboneElement {
   @Default('fhir.datatypes.StructureMap.StructureMapGroupRuleTarget')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public context?: string;

   @Validate(yup.string())
   public contextType?: string;

   @Validate(yup.string())
   public element?: string;

   @Validate(yup.string())
   public variable?: string;

   @Validate(yup.array(yup.string()))
   public listMode? : Array<string>;

   @Validate(yup.string())
   public listRuleId?: string;

   @Validate(yup.string())
   public transform?: string;

   @Validate(yup.lazy(() => yup.array(StructureMapGroupRuleTargetParameter.schema())))
   public parameter?: Array<FlatConvectorModel<StructureMapGroupRuleTargetParameter>>;

}

export class StructureMapGroupRuleTargetParameter extends BackboneElement {
   @Default('fhir.datatypes.StructureMap.StructureMapGroupRuleTargetParameter')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public valueId: string;

   @Required()
   @Validate(yup.string())
   public valueString: string;

   @Required()
   @Validate(yup.boolean())
   public valueBoolean: boolean;

   @Required()
   @Validate(yup.number())
   public valueInteger: number;

   @Required()
   @Validate(yup.number())
   public valueDecimal: number;

}

export class StructureMapGroupRuleDependent extends BackboneElement {
   @Default('fhir.datatypes.StructureMap.StructureMapGroupRuleDependent')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.array(yup.string()))
   public variable? : Array<string>;

}

export class StructureMap extends DomainResource<StructureMap> {
   @Default('fhir.datatypes.StructureMap')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public url: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.lazy(() => yup.array(StructureMapStructure.schema())))
   public structure?: Array<FlatConvectorModel<StructureMapStructure>>;

   @Validate(yup.array(yup.string()))
   public import? : Array<string>; //StructureMap

   @Validate(yup.lazy(() => yup.array(StructureMapGroup.schema())))
   public group?: Array<FlatConvectorModel<StructureMapGroup>>;

}


export class SubscriptionChannel extends BackboneElement {
   @Default('fhir.datatypes.Subscription.SubscriptionChannel')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public endpoint?: string;

   @Validate(yup.string())
   public payload?: string;

   @Validate(yup.array(yup.string()))
   public header? : Array<string>;

}

export class Subscription extends DomainResource<Subscription> {
   @Default('fhir.datatypes.Subscription')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => yup.array(ContactPoint.schema())))
   public contact?: Array<FlatConvectorModel<ContactPoint>>;

   @Validate(yup.string())
   public end?: string;

   @Required()
   @Validate(yup.string())
   public reason: string;

   @Required()
   @Validate(yup.string())
   public criteria: string;

   @Validate(yup.string())
   public error?: string;

   @Required()
   @Validate(yup.lazy(() => SubscriptionChannel.schema()))
   public channel: FlatConvectorModel<SubscriptionChannel>;

}


export class SubstanceInstance extends BackboneElement {
   @Default('fhir.datatypes.Substance.SubstanceInstance')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public expiry?: date;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

}

export class SubstanceIngredient extends BackboneElement {
   @Default('fhir.datatypes.Substance.SubstanceIngredient')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Ratio.schema()))
   public quantity?: FlatConvectorModel<Ratio>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public substanceCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public substanceReference: FlatConvectorModel<Reference>; //Substance

}

export class Substance extends DomainResource<Substance> {
   @Default('fhir.datatypes.Substance')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public category?: Array<FlatConvectorModel<CodeableConcept>>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(SubstanceInstance.schema())))
   public instance?: Array<FlatConvectorModel<SubstanceInstance>>;

   @Validate(yup.lazy(() => yup.array(SubstanceIngredient.schema())))
   public ingredient?: Array<FlatConvectorModel<SubstanceIngredient>>;

}


export class SubstanceAmountReferenceRange extends BackboneElement {
   @Default('fhir.datatypes.SubstanceAmount.SubstanceAmountReferenceRange')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Quantity.schema()))
   public lowLimit?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public highLimit?: FlatConvectorModel<Quantity>;

}

export class SubstanceAmount extends DomainResource<SubstanceAmount> {
   @Default('fhir.datatypes.SubstanceAmount')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Quantity.schema()))
   public amountQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Range.schema()))
   public amountRange?: FlatConvectorModel<Range>;

   @Validate(yup.string())
   public amountString?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public amountType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public amountText?: string;

   @Validate(yup.lazy(() => SubstanceAmountReferenceRange.schema()))
   public referenceRange?: FlatConvectorModel<SubstanceAmountReferenceRange>;

}


export class SubstanceNucleicAcidSubunit extends BackboneElement {
   @Default('fhir.datatypes.SubstanceNucleicAcid.SubstanceNucleicAcidSubunit')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public subunit?: number;

   @Validate(yup.string())
   public sequence?: string;

   @Validate(yup.number())
   public length?: number;

//   @Validate(yup.lazy(() => Attachment.schema()))
   public sequenceAttachment?: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public fivePrime?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public threePrime?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(SubstanceNucleicAcidSubunitLinkage.schema())))
   public linkage?: Array<FlatConvectorModel<SubstanceNucleicAcidSubunitLinkage>>;

   @Validate(yup.lazy(() => yup.array(SubstanceNucleicAcidSubunitSugar.schema())))
   public sugar?: Array<FlatConvectorModel<SubstanceNucleicAcidSubunitSugar>>;

}

export class SubstanceNucleicAcidSubunitLinkage extends BackboneElement {
   @Default('fhir.datatypes.SubstanceNucleicAcid.SubstanceNucleicAcidSubunitLinkage')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public connectivity?: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public residueSite?: string;

}

export class SubstanceNucleicAcidSubunitSugar extends BackboneElement {
   @Default('fhir.datatypes.SubstanceNucleicAcid.SubstanceNucleicAcidSubunitSugar')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public residueSite?: string;

}

export class SubstanceNucleicAcid extends DomainResource<SubstanceNucleicAcid> {
   @Default('fhir.datatypes.SubstanceNucleicAcid')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public sequenceType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public numberOfSubunits?: number;

   @Validate(yup.string())
   public areaOfHybridisation?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public oligoNucleotideType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(SubstanceNucleicAcidSubunit.schema())))
   public subunit?: Array<FlatConvectorModel<SubstanceNucleicAcidSubunit>>;

}


export class SubstancePolymerMonomerSet extends BackboneElement {
   @Default('fhir.datatypes.SubstancePolymer.SubstancePolymerMonomerSet')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public ratioType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(SubstancePolymerMonomerSetStartingMaterial.schema())))
   public startingMaterial?: Array<FlatConvectorModel<SubstancePolymerMonomerSetStartingMaterial>>;

}

export class SubstancePolymerMonomerSetStartingMaterial extends BackboneElement {
   @Default('fhir.datatypes.SubstancePolymer.SubstancePolymerMonomerSetStartingMaterial')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public material?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public isDefining?: boolean;

   @Validate(yup.lazy(() => SubstanceAmount.schema()))
   public amount?: FlatConvectorModel<SubstanceAmount>;

}

export class SubstancePolymerRepeat extends BackboneElement {
   @Default('fhir.datatypes.SubstancePolymer.SubstancePolymerRepeat')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public numberOfUnits?: number;

   @Validate(yup.string())
   public averageMolecularFormula?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public repeatUnitAmountType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(SubstancePolymerRepeatRepeatUnit.schema())))
   public repeatUnit?: Array<FlatConvectorModel<SubstancePolymerRepeatRepeatUnit>>;

}

export class SubstancePolymerRepeatRepeatUnit extends BackboneElement {
   @Default('fhir.datatypes.SubstancePolymer.SubstancePolymerRepeatRepeatUnit')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public orientationOfPolymerisation?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public repeatUnit?: string;

   @Validate(yup.lazy(() => SubstanceAmount.schema()))
   public amount?: FlatConvectorModel<SubstanceAmount>;

   @Validate(yup.lazy(() => yup.array(SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisation.schema())))
   public degreeOfPolymerisation?: Array<FlatConvectorModel<SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisation>>;

   @Validate(yup.lazy(() => yup.array(SubstancePolymerRepeatRepeatUnitStructuralRepresentation.schema())))
   public structuralRepresentation?: Array<FlatConvectorModel<SubstancePolymerRepeatRepeatUnitStructuralRepresentation>>;

}

export class SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisation extends BackboneElement {
   @Default('fhir.datatypes.SubstancePolymer.SubstancePolymerRepeatRepeatUnitDegreeOfPolymerisation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public degree?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => SubstanceAmount.schema()))
   public amount?: FlatConvectorModel<SubstanceAmount>;

}

export class SubstancePolymerRepeatRepeatUnitStructuralRepresentation extends BackboneElement {
   @Default('fhir.datatypes.SubstancePolymer.SubstancePolymerRepeatRepeatUnitStructuralRepresentation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public representation?: string;

//   @Validate(yup.lazy(() => Attachment.schema()))
   public attachment?: FlatConvectorModel<Attachment>;

}

export class SubstancePolymer extends DomainResource<SubstancePolymer> {
   @Default('fhir.datatypes.SubstancePolymer')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public class_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public geometry?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public copolymerConnectivity?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.array(yup.string()))
   public modification? : Array<string>;

   @Validate(yup.lazy(() => yup.array(SubstancePolymerMonomerSet.schema())))
   public monomerSet?: Array<FlatConvectorModel<SubstancePolymerMonomerSet>>;

   @Validate(yup.lazy(() => yup.array(SubstancePolymerRepeat.schema())))
   public repeat?: Array<FlatConvectorModel<SubstancePolymerRepeat>>;

}


export class SubstanceProteinSubunit extends BackboneElement {
   @Default('fhir.datatypes.SubstanceProtein.SubstanceProteinSubunit')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public subunit?: number;

   @Validate(yup.string())
   public sequence?: string;

   @Validate(yup.number())
   public length?: number;

//   @Validate(yup.lazy(() => Attachment.schema()))
   public sequenceAttachment?: FlatConvectorModel<Attachment>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public nTerminalModificationId?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public nTerminalModification?: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public cTerminalModificationId?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public cTerminalModification?: string;

}

export class SubstanceProtein extends DomainResource<SubstanceProtein> {
   @Default('fhir.datatypes.SubstanceProtein')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public sequenceType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.number())
   public numberOfSubunits?: number;

   @Validate(yup.array(yup.string()))
   public disulfideLinkage? : Array<string>;

   @Validate(yup.lazy(() => yup.array(SubstanceProteinSubunit.schema())))
   public subunit?: Array<FlatConvectorModel<SubstanceProteinSubunit>>;

}


export class SubstanceReferenceInformationGene extends BackboneElement {
   @Default('fhir.datatypes.SubstanceReferenceInformation.SubstanceReferenceInformationGene')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public geneSequenceOrigin?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public gene?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public source?: Array<FlatConvectorModel<Reference>>; //DocumentReference

}

export class SubstanceReferenceInformationGeneElement extends BackboneElement {
   @Default('fhir.datatypes.SubstanceReferenceInformation.SubstanceReferenceInformationGeneElement')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public element?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public source?: Array<FlatConvectorModel<Reference>>; //DocumentReference

}

export class SubstanceReferenceInformationClassification extends BackboneElement {
   @Default('fhir.datatypes.SubstanceReferenceInformation.SubstanceReferenceInformationClassification')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public domain?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public classification?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public subtype?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public source?: Array<FlatConvectorModel<Reference>>; //DocumentReference

}

export class SubstanceReferenceInformationTarget extends BackboneElement {
   @Default('fhir.datatypes.SubstanceReferenceInformation.SubstanceReferenceInformationTarget')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public target?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public interaction?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public organism?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public organismType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public amountQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Range.schema()))
   public amountRange?: FlatConvectorModel<Range>;

   @Validate(yup.string())
   public amountString?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public amountType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public source?: Array<FlatConvectorModel<Reference>>; //DocumentReference

}

export class SubstanceReferenceInformation extends DomainResource<SubstanceReferenceInformation> {
   @Default('fhir.datatypes.SubstanceReferenceInformation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public comment?: string;

   @Validate(yup.lazy(() => yup.array(SubstanceReferenceInformationGene.schema())))
   public gene?: Array<FlatConvectorModel<SubstanceReferenceInformationGene>>;

   @Validate(yup.lazy(() => yup.array(SubstanceReferenceInformationGeneElement.schema())))
   public geneElement?: Array<FlatConvectorModel<SubstanceReferenceInformationGeneElement>>;

   @Validate(yup.lazy(() => yup.array(SubstanceReferenceInformationClassification.schema())))
   public classification?: Array<FlatConvectorModel<SubstanceReferenceInformationClassification>>;

   @Validate(yup.lazy(() => yup.array(SubstanceReferenceInformationTarget.schema())))
   public target?: Array<FlatConvectorModel<SubstanceReferenceInformationTarget>>;

}


export class SubstanceSourceMaterialFractionDescription extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSourceMaterial.SubstanceSourceMaterialFractionDescription')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public fraction?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public materialType?: FlatConvectorModel<CodeableConcept>;

}

export class SubstanceSourceMaterialOrganism extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSourceMaterial.SubstanceSourceMaterialOrganism')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public family?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public genus?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public species?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public intraspecificType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public intraspecificDescription?: string;

   @Validate(yup.lazy(() => yup.array(SubstanceSourceMaterialOrganismAuthor.schema())))
   public author?: Array<FlatConvectorModel<SubstanceSourceMaterialOrganismAuthor>>;

   @Validate(yup.lazy(() => SubstanceSourceMaterialOrganismHybrid.schema()))
   public hybrid?: FlatConvectorModel<SubstanceSourceMaterialOrganismHybrid>;

   @Validate(yup.lazy(() => SubstanceSourceMaterialOrganismOrganismGeneral.schema()))
   public organismGeneral?: FlatConvectorModel<SubstanceSourceMaterialOrganismOrganismGeneral>;

}

export class SubstanceSourceMaterialOrganismAuthor extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSourceMaterial.SubstanceSourceMaterialOrganismAuthor')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public authorType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public authorDescription?: string;

}

export class SubstanceSourceMaterialOrganismHybrid extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSourceMaterial.SubstanceSourceMaterialOrganismHybrid')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public maternalOrganismId?: string;

   @Validate(yup.string())
   public maternalOrganismName?: string;

   @Validate(yup.string())
   public paternalOrganismId?: string;

   @Validate(yup.string())
   public paternalOrganismName?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public hybridType?: FlatConvectorModel<CodeableConcept>;

}

export class SubstanceSourceMaterialOrganismOrganismGeneral extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSourceMaterial.SubstanceSourceMaterialOrganismOrganismGeneral')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public kingdom?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public phylum?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public class_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public order?: FlatConvectorModel<CodeableConcept>;

}

export class SubstanceSourceMaterialPartDescription extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSourceMaterial.SubstanceSourceMaterialPartDescription')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public part?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public partLocation?: FlatConvectorModel<CodeableConcept>;

}

export class SubstanceSourceMaterial extends DomainResource<SubstanceSourceMaterial> {
   @Default('fhir.datatypes.SubstanceSourceMaterial')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public sourceMaterialClass?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public sourceMaterialType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public sourceMaterialState?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public organismId?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public organismName?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public parentSubstanceId?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.array(yup.string()))
   public parentSubstanceName? : Array<string>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public countryOfOrigin?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.array(yup.string()))
   public geographicalLocation? : Array<string>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public developmentStage?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(SubstanceSourceMaterialFractionDescription.schema())))
   public fractionDescription?: Array<FlatConvectorModel<SubstanceSourceMaterialFractionDescription>>;

   @Validate(yup.lazy(() => SubstanceSourceMaterialOrganism.schema()))
   public organism?: FlatConvectorModel<SubstanceSourceMaterialOrganism>;

   @Validate(yup.lazy(() => yup.array(SubstanceSourceMaterialPartDescription.schema())))
   public partDescription?: Array<FlatConvectorModel<SubstanceSourceMaterialPartDescription>>;

}


export class SubstanceSpecificationMoiety extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSpecification.SubstanceSpecificationMoiety')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public role?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public stereochemistry?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public opticalActivity?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public molecularFormula?: string;

   @Validate(yup.lazy(() => Quantity.schema()))
   public amountQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.string())
   public amountString?: string;

}

export class SubstanceSpecificationProperty extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSpecification.SubstanceSpecificationProperty')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public parameters?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public definingSubstanceReference?: FlatConvectorModel<Reference>; //SubstanceSpecification|Substance

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public definingSubstanceCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public amountQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.string())
   public amountString?: string;

}

export class SubstanceSpecificationStructure extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSpecification.SubstanceSpecificationStructure')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public stereochemistry?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public opticalActivity?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public molecularFormula?: string;

   @Validate(yup.string())
   public molecularFormulaByMoiety?: string;

   @Validate(yup.lazy(() => yup.array(SubstanceSpecificationStructureIsotope.schema())))
   public isotope?: Array<FlatConvectorModel<SubstanceSpecificationStructureIsotope>>;

   @Validate(yup.lazy(() => SubstanceSpecificationStructureIsotopeMolecularWeight.schema()))
   public molecularWeight?: FlatConvectorModel<SubstanceSpecificationStructureIsotopeMolecularWeight>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public source?: Array<FlatConvectorModel<Reference>>; //DocumentReference

   @Validate(yup.lazy(() => yup.array(SubstanceSpecificationStructureRepresentation.schema())))
   public representation?: Array<FlatConvectorModel<SubstanceSpecificationStructureRepresentation>>;

}

export class SubstanceSpecificationStructureIsotope extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSpecification.SubstanceSpecificationStructureIsotope')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public name?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public substitution?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public halfLife?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => SubstanceSpecificationStructureIsotopeMolecularWeight.schema()))
   public molecularWeight?: FlatConvectorModel<SubstanceSpecificationStructureIsotopeMolecularWeight>;

}

export class SubstanceSpecificationStructureIsotopeMolecularWeight extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSpecification.SubstanceSpecificationStructureIsotopeMolecularWeight')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public method?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public amount?: FlatConvectorModel<Quantity>;

}

export class SubstanceSpecificationStructureRepresentation extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSpecification.SubstanceSpecificationStructureRepresentation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public representation?: string;

//   @Validate(yup.lazy(() => Attachment.schema()))
   public attachment?: FlatConvectorModel<Attachment>;

}

export class SubstanceSpecificationCode extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSpecification.SubstanceSpecificationCode')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public status?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public statusDate?: date;

   @Validate(yup.string())
   public comment?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public source?: Array<FlatConvectorModel<Reference>>; //DocumentReference

}

export class SubstanceSpecificationName extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSpecification.SubstanceSpecificationName')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public status?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public preferred?: boolean;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public language?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public domain?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(SubstanceSpecificationName.schema())))
   public synonym?: Array<FlatConvectorModel<SubstanceSpecificationName>>;

   @Validate(yup.lazy(() => yup.array(SubstanceSpecificationName.schema())))
   public translation?: Array<FlatConvectorModel<SubstanceSpecificationName>>;

   @Validate(yup.lazy(() => yup.array(SubstanceSpecificationNameOfficial.schema())))
   public official?: Array<FlatConvectorModel<SubstanceSpecificationNameOfficial>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public source?: Array<FlatConvectorModel<Reference>>; //DocumentReference

}

export class SubstanceSpecificationNameOfficial extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSpecification.SubstanceSpecificationNameOfficial')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public authority?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public status?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

}

export class SubstanceSpecificationRelationship extends BackboneElement {
   @Default('fhir.datatypes.SubstanceSpecification.SubstanceSpecificationRelationship')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public substanceReference?: FlatConvectorModel<Reference>; //SubstanceSpecification

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public substanceCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public relationship?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.boolean())
   public isDefining?: boolean;

   @Validate(yup.lazy(() => Quantity.schema()))
   public amountQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Range.schema()))
   public amountRange?: FlatConvectorModel<Range>;

   @Validate(yup.lazy(() => Ratio.schema()))
   public amountRatio?: FlatConvectorModel<Ratio>;

   @Validate(yup.string())
   public amountString?: string;

   @Validate(yup.lazy(() => Ratio.schema()))
   public amountRatioLowLimit?: FlatConvectorModel<Ratio>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public amountType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public source?: Array<FlatConvectorModel<Reference>>; //DocumentReference

}

export class SubstanceSpecification extends DomainResource<SubstanceSpecification> {
   @Default('fhir.datatypes.SubstanceSpecification')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public status?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public domain?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public source?: Array<FlatConvectorModel<Reference>>; //DocumentReference

   @Validate(yup.string())
   public comment?: string;

   @Validate(yup.lazy(() => yup.array(SubstanceSpecificationMoiety.schema())))
   public moiety?: Array<FlatConvectorModel<SubstanceSpecificationMoiety>>;

   @Validate(yup.lazy(() => yup.array(SubstanceSpecificationProperty.schema())))
   public property?: Array<FlatConvectorModel<SubstanceSpecificationProperty>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public referenceInformation?: FlatConvectorModel<Reference>; //SubstanceReferenceInformation

   @Validate(yup.lazy(() => SubstanceSpecificationStructure.schema()))
   public structure?: FlatConvectorModel<SubstanceSpecificationStructure>;

   @Validate(yup.lazy(() => yup.array(SubstanceSpecificationCode.schema())))
   public code?: Array<FlatConvectorModel<SubstanceSpecificationCode>>;

   @Validate(yup.lazy(() => yup.array(SubstanceSpecificationName.schema())))
   public name?: Array<FlatConvectorModel<SubstanceSpecificationName>>;

   @Validate(yup.lazy(() => yup.array(SubstanceSpecificationStructureIsotopeMolecularWeight.schema())))
   public molecularWeight?: Array<FlatConvectorModel<SubstanceSpecificationStructureIsotopeMolecularWeight>>;

   @Validate(yup.lazy(() => yup.array(SubstanceSpecificationRelationship.schema())))
   public relationship?: Array<FlatConvectorModel<SubstanceSpecificationRelationship>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public nucleicAcid?: FlatConvectorModel<Reference>; //SubstanceNucleicAcid

   @Validate(yup.lazy(() => Reference.schema()))
   public polymer?: FlatConvectorModel<Reference>; //SubstancePolymer

   @Validate(yup.lazy(() => Reference.schema()))
   public protein?: FlatConvectorModel<Reference>; //SubstanceProtein

   @Validate(yup.lazy(() => Reference.schema()))
   public sourceMaterial?: FlatConvectorModel<Reference>; //SubstanceSourceMaterial

}


export class SupplyDeliverySuppliedItem extends BackboneElement {
   @Default('fhir.datatypes.SupplyDelivery.SupplyDeliverySuppliedItem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public quantity?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public itemCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public itemReference?: FlatConvectorModel<Reference>; //Medication|Substance|Device

}

export class SupplyDelivery extends DomainResource<SupplyDelivery> {
   @Default('fhir.datatypes.SupplyDelivery')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //SupplyRequest

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //SupplyDelivery|Contract

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public patient?: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => SupplyDeliverySuppliedItem.schema()))
   public suppliedItem?: FlatConvectorModel<SupplyDeliverySuppliedItem>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public occurrenceDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public occurrencePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Timing.schema()))
   public occurrenceTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => Reference.schema()))
   public supplier?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public destination?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public receiver?: Array<FlatConvectorModel<Reference>>; //Practitioner|PractitionerRole

}


export class SupplyRequestParameter extends BackboneElement {
   @Default('fhir.datatypes.SupplyRequest.SupplyRequestParameter')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public valueCodeableConcept?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity?: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => Range.schema()))
   public valueRange?: FlatConvectorModel<Range>;

   @Validate(yup.boolean())
   public valueBoolean?: boolean;

}

export class SupplyRequest extends DomainResource<SupplyRequest> {
   @Default('fhir.datatypes.SupplyRequest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public status?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public category?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public priority?: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public itemCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public itemReference: FlatConvectorModel<Reference>; //Medication|Substance|Device

   @Required()
   @Validate(yup.lazy(() => Quantity.schema()))
   public quantity: FlatConvectorModel<Quantity>;

   @Validate(yup.lazy(() => yup.array(SupplyRequestParameter.schema())))
   public parameter?: Array<FlatConvectorModel<SupplyRequestParameter>>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public occurrenceDateTime?: date;

   @Validate(yup.lazy(() => Period.schema()))
   public occurrencePeriod?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => Timing.schema()))
   public occurrenceTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public authoredOn?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public requester?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|Patient|RelatedPerson|Device

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public supplier?: Array<FlatConvectorModel<Reference>>; //Organization|HealthcareService

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public reasonCode?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public reasonReference?: Array<FlatConvectorModel<Reference>>; //Condition|Observation|DiagnosticReport|DocumentReference

   @Validate(yup.lazy(() => Reference.schema()))
   public deliverFrom?: FlatConvectorModel<Reference>; //Organization|Location

   @Validate(yup.lazy(() => Reference.schema()))
   public deliverTo?: FlatConvectorModel<Reference>; //Organization|Location|Patient

}


export class TaskRestriction extends BackboneElement {
   @Default('fhir.datatypes.Task.TaskRestriction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.number())
   public repetitions?: number;

   @Validate(yup.lazy(() => Period.schema()))
   public period?: FlatConvectorModel<Period>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public recipient?: Array<FlatConvectorModel<Reference>>; //Patient|Practitioner|PractitionerRole|RelatedPerson|Group|Organization

}

export class TaskInput extends BackboneElement {
   @Default('fhir.datatypes.Task.TaskInput')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

}

export class TaskOutput extends BackboneElement {
   @Default('fhir.datatypes.Task.TaskOutput')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public type_: FlatConvectorModel<CodeableConcept>;

}

export class Task extends DomainResource<Task> {
   @Default('fhir.datatypes.Task')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public instantiatesCanonical?: string; //ActivityDefinition

   @Validate(yup.string())
   public instantiatesUri?: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public basedOn?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => Identifier.schema()))
   public groupIdentifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public partOf?: Array<FlatConvectorModel<Reference>>; //Task

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public statusReason?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public businessStatus?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public intent: string;

   @Validate(yup.string())
   public priority?: string;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public code?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public focus?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => Reference.schema()))
   public for?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Validate(yup.lazy(() => Period.schema()))
   public executionPeriod?: FlatConvectorModel<Period>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public authoredOn?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastModified?: date;

   @Validate(yup.lazy(() => Reference.schema()))
   public requester?: FlatConvectorModel<Reference>; //Device|Organization|Patient|Practitioner|PractitionerRole|RelatedPerson

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public performerType?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Reference.schema()))
   public owner?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization|CareTeam|HealthcareService|Patient|Device|RelatedPerson

   @Validate(yup.lazy(() => Reference.schema()))
   public location?: FlatConvectorModel<Reference>; //Location

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public reasonCode?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => Reference.schema()))
   public reasonReference?: FlatConvectorModel<Reference>; //Any

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public insurance?: Array<FlatConvectorModel<Reference>>; //Coverage|ClaimResponse

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public relevantHistory?: Array<FlatConvectorModel<Reference>>; //Provenance

   @Validate(yup.lazy(() => TaskRestriction.schema()))
   public restriction?: FlatConvectorModel<TaskRestriction>;

   @Validate(yup.lazy(() => yup.array(TaskInput.schema())))
   public input?: Array<FlatConvectorModel<TaskInput>>;

   @Validate(yup.lazy(() => yup.array(TaskOutput.schema())))
   public output?: Array<FlatConvectorModel<TaskOutput>>;

}


export class TerminologyCapabilitiesSoftware extends BackboneElement {
   @Default('fhir.datatypes.TerminologyCapabilities.TerminologyCapabilitiesSoftware')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public version?: string;

}

export class TerminologyCapabilitiesImplementation extends BackboneElement {
   @Default('fhir.datatypes.TerminologyCapabilities.TerminologyCapabilitiesImplementation')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public description: string;

   @Validate(yup.string())
   public url?: string;

}

export class TerminologyCapabilitiesCodeSystem extends BackboneElement {
   @Default('fhir.datatypes.TerminologyCapabilities.TerminologyCapabilitiesCodeSystem')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public uri?: string; //CodeSystem

   @Validate(yup.lazy(() => yup.array(TerminologyCapabilitiesCodeSystemVersion.schema())))
   public version?: Array<FlatConvectorModel<TerminologyCapabilitiesCodeSystemVersion>>;

   @Validate(yup.boolean())
   public subsumption?: boolean;

}

export class TerminologyCapabilitiesCodeSystemVersion extends BackboneElement {
   @Default('fhir.datatypes.TerminologyCapabilities.TerminologyCapabilitiesCodeSystemVersion')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public code?: string;

   @Validate(yup.boolean())
   public isDefault?: boolean;

   @Validate(yup.boolean())
   public compositional?: boolean;

   @Validate(yup.array(yup.string()))
   public language? : Array<string>;

   @Validate(yup.lazy(() => yup.array(TerminologyCapabilitiesCodeSystemVersionFilter.schema())))
   public filter?: Array<FlatConvectorModel<TerminologyCapabilitiesCodeSystemVersionFilter>>;

   @Validate(yup.array(yup.string()))
   public property? : Array<string>;

}

export class TerminologyCapabilitiesCodeSystemVersionFilter extends BackboneElement {
   @Default('fhir.datatypes.TerminologyCapabilities.TerminologyCapabilitiesCodeSystemVersionFilter')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.array(yup.string()))
   public op? : Array<string>;

}

export class TerminologyCapabilitiesExpansion extends BackboneElement {
   @Default('fhir.datatypes.TerminologyCapabilities.TerminologyCapabilitiesExpansion')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.boolean())
   public hierarchical?: boolean;

   @Validate(yup.boolean())
   public paging?: boolean;

   @Validate(yup.boolean())
   public incomplete?: boolean;

   @Validate(yup.lazy(() => yup.array(TerminologyCapabilitiesExpansionParameter.schema())))
   public parameter?: Array<FlatConvectorModel<TerminologyCapabilitiesExpansionParameter>>;

   @Validate(yup.string())
   public textFilter?: string;

}

export class TerminologyCapabilitiesExpansionParameter extends BackboneElement {
   @Default('fhir.datatypes.TerminologyCapabilities.TerminologyCapabilitiesExpansionParameter')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public documentation?: string;

}

export class TerminologyCapabilitiesValidateCode extends BackboneElement {
   @Default('fhir.datatypes.TerminologyCapabilities.TerminologyCapabilitiesValidateCode')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.boolean())
   public translations: boolean;

}

export class TerminologyCapabilitiesTranslation extends BackboneElement {
   @Default('fhir.datatypes.TerminologyCapabilities.TerminologyCapabilitiesTranslation')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.boolean())
   public needsMap: boolean;

}

export class TerminologyCapabilitiesClosure extends BackboneElement {
   @Default('fhir.datatypes.TerminologyCapabilities.TerminologyCapabilitiesClosure')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.boolean())
   public translation?: boolean;

}

export class TerminologyCapabilities extends DomainResource<TerminologyCapabilities> {
   @Default('fhir.datatypes.TerminologyCapabilities')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Required()
   @Validate(yup.string())
   public kind: string;

   @Validate(yup.lazy(() => TerminologyCapabilitiesSoftware.schema()))
   public software?: FlatConvectorModel<TerminologyCapabilitiesSoftware>;

   @Validate(yup.lazy(() => TerminologyCapabilitiesImplementation.schema()))
   public implementation?: FlatConvectorModel<TerminologyCapabilitiesImplementation>;

   @Validate(yup.boolean())
   public lockedDate?: boolean;

   @Validate(yup.lazy(() => yup.array(TerminologyCapabilitiesCodeSystem.schema())))
   public codeSystem?: Array<FlatConvectorModel<TerminologyCapabilitiesCodeSystem>>;

   @Validate(yup.lazy(() => TerminologyCapabilitiesExpansion.schema()))
   public expansion?: FlatConvectorModel<TerminologyCapabilitiesExpansion>;

   @Validate(yup.string())
   public codeSearch?: string;

   @Validate(yup.lazy(() => TerminologyCapabilitiesValidateCode.schema()))
   public validateCode?: FlatConvectorModel<TerminologyCapabilitiesValidateCode>;

   @Validate(yup.lazy(() => TerminologyCapabilitiesTranslation.schema()))
   public translation?: FlatConvectorModel<TerminologyCapabilitiesTranslation>;

   @Validate(yup.lazy(() => TerminologyCapabilitiesClosure.schema()))
   public closure?: FlatConvectorModel<TerminologyCapabilitiesClosure>;

}


export class TestReportParticipant extends BackboneElement {
   @Default('fhir.datatypes.TestReport.TestReportParticipant')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Required()
   @Validate(yup.string())
   public uri: string;

   @Validate(yup.string())
   public display?: string;

}

export class TestReportSetup extends BackboneElement {
   @Default('fhir.datatypes.TestReport.TestReportSetup')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(TestReportSetupAction.schema())))
   public action?: Array<FlatConvectorModel<TestReportSetupAction>>;

}

export class TestReportSetupAction extends BackboneElement {
   @Default('fhir.datatypes.TestReport.TestReportSetupAction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => TestReportSetupActionOperation.schema()))
   public operation?: FlatConvectorModel<TestReportSetupActionOperation>;

   @Validate(yup.lazy(() => TestReportSetupActionAssert.schema()))
   public assert?: FlatConvectorModel<TestReportSetupActionAssert>;

}

export class TestReportSetupActionOperation extends BackboneElement {
   @Default('fhir.datatypes.TestReport.TestReportSetupActionOperation')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public result: string;

   @Validate(yup.string())
   public message?: string;

   @Validate(yup.string())
   public detail?: string;

}

export class TestReportSetupActionAssert extends BackboneElement {
   @Default('fhir.datatypes.TestReport.TestReportSetupActionAssert')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public result: string;

   @Validate(yup.string())
   public message?: string;

   @Validate(yup.string())
   public detail?: string;

}

export class TestReportTest extends BackboneElement {
   @Default('fhir.datatypes.TestReport.TestReportTest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(TestReportTestAction.schema())))
   public action?: Array<FlatConvectorModel<TestReportTestAction>>;

}

export class TestReportTestAction extends BackboneElement {
   @Default('fhir.datatypes.TestReport.TestReportTestAction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => TestReportSetupActionOperation.schema()))
   public operation?: FlatConvectorModel<TestReportSetupActionOperation>;

   @Validate(yup.lazy(() => TestReportSetupActionAssert.schema()))
   public assert?: FlatConvectorModel<TestReportSetupActionAssert>;

}

export class TestReportTeardown extends BackboneElement {
   @Default('fhir.datatypes.TestReport.TestReportTeardown')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(TestReportTeardownAction.schema())))
   public action?: Array<FlatConvectorModel<TestReportTeardownAction>>;

}

export class TestReportTeardownAction extends BackboneElement {
   @Default('fhir.datatypes.TestReport.TestReportTeardownAction')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => TestReportSetupActionOperation.schema()))
   public operation: FlatConvectorModel<TestReportSetupActionOperation>;

}

export class TestReport extends DomainResource<TestReport> {
   @Default('fhir.datatypes.TestReport')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public name?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public testScript: FlatConvectorModel<Reference>; //TestScript

   @Required()
   @Validate(yup.string())
   public result: string;

   @Validate(yup.number())
   public score?: number;

   @Validate(yup.string())
   public tester?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public issued?: date;

   @Validate(yup.lazy(() => yup.array(TestReportParticipant.schema())))
   public participant?: Array<FlatConvectorModel<TestReportParticipant>>;

   @Validate(yup.lazy(() => TestReportSetup.schema()))
   public setup?: FlatConvectorModel<TestReportSetup>;

   @Validate(yup.lazy(() => yup.array(TestReportTest.schema())))
   public test?: Array<FlatConvectorModel<TestReportTest>>;

   @Validate(yup.lazy(() => TestReportTeardown.schema()))
   public teardown?: FlatConvectorModel<TestReportTeardown>;

}


export class TestScriptOrigin extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptOrigin')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public index: number;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public profile: FlatConvectorModel<Coding>;

}

export class TestScriptDestination extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptDestination')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public index: number;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public profile: FlatConvectorModel<Coding>;

}

export class TestScriptMetadata extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptMetadata')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(TestScriptMetadataLink.schema())))
   public link?: Array<FlatConvectorModel<TestScriptMetadataLink>>;

   @Validate(yup.lazy(() => yup.array(TestScriptMetadataCapability.schema())))
   public capability?: Array<FlatConvectorModel<TestScriptMetadataCapability>>;

}

export class TestScriptMetadataLink extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptMetadataLink')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public url: string;

   @Validate(yup.string())
   public description?: string;

}

export class TestScriptMetadataCapability extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptMetadataCapability')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.boolean())
   public required: boolean;

   @Required()
   @Validate(yup.boolean())
   public validated: boolean;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.array(yup.number()))
   public origin? : Array<number>;

   @Validate(yup.number())
   public destination?: number;

   @Validate(yup.array(yup.string()))
   public link? : Array<string>;

   @Required()
   @Validate(yup.string())
   public capabilities: string; //CapabilityStatement

}

export class TestScriptFixture extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptFixture')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.boolean())
   public autocreate: boolean;

   @Required()
   @Validate(yup.boolean())
   public autodelete: boolean;

   @Validate(yup.lazy(() => Reference.schema()))
   public resource?: FlatConvectorModel<Reference>; //Any

}

export class TestScriptVariable extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptVariable')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public defaultValue?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public expression?: string;

   @Validate(yup.string())
   public headerField?: string;

   @Validate(yup.string())
   public hint?: string;

   @Validate(yup.string())
   public path?: string;

   @Validate(yup.string())
   public sourceId?: string;

}

export class TestScriptSetup extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptSetup')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(TestScriptSetupAction.schema())))
   public action?: Array<FlatConvectorModel<TestScriptSetupAction>>;

}

export class TestScriptSetupAction extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptSetupAction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => TestScriptSetupActionOperation.schema()))
   public operation?: FlatConvectorModel<TestScriptSetupActionOperation>;

   @Validate(yup.lazy(() => TestScriptSetupActionAssert.schema()))
   public assert?: FlatConvectorModel<TestScriptSetupActionAssert>;

}

export class TestScriptSetupActionOperation extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptSetupActionOperation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Coding.schema()))
   public type_?: FlatConvectorModel<Coding>;

   @Validate(yup.string())
   public resource?: string;

   @Validate(yup.string())
   public label?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public accept?: string;

   @Validate(yup.string())
   public contentType?: string;

   @Validate(yup.number())
   public destination?: number;

   @Required()
   @Validate(yup.boolean())
   public encodeRequestUrl: boolean;

   @Validate(yup.string())
   public method?: string;

   @Validate(yup.number())
   public origin?: number;

   @Validate(yup.string())
   public params?: string;

   @Validate(yup.lazy(() => yup.array(TestScriptSetupActionOperationRequestHeader.schema())))
   public requestHeader?: Array<FlatConvectorModel<TestScriptSetupActionOperationRequestHeader>>;

   @Validate(yup.string())
   public requestId?: string;

   @Validate(yup.string())
   public responseId?: string;

   @Validate(yup.string())
   public sourceId?: string;

   @Validate(yup.string())
   public targetId?: string;

   @Validate(yup.string())
   public url?: string;

}

export class TestScriptSetupActionOperationRequestHeader extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptSetupActionOperationRequestHeader')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public field: string;

   @Required()
   @Validate(yup.string())
   public value: string;

}

export class TestScriptSetupActionAssert extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptSetupActionAssert')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public label?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.string())
   public direction?: string;

   @Validate(yup.string())
   public compareToSourceId?: string;

   @Validate(yup.string())
   public compareToSourceExpression?: string;

   @Validate(yup.string())
   public compareToSourcePath?: string;

   @Validate(yup.string())
   public contentType?: string;

   @Validate(yup.string())
   public expression?: string;

   @Validate(yup.string())
   public headerField?: string;

   @Validate(yup.string())
   public minimumId?: string;

   @Validate(yup.boolean())
   public navigationLinks?: boolean;

   @Validate(yup.string())
   public operator?: string;

   @Validate(yup.string())
   public path?: string;

   @Validate(yup.string())
   public requestMethod?: string;

   @Validate(yup.string())
   public requestURL?: string;

   @Validate(yup.string())
   public resource?: string;

   @Validate(yup.string())
   public response?: string;

   @Validate(yup.string())
   public responseCode?: string;

   @Validate(yup.string())
   public sourceId?: string;

   @Validate(yup.string())
   public validateProfileId?: string;

   @Validate(yup.string())
   public value?: string;

   @Required()
   @Validate(yup.boolean())
   public warningOnly: boolean;

}

export class TestScriptTest extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptTest')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(TestScriptTestAction.schema())))
   public action?: Array<FlatConvectorModel<TestScriptTestAction>>;

}

export class TestScriptTestAction extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptTestAction')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => TestScriptSetupActionOperation.schema()))
   public operation?: FlatConvectorModel<TestScriptSetupActionOperation>;

   @Validate(yup.lazy(() => TestScriptSetupActionAssert.schema()))
   public assert?: FlatConvectorModel<TestScriptSetupActionAssert>;

}

export class TestScriptTeardown extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptTeardown')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(TestScriptTeardownAction.schema())))
   public action?: Array<FlatConvectorModel<TestScriptTeardownAction>>;

}

export class TestScriptTeardownAction extends BackboneElement {
   @Default('fhir.datatypes.TestScript.TestScriptTeardownAction')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => TestScriptSetupActionOperation.schema()))
   public operation: FlatConvectorModel<TestScriptSetupActionOperation>;

}

export class TestScript extends DomainResource<TestScript> {
   @Default('fhir.datatypes.TestScript')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public url: string;

   @Validate(yup.lazy(() => Identifier.schema()))
   public identifier?: FlatConvectorModel<Identifier>;

   @Validate(yup.string())
   public version?: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.lazy(() => yup.array(TestScriptOrigin.schema())))
   public origin?: Array<FlatConvectorModel<TestScriptOrigin>>;

   @Validate(yup.lazy(() => yup.array(TestScriptDestination.schema())))
   public destination?: Array<FlatConvectorModel<TestScriptDestination>>;

   @Validate(yup.lazy(() => TestScriptMetadata.schema()))
   public metadata?: FlatConvectorModel<TestScriptMetadata>;

   @Validate(yup.lazy(() => yup.array(TestScriptFixture.schema())))
   public fixture?: Array<FlatConvectorModel<TestScriptFixture>>;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public profile?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.lazy(() => yup.array(TestScriptVariable.schema())))
   public variable?: Array<FlatConvectorModel<TestScriptVariable>>;

   @Validate(yup.lazy(() => TestScriptSetup.schema()))
   public setup?: FlatConvectorModel<TestScriptSetup>;

   @Validate(yup.lazy(() => yup.array(TestScriptTest.schema())))
   public test?: Array<FlatConvectorModel<TestScriptTest>>;

   @Validate(yup.lazy(() => TestScriptTeardown.schema()))
   public teardown?: FlatConvectorModel<TestScriptTeardown>;

}


export class TriggerDefinition extends DomainResource<TriggerDefinition> {
   @Default('fhir.datatypes.TriggerDefinition')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public type_: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.lazy(() => Timing.schema()))
   public timingTiming?: FlatConvectorModel<Timing>;

   @Validate(yup.lazy(() => Reference.schema()))
   public timingReference?: FlatConvectorModel<Reference>; //Schedule

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timingDate?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timingDateTime?: date;

   @Validate(yup.lazy(() => yup.array(DataRequirement.schema())))
   public data?: Array<FlatConvectorModel<DataRequirement>>;

   @Validate(yup.lazy(() => Expression.schema()))
   public condition?: FlatConvectorModel<Expression>;

}


export class UsageContext extends DomainResource<UsageContext> {
   @Default('fhir.datatypes.UsageContext')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Coding.schema()))
   public code: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public valueCodeableConcept: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.lazy(() => Quantity.schema()))
   public valueQuantity: FlatConvectorModel<Quantity>;

   @Required()
   @Validate(yup.lazy(() => Range.schema()))
   public valueRange: FlatConvectorModel<Range>;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public valueReference: FlatConvectorModel<Reference>; //PlanDefinition|ResearchStudy|InsurancePlan|HealthcareService|Group|Location|Organization

}


export class ValueSetCompose extends BackboneElement {
   @Default('fhir.datatypes.ValueSet.ValueSetCompose')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lockedDate?: date;

   @Validate(yup.boolean())
   public inactive?: boolean;

   @Validate(yup.lazy(() => yup.array(ValueSetComposeInclude.schema())))
   public include?: Array<FlatConvectorModel<ValueSetComposeInclude>>;

   @Validate(yup.lazy(() => yup.array(ValueSetComposeInclude.schema())))
   public exclude?: Array<FlatConvectorModel<ValueSetComposeInclude>>;

}

export class ValueSetComposeInclude extends BackboneElement {
   @Default('fhir.datatypes.ValueSet.ValueSetComposeInclude')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public system?: string;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.lazy(() => yup.array(ValueSetComposeIncludeConcept.schema())))
   public concept?: Array<FlatConvectorModel<ValueSetComposeIncludeConcept>>;

   @Validate(yup.lazy(() => yup.array(ValueSetComposeIncludeFilter.schema())))
   public filter?: Array<FlatConvectorModel<ValueSetComposeIncludeFilter>>;

   @Validate(yup.array(yup.string()))
   public valueSet? : Array<string>; //ValueSet

}

export class ValueSetComposeIncludeConcept extends BackboneElement {
   @Default('fhir.datatypes.ValueSet.ValueSetComposeIncludeConcept')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public code: string;

   @Validate(yup.string())
   public display?: string;

   @Validate(yup.lazy(() => yup.array(ValueSetComposeIncludeConceptDesignation.schema())))
   public designation?: Array<FlatConvectorModel<ValueSetComposeIncludeConceptDesignation>>;

}

export class ValueSetComposeIncludeConceptDesignation extends BackboneElement {
   @Default('fhir.datatypes.ValueSet.ValueSetComposeIncludeConceptDesignation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public language?: string;

   @Validate(yup.lazy(() => Coding.schema()))
   public use?: FlatConvectorModel<Coding>;

   @Required()
   @Validate(yup.string())
   public value: string;

}

export class ValueSetComposeIncludeFilter extends BackboneElement {
   @Default('fhir.datatypes.ValueSet.ValueSetComposeIncludeFilter')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public property: string;

   @Required()
   @Validate(yup.string())
   public op: string;

   @Required()
   @Validate(yup.string())
   public value: string;

}

export class ValueSetExpansion extends BackboneElement {
   @Default('fhir.datatypes.ValueSet.ValueSetExpansion')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public identifier?: string;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public timestamp: date;

   @Validate(yup.number())
   public total?: number;

   @Validate(yup.number())
   public offset?: number;

   @Validate(yup.lazy(() => yup.array(ValueSetExpansionParameter.schema())))
   public parameter?: Array<FlatConvectorModel<ValueSetExpansionParameter>>;

   @Validate(yup.lazy(() => yup.array(ValueSetExpansionContains.schema())))
   public contains?: Array<FlatConvectorModel<ValueSetExpansionContains>>;

}

export class ValueSetExpansionParameter extends BackboneElement {
   @Default('fhir.datatypes.ValueSet.ValueSetExpansionParameter')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.string())
   public name: string;

   @Validate(yup.string())
   public valueString?: string;

   @Validate(yup.boolean())
   public valueBoolean?: boolean;

   @Validate(yup.number())
   public valueInteger?: number;

   @Validate(yup.number())
   public valueDecimal?: number;

   @Validate(yup.string())
   public valueUri?: string;

   @Validate(yup.string())
   public valueCode?: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public valueDateTime?: date;

}

export class ValueSetExpansionContains extends BackboneElement {
   @Default('fhir.datatypes.ValueSet.ValueSetExpansionContains')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public system?: string;

   @Validate(yup.boolean())
   public abstract?: boolean;

   @Validate(yup.boolean())
   public inactive?: boolean;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public code?: string;

   @Validate(yup.string())
   public display?: string;

   @Validate(yup.lazy(() => yup.array(ValueSetComposeIncludeConceptDesignation.schema())))
   public designation?: Array<FlatConvectorModel<ValueSetComposeIncludeConceptDesignation>>;

   @Validate(yup.lazy(() => yup.array(ValueSetExpansionContains.schema())))
   public contains?: Array<FlatConvectorModel<ValueSetExpansionContains>>;

}

export class ValueSet extends DomainResource<ValueSet> {
   @Default('fhir.datatypes.ValueSet')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.string())
   public url?: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Validate(yup.string())
   public version?: string;

   @Validate(yup.string())
   public name?: string;

   @Validate(yup.string())
   public title?: string;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.boolean())
   public experimental?: boolean;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public publisher?: string;

   @Validate(yup.lazy(() => yup.array(ContactDetail.schema())))
   public contact?: Array<FlatConvectorModel<ContactDetail>>;

   @Validate(yup.string())
   public description?: string;

   @Validate(yup.lazy(() => yup.array(UsageContext.schema())))
   public useContext?: Array<FlatConvectorModel<UsageContext>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public jurisdiction?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.boolean())
   public immutable?: boolean;

   @Validate(yup.string())
   public purpose?: string;

   @Validate(yup.string())
   public copyright?: string;

   @Validate(yup.lazy(() => ValueSetCompose.schema()))
   public compose?: FlatConvectorModel<ValueSetCompose>;

   @Validate(yup.lazy(() => ValueSetExpansion.schema()))
   public expansion?: FlatConvectorModel<ValueSetExpansion>;

}


export class VerificationResultPrimarySource extends BackboneElement {
   @Default('fhir.datatypes.VerificationResult.VerificationResultPrimarySource')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public who?: FlatConvectorModel<Reference>; //Organization|Practitioner|PractitionerRole

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public type_?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public communicationMethod?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public validationStatus?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public validationDate?: date;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public canPushUpdates?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public pushTypeAvailable?: Array<FlatConvectorModel<CodeableConcept>>;

}

export class VerificationResultAttestation extends BackboneElement {
   @Default('fhir.datatypes.VerificationResult.VerificationResultAttestation')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => Reference.schema()))
   public who?: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole|Organization

   @Validate(yup.lazy(() => Reference.schema()))
   public onBehalfOf?: FlatConvectorModel<Reference>; //Organization|Practitioner|PractitionerRole

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public communicationMethod?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public date?: date;

   @Validate(yup.string())
   public sourceIdentityCertificate?: string;

   @Validate(yup.string())
   public proxyIdentityCertificate?: string;

   @Validate(yup.lazy(() => Signature.schema()))
   public proxySignature?: FlatConvectorModel<Signature>;

   @Validate(yup.lazy(() => Signature.schema()))
   public sourceSignature?: FlatConvectorModel<Signature>;

}

export class VerificationResultValidator extends BackboneElement {
   @Default('fhir.datatypes.VerificationResult.VerificationResultValidator')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public organization: FlatConvectorModel<Reference>; //Organization

   @Validate(yup.string())
   public identityCertificate?: string;

   @Validate(yup.lazy(() => Signature.schema()))
   public attestationSignature?: FlatConvectorModel<Signature>;

}

export class VerificationResult extends DomainResource<VerificationResult> {
   @Default('fhir.datatypes.VerificationResult')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Reference.schema())))
   public target?: Array<FlatConvectorModel<Reference>>; //Any

   @Validate(yup.array(yup.string()))
   public targetLocation? : Array<string>;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public need?: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public statusDate?: date;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public validationType?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(CodeableConcept.schema())))
   public validationProcess?: Array<FlatConvectorModel<CodeableConcept>>;

   @Validate(yup.lazy(() => Timing.schema()))
   public frequency?: FlatConvectorModel<Timing>;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public lastPerformed?: date;

   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public nextScheduled?: date;

   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public failureAction?: FlatConvectorModel<CodeableConcept>;

   @Validate(yup.lazy(() => yup.array(VerificationResultPrimarySource.schema())))
   public primarySource?: Array<FlatConvectorModel<VerificationResultPrimarySource>>;

   @Validate(yup.lazy(() => VerificationResultAttestation.schema()))
   public attestation?: FlatConvectorModel<VerificationResultAttestation>;

   @Validate(yup.lazy(() => yup.array(VerificationResultValidator.schema())))
   public validator?: Array<FlatConvectorModel<VerificationResultValidator>>;

}


export class VisionPrescriptionLensSpecification extends BackboneElement {
   @Default('fhir.datatypes.VisionPrescription.VisionPrescriptionLensSpecification')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.lazy(() => CodeableConcept.schema()))
   public product: FlatConvectorModel<CodeableConcept>;

   @Required()
   @Validate(yup.string())
   public eye: string;

   @Validate(yup.number())
   public sphere?: number;

   @Validate(yup.number())
   public cylinder?: number;

   @Validate(yup.number())
   public axis?: number;

   @Validate(yup.lazy(() => yup.array(VisionPrescriptionLensSpecificationPrism.schema())))
   public prism?: Array<FlatConvectorModel<VisionPrescriptionLensSpecificationPrism>>;

   @Validate(yup.number())
   public add?: number;

   @Validate(yup.number())
   public power?: number;

   @Validate(yup.number())
   public backCurve?: number;

   @Validate(yup.number())
   public diameter?: number;

   @Validate(yup.lazy(() => SimpleQuantity.schema()))
   public duration?: FlatConvectorModel<SimpleQuantity>;

   @Validate(yup.string())
   public color?: string;

   @Validate(yup.string())
   public brand?: string;

   @Validate(yup.lazy(() => yup.array(Annotation.schema())))
   public note?: Array<FlatConvectorModel<Annotation>>;

}

export class VisionPrescriptionLensSpecificationPrism extends BackboneElement {
   @Default('fhir.datatypes.VisionPrescription.VisionPrescriptionLensSpecificationPrism')
   @ReadOnly()
   public readonly type: string;

   @Required()
   @Validate(yup.number())
   public amount: number;

   @Required()
   @Validate(yup.string())
   public base: string;

}

export class VisionPrescription extends DomainResource<VisionPrescription> {
   @Default('fhir.datatypes.VisionPrescription')
   @ReadOnly()
   public readonly type: string;

   @Validate(yup.lazy(() => yup.array(Identifier.schema())))
   public identifier?: Array<FlatConvectorModel<Identifier>>;

   @Required()
   @Validate(yup.string())
   public status: string;

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public created: date;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public patient: FlatConvectorModel<Reference>; //Patient

   @Validate(yup.lazy(() => Reference.schema()))
   public encounter?: FlatConvectorModel<Reference>; //Encounter

   @Required()
   @Validate(yup.string().matches(fhirTypes.dateRegex, 'Invalid Date'))
   public dateWritten: date;

   @Required()
   @Validate(yup.lazy(() => Reference.schema()))
   public prescriber: FlatConvectorModel<Reference>; //Practitioner|PractitionerRole

   @Validate(yup.lazy(() => yup.array(VisionPrescriptionLensSpecification.schema())))
   public lensSpecification?: Array<FlatConvectorModel<VisionPrescriptionLensSpecification>>;

}

