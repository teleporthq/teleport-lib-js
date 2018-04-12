"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ElementsLibrary = /** @class */ (function () {
    function ElementsLibrary(libraryDefinition) {
        this.mappings = {};
        this.targets = {};
        this.targetMapping = {};
        Object.assign(this, libraryDefinition);
    }
    /**
     * retrieves an element by it's name
     * @param name
     */
    ElementsLibrary.prototype.element = function (name) {
        return this.elements[name];
    };
    /**
     * adds a target mapping to the current library
     * sets up all internal wiring of dependencies between the library,
     * target and mapping
     * @param mapping
     */
    ElementsLibrary.prototype.useMapping = function (mapping) {
        this.mappings[mapping.name] = mapping;
        var target = mapping.target;
        this.targets[target.name] = target;
        this.targetMapping[target.name] = mapping;
        mapping.setLibrary(this);
    };
    /**
     * applies data from a generic object to the current library
     * @param libData
     */
    ElementsLibrary.prototype.applyData = function (libData) {
        Object.assign(this, libData);
    };
    /**
     * retrieves a target for the current elements library
     * @param targetName
     */
    ElementsLibrary.prototype.target = function (targetName) {
        return this.targets[targetName];
    };
    /**
     * retrieves all mappings of the current library for a target
     * @param targetName
     */
    ElementsLibrary.prototype.mapping = function (targetName) {
        return this.targetMapping[targetName];
    };
    return ElementsLibrary;
}());
exports.default = ElementsLibrary;
//# sourceMappingURL=ElementsLibrary.js.map