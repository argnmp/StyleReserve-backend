const util = require('util');
const crypto = require('crypto');
const randomBytesPromisified = util.promisify(crypto.randomBytes);
const pbkdf2Promisified = util.promisify(crypto.pbkdf2);

const logger = require('../../../config/logger');

//signup
exports.createSalt = async () => {
    try {
        let salt = await randomBytesPromisified(64);
        return salt.toString('base64');
    } catch (e) {
        console.log(e);
        throw e;
    }
}
exports.hashPassword = async (salt, password) => {
    try {
        let key = await pbkdf2Promisified(password, salt, 17450, 64, 'sha512');
        return key.toString('base64');
    } catch (e) {
        logger.error(e);
        throw e;
    } 
}
exports.verifyUser = async (pwfromClient, saltfromDB, hashfromDB) => {
    let hashfromClient = await exports.hashPassword(saltfromDB, pwfromClient);
    return hashfromClient === hashfromDB;
}
