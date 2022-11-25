'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clothes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Clothes.belongsTo(models.Stylers, {
        foreignKey: 'styler_id',
      });
      models.Clothes.hasMany(models.Creserves, {
        foreignKey: 'clothes_id',
      });
    }
  }
  Clothes.init({
    name: DataTypes.STRING,
    brand_name: DataTypes.STRING,
    type: DataTypes.INTEGER,
    url_type: DataTypes.BOOLEAN, 
    url: DataTypes.STRING,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Clothes',
  });
  return Clothes;
};