"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Kemitraans", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			nama_lengkap: {
				type: Sequelize.STRING,
			},
			nik: {
				type: Sequelize.STRING,
			},
			jenis_kelamin: {
				type: Sequelize.STRING,
			},
			status_pernikahan: {
				type: Sequelize.STRING,
			},
			alamat_domisili: {
				type: Sequelize.TEXT,
			},
			no_telepon: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
			},
			tempat_tanggal_lahir: {
				type: Sequelize.STRING,
			},
			jenis_kemitraan: {
				type: Sequelize.STRING,
			},
			lokasi_usaha: {
				type: Sequelize.STRING,
			},
			apakah_lokasi_usaha_tersedia: {
				type: Sequelize.STRING,
			},
			pengalaman_bisnis: {
				type: Sequelize.STRING,
			},
			modal: {
				type: Sequelize.STRING,
			},
			alasan: {
				type: Sequelize.TEXT,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Kemitraans");
	},
};

