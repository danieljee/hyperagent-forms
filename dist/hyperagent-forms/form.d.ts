declare type HTTP_GET = 'GET';
declare type HTTP_POST = 'POST';
declare type HTTP_PUT = 'PUT';
declare type HTTP_DELETE = 'DELETE';
declare type HTTP_PATCH = 'PATCH';
declare type HTTP_METHODS = HTTP_GET | HTTP_POST | HTTP_PUT | HTTP_DELETE | HTTP_PATCH;
declare type FIELD_TYPE_TEXT = 'text';
declare type FIELD_TYPE_NUMBER = 'number';
declare type FIELD_TYPE_HIDDEN = 'hidden';
declare type FIELD_TYPE_FILE = 'file';
declare type FIELD_TYPES = FIELD_TYPE_TEXT | FIELD_TYPE_NUMBER | FIELD_TYPE_HIDDEN | FIELD_TYPE_FILE;
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
declare class Form implements IForm {
    action: string;
    method: HTTP_METHODS;
    type: string;
    fields: IFieldObject[];
    _options: any;
    errors: any;
    data: any;
    constructor(object: any, options: any, data: any);
    _navigateUrl(href: any): void;
    validate(): void;
    submit(): void;
    _resolveFactory(deferred: any): any;
    _rejectFactory(deferred: any): any;
    static factory: any;
}
export default Form;
