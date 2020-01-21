"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hyperagent_1 = require("hyperagent");
var form_1 = require("./form");
function LoadHook(object) {
    var forms = object._forms;
    if (!forms) {
        this.forms = {};
    }
    else {
        this.forms = new hyperagent_1.default.LazyResource(this, forms, {
            factory: form_1.default.factory
        });
    }
}
exports.default = LoadHook;
