const passport = require('passport');

const authService = require('./authService');
const {globalResponseSet, resbuilder} = require('../../common/resbuilder');
const logger = require('../../../config/logger');

exports.mockRegister = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const nickname = req.body.nickname;

    const salt =  await authService.createSalt();
    const mockData = {
        salt: salt,
        hashedPW: await authService.hashPassword(salt, password),
    }
    res.send(resbuilder(globalResponseSet.REGISTER_SUCCESS, mockData));
}

exports.signIn = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        if (err) {
            logger.error('signing passport authenticate error', { message: err.stack });
            next(globalResponseSet.INTERNAL_SERVER_ERROR);
            return;
        }
        if (!user) {
            res.send(resbuilder(globalResponseSet.LOGIN_FAIL));
            return;
        }

        //await token_generator(req, res, user);

        res.send(resbuilder(globalResponseSet.LOGIN_SUCCESS, { message: `hello ${user.nickname}` }));
    })(req, res);

    
}
