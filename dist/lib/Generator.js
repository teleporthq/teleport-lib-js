"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Generator = /** @class */ (function () {
    function Generator(name, targetName) {
        this.type = 'generator';
        this.name = name;
        this.targetName = targetName;
    }
    Generator.prototype.setTarget = function (target) {
        this.target = target;
    };
    return Generator;
}());
exports.default = Generator;
//# sourceMappingURL=Generator.js.map