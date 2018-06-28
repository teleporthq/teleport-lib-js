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
var ElementsLibrary_1 = require("./lib/ElementsLibrary");
var Target_1 = require("./lib/Target");
var ElementsLibraryTargetMapping_1 = require("./lib/ElementsLibraryTargetMapping");
var TeleportLight = /** @class */ (function () {
    function TeleportLight(library, mappings, generator) {
        this.mappings = {};
        this.setLibrary(library);
        this.setMappings(mappings);
        this.setGenerator(generator);
    }
    TeleportLight.prototype.setLibrary = function (library) {
        if (this.elementsLibrary)
            throw new Error("Library is already set: " + library.name);
        this.elementsLibrary = new ElementsLibrary_1.default(library);
    };
    TeleportLight.prototype.setMappings = function (mappings) {
        var maps = null;
        for (var _i = 0, mappings_1 = mappings; _i < mappings_1.length; _i++) {
            var mapping = mappings_1[_i];
            var targetMapping = new ElementsLibraryTargetMapping_1.default(mapping, this);
            // do not allow mapping override
            if (this.mappings[targetMapping.name])
                throw new Error("Mapping " + targetMapping.name + " is already set");
            // check library dependency
            if (this.elementsLibrary.name !== targetMapping.library)
                throw new Error("`this.elementsLibrary.name` mapping depends on `this.elementsLibrary.name` library");
            // check mapping dependency
            if (targetMapping.extends) {
                if (!this.mappings[targetMapping.extends])
                    throw new Error("`" + targetMapping.name + "` mapping extends a missing mapping (" + targetMapping.extends + ")");
                // extend
                maps = __assign({}, this.mappings[targetMapping.extends], targetMapping.maps);
            }
            this.mappings[targetMapping.name] = maps || targetMapping.maps;
            this.setTarget(targetMapping.target);
        }
    };
    TeleportLight.prototype.mapping = function (str) {
        // compatibility placeholder with the main class
    };
    TeleportLight.prototype.setTarget = function (target) {
        this.target = target;
    };
    TeleportLight.prototype.setGenerator = function (generator) {
        if (generator.targetName !== this.target) {
            throw new Error("The mapping target `" + this.target + "` does not match with the generator target `" + generator.targetName + "`");
        }
        generator.setTarget(new Target_1.default(this.target));
        this.generator = generator;
    };
    return TeleportLight;
}());
exports.default = TeleportLight;
//# sourceMappingURL=TeleportLight.js.map