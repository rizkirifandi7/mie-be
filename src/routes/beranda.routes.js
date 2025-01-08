const router = require("express").Router();

const {
	getAllBeranda,
	getBerandaById,
	createBeranda,
	updateBeranda,
	deleteBeranda,
} = require("../controllers/beranda.controller");

const upload = require("../middleware/multer");

router.get("/", getAllBeranda);
router.get("/:id", getBerandaById);
router.post(
	"/",
	upload.fields([{ name: "background", maxCount: 1 }]),
	createBeranda
);
router.put(
	"/:id",
	upload.fields([
		{ name: "gambar", maxCount: 1 },
		{ name: "background", maxCount: 1 },
	]),
	updateBeranda
);
router.delete("/:id", deleteBeranda);

module.exports = router;
