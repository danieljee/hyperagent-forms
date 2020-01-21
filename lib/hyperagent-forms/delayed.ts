import Hyperagent from 'hyperagent';
function DelayedResource(xhr, options, data?) {
  this.xhr = xhr;
  this._options = options;

  this._data = data;
  if (!this._data && xhr && xhr.responseText) {
    this._data = xhr.responseText;
  }
}

DelayedResource.prototype.loadResource = function () {
  var resource = new Hyperagent.Resource(this._options);
  resource._load(this._data);

  return resource;
};

export default DelayedResource;
