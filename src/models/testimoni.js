'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Testimoni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Testimoni.init({
    nama: DataTypes.STRING,
    profesi: DataTypes.STRING,
    testimoni: DataTypes.TEXT,
    status: DataTypes.ENUM("hide", "show"),
    foto: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Testimoni',
  });
  return Testimoni;
};