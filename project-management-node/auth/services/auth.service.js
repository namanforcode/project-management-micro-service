const tokenService = require('./token.service');
const Token = require('../models/token.model');
const Auth = require('../models/auth.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');



const createAuth = async (authBody) => {
  if (await Auth.isEmailTaken(authBody.email)) {
    throw new ApiError(401, 'Email already taken');
  }
  return Auth.create(authBody);
};


/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await Auth.findOne({ email });
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(401, 'Incorrect email or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(404, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await Auth.findById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(401, 'Please authenticate');
  }
};

const updateAuthById = async (authId, updateBody) => {
  const auth = await Auth.findById(authId);
  if (!auth) {
    throw new ApiError(404, 'User not found');
  }
  if (updateBody.email && (await Auth.isEmailTaken(updateBody.email, authId))) {
    throw new ApiError(400, 'Email already taken');
  }
  Object.assign(auth, updateBody);
  await auth.save();
  return auth;
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await Auth.findById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await updateAuthById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(401, 'Password reset failed');
  }
};


/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise}
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await Auth.findById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await updateAuthById(user.id, { isEmailVerified: true });

  } catch (error) {
    throw new ApiError(401, 'Email verification failed');
  }
};

module.exports = {
  createAuth,
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
