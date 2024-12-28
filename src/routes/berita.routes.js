const router = require("express").Router();

const {
	getAllBerita,
	getBeritaById,
	createBerita,
	updateBerita,
	deleteBerita,
} = require("../controllers/berita.controller");
const upload = require("../middleware/multer");

router.get("/", getAllBerita);
router.get("/:id", getBeritaById);
router.post("/", upload.single("gambar"), createBerita);
router.put("/:id", upload.single("gambar"), updateBerita);
router.delete("/:id", deleteBerita);

module.exports = router;
