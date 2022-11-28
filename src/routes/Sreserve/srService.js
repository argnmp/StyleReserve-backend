const {Op, ValidationErrorItemOrigin} = require('sequelize');

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
            },
            order: [
                ['start_time','asc']
            ]
        });
        const result = data.map(elem=>elem.start_time);
        return result;
    }
    catch (e) {
        logger.error('monthSearch error', {message: e});
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
            order: [
                ['start_time','asc']
            ],
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
        logger.error('dateSearch error', {message: e});
        throw e;
    }
}
exports.getDuration = async (course_id) => {
    try {
        const result = await db.Courses.findOne({
            where: {
                id: course_id,
            }
        });
        return result.duration;

    } catch (e) {
        logger.error('getDuration error', {message: e});
        throw e;

    }
}
exports.checkReservation = async (user, start_time, course_id) => {
    try {
        const year = start_time.getFullYear();
        const month = start_time.getMonth();
        const date = start_time.getDate();

        const duration = await this.getDuration(course_id);
        const end_time = new Date(start_time);
        end_time.setMinutes(end_time.getMinutes() + duration);
        const data = await db.Sreserves.findAll({
            where: {
                start_time: {
                    [Op.between]: [new Date(year, month, date, 0, 0, 0), new Date(year, month, date + 1, 0, 0, 0)],
                },
                styler_id: user.styler_id,
            },
            include: [db.Courses]
        });
        console.log(start_time, end_time);
        for (let item of data) {
            const from = item.start_time;
            const to = new Date(from);
            to.setMinutes(to.getMinutes() + item.Course.duration);
            console.log(from, to);
            if (!((end_time <= from) || (start_time >= to))) {
                return false;
            }
        }
        return true;

    } catch (e) {
        logger.error('checkReservation error', {message: e});
        throw e;

    }
}
exports.createSrmember = async (user, sr_id, count) => {
    try {
        await db.Srmembers.create({
            sr_id,
            user_id: user.id,
            count,
        })
    } catch (e) {
        logger.error('createSrmember error', {message: e});
        throw e;

    }

}
exports.createSreserve = async (user, start_time, course_id, count) => {
    try {
        const sreserve = await db.Sreserves.create({
            start_time,
            owner_id: user.id,
            course_id,
            styler_id: user.styler_id,
        });
        await this.createSrmember(user, sreserve.id, count)
        
    } catch (e) {
        logger.error('createSreserve error', {message: e});
        throw e;

    }
}
exports.srValidate = async (user, sr_id) => {
    try {    
        const sreserve = await db.Sreserves.findOne({
            where: {
                id: sr_id,
                styler_id: user.styler_id,
            }
        });
        if(sreserve == null || sreserve == undefined){
            return false;
        }
        return true;
         
    } catch (e) {
        logger.error('srValidate error', {message: e});
        throw e;

    }
    
}
exports.memberValidate = async (user, sr_id, count) => {
    try {
        const sreserve = await db.Sreserves.findOne({
            where: {
                id: sr_id,
            },
            include: [{
                model: db.Srmembers,
            }],
        });
        if(sreserve == null || sreserve == undefined){
            return false;
        }
        let counter = 0;
        if(sreserve.owner_id == user.id){
            return false;
        }
        for(let mem of sreserve.Srmembers){
            if(mem.user_id == user.id){
                return false;
            }
            counter += mem.count;
        }
        if(counter + count > 5){
            return false;
        }
        return true;
    } catch (e) {
        logger.error('memberValidate error', {message: e});
        throw e;

    }
}
exports.deleteSreserve = async (user, sr_id) => {
    try {    
        const sreserve = await db.Sreserves.findOne({
            where: {
                id: sr_id,
            }
        });
        if(sreserve.owner_id != user.id){
            return false;
        }
        await db.Sreserves.destroy({
            where: {
                id: sr_id
            }
        })
        return true;
         
    } catch (e) {
        logger.error('deleteSreserve error', {message: e});
        throw e;

    }
}
