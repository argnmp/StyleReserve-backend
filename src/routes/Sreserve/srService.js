const {Op} = require('sequelize');

const logger = require('../../../config/logger');
const db = require('../../../db/models');

exports.paramValidate = (list) => {
    console.log(list);
    for (let i of list) {
        if(i === '' || i===undefined || i===null){
            return false;
        }
    }
    return true;
}

exports.monthSearch = async (user, year, month) => {
    try {
        const data = await db.Sreserves.findAll({
            where: {
                start_time: {
                    [Op.between] : [new Date(year, month -1, 1), new Date(year,month, 0)],
                },
                styler_id: user.styler_id,
            }
        });
        const result = data.map(elem=>elem.start_time);
        return result;
    }
    catch (e) {
        throw e;
    }
}

exports.dateSearch = async (user, year, month, date) => {
    try {
        const data = await db.Sreserves.findAll({
            where: {
                start_time: {
                    [Op.between] : [new Date(year, month -1, date, 0, 0, 0), new Date(year,month-1, date+1, 0, 0, 0)],
                },
                styler_id: user.styler_id,
            },
            include: [{
                model: db.Srmembers,
                include: [{
                    model: db.Users,
                    attributes: ['id', 'nickname'],
                }],
            }, {
                model: db.Users,
                attributes: ['id', 'nickname'],
            }, db.Courses,],

        });
        const result = data.map(sr => {
            let total_count = 0;
            const srms = sr.Srmembers.map(srm => {
                total_count += srm.count;
                return {
                    user_id: srm.user_id,
                    nickname: srm.User.nickname,
                    count: srm.count,
                }
            });
            return {
                sreserve_id: sr.id,
                start_time: sr.start_time,
                course: {
                    course_id: sr.Course.id,
                    duration: sr.Course.duration,
                },
                owner: {
                    user_id: sr.User.id,
                    nickname: sr.User.nickname,
                },
                members: srms,
                total_count,
            }
        });
        return result;

    } catch (e) {
        throw e;
    }
}