const { Galeri } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

// Helper functions
const uploadFilesToCloudinary = async (files) => {
	return await Promise.all(
		files.map(async (file) => {
			try {
				const result = await cloudinary.uploader.upload(file.path);
				const autoCropUrl = cloudinary.url(result.public_id, {
					crop: "auto",
					gravity: "auto",
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

const getAllGaleri = async (req, res) => {
	try {
		const galeriList = await Galeri.findAll();
		const formattedGaleri = galeriList.map((galeri) => {
			let formattedGambar;

			if (!galeri.gambar) {
				formattedGambar = [];
			} else if (galeri.gambar.startsWith("[")) {
				// Handle JSON array of images
				const parsedGambar = JSON.parse(galeri.gambar);
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
						filename: galeri.gambar.split("/").pop(),
						path: galeri.gambar,
					},
				];
			}

			return {
				id: galeri.id,
				judul: galeri.judul,
				deskripsi: galeri.deskripsi,
				gambar: formattedGambar,
				createdAt: galeri.createdAt,
				updatedAt: galeri.updatedAt,
			};
		});

		return res.status(200).json({
			message: "Galeri retrieved successfully",
			data: formattedGaleri,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const getGaleriById = async (req, res) => {
	try {
		const { id } = req.params;
		const galeri = await Galeri.findByPk(id);

		if (!galeri) {
			return res.status(404).json({ message: "Galeri not found" });
		}

		const formattedGaleri = {
			id: galeri.id,
			judul: galeri.judul,
			deskripsi: galeri.deskripsi,
			gambar: JSON.parse(galeri.gambar || "[]"),
			createdAt: galeri.createdAt,
			updatedAt: galeri.updatedAt,
		};

		return res.status(200).json({
			message: "Galeri retrieved successfully",
			data: formattedGaleri,
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

// Controller methods
const createGaleri = async (req, res) => {
	try {
		const { judul, deskripsi } = req.body;
		const files = req.files;

		if (!judul || !deskripsi || !files || files.length === 0) {
			return res
				.status(400)
				.json({ message: "All fields and files are required" });
		}

		const uploadedFiles = await uploadFilesToCloudinary(files);
		const galeri = await Galeri.create({
			judul,
			deskripsi,
			gambar: JSON.stringify(uploadedFiles),
		});

		deleteLocalFiles(files);

		return res.status(201).json({
			message: "Galeri created successfully",
			data: {
				...galeri.toJSON(),
				gambar: uploadedFiles,
			},
		});
	} catch (error) {
		if (req.files) {
			deleteLocalFiles(req.files);
		}
		return res.status(500).json({ message: error.message });
	}
};

const updateGaleri = async (req, res) => {
	try {
		const { id } = req.params;
		const { judul, deskripsi } = req.body;

		const galeri = await Galeri.findByPk(id);
		if (!galeri) {
			return res.status(404).json({ message: "Galeri not found" });
		}

		let uploadedFiles = JSON.parse(galeri.gambar || "[]");
		if (req.files && req.files.length > 0) {
			const newUploadedFiles = await uploadFilesToCloudinary(req.files);
			uploadedFiles = newUploadedFiles;
			deleteLocalFiles(req.files);
			await deleteCloudinaryImages(JSON.parse(galeri.gambar || "[]"));
		}

		await galeri.update({
			judul,
			deskripsi,
			gambar: JSON.stringify(uploadedFiles),
		});

		return res.status(200).json({
			message: "Galeri updated successfully",
			data: {
				...galeri.toJSON(),
				gambar: uploadedFiles,
			},
		});
	} catch (error) {
		if (req.files) {
			deleteLocalFiles(req.files);
		}
		return res.status(500).json({ message: error.message });
	}
};

const deleteGaleri = async (req, res) => {
	try {
		const { id } = req.params;
		const galeri = await Galeri.findByPk(id);

		if (!galeri) {
			return res.status(404).json({ message: "Galeri not found" });
		}

		const gambar = JSON.parse(galeri.gambar || "[]");
		await Galeri.destroy({ where: { id } });
		await deleteCloudinaryImages(gambar);

		return res.status(204).end();
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
