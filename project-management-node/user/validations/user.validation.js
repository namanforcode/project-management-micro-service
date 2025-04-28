const Joi = require('joi');
const auth = require('../middlewares/auth');

// Create User Validation
const createUser = {
  body: Joi.object().keys({
    profile: Joi.string().required(),
    auth: Joi.string().required(), 
  }),
};

// Get Users Validation (Query params)
const getUsers = {
  query: Joi.object().keys({

  }),
};

// Get Single User Validation (Param validation)
const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

// Update User Validation
const updateUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      profile: Joi.string().optional(),
    })
    .min(1),
};

// Delete User Validation
const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
