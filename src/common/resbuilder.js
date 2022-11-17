const globalResponseSet = {
    // COMMON
    API_SUCCESS: {code: 1, message: 'api call success', isSuccess: true},

    // INDEX
    INTERNAL_SERVER_ERROR: {code: 100, message: 'internal server error', isSuccess: false},
    API_NOT_FOUND: {code: 101, message: 'target api not found', isSuccess: false},

    // TEST
    SUCCESS_TEST: {code: 1000, message: 'response from successTest', isSuccess: true},
    FAIL_TEST: {code: 1001, message: 'response from errorTest', isSuccess: false},

    // AUTH
    REGISTER_SUCCESS: {code: 2000, message: 'user registeration success', isSuccess: true},
    REGISTER_FAIL: {code: 2001, message: 'user registeration fail', isSuccess: false},
    LOGIN_SUCCESS: {code: 2010, message: 'login success', isSuccess: true},
    LOGIN_FAIL: {code: 2011, message: 'email or password error', isSuccess: false},

    // MIDDLEWARE/authenticate
    NOT_AUTHENTICATED: {code: 3000, message: 'not authenticated', isSuccess: false},
    ACCESS_TOKEN_EXPIRED: {code: 3010, message: 'access token expired', isSuccess: false},
    ACCESS_TOKEN_INVALID: {code: 3011, message: 'access token invalid', isSuccess: false},
    REFRESH_TOKEN_EXPIRED: {code: 3020, message: 'refresh token expired', isSuccess: false},
    REFRESH_TOKEN_INVALID: {code: 3021, message: 'refresh token invalid', isSuccess: false},

    // Sreserve
    PARAMETER_ERROR: {code: 4000, message: 'parameter error', isSuccess: false},
    
}

const resbuilder = ({code, message, isSuccess}, data) => {
    return {
        code, message, isSuccess, data
    };
}

module.exports = {globalResponseSet, resbuilder};
