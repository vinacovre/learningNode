const express = require('express');
const router = express.Router();
const helper = require('../utils/helper');

const paramName = require('../params/name');
router.param('name', paramName);

const paramLimit = require('../params/limit');
router.param('limit', paramLimit);

const bodyParser = require('body-parser');
router.use(bodyParser.json());

var blocks = [
  { name: 'Fixed', description: 'Fastened securely in position' },
  { name: 'Movable', description: 'Capable of being moved' },
  { name: 'Rotating', description: 'Moving in a circle around its center' }];

router.route('/')
  .get(function (request, response) {
    var limit = Number(request.query.limit);
    if (!limit)
      response.json(blocks);
    else if (limit <= 0 || limit > blocks.length)
      helper.error(404, response, limit);
    else
      response.json(helper.print(limit, blocks));
  })
  .post(function (request, response) {
    var body = request.body;
    body.name = helper.parseName(body.name);
    blocks.push(body);
    // without bodyParser the body is not included in "blocks" (passes "null" instead)
    response.status(201).json(request.body);
  });
// curl -X POST http://localhost:3001/blocks -d '{"name":"Vinicius","description":"VMware"}' -H 'Content-Type: application/json'

router.route('/:name')
  .get(function (request, response) {
    helper.showData(request.name, blocks, response, 'description');
  })
  .delete(function (request, response) {
    var myItem = helper.findByName(blocks, request.name);
    if (!myItem)
      helper.error(404, response, request.name);
    else {
      response.sendStatus(200);
      blocks = blocks.filter(obj => obj.name !== myItem.name);
    }
  });
// curl -X DELETE http://localhost:3001/blocks/Vinicius

module.exports = router;