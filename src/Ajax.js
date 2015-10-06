
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

var Ajax = (function() {

    function handleHeaders(req, params) {
      if(params.headers !== undefined){
        for(var i = 0; i < params.headers.length; i++) {
          req.setRequestHeader(params.headers[i].header, params.headers[i].val);
        }
      }
    }

    function handleData(params) {
      if(params.data !== undefined) {
        return params.data;
      }
    }

    function send(params, callback) {
      var req = new XMLHttpRequest();
      req.open(params.method, params.url, params.async);
      req.onreadystatechange = function() {
          if(req.readyState != 4 || req.status != 200) {
              return;
          }
          else {
            callback(req.responseText);
          } 
      };
      handleHeaders(req, params);
      req.send(handleData(params));
    }
    return {
      send:send
    };

})();