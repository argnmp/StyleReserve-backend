const {globalResponseSet, resbuilder} = require('../../common/resbuilder');
const logger = require('../../../config/logger');

exports.successTest = async (req, res, next) => {
    const mockData = {
        currentTime: new Date(), 
        data : ['a','b','c'], 
    }
    logger.info("successTest"); 
    res.send(resbuilder(globalResponseSet.SUCCESS_TEST, mockData));
}
exports.errorTest = async (req, res, next) => {
    logger.info("errorTest"); 
    res.json(resbuilder(globalResponseSet.FAIL_TEST));
}
