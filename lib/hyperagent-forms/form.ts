/*global Hyperagent */
//TODO: Figure out a way to use tv4 as AMD/ES6 module if compiled that way ...
import Hyperagent from 'hyperagent';
import DelayedResource from './delayed';

type HTTP_GET = 'GET';
type HTTP_POST = 'POST';
type HTTP_PUT = 'PUT';
type HTTP_DELETE = 'DELETE';
type HTTP_PATCH = 'PATCH';
type HTTP_METHODS = HTTP_GET | HTTP_POST | HTTP_PUT | HTTP_DELETE | HTTP_PATCH;

type FIELD_TYPE_TEXT = 'text';
type FIELD_TYPE_NUMBER = 'number';
type FIELD_TYPE_HIDDEN = 'hidden';
type FIELD_TYPE_FILE = 'file';

type FIELD_TYPES = FIELD_TYPE_TEXT | 
	FIELD_TYPE_NUMBER |
	FIELD_TYPE_HIDDEN |
	FIELD_TYPE_FILE;

interface IFieldObject {
	name: string; 
	type: FIELD_TYPES;
	required?: boolean;
	default?: string | number;
    regex?: RegExp;
    readonly?: boolean;
    maxLength?: number;
}

interface IForm {
    action: string;
    method: HTTP_METHODS;
    type: string;
    fields: IFieldObject[];
}

class Form implements IForm {

    action: string;
    method: HTTP_METHODS;
    type: string;
    fields: IFieldObject[];
    _options: any;
    errors: any;
    data: any;

    constructor(object, options, data) {
        // Expose relevant object attributes.
        this.action = object.action;
        this.method = object.method;
        this.type = object.type;
        this.fields = object.fields;
        this._options = options || {};
      
        this.errors = {};
        this.data = data;
    }

    _navigateUrl (href) {
        this._options.url = Hyperagent.Resource.resolveUrl(this._options.url, href);
    };

    validate() {
        // if (!this.schema) {
        //   throw new Error('Trying to validate a form without schema.');
        // }
      
        // var result = window.tv4.validateMultiple(this.data, this.schema);
        // this.errors = result.errors;
        // return result.valid;
    };

    submit() {
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

    _resolveFactory(deferred) {
        return function (data, status, xhr) {
          var parsedData;
          try {
            parsedData = JSON.parse(data);
          } catch (err) {
            // The server is not required to return valid JSON or any response at all.
          }
          var resource = new DelayedResource(xhr, this._options, parsedData);
          deferred.resolve(resource);
        }.bind(this);
    };

    _rejectFactory(deferred) {
        return function (xhr, status) {
          var resource = new DelayedResource(xhr, this._options);
          deferred.reject(resource);
        }.bind(this);
    };

    static factory: any;
}

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

export default Form;
