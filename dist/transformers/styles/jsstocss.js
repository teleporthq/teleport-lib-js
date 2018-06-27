"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jss_1 = require("jss");
var jss_preset_default_1 = require("jss-preset-default");
jss_1.default.setup(jss_preset_default_1.default());
var generateClassName = function (rule, sheet) { return rule.key; };
function stylesheet(styles) {
    var styleSheet = jss_1.default.createStyleSheet(styles, { generateClassName: generateClassName });
    return {
        classNames: styleSheet.classes,
        css: styleSheet.toString()
    };
}
exports.stylesheet = stylesheet;
//# sourceMappingURL=jsstocss.js.map