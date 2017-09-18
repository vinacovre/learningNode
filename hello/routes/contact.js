const express = require('express');
const router = express.Router();

/* Sends a response to the browser in a specific Content-Type */
router.route('/')
  .get(function (request, response) {
    var contact = [
      { name: 'Vinicius', phone:'(99) 99999-9898' },
      { name: 'Gustavo', phone:'(77) 77777-7676'}
    ];
    // var contact = 'Vinicius -> (99) 99999-9898';

    /* sends hmtl type unless it is an Object or Array (sends json type) */
    // response.send(contact); // equals to:

    response.setHeader('Set-Cookie',['type=ninja','language=javascript']);
    response.cookie('user', 'vina');

    /* always send json type */
    response.json(contact);
  });

module.exports = router;