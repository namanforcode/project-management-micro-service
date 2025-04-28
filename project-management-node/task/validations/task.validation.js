const Joi = require('joi');

// Create Task Validation
const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string().valid('To Do', 'In Progress', 'Done').default('To Do'),
    priority: Joi.string().valid('Low', 'Medium', 'High').default('Medium'),
    project: Joi.string().required(), // Reference to Project
    assignee: Joi.string().optional(), // Reference to User
    dueDate: Joi.date().optional(),
  }),
};

// Get Tasks Validation (Query params)
const getTasks = {
  query: Joi.object().keys({
    status: Joi.string().valid('To Do', 'In Progress', 'Done').optional(),
    priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
    project: Joi.string().optional(), // Filter by project
    assignee: Joi.string().optional(), // Filter by assignee
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }),
};

// Get Single Task Validation (Param validation)
const getTask = {
  params: Joi.object().keys({
    taskId: Joi.string().required(),
  }),
};

// Update Task Validation
const updateTask = {
  params: Joi.object().keys({
    taskId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
      status: Joi.string().valid('To Do', 'In Progress', 'Done').optional(),
      priority: Joi.string().valid('Low', 'Medium', 'High').optional(),
      assignee: Joi.string().optional(),
      dueDate: Joi.date().optional(),
    })
    .min(1),
};

// Delete Task Validation
const deleteTask = {
  params: Joi.object().keys({
    taskId: Joi.string().required(),
  }),
};

module.exports = {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
};
