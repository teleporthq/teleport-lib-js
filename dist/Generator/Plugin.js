"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GeneratorPlugin = /** @class */ (function () {
    function GeneratorPlugin(name, targetName) {
        this.type = 'generator-plugin';
        this.name = name;
        this.targetName = targetName;
    }
    GeneratorPlugin.prototype.setTarget = function (target) {
        this.target = target;
    };
    GeneratorPlugin.prototype.setGenerator = function (generator) {
        this.generator = generator;
    };
    return GeneratorPlugin;
}());
exports.default = GeneratorPlugin;
//# sourceMappingURL=Plugin.js.map