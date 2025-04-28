const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userController = require('../../controller/user.controller');
const userValidation = require('../../validations/user.validation');


router
  .route('/')
  .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
  .get(auth('getUsers'),validate(userValidation.getUsers), userController.getUsers);

router
  .route('/:userId')
  .get(auth('getUser'), validate(userValidation.getUser), userController.getUser)
  .patch( auth('manageUsers'),validate(userValidation.updateUser), userController.updateUser)
  .delete(  auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;