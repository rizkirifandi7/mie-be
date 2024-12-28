const route = require("express").Router();

const {
  getAllCabangs,
	getOneCabang,
	createCabang,
	updateCabang,
	deleteCabang,
} = require("../controllers/cabang.controller");

route.get("/", getAllCabangs);
route.get("/:id", getOneCabang);
route.post("/", createCabang);
route.put("/:id", updateCabang);
route.delete("/:id", deleteCabang);

module.exports = route;