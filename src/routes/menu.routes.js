const route = require("express").Router();
const path = require("path");
const {
	getAllMenus,
	getOneMenu,
	createMenu,
	updateMenu,
	deleteMenu,
} = require("../controllers/menu.controller");
const upload = require("../middleware/multer");

route.get("/", getAllMenus);
route.get("/:id", getOneMenu);
route.post("/", upload.single("gambar"), createMenu);
route.put("/:id", upload.single("gambar"), updateMenu);
route.delete("/:id", deleteMenu);
route.get("/view/:filename", (req, res) => {
	res.sendFile(path.join(__dirname, "../../", "uploads", req.params.filename));
});

module.exports = route;
