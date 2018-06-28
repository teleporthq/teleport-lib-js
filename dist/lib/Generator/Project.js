"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProjectGenerator = /** @class */ (function () {
    function ProjectGenerator(generator) {
        this.generator = generator;
    }
    ProjectGenerator.prototype.generate = function (project, options) {
        throw new Error("PROJECT GENERATOR'S GENERATE METHOD SHOULD NOT BE INVOKED DIRECTLY! Please use a target specific generator");
    };
    return ProjectGenerator;
}());
exports.default = ProjectGenerator;
//# sourceMappingURL=Project.js.map