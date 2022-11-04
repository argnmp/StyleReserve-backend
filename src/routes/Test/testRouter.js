const express = require('express');
const router = express.Router();
const testController = require('./testController.js');

router.get('/successTest', testController.successTest);
router.get('/errorTest', testController.errorTest);

module.exports = router;
