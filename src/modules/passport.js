const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');

const logger = require('../../config/logger');

require('dotenv').config();

const {verifyUser} = require('../routes/Auth/authService');

const mockData = {
    email: ['abc@abc.com', 'kimtahen@hanyang.ac.kr'],
    password: ["uWs2FG8Z4WJzVvl/ic8xex9IDRQdUWQ+Ga6Xh9vprYM1GjaXVCymP4Z3cQ42UI3YqliMN3mUenSIPc7VNHAk+g==", "E5IIdh4OhQClTKDvGXrtWLWJhM9QTBRbYA2wAuTARGAPJ9a1GfJMinFH3Bf248P2bZ2/AQ8YVC3nUs0rgpUPMQ=="],
    salt: ["yh9/I2l+0oki/Wty0qg8FfEeouAPpKW8XmuKsLE7kWGxt/mDkoIC/mNjxm4Vnyp0hG96kveEMJoPff6y7Aas+A==", "w4ipBwqGSCJQy9tRyA8h59ToUEWgkM3Kt1HA6MWuakG2DrvIwolR3TmwLJe9lJhyeuEkp+rd/8V4Dfwdepitlw=="],
    nickname: ["xyz", "tyler"],
}

const mockFindData = (email) => {
    let index = mockData.email.findIndex((elem) => (email == elem));
    if(index===-1){
        return null;
    } 
    else {
        return {
            email: email,
            password: mockData.password[index],
            salt: mockData.salt[index],
            nickname: mockData.nickname[index],
        }
    }
}

//local strategy
const localConfig = {usernameField: 'email', passwordField: 'password'};
const localVerify =  async (email, password, done) => {
    try {
        const user = mockFindData(email); 
        if(!user){
            done(null, false);
            return;
        }
        if(!await verifyUser(password, user.salt, user.password)){
            done(null, false);
            return;
        }
        done(null, {
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
