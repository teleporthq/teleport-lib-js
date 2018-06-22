"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Publisher_1 = require("../../../src/lib/Publisher");
describe('Publisher', function () {
    var name = 'test';
    var publisher = new Publisher_1.default(name);
    it('should return the correct name', function () {
        expect(publisher.name).toBe(name);
    });
    it('should return the correct type', function () {
        expect(publisher.type).toBe('publisher');
    });
});
//# sourceMappingURL=publisher.js.map