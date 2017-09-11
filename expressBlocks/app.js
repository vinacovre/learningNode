/***** CONSTANTS AND GLOBAL VARIABLES *****/

const express = require('express');
const app = express();

const logger = require('./logger');
app.use(logger);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var blocks = [
  { name: 'Fixed', description: 'Fastened securely in position' },
  { name: 'Movable', description: 'Capable of being moved' },
  { name: 'Rotating', description: 'Moving in a circle around its center' }];

var locations = [
  { name: 'Root', description: 'File in the / directory' },
  { name: 'Home', description: 'File in the /Home directory' },
  { name: 'Previous', description: 'File in the .. directory' }];

/***** FUNCTIONS *****/

function print(limit, arr) {
  var message = '';
  for (var i = 0; i < limit; i++)
    message += arr[i].name + ': ' + arr[i].description + ' | ';
  return message;
}

function error(status, response, arg) {
  var message = 'error ' + status + ': No description found for ';
  if (typeof arg == 'number')
    message += arg + ' arguments'
  else
    message += arg;
  return response.status(status).json(message);
}

function parseName(name) {
  var parsedName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  return parsedName
}

// Returns the object of a given name (false if does not find)
function findByName(arr, name) {
  return arr.find(x => x.name === name);
}

function showData(name, arr, response, option) {
  var myItem = findByName(arr, name);
  if (!myItem)
    error(404, response, name);
  else
    eval('response.json(myItem.' + option + ');');
}

/***** HTTP FUNCTIONS *****/

app.param('name', function (request, response, next) {
  var name = parseName(request.params.name);
  request.name = name;
  next();
});

app.param('limit', function (request, response, next) {
  var limit = request.query.limit;
  request.limit = limit;
  next();
});

app.route('/blocks')
  .get(function (request, response) {
    var limit = Number(request.query.limit);
    if (!limit)
      response.json(blocks);
    else if (limit <= 0 || limit > blocks.length)
      error(404, response, limit);
    else
      response.json(print(limit, blocks));
  })
  .post(function (request, response) {
    // console.log(request.body);
    blocks.push(request.body);
    // without bodyParser the body is not included in "blocks" (passes "null" instead)
    response.status(201).json(request.body);
  });
  // curl -X POST http://localhost:3001/blocks -d '{"name":"Vinicius","description":"VMware"}' -H 'Content-Type: application/json'

app.get('/locations/:name', function (request, response) {
  showData(request.name, locations, response, 'description');
});

app.route('/blocks/:name')
  .get(function (request, response) {
    showData(request.name, blocks, response, 'description');
  })
  .delete(function (request, response) {
    var myItem = findByName(blocks, request.name);
    if (!myItem)
      error(404, response, request.name);
    else {
      response.sendStatus(200);
      blocks = blocks.filter(obj => obj.name !== myItem.name);
    }
  });
  // curl -X DELETE http://localhost:3001/blocks/Vinicius

/***** EPILOGUE *****/

const port = 3001;
app.listen(port);
console.log('Listening to port ' + port + '\n');