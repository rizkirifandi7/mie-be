const route = require("express").Router();
const {
	getAllKemitraan,
	getOneKemitraan,
	createKemitraan,
	updateKemitraan,
	deleteKemitraan,
} = require("../controllers/kemitraan.controller");

route.get("/kemitraans", getAllKemitraan);
route.get("/kemitraan/:id", getOneKemitraan);
route.post("/kemitraan", createKemitraan);
route.put("/kemitraan/:id", updateKemitraan);
route.delete("/kemitraan/:id", deleteKemitraan);

module.exports = route;
