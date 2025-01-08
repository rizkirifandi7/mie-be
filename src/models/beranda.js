"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Beranda extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Beranda.init(
		{
			judul: DataTypes.TEXT,
			deskripsi: DataTypes.TEXT,
			gambar: DataTypes.STRING,
			background: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Beranda",
		}
	);
	return Beranda;
};
