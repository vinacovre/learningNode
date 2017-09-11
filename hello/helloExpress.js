const express = require('express');
var app = express();


/* Runs the function whenever our application receives a GET request (access to the page) on the root '/' path */
app.get('/', function(request, response) {
    /* response is what the browser will send back to the server */
    response.send('Hello Express!');
});


/* Sends a response to the browser in a specific Content-Type */
app.get('/blocks', function(request, response) {
    // var blocks = ['Fixed', 'Movable', 'Rotating'];
    var blocks = '<ul><li>Fixed</li><li>Movable</li></ul>';

    /* sends hmtl type unless it is an Object or Array (sends json type) */
    // response.send(blocks); // equals to:

    /* always send json type */
    response.json(blocks);
});

// /* Redirects to relative path */
// app.get('/blocks', function(request, response) {
//     response.redirect(301, '/parts');
//     /* 301 port makes it a permanent redirect (302 is the default) */
// });

/* "turns on" the tcp port to 3000 */
app.listen(3000, function() {
    console.log('listening on port 3000');
});