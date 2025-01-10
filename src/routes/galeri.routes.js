const router = require("express").Router();

const {
	getAllGaleri,
	getGaleriById,
	createGaleri,
	updateGaleri,
	deleteGaleri,
} = require("../controllers/galeri.controller");
const upload = require("../middleware/multer");

router.get("/", getAllGaleri);
router.get("/:id", getGaleriById);
router.post("/", upload.array("gambar"), createGaleri);
router.put("/:id", upload.array("gambar"), updateGaleri);
router.delete("/:id", deleteGaleri);

module.exports = router;
