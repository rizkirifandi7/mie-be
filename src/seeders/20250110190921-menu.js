"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Menus",
			[
				{
					nama: "Mie Pedas Dmiehan",
					harga: 24000,
					deskripsi: "Mie Pedas Dmiehan adalah mie pedas yang sangat enak",
					gambar:
						"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736453590/ub58ysdvxskip2a1ffqg.png",
					kategori: "makanan",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nama: "Minuman Dmiehan",
					harga: 24000,
					deskripsi: "Mie Pedas Dmiehan adalah mie pedas yang sangat enak",
					gambar:
						"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736453590/ub58ysdvxskip2a1ffqg.png",
					kategori: "minuman",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nama: "Topping Dmiehan",
					harga: 24000,
					deskripsi: "Mie Pedas Dmiehan adalah mie pedas yang sangat enak",
					gambar:
						"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736453590/ub58ysdvxskip2a1ffqg.png",
					kategori: "topping",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Menus", null, {});
	},
};

