'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paket_Kemitraan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paket_Kemitraan.init({
    jenis_kemitraan: DataTypes.STRING,
    gambar: DataTypes.STRING,
    ukuran: DataTypes.STRING,
    harga: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paket_Kemitraan',
  });
  return Paket_Kemitraan;
};