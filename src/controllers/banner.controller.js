const { Banner } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

const getAllBanners = async (req, res) => {
	try {
		const banners = await Banner.findAll();
		res.status(200).json({
			status: "success",
			message: "Data berhasil ditampilkan",
			data: banners,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getBannerById = async (req, res) => {
	try {
		const { id } = req.params;
		const banner = await Banner.findOne({ where: { id } });

		if (!banner) {
			return res.status(404).json({ message: "Banner tidak ditemukan" });
		}

		res.status(200).json({
			status: "success",
			message: "Data berhasil ditampilkan",
			data: banner,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createBanner = async (req, res) => {
	try {
		const { judul, deskripsi, link } = req.body;
		const filePath = req.file.path;

		const result = await cloudinary.uploader.upload(filePath);

		const gambar = result.secure_url;

		const banner = await Banner.create({
			judul,
			gambar,
			link,
			deskripsi,
		});

		fs.unlinkSync(filePath);

		return res.status(201).json(banner);
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: error.message });
		console.error(error);
	}
};

const updateBanner = async (req, res) => {
	try {
		const { id } = req.params;
		const { judul, link, deskripsi } = req.body;
		const banner = await Banner.findOne({ where: { id } });

		if (!banner) {
			return res.status(404).json({ message: "Banner tidak ditemukan" });
		}

		const updates = { judul, link, deskripsi };

		if (req.file) {
			const uploadResult = await cloudinary.uploader.upload(req.file.path);

			if (banner.gambar) {
				const publicId = banner.gambar.split("/").pop().split(".")[0];
				await cloudinary.uploader.destroy(publicId);
			}

			updates.gambar = uploadResult.secure_url;

			fs.unlink(req.file.path, (err) => {
				if (err) {
					console.error("Failed to delete local file:", err);
				}
			});
		}

		await banner.update(updates);

		res.status(200).json({
			status: "success",
			message: "Banner berhasil diperbarui",
			data: banner,
		});
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

const deleteBanner = async (req, res) => {
	try {
		const { id } = req.params;
		const banner = await Banner.findOne({ where: { id } });

		if (!banner) {
			return res.status(404).json({ message: "Banner tidak ditemukan" });
		}

		// Delete image from Cloudinary
		if (banner.gambar) {
			const publicId = banner.gambar.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(publicId);
		}

		// Delete from database
		await banner.destroy();

		res.status(200).json({
			status: "success",
			message: "Banner berhasil dihapus",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllBanners,
	getBannerById,
	createBanner,
	updateBanner,
	deleteBanner,
};
