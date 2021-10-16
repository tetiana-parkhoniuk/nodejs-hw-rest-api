const express = require('express');

const { userJoiSchema, updateSubscriptionJoiSchema } = require('../../models/user');
const { controllerWrapper, validation, authentication, fileUpload } = require('../../middlewares');
const { users: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/signup', validation(userJoiSchema), controllerWrapper(ctrl.signup));
router.post('/login', validation(userJoiSchema), controllerWrapper(ctrl.login));
router.get('/logout', authentication, validation(updateSubscriptionJoiSchema), controllerWrapper(ctrl.logout));
router.get('/current', authentication, controllerWrapper(ctrl.getCurrentUser));
router.patch('/:userId/subscription', authentication, controllerWrapper(ctrl.updateSubscription));
router.patch('/avatars', authentication, fileUpload.single('photo'), controllerWrapper(ctrl.updateAvatar));

module.exports = router;
