const {globalResponseSet, resbuild} = require('../../common/resbuilder');

exports.successTest = async (req, res, next) => {
    const mockData = {
        currentTime: new Date(), 
        data : ['a','b','c'], 
    }
    res.json(resbuilder(globalResponseSet.SUCCESS_TEST, mockData));
}
exports.errorTest = async (req, res, next) => {
    res.json(resbuilder(globalResponseSet.FAIL_TEST));
}
