const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const taskController = require('../../controller/task.controller');
const taskValidation = require('../../validations/task.validation');


router
  .route('/')
  .post(auth('manageTasks'), validate(taskValidation.createTask), taskController.createTask)
  .get(auth('getTasks'), validate(taskValidation.getTasks), taskController.getTasks);

router
  .route('/:taskId')
  .get(auth('getTask'), validate(taskValidation.getTask), taskController.getTask)
  .patch(auth('manageTasks'), validate(taskValidation.updateTask), taskController.updateTask)
  .delete(auth('manageTasks'), validate(taskValidation.deleteTask), taskController.deleteTask);

module.exports = router;