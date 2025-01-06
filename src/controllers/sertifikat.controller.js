const { Sertifikat } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

const getAllSertifikat = async (req, res) => {
	try {
		const sertifikat = await Sertifikat.findAll();

		res.status(200).json({
			message: "Sertifikat retrieved successfully",
			data: sertifikat,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getOneSertifikat = async (req, res) => {
	try {
		const { id } = req.params;
		const sertifikat = await Sertifikat.findOne({ where: { id } });

		if (!sertifikat) {
			return res.status(404).json({ message: "Sertifikat not found" });
		}

		res.status(200).json({
			message: "Sertifikat retrieved successfully",
			data: sertifikat,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createSertifikat = async (req, res) => {
	try {
		const { keterangan } = req.body;
		const filePath = req.file.path;

		const result = await cloudinary.uploader.upload(filePath);

		const gambar = result.secure_url;

		const sertifikat = await Sertifikat.create({
			keterangan,
			gambar,
		});

		fs.unlinkSync(filePath);

		return res.status(201).json(sertifikat);
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: error.message });
	}
};

const updateSertifikat = async (req, res) => {
	try {
		const { id } = req.params;
		const { keterangan } = req.body;
		let gambar;

		const sertifikat = await Sertifikat.findByPk(id);
		if (!sertifikat) {
			return res.status(404).json({ message: "Sertifikat not found" });
		}

		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path);
			gambar = result.secure_url;

			const oldGambar = sertifikat.gambar;
			if (oldGambar) {
				const publicId = oldGambar.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(publicId);
			}
		} else {
			gambar = sertifikat.gambar;
		}

		await Sertifikat.update(
			{
				keterangan,
				gambar,
			},
			{
				where: { id },
			}
		);

		const updatedSertifikat = await Sertifikat.findByPk(id);
		res.status(200).json({ updatedSertifikat, message: "Sertifikat updated" });
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: error.message });
	}
};

const deleteSertifikat = async (req, res) => {
	try {
		const { id } = req.params;
		const sertifikat = await Sertifikat.findByPk(id);
		if (!sertifikat) {
			return res.status(404).json({ message: "Sertifikat not found" });
		}

		const gambar = sertifikat.gambar;
		const deleted = await Sertifikat.destroy({ where: { id } });
		if (!deleted) {
			return res.status(404).json({ message: "Sertifikat not found" });
		}
		if (gambar) {
			const publicId = gambar.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(publicId);
		}

		res.status(204).json({ message: "Sertifikat deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
module.exports = {
	getAllSertifikat,
	getOneSertifikat,
	createSertifikat,
	updateSertifikat,
	deleteSertifikat,
};
