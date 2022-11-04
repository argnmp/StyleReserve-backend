const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const logger = require('../../config/logger');

require('dotenv').config();

const {verifyUser} = require('../routes/Auth/authService');

const {mockData, mockFindUser} = require('../mockdata/users');

//local strategy
const localConfig = {usernameField: 'email', passwordField: 'password'};
const localVerify =  async (email, password, done) => {
    try {
        const user = mockFindUser(email); 
        if(!user){
            done(null, false);
            return;
        }
        if(!await verifyUser(password, user.salt, user.password)){
            done(null, false);
            return;
        }
        done(null, {
            provider: user.provider,
            email: user.email,
            nickname: user.nickname,
        });
        return;
    } catch (e) {
        done(e);
    }
}

module.exports = {
    initialize : () => {
        passport.use('local', new LocalStrategy(localConfig, localVerify));
    },
}
