'use strict';
const mongoose = require('mongoose');
const tasks = mongoose.model('Tasks');

exports.listTasks = function (req, res) {
  tasks.find({}, function (err, task) {
    if (err) 
      res.send(err);
    res.json(task);
  });
};

exports.createTask = function (req, res) {
  var newTask = new tasks(req.body);
  newTask.save(function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.readTask = function (req, res) {
  tasks.findById(req.params.taskId, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.updateTask = function (req, res) {
  tasks.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};

exports.deleteTask = function (req, res) {
  tasks.remove({ _id: req.params.taskId }, function (err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task deleted successfully' });
  });
};