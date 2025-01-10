"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Banners",
			[
				{
					judul: "Mie Pedas, Bandung Banget!",
					deskripsi:
						"Menjadi perusahaan terkemuka dalam penyediaan solusi usaha kuliner di Indonesia, khususnya dalam sektor gerobak dan kios, dengan fokus pada aksesibilitas dan kualitas.",
					link: "berita",
					gambar:
						"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736536089/bg1_ub1p9o.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					judul: "Mie Pedas, Bandung Banget!",
					deskripsi:
						"Menjadi perusahaan terkemuka dalam penyediaan solusi usaha kuliner di Indonesia",
					link: "artikel",
					gambar:
						"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736536089/bg1_ub1p9o.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Banners", null, {});
	},
};

