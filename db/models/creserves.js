'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Creserves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Creserves.belongsTo(models.Stylers, {
        foreignKey: 'styler_id',
      })
      models.Creserves.belongsTo(models.Users, {
        foreignKey: 'user_id',
      })
      models.Creserves.belongsTo(models.Clothes, {
        foreignKey: 'clothes_id',
      })
    }
  }
  Creserves.init({
    description: DataTypes.STRING,
    reservation_date: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Creserves',
  });
  return Creserves;
};