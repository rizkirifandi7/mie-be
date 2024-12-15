const { Kemitraan } = require("../models");

const getAllKemitraan = async (req, res) => {
	try {
		const kemitraan = await Kemitraan.findAll();
		res.status(200).json(kemitraan);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getOneKemitraan = async (req, res) => {
	try {
		const { id } = req.params;
		const kemitraan = await Kemitraan.findOne({ where: { id } });
		if (!kemitraan) {
			return res.status(404).json({ message: "Kemitraan not found" });
		}
		res.status(200).json(kemitraan);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createKemitraan = async (req, res) => {
	try {
		const {
			nama_lengkap,
			nik,
			jenis_kelamin,
			status_pernikahan,
			alamat_domisili,
			no_telepon,
			email,
			tempat_tanggal_lahir,
			jenis_kemitraan,
			lokasi_usaha,
			apakah_lokasi_usaha_tersedia,
			pengalaman_bisnis,
			modal,
			alasan,
		} = req.body;

		console.log(req.body);

		const kemitraan = await Kemitraan.create({
			nama_lengkap,
			nik,
			jenis_kelamin,
			status_pernikahan,
			alamat_domisili,
			no_telepon,
			email,
			tempat_tanggal_lahir,
			jenis_kemitraan,
			lokasi_usaha,
			apakah_lokasi_usaha_tersedia,
			pengalaman_bisnis,
			modal,
			alasan,
		});

		return res.status(201).json(kemitraan);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateKemitraan = async (req, res) => {
	try {
		const { id } = req.params;
		const {
			nama_lengkap,
			nik,
			jenis_kelamin,
			status_pernikahan,
			alamat_domisili,
			no_telepon,
			email,
			tempat_tanggal_lahir,
			jenis_kemitraan,
			lokasi_usaha,
			apakah_lokasi_usaha_tersedia,
			pengalaman_bisnis,
			modal,
			alasan,
		} = req.body;

		const kemitraan = await Kemitraan.findByPk(id);
		if (!kemitraan) {
			return res.status(404).json({ message: "Kemitraan not found" });
		}

		await kemitraan.update({
			nama_lengkap,
			nik,
			jenis_kelamin,
			status_pernikahan,
			alamat_domisili,
			no_telepon,
			email,
			tempat_tanggal_lahir,
			jenis_kemitraan,
			lokasi_usaha,
			apakah_lokasi_usaha_tersedia,
			pengalaman_bisnis,
			modal,
			alasan,
		});

		return res.status(200).json(kemitraan);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteKemitraan = async (req, res) => {
	try {
		const { id } = req.params;

		const kemitraan = await Kemitraan.findByPk(id);
		if (!kemitraan) {
			return res.status(404).json({ message: "Kemitraan not found" });
		}

		await kemitraan.destroy();

		return res.status(204).end();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllKemitraan,
	getOneKemitraan,
	createKemitraan,
	updateKemitraan,
	deleteKemitraan,
};
