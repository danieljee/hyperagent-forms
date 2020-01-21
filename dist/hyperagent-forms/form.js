"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*global Hyperagent */
//TODO: Figure out a way to use tv4 as AMD/ES6 module if compiled that way ...
var hyperagent_1 = require("hyperagent");
var delayed_1 = require("./delayed");
var Form = /** @class */ (function () {
    function Form(object, options, data) {
        // Expose relevant object attributes.
        this.action = object.action;
        this.method = object.method;
        this.type = object.type;
        this.fields = object.fields;
        this._options = options || {};
        this.errors = {};
        this.data = data;
    }
    Form.prototype._navigateUrl = function (href) {
        this._options.url = hyperagent_1.default.Resource.resolveUrl(this._options.url, href);
    };
    ;
    Form.prototype.validate = function () {
        // if (!this.schema) {
        //   throw new Error('Trying to validate a form without schema.');
        // }
        // var result = window.tv4.validateMultiple(this.data, this.schema);
        // this.errors = result.errors;
        // return result.valid;
    };
    ;
    Form.prototype.submit = function () {
        // var deferred = Hyperagent._config.defer();
        // var options = {
        //   url: this._options.url || this.href,
        //   type: this.method || 'get',
        //   dataType: 'text',
        //   contentType: 'application/json; charset=utf-8',
        //   success: this._resolveFactory(deferred),
        //   error: this._rejectFactory(deferred)
        // };
        // if (this.data) {
        //   options.data = JSON.stringify(this.data);
        // }
        // Hyperagent._config.ajax(options);
        // return deferred.promise;
    };
    ;
    Form.prototype._resolveFactory = function (deferred) {
        return function (data, status, xhr) {
            var parsedData;
            try {
                parsedData = JSON.parse(data);
            }
            catch (err) {
                // The server is not required to return valid JSON or any response at all.
            }
            var resource = new delayed_1.default(xhr, this._options, parsedData);
            deferred.resolve(resource);
        }.bind(this);
    };
    ;
    Form.prototype._rejectFactory = function (deferred) {
        return function (xhr, status) {
            var resource = new delayed_1.default(xhr, this._options);
            deferred.reject(resource);
        }.bind(this);
    };
    ;
    return Form;
}());
Form.factory = function (object, options) {
    function FormFactory(data) {
        if (!(this instanceof FormFactory)) {
            throw new Error('FormFactory should be created with `new`.');
        }
        var form = new Form(object, options, data);
        if (object.href) {
            form._navigateUrl(object.href);
        }
        return form;
    }
    FormFactory.schema = object.schema;
    return FormFactory;
};
exports.default = Form;
