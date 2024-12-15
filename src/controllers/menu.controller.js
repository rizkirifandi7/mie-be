const { Menu } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

const getAllMenus = async (req, res) => {
	try {
		const menus = await Menu.findAll();
		res.status(200).json(menus);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getOneMenu = async (req, res) => {
	try {
		const { id } = req.params;
		const menu = await Menu.findOne({ where: { id } });
		if (!menu) {
			return res.status(404).json({ message: "Menu not found" });
		}
		res.status(200).json(menu);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createMenu = async (req, res) => {
	try {
		const { nama, harga, deskripsi, kategori } = req.body;
		const filePath = req.file.path;

		const result = await cloudinary.uploader.upload(filePath);

		const gambar = result.secure_url;

		const menu = await Menu.create({
			nama,
			harga,
			deskripsi,
			gambar,
			kategori,
		});

		fs.unlinkSync(filePath);

		return res.status(201).json(menu);
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: error.message });
	}
};

const updateMenu = async (req, res) => {
	try {
		const { id } = req.params;
		const { nama, harga, deskripsi, kategori } = req.body;
		let gambar;

		const menu = await Menu.findByPk(id);
		if (!menu) {
			return res.status(404).json({ message: "Menu not found" });
		}

		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path);
			gambar = result.secure_url;

			// Delete the old image from Cloudinary
			const oldGambar = menu.gambar;
			if (oldGambar) {
				const publicId = oldGambar.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(publicId);
			}
		} else {
			gambar = menu.gambar;
		}

		await Menu.update(
			{
				nama,
				harga,
				deskripsi,
				gambar,
				kategori,
			},
			{
				where: { id },
			}
		);

		const updatedMenu = await Menu.findByPk(id);
		res.status(200).json({ updatedMenu, message: "Menu updated" });
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: error.message });
	}
};

const deleteMenu = async (req, res) => {
	try {
		const { id } = req.params;
		const menu = await Menu.findByPk(id);
		if (!menu) {
			return res.status(404).json({ message: "Menu not found" });
		}

		const gambar = menu.gambar;
		const deleted = await Menu.destroy({ where: { id } });
		if (!deleted) {
			return res.status(404).json({ message: "Menu not found" });
		}
		if (gambar) {
			const publicId = gambar.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(publicId);
		}

		res.status(204).json({ message: "Menu deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllMenus,
	getOneMenu,
	createMenu,
	updateMenu,
	deleteMenu,
};
