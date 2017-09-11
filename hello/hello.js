var http = require('http'); // including http library

/*
 * Creating Server
 * 
 * -> http.createServer(callback_function): returns a new sever object.
 * 
 * -> callback_function (listener function): is the function called by the server whenever a new request comes in (and the request and response will be passed into the function)
 */
var server = http.createServer(function(request, response) {

    console.log('got a request! ', request.url); // or request.path

    /* Setting Headers */
    response.writeHead(200, {
        'Content-type': 'text/plain' // to send plain text back to the browser
    });


    /* Send data */
    response.write('Hello World'); // data to be written in browser
    response.end();

    // response.end('Hello World!');
});

/*
 * object.writeHead (
 *      status code of the request,
 *      object containing all the response headers that we'd like to set)
 */

/* 
 * Set Server for listening to new requests (
 *      port number for the listener,
 *      host name) 
 */
server.listen(8000);

console.log('Listening on http://127.0.0.1:8000');