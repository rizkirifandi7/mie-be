"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Kemitraan extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Kemitraan.init(
		{
			nama_lengkap: DataTypes.STRING,
			nik: DataTypes.STRING,
			jenis_kelamin: DataTypes.STRING,
			status_pernikahan: DataTypes.STRING,
			alamat_domisili: DataTypes.TEXT,
			no_telepon: DataTypes.STRING,
			email: DataTypes.STRING,
			tempat_tanggal_lahir: DataTypes.STRING,
			jenis_kemitraan: DataTypes.STRING,
			lokasi_usaha: DataTypes.STRING,
			apakah_lokasi_usaha_tersedia: DataTypes.STRING,
			pengalaman_bisnis: DataTypes.STRING,
			modal: DataTypes.STRING,
			alasan: DataTypes.TEXT,
		},
		{
			sequelize,
			modelName: "Kemitraan",
		}
	);
	return Kemitraan;
};
