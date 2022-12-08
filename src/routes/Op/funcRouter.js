const express = require('express');
const router = express.Router();
const funcController= require('./funcController.js');
const authenticate = require('../../middleware/authenticate');
const {wrapAsync} = require('../../common/errorhandler');

router.post('/vendorSearch',wrapAsync(authenticate), wrapAsync(funcController.vendorSearch));

module.exports = router;
