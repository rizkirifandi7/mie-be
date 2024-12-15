const { Paket_Kemitraan } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

const getAllPaketKemitraan = async (req, res) => {
	try {
		const paket_kemitraan = await Paket_Kemitraan.findAll();
		res.status(200).json(paket_kemitraan);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getOnePaketKemitraan = async (req, res) => {
	try {
		const { id } = req.params;
		const paket_kemitraan = await Paket_Kemitraan.findOne({ where: { id } });
		if (!paket_kemitraan) {
			return res.status(404).json({ message: "Paket Kemitraan not found" });
		}
		res.status(200).json(paket_kemitraan);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createPaketKemitraan = async (req, res) => {
	try {
		const { jenis_kemitraan, ukuran, harga } = req.body;
		const filePath = req.file.path;
		const result = await cloudinary.uploader.upload(filePath);
		const gambar = result.secure_url;

		const menu = await Paket_Kemitraan.create({
			jenis_kemitraan,
			ukuran,
			harga,
			gambar,
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

const updatePaketKemitraan = async (req, res) => {
	try {
		const { id } = req.params;
		const { jenis_kemitraan, ukuran, harga } = req.body;

    console.log(req.body);
		let gambar;

		const paket_kemitraan = await Paket_Kemitraan.findOne({ where: { id } });

		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path);
			gambar = result.secure_url;

			// Delete the old image from Cloudinary
			const oldGambar = paket_kemitraan.gambar;
			if (oldGambar) {
				const publicId = oldGambar.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(publicId);
			}
		} else {
			gambar = paket_kemitraan.gambar;
		}

		await paket_kemitraan.update({
			jenis_kemitraan,
			ukuran,
			harga,
			gambar,
		});

		res.status(200).json(paket_kemitraan);
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: error.message });
	}
};

const deletePaketKemitraan = async (req, res) => {
	try {
		const { id } = req.params;
		const paket_kemitraan = await Paket_Kemitraan.findByPk(id);
		if (!paket_kemitraan) {
			return res.status(404).json({ message: "Paket_kemitraan not found" });
		}

		const gambar = paket_kemitraan.gambar;
		const deleted = await Paket_Kemitraan.destroy({ where: { id } });
		if (!deleted) {
			return res.status(404).json({ message: "Paket_kemitraan not found" });
		}
		if (gambar) {
			const publicId = gambar.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(publicId);
		}

		res.status(204).json({ message: "Paket_kemitraan deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllPaketKemitraan,
	getOnePaketKemitraan,
	createPaketKemitraan,
	updatePaketKemitraan,
	deletePaketKemitraan,
};
