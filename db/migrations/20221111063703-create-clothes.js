'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Clothes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      styler_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Stylers',
          key: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      brand_name: {
        allowNull: true, 
        type: Sequelize.STRING,
      },
      type: {
        allowNull: true,
        type: Sequelize.INTEGER, 
      },
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Clothes');
  }
};