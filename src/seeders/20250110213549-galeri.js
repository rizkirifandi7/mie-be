"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Galeris",
			[
				{
					judul: "Mie Pedas, Bandung Banget!",
					deskripsi:
						"Menjadi perusahaan terkemuka dalam penyediaan solusi usaha kuliner di Indonesia, khususnya dalam sektor gerobak dan kios, dengan fokus pada aksesibilitas dan kualitas.",
					gambar:
						"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736453590/ub58ysdvxskip2a1ffqg.png",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Galeris", null, {});
	},
};

