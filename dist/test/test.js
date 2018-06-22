"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Publisher_1 = require("../src/lib/Publisher");
describe('Plugins', function () {
    it('should return the correct name & type', function () {
        var name = 'test';
        var publisher = new Publisher_1.default(name);
        expect(publisher.name).toBe(name);
        expect(publisher.type).toBe('publisher');
    });
});
//# sourceMappingURL=test.js.map