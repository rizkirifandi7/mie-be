const { Berita } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

const getAllBerita = async (req, res) => {
	try {
		const berita = await Berita.findAll();
		return res.status(200).json({
			status: "success",
			berita,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const getBeritaById = async (req, res) => {
	const { id } = req.params;
	try {
		const berita = await Berita.findByPk(id);
		if (!berita) {
			return res.status(404).json({
				status: "error",
				message: "Berita not found",
			});
		}

		return res.status(200).json({
			status: "success",
			berita,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const createBerita = async (req, res) => {
	try {
		const { judul, isi, link } = req.body;
		const filePath = req.file.path;

		const result = await cloudinary.uploader.upload(filePath);

		const gambar = result.secure_url;

		const berita = await Berita.create({
			judul,
			isi,
			link,
			gambar,
		});

		fs.unlinkSync(filePath);

		return res.status(201).json(berita);
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: error.message });
	}
};

const updateBerita = async (req, res) => {
	try {
		const { id } = req.params;
		const { judul, isi, link } = req.body;
		let gambar;

		const berita = await Berita.findByPk(id);
		if (!berita) {
			return res.status(404).json({ message: "Berita not found" });
		}

		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path);
			gambar = result.secure_url;
		} else {
			gambar = berita.gambar;
		}

		const updatedBerita = await berita.update({ judul, isi, gambar, link });

		if (req.file) {
			fs.unlinkSync(req.file.path);
		}

		return res.status(200).json(updatedBerita);
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		return res.status(500).json({ message: error.message });
	}
};

const deleteBerita = async (req, res) => {
	try {
		const { id } = req.params;
		const berita = await Berita.findByPk(id);
		if (!berita) {
			return res.status(404).json({ message: "Berita not found" });
		}

		const gambar = berita.gambar;
		const deleted = await Berita.destroy({ where: { id } });
		if (!deleted) {
			return res.status(404).json({ message: "Berita not found" });
		}
		if (gambar) {
			const publicId = gambar.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(publicId);
		}

		res.status(204).json({ message: "Berita deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllBerita,
	getBeritaById,
	createBerita,
	updateBerita,
	deleteBerita,
};
