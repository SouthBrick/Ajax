function Ajax(url) {
    this._methods = {
        get: 'GET',
        post: 'POST',
        put: 'PUT',
        delete: 'DELETE'
    };
    this._params = {
        url: new URL(url),
        headers: new Headers(),
        method: undefined,
        async: true,
        data: undefined
    }
    this._firstIndentifier = true;
}

Ajax.prototype.headers = function(headers) {
    this._params.headers.add(headers);
    return this;
};

Ajax.prototype.sync = function() {
    this._params.async = false;
    return this;
};

Ajax.prototype.url = function(url) {
    this._params.url.base = url;
    return this;
}

Ajax.prototype.resource = function(resource) {
    this._params.url.add({ type: 'resource', val: resource });
    return this;
}

Ajax.prototype.id = function(id) {
    this._params.url.add({ type: 'param', val: id });
    return this;
};

Ajax.prototype.filter = function(filter) {
  this._params.url.add({ type: 'filter', val: filter });
}

Ajax.prototype.where = function(identifier) {
    this._params.url.add({ type: 'identifier', val: identifier, first: this._firstIndentifier });
    this._firstIndentifier = false;
    return this;
}

Ajax.prototype.is = function(value) {
    this._params.url.add({ type: 'operator', val: '=' })
    this._params.url.add({ type: 'value', val: value });
    return this;
}

Ajax.prototype.isNot = function(value) {
    this._params.url.add({ type: 'operator', val: '_ne=' });
    this._params.url.add({ type: 'value', val: value });
    return this;
}

Ajax.prototype.and = function(value) {
    this._params.url.add({ type: 'operator', val: '&' });
    return this;
}

Ajax.prototype.get = function(callback) {
    this._params.method = this._methods.get;
    this._process(callback);
}

Ajax.prototype.data = function(data) {
    this._params.data = JSON.stringify(data);
    return this;
}

Ajax.prototype.post = function(callback) {
    this._params.method = this._methods.post;
    this._process(callback);
}

Ajax.prototype.put = function(callback) {
  this._params.method = this._methods.put;
  this._process(callback);
}

Ajax.prototype.delete = function(callback) {
  this._params.method = this._methods.delete;
  this._process(callback);
}

Ajax.prototype._process = function(callback) {
    this._params.url.build();

    this._request = new Request(this._params);
    this._request.open(callback);
    this._request.send();

    this._params.url.clear();
    this._params.headers.clear();
    this._data = undefined;
    this._firstIndentifier = true;
};

function URL(url) {
    this.base = url;
    this.paths = [];
    this.full = undefined;
}

URL.prototype.clear = function() {
    this.paths = [];
}

URL.prototype.build = function() {
    this.paths.unshift({ type: 'base', val: this.base });
    this.full = this.paths.reduce(function(prev, next) {
        switch (next.type) {
            case 'base':
                return next.val;
                break;
            case 'identifier':
                if (next.first)
                    return prev + '?' + next.val;
                else
                    return prev + next.val;
                break;
            case 'operator':
                return prev + next.val;
                break;
            case 'value':
                return prev + next.val;
                break;
            default:
                return prev + '/' + next.val;
        }
    }, { type: '', val: '' });
}
URL.prototype.add = function(path) {
    this.paths.push(path);
}

function Headers() {
    this._json = { key: 'Content-Type', val: 'application/json' };
    this._headers = [];
    this._custom = false;
}

Headers.prototype.validate = function() {
    this._headers.forEach(function(header, index) {
        if (typeof header !== object) {
            console.log('Header ' + index + ' is not of type object');
            return;
        } else if (!header.key) {
            console.log('Header ' + index + ' key is not defined')
            return;
        } else if (!header.val) {
            console.log('Header ' + index + ' value is not defined');
            return;
        }
    });
}

Headers.prototype.add = function(headers) {
    this._custom = true;
    this._headers = headers;
};

Headers.prototype.set = function(req) {
    if (!this._custom)
        this._headers.push(this._json);

    this._headers.forEach(function(header) {
        req.setRequestHeader(header.key, header.val);
    });
}

Headers.prototype.clear = function() {
    this._headers = [];
    this._custom = false;
};

function Data(data) {
    this.data = data;
}

Data.prototype.check = function() {
    return this.data;
}

function Request(params) {
    this._params = params;
}

Request.prototype.open = function(callback) {
    this._req = new XMLHttpRequest();
    this._req.open(this._params.method, this._params.url.full, this._params.async);
    this._req.onreadystatechange = handleStateChange.bind(this);

    this._params.headers.set(this._req);

    function handleStateChange() {
        if (this._req.readyState != 4 || this._req.status != 200) {
            return;
        } else {
            callback(this._req.responseText);
        }
    }
};

Request.prototype.send = function() {
    this._params.data ?
        this._req.send(this._params.data) :
        this._req.send();
};
