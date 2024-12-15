const route = require("express").Router();

const {
  getAllCabangs,
	getOneCabang,
	createCabang,
	updateCabang,
	deleteCabang,
} = require("../controllers/cabang.controller");

route.get("/cabangs", getAllCabangs);
route.get("/cabang/:id", getOneCabang);
route.post("/cabang", createCabang);
route.put("/cabang/:id", updateCabang);
route.delete("/cabang/:id", deleteCabang);

module.exports = route;