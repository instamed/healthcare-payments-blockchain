"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var convector_core_controller_1 = require("@worldsibu/convector-core-controller");
var participant_model_1 = require("./participant.model");
var ParticipantController = (function (_super) {
    tslib_1.__extends(ParticipantController, _super);
    function ParticipantController() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParticipantController.prototype.create = function (participant) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, participant.save()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    tslib_1.__decorate([
        convector_core_controller_1.Invokable(),
        tslib_1.__param(0, convector_core_controller_1.Param(participant_model_1.Participant))
    ], ParticipantController.prototype, "create", null);
    ParticipantController = tslib_1.__decorate([
        convector_core_controller_1.Controller('participant')
    ], ParticipantController);
    return ParticipantController;
}(convector_core_controller_1.ConvectorController));
exports.ParticipantController = ParticipantController;
//# sourceMappingURL=participant.controller.js.map