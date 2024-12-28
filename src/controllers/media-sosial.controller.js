const { Media_Sosial } = require("../models");

const getAllMediaSosial = async (req, res) => {
	try {
		const mediaSosial = await Media_Sosial.findAll();
		return res.status(200).json({
			status: "success",
			mediaSosial,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const getMediaSosialById = async (req, res) => {
	const { id } = req.params;
	try {
		const mediaSosial = await Media_Sosial.findByPk(id);
		if (!mediaSosial) {
			return res.status(404).json({
				status: "error",
				message: "Media sosial not found",
			});
		}

		return res.status(200).json({
			status: "success",
			mediaSosial,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const createMediaSosial = async (req, res) => {
	const { nama, link } = req.body;
	try {
		const mediaSosial = await Media_Sosial.create({ nama, link });
		return res.status(201).json({
			status: "success",
			mediaSosial,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const updateMediaSosial = async (req, res) => {
	const { id } = req.params;
	const { nama, link } = req.body;
	try {
		const mediaSosial = await Media_Sosial.findByPk(id);
		if (!mediaSosial) {
			return res.status(404).json({
				status: "error",
				message: "Media sosial not found",
			});
		}

		await mediaSosial.update({ nama, link });

		return res.status(200).json({
			status: "success",
			mediaSosial,
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

const deleteMediaSosial = async (req, res) => {
	const { id } = req.params;
	try {
		const mediaSosial = await Media_Sosial.findByPk(id);
		if (!mediaSosial) {
			return res.status(404).json({
				status: "error",
				message: "Media sosial not found",
			});
		}

		await mediaSosial.destroy();

		return res.status(200).json({
			status: "success",
			message: "Media sosial deleted",
		});
	} catch (error) {
		return res.status(500).json({
			status: "error",
			message: error.message,
		});
	}
};

module.exports = {
	getAllMediaSosial,
	getMediaSosialById,
	createMediaSosial,
	updateMediaSosial,
	deleteMediaSosial,
};
