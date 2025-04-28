const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const projectController = require('../../controller/project.controller');
const projectValidation = require('../../validations/project.validation');


router
  .route('/')
  .post(auth('manageProjects'), validate(projectValidation.createProject), projectController.createProject)
  .get(auth('getProjects'), validate(projectValidation.getProjects), projectController.getProjects);

router
  .route('/:projectId')
  .get(auth('getProject'), validate(projectValidation.getProject), projectController.getProject)
  .patch(auth('manageProjects'), validate(projectValidation.updateProject), projectController.updateProject)
  .delete(auth('manageProjects'), validate(projectValidation.deleteProject), projectController.deleteProject);

module.exports = router;