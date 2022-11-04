const express = require('express');
const router = express.Router();
const authController = require('./authController.js');
const {wrapAsync} = require('../../common/errorhandler');

router.post('/mockRegister', wrapAsync(authController.mockRegister));
router.post('/signin', wrapAsync(authController.signIn));

module.exports = router;
