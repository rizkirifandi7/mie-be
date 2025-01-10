"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Berita",
			[
				{
					judul: "Berita Demiehan 1",
					isi: "<p>Berita demiehan yang memberikan seputar informasi mengenai demiehan</p>",
					tipe: "berita",
					gambar:
						"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736536089/bg1_ub1p9o.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					judul: "Artikel Demiehan 1",
					isi: "<p>Artikel demiehan yang memberikan seputar informasi mengenai demiehan</p>",
					tipe: "artikel",
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
		await queryInterface.bulkDelete("Berita", null, {});
	},
};

