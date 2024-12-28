const route = require("express").Router();

const {
	getAllAkuns,
	getOneAkun,
	createAkun,
	updateAkun,
	deleteAkun,
} = require("../controllers/akun.controller");

route.get("/", getAllAkuns);
route.get("/:id", getOneAkun);
route.post("/", createAkun);
route.put("/:id", updateAkun);
route.delete("/:id", deleteAkun);

module.exports = route;
