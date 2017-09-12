const express = require('express');

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

exports.print = print
exports.error = error
exports.parseName = parseName
exports.findByName = findByName
exports.showData = showData