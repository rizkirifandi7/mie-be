const { Testimoni } = require("../models");
const fs = require("fs");
const cloudinary = require("../middleware/cloudinary");

const getAllTestimoni = async (req, res) => {
	try {
		const testimoni = await Testimoni.findAll();
		res.status(200).json({
			status: "success",
			data: testimoni,
			message: "Data berhasil diambil",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getOneTestimoni = async (req, res) => {
	try {
		const { id } = req.params;
		const testimoni = await Testimoni.findOne({ where: { id } });
		if (!testimoni) {
			return res.status(404).json({ message: "Testimoni not found" });
		}
		res.status(200).json({
			status: "success",
			data: testimoni,
			message: "Data berhasil diambil",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createTestimoni = async (req, res) => {
	try {
		const { nama, profesi, testimoni, status } = req.body;

		let foto = null;
		if (req.file) {
			const filePath = req.file.path;
			const uploadResult = await cloudinary.uploader.upload(filePath);
			foto = cloudinary.url(uploadResult.public_id, {
				fetch_format: "auto",
				quality: "auto",
				crop: "auto",
				gravity: "auto",
				width: 500,
				height: 500,
			});
			fs.unlinkSync(filePath);
		}

		const data = await Testimoni.create({
			nama,
			profesi: profesi || "Mitra Demiehan",
			testimoni,
			status: status || "hide",
			foto,
		});

		return res.status(201).json({
			status: "success",
			data: data,
			message: "Data berhasil ditambahkan",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateTestimoni = async (req, res) => {
	try {
		const { id } = req.params;
		const { nama, profesi, testimoni, status } = req.body;
		let gambar;

		const testimoniData = await Testimoni.findByPk(id);
		if (!testimoniData) {
			return res.status(404).json({ message: "Testimoni not found" });
		}

		if (req.file) {
			const filePath = req.file.path;

			const uploadResult = await cloudinary.uploader.upload(filePath);

			gambar = cloudinary.url(uploadResult.public_id, {
				fetch_format: "auto",
				quality: "auto",
				crop: "auto",
				gravity: "auto",
				width: 500,
				height: 500,
			});

			if (testimoniData.foto) {
				const oldPublicId = testimoniData.foto
					.split("/")
					.pop()
					.split("?")[0]
					.split(".")[0];
				await cloudinary.uploader.destroy(oldPublicId);
			}

			fs.unlinkSync(filePath);
		} else {
			gambar = testimoniData.foto;
		}

		await Testimoni.update(
			{
				nama,
				profesi,
				testimoni,
				status,
				foto: gambar,
			},
			{
				where: { id },
			}
		);

		const updatedTestimoni = await Testimoni.findByPk(id);
		res.status(200).json({ updatedTestimoni, message: "Testimoni updated" });
	} catch (error) {
		if (req.file) {
			fs.unlinkSync(req.file.path);
		}
		res.status(500).json({ message: error.message });
	}
};

const deleteTestimoni = async (req, res) => {
	try {
		const { id } = req.params;
		const testimoni = await Testimoni.findByPk(id);
		if (!testimoni) {
			return res.status(404).json({ message: "Testimoni not found" });
		}

		const foto = testimoni.foto;
		const deleted = await Testimoni.destroy({ where: { id } });
		if (!deleted) {
			return res.status(404).json({ message: "Testimoni not found" });
		}
		if (foto) {
			const publicId = foto.split("/").pop().split("?")[0].split(".")[0];
			await cloudinary.uploader.destroy(publicId);
		}

		res.status(204).json({ message: "Data deleted" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllTestimoni,
	getOneTestimoni,
	createTestimoni,
	updateTestimoni,
	deleteTestimoni,
};
