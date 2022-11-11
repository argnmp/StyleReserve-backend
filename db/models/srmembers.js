'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Srmembers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Srmembers.belongsTo(models.Sreserves, {
        foreignKey: 'sr_id',
      });        
      models.Srmembers.belongsTo(models.Users, {
        foreignKey: 'user_id',
      })
    }
  }
  Srmembers.init({
    count: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Srmembers',
  });
  return Srmembers;
};