const router = require("express").Router();

const {
	getAllBanners,
	getBannerById,
	createBanner,
	updateBanner,
	deleteBanner,
} = require("../controllers/banner.controller");

const upload = require("../middleware/multer");

router.get("/", getAllBanners);
router.get("/:id", getBannerById);
router.post("/", upload.single("gambar"), createBanner);
router.put("/:id", upload.single("gambar"), updateBanner);
router.delete("/:id", deleteBanner);

module.exports = router;
