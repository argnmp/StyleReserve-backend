'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Courses.hasMany(models.Sreserves, {
        foreignKey: 'course_id',
      })
    }
  }
  Courses.init({
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Courses',
  });
  return Courses;
};