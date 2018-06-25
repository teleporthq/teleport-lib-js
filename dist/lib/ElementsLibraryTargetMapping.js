"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ElementsLibraryTargetMapping = /** @class */ (function () {
    function ElementsLibraryTargetMapping(libraryMappingDefinition, instance) {
        this.maps = {};
        this._teleport = instance;
        Object.assign(this, libraryMappingDefinition);
    }
    /**
     * sets the target of the current mapping
     * @param target
     */
    ElementsLibraryTargetMapping.prototype.setTarget = function (target) {
        this.target = target;
        // compute the extended map if there is one
        if (this.extends) {
            var extendedMapping = this._teleport.mapping(this.extends);
            // tslint:disable-next-line:max-line-length
            if (!extendedMapping)
                throw new Error("Mapping '" + this.name + "' depends on '" + this.extends + "' which was not yet registered for target '" + this.target.name + "' Please register it before the current one");
            this.extends = extendedMapping;
            this.maps = __assign({}, this.extends.maps, this.maps);
        }
    };
    /**
     * sets the libraryb if the current mapping
     * @param library
     */
    ElementsLibraryTargetMapping.prototype.setLibrary = function (library) {
        this.library = library;
    };
    /**
     * applies data from a generic object
     * @param libData
     */
    ElementsLibraryTargetMapping.prototype.applyData = function (libData) {
        Object.assign(this, libData);
    };
    /**
     * retrieves the mapping of a specific element for the current target mapping
     * @param type
     */
    ElementsLibraryTargetMapping.prototype.map = function (type) {
        return this.maps[type];
    };
    return ElementsLibraryTargetMapping;
}());
exports.default = ElementsLibraryTargetMapping;
//# sourceMappingURL=ElementsLibraryTargetMapping.js.map