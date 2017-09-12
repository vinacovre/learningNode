const express = require('express');
const router = express.Router();
const helper = require('../utils/helper');

const paramName = require('../params/name');
router.param('name', paramName);

var locations = [
  { name: 'Root', description: 'File in the / directory' },
  { name: 'Home', description: 'File in the /Home directory' },
  { name: 'Previous', description: 'File in the .. directory' }];

router.route('/:name')
  .get(function (request, response) {
    helper.showData(request.name, locations, response, 'description');
  });

module.exports = router;
