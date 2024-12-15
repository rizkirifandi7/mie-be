const { Cabang } = require("../models");

const getAllCabangs = async (req, res) => {
	try {
		const cabangs = await Cabang.findAll();
		res.status(200).json(cabangs);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getOneCabang = async (req, res) => {
	try {
		const { id } = req.params;
		const cabang = await Cabang.findOne({ where: { id } });
		if (!cabang) {
			return res.status(404).json({ message: "Cabang not found" });
		}
		res.status(200).json(cabang);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createCabang = async (req, res) => {
	try {
		const cabang = await Cabang.create(req.body);
		res.status(201).json(cabang);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateCabang = async (req, res) => {
	try {
		const { id } = req.params;
		const updated = await Cabang.update(req.body, { where: { id } });
		if (!updated) {
			return res.status(404).json({ message: "Cabang not found" });
		}
		const updatedCabang = await Cabang.findOne({ where: { id } });
		res.status(200).json(updatedCabang);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const deleteCabang = async (req, res) => {
	try {
		const { id } = req.params;
		const deleted = await Cabang.destroy({ where: { id } });
		if (!deleted) {
			return res.status(404).json({ message: "Cabang not found" });
		}
		res.status(204).json();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	getAllCabangs,
	getOneCabang,
	createCabang,
	updateCabang,
	deleteCabang,
};
