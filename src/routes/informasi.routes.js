const router = require("express").Router();

const {
	getAllInformasi,
	getInformasiById,
	createInformasi,
	updateInformasi,
	deleteInformasi,
} = require("../controllers/informasi.controller");
const upload = require("../middleware/multer");

router.get("/", getAllInformasi);
router.get("/:id", getInformasiById);
router.post("/", upload.single("gambar"), createInformasi);
router.put("/:id", upload.single("gambar"), updateInformasi);
router.delete("/:id", deleteInformasi);

module.exports = router;
