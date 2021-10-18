const signup = require('./signup');
const verify = require('./verify');
const additionalVerify = require('./additionalVerify');
const login = require('./login');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');

module.exports = {
    signup,
    verify,
    additionalVerify,
    login,
    logout,
    getCurrentUser,
    updateSubscription,
    updateAvatar
}