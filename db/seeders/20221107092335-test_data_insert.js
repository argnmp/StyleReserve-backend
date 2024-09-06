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
    }, {
      serial_num: 111111,
      auth_key: 'styler3', 
    }, {
      serial_num: 999999,
      auth_key: 'styler4',
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
      email: 'kimtahen@gmail.com',
      password: "MI57nUwizPrcAVEWCkK3vNeAmKpbfx0NDkcKhC2GKmUGBeXUr53cKsXLkjPhedjD2jgsc2HmX/1f0gFpJAaOLw==",
      //password: twentyonepilots
      salt: "41mA6jDJfeXyDRCYptkpsvYpeCq+MpMOtBs5Dx+fscxbNsbjVsHLcEz3hXzxmy0BmRpP8oS7Z1puk6KgrNI80g==",
      nickname: "tyler", 
      styler_id: 2,
    }]);

    // creating initial Sreserves
    await queryInterface.bulkInsert('Sreserves', [{
      styler_id: 2,
      course_id: 5,
      start_time: new Date(2022, 10, 11, 5, 0, 0),
      owner_id: 3, 
    }, {
      styler_id: 2,
      course_id: 4,
      start_time: new Date(2022, 10, 11, 10, 0, 0),
      owner_id: 3,
    }, {
      styler_id: 1,
      course_id: 3,
      start_time: new Date(2022, 10, 12, 6, 0, 0),
      owner_id: 1,
    }, {
      styler_id: 1,
      course_id: 1,
      start_time: new Date(2022, 10, 13, 7, 0, 0),
      owner_id: 2,
    }, {
      styler_id: 1,
      course_id: 3,
      start_time: new Date(2022, 10, 24, 11, 0, 0),
      owner_id: 2,
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
    }, {
      sr_id: 4,
      user_id: 2,
      count: 4,
    }, {
      sr_id: 5,
      user_id: 2,
      count: 1,
    }]);

    // adding to existing reservation
    await queryInterface.bulkInsert('Srmembers', [{
      sr_id: 4,
      user_id: 1,
      count: 1,
    },{
      sr_id: 3,
      user_id: 2,
      count: 1,
    }]);

    // add clothes
    await queryInterface.bulkInsert('Clothes', [{
      name: 'NJ1DN75A 남성 1996 에코 눕시 자켓',
      brand_name: 'THE NORTH FACE',
      type: 1,
      styler_id: 1,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20220412/2482269/2482269_1_500.jpg?t=20220412151526'
    }, {
      name: '레스터G RDS 구스다운 남성 롱패딩 (L/BLACK)',
      brand_name: 'DISCOVERY EXPEDITION',
      type: 1,
      styler_id: 1,
      url_type: true,
      url: 'https://image.msscdn.net/images/prd_img/20220830/2755391/detail_2755391_10_500.jpg?t=20220830164439'
    }, {
      name: '레체 투톤 덕 다운 패딩 글리터 그린 브라운',
      brand_name: 'SATUR',
      type: 2,
      styler_id: 1,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20221017/2870818/2870818_1_500.jpg?t=20221020233640'
    }, {
      name: '솔리드 무톤 자켓',
      brand_name: 'DOFFJASON',
      type: 2,
      styler_id: 1,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20161123/452483/452483_2_500.jpg?t=20201102154631'
    }, {
      name: '2 TONE ARCH HOODIE GRAY',
      brand_name: 'YALE',
      type: 3,
      styler_id: 1,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20220125/2326935/2326935_11_500.jpg?t=20220819135542'
    }, {
      name: '램스울 크루넥 오버니트(블랙)',
      brand_name: 'TAKEASY',
      type: 3,
      styler_id: 1,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20191017/1191407/1191407_2_500.jpg?t=20220628155444'
    }])

    await queryInterface.bulkInsert('Clothes', [{
      name: '해비 코튼 썸홀 후디',
      brand_name: 'INTEMPOMOOD',
      type: 1,
      styler_id: 2,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20220121/2319988/2319988_25_500.jpg?t=20221201091605'
    }, {
      name: '프렌치 스트라이프 셔츠-네이비',
      brand_name: 'TOMASMORE',
      type: 2,
      styler_id: 2,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20220113/2305840/2305840_2_500.jpg?t=20220215132819'
    }, {
      name: '리벳 아플리케 포켓 로고 후드 바닐라크림',
      brand_name: 'SATUR',
      type: 3,
      styler_id: 2,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20221017/2870841/2870841_1_500.jpg?t=20221020234255'
    }, {
      name: '테이퍼드 히든 밴딩 크롭 슬랙스',
      brand_name: 'MUSINSA STANDARD',
      type: 1,
      styler_id: 2,
      url_type: true,
      url: 'https://image.msscdn.net/images/prd_img/20190910/1149328/detail_1149328_19_500.jpg?t=20210705095346'
    }, {
      name: '이지 와이드 데님 팬츠 그레이',
      brand_name: 'GLW',
      type: 2,
      styler_id: 2,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20210826/2092852/2092852_4_500.jpg?t=20221012160640'
    }, {
      name: 'Punching Knit Dress BLACK',
      brand_name: 'AVANDRESS',
      type: 3,
      styler_id: 2,
      url_type: true,
      url: 'https://image.msscdn.net/images/prd_img/20220812/2714524/detail_2714524_1_500.jpg?t=20220822183900'
    }]);

    await queryInterface.bulkInsert('Clothes', [{
      name: '코드 후드 집업 자켓 스모크 그레이',
      brand_name: 'PARTIMENTO',
      type: 1,
      styler_id: 1,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20200123/1280576/1280576_2_500.jpg?t=20200130113408'
    }, {
      name: '와이드 스웨트 팬츠 그린',
      brand_name: 'PARTIMENTO',
      type: 1,
      styler_id: 1,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20220302/2392873/2392873_1_500.jpg?t=20220307150819'
    }, {
      name: '1967 JET BLACK JEANS',
      brand_name: 'BRANDED',
      type: 2,
      styler_id: 1,
      url_type: true,
      url: 'https://image.msscdn.net/images/goods_img/20200818/1552753/1552753_1_500.jpg?t=20220628154114'
    }])

    
    // creserves insert
    await queryInterface.bulkInsert('Creserves', [{
      user_id: 1,
      styler_id: 1,
      clothes_id: 13,
      reservation_date: new Date(2022, 10, 14),
      description: '11월 14일은 내가 입을거야',
    }, {
      user_id: 1,
      styler_id: 1,
      clothes_id: 2,
      reservation_date: new Date(2022, 10, 15), 
      description: "wish we could turn back time",
    }, {
      user_id: 2,
      styler_id: 1,
      clothes_id: 14,
      reservation_date: new Date(2022, 10, 22),
      description: "to the good old days",
    }, {
      user_id: 3,
      styler_id: 2,
      clothes_id: 7,
      reservation_date: new Date(2022, 10, 22),
      description: "saturday!",
    }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Creserves', null, {});
    await queryInterface.bulkDelete('Clothes', null, {});
    await queryInterface.bulkDelete('Srmembers', null, {});
    await queryInterface.bulkDelete('Sreserves', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Courses', null, {});
    await queryInterface.bulkDelete('Stylers', null, {});
  }
};
