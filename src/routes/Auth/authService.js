const util = require('util');
const crypto = require('crypto');
const randomBytesPromisified = util.promisify(crypto.randomBytes);
const pbkdf2Promisified = util.promisify(crypto.pbkdf2);
const jwt = require('jsonwebtoken');

require('dotenv').config();

const logger = require('../../../config/logger');
const db = require('../../../db/models');

//token
exports.generate_token = async (user) =>{
    try {
        const access_token = jwt.sign({ provider: user.provider, email: user.email }, process.env.JWT_KEY, { expiresIn: '1d' });
        const refresh_token = jwt.sign({}, process.env.JWT_KEY, { expiresIn: '5d' });

        return {access_token, refresh_token};

        /*
        const { session } = await authService.getSessionByUserId(user.id);
        if (session) {
            await authService.updateSession(session.refresh_token, refresh_token);
        } else {
            await authService.createSession(user.id, refresh_token, ip);
        }
        */

    } 
    catch (e) {
        logger.error('generate_token error', {message: e});
        throw e;
    }
}


//signup
exports.createUser = async ({provider, email, nickname, password, salt, styler_id}) => {
    try {
        await db.Users.create({provider, email, nickname, password, salt, styler_id});    
    } catch (e){
        logger.error('createUser error', {message: e});
        throw e;
    }
}
exports.createSalt = async () => {
    try {
        let salt = await randomBytesPromisified(64);
        return salt.toString('base64');
    } catch (e) {
        logger.error('createSalt error', {message: e});
        throw e;
    }
}
exports.hashPassword = async (salt, password) => {
    try {
        let key = await pbkdf2Promisified(password, salt, 17450, 64, 'sha512');
        return key.toString('base64');
    } catch (e) {
        logger.error('hashPassword error', {message: e});
        throw e;
    } 
}
exports.verifyUser = async (pw, salt, dbHash) => {
    let reqHash= await exports.hashPassword(salt, pw);
    return reqHash === dbHash;
}
