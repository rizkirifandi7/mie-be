const { Informasi } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

const getAllInformasi = async (req, res) => {
	try {
		const informasi = await Informasi.findAll();
		return res.status(200).json({
			status: "success",
			informasi,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const getInformasiById = async (req, res) => {
	const { id } = req.params;
	try {
		const informasi = await Informasi.findByPk(id);
		if (!informasi) {
			return res.status(404).json({
				status: "error",
				message: "Informasi not found",
			});
		}

		return res.status(200).json({
			status: "success",
			informasi,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const createInformasi = async (req, res) => {
	try {
		const { deskripsi, visi, misi } = req.body;
		const filePath = req.file.path;

		const result = await cloudinary.uploader.upload(filePath);

		const gambar = result.secure_url;

		const informasi = await Informasi.create({
			deskripsi,
			visi,
			misi,
			gambar,
		});

		fs.unlinkSync(filePath);

		return res.status(201).json(informasi);
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: error.message });
	}
};

const updateInformasi = async (req, res) => {
	try {
		const { id } = req.params;
		const { deskripsi, visi, misi } = req.body;
		console.log(req.file);
		console.log(req.body);
		let gambar;

		const informasi = await Informasi.findByPk(id);
		if (!informasi) {
			return res.status(404).json({ message: "Informasi not found" });
		}

		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path);
			gambar = result.secure_url;

			// Delete the old image from Cloudinary
			const oldGambar = informasi.gambar;
			if (oldGambar) {
				const publicId = oldGambar.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(publicId);
			}
		} else {
			gambar = informasi.gambar;
		}

		await Informasi.update(
			{
				deskripsi,
				visi,
				misi,
				gambar,
			},
			{
				where: { id },
			}
		);

		const updatedInformasi = await Informasi.findByPk(id);
		res.status(200).json({ updatedInformasi, message: "Informasi updated" });
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: error.message });
	}
};

const deleteInformasi = async (req, res) => {
	const { id } = req.params;
	try {
		const informasi = await Informasi.findByPk(id);
		if (!informasi) {
			return res.status(404).json({
				status: "error",
				message: "Informasi not found",
			});
		}

		const gambar = JSON.parse(informasi.gambar);
		for (const image of gambar) {
			const publicId = image.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(publicId);
		}

		await informasi.destroy();

		return res.status(200).json({
			status: "success",
			message: "Informasi deleted",
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

module.exports = {
	getAllInformasi,
	getInformasiById,
	createInformasi,
	updateInformasi,
	deleteInformasi,
};
