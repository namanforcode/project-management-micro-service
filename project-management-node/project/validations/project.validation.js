const Joi = require('joi');
// const { objectId } = require('./object.validation');  // Custom validation for objectId

// Create Project Validation
const createProject = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional(),
    // owner: Joi.string().custom(objectId).required(), // reference to User (Admin or User)
    status: Joi.string().valid('Active', 'Completed', 'On Hold').default('Active'),
  }),
};

// Get Projects Validation (Query params)
const getProjects = {
  query: Joi.object().keys({
    name: Joi.string().optional(),
    status: Joi.string().valid('Active', 'Completed', 'On Hold').optional(),
    owner: Joi.string().
      // custom(objectId).
      optional(), // Filter by owner
    sortBy: Joi.string().optional(),
    limit: Joi.number().integer().optional(),
    page: Joi.number().integer().optional(),
  }),
};

// Get Single Project Validation (Param validation)
const getProject = {
  params: Joi.object().keys({
    projectId: Joi.string().required(),
  }),
};

// Update Project Validation
const updateProject = {
  params: Joi.object().keys({
    projectId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().optional(),
      description: Joi.string().optional(),
      startDate: Joi.date().optional(),
      endDate: Joi.date().optional(),
      status: Joi.string().valid('Active', 'Completed', 'On Hold').optional(),
    })
    .min(1),
};

// Delete Project Validation
const deleteProject = {
  params: Joi.object().keys({
    projectId: Joi.string().required(),
  }),
};

module.exports = {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
};
