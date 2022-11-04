const globalResponseSet = {
    SUCCESS_TEST: {code: 1000, message: 'response from successTest', isSuccess: true},
    FAIL_TEST: {code: 1001, message: 'response from errorTest', isSuccess: false},
}

const resbuild = ({code, message, isSuccess}, data) => {
    return {
        code, message, isSuccess, data
    };
}

module.exports = {globalResponseSet, resbuilder};
