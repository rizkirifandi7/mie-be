const router = require("express").Router();

const {
	getAllTestimoni,
	getOneTestimoni,
	createTestimoni,
	updateTestimoni,
	deleteTestimoni,
} = require("../controllers/testimoni.controller");
const upload = require("../middleware/multer");

router.get("/", getAllTestimoni);
router.get("/:id", getOneTestimoni);
router.post("/", upload.single("foto"), createTestimoni);
router.put("/:id", upload.single("foto"), updateTestimoni);
router.delete("/:id", deleteTestimoni);

module.exports = router;
