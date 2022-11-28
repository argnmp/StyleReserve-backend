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

exports.addReserve = async (req, res, next) => {
    if(!srService.paramValidate([req.body.start_time, req.body.course_id, req.body.count])){
        res.send(resbuilder(globalResponseSet.PARAMETER_ERROR));
        return;
    }
    if(Number(req.body.count) > 5){
        res.send(resbuilder(globalResponseSet.PARAMETER_ERROR));
        return;
    }
    const result = await srService.checkReservation(req.user, new Date(req.body.start_time), Number(req.body.course_id));
    if(result == false){
        res.send(resbuilder(globalResponseSet.CREATE_SRESERVE_OVERLAP)); 
        return;
    }
    await srService.createSreserve(req.user, new Date(req.body.start_time), Number(req.body.course_id), Number(req.body.count));
    
    res.send(resbuilder(globalResponseSet.API_SUCCESS));
}

exports.addMember = async (req, res, next) => {
    if(!srService.paramValidate([req.body.sr_id, req.body.count])){
        res.send(resbuilder(globalResponseSet.PARAMETER_ERROR));
        return;
    }
    if(!(await srService.srValidate(req.user, req.body.sr_id))){
        res.send(resbuilder(globalResponseSet.SRESERVE_NOT_EXISTS));
        return;
    }
    if(!(await srService.memberValidate(req.user, req.body.sr_id, Number(req.body.count)))){
        res.send(resbuilder(globalResponseSet.CREATE_SRMEMBER_VALIDATION_FAIL));
        return;
    }
    await srService.createSrmember(req.user, req.body.sr_id, Number(req.body.count));

    res.send(resbuilder(globalResponseSet.API_SUCCESS));
}

exports.deleteReserve = async (req, res, next) => {
    if(!srService.paramValidate([req.body.sr_id])){
        res.send(resbuilder(globalResponseSet.PARAMETER_ERROR));
        return;
    }
    if(!(await srService.srValidate(req.user, req.body.sr_id))){
        res.send(resbuilder(globalResponseSet.SRESERVE_NOT_EXISTS));
        return;
    }
    const result = await srService.deleteSreserve(req.user, req.body.sr_id);
    if(!result){
        res.send(resbuilder(globalResponseSet.DELETE_SRESERVE_NOT_OWNER));
        return;
    }
    res.send(resbuilder(globalResponseSet.API_SUCCESS));
}

exports.deleteMember = async (req, res, next) => {
    
}
