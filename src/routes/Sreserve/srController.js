const srService = require('./srService');
const {globalResponseSet, resbuilder} = require('../../common/resbuilder');
const logger = require('../../../config/logger');


exports.getOverallReserves = async (req, res, next) => {
    const targetYear = req.body.year;
    const targetMonth = req.body.month;
    if(!srService.paramValidate([targetYear, targetMonth])){
        res.send(resbuilder(globalResponseSet.PARAMETER_ERROR));
        return;
    }

    const result = await srService.monthSearch(req.user, Number(targetYear), Number(targetMonth));
    res.send(resbuilder(globalResponseSet.API_SUCCESS, result));
    return;
}

exports.getDateReserves = async (req, res, next) => {
    const targetYear = req.body.year;
    const targetMonth = req.body.month;
    const targetDate = req.body.date;    
    if(!srService.paramValidate([targetYear, targetMonth, targetDate])){
        res.send(resbuilder(globalResponseSet.PARAMETER_ERROR));
        return;
    }

    const result = await srService.dateSearch(req.user, Number(targetYear), Number(targetMonth), Number(targetDate));
    res.send(resbuilder(globalResponseSet.API_SUCCESS, result));
}