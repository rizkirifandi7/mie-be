const { Feedback } = require("../models");

const getAllFeedback = async (req, res) => {
	try {
		const feedback = await Feedback.findAll();
		return res.status(200).json({
			status: "success",
			feedback,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const getFeedbackById = async (req, res) => {
	const { id } = req.params;
	try {
		const feedback = await Feedback.findByPk(id);
		if (!feedback) {
			return res.status(404).json({
				status: "error",
				message: "Feedback not found",
			});
		}

		return res.status(200).json({
			status: "success",
			feedback,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const createFeedback = async (req, res) => {
	const { nama, nomor_telepon, kritik, saran } = req.body;
	try {
		const feedback = await Feedback.create({
			nama,
			nomor_telepon,
			kritik,
			saran,
		});
		return res.status(201).json({
			status: "success",
			feedback,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const updateFeedback = async (req, res) => {
	const { id } = req.params;
	const { nama, nomor_telepon, kritik, saran } = req.body;
	try {
		const feedback = await Feedback.findByPk(id);
		if (!feedback) {
			return res.status(404).json({
				status: "error",
				message: "Feedback not found",
			});
		}

		feedback.nama = nama;
		feedback.nomor_telepon = nomor_telepon;
		feedback.kritik = kritik;
		feedback.saran = saran;
		await feedback.save();

		return res.status(200).json({
			status: "success",
			feedback,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const deleteFeedback = async (req, res) => {
	const { id } = req.params;
	try {
		const feedback = await Feedback.findByPk(id);
		if (!feedback) {
			return res.status(404).json({
				status: "error",
				message: "Feedback not found",
			});
		}

		await feedback.destroy();

		return res.status(200).json({
			status: "success",
			message: "Feedback deleted",
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

module.exports = {
	getAllFeedback,
	getFeedbackById,
	createFeedback,
	updateFeedback,
	deleteFeedback,
};
