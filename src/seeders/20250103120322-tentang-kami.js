"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Informasis", [
			{
				gambar:
					"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736453590/ub58ysdvxskip2a1ffqg.png",
				deskripsi:
					"D’emiehan adalah perusahaan yang berdedikasi untuk menjadi mitra ideal bagi para pelaku usaha yang ingin memulai bisnis gerobak atau kios dengan konsep jual putus kepada mitra. Kami menawarkan solusi usaha skala kecil yang terjangkau, memungkinkan setiap orang untuk mengeksplorasi dunia kuliner tanpa beban finansial yang berat. Dengan pendekatan yang praktis dan inovatif, D’emiehan menyediakan desain gerobak menarik, bahan baku berkualitas, dan pelatihan menyeluruh untuk memastikan setiap mitra kami dapat sukses dalam bisnis mereka.",
				visi: "Menjadi perusahaan terkemuka dalam penyediaan solusi usaha kuliner di Indonesia, khususnya dalam sektor gerobak dan kios, dengan fokus pada aksesibilitas dan kualitas.",
				misi: "Memberdayakan Wirausahawan: Membantu pelaku usaha pemula dalam memulai dan mengembangkan bisnis kuliner dengan menyediakan paket usaha yang terjangkau dan mudah diakses serta Memberikan pelatihan dan dukungan berkelanjutan kepada mitra agar mereka dapat mengelola usaha dengan efisien dan efektif.",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Informasis", null, {});
	},
};

