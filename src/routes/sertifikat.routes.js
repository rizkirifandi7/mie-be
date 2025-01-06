const router = require("express").Router();

const {
	getAllSertifikat,
	getOneSertifikat,
	createSertifikat,
	updateSertifikat,
	deleteSertifikat,
} = require("../controllers/sertifikat.controller");
const upload = require("../middleware/multer");

router.get("/", getAllSertifikat);
router.get("/:id", getOneSertifikat);
router.post("/", upload.single("gambar"), createSertifikat);
router.put("/:id", upload.single("gambar"), updateSertifikat);
router.delete("/:id", deleteSertifikat);

module.exports = router;
