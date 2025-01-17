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
		const formattedPaketKemitraan = paketKemitraan.map((paket) => {
			let formattedGambar;

			if (!paket.gambar) {
				formattedGambar = [];
			} else if (paket.gambar.startsWith("[")) {
				// Handle JSON array of images
				const parsedGambar = JSON.parse(paket.gambar);
				formattedGambar = parsedGambar.map((img) => {
					return typeof img === "string"
						? {
								filename: img.split("/").pop(),
								path: img,
						  }
						: img;
				});
			} else {
				// Handle single image URL
				formattedGambar = [
					{
						filename: paket.gambar.split("/").pop(),
						path: paket.gambar,
					},
				];
			}

			return {
				id: paket.id,
				jenis_kemitraan: paket.jenis_kemitraan,
				ukuran: paket.ukuran,
				harga: paket.harga,
				gambar: formattedGambar,
				deskripsi: paket.deskripsi,
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

		let parsedGambar;
		try {
			const rawGambar = JSON.parse(paketKemitraan.gambar || "[]");

			if (Array.isArray(rawGambar) && typeof rawGambar[0] === "object") {
				parsedGambar = rawGambar.map((img) => ({
					url: img.path,
					path: img.path,
				}));
			} else if (typeof rawGambar === "string" && rawGambar.includes("path")) {
				const innerJson = JSON.parse(rawGambar);
				parsedGambar = innerJson.map((img) => ({
					url: img.path,
					path: img.path,
				}));
			} else if (typeof rawGambar === "string" && rawGambar.includes("http")) {
				parsedGambar = [
					{
						url: rawGambar,
						path: rawGambar,
					},
				];
			} else if (Array.isArray(rawGambar)) {
				parsedGambar = rawGambar.map((img) => ({
					url: img,
					path: img,
				}));
			}
		} catch (jsonError) {
			parsedGambar = paketKemitraan.gambar
				? [
						{
							url: paketKemitraan.gambar,
							path: paketKemitraan.gambar,
						},
				  ]
				: [];
		}

		const formattedPaketKemitraan = {
			id: paketKemitraan.id,
			jenis_kemitraan: paketKemitraan.jenis_kemitraan,
			ukuran: paketKemitraan.ukuran,
			harga: paketKemitraan.harga,
			gambar: parsedGambar,
			deskripsi: paketKemitraan.deskripsi,
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
		const { jenis_kemitraan, ukuran, harga, deskripsi } = req.body;
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
			deskripsi,
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
		const { jenis_kemitraan, ukuran, harga, deskripsi } = req.body;
		const paket_kemitraan = await Paket_Kemitraan.findOne({ where: { id } });

		console.log("Existing Paket Kemitraan:", paket_kemitraan);

		if (!paket_kemitraan) {
			return res
				.status(404)
				.json({ message: "Paket kemitraan tidak ditemukan" });
		}

		let uploadedFiles;
		try {
			uploadedFiles = JSON.parse(paket_kemitraan.gambar || "[]");
		} catch (e) {
			console.error("Error parsing gambar field:", e);
			uploadedFiles = [];
		}

		if (req.files && req.files.length > 0) {
			const newUploadedFiles = await uploadFilesToCloudinary(req.files);
			uploadedFiles = [...uploadedFiles, ...newUploadedFiles];
			deleteLocalFiles(req.files);
			await deleteCloudinaryImages(JSON.parse(paket_kemitraan.gambar || "[]"));
		}

		await paket_kemitraan.update({
			jenis_kemitraan,
			deskripsi,
			ukuran,
			harga,
			gambar: JSON.stringify(uploadedFiles),
		});

		console.log("Updated Paket Kemitraan:", paket_kemitraan);

		res.status(200).json({
			message: "Paket kemitraan berhasil diperbarui",
			body: { jenis_kemitraan, ukuran, harga, deskripsi },
			files: uploadedFiles,
		});
	} catch (error) {
		if (req.files) {
			deleteLocalFiles(req.files);
		}
		console.error("Error updating paket kemitraan:", error);
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

		try {
			// Parse image data
			const rawGambar = JSON.parse(paket_kemitraan.gambar || "[]");
			let imageUrls = [];

			// Handle different image data structures
			if (Array.isArray(rawGambar) && typeof rawGambar[0] === "object") {
				imageUrls = rawGambar.map((img) => img.path);
			} else if (typeof rawGambar === "string") {
				const innerJson = JSON.parse(rawGambar);
				imageUrls = innerJson.map((img) => img.path);
			} else if (Array.isArray(rawGambar)) {
				imageUrls = rawGambar;
			}

			// Extract public IDs from URLs
			const publicIds = imageUrls.map((url) => {
				const splitUrl = url.split("/");
				const filename = splitUrl[splitUrl.length - 1];
				return filename.split("?")[0]; // Remove query parameters
			});

			// Delete images from Cloudinary
			await Promise.all(
				publicIds.map(async (publicId) => {
					await cloudinary.uploader.destroy(publicId);
				})
			);
		} catch (cloudinaryError) {
			console.error("Error deleting from Cloudinary:", cloudinaryError);
		}

		// Delete database record
		await Paket_Kemitraan.destroy({ where: { id } });

		return res.status(204).end();
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllPaketKemitraan,
	getOnePaketKemitraan,
	createPaketKemitraan,
	updatePaketKemitraan,
	deletePaketKemitraan,
};
