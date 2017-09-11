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

app.get('/blocks', function (request, response) {
  var limit = Number(request.query.limit);
  if (!limit)
    response.json(blocks);
  else if (limit <= 0 || limit > blocks.length)
    error(404, response, limit);
  else
    response.json(print(limit, blocks));
});

function showDescription(name, arr, response) {
  var myItem = arr.find(x => x.name === name);
  if (!myItem)
    error(404, response, name);
  else
    response.json(myItem.description);
}

app.get('/blocks/:name', function (request, response) {
  showDescription(request.name, blocks, response);
});

app.get('/locations/:name', function (request, response) {
  showDescription(request.name, locations, response);
});

app.post('/blocks', function (request, response) {
  console.log(request.body);
  blocks.push(request.body);
  // without bodyParser the body is not included in "blocks" (passes "null" instead)
  response.status(201).json(request.body);
});

const port = 3001;
app.listen(port);
console.log('Listening to port ' + port + '\n');