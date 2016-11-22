/*

  Example params Object:
    var params = {
      method: 'POST',
      url: 'http://url',
      async: false,
      headers: [
        {
          header: 'Content-Type',
          value: 'application/json;charset=UTF-8'
        },
        {
          header: 'Authorization',
          value: 'Token'
        }
      ],
      data: ''{"username": "admin", "password": "admin"}'',
    }

    Example Call:
    Ajax.send(params, function(data) {
      return data;
    });

 */

// var Ajax = (function() {

//     function handleHeaders(req, params) {
//         if (params.headers !== undefined) {
//             for (var i = 0; i < params.headers.length; i++) {
//                 req.setRequestHeader(params.headers[i].header, params.headers[i].val);
//             }
//         }
//     }

//     function handleData(params) {
//         if (params.data !== undefined) {
//             return params.data;
//         }
//     }

//     function send(params, callback) {
//         var req = new XMLHttpRequest();
//         req.open(params.method, params.url, params.async);
//         req.onreadystatechange = function() {
//             if (req.readyState != 4 || req.status != 200) {
//                 return;
//             } else {
//                 callback(req.responseText);
//             }
//         };
//         handleHeaders(req, params);
//         req.send(handleData(params));
//     }
//     return {
//         send: send
//     };

// })();

console.log('Load Ajax');

function Ajax(url) {
    this._methods = {
        get: 'GET',
        post: 'POST'
    };
    this._params = {
        url: new URL(url),
        method: undefined,
        async: true,
        headers: [
            { 'content-type': 'application/json' }
        ]
    }
    this._data = undefined;
}

Ajax.prototype.sync = function() {
    this._params.async = false;
    return this;
};

Ajax.prototype.url = function(url) {
    console.log('URL', url);
    this._params.url.base = url;
    console.log('UR PARAMS', this._params);
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

Ajax.prototype.where = function(identifier) {
    this._params.url.add({ type: 'identifier', val: identifier });
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

Ajax.prototype.headers = function(headers) {
    this._params.headers = this._params.headers.concat(headers);
    return this;
};

Ajax.prototype.get = function(callback) {
    this._params.method = this._methods.get;
    this._process(callback);
}

Ajax.prototype.data = function(data) {
    this._data = JSON.stringify(data);
    return this;
}

Ajax.prototype.post = function(callback) {
    this._params.method = this._methods.post;
    this._process(callback);
}

Ajax.prototype._process = function(callback) {
    this._params.url.build();

    this._request = new Request(this._params);
    this._request.open(callback);
    this._request.send(this._data);

    this._params.url.clear();
    this._data = undefined;
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
        console.log('PREV', prev);
        console.log('NEXT', next);
        switch (next.type) {
            case 'base':
                return next.val;
                break;
            case 'identifier':
                return prev + '/?' + next.val
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

function Headers(req, headers) {
    this._req = req;
    this._headers = headers;
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

Headers.prototype.set = function() {
    this._headers.forEach(function(header) {
        console.log('Headers ForEach req', this._req);
        this._req.setRequestHeader(header.key, header.val);
    }.bind(this));
}

function Data(data) {
    this.data = data;
}

Data.prototype.check = function() {
    return this.data;
}

function Request(params) {
    console.log('Params', params);
    this.params = params;
    this.req = new XMLHttpRequest();
    this._headers = new Headers(this.req, this.params.headers);
}

Request.prototype.open = function(callback) {
    this.req.open(this.params.method, this.params.url.full, this.params.async);
    _process(this.req);
    this._headers.set();

    function _process(req) {
        req.onreadystatechange = function() {
            _handleResponse(req);
        };
    }

    function _handleResponse(req) {
        if (req.readyState != 4 || req.status != 200) {
            return;
        } else {
            callback(req.responseText);
        }
    }
};

Request.prototype.send = function(data) {
  console.log('DATA', data);
    if (data)
      this.req.send(data);
    else
      this.req.send();
};
