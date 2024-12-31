"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Paket_Kemitraans", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			jenis_kemitraan: {
				type: Sequelize.STRING,
			},
			harga: {
				type: Sequelize.STRING,
			},
			gambar: {
				type: Sequelize.TEXT,
			},
      ukuran: {
        type: Sequelize.STRING,
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
		await queryInterface.dropTable("Paket_Kemitraans");
	},
};
