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

route.get("/menus", getAllMenus);
route.get("/menu/:id", getOneMenu);
route.post("/menu", upload.single("gambar"), createMenu);
route.put("/menu/:id", upload.single("gambar"), updateMenu);
route.delete("/menu/:id", deleteMenu);
route.get("/view/:filename", (req, res) => {
	res.sendFile(path.join(__dirname, "../../", "uploads", req.params.filename));
});

module.exports = route;
