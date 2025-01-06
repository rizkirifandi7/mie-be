"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Cabangs", [
			{
				nama_cabang: "Cabang A",
				alamat: "Jl. Selamat A",
				link_gmap: "https://goo.gl/maps/1",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nama_cabang: "Cabang B",
				alamat: "Jl. Selamat B",
				link_gmap: "https://goo.gl/maps/2",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nama_cabang: "Cabang C",
				alamat: "Jl. Selamat C",
				link_gmap: "https://goo.gl/maps/3",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Cabangs", null, {});
	},
};

