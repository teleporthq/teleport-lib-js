"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FileSet = /** @class */ (function () {
    function FileSet() {
        this.filesByName = {};
    }
    FileSet.prototype.addFile = function (name, content) {
        this.filesByName[name] = content;
    };
    FileSet.prototype.getFiles = function () {
        return this.filesByName;
    };
    FileSet.prototype.getFileNames = function () {
        return Object.keys(this.filesByName);
    };
    FileSet.prototype.getContent = function (fileName) {
        return this.filesByName[fileName];
    };
    return FileSet;
}());
exports.default = FileSet;
//# sourceMappingURL=FileSet.js.map