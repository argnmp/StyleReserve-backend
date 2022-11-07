'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stylers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stylers.init({
    styler_id: DataTypes.INTEGER,
    serial_num: DataTypes.INTEGER,
    auth_key: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Stylers',
  });
  return Stylers;
};