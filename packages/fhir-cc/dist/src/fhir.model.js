"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var yup = require("yup");
var convector_core_model_1 = require("@worldsibu/convector-core-model");
var Financial = (function (_super) {
    tslib_1.__extends(Financial, _super);
    function Financial() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 'fhir.datatypes.Financial';
        return _this;
    }
    tslib_1.__decorate([
        convector_core_model_1.ReadOnly()
    ], Financial.prototype, "type", void 0);
    return Financial;
}(convector_core_model_1.ConvectorModel));
exports.Financial = Financial;
var Element = (function (_super) {
    tslib_1.__extends(Element, _super);
    function Element() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Element.prototype, "id", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Extension.schema()); }))
    ], Element.prototype, "extension", void 0);
    return Element;
}(convector_core_model_1.ConvectorModel));
exports.Element = Element;
var Quantity = (function (_super) {
    tslib_1.__extends(Quantity, _super);
    function Quantity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Quantity'),
        convector_core_model_1.ReadOnly()
    ], Quantity.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Quantity.prototype, "value", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Quantity.prototype, "comparator", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Quantity.prototype, "unit", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Quantity.prototype, "system", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Quantity.prototype, "code", void 0);
    return Quantity;
}(Element));
exports.Quantity = Quantity;
var Extension = (function (_super) {
    tslib_1.__extends(Extension, _super);
    function Extension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Extension.prototype, "id", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Extension.schema()); }))
    ], Extension.prototype, "extension", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Extension'),
        convector_core_model_1.ReadOnly()
    ], Extension.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Extension.prototype, "url", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Extension.prototype, "valueInteger", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Extension.prototype, "valueDecimal", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Extension.prototype, "valueDateTime", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Extension.prototype, "valueString", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Extension.prototype, "valueUri", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.bool())
    ], Extension.prototype, "valueBoolean", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Extension.prototype, "valueCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Extension.prototype, "valueBase64Binary", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Coding.schema(); }))
    ], Extension.prototype, "valueCoding", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Extension.prototype, "valueCodeableConcept", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Identifier.schema(); }))
    ], Extension.prototype, "valueIdentifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Quantity.schema(); }))
    ], Extension.prototype, "valueQuantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Range.schema(); }))
    ], Extension.prototype, "valueRange", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], Extension.prototype, "valuePeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Ratio.schema(); }))
    ], Extension.prototype, "valueRatio", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return HumanName.schema(); }))
    ], Extension.prototype, "valueHumanName", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Address.schema(); }))
    ], Extension.prototype, "valueAddress", void 0);
    return Extension;
}(Element));
exports.Extension = Extension;
var BackboneElement = (function (_super) {
    tslib_1.__extends(BackboneElement, _super);
    function BackboneElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Extension.schema(); }))
    ], BackboneElement.prototype, "modifierExtension", void 0);
    return BackboneElement;
}(Element));
exports.BackboneElement = BackboneElement;
var SimpleQuantity = (function (_super) {
    tslib_1.__extends(SimpleQuantity, _super);
    function SimpleQuantity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.SimpleQuantity'),
        convector_core_model_1.ReadOnly()
    ], SimpleQuantity.prototype, "type", void 0);
    return SimpleQuantity;
}(Quantity));
exports.SimpleQuantity = SimpleQuantity;
var Resource = (function (_super) {
    tslib_1.__extends(Resource, _super);
    function Resource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Resource.prototype, "id", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Resource.prototype, "implicitRules", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Resource.prototype, "language", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Meta.schema(); }))
    ], Resource.prototype, "meta", void 0);
    return Resource;
}(convector_core_model_1.ConvectorModel));
exports.Resource = Resource;
var DomainResource = (function (_super) {
    tslib_1.__extends(DomainResource, _super);
    function DomainResource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], DomainResource.prototype, "resourceType", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Narrative.schema(); }))
    ], DomainResource.prototype, "text", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Resource.schema(); }))
    ], DomainResource.prototype, "contained", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Extension.schema(); }))
    ], DomainResource.prototype, "extension", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Extension.schema(); }))
    ], DomainResource.prototype, "modifierExtension", void 0);
    return DomainResource;
}(Resource));
exports.DomainResource = DomainResource;
var Period = (function (_super) {
    tslib_1.__extends(Period, _super);
    function Period() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Period'),
        convector_core_model_1.ReadOnly()
    ], Period.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], Period.prototype, "start", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], Period.prototype, "end", void 0);
    return Period;
}(Element));
exports.Period = Period;
var Identifier = (function (_super) {
    tslib_1.__extends(Identifier, _super);
    function Identifier() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Identifier'),
        convector_core_model_1.ReadOnly()
    ], Identifier.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Identifier.prototype, "use", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Identifier.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Identifier.prototype, "system", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Identifier.prototype, "value", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], Identifier.prototype, "period", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Identifier.prototype, "assigner", void 0);
    return Identifier;
}(Element));
exports.Identifier = Identifier;
var Timing = (function (_super) {
    tslib_1.__extends(Timing, _super);
    function Timing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Timing'),
        convector_core_model_1.ReadOnly()
    ], Timing.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.date()))
    ], Timing.prototype, "event", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return TimingRepeat.schema(); }))
    ], Timing.prototype, "repeat", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Timing.prototype, "code", void 0);
    return Timing;
}(Element));
exports.Timing = Timing;
var CodeableConcept = (function (_super) {
    tslib_1.__extends(CodeableConcept, _super);
    function CodeableConcept() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.CodeableConcept'),
        convector_core_model_1.ReadOnly()
    ], CodeableConcept.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Coding.schema()); }))
    ], CodeableConcept.prototype, "coding", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], CodeableConcept.prototype, "text", void 0);
    return CodeableConcept;
}(Element));
exports.CodeableConcept = CodeableConcept;
var Money = (function (_super) {
    tslib_1.__extends(Money, _super);
    function Money() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Money'),
        convector_core_model_1.ReadOnly()
    ], Money.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Money.prototype, "value", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Money.prototype, "currency", void 0);
    return Money;
}(Element));
exports.Money = Money;
var Annotation = (function (_super) {
    tslib_1.__extends(Annotation, _super);
    function Annotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Annotation'),
        convector_core_model_1.ReadOnly()
    ], Annotation.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Annotation.prototype, "authorReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Annotation.prototype, "authorString", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], Annotation.prototype, "time", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Annotation.prototype, "text", void 0);
    return Annotation;
}(Element));
exports.Annotation = Annotation;
var SampledData = (function (_super) {
    tslib_1.__extends(SampledData, _super);
    function SampledData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.SampledData'),
        convector_core_model_1.ReadOnly()
    ], SampledData.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], SampledData.prototype, "origin", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], SampledData.prototype, "period", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], SampledData.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], SampledData.prototype, "lowerLimit", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], SampledData.prototype, "upperLimit", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], SampledData.prototype, "dimensions", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], SampledData.prototype, "data", void 0);
    return SampledData;
}(Element));
exports.SampledData = SampledData;
var Reference = (function (_super) {
    tslib_1.__extends(Reference, _super);
    function Reference() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Reference'),
        convector_core_model_1.ReadOnly()
    ], Reference.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Reference.prototype, "reference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Reference.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Identifier.schema(); }))
    ], Reference.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Reference.prototype, "display", void 0);
    return Reference;
}(Element));
exports.Reference = Reference;
var Meta = (function (_super) {
    tslib_1.__extends(Meta, _super);
    function Meta() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Meta'),
        convector_core_model_1.ReadOnly()
    ], Meta.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Meta.prototype, "versionId", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Meta.prototype, "lastUpdated", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Meta.prototype, "source", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], Meta.prototype, "profile", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Coding.schema()); }))
    ], Meta.prototype, "security", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Coding.schema()); }))
    ], Meta.prototype, "tag", void 0);
    return Meta;
}(Element));
exports.Meta = Meta;
var Narrative = (function (_super) {
    tslib_1.__extends(Narrative, _super);
    function Narrative() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Narrative'),
        convector_core_model_1.ReadOnly()
    ], Narrative.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Narrative.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.xhtml())
    ], Narrative.prototype, "div", void 0);
    return Narrative;
}(Element));
exports.Narrative = Narrative;
var ContactPoint = (function (_super) {
    tslib_1.__extends(ContactPoint, _super);
    function ContactPoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ContactPoint'),
        convector_core_model_1.ReadOnly()
    ], ContactPoint.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ContactPoint.prototype, "system", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ContactPoint.prototype, "value", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ContactPoint.prototype, "use", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ContactPoint.prototype, "rank", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], ContactPoint.prototype, "period", void 0);
    return ContactPoint;
}(Element));
exports.ContactPoint = ContactPoint;
var TimingRepeat = (function (_super) {
    tslib_1.__extends(TimingRepeat, _super);
    function TimingRepeat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Timing.TimingRepeat'),
        convector_core_model_1.ReadOnly()
    ], TimingRepeat.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Duration.schema(); }))
    ], TimingRepeat.prototype, "boundsDuration", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Range.schema(); }))
    ], TimingRepeat.prototype, "boundsRange", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], TimingRepeat.prototype, "boundsPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], TimingRepeat.prototype, "count", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], TimingRepeat.prototype, "countMax", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], TimingRepeat.prototype, "duration", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], TimingRepeat.prototype, "durationMax", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], TimingRepeat.prototype, "durationUnit", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], TimingRepeat.prototype, "frequency", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], TimingRepeat.prototype, "frequencyMax", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], TimingRepeat.prototype, "period", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], TimingRepeat.prototype, "periodMax", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], TimingRepeat.prototype, "periodUnit", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], TimingRepeat.prototype, "dayOfWeek", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], TimingRepeat.prototype, "timeOfDay", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], TimingRepeat.prototype, "when", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], TimingRepeat.prototype, "offset", void 0);
    return TimingRepeat;
}(BackboneElement));
exports.TimingRepeat = TimingRepeat;
var Attachment = (function (_super) {
    tslib_1.__extends(Attachment, _super);
    function Attachment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Attachment'),
        convector_core_model_1.ReadOnly()
    ], Attachment.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Attachment.prototype, "contentType", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Attachment.prototype, "language", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Attachment.prototype, "data", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Attachment.prototype, "url", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Attachment.prototype, "size", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Attachment.prototype, "hash", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Attachment.prototype, "title", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], Attachment.prototype, "creation", void 0);
    return Attachment;
}(Element));
exports.Attachment = Attachment;
var Address = (function (_super) {
    tslib_1.__extends(Address, _super);
    function Address() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Address'),
        convector_core_model_1.ReadOnly()
    ], Address.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Address.prototype, "use", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Address.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Address.prototype, "text", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], Address.prototype, "line", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Address.prototype, "city", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Address.prototype, "district", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Address.prototype, "state", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Address.prototype, "postalCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Address.prototype, "country", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], Address.prototype, "period", void 0);
    return Address;
}(Element));
exports.Address = Address;
var Coding = (function (_super) {
    tslib_1.__extends(Coding, _super);
    function Coding() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Coding'),
        convector_core_model_1.ReadOnly()
    ], Coding.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Coding.prototype, "system", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Coding.prototype, "version", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Coding.prototype, "code", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Coding.prototype, "display", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], Coding.prototype, "userSelected", void 0);
    return Coding;
}(Element));
exports.Coding = Coding;
var Range = (function (_super) {
    tslib_1.__extends(Range, _super);
    function Range() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Range'),
        convector_core_model_1.ReadOnly()
    ], Range.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], Range.prototype, "low", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], Range.prototype, "high", void 0);
    return Range;
}(Element));
exports.Range = Range;
var Ratio = (function (_super) {
    tslib_1.__extends(Ratio, _super);
    function Ratio() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Ratio'),
        convector_core_model_1.ReadOnly()
    ], Ratio.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Quantity.schema(); }))
    ], Ratio.prototype, "numerator", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Quantity.schema(); }))
    ], Ratio.prototype, "denominator", void 0);
    return Ratio;
}(Element));
exports.Ratio = Ratio;
var HumanName = (function (_super) {
    tslib_1.__extends(HumanName, _super);
    function HumanName() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.HumanName'),
        convector_core_model_1.ReadOnly()
    ], HumanName.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], HumanName.prototype, "use", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], HumanName.prototype, "text", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], HumanName.prototype, "family", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], HumanName.prototype, "given", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], HumanName.prototype, "prefix", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], HumanName.prototype, "suffix", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], HumanName.prototype, "period", void 0);
    return HumanName;
}(Element));
exports.HumanName = HumanName;
var Duration = (function (_super) {
    tslib_1.__extends(Duration, _super);
    function Duration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Duration'),
        convector_core_model_1.ReadOnly()
    ], Duration.prototype, "type", void 0);
    return Duration;
}(Element));
exports.Duration = Duration;
var Age = (function (_super) {
    tslib_1.__extends(Age, _super);
    function Age() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Age'),
        convector_core_model_1.ReadOnly()
    ], Age.prototype, "type", void 0);
    return Age;
}(Element));
exports.Age = Age;
var AccountCoverage = (function (_super) {
    tslib_1.__extends(AccountCoverage, _super);
    function AccountCoverage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Account.AccountCoverage'),
        convector_core_model_1.ReadOnly()
    ], AccountCoverage.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], AccountCoverage.prototype, "coverage", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], AccountCoverage.prototype, "priority", void 0);
    return AccountCoverage;
}(BackboneElement));
exports.AccountCoverage = AccountCoverage;
var AccountGuarantor = (function (_super) {
    tslib_1.__extends(AccountGuarantor, _super);
    function AccountGuarantor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Account.AccountGuarantor'),
        convector_core_model_1.ReadOnly()
    ], AccountGuarantor.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], AccountGuarantor.prototype, "party", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], AccountGuarantor.prototype, "onHold", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], AccountGuarantor.prototype, "period", void 0);
    return AccountGuarantor;
}(BackboneElement));
exports.AccountGuarantor = AccountGuarantor;
var Account = (function (_super) {
    tslib_1.__extends(Account, _super);
    function Account() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Account'),
        convector_core_model_1.ReadOnly()
    ], Account.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], Account.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Account.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Account.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Account.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Account.prototype, "subject", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], Account.prototype, "servicePeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(AccountCoverage.schema()); }))
    ], Account.prototype, "coverage", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Account.prototype, "owner", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Account.prototype, "description", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(AccountGuarantor.schema()); }))
    ], Account.prototype, "guarantor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Account.prototype, "partOf", void 0);
    return Account;
}(DomainResource));
exports.Account = Account;
var ChargeItemPerformer = (function (_super) {
    tslib_1.__extends(ChargeItemPerformer, _super);
    function ChargeItemPerformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ChargeItem.ChargeItemPerformer'),
        convector_core_model_1.ReadOnly()
    ], ChargeItemPerformer.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ChargeItemPerformer.prototype, "function_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ChargeItemPerformer.prototype, "actor", void 0);
    return ChargeItemPerformer;
}(BackboneElement));
exports.ChargeItemPerformer = ChargeItemPerformer;
var ChargeItem = (function (_super) {
    tslib_1.__extends(ChargeItem, _super);
    function ChargeItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ChargeItem'),
        convector_core_model_1.ReadOnly()
    ], ChargeItem.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], ChargeItem.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], ChargeItem.prototype, "definitionUri", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], ChargeItem.prototype, "definitionCanonical", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], ChargeItem.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ChargeItem.prototype, "partOf", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ChargeItem.prototype, "code", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ChargeItem.prototype, "subject", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ChargeItem.prototype, "context", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ChargeItem.prototype, "occurrenceDateTime", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], ChargeItem.prototype, "occurrencePeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Timing.schema(); }))
    ], ChargeItem.prototype, "occurrenceTiming", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ChargeItemPerformer.schema()); }))
    ], ChargeItem.prototype, "performer", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ChargeItem.prototype, "performingOrganization", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ChargeItem.prototype, "requestingOrganization", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ChargeItem.prototype, "costCenter", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Quantity.schema(); }))
    ], ChargeItem.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ChargeItem.prototype, "bodysite", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ChargeItem.prototype, "factorOverride", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ChargeItem.prototype, "priceOverride", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ChargeItem.prototype, "overrideReason", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ChargeItem.prototype, "enterer", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ChargeItem.prototype, "enteredDate", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ChargeItem.prototype, "reason", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ChargeItem.prototype, "service", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ChargeItem.prototype, "productReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ChargeItem.prototype, "productCodeableConcept", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ChargeItem.prototype, "account", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Annotation.schema()); }))
    ], ChargeItem.prototype, "note", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ChargeItem.prototype, "supportingInformation", void 0);
    return ChargeItem;
}(DomainResource));
exports.ChargeItem = ChargeItem;
var ClaimRelated = (function (_super) {
    tslib_1.__extends(ClaimRelated, _super);
    function ClaimRelated() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim.ClaimRelated'),
        convector_core_model_1.ReadOnly()
    ], ClaimRelated.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimRelated.prototype, "claim", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimRelated.prototype, "relationship", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Identifier.schema(); }))
    ], ClaimRelated.prototype, "reference", void 0);
    return ClaimRelated;
}(BackboneElement));
exports.ClaimRelated = ClaimRelated;
var ClaimPayee = (function (_super) {
    tslib_1.__extends(ClaimPayee, _super);
    function ClaimPayee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim.ClaimPayee'),
        convector_core_model_1.ReadOnly()
    ], ClaimPayee.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimPayee.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimPayee.prototype, "party", void 0);
    return ClaimPayee;
}(BackboneElement));
exports.ClaimPayee = ClaimPayee;
var ClaimCareTeam = (function (_super) {
    tslib_1.__extends(ClaimCareTeam, _super);
    function ClaimCareTeam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim.ClaimCareTeam'),
        convector_core_model_1.ReadOnly()
    ], ClaimCareTeam.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimCareTeam.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimCareTeam.prototype, "provider", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], ClaimCareTeam.prototype, "responsible", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimCareTeam.prototype, "role", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimCareTeam.prototype, "qualification", void 0);
    return ClaimCareTeam;
}(BackboneElement));
exports.ClaimCareTeam = ClaimCareTeam;
var ClaimSupportingInfo = (function (_super) {
    tslib_1.__extends(ClaimSupportingInfo, _super);
    function ClaimSupportingInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim.ClaimSupportingInfo'),
        convector_core_model_1.ReadOnly()
    ], ClaimSupportingInfo.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimSupportingInfo.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimSupportingInfo.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimSupportingInfo.prototype, "code", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ClaimSupportingInfo.prototype, "timingDate", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], ClaimSupportingInfo.prototype, "timingPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], ClaimSupportingInfo.prototype, "valueBoolean", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ClaimSupportingInfo.prototype, "valueString", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Quantity.schema(); }))
    ], ClaimSupportingInfo.prototype, "valueQuantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimSupportingInfo.prototype, "valueReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimSupportingInfo.prototype, "reason", void 0);
    return ClaimSupportingInfo;
}(BackboneElement));
exports.ClaimSupportingInfo = ClaimSupportingInfo;
var ClaimDiagnosis = (function (_super) {
    tslib_1.__extends(ClaimDiagnosis, _super);
    function ClaimDiagnosis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim.ClaimDiagnosis'),
        convector_core_model_1.ReadOnly()
    ], ClaimDiagnosis.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimDiagnosis.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimDiagnosis.prototype, "diagnosisCodeableConcept", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimDiagnosis.prototype, "diagnosisReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimDiagnosis.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimDiagnosis.prototype, "onAdmission", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimDiagnosis.prototype, "packageCode", void 0);
    return ClaimDiagnosis;
}(BackboneElement));
exports.ClaimDiagnosis = ClaimDiagnosis;
var ClaimProcedure = (function (_super) {
    tslib_1.__extends(ClaimProcedure, _super);
    function ClaimProcedure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim.ClaimProcedure'),
        convector_core_model_1.ReadOnly()
    ], ClaimProcedure.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimProcedure.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimProcedure.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ClaimProcedure.prototype, "date", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimProcedure.prototype, "procedureCodeableConcept", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimProcedure.prototype, "procedureReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ClaimProcedure.prototype, "udi", void 0);
    return ClaimProcedure;
}(BackboneElement));
exports.ClaimProcedure = ClaimProcedure;
var ClaimInsurance = (function (_super) {
    tslib_1.__extends(ClaimInsurance, _super);
    function ClaimInsurance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim.ClaimInsurance'),
        convector_core_model_1.ReadOnly()
    ], ClaimInsurance.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimInsurance.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.boolean())
    ], ClaimInsurance.prototype, "focal", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Identifier.schema(); }))
    ], ClaimInsurance.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimInsurance.prototype, "coverage", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ClaimInsurance.prototype, "businessArrangement", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], ClaimInsurance.prototype, "preAuthRef", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimInsurance.prototype, "claimResponse", void 0);
    return ClaimInsurance;
}(BackboneElement));
exports.ClaimInsurance = ClaimInsurance;
var ClaimAccident = (function (_super) {
    tslib_1.__extends(ClaimAccident, _super);
    function ClaimAccident() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim.ClaimAccident'),
        convector_core_model_1.ReadOnly()
    ], ClaimAccident.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.date())
    ], ClaimAccident.prototype, "date", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimAccident.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Address.schema(); }))
    ], ClaimAccident.prototype, "locationAddress", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimAccident.prototype, "locationReference", void 0);
    return ClaimAccident;
}(BackboneElement));
exports.ClaimAccident = ClaimAccident;
var ClaimItem = (function (_super) {
    tslib_1.__extends(ClaimItem, _super);
    function ClaimItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim.ClaimItem'),
        convector_core_model_1.ReadOnly()
    ], ClaimItem.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimItem.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimItem.prototype, "careTeamSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimItem.prototype, "diagnosisSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimItem.prototype, "procedureSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimItem.prototype, "informationSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimItem.prototype, "revenue", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimItem.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimItem.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimItem.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimItem.prototype, "programCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ClaimItem.prototype, "servicedDate", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], ClaimItem.prototype, "servicedPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimItem.prototype, "locationCodeableConcept", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Address.schema(); }))
    ], ClaimItem.prototype, "locationAddress", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimItem.prototype, "locationReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ClaimItem.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimItem.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ClaimItem.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimItem.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ClaimItem.prototype, "udi", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimItem.prototype, "bodySite", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimItem.prototype, "subSite", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ClaimItem.prototype, "encounter", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimItemDetail.schema()); }))
    ], ClaimItem.prototype, "detail", void 0);
    return ClaimItem;
}(BackboneElement));
exports.ClaimItem = ClaimItem;
var ClaimItemDetail = (function (_super) {
    tslib_1.__extends(ClaimItemDetail, _super);
    function ClaimItemDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim.ClaimItemDetail'),
        convector_core_model_1.ReadOnly()
    ], ClaimItemDetail.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimItemDetail.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimItemDetail.prototype, "revenue", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimItemDetail.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimItemDetail.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimItemDetail.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimItemDetail.prototype, "programCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ClaimItemDetail.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimItemDetail.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ClaimItemDetail.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimItemDetail.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ClaimItemDetail.prototype, "udi", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimItemDetailSubDetail.schema()); }))
    ], ClaimItemDetail.prototype, "subDetail", void 0);
    return ClaimItemDetail;
}(BackboneElement));
exports.ClaimItemDetail = ClaimItemDetail;
var ClaimItemDetailSubDetail = (function (_super) {
    tslib_1.__extends(ClaimItemDetailSubDetail, _super);
    function ClaimItemDetailSubDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim.ClaimItemDetailSubDetail'),
        convector_core_model_1.ReadOnly()
    ], ClaimItemDetailSubDetail.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimItemDetailSubDetail.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimItemDetailSubDetail.prototype, "revenue", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimItemDetailSubDetail.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimItemDetailSubDetail.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimItemDetailSubDetail.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimItemDetailSubDetail.prototype, "programCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ClaimItemDetailSubDetail.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimItemDetailSubDetail.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ClaimItemDetailSubDetail.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimItemDetailSubDetail.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ClaimItemDetailSubDetail.prototype, "udi", void 0);
    return ClaimItemDetailSubDetail;
}(BackboneElement));
exports.ClaimItemDetailSubDetail = ClaimItemDetailSubDetail;
var Claim = (function (_super) {
    tslib_1.__extends(Claim, _super);
    function Claim() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Claim'),
        convector_core_model_1.ReadOnly()
    ], Claim.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], Claim.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Claim.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Claim.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Claim.prototype, "subType", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Claim.prototype, "use", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Claim.prototype, "patient", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], Claim.prototype, "billablePeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.date())
    ], Claim.prototype, "created", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Claim.prototype, "enterer", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Claim.prototype, "insurer", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Claim.prototype, "provider", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Claim.prototype, "priority", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Claim.prototype, "fundsReserve", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimRelated.schema()); }))
    ], Claim.prototype, "related", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Claim.prototype, "prescription", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Claim.prototype, "originalPrescription", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return ClaimPayee.schema(); }))
    ], Claim.prototype, "payee", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Claim.prototype, "referral", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Claim.prototype, "facility", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimCareTeam.schema()); }))
    ], Claim.prototype, "careTeam", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimSupportingInfo.schema()); }))
    ], Claim.prototype, "supportingInfo", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimDiagnosis.schema()); }))
    ], Claim.prototype, "diagnosis", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimProcedure.schema()); }))
    ], Claim.prototype, "procedure", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimInsurance.schema()); }))
    ], Claim.prototype, "insurance", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return ClaimAccident.schema(); }))
    ], Claim.prototype, "accident", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimItem.schema()); }))
    ], Claim.prototype, "item", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], Claim.prototype, "total", void 0);
    return Claim;
}(DomainResource));
exports.Claim = Claim;
var ClaimResponseItem = (function (_super) {
    tslib_1.__extends(ClaimResponseItem, _super);
    function ClaimResponseItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponseItem'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponseItem.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseItem.prototype, "itemSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimResponseItem.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseItemAdjudication.schema()); }))
    ], ClaimResponseItem.prototype, "adjudication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseItemDetail.schema()); }))
    ], ClaimResponseItem.prototype, "detail", void 0);
    return ClaimResponseItem;
}(BackboneElement));
exports.ClaimResponseItem = ClaimResponseItem;
var ClaimResponseItemAdjudication = (function (_super) {
    tslib_1.__extends(ClaimResponseItemAdjudication, _super);
    function ClaimResponseItemAdjudication() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponseItemAdjudication'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponseItemAdjudication.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponseItemAdjudication.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponseItemAdjudication.prototype, "reason", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimResponseItemAdjudication.prototype, "amount", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseItemAdjudication.prototype, "value", void 0);
    return ClaimResponseItemAdjudication;
}(BackboneElement));
exports.ClaimResponseItemAdjudication = ClaimResponseItemAdjudication;
var ClaimResponseItemDetail = (function (_super) {
    tslib_1.__extends(ClaimResponseItemDetail, _super);
    function ClaimResponseItemDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponseItemDetail'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponseItemDetail.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseItemDetail.prototype, "detailSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimResponseItemDetail.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseItemAdjudication.schema()); }))
    ], ClaimResponseItemDetail.prototype, "adjudication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseItemDetailSubDetail.schema()); }))
    ], ClaimResponseItemDetail.prototype, "subDetail", void 0);
    return ClaimResponseItemDetail;
}(BackboneElement));
exports.ClaimResponseItemDetail = ClaimResponseItemDetail;
var ClaimResponseItemDetailSubDetail = (function (_super) {
    tslib_1.__extends(ClaimResponseItemDetailSubDetail, _super);
    function ClaimResponseItemDetailSubDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponseItemDetailSubDetail'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponseItemDetailSubDetail.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseItemDetailSubDetail.prototype, "subDetailSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimResponseItemDetailSubDetail.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseItemAdjudication.schema()); }))
    ], ClaimResponseItemDetailSubDetail.prototype, "adjudication", void 0);
    return ClaimResponseItemDetailSubDetail;
}(BackboneElement));
exports.ClaimResponseItemDetailSubDetail = ClaimResponseItemDetailSubDetail;
var ClaimResponseAddItem = (function (_super) {
    tslib_1.__extends(ClaimResponseAddItem, _super);
    function ClaimResponseAddItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponseAddItem'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponseAddItem.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimResponseAddItem.prototype, "itemSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimResponseAddItem.prototype, "detailSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimResponseAddItem.prototype, "subdetailSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ClaimResponseAddItem.prototype, "provider", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponseAddItem.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimResponseAddItem.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimResponseAddItem.prototype, "programCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ClaimResponseAddItem.prototype, "servicedDate", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], ClaimResponseAddItem.prototype, "servicedPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponseAddItem.prototype, "locationCodeableConcept", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Address.schema(); }))
    ], ClaimResponseAddItem.prototype, "locationAddress", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimResponseAddItem.prototype, "locationReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ClaimResponseAddItem.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimResponseAddItem.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseAddItem.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimResponseAddItem.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponseAddItem.prototype, "bodySite", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimResponseAddItem.prototype, "subSite", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimResponseAddItem.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseItemAdjudication.schema()); }))
    ], ClaimResponseAddItem.prototype, "adjudication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseAddItemDetail.schema()); }))
    ], ClaimResponseAddItem.prototype, "detail", void 0);
    return ClaimResponseAddItem;
}(BackboneElement));
exports.ClaimResponseAddItem = ClaimResponseAddItem;
var ClaimResponseAddItemDetail = (function (_super) {
    tslib_1.__extends(ClaimResponseAddItemDetail, _super);
    function ClaimResponseAddItemDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponseAddItemDetail'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponseAddItemDetail.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponseAddItemDetail.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimResponseAddItemDetail.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ClaimResponseAddItemDetail.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimResponseAddItemDetail.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseAddItemDetail.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimResponseAddItemDetail.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimResponseAddItemDetail.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseItemAdjudication.schema()); }))
    ], ClaimResponseAddItemDetail.prototype, "adjudication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseAddItemDetailSubDetail.schema()); }))
    ], ClaimResponseAddItemDetail.prototype, "subDetail", void 0);
    return ClaimResponseAddItemDetail;
}(BackboneElement));
exports.ClaimResponseAddItemDetail = ClaimResponseAddItemDetail;
var ClaimResponseAddItemDetailSubDetail = (function (_super) {
    tslib_1.__extends(ClaimResponseAddItemDetailSubDetail, _super);
    function ClaimResponseAddItemDetailSubDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponseAddItemDetailSubDetail'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponseAddItemDetailSubDetail.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponseAddItemDetailSubDetail.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ClaimResponseAddItemDetailSubDetail.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ClaimResponseAddItemDetailSubDetail.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimResponseAddItemDetailSubDetail.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseAddItemDetailSubDetail.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimResponseAddItemDetailSubDetail.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ClaimResponseAddItemDetailSubDetail.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseItemAdjudication.schema()); }))
    ], ClaimResponseAddItemDetailSubDetail.prototype, "adjudication", void 0);
    return ClaimResponseAddItemDetailSubDetail;
}(BackboneElement));
exports.ClaimResponseAddItemDetailSubDetail = ClaimResponseAddItemDetailSubDetail;
var ClaimResponseTotal = (function (_super) {
    tslib_1.__extends(ClaimResponseTotal, _super);
    function ClaimResponseTotal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponseTotal'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponseTotal.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponseTotal.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimResponseTotal.prototype, "amount", void 0);
    return ClaimResponseTotal;
}(BackboneElement));
exports.ClaimResponseTotal = ClaimResponseTotal;
var ClaimResponsePayment = (function (_super) {
    tslib_1.__extends(ClaimResponsePayment, _super);
    function ClaimResponsePayment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponsePayment'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponsePayment.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponsePayment.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimResponsePayment.prototype, "adjustment", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponsePayment.prototype, "adjustmentReason", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ClaimResponsePayment.prototype, "date", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ClaimResponsePayment.prototype, "amount", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Identifier.schema(); }))
    ], ClaimResponsePayment.prototype, "identifier", void 0);
    return ClaimResponsePayment;
}(BackboneElement));
exports.ClaimResponsePayment = ClaimResponsePayment;
var ClaimResponseProcessNote = (function (_super) {
    tslib_1.__extends(ClaimResponseProcessNote, _super);
    function ClaimResponseProcessNote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponseProcessNote'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponseProcessNote.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseProcessNote.prototype, "number", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ClaimResponseProcessNote.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], ClaimResponseProcessNote.prototype, "text", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponseProcessNote.prototype, "language", void 0);
    return ClaimResponseProcessNote;
}(BackboneElement));
exports.ClaimResponseProcessNote = ClaimResponseProcessNote;
var ClaimResponseInsurance = (function (_super) {
    tslib_1.__extends(ClaimResponseInsurance, _super);
    function ClaimResponseInsurance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponseInsurance'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponseInsurance.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseInsurance.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.boolean())
    ], ClaimResponseInsurance.prototype, "focal", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimResponseInsurance.prototype, "coverage", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ClaimResponseInsurance.prototype, "businessArrangement", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimResponseInsurance.prototype, "claimResponse", void 0);
    return ClaimResponseInsurance;
}(BackboneElement));
exports.ClaimResponseInsurance = ClaimResponseInsurance;
var ClaimResponseError = (function (_super) {
    tslib_1.__extends(ClaimResponseError, _super);
    function ClaimResponseError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse.ClaimResponseError'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponseError.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseError.prototype, "itemSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseError.prototype, "detailSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ClaimResponseError.prototype, "subDetailSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponseError.prototype, "code", void 0);
    return ClaimResponseError;
}(BackboneElement));
exports.ClaimResponseError = ClaimResponseError;
var ClaimResponse = (function (_super) {
    tslib_1.__extends(ClaimResponse, _super);
    function ClaimResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ClaimResponse'),
        convector_core_model_1.ReadOnly()
    ], ClaimResponse.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], ClaimResponse.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], ClaimResponse.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponse.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponse.prototype, "subType", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], ClaimResponse.prototype, "use", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimResponse.prototype, "patient", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.date())
    ], ClaimResponse.prototype, "created", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimResponse.prototype, "insurer", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimResponse.prototype, "requestor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ClaimResponse.prototype, "request", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], ClaimResponse.prototype, "outcome", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ClaimResponse.prototype, "disposition", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ClaimResponse.prototype, "preAuthRef", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], ClaimResponse.prototype, "preAuthPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponse.prototype, "payeeType", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseItem.schema()); }))
    ], ClaimResponse.prototype, "item", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseAddItem.schema()); }))
    ], ClaimResponse.prototype, "addItem", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseItemAdjudication.schema()); }))
    ], ClaimResponse.prototype, "adjudication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseTotal.schema()); }))
    ], ClaimResponse.prototype, "total", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return ClaimResponsePayment.schema(); }))
    ], ClaimResponse.prototype, "payment", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponse.prototype, "fundsReserve", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ClaimResponse.prototype, "formCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseProcessNote.schema()); }))
    ], ClaimResponse.prototype, "processNote", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ClaimResponse.prototype, "communicationRequest", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseInsurance.schema()); }))
    ], ClaimResponse.prototype, "insurance", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ClaimResponseError.schema()); }))
    ], ClaimResponse.prototype, "error", void 0);
    return ClaimResponse;
}(DomainResource));
exports.ClaimResponse = ClaimResponse;
var CoverageClass = (function (_super) {
    tslib_1.__extends(CoverageClass, _super);
    function CoverageClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Coverage.CoverageClass'),
        convector_core_model_1.ReadOnly()
    ], CoverageClass.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], CoverageClass.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], CoverageClass.prototype, "value", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], CoverageClass.prototype, "name", void 0);
    return CoverageClass;
}(BackboneElement));
exports.CoverageClass = CoverageClass;
var CoverageCostToBeneficiary = (function (_super) {
    tslib_1.__extends(CoverageCostToBeneficiary, _super);
    function CoverageCostToBeneficiary() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Coverage.CoverageCostToBeneficiary'),
        convector_core_model_1.ReadOnly()
    ], CoverageCostToBeneficiary.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], CoverageCostToBeneficiary.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], CoverageCostToBeneficiary.prototype, "valueQuantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], CoverageCostToBeneficiary.prototype, "valueMoney", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CoverageCostToBeneficiaryException.schema()); }))
    ], CoverageCostToBeneficiary.prototype, "exception", void 0);
    return CoverageCostToBeneficiary;
}(BackboneElement));
exports.CoverageCostToBeneficiary = CoverageCostToBeneficiary;
var CoverageCostToBeneficiaryException = (function (_super) {
    tslib_1.__extends(CoverageCostToBeneficiaryException, _super);
    function CoverageCostToBeneficiaryException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Coverage.CoverageCostToBeneficiaryException'),
        convector_core_model_1.ReadOnly()
    ], CoverageCostToBeneficiaryException.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], CoverageCostToBeneficiaryException.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], CoverageCostToBeneficiaryException.prototype, "period", void 0);
    return CoverageCostToBeneficiaryException;
}(BackboneElement));
exports.CoverageCostToBeneficiaryException = CoverageCostToBeneficiaryException;
var Coverage = (function (_super) {
    tslib_1.__extends(Coverage, _super);
    function Coverage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Coverage'),
        convector_core_model_1.ReadOnly()
    ], Coverage.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], Coverage.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Coverage.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Coverage.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Coverage.prototype, "policyHolder", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Coverage.prototype, "subscriber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Coverage.prototype, "subscriberId", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Coverage.prototype, "beneficiary", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Coverage.prototype, "dependent", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Coverage.prototype, "relationship", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], Coverage.prototype, "period", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Coverage.prototype, "payor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CoverageClass.schema()); }))
    ], Coverage.prototype, "class_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Coverage.prototype, "order", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Coverage.prototype, "network", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CoverageCostToBeneficiary.schema()); }))
    ], Coverage.prototype, "costToBeneficiary", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], Coverage.prototype, "subrogation", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Coverage.prototype, "contract", void 0);
    return Coverage;
}(DomainResource));
exports.Coverage = Coverage;
var EncounterStatusHistory = (function (_super) {
    tslib_1.__extends(EncounterStatusHistory, _super);
    function EncounterStatusHistory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Encounter.EncounterStatusHistory'),
        convector_core_model_1.ReadOnly()
    ], EncounterStatusHistory.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], EncounterStatusHistory.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], EncounterStatusHistory.prototype, "period", void 0);
    return EncounterStatusHistory;
}(BackboneElement));
exports.EncounterStatusHistory = EncounterStatusHistory;
var EncounterClassHistory = (function (_super) {
    tslib_1.__extends(EncounterClassHistory, _super);
    function EncounterClassHistory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Encounter.EncounterClassHistory'),
        convector_core_model_1.ReadOnly()
    ], EncounterClassHistory.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Coding.schema(); }))
    ], EncounterClassHistory.prototype, "class_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], EncounterClassHistory.prototype, "period", void 0);
    return EncounterClassHistory;
}(BackboneElement));
exports.EncounterClassHistory = EncounterClassHistory;
var EncounterParticipant = (function (_super) {
    tslib_1.__extends(EncounterParticipant, _super);
    function EncounterParticipant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Encounter.EncounterParticipant'),
        convector_core_model_1.ReadOnly()
    ], EncounterParticipant.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], EncounterParticipant.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], EncounterParticipant.prototype, "period", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], EncounterParticipant.prototype, "individual", void 0);
    return EncounterParticipant;
}(BackboneElement));
exports.EncounterParticipant = EncounterParticipant;
var EncounterDiagnosis = (function (_super) {
    tslib_1.__extends(EncounterDiagnosis, _super);
    function EncounterDiagnosis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Encounter.EncounterDiagnosis'),
        convector_core_model_1.ReadOnly()
    ], EncounterDiagnosis.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], EncounterDiagnosis.prototype, "condition", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], EncounterDiagnosis.prototype, "use", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], EncounterDiagnosis.prototype, "rank", void 0);
    return EncounterDiagnosis;
}(BackboneElement));
exports.EncounterDiagnosis = EncounterDiagnosis;
var EncounterHospitalization = (function (_super) {
    tslib_1.__extends(EncounterHospitalization, _super);
    function EncounterHospitalization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Encounter.EncounterHospitalization'),
        convector_core_model_1.ReadOnly()
    ], EncounterHospitalization.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Identifier.schema(); }))
    ], EncounterHospitalization.prototype, "preAdmissionIdentifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], EncounterHospitalization.prototype, "origin", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], EncounterHospitalization.prototype, "admitSource", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], EncounterHospitalization.prototype, "reAdmission", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], EncounterHospitalization.prototype, "dietPreference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], EncounterHospitalization.prototype, "specialCourtesy", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], EncounterHospitalization.prototype, "specialArrangement", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], EncounterHospitalization.prototype, "destination", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], EncounterHospitalization.prototype, "dischargeDisposition", void 0);
    return EncounterHospitalization;
}(BackboneElement));
exports.EncounterHospitalization = EncounterHospitalization;
var EncounterLocation = (function (_super) {
    tslib_1.__extends(EncounterLocation, _super);
    function EncounterLocation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Encounter.EncounterLocation'),
        convector_core_model_1.ReadOnly()
    ], EncounterLocation.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], EncounterLocation.prototype, "location", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], EncounterLocation.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], EncounterLocation.prototype, "physicalType", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], EncounterLocation.prototype, "period", void 0);
    return EncounterLocation;
}(BackboneElement));
exports.EncounterLocation = EncounterLocation;
var Encounter = (function (_super) {
    tslib_1.__extends(Encounter, _super);
    function Encounter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Encounter'),
        convector_core_model_1.ReadOnly()
    ], Encounter.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], Encounter.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Encounter.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(EncounterStatusHistory.schema()); }))
    ], Encounter.prototype, "statusHistory", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Coding.schema(); }))
    ], Encounter.prototype, "class_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(EncounterClassHistory.schema()); }))
    ], Encounter.prototype, "classHistory", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], Encounter.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Encounter.prototype, "serviceType", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Encounter.prototype, "priority", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Encounter.prototype, "subject", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Encounter.prototype, "episodeOfCare", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Encounter.prototype, "basedOn", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(EncounterParticipant.schema()); }))
    ], Encounter.prototype, "participant", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Encounter.prototype, "appointment", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], Encounter.prototype, "period", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Duration.schema(); }))
    ], Encounter.prototype, "length", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], Encounter.prototype, "reasonCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Encounter.prototype, "reasonReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(EncounterDiagnosis.schema()); }))
    ], Encounter.prototype, "diagnosis", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Encounter.prototype, "account", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return EncounterHospitalization.schema(); }))
    ], Encounter.prototype, "hospitalization", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(EncounterLocation.schema()); }))
    ], Encounter.prototype, "location", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Encounter.prototype, "serviceProvider", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Encounter.prototype, "partOf", void 0);
    return Encounter;
}(DomainResource));
exports.Encounter = Encounter;
var ExplanationOfBenefitRelated = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitRelated, _super);
    function ExplanationOfBenefitRelated() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitRelated'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitRelated.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefitRelated.prototype, "claim", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitRelated.prototype, "relationship", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Identifier.schema(); }))
    ], ExplanationOfBenefitRelated.prototype, "reference", void 0);
    return ExplanationOfBenefitRelated;
}(BackboneElement));
exports.ExplanationOfBenefitRelated = ExplanationOfBenefitRelated;
var ExplanationOfBenefitPayee = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitPayee, _super);
    function ExplanationOfBenefitPayee() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitPayee'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitPayee.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitPayee.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefitPayee.prototype, "party", void 0);
    return ExplanationOfBenefitPayee;
}(BackboneElement));
exports.ExplanationOfBenefitPayee = ExplanationOfBenefitPayee;
var ExplanationOfBenefitCareTeam = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitCareTeam, _super);
    function ExplanationOfBenefitCareTeam() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitCareTeam'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitCareTeam.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitCareTeam.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefitCareTeam.prototype, "provider", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], ExplanationOfBenefitCareTeam.prototype, "responsible", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitCareTeam.prototype, "role", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitCareTeam.prototype, "qualification", void 0);
    return ExplanationOfBenefitCareTeam;
}(BackboneElement));
exports.ExplanationOfBenefitCareTeam = ExplanationOfBenefitCareTeam;
var ExplanationOfBenefitSupportingInfo = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitSupportingInfo, _super);
    function ExplanationOfBenefitSupportingInfo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitSupportingInfo'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitSupportingInfo.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitSupportingInfo.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitSupportingInfo.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitSupportingInfo.prototype, "code", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ExplanationOfBenefitSupportingInfo.prototype, "timingDate", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], ExplanationOfBenefitSupportingInfo.prototype, "timingPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], ExplanationOfBenefitSupportingInfo.prototype, "valueBoolean", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ExplanationOfBenefitSupportingInfo.prototype, "valueString", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Quantity.schema(); }))
    ], ExplanationOfBenefitSupportingInfo.prototype, "valueQuantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefitSupportingInfo.prototype, "valueReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Coding.schema(); }))
    ], ExplanationOfBenefitSupportingInfo.prototype, "reason", void 0);
    return ExplanationOfBenefitSupportingInfo;
}(BackboneElement));
exports.ExplanationOfBenefitSupportingInfo = ExplanationOfBenefitSupportingInfo;
var ExplanationOfBenefitDiagnosis = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitDiagnosis, _super);
    function ExplanationOfBenefitDiagnosis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitDiagnosis'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitDiagnosis.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitDiagnosis.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitDiagnosis.prototype, "diagnosisCodeableConcept", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefitDiagnosis.prototype, "diagnosisReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitDiagnosis.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitDiagnosis.prototype, "onAdmission", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitDiagnosis.prototype, "packageCode", void 0);
    return ExplanationOfBenefitDiagnosis;
}(BackboneElement));
exports.ExplanationOfBenefitDiagnosis = ExplanationOfBenefitDiagnosis;
var ExplanationOfBenefitProcedure = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitProcedure, _super);
    function ExplanationOfBenefitProcedure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitProcedure'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitProcedure.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitProcedure.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitProcedure.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ExplanationOfBenefitProcedure.prototype, "date", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitProcedure.prototype, "procedureCodeableConcept", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefitProcedure.prototype, "procedureReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ExplanationOfBenefitProcedure.prototype, "udi", void 0);
    return ExplanationOfBenefitProcedure;
}(BackboneElement));
exports.ExplanationOfBenefitProcedure = ExplanationOfBenefitProcedure;
var ExplanationOfBenefitInsurance = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitInsurance, _super);
    function ExplanationOfBenefitInsurance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitInsurance'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitInsurance.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.boolean())
    ], ExplanationOfBenefitInsurance.prototype, "focal", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefitInsurance.prototype, "coverage", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], ExplanationOfBenefitInsurance.prototype, "preAuthRef", void 0);
    return ExplanationOfBenefitInsurance;
}(BackboneElement));
exports.ExplanationOfBenefitInsurance = ExplanationOfBenefitInsurance;
var ExplanationOfBenefitAccident = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitAccident, _super);
    function ExplanationOfBenefitAccident() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitAccident'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitAccident.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ExplanationOfBenefitAccident.prototype, "date", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitAccident.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Address.schema(); }))
    ], ExplanationOfBenefitAccident.prototype, "locationAddress", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefitAccident.prototype, "locationReference", void 0);
    return ExplanationOfBenefitAccident;
}(BackboneElement));
exports.ExplanationOfBenefitAccident = ExplanationOfBenefitAccident;
var ExplanationOfBenefitItem = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitItem, _super);
    function ExplanationOfBenefitItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitItem'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitItem.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitItem.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitItem.prototype, "careTeamSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitItem.prototype, "diagnosisSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitItem.prototype, "procedureSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitItem.prototype, "informationSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItem.prototype, "revenue", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItem.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItem.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitItem.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitItem.prototype, "programCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ExplanationOfBenefitItem.prototype, "servicedDate", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], ExplanationOfBenefitItem.prototype, "servicedPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItem.prototype, "locationCodeableConcept", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Address.schema(); }))
    ], ExplanationOfBenefitItem.prototype, "locationAddress", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefitItem.prototype, "locationReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ExplanationOfBenefitItem.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitItem.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitItem.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitItem.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ExplanationOfBenefitItem.prototype, "udi", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItem.prototype, "bodySite", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitItem.prototype, "subSite", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ExplanationOfBenefitItem.prototype, "encounter", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitItem.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitItemAdjudication.schema()); }))
    ], ExplanationOfBenefitItem.prototype, "adjudication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitItemDetail.schema()); }))
    ], ExplanationOfBenefitItem.prototype, "detail", void 0);
    return ExplanationOfBenefitItem;
}(BackboneElement));
exports.ExplanationOfBenefitItem = ExplanationOfBenefitItem;
var ExplanationOfBenefitItemAdjudication = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitItemAdjudication, _super);
    function ExplanationOfBenefitItemAdjudication() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitItemAdjudication'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitItemAdjudication.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItemAdjudication.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItemAdjudication.prototype, "reason", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitItemAdjudication.prototype, "amount", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitItemAdjudication.prototype, "value", void 0);
    return ExplanationOfBenefitItemAdjudication;
}(BackboneElement));
exports.ExplanationOfBenefitItemAdjudication = ExplanationOfBenefitItemAdjudication;
var ExplanationOfBenefitItemDetail = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitItemDetail, _super);
    function ExplanationOfBenefitItemDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitItemDetail'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitItemDetail.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitItemDetail.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItemDetail.prototype, "revenue", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItemDetail.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItemDetail.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitItemDetail.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitItemDetail.prototype, "programCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ExplanationOfBenefitItemDetail.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitItemDetail.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitItemDetail.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitItemDetail.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ExplanationOfBenefitItemDetail.prototype, "udi", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitItemDetail.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitItemAdjudication.schema()); }))
    ], ExplanationOfBenefitItemDetail.prototype, "adjudication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitItemDetailSubDetail.schema()); }))
    ], ExplanationOfBenefitItemDetail.prototype, "subDetail", void 0);
    return ExplanationOfBenefitItemDetail;
}(BackboneElement));
exports.ExplanationOfBenefitItemDetail = ExplanationOfBenefitItemDetail;
var ExplanationOfBenefitItemDetailSubDetail = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitItemDetailSubDetail, _super);
    function ExplanationOfBenefitItemDetailSubDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitItemDetailSubDetail'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "revenue", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "programCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "udi", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitItemAdjudication.schema()); }))
    ], ExplanationOfBenefitItemDetailSubDetail.prototype, "adjudication", void 0);
    return ExplanationOfBenefitItemDetailSubDetail;
}(BackboneElement));
exports.ExplanationOfBenefitItemDetailSubDetail = ExplanationOfBenefitItemDetailSubDetail;
var ExplanationOfBenefitAddItem = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitAddItem, _super);
    function ExplanationOfBenefitAddItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitAddItem'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitAddItem.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitAddItem.prototype, "itemSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitAddItem.prototype, "detailSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitAddItem.prototype, "subDetailSequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], ExplanationOfBenefitAddItem.prototype, "provider", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitAddItem.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitAddItem.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitAddItem.prototype, "programCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ExplanationOfBenefitAddItem.prototype, "servicedDate", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], ExplanationOfBenefitAddItem.prototype, "servicedPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitAddItem.prototype, "locationCodeableConcept", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Address.schema(); }))
    ], ExplanationOfBenefitAddItem.prototype, "locationAddress", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefitAddItem.prototype, "locationReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ExplanationOfBenefitAddItem.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitAddItem.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitAddItem.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitAddItem.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitAddItem.prototype, "bodySite", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitAddItem.prototype, "subSite", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitAddItem.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitItemAdjudication.schema()); }))
    ], ExplanationOfBenefitAddItem.prototype, "adjudication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitAddItemDetail.schema()); }))
    ], ExplanationOfBenefitAddItem.prototype, "detail", void 0);
    return ExplanationOfBenefitAddItem;
}(BackboneElement));
exports.ExplanationOfBenefitAddItem = ExplanationOfBenefitAddItem;
var ExplanationOfBenefitAddItemDetail = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitAddItemDetail, _super);
    function ExplanationOfBenefitAddItemDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitAddItemDetail'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitAddItemDetail.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitAddItemDetail.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitAddItemDetail.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ExplanationOfBenefitAddItemDetail.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitAddItemDetail.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitAddItemDetail.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitAddItemDetail.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitAddItemDetail.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitItemAdjudication.schema()); }))
    ], ExplanationOfBenefitAddItemDetail.prototype, "adjudication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitAddItemDetailSubDetail.schema()); }))
    ], ExplanationOfBenefitAddItemDetail.prototype, "subDetail", void 0);
    return ExplanationOfBenefitAddItemDetail;
}(BackboneElement));
exports.ExplanationOfBenefitAddItemDetail = ExplanationOfBenefitAddItemDetail;
var ExplanationOfBenefitAddItemDetailSubDetail = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitAddItemDetailSubDetail, _super);
    function ExplanationOfBenefitAddItemDetailSubDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitAddItemDetailSubDetail'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitAddItemDetailSubDetail.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitAddItemDetailSubDetail.prototype, "productOrService", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], ExplanationOfBenefitAddItemDetailSubDetail.prototype, "modifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return SimpleQuantity.schema(); }))
    ], ExplanationOfBenefitAddItemDetailSubDetail.prototype, "quantity", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitAddItemDetailSubDetail.prototype, "unitPrice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitAddItemDetailSubDetail.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitAddItemDetailSubDetail.prototype, "net", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.number()))
    ], ExplanationOfBenefitAddItemDetailSubDetail.prototype, "noteNumber", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitItemAdjudication.schema()); }))
    ], ExplanationOfBenefitAddItemDetailSubDetail.prototype, "adjudication", void 0);
    return ExplanationOfBenefitAddItemDetailSubDetail;
}(BackboneElement));
exports.ExplanationOfBenefitAddItemDetailSubDetail = ExplanationOfBenefitAddItemDetailSubDetail;
var ExplanationOfBenefitTotal = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitTotal, _super);
    function ExplanationOfBenefitTotal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitTotal'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitTotal.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitTotal.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitTotal.prototype, "amount", void 0);
    return ExplanationOfBenefitTotal;
}(BackboneElement));
exports.ExplanationOfBenefitTotal = ExplanationOfBenefitTotal;
var ExplanationOfBenefitPayment = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitPayment, _super);
    function ExplanationOfBenefitPayment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitPayment'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitPayment.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitPayment.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitPayment.prototype, "adjustment", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitPayment.prototype, "adjustmentReason", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], ExplanationOfBenefitPayment.prototype, "date", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitPayment.prototype, "amount", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Identifier.schema(); }))
    ], ExplanationOfBenefitPayment.prototype, "identifier", void 0);
    return ExplanationOfBenefitPayment;
}(BackboneElement));
exports.ExplanationOfBenefitPayment = ExplanationOfBenefitPayment;
var ExplanationOfBenefitProcessNote = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitProcessNote, _super);
    function ExplanationOfBenefitProcessNote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitProcessNote'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitProcessNote.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitProcessNote.prototype, "number", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ExplanationOfBenefitProcessNote.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ExplanationOfBenefitProcessNote.prototype, "text", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitProcessNote.prototype, "language", void 0);
    return ExplanationOfBenefitProcessNote;
}(BackboneElement));
exports.ExplanationOfBenefitProcessNote = ExplanationOfBenefitProcessNote;
var ExplanationOfBenefitBenefitBalance = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitBenefitBalance, _super);
    function ExplanationOfBenefitBenefitBalance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitBenefitBalance'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitBenefitBalance.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitBenefitBalance.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], ExplanationOfBenefitBenefitBalance.prototype, "excluded", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ExplanationOfBenefitBenefitBalance.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ExplanationOfBenefitBenefitBalance.prototype, "description", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitBenefitBalance.prototype, "network", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitBenefitBalance.prototype, "unit", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitBenefitBalance.prototype, "term", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitBenefitBalanceFinancial.schema()); }))
    ], ExplanationOfBenefitBenefitBalance.prototype, "financial", void 0);
    return ExplanationOfBenefitBenefitBalance;
}(BackboneElement));
exports.ExplanationOfBenefitBenefitBalance = ExplanationOfBenefitBenefitBalance;
var ExplanationOfBenefitBenefitBalanceFinancial = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefitBenefitBalanceFinancial, _super);
    function ExplanationOfBenefitBenefitBalanceFinancial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit.ExplanationOfBenefitBenefitBalanceFinancial'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefitBenefitBalanceFinancial.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefitBenefitBalanceFinancial.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitBenefitBalanceFinancial.prototype, "allowedUnsignedInt", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ExplanationOfBenefitBenefitBalanceFinancial.prototype, "allowedString", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitBenefitBalanceFinancial.prototype, "allowedMoney", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefitBenefitBalanceFinancial.prototype, "usedUnsignedInt", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], ExplanationOfBenefitBenefitBalanceFinancial.prototype, "usedMoney", void 0);
    return ExplanationOfBenefitBenefitBalanceFinancial;
}(BackboneElement));
exports.ExplanationOfBenefitBenefitBalanceFinancial = ExplanationOfBenefitBenefitBalanceFinancial;
var ExplanationOfBenefit = (function (_super) {
    tslib_1.__extends(ExplanationOfBenefit, _super);
    function ExplanationOfBenefit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.ExplanationOfBenefit'),
        convector_core_model_1.ReadOnly()
    ], ExplanationOfBenefit.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], ExplanationOfBenefit.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], ExplanationOfBenefit.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefit.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefit.prototype, "subType", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], ExplanationOfBenefit.prototype, "use", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefit.prototype, "patient", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], ExplanationOfBenefit.prototype, "billablePeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.date())
    ], ExplanationOfBenefit.prototype, "created", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefit.prototype, "enterer", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefit.prototype, "insurer", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefit.prototype, "provider", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefit.prototype, "priority", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefit.prototype, "fundsReserveRequested", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefit.prototype, "fundsReserve", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitRelated.schema()); }))
    ], ExplanationOfBenefit.prototype, "related", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefit.prototype, "prescription", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefit.prototype, "originalPrescription", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return ExplanationOfBenefitPayee.schema(); }))
    ], ExplanationOfBenefit.prototype, "payee", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefit.prototype, "referral", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefit.prototype, "facility", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefit.prototype, "claim", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ExplanationOfBenefit.prototype, "claimResponse", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], ExplanationOfBenefit.prototype, "outcome", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], ExplanationOfBenefit.prototype, "disposition", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], ExplanationOfBenefit.prototype, "preAuthRef", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Period.schema()); }))
    ], ExplanationOfBenefit.prototype, "preAuthRefPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitCareTeam.schema()); }))
    ], ExplanationOfBenefit.prototype, "careTeam", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitSupportingInfo.schema()); }))
    ], ExplanationOfBenefit.prototype, "supportingInfo", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitDiagnosis.schema()); }))
    ], ExplanationOfBenefit.prototype, "diagnosis", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitProcedure.schema()); }))
    ], ExplanationOfBenefit.prototype, "procedure", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], ExplanationOfBenefit.prototype, "precedence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitInsurance.schema()); }))
    ], ExplanationOfBenefit.prototype, "insurance", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return ExplanationOfBenefitAccident.schema(); }))
    ], ExplanationOfBenefit.prototype, "accident", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitItem.schema()); }))
    ], ExplanationOfBenefit.prototype, "item", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitAddItem.schema()); }))
    ], ExplanationOfBenefit.prototype, "addItem", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitItemAdjudication.schema()); }))
    ], ExplanationOfBenefit.prototype, "adjudication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitTotal.schema()); }))
    ], ExplanationOfBenefit.prototype, "total", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return ExplanationOfBenefitPayment.schema(); }))
    ], ExplanationOfBenefit.prototype, "payment", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ExplanationOfBenefit.prototype, "formCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitProcessNote.schema()); }))
    ], ExplanationOfBenefit.prototype, "processNote", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], ExplanationOfBenefit.prototype, "benefitPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ExplanationOfBenefitBenefitBalance.schema()); }))
    ], ExplanationOfBenefit.prototype, "benefitBalance", void 0);
    return ExplanationOfBenefit;
}(DomainResource));
exports.ExplanationOfBenefit = ExplanationOfBenefit;
var InvoiceParticipant = (function (_super) {
    tslib_1.__extends(InvoiceParticipant, _super);
    function InvoiceParticipant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Invoice.InvoiceParticipant'),
        convector_core_model_1.ReadOnly()
    ], InvoiceParticipant.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], InvoiceParticipant.prototype, "role", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], InvoiceParticipant.prototype, "actor", void 0);
    return InvoiceParticipant;
}(BackboneElement));
exports.InvoiceParticipant = InvoiceParticipant;
var InvoiceLineItem = (function (_super) {
    tslib_1.__extends(InvoiceLineItem, _super);
    function InvoiceLineItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Invoice.InvoiceLineItem'),
        convector_core_model_1.ReadOnly()
    ], InvoiceLineItem.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], InvoiceLineItem.prototype, "sequence", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], InvoiceLineItem.prototype, "chargeItemReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], InvoiceLineItem.prototype, "chargeItemCodeableConcept", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(InvoiceLineItemPriceComponent.schema()); }))
    ], InvoiceLineItem.prototype, "priceComponent", void 0);
    return InvoiceLineItem;
}(BackboneElement));
exports.InvoiceLineItem = InvoiceLineItem;
var InvoiceLineItemPriceComponent = (function (_super) {
    tslib_1.__extends(InvoiceLineItemPriceComponent, _super);
    function InvoiceLineItemPriceComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Invoice.InvoiceLineItemPriceComponent'),
        convector_core_model_1.ReadOnly()
    ], InvoiceLineItemPriceComponent.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], InvoiceLineItemPriceComponent.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], InvoiceLineItemPriceComponent.prototype, "code", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], InvoiceLineItemPriceComponent.prototype, "factor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], InvoiceLineItemPriceComponent.prototype, "amount", void 0);
    return InvoiceLineItemPriceComponent;
}(BackboneElement));
exports.InvoiceLineItemPriceComponent = InvoiceLineItemPriceComponent;
var Invoice = (function (_super) {
    tslib_1.__extends(Invoice, _super);
    function Invoice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Invoice'),
        convector_core_model_1.ReadOnly()
    ], Invoice.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], Invoice.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Invoice.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Invoice.prototype, "cancelledReason", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Invoice.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Invoice.prototype, "subject", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Invoice.prototype, "recipient", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], Invoice.prototype, "date", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(InvoiceParticipant.schema()); }))
    ], Invoice.prototype, "participant", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Invoice.prototype, "issuer", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Invoice.prototype, "account", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(InvoiceLineItem.schema()); }))
    ], Invoice.prototype, "lineItem", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(InvoiceLineItemPriceComponent.schema()); }))
    ], Invoice.prototype, "totalPriceComponent", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], Invoice.prototype, "totalNet", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], Invoice.prototype, "totalGross", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Invoice.prototype, "paymentTerms", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Annotation.schema()); }))
    ], Invoice.prototype, "note", void 0);
    return Invoice;
}(DomainResource));
exports.Invoice = Invoice;
var OrganizationContact = (function (_super) {
    tslib_1.__extends(OrganizationContact, _super);
    function OrganizationContact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Organization.OrganizationContact'),
        convector_core_model_1.ReadOnly()
    ], OrganizationContact.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], OrganizationContact.prototype, "purpose", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return HumanName.schema(); }))
    ], OrganizationContact.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ContactPoint.schema()); }))
    ], OrganizationContact.prototype, "telecom", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Address.schema(); }))
    ], OrganizationContact.prototype, "address", void 0);
    return OrganizationContact;
}(BackboneElement));
exports.OrganizationContact = OrganizationContact;
var Organization = (function (_super) {
    tslib_1.__extends(Organization, _super);
    function Organization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Organization'),
        convector_core_model_1.ReadOnly()
    ], Organization.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], Organization.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], Organization.prototype, "active", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], Organization.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Organization.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], Organization.prototype, "alias", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ContactPoint.schema()); }))
    ], Organization.prototype, "telecom", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Address.schema()); }))
    ], Organization.prototype, "address", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Organization.prototype, "partOf", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(OrganizationContact.schema()); }))
    ], Organization.prototype, "contact", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Organization.prototype, "endpoint", void 0);
    return Organization;
}(DomainResource));
exports.Organization = Organization;
var PatientContact = (function (_super) {
    tslib_1.__extends(PatientContact, _super);
    function PatientContact() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Patient.PatientContact'),
        convector_core_model_1.ReadOnly()
    ], PatientContact.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], PatientContact.prototype, "relationship", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return HumanName.schema(); }))
    ], PatientContact.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ContactPoint.schema()); }))
    ], PatientContact.prototype, "telecom", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Address.schema(); }))
    ], PatientContact.prototype, "address", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], PatientContact.prototype, "gender", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PatientContact.prototype, "organization", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], PatientContact.prototype, "period", void 0);
    return PatientContact;
}(BackboneElement));
exports.PatientContact = PatientContact;
var PatientCommunication = (function (_super) {
    tslib_1.__extends(PatientCommunication, _super);
    function PatientCommunication() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Patient.PatientCommunication'),
        convector_core_model_1.ReadOnly()
    ], PatientCommunication.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], PatientCommunication.prototype, "language", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], PatientCommunication.prototype, "preferred", void 0);
    return PatientCommunication;
}(BackboneElement));
exports.PatientCommunication = PatientCommunication;
var PatientLink = (function (_super) {
    tslib_1.__extends(PatientLink, _super);
    function PatientLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Patient.PatientLink'),
        convector_core_model_1.ReadOnly()
    ], PatientLink.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PatientLink.prototype, "other", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], PatientLink.prototype, "type_", void 0);
    return PatientLink;
}(BackboneElement));
exports.PatientLink = PatientLink;
var Patient = (function (_super) {
    tslib_1.__extends(Patient, _super);
    function Patient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Patient'),
        convector_core_model_1.ReadOnly()
    ], Patient.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], Patient.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], Patient.prototype, "active", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(HumanName.schema()); }))
    ], Patient.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ContactPoint.schema()); }))
    ], Patient.prototype, "telecom", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Patient.prototype, "gender", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], Patient.prototype, "birthDate", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], Patient.prototype, "deceasedBoolean", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], Patient.prototype, "deceasedDateTime", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Address.schema()); }))
    ], Patient.prototype, "address", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Patient.prototype, "maritalStatus", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], Patient.prototype, "multipleBirthBoolean", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.number())
    ], Patient.prototype, "multipleBirthInteger", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(PatientContact.schema()); }))
    ], Patient.prototype, "contact", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(PatientCommunication.schema()); }))
    ], Patient.prototype, "communication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Patient.prototype, "generalPractitioner", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Patient.prototype, "managingOrganization", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(PatientLink.schema()); }))
    ], Patient.prototype, "link", void 0);
    return Patient;
}(DomainResource));
exports.Patient = Patient;
var PaymentNotice = (function (_super) {
    tslib_1.__extends(PaymentNotice, _super);
    function PaymentNotice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.PaymentNotice'),
        convector_core_model_1.ReadOnly()
    ], PaymentNotice.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], PaymentNotice.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], PaymentNotice.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentNotice.prototype, "request", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentNotice.prototype, "response", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.date())
    ], PaymentNotice.prototype, "created", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentNotice.prototype, "provider", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentNotice.prototype, "payment", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], PaymentNotice.prototype, "paymentDate", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentNotice.prototype, "payee", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentNotice.prototype, "recipient", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], PaymentNotice.prototype, "amount", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], PaymentNotice.prototype, "paymentStatus", void 0);
    return PaymentNotice;
}(DomainResource));
exports.PaymentNotice = PaymentNotice;
var PaymentReconciliationDetail = (function (_super) {
    tslib_1.__extends(PaymentReconciliationDetail, _super);
    function PaymentReconciliationDetail() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.PaymentReconciliation.PaymentReconciliationDetail'),
        convector_core_model_1.ReadOnly()
    ], PaymentReconciliationDetail.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Identifier.schema(); }))
    ], PaymentReconciliationDetail.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Identifier.schema(); }))
    ], PaymentReconciliationDetail.prototype, "predecessor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], PaymentReconciliationDetail.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentReconciliationDetail.prototype, "request", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentReconciliationDetail.prototype, "submitter", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentReconciliationDetail.prototype, "response", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], PaymentReconciliationDetail.prototype, "date", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentReconciliationDetail.prototype, "responsible", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentReconciliationDetail.prototype, "payee", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], PaymentReconciliationDetail.prototype, "amount", void 0);
    return PaymentReconciliationDetail;
}(BackboneElement));
exports.PaymentReconciliationDetail = PaymentReconciliationDetail;
var PaymentReconciliationProcessNote = (function (_super) {
    tslib_1.__extends(PaymentReconciliationProcessNote, _super);
    function PaymentReconciliationProcessNote() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.PaymentReconciliation.PaymentReconciliationProcessNote'),
        convector_core_model_1.ReadOnly()
    ], PaymentReconciliationProcessNote.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], PaymentReconciliationProcessNote.prototype, "type_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], PaymentReconciliationProcessNote.prototype, "text", void 0);
    return PaymentReconciliationProcessNote;
}(BackboneElement));
exports.PaymentReconciliationProcessNote = PaymentReconciliationProcessNote;
var PaymentReconciliation = (function (_super) {
    tslib_1.__extends(PaymentReconciliation, _super);
    function PaymentReconciliation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.PaymentReconciliation'),
        convector_core_model_1.ReadOnly()
    ], PaymentReconciliation.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], PaymentReconciliation.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], PaymentReconciliation.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], PaymentReconciliation.prototype, "period", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.date())
    ], PaymentReconciliation.prototype, "created", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentReconciliation.prototype, "paymentIssuer", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentReconciliation.prototype, "request", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PaymentReconciliation.prototype, "requestor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], PaymentReconciliation.prototype, "outcome", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], PaymentReconciliation.prototype, "disposition", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.date())
    ], PaymentReconciliation.prototype, "paymentDate", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Money.schema(); }))
    ], PaymentReconciliation.prototype, "paymentAmount", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Identifier.schema(); }))
    ], PaymentReconciliation.prototype, "paymentIdentifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(PaymentReconciliationDetail.schema()); }))
    ], PaymentReconciliation.prototype, "detail", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], PaymentReconciliation.prototype, "formCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(PaymentReconciliationProcessNote.schema()); }))
    ], PaymentReconciliation.prototype, "processNote", void 0);
    return PaymentReconciliation;
}(DomainResource));
exports.PaymentReconciliation = PaymentReconciliation;
var PractitionerQualification = (function (_super) {
    tslib_1.__extends(PractitionerQualification, _super);
    function PractitionerQualification() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Practitioner.PractitionerQualification'),
        convector_core_model_1.ReadOnly()
    ], PractitionerQualification.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], PractitionerQualification.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], PractitionerQualification.prototype, "code", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], PractitionerQualification.prototype, "period", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], PractitionerQualification.prototype, "issuer", void 0);
    return PractitionerQualification;
}(BackboneElement));
exports.PractitionerQualification = PractitionerQualification;
var Practitioner = (function (_super) {
    tslib_1.__extends(Practitioner, _super);
    function Practitioner() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Practitioner'),
        convector_core_model_1.ReadOnly()
    ], Practitioner.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], Practitioner.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.boolean())
    ], Practitioner.prototype, "active", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(HumanName.schema()); }))
    ], Practitioner.prototype, "name", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ContactPoint.schema()); }))
    ], Practitioner.prototype, "telecom", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Address.schema()); }))
    ], Practitioner.prototype, "address", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Practitioner.prototype, "gender", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], Practitioner.prototype, "birthDate", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(PractitionerQualification.schema()); }))
    ], Practitioner.prototype, "qualification", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], Practitioner.prototype, "communication", void 0);
    return Practitioner;
}(DomainResource));
exports.Practitioner = Practitioner;
var ProcedurePerformer = (function (_super) {
    tslib_1.__extends(ProcedurePerformer, _super);
    function ProcedurePerformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Procedure.ProcedurePerformer'),
        convector_core_model_1.ReadOnly()
    ], ProcedurePerformer.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ProcedurePerformer.prototype, "function_", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ProcedurePerformer.prototype, "actor", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ProcedurePerformer.prototype, "onBehalfOf", void 0);
    return ProcedurePerformer;
}(BackboneElement));
exports.ProcedurePerformer = ProcedurePerformer;
var ProcedureFocalDevice = (function (_super) {
    tslib_1.__extends(ProcedureFocalDevice, _super);
    function ProcedureFocalDevice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Procedure.ProcedureFocalDevice'),
        convector_core_model_1.ReadOnly()
    ], ProcedureFocalDevice.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], ProcedureFocalDevice.prototype, "action", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], ProcedureFocalDevice.prototype, "manipulated", void 0);
    return ProcedureFocalDevice;
}(BackboneElement));
exports.ProcedureFocalDevice = ProcedureFocalDevice;
var Procedure = (function (_super) {
    tslib_1.__extends(Procedure, _super);
    function Procedure() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        convector_core_model_1.Default('fhir.datatypes.Procedure'),
        convector_core_model_1.ReadOnly()
    ], Procedure.prototype, "type", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Identifier.schema()); }))
    ], Procedure.prototype, "identifier", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], Procedure.prototype, "instantiatesCanonical", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.array(yup.string()))
    ], Procedure.prototype, "instantiatesUri", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Procedure.prototype, "basedOn", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Procedure.prototype, "partOf", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.string())
    ], Procedure.prototype, "status", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Procedure.prototype, "statusReason", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Procedure.prototype, "category", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Procedure.prototype, "code", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Required(),
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Procedure.prototype, "subject", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Procedure.prototype, "encounter", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.date())
    ], Procedure.prototype, "performedDateTime", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Period.schema(); }))
    ], Procedure.prototype, "performedPeriod", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.string())
    ], Procedure.prototype, "performedString", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Age.schema(); }))
    ], Procedure.prototype, "performedAge", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Range.schema(); }))
    ], Procedure.prototype, "performedRange", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Procedure.prototype, "recorder", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Procedure.prototype, "asserter", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ProcedurePerformer.schema()); }))
    ], Procedure.prototype, "performer", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return Reference.schema(); }))
    ], Procedure.prototype, "location", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], Procedure.prototype, "reasonCode", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Procedure.prototype, "reasonReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], Procedure.prototype, "bodySite", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return CodeableConcept.schema(); }))
    ], Procedure.prototype, "outcome", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Procedure.prototype, "report", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], Procedure.prototype, "complication", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Procedure.prototype, "complicationDetail", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], Procedure.prototype, "followUp", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Annotation.schema()); }))
    ], Procedure.prototype, "note", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(ProcedureFocalDevice.schema()); }))
    ], Procedure.prototype, "focalDevice", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(Reference.schema()); }))
    ], Procedure.prototype, "usedReference", void 0);
    tslib_1.__decorate([
        convector_core_model_1.Validate(yup.lazy(function () { return yup.array(CodeableConcept.schema()); }))
    ], Procedure.prototype, "usedCode", void 0);
    return Procedure;
}(DomainResource));
exports.Procedure = Procedure;
//# sourceMappingURL=fhir.model.js.map