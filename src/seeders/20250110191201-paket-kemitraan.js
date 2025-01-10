"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Paket_Kemitraans",
			[
				{
					jenis_kemitraan: "Pekat Kemitraan 1",
					gambar:
						"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736453590/ub58ysdvxskip2a1ffqg.png",
					ukuran: "6x4m",
					harga: 12000000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					jenis_kemitraan: "Pekat Kemitraan 2",
					gambar:
						"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736453590/ub58ysdvxskip2a1ffqg.png",
					ukuran: "10x6m",
					harga: 24000000,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Paket_Kemitraans", null, {});
	},
};

