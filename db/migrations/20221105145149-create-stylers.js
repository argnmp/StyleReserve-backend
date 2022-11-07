'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stylers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serial_num: {
        type: Sequelize.INTEGER
      },
      auth_key: {
        type: Sequelize.STRING
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stylers');
  }
};