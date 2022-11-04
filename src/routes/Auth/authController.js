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

exports.greeting = async (req, res, next) => {
    if(req.user){
        res.send({message: `Hello ${req.user.nickname}. You are able to access data.`});
    }
    else {
        res.send({message: `Invalid Access. Aborted`});
    }
}

exports.signIn = async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
        try {
            if (err) {
                logger.error('signIn passport authenticate error', { message: err.stack });
                next(globalResponseSet.INTERNAL_SERVER_ERROR);
                return;
            }
            if (!user) {
                res.send(resbuilder(globalResponseSet.LOGIN_FAIL));
                return;
            }

            const { access_token, refresh_token } = await authService.generate_token(user);

            res.send(resbuilder(globalResponseSet.LOGIN_SUCCESS, { access_token, refresh_token }));

        } catch (e) {
            logger.error('signIn passport error', { message: e.stack });
            next(globalResponseSet.INTERNAL_SERVER_ERROR);
            return;
        }
    })(req, res);
    
}
