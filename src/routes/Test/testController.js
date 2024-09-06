const {Op} = require('sequelize');

const {globalResponseSet, resbuilder} = require('../../common/resbuilder');
const db = require('../../../db/models');
const logger = require('../../../config/logger');

exports.successTest = async (req, res, next) => {
    const result = await db.Users.findOne({
        where : {
            email: 'kimtahen@gmail.com',
        }
    });
    logger.info("successTest"); 
    res.send(resbuilder(globalResponseSet.SUCCESS_TEST, result));
}
exports.errorTest = async (req, res, next) => {
    logger.info("errorTest"); 
    res.send(resbuilder(globalResponseSet.FAIL_TEST));
}
exports.dbTest = async (req, res, next) => {
    const result = await db.Sreserves.findAll({
        where: {
            start_time: {
                [Op.between] : [new Date(2022,11,1), new Date(2022, 11, 30)]
            },
            styler_id: 2,
        },
        include: [{
            model: db.Srmembers,
            include: db.Users,
        }, db.Courses, db.Users],
    });
    const pret = []; 
    for(let elem of result){
        const relat = [];
        for(let e of elem.Srmembers){
            relat.push({
                user: {
                    id: e.User.id,
                    nickname: e.User.nickname,
                },
                count: e.count,
            });
        }
        pret.push({
            id: elem.id,
            start_time: elem.start_time,
            duration: elem.Course.duration,
            owner: {
                id: elem.User.id,
                nickname: elem.User.nickname,
            },
            srmembers: relat,
        })
    }
    console.dir(pret, {maxArrayLength: null});
    res.send(resbuilder(globalResponseSet.SUCCESS_TEST, pret));
}
