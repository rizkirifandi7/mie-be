const route = require("express").Router();
const {
	getAllPaketKemitraan,
	getOnePaketKemitraan,
	createPaketKemitraan,
	updatePaketKemitraan,
	deletePaketKemitraan,
} = require("../controllers/paket-kemitraan.controller");
const upload = require("../middleware/multer");

route.get("/paket-kemitraans", getAllPaketKemitraan);
route.get("/paket-kemitraan/:id", getOnePaketKemitraan);
route.post("/paket-kemitraan", upload.single("gambar"), createPaketKemitraan);
route.put(
	"/paket-kemitraan/:id",
	upload.single("gambar"),
	updatePaketKemitraan
);
route.delete("/paket-kemitraan/:id", deletePaketKemitraan);

module.exports = route;
