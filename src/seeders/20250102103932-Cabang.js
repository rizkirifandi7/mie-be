"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Cabangs", [
			{
				nama_cabang: "Cabang A",
				alamat:
					"Jl. Selamat A No. 123, Kelurahan A, Kecamatan A, Kota A, Provinsi A",
				link_gmap: "https://goo.gl/maps/1",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nama_cabang: "Cabang B",
				alamat:
					"Jl. Selamat B No. 456, Kelurahan B, Kecamatan B, Kota B, Provinsi B",
				link_gmap: "https://goo.gl/maps/2",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				nama_cabang: "Cabang C",
				alamat:
					"Jl. Selamat C No. 789, Kelurahan C, Kecamatan C, Kota C, Provinsi C",
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
