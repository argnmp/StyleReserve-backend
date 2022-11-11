const {globalResponseSet, resbuilder} = require('../../common/resbuilder');
const db = require('../../../db/models');
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
    res.send(resbuilder(globalResponseSet.FAIL_TEST));
}
exports.dbTest = async (req, res, next) => {
    /*
    const result = await db.Users.findOne({
        where : {
            id: 1,
        },
        include: db.Stylers,
    });
    console.log(result);
    */
    const result = await db.Sreserves.findAll();
    console.log(result);
    result.forEach(async element => {
        console.log(await element.getSrmembers());
    });
    res.send(resbuilder(globalResponseSet.SUCCESS_TEST));
}