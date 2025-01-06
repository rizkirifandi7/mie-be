"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Informasis", [
			{
				deskripsi:
					"D’emiehan adalah perusahaan yang berdedikasi untuk menjadi mitra ideal bagi para pelaku usaha yang ingin memulai bisnis gerobak atau kios dengan konsep jual putus kepada mitra. Kami menawarkan solusi usaha skala kecil yang terjangkau, memungkinkan setiap orang untuk mengeksplorasi dunia kuliner tanpa beban finansial yang berat. Dengan pendekatan yang praktis dan inovatif, D’emiehan menyediakan desain gerobak menarik, bahan baku berkualitas, dan pelatihan menyeluruh untuk memastikan setiap mitra kami dapat sukses dalam bisnis mereka.",
				visi: "https://www.instagram.com/",
				misi: "https://www.instagram.com/",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Informasis", null, {});
	},
};

