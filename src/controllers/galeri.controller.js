const { Galeri } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

const getAllGaleri = async (req, res) => {
	try {
		const galeri = await Galeri.findAll();
		return res.status(200).json({
			status: "success",
			galeri,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const getGaleriById = async (req, res) => {
	const { id } = req.params;
	try {
		const galeri = await Galeri.findByPk(id);
		if (!galeri) {
			return res.status(404).json({
				status: "error",
				message: "Galeri not found",
			});
		}

		return res.status(200).json({
			status: "success",
			galeri,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const createGaleri = async (req, res) => {
	try {
		const { judul } = req.body;
		const filePath = req.file.path;

		const result = await cloudinary.uploader.upload(filePath);

		const gambar = result.secure_url;

		const galeri = await Galeri.create({
			judul,
			gambar,
		});

		fs.unlinkSync(filePath);

		return res.status(201).json(galeri);
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		return res.status(500).json({ message: error.message });
	}
};

const updateGaleri = async (req, res) => {
	try {
		const { id } = req.params;
		const { judul } = req.body;
		let gambar;

		const galeri = await Galeri.findByPk(id);
		if (!galeri) {
			return res.status(404).json({ message: "Galeri not found" });
		}

		if (req.file) {
			const filePath = req.file.path;
			const result = await cloudinary.uploader.upload(filePath);
			gambar = result.secure_url;
			fs.unlinkSync(filePath);
		}

		galeri.judul = judul;
		galeri.gambar = gambar;

		await galeri.save();

		return res.status(200).json(galeri);
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: error.message });
	}
};

const deleteGaleri = async (req, res) => {
	const { id } = req.params;
	try {
		const galeri = await Galeri.findByPk(id);
		if (!galeri) {
			return res.status(404).json({ message: "Galeri not found" });
		}

		await galeri.destroy();

		return res.status(200).json({ message: "Galeri deleted successfully" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllGaleri,
	getGaleriById,
	createGaleri,
	updateGaleri,
	deleteGaleri,
};
