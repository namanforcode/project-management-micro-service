const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userSchema = mongoose.Schema(
  {
    profile: { 
      type: String, 
      required: true,
      trim: true
    },
    auth: { type: mongoose.Schema.Types.ObjectId, ref: 'Auth', required: true }, 
   
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
