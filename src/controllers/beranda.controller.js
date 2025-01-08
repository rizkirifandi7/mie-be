const { Beranda } = require("../models");
const fs = require("fs/promises");
const cloudinary = require("../middleware/cloudinary");

const getAllBeranda = async (req, res) => {
	try {
		const beranda = await Beranda.findAll();
		res.status(200).json({
			status: "success",
			message: "Data berhasil ditampilkan",
			data: beranda,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
		console.error(error);
	}
};

const getBerandaById = async (req, res) => {
	try {
		const { id } = req.params;
		const beranda = await Beranda.findOne({ where: { id } });
		if (beranda) {
			res.status(200).json({
				status: "success",
				message: "Data berhasil ditampilkan",
				data: beranda,
			});
		} else {
			res.status(404).json({
				status: "error",
				message: "Data tidak ditemukan",
			});
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
		console.error(error);
	}
};

const createBeranda = async (req, res) => {
	try {
		const { judul, deskripsi } = req.body;

		// Access files from req.files
		const gambarFile = req.files.gambar?.[0];
		const backgroundFile = req.files.background?.[0];

		if (!gambarFile || !backgroundFile) {
			return res
				.status(400)
				.json({ message: "Gambar dan Background wajib diunggah" });
		}

		// Upload files to Cloudinary
		const gambarUpload = await cloudinary.uploader.upload(gambarFile.path);
		const backgroundUpload = await cloudinary.uploader.upload(
			backgroundFile.path
		);

		// Save data to database
		const beranda = await Beranda.create({
			judul,
			deskripsi,
			gambar: gambarUpload.secure_url,
			background: backgroundUpload.secure_url,
		});

		// Delete local files
		await fs.unlink(gambarFile.path);
		await fs.unlink(backgroundFile.path);

		res.status(201).json({
			status: "success",
			message: "Beranda berhasil dibuat",
			data: beranda,
		});
	} catch (error) {
		// Handle error and cleanup files
		if (req.files) {
			if (req.files.gambar) {
				await fs.unlink(req.files.gambar[0].path).catch(() => {});
			}
			if (req.files.background) {
				await fs.unlink(req.files.background[0].path).catch(() => {});
			}
		}
		res.status(500).json({ message: error.message });
	}
};

const updateBeranda = async (req, res) => {
	try {
		const { id } = req.params;
		const { judul, deskripsi } = req.body;

		// Temukan data Beranda berdasarkan ID
		const beranda = await Beranda.findOne({ where: { id } });
		if (!beranda) {
			return res.status(404).json({ message: "Data tidak ditemukan" });
		}

		// Periksa apakah file baru diunggah
		const gambarFile = req.files?.gambar?.[0];
		const backgroundFile = req.files?.background?.[0];

		let gambar = beranda.gambar;
		let background = beranda.background;

		// Jika file gambar baru diunggah
		if (gambarFile) {
			// Hapus gambar lama dari Cloudinary
			if (beranda.gambar) {
				const publicId = beranda.gambar.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(publicId);
			}
			// Upload gambar baru ke Cloudinary
			const gambarUpload = await cloudinary.uploader.upload(gambarFile.path);
			gambar = gambarUpload.secure_url;

			// Hapus file gambar lokal
			await fs.unlink(gambarFile.path);
		}

		// Jika file background baru diunggah
		if (backgroundFile) {
			// Hapus background lama dari Cloudinary
			if (beranda.background) {
				const publicId = beranda.background.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(publicId);
			}
			// Upload background baru ke Cloudinary
			const backgroundUpload = await cloudinary.uploader.upload(
				backgroundFile.path
			);
			background = backgroundUpload.secure_url;

			// Hapus file background lokal
			await fs.unlink(backgroundFile.path);
		}

		// Update data di database
		await beranda.update({
			judul: judul || beranda.judul,
			deskripsi: deskripsi || beranda.deskripsi,
			gambar,
			background,
		});

		res.status(200).json({
			status: "success",
			message: "Beranda berhasil diperbarui",
			data: beranda,
		});
	} catch (error) {
		// Handle error dan hapus file yang diunggah jika ada
		if (req.files) {
			if (req.files.gambar) {
				await fs.unlink(req.files.gambar[0].path).catch(() => {});
			}
			if (req.files.background) {
				await fs.unlink(req.files.background[0].path).catch(() => {});
			}
		}
		res.status(500).json({ message: error.message });
	}
};

const deleteBeranda = async (req, res) => {
	try {
		const { id } = req.params;
		const beranda = await Beranda.findOne({ where: { id } });

		if (!beranda) {
			return res.status(404).json({
				status: "error",
				message: "Data tidak ditemukan",
			});
		}

		// Delete images from Cloudinary
		if (beranda.gambar) {
			const publicId = beranda.gambar.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(publicId);
		}
		if (beranda.background) {
			const publicId = beranda.background.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(publicId);
		}

		await beranda.destroy();

		res.status(200).json({
			status: "success",
			message: "Data berhasil dihapus",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
		console.error(error);
	}
};

module.exports = {
	getAllBeranda,
	getBerandaById,
	createBeranda,
	updateBeranda,
	deleteBeranda,
};
