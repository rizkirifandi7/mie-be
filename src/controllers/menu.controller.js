const { Menu } = require("../models");
const fs = require("fs");
const path = require("path");

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

		console.log("data kategori:", kategori);
		const gambar = req.file.filename;

		const menu = await Menu.create({
			nama,
			harga,
			deskripsi,
			gambar,
			kategori,
		});
		res.status(201).json(menu);
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(
				path.join(__dirname, "../../", "uploads", req.file.filename)
			);
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
			if (req.file) {
				fs.unlinkSync(
					path.join(__dirname, "../../", "uploads", req.file.filename)
				);
			}
			return res.status(404).json({ message: "Menu not found" });
		}

		if (req.file) {
			gambar = req.file.filename;
		} else {
			gambar = menu.gambar;
		}

		const oldGambar = menu.gambar;

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

		if (req.file && oldGambar) {
			const oldGambarPath = path.join(
				__dirname,
				"../../",
				"uploads",
				oldGambar
			);
			if (fs.existsSync(oldGambarPath)) {
				fs.unlinkSync(oldGambarPath);
			}
		}

		const updatedMenu = await Menu.findByPk(id);
		res.status(200).json({ updatedMenu, message: "Menu updated" });
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(
				path.join(__dirname, "../../", "uploads", req.file.filename)
			);
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
			fs.unlinkSync(path.join(__dirname, "../../", "uploads", gambar));
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
