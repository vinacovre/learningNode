// https://www.safaribooksonline.com/library/view/starting-with-rest
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const tasks = require('./api/models/todosModel');
const routes = require('./api/routes/todosRoutes');

const app = express();
const ip = process.env.IP;
const port = process.env.PORT || 8080;

mongoose.Pormise = global.Promise;
mongoose.connect('mongodb://localhost/Todosdb');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

routes(app);

app.listen(port, ip);
console.log('The TODO REST API server is now running on IP: ' + ip + ' and Port: ' + port);

// to run our server using mongodb go to the root (todos-api) directory and hit: ./mongod
// in another terminal tab, go to root (todos-api) and hit: npm start

// open http://localhost:8080/tasks in Postman app (Chrome extension) and do get, post, put and delete operations