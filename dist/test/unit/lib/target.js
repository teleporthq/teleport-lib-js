"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Generator_1 = require("../../../src/lib/Generator");
var Target_1 = require("../../../src/lib/Target");
describe('Target', function () {
    var name = 'test';
    var generator = new Generator_1.default('name', 'targetName');
    var target = new Target_1.default(name);
    it('should return the correct name', function () {
        expect(target.name).toBe(name);
    });
    it('should throw a "no generator registered" error', function () {
        expect(function () { return target.generator; }).toThrow("No generator registered for target " + name);
    });
    it('should be a Generator instance (target.generator)', function () {
        target.setGenerator(generator);
        expect(target.generator).toBeInstanceOf(Generator_1.default);
    });
    it('should throw a "already registered" error', function () {
        expect(function () { return target.setGenerator(generator); }).toThrow("A Generator for target " + name + " is already registered");
    });
});
//# sourceMappingURL=target.js.map