const route = require("express").Router();

const {
	getAllAkuns,
	getOneAkun,
	createAkun,
	updateAkun,
	deleteAkun,
} = require("../controllers/akun.controller");

route.get("/akuns", getAllAkuns);
route.get("/akun/:id", getOneAkun);
route.post("/akun", createAkun);
route.put("/akun/:id", updateAkun);
route.delete("/akun/:id", deleteAkun);

module.exports = route;
