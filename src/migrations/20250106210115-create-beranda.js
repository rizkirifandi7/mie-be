"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Berandas", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			judul: {
				type: Sequelize.TEXT,
			},
			deskripsi: {
				type: Sequelize.TEXT,
			},
			nomor: {
				type: Sequelize.STRING,
			},
			gambar: {
				type: Sequelize.STRING,
			},
			background: {
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
		await queryInterface.dropTable("Berandas");
	},
};

