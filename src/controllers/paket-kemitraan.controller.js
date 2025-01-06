const { Paket_Kemitraan } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

const uploadFilesToCloudinary = async (files) => {
	return await Promise.all(
		files.map(async (file) => {
			try {
				const result = await cloudinary.uploader.upload(file.path);
				const autoCropUrl = cloudinary.url(result.public_id, {
					crop: "auto",
					gravity: "auto",
					width: 500,
					height: 500,
					fetch_format: "auto",
					quality: "auto",
				});
				return { filename: file.originalname, path: autoCropUrl };
			} catch (error) {
				throw new Error(
					`Failed to upload file ${file.originalname}: ${error.message}`
				);
			}
		})
	);
};

const deleteLocalFiles = (files) => {
	files.forEach((file) => {
		if (fs.existsSync(file.path)) {
			fs.unlinkSync(file.path);
		}
	});
};

const deleteCloudinaryImages = async (images) => {
	for (const image of images) {
		const publicId = image.path.split("/").pop().split(".")[0];
		await cloudinary.uploader.destroy(publicId);
	}
};

const getAllPaketKemitraan = async (req, res) => {
	try {
		const paketKemitraan = await Paket_Kemitraan.findAll();
		const formattedPaketKemitraan = paketKemitraan.map((paket) => ({
			id: paket.id,
			jenis_kemitraan: paket.jenis_kemitraan,
			ukuran: paket.ukuran,
			harga: paket.harga,
			gambar: JSON.parse(paket.gambar || "[]"),
		}));
		res.status(200).json({
			message: "Paket kemitraan retrieved successfully",
			data: formattedPaketKemitraan,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getOnePaketKemitraan = async (req, res) => {
	try {
		const { id } = req.params;
		const paketKemitraan = await Paket_Kemitraan.findOne({ where: { id } });
		if (!paketKemitraan) {
			return res.status(404).json({ message: "Paket Kemitraan not found" });
		}
		const formattedPaketKemitraan = {
			id: paketKemitraan.id,
			jenis_kemitraan: paketKemitraan.jenis_kemitraan,
			ukuran: paketKemitraan.ukuran,
			harga: paketKemitraan.harga,
			gambar: JSON.parse(paketKemitraan.gambar || "[]"),
		};
		res.status(200).json({
			message: "Paket kemitraan retrieved successfully",
			data: formattedPaketKemitraan,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createPaketKemitraan = async (req, res) => {
	try {
		const { jenis_kemitraan, ukuran, harga } = req.body;
		const files = req.files;

		if (!jenis_kemitraan || !ukuran || !harga || !files || files.length === 0) {
			return res
				.status(400)
				.json({ message: "Semua field dan file wajib diisi!" });
		}

		const uploadedFiles = await uploadFilesToCloudinary(files);
		await Paket_Kemitraan.create({
			jenis_kemitraan,
			ukuran,
			harga,
			gambar: JSON.stringify(uploadedFiles),
		});

		deleteLocalFiles(files);

		res.status(201).json({
			message: "Files uploaded successfully!",
			body: { jenis_kemitraan, ukuran, harga },
			files: uploadedFiles,
		});
	} catch (error) {
		if (req.files) {
			deleteLocalFiles(req.files);
		}
		res.status(500).json({ message: error.message });
	}
};

const updatePaketKemitraan = async (req, res) => {
	try {
		const { id } = req.params;
		const { jenis_kemitraan, ukuran, harga } = req.body;
		const paket_kemitraan = await Paket_Kemitraan.findOne({ where: { id } });

		if (!paket_kemitraan) {
			return res
				.status(404)
				.json({ message: "Paket kemitraan tidak ditemukan" });
		}

		let uploadedFiles = JSON.parse(paket_kemitraan.gambar || "[]");
		if (req.files && req.files.length > 0) {
			const newUploadedFiles = await uploadFilesToCloudinary(req.files);
			uploadedFiles = newUploadedFiles;
			deleteLocalFiles(req.files);
			await deleteCloudinaryImages(JSON.parse(paket_kemitraan.gambar || "[]"));
		}

		await paket_kemitraan.update({
			jenis_kemitraan,
			ukuran,
			harga,
			gambar: JSON.stringify(uploadedFiles),
		});

		res.status(200).json({
			message: "Paket kemitraan berhasil diperbarui",
			body: { jenis_kemitraan, ukuran, harga },
			files: uploadedFiles,
		});
	} catch (error) {
		if (req.files) {
			deleteLocalFiles(req.files);
		}
		res.status(500).json({ message: error.message });
	}
};

const deletePaketKemitraan = async (req, res) => {
	try {
		const { id } = req.params;
		const paket_kemitraan = await Paket_Kemitraan.findByPk(id);

		if (!paket_kemitraan) {
			return res.status(404).json({ message: "Paket kemitraan not found" });
		}

		const gambar = JSON.parse(paket_kemitraan.gambar || "[]");
		const deleted = await Paket_Kemitraan.destroy({ where: { id } });
		if (!deleted) {
			return res.status(404).json({ message: "Paket kemitraan not found" });
		}

		await deleteCloudinaryImages(gambar);

		res.status(204).json({ message: "Paket kemitraan deleted successfully" });
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
