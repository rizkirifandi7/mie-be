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

		if (!req.file) {
			return res.status(400).json({ message: "File gambar tidak ditemukan" });
		}

		const filePath = req.file.path;

		const uploadResult = await cloudinary.uploader.upload(filePath);

		const gambarOptimized = cloudinary.url(uploadResult.public_id, {
			fetch_format: "auto",
			quality: "auto",
			crop: "auto",
			gravity: "auto",
			width: 500,
			height: 500,
		});

		const menu = await Menu.create({
			nama,
			harga,
			deskripsi,
			gambar: gambarOptimized,
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

		// Cari menu berdasarkan ID
		const menu = await Menu.findByPk(id);
		if (!menu) {
			return res.status(404).json({ message: "Menu not found" });
		}

		// Jika ada file baru, upload ke Cloudinary
		if (req.file) {
			const filePath = req.file.path;

			// Upload gambar baru
			const uploadResult = await cloudinary.uploader.upload(filePath);

			// URL aman dari gambar yang sudah dioptimalkan
			gambar = cloudinary.url(uploadResult.public_id, {
				fetch_format: "auto",
				quality: "auto",
				crop: "auto",
				gravity: "auto",
				width: 500,
				height: 500,
			});

			// Hapus gambar lama dari Cloudinary jika ada
			if (menu.gambar) {
				const oldPublicId = menu.gambar.split("/").pop().split("?")[0].split(".")[0];
				await cloudinary.uploader.destroy(oldPublicId);
			}

			// Hapus file lokal setelah upload selesai
			fs.unlinkSync(filePath);
		} else {
			gambar = menu.gambar; // Jika tidak ada file baru, gunakan gambar lama
		}

		// Perbarui data menu
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

		// Ambil data menu yang telah diperbarui
		const updatedMenu = await Menu.findByPk(id);
		res.status(200).json({ updatedMenu, message: "Menu updated" });
	} catch (error) {
		// Hapus file lokal jika ada kesalahan
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
			const publicId = gambar.split("/").pop().split("?")[0].split(".")[0];
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
