"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var convector_core_controller_1 = require("@worldsibu/convector-core-controller");
var FhirController = (function (_super) {
    tslib_1.__extends(FhirController, _super);
    function FhirController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FhirController.prototype.createClaim = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2];
            });
        });
    };
    FhirController.prototype.adjudicateClaim = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2];
            });
        });
    };
    FhirController.prototype.makePayment = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2];
            });
        });
    };
    tslib_1.__decorate([
        convector_core_controller_1.Invokable()
    ], FhirController.prototype, "createClaim", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable()
    ], FhirController.prototype, "adjudicateClaim", null);
    tslib_1.__decorate([
        convector_core_controller_1.Invokable()
    ], FhirController.prototype, "makePayment", null);
    FhirController = tslib_1.__decorate([
        convector_core_controller_1.Controller('fhir')
    ], FhirController);
    return FhirController;
}(convector_core_controller_1.ConvectorController));
exports.FhirController = FhirController;
//# sourceMappingURL=fhir.controller.js.map