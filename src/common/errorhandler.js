const logger = require('../../config/logger');
const {globalResponseSet, resbuilder} = require('./resbuilder');

exports.wrapAsync = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((e)=>{
            logger.error('internal server error', {message: e.stack});            
            next(globalResponseSet.INTERNAL_SERVER_ERROR);
        });
    };
}