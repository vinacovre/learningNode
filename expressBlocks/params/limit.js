/**
 * paramLimit = require('./limit');
 * router.param('limit', paramLimit);
 */
module.exports = function (request, response, next) {
  var limit = request.query.limit;
  request.limit = limit;
  next();
};