const express = require('express');
const router = express.Router();
const srController = require('./srController.js');
const authenticate = require('../../middleware/authenticate');
const {wrapAsync} = require('../../common/errorhandler');

router.post('/getOverallReserves',wrapAsync(authenticate), wrapAsync(srController.getOverallReserves));
router.post('/getDateReserves', wrapAsync(authenticate), wrapAsync(srController.getDateReserves))
router.post('/addReserve', wrapAsync(authenticate), wrapAsync(srController.addReserve))

module.exports = router;