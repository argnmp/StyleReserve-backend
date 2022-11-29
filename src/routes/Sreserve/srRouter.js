const express = require('express');
const router = express.Router();
const srController = require('./srController.js');
const authenticate = require('../../middleware/authenticate');
const {wrapAsync} = require('../../common/errorhandler');

router.post('/getOverallReserves',wrapAsync(authenticate), wrapAsync(srController.getOverallReserves));
router.post('/getDateReserves', wrapAsync(authenticate), wrapAsync(srController.getDateReserves));
router.post('/addReserve', wrapAsync(authenticate), wrapAsync(srController.addReserve));
router.post('/addMember', wrapAsync(authenticate), wrapAsync(srController.addMember));
router.post('/deleteReserve', wrapAsync(authenticate), wrapAsync(srController.deleteReserve));
router.post('/deleteMember', wrapAsync(authenticate), wrapAsync(srController.deleteMember));
router.post('/getRecentReserve', wrapAsync(authenticate), wrapAsync(srController.getRecentReserve));


module.exports = router;