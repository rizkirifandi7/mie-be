"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("Informasis", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			deskripsi: {
				type: Sequelize.TEXT,
			},
			gambar: {
				type: Sequelize.STRING,
			},
			visi: {
				type: Sequelize.TEXT,
			},
			misi: {
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
		await queryInterface.dropTable("Informasis");
	},
};
