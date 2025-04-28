const mongoose = require('mongoose');

const objectId = (value, helpers) => {
  if (mongoose.Types.ObjectId.isValid(value)) {
    return value;
  }
  return helpers.message('"{{#label}}" must be a valid ObjectId');
};

module.exports = {
  objectId,
};
