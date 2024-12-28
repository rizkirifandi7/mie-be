const router = require("express").Router();

const {
	getAllMediaSosial,
	getMediaSosialById,
	createMediaSosial,
	updateMediaSosial,
	deleteMediaSosial,
} = require("../controllers/media-sosial.controller");

router.get("/", getAllMediaSosial);
router.get("/:id", getMediaSosialById);
router.post("/", createMediaSosial);
router.put("/:id", updateMediaSosial);
router.delete("/:id", deleteMediaSosial);

module.exports = router;
