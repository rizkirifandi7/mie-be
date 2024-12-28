const route = require("express").Router();
const {
	getAllPaketKemitraan,
	getOnePaketKemitraan,
	createPaketKemitraan,
	updatePaketKemitraan,
	deletePaketKemitraan,
} = require("../controllers/paket-kemitraan.controller");
const upload = require("../middleware/multer");

route.get("/", getAllPaketKemitraan);
route.get("/:id", getOnePaketKemitraan);
route.post("/", upload.array("gambar", 10), createPaketKemitraan);
route.put("/:id", upload.array("gambar", 10), updatePaketKemitraan);
route.delete("/:id", deletePaketKemitraan);

module.exports = route;
