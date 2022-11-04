const globalResponseSet = {
    // COMMON
    INTERNAL_SERVER_ERROR: {code: 1, message: 'internal server error', isSuccess: false},
    // INDEX
    API_NOT_FOUND: {code: 100, message: 'target api not found', isSuccess: false},

    // TEST
    SUCCESS_TEST: {code: 1000, message: 'response from successTest', isSuccess: true},
    FAIL_TEST: {code: 1001, message: 'response from errorTest', isSuccess: false},

    // AUTH
    REGISTER_SUCCESS: {code: 2000, message: 'user registeration success', isSuccess: true},
    REGISTER_FAIL: {code: 2001, message: 'user registeration fail', isSuccess: false},
    LOGIN_SUCCESS: {code: 2010, message: 'login success', isSuccess: true},
    LOGIN_FAIL: {code: 2011, message: 'email or password error', isSuccess: false},
}

const resbuilder = ({code, message, isSuccess}, data) => {
    return {
        code, message, isSuccess, data
    };
}

module.exports = {globalResponseSet, resbuilder};
