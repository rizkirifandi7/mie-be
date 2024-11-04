"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("Menus", [
			{
				nama: "Mie Gacor Pedas",
				harga: 10000,
				deskripsi: "Mie Gacor Pedas",
				gambar: "menu1.png",
				kategori: "makanan",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Menus", null, {});
	},
};

