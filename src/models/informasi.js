"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Informasi extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Informasi.init(
		{
			deskripsi: DataTypes.TEXT,
			gambar: DataTypes.STRING,
			visi: DataTypes.TEXT,
			misi: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "Informasi",
		}
	);
	return Informasi;
};

