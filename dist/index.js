"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Promise = require("bluebird");
var isUrl = require("is-url");
var fetch = require("isomorphic-fetch");
var Target_1 = require("./lib/Target");
var ElementsLibrary_1 = require("./lib/ElementsLibrary");
var ElementsLibraryTargetMapping_1 = require("./lib/ElementsLibraryTargetMapping");
var transformers_1 = require("./transformers");
var fs = null;
if (typeof window === 'undefined') {
    // tslint:disable-next-line:no-var-requires
    fs = require('fs');
}
var TeleportLib = /** @class */ (function () {
    function TeleportLib() {
        this.libraries = {};
        this.mappings = {};
        this.targets = {};
        this.generators = {};
        this.publishers = {};
        this.transformers = transformers_1.default;
    }
    // ------------------------------------------------------------
    // generic functions
    // ------------------------------------------------------------
    TeleportLib.prototype.readPluginDefinitionFromFile = function (path) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                // tslint:disable-next-line:max-line-length
                if (typeof window !== 'undefined')
                    throw new Error('reading from files can only be used when lib is used in Node, not within a browser');
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            var content = fs.readFileSync(path);
                            var json = JSON.parse(content);
                            resolve(json);
                        }
                        catch (error) {
                            reject(error);
                        }
                    })];
            });
        });
    };
    TeleportLib.prototype.readPluginDefinitionFromUrl = function (url) {
        return __awaiter(this, void 0, Promise, function () {
            var response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(url)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            throw new Error("Could not download " + url + ": " + response.statusText);
                        return [4 /*yield*/, response.json()];
                    case 2:
                        data = _a.sent();
                        if (!data)
                            throw new Error("Could not download " + url + ": EMPTY RESPONSE");
                        return [2 /*return*/, data];
                }
            });
        });
    };
    // ------------------------------------------------------------
    // plugins
    // ------------------------------------------------------------
    TeleportLib.prototype.use = function (plugin) {
        return __awaiter(this, void 0, Promise, function () {
            var _this = this;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = typeof plugin;
                        switch (_a) {
                            case 'string': return [3 /*break*/, 1];
                            case 'object': return [3 /*break*/, 8];
                        }
                        return [3 /*break*/, 12];
                    case 1:
                        if (!isUrl(plugin)) return [3 /*break*/, 3];
                        _b = this.usePlugin;
                        return [4 /*yield*/, this.readPluginDefinitionFromUrl(plugin)];
                    case 2:
                        _b.apply(this, [_e.sent()]);
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(typeof window === 'undefined' && fs.existsSync(plugin))) return [3 /*break*/, 5];
                        _c = this.usePlugin;
                        return [4 /*yield*/, this.readPluginDefinitionFromFile(plugin)];
                    case 4:
                        _c.apply(this, [_e.sent()]);
                        return [3 /*break*/, 7];
                    case 5:
                        _d = this.usePlugin;
                        return [4 /*yield*/, this.readPluginDefinitionFromUrl("https://storage.googleapis.com/teleport-definitions/" + plugin + ".json")];
                    case 6:
                        _d.apply(this, [_e.sent()]);
                        _e.label = 7;
                    case 7: return [3 /*break*/, 12];
                    case 8:
                        if (!Array.isArray(plugin)) return [3 /*break*/, 10];
                        return [4 /*yield*/, Promise.mapSeries(plugin, function (pluginItem) { return __awaiter(_this, void 0, Promise, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.use(pluginItem)];
                                        case 1: return [2 /*return*/, _a.sent()];
                                    }
                                });
                            }); })];
                    case 9:
                        _e.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        this.usePlugin(plugin);
                        _e.label = 11;
                    case 11: return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    TeleportLib.prototype.usePlugin = function (pluginData) {
        switch (pluginData.type) {
            case 'library':
                this.useLibrary(pluginData);
                break;
            case 'mapping':
                this.useMapping(pluginData);
                break;
            case 'generator':
                this.useGenerator(pluginData);
                break;
            case 'publisher':
                this.usePublisher(pluginData);
                break;
            case 'gui':
                this.useGui(pluginData);
                break;
            default:
                console.error('unrecognised plugin type:', pluginData);
        }
    };
    // ------------------------------------------------------------
    // libraries
    // ------------------------------------------------------------
    TeleportLib.prototype.useLibrary = function (libraryDefinition) {
        var library = new ElementsLibrary_1.default(libraryDefinition);
        this.libraries[library.name] = library;
        return this;
    };
    TeleportLib.prototype.library = function (libraryName) {
        return this.libraries[libraryName];
    };
    // ------------------------------------------------------------
    // mappings
    // ------------------------------------------------------------
    TeleportLib.prototype.useMapping = function (mappingData) {
        var map = new ElementsLibraryTargetMapping_1.default(mappingData);
        this.mappings[map.name] = map;
        if (!this.targets[map.target]) {
            this.useTarget(map.target);
        }
        this.target(map.target).useMapping(map);
        // if (this.libraries[map.library]) console.error(` lib ${map.library} does not exist`)
        this.library(map.library).useMapping(map);
        return this;
    };
    TeleportLib.prototype.mapping = function (mappingName) {
        return this.mappings[mappingName];
    };
    TeleportLib.prototype.map = function (targetName, source, type) {
        var target = this.target(targetName);
        if (!target)
            return null;
        return target.map(source, type);
    };
    // ------------------------------------------------------------
    // targets
    // ------------------------------------------------------------
    TeleportLib.prototype.useTarget = function (targetName) {
        if (this.targets[targetName])
            throw new Error("Target " + targetName + " is already registered");
        this.targets[targetName] = new Target_1.default(targetName);
        return this;
    };
    TeleportLib.prototype.target = function (targetName) {
        if (!this.targets[targetName])
            throw new Error("No target named '" + targetName + "' exists.\n    Did you register a mapping or a generator for this target?");
        return this.targets[targetName];
    };
    // ------------------------------------------------------------
    // generators
    // ------------------------------------------------------------
    TeleportLib.prototype.useGenerator = function (generator) {
        if (!this.targets[generator.targetName]) {
            this.useTarget(generator.targetName);
        }
        var target = this.target(generator.targetName);
        generator.setTarget(target);
        target.setGenerator(generator);
        this.generators[generator.name] = generator;
        return this;
    };
    TeleportLib.prototype.generator = function (generatorName) {
        return this.generators[generatorName];
    };
    // ------------------------------------------------------------
    // generators
    // ------------------------------------------------------------
    TeleportLib.prototype.usePublisher = function (publisher) {
        this.publishers[publisher.name] = publisher;
        return this;
    };
    TeleportLib.prototype.publisher = function (publisherName) {
        return this.publishers[publisherName];
    };
    TeleportLib.prototype.useGui = function (guiData) {
        var libraryName = guiData.library;
        var library = this.library(libraryName);
        if (!library) {
            return console.error("Library " + libraryName + " was not found for gui package " + guiData.name);
        }
        library.useGui(guiData);
    };
    return TeleportLib;
}());
exports.default = new TeleportLib();
var Generator_1 = require("./lib/Generator");
exports.Generator = Generator_1.default;
var Publisher_1 = require("./lib/Publisher");
exports.Publisher = Publisher_1.default;
var Component_1 = require("./lib/Generator/Component");
exports.ComponentGenerator = Component_1.default;
var Project_1 = require("./lib/Generator/Project");
exports.ProjectGenerator = Project_1.default;
var FileSet_1 = require("./lib/Generator/FileSet");
exports.FileSet = FileSet_1.default;
//# sourceMappingURL=index.js.map