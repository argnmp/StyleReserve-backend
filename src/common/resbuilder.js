const globalResponseSet = {
    // INDEX
    API_NOT_FOUND: {code: 100, message: 'target api not found', isSuccess: false},

    // TEST
    SUCCESS_TEST: {code: 1000, message: 'response from successTest', isSuccess: true},
    FAIL_TEST: {code: 1001, message: 'response from errorTest', isSuccess: false},
}

const resbuilder = ({code, message, isSuccess}, data) => {
    return {
        code, message, isSuccess, data
    };
}

module.exports = {globalResponseSet, resbuilder};
