const jwt = require('jsonwebtoken');
require('dotenv').config();

const {globalResponseSet, resbuilder} = require('../common/resbuilder');
const db = require('../../db/models');


const authenticate = async (req, res, next) => {
    const access_token = req.body.access_token;
    if(access_token === null || access_token === undefined){
        res.send(resbuilder(globalResponseSet.NOT_AUTHENTICATED));
        return;
    }
    let decoded;
    try {
        decoded = jwt.verify(access_token, process.env.JWT_KEY);
    } catch (e) {
        if(e.name === "TokenExpiredError"){
            res.send(resbuilder(globalResponseSet.ACCESS_TOKEN_EXPIRED));
            return;
        }
        res.send(resbuilder(globalResponseSet.ACCESS_TOKEN_INVALID));
        return;
    }

    const user = await db.Users.findOne({
        attributes: ['id', 'provider', 'email', 'nickname'], 
        where: { provider: decoded.provider, email: decoded.email },
        include: db.Stylers,
    });
    req.user = {
        id: user.id,
        styler_id: user.Styler.id,
        provider: user.provider,
        email: user.email,
        nickname: user.nickname,
    }
    next();
    return;
}

module.exports = authenticate;