const express = require('express');
const router = express.Router();
const app = express();

const helper = require('./utils/helper');

const logger = require('./utils/logger');
app.use(logger);

const blocks = require('./routes/blocks');
app.use('/blocks', blocks);

const locations = require('./routes/locations');
app.use('/locations', locations);

const port = 3001;
app.listen(port);
console.log('Listening to port ' + port + '\n');