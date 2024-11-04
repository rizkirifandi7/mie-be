const route = require("express").Router();

const menuRoutes = require("./menu.routes");
const akunRoutes = require("./akun.routes");
const authRoutes = require("./auth.routes");

route.use("/", menuRoutes);
route.use("/", akunRoutes);
route.use("/", authRoutes);

module.exports = route;
