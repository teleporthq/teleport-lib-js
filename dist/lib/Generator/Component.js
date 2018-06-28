"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentGenerator = /** @class */ (function () {
    function ComponentGenerator(generator) {
        this.generator = generator;
    }
    ComponentGenerator.prototype.generate = function (component, options) {
        throw new Error("COMPONENT GENERATOR'S GENERATE METHOD SHOULD NOT BE INVOKED DIRECTLY! Please use a target specific generator");
    };
    return ComponentGenerator;
}());
exports.default = ComponentGenerator;
//# sourceMappingURL=Component.js.map