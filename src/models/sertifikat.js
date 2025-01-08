"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Sertifikat extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Sertifikat.init(
		{
			keterangan: DataTypes.TEXT,
			gambar: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Sertifikat",
		}
	);
	return Sertifikat;
};
