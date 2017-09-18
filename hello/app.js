const express = require('express');
// const router = express.Router();
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const logger = require('./utils/logger');
app.use(logger);

const contact = require('./routes/contact');
app.use('/contact', contact);

/* Runs the function whenever our application receives a GET request (access to the page) on the root '/' path */
app.get('/', function (request, response) {
    response.send('Hello Express! This is my main page.');
    var x = request.headers.cookie;
    var y = request.cookies;

    console.log('\n\t* type: ' + typeof(x) + '\n\t* value: ' + x);
    console.log('\n\t* type: ' + typeof(y) + '\n\t* value: ' + JSON.stringify(y) + '\n');
    // console.log(request.cookies.type); // returns --> ninja
});

/* "turns on" the TCP port to 3000 */
const port = 3000;
app.listen(3000, function () {
    console.log('Listening on port ' + port);
});