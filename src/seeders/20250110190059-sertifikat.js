"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Sertifikats", [
			{
				keterangan: "Sertifikat A",
				gambar:
					"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736453590/ub58ysdvxskip2a1ffqg.png",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keterangan: "Sertifikat B",
				gambar:
					"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736453590/ub58ysdvxskip2a1ffqg.png",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keterangan: "Sertifikat C",
				gambar:
					"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736453590/ub58ysdvxskip2a1ffqg.png",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				keterangan: "Sertifikat D",
				gambar:
					"https://res.cloudinary.com/de8yvsvwj/image/upload/v1736453590/ub58ysdvxskip2a1ffqg.png",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Sertifikats", null, {});
	},
};

