const route = require("express").Router();
const {
	getAllKemitraan,
	getOneKemitraan,
	createKemitraan,
	updateKemitraan,
	deleteKemitraan,
} = require("../controllers/kemitraan.controller");

route.get("/", getAllKemitraan);
route.get("/:id", getOneKemitraan);
route.post("/", createKemitraan);
route.put("/:id", updateKemitraan);
route.delete("/:id", deleteKemitraan);

module.exports = route;
