const helper = require('../utils/helper');
/**
 * paramName = require('./name');
 * router.param('name', paramName);
 */
module.exports = function (request, response, next) {
  var name = helper.parseName(request.params.name);
  request.name = name;
  next();
};