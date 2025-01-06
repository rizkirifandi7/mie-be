const { Akun } = require("../models");
const bcrypt = require("bcrypt");

const getAllAkuns = async (req, res) => {
	try {
		const akuns = await Akun.findAll();
		res.status(200).json(akuns);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getOneAkun = async (req, res) => {
	try {
		const { id } = req.params;
		const akun = await Akun.findOne({ where: { id } });
		if (!akun) {
			return res.status(404).json({ message: "Akun not found" });
		}
		res.status(200).json(akun);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createAkun = async (req, res) => {
	try {
		const akun = await Akun.create(req.body);
		res.status(201).json(akun);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateAkun = async (req, res) => {
	const { id } = req.params;
	const { nama, password, email, role } = req.body;
	try {
		const akun = await Akun.findByPk(id);
		if (!akun) {
			return res.status(404).json({ message: "Akun not found" });
		}

		await akun.update({
			nama,
			password: await bcrypt.hash(password, 10),
			email,
			role,
		});

		res.status(200).json(akun);
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

const deleteAkun = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await Akun.destroy({ where: { id } });
		if (!deleted) {
			return res.status(404).json({ message: "Akun not found" });
		}
		res.status(204).json();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllAkuns,
	getOneAkun,
	createAkun,
	updateAkun,
	deleteAkun,
};
