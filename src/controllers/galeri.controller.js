const { Galeri } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

const uploadFileToCloudinary = async (filePath) => {
	try {
		const result = await cloudinary.uploader.upload(filePath);
		return result.secure_url;
	} catch (error) {
		throw new Error(`Failed to upload file: ${error.message}`);
	}
};

const deleteLocalFile = (filePath) => {
	if (fs.existsSync(filePath)) {
		fs.unlinkSync(filePath);
	}
};

const validateGaleri = (data) => {
	if (!data.judul) {
		throw new Error("Judul is required");
	}
};

const getAllGaleri = async (req, res) => {
	try {
		const galeri = await Galeri.findAll();
		return res.status(200).json({
			status: "success",
			galeri,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			status: "error",
			message: "Failed to retrieve galeri",
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
		console.error(error);
		return res.status(500).json({
			status: "error",
			message: "Failed to retrieve galeri",
		});
	}
};

const createGaleri = async (req, res) => {
	try {
		validateGaleri(req.body);

		const { judul, deskripsi } = req.body;
		const filePath = req.file.path;

		const gambar = await uploadFileToCloudinary(filePath);

		const galeri = await Galeri.create({
			judul,
			deskripsi,
			gambar,
		});

		deleteLocalFile(filePath);

		return res.status(201).json(galeri);
	} catch (error) {
		console.error(error);
		if (req.file) {
			deleteLocalFile(req.file.path);
		}
		return res.status(500).json({ message: "Failed to create galeri" });
	}
};

const updateGaleri = async (req, res) => {
	try {
		const { id } = req.params;
		validateGaleri(req.body);

		const { judul, deskripsi } = req.body;
		let gambar;

		const galeri = await Galeri.findByPk(id);
		if (!galeri) {
			return res.status(404).json({ message: "Galeri not found" });
		}

		if (req.file) {
			const filePath = req.file.path;
			gambar = await uploadFileToCloudinary(filePath);
			deleteLocalFile(filePath);
		}

		galeri.judul = judul;
		galeri.gambar = gambar;
		galeri.deskripsi = deskripsi;

		await galeri.save();

		return res.status(200).json(galeri);
	} catch (error) {
		console.error(error);
		if (req.file) {
			deleteLocalFile(req.file.path);
		}
		res.status(500).json({ message: "Failed to update galeri" });
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
		console.error(error);
		return res.status(500).json({ message: "Failed to delete galeri" });
	}
};

module.exports = {
	getAllGaleri,
	getGaleriById,
	createGaleri,
	updateGaleri,
	deleteGaleri,
};
