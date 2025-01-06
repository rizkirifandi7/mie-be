"use strict";
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("Media_Sosials", [
			{
        nama: "Instagram",
        link: "https://www.instagram.com/",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
      {
        nama: "Facebook",
        link: "https://www.facebook.com/",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Youtube",
        link: "https://www.youtube.com/",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nama: "Tiktok",
        link: "https://www.tiktok.com/",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Media_Sosials", null, {});
	},
};

