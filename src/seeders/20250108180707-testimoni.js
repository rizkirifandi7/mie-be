"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Testimonis",
			[
				{
					nama: "Customer 1",
					profesi: "Mitra Demiehan Bandung",
					status: "show",
					testimoni:
						"Demiehan telah membantu saya memulai usaha kuliner dengan mudah dan efisien. Kualitas gerobak dan kiosnya sangat baik.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nama: "Customer 2",
					profesi: "Mitra Demiehan Jakarta",
					status: "show",
					testimoni:
						"Pelayanan yang diberikan oleh Demiehan sangat memuaskan. Saya sangat merekomendasikan mereka untuk solusi usaha kuliner.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					nama: "Customer 3",
					profesi: "Mitra Demiehan Surabaya",
					status: "show",
					testimoni:
						"Produk-produk dari Demiehan sangat membantu dalam mengembangkan usaha kuliner saya. Terima kasih Demiehan!",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Testimonis", null, {});
	},
};
