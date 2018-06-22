"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Generator_1 = require("../../../src/lib/Generator");
var Target_1 = require("../../../src/lib/Target");
describe('Generator', function () {
    var name = 'test';
    var targetName = 'test';
    var generator = new Generator_1.default(name, targetName);
    var target = new Target_1.default('test');
    it('should return the correct name', function () {
        expect(generator.name).toBe(name);
    });
    it('should return a Target instance', function () {
        generator.setTarget(target);
        expect(generator.target).toBeInstanceOf(Target_1.default);
    });
});
//# sourceMappingURL=generator.js.map