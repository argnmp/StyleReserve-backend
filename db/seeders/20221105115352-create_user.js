'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
      provider: 'local',
      email: 'abc@abc.com',
      password: "uWs2FG8Z4WJzVvl/ic8xex9IDRQdUWQ+Ga6Xh9vprYM1GjaXVCymP4Z3cQ42UI3YqliMN3mUenSIPc7VNHAk+g==",
      //password: helloworld
      salt: "yh9/I2l+0oki/Wty0qg8FfEeouAPpKW8XmuKsLE7kWGxt/mDkoIC/mNjxm4Vnyp0hG96kveEMJoPff6y7Aas+A==",
      nickname: "xyz", 
    }, {
      provider: 'local',
      email: 'kim@abc.com',
      password: "JcbanTpS5b7CHRjx36a0bIonew+iDhmw0yFqX08fu7HAaIUXuDaS7rWtLY7KmVuJ3wkxvoFsftBJCkvdcbubZQ==",
      //password: haskell
      salt: "6zaxp0O1dv0cq4HXD6irbbF8EbWnEPuLMi/0UpJIbpbV83pMLqNCiKb7qJ3Tcw2Ld7QvOjG8nZg/7UEiamJyRA==",
      nickname: "KimTaeHyeon", 

    },{
      provider: 'kakao',
      email: 'kimtahen@hanyang.ac.kr',
      password: "E5IIdh4OhQClTKDvGXrtWLWJhM9QTBRbYA2wAuTARGAPJ9a1GfJMinFH3Bf248P2bZ2/AQ8YVC3nUs0rgpUPMQ==",
      //password: twentyonepilots
      salt: "w4ipBwqGSCJQy9tRyA8h59ToUEWgkM3Kt1HA6MWuakG2DrvIwolR3TmwLJe9lJhyeuEkp+rd/8V4Dfwdepitlw==",
      nickname: "tyler", 
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
