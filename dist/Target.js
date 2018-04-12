"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Target = /** @class */ (function () {
    function Target(name) {
        /**
         * all mappings defined for this target
         */
        this.mappings = {};
        /**
         * all mappings indexed by their elements library defined for this target
         */
        this.mappingsByLibrary = {};
        this.name = name;
    }
    /**
     * sets up a mapping to be used within this target
     * @param mapping the mapping to be used
     */
    Target.prototype.useMapping = function (mapping) {
        this.mappings[mapping.name] = mapping;
        this.mappingsByLibrary[mapping.library.name || mapping.library] = mapping;
        mapping.setTarget(this);
    };
    Target.prototype.setGenerator = function (generator) {
        if (this.generator)
            throw new Error("A Generator for target " + this.name + " is already registered");
        this.generator = generator;
    };
    /**
     * retrieves a mapping by it's name
     * @param mappingName
     */
    Target.prototype.mapping = function (mappingName) {
        return this.mappings[mappingName];
    };
    /**
     * returns the mapping equivalent to an elements library
     * @param libraryName
     */
    Target.prototype.mapLibrary = function (libraryName) {
        return this.mappingsByLibrary[libraryName];
    };
    /**
     * returns the mapping of an element within the current target
     * @param source source element library
     * @param type name if the element
     */
    Target.prototype.map = function (source, type) {
        var mapping = this.mapLibrary(source);
        if (!mapping)
            return null;
        return mapping.map(type);
    };
    return Target;
}());
exports.default = Target;
//# sourceMappingURL=Target.js.map