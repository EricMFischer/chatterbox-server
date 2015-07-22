/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

// console.logs in your code.
var messages = {};
messages.results = [
  // // Useful for debugging
  // {
  //   text: 'hello world',
  //   username: 'this is patrick',
  //   // objectId: objectId
  // }
];
var utils = require('./utils');
var http = require('http');

// var messages = [];

// var actions = {
//   'GET': function(request, reponse) {

//   },

//   'POST': function(request, reponse) {

//   },

//   'OPTIONS': function(request, reponse) {

//   }

// };

// exports.requestHandler = function(request, response) {

// }



var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  // var messages = {};


  // messages.results = [];

  // messages.results = [];

  // switch(request.url) {
  //   case '/classes/messages?order=-createdAt':
  //     console.log("[200] " + request.method + " to " + request.url);
  //     response.writeHead(200, "Not implemented", {'Content-Type': 'text/html'});
  //     response.end('<html><head><title>501 - Not implemented</title></head><body><h1>Not implemented!</h1></body></html>');
  //     break;
  //   case '/classes/submit':
  //     console.log("[501] " + request.method + " to " + request.url);
  //     response.writeHead(501, "Not implemented", {'Content-Type': 'text/html'});
  //     response.end('<html><head><title>501 - Not implemented</title></head><body><h1>Not implemented!</h1></body></html>');
  //     break;
  //   default:
  //     response.writeHead(404, "Not found", {'Content-Type': 'text/html'});
  //     response.end('<html><head><title>404 - Not found</title></head><body><h1>Not found.</h1></body></html>');
  //     console.log("[404] " + request.method + " to " + request.url);
  // };

  var statusCode;
  var headers;// = defaultCorsHeaders;

  function respond(status, data) {
    status = status || 200;
    data = data || messages;
    headers = defaultCorsHeaders;
    headers['Content-Type'] = "application/json";
    response.writeHead(status, headers);
    response.end(JSON.stringify(data));
    respond = null;
  }

  function addListeners() {
    var fullBody = '';
    request.on("data", function(chunk) {
      fullBody += chunk.toString();
    });
    request.on("end", function() {
      var decodedBody = JSON.parse(fullBody); // turning a stringified object back into an object (unstringifies anything)
      messages.results.push(decodedBody);
      respond(201);
    });
    setTimeout(function() {
      respond && respond(500);
    }, 1000);
    console.log("handlers registered");
  }

  console.log(request.url);

  if(request.url === '/classes/room')
    respond(200);
  else if((request.method === 'GET') && (request.url === '/classes/messages?order=-createdAt' 
    || request.url === '/classes/messages'
    || request.url === '/classes/room1')) {
    respond(200);

  } else if (request.method === 'POST') {
    console.log("POST REQUEST RECEIVED");
    addListeners();

  } else if (request.method === 'OPTIONS'){
    respond(200, null);

  } else {
      respond(404, "Not Found");
  }

  console.log("Serving request type " + request.method + " for url " + request.url);


  // // The outgoing status.
  // statusCode = statusCode || 200;

  // // See the note below about CORS headers.
  // headers = defaultCorsHeaders;

  // // Tell the client we are sending them plain text.
  // //
  // // You will need to change this if you are sending something
  // // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = "text/plain";

  // // .writeHead() writes to the request line and headers of the response,
  // // which includes the status and all headers.
  // response.writeHead(statusCode, headers);

  // // Make sure to always call response.end() - Node may not send
  // // anything back to the client until you do. The string you pass to
  // // response.end() will be the body of the response - i.e. what shows
  // // up in the browser.
  // //
  // // Calling .end "flushes" the response's internal buffer, forcing
  // // node to actually send all the data over to the client.
  // response.end(JSON.stringify(messages));
};

exports.requestHandler = requestHandler;

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

