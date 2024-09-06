const mockData = {
    provider: ['local', 'kakao'],
    email: ['abc@abc.com', 'kimtahen@gmail.com'],
    password: ["uWs2FG8Z4WJzVvl/ic8xex9IDRQdUWQ+Ga6Xh9vprYM1GjaXVCymP4Z3cQ42UI3YqliMN3mUenSIPc7VNHAk+g==", "E5IIdh4OhQClTKDvGXrtWLWJhM9QTBRbYA2wAuTARGAPJ9a1GfJMinFH3Bf248P2bZ2/AQ8YVC3nUs0rgpUPMQ=="],
    salt: ["yh9/I2l+0oki/Wty0qg8FfEeouAPpKW8XmuKsLE7kWGxt/mDkoIC/mNjxm4Vnyp0hG96kveEMJoPff6y7Aas+A==", "w4ipBwqGSCJQy9tRyA8h59ToUEWgkM3Kt1HA6MWuakG2DrvIwolR3TmwLJe9lJhyeuEkp+rd/8V4Dfwdepitlw=="],
    nickname: ["xyz", "tyler"],
}

const mockFindUser = (email) => {
    let index = mockData.email.findIndex((elem) => (email == elem));
    if(index===-1){
        return null;
    } 
    else {
        return {
            email: email,
            provider: mockData.provider[index],
            password: mockData.password[index],
            salt: mockData.salt[index],
            nickname: mockData.nickname[index],
        }
    }
}
const mockFindUserInfoOnly = (email) => {
    let index = mockData.email.findIndex((elem) => (email == elem));
    if(index===-1){
        return null;
    } 
    else {
        return {
            email: email,
            provider: mockData.provider[index],
            nickname: mockData.nickname[index],
        }
    }
}

module.exports = {mockData, mockFindUser, mockFindUserInfoOnly};
