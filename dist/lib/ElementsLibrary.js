"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ElementsLibrary = /** @class */ (function () {
    function ElementsLibrary(libraryDefinition) {
        this.mappings = {};
        this.targets = {};
        var name = libraryDefinition.name, version = libraryDefinition.version, type = libraryDefinition.type, elements = libraryDefinition.elements;
        this.name = name;
        this.version = version;
        this.type = type;
        this.elements = elements;
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
        mapping.setLibrary(this);
    };
    /**
     * retrieves a target for the current elements library
     * @param targetName
     */
    ElementsLibrary.prototype.target = function (targetName) {
        return this.targets[targetName];
    };
    /**
     *
     * @param guiData sets up gui data to be used by the Teleport Playground Inspector
     */
    // @todo should this stay in the core class?
    ElementsLibrary.prototype.useGui = function (guiData) {
        var _this = this;
        if (guiData.library !== this.name)
            throw new Error("Library gui " + guiData.library + " not compatible with " + this.name);
        if (!guiData.elements)
            throw new Error("invalid gui defintion for " + this.name);
        Object.keys(guiData.elements).map(function (elementName) {
            var element = _this.elements[elementName];
            if (!element)
                return;
            element.gui = guiData.elements[elementName];
        });
    };
    /**
     * applies data from a generic object to the current library
     * @param libData
     */
    ElementsLibrary.prototype.applyData = function (libData) {
        Object.assign(this, libData);
    };
    return ElementsLibrary;
}());
exports.default = ElementsLibrary;
//# sourceMappingURL=ElementsLibrary.js.map