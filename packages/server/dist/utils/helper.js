"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Helper = (function () {
    function Helper() {
    }
    Object.defineProperty(Helper, "chaincode", {
        get: function () { return process.env.CHAINCODE; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Helper, "channel", {
        get: function () { return process.env.CHANNEL; },
        enumerable: true,
        configurable: true
    });
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map