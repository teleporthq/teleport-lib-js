"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderResult = /** @class */ (function () {
    function RenderResult() {
        this.filesByName = {};
    }
    RenderResult.prototype.addFile = function (name, content) {
        this.filesByName[name] = content;
    };
    RenderResult.prototype.getFiles = function () {
        return this.filesByName;
    };
    RenderResult.prototype.getFileNames = function () {
        return Object.keys(this.filesByName);
    };
    RenderResult.prototype.getContent = function (fileName) {
        return this.filesByName[fileName];
    };
    return RenderResult;
}());
exports.default = RenderResult;
//# sourceMappingURL=RenderResult.js.map