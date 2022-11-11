'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Stylers', [{
      serial_num: 123456,
      auth_key: 'styler1',
    }, {
      serial_num: 987654,
      auth_key: 'styler2',

    }]);
    await queryInterface.bulkInsert('Courses', [{
      duration: 30,
    }, {
      duration: 60,
    }, {
      duration: 90,
    }, {
      duration: 120,
    }, {
      duration: 150,
    }]);

    await queryInterface.bulkInsert('Users', [{
      provider: 'local',
      email: 'abc@abc.com',
      password: "uWs2FG8Z4WJzVvl/ic8xex9IDRQdUWQ+Ga6Xh9vprYM1GjaXVCymP4Z3cQ42UI3YqliMN3mUenSIPc7VNHAk+g==",
      //password: helloworld
      salt: "yh9/I2l+0oki/Wty0qg8FfEeouAPpKW8XmuKsLE7kWGxt/mDkoIC/mNjxm4Vnyp0hG96kveEMJoPff6y7Aas+A==",
      nickname: "xyz", 
      styler_id: 1,
    }, {
      provider: 'local',
      email: 'kim@abc.com',
      password: "JcbanTpS5b7CHRjx36a0bIonew+iDhmw0yFqX08fu7HAaIUXuDaS7rWtLY7KmVuJ3wkxvoFsftBJCkvdcbubZQ==",
      //password: haskell
      salt: "6zaxp0O1dv0cq4HXD6irbbF8EbWnEPuLMi/0UpJIbpbV83pMLqNCiKb7qJ3Tcw2Ld7QvOjG8nZg/7UEiamJyRA==",
      nickname: "KimTaeHyeon", 
      styler_id: 1,
    },{
      provider: 'kakao',
      email: 'kimtahen@hanyang.ac.kr',
      password: "E5IIdh4OhQClTKDvGXrtWLWJhM9QTBRbYA2wAuTARGAPJ9a1GfJMinFH3Bf248P2bZ2/AQ8YVC3nUs0rgpUPMQ==",
      //password: twentyonepilots
      salt: "w4ipBwqGSCJQy9tRyA8h59ToUEWgkM3Kt1HA6MWuakG2DrvIwolR3TmwLJe9lJhyeuEkp+rd/8V4Dfwdepitlw==",
      nickname: "tyler", 
      styler_id: 2,
    }]);

    // creating initial Sreserves
    await queryInterface.bulkInsert('Sreserves', [{
      styler_id: 2,
      course_id: 5,
      start_time: new Date(2022, 11, 11, 14, 0, 0),
      owner_id: 3, 
    }, {
      styler_id: 2,
      course_id: 4,
      start_time: new Date(2022, 11, 11, 19, 0, 0),
      owner_id: 3,
    }, {
      styler_id: 1,
      course_id: 3,
      start_time: new Date(2022, 11, 12, 15, 0, 0),
      owner_id: 1,
    }]);
    await queryInterface.bulkInsert('Srmembers', [{
      sr_id: 1,
      user_id: 3,
      count: 2, 
    }, {
      sr_id: 2,
      user_id: 3,
      count: 4, 
    }, {
      sr_id: 3,
      user_id: 1,
      count: 1,
    }]);

    // adding to existing reservation
    await queryInterface.bulkInsert('Srmembers', [{
      sr_id: 2,
      user_id: 1,
      count: 1,
    },{
      sr_id: 3,
      user_id: 2,
      count: 1,
    },{
      sr_id: 3,
      user_id: 3,
      count:2,
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
