/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

// request {method: '', url: '', body: ''}
  // To get method request.method
  // To get the url method.url
  // To get body request.on('data')

//response {statusCode: 'statusCode', content: 'What we're sending back'}
  //To get statusCode response.statusCode
  //To send response response.end('content);

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.
// http://nodejs.org/documentation/api/

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept, authorization',
  'access-control-max-age': 10 // Seconds.
};
var messagesDatabase = []; // Test Response
var uniqueID = 0;
var requestHandler = function(request, response) {

  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';

  if (request.method === 'GET' && request.url.includes('/classes/messages')) { // Figuring Out Response Type
    // Sending the response:
    let statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end(JSON.stringify(messagesDatabase));

  } else if (request.method === 'OPTIONS' && request.url.includes('/classes/messages')) {
    let statusCode = 200;
    response.writeHead(statusCode, headers);
    response.end();

  } else if (request.method === 'POST' && request.url.includes('/classes/messages')) {
    let statusCode = 201;
    var body = '';
    request.on('data', (data) => {
      body += data;
    }).on('end', (data) => {
      var parsedBody = JSON.parse(body);
      parsedBody.message_id = uniqueID;
      uniqueID++;
      messagesDatabase.push(parsedBody);
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(messagesDatabase));
    });

  } else {
    let statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
  }

};

module.exports.requestHandler = requestHandler;
