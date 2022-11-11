'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sreserves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Sreserves.belongsTo(models.Stylers, {
        foreignKey: 'styler_id',
      });
      models.Sreserves.belongsTo(models.Courses, {
        foreignKey: 'course_id',
      });
      models.Sreserves.belongsTo(models.Users, {
        foreignKey: 'owner_id',
      });
      models.Sreserves.hasMany(models.Srmembers, {
        foreignKey: 'sr_id',
      });
    }
  }
  Sreserves.init({
    start_time: DataTypes.DATE
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Sreserves',
  });
  return Sreserves;
};