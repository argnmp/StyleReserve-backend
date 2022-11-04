## StyleReserve-backend
This is a backend api server for StyleReserve application

## Response code
For all api requests, the backend server responds with one of these codes

```javascript
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

    // MIDDLEWARE/authenticate
    NOT_AUTHENTICATED: {code: 3000, message: 'not authenticated', isSuccess: false},
    ACCESS_TOKEN_EXPIRED: {code: 3010, message: 'access token expired', isSuccess: false},
    ACCESS_TOKEN_INVALID: {code: 3011, message: 'access token invalid', isSuccess: false},
    REFRESH_TOKEN_EXPIRED: {code: 3020, message: 'refresh token expired', isSuccess: false},
    REFRESH_TOKEN_INVALID: {code: 3021, message: 'refresh token invalid', isSuccess: false},
}
```

## Commit Rules
[https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

```shell
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
### types
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

### example
- feat: add jsonwebtoken for user verification

