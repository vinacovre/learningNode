'use strict';
module.exports = function (app) {
  var todoFunctions = require('../controllers/todosController');

  // todos Routes
  app.route('/tasks')
    .get(todoFunctions.listTasks)
    .post(todoFunctions.createTask);

  app.route('/tasks/:taskId')
    .get(todoFunctions.readTask)
    .put(todoFunctions.updateTask)
    .delete(todoFunctions.deleteTask);
};