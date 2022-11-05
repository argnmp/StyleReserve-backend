const express = require('express');
const router = express.Router();
const authController = require('./authController.js');
const authenticate = require('../../middleware/authenticate');
const {wrapAsync} = require('../../common/errorhandler');

router.post('/mocksignup', wrapAsync(authController.mocksignUp));
router.post('/greeting',wrapAsync(authenticate), wrapAsync(authController.greeting));
router.post('/signin', wrapAsync(authController.signIn));
router.post('/local/signup', wrapAsync(authController.signUp));

module.exports = router;
