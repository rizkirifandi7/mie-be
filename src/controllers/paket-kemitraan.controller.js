const { Paket_Kemitraan } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

const getAllPaketKemitraan = async (req, res) => {
	try {
		const paketKemitraan = await Paket_Kemitraan.findAll();

		const formattedPaketKemitraan = paketKemitraan.map((paket) => {
			const parsedGambar = JSON.parse(paket.gambar || "[]");
			return {
				id: paket.id,
				jenis_kemitraan: paket.jenis_kemitraan,
				ukuran: paket.ukuran,
				harga: paket.harga,
				gambar: parsedGambar,
			};
		});

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

		// Validasi input
		if (!jenis_kemitraan || !ukuran || !harga || !files || files.length === 0) {
			return res
				.status(400)
				.json({ message: "Semua field dan file wajib diisi!" });
		}

		// Upload gambar ke Cloudinary
		const uploadedFiles = [];
		for (const file of files) {
			const result = await cloudinary.uploader.upload(file.path);
			uploadedFiles.push({
				filename: file.originalname,
				path: result.secure_url,
			});
		}

		// Simpan data ke database
		await Paket_Kemitraan.create({
			jenis_kemitraan,
			ukuran,
			harga,
			gambar: JSON.stringify(uploadedFiles),
		});

		// Hapus file lokal setelah berhasil diupload ke Cloudinary
		files.forEach((file) => fs.unlinkSync(file.path));

		// Response dengan format yang diinginkan
		return res.status(201).json({
			message: "Files uploaded successfully!",
			body: {
				jenis_kemitraan,
				ukuran,
				harga,
			},
			files: uploadedFiles,
		});
	} catch (error) {
		// Hapus file lokal jika terjadi error
		if (req.files) {
			req.files.forEach((file) => {
				if (fs.existsSync(file.path)) {
					fs.unlinkSync(file.path);
				}
			});
		}
		return res.status(500).json({ message: error.message });
	}
};

const updatePaketKemitraan = async (req, res) => {
	try {
		const { id } = req.params;
		const { jenis_kemitraan, ukuran, harga } = req.body;

		// Cari paket kemitraan berdasarkan ID
		const paket_kemitraan = await Paket_Kemitraan.findOne({ where: { id } });

		if (!paket_kemitraan) {
			return res
				.status(404)
				.json({ message: "Paket kemitraan tidak ditemukan" });
		}

		let uploadedFiles = JSON.parse(paket_kemitraan.gambar || "[]"); // Gambar lama
		if (req.files && req.files.length > 0) {
			const newUploadedFiles = [];
			for (const file of req.files) {
				const result = await cloudinary.uploader.upload(file.path);
				newUploadedFiles.push({
					filename: file.originalname,
					path: result.secure_url,
				});
			}

			// Gabungkan gambar lama dengan yang baru (opsional: bisa diganti dengan hanya gambar baru)
			uploadedFiles = newUploadedFiles;

			// Hapus file lokal setelah berhasil diupload
			req.files.forEach((file) => fs.unlinkSync(file.path));

			// Hapus gambar lama dari Cloudinary (opsional: hanya jika semua gambar lama harus dihapus)
			const oldGambar = JSON.parse(paket_kemitraan.gambar || "[]");
			for (const image of oldGambar) {
				const publicId = image.path.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(publicId);
			}
		}

		// Update data paket kemitraan
		await paket_kemitraan.update({
			jenis_kemitraan,
			ukuran,
			harga,
			gambar: JSON.stringify(uploadedFiles),
		});

		res.status(200).json({
			message: "Paket kemitraan berhasil diperbarui",
			body: {
				jenis_kemitraan,
				ukuran,
				harga,
			},
			files: uploadedFiles,
		});
	} catch (error) {
		// Hapus file lokal jika terjadi error
		if (req.files) {
			req.files.forEach((file) => {
				if (fs.existsSync(file.path)) {
					fs.unlinkSync(file.path);
				}
			});
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

		// Parsing gambar yang ada di database
		const gambar = JSON.parse(paket_kemitraan.gambar || "[]");

		// Menghapus data paket kemitraan dari database
		const deleted = await Paket_Kemitraan.destroy({ where: { id } });
		if (!deleted) {
			return res.status(404).json({ message: "Paket kemitraan not found" });
		}

		// Menghapus gambar dari Cloudinary jika ada
		for (const image of gambar) {
			const publicId = image.path.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(publicId);
		}

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
