const route = require("express").Router();

const menuRoutes = require("./menu.routes");
const akunRoutes = require("./akun.routes");
const authRoutes = require("./auth.routes");
const cabangRoutes = require("./cabang.routes");
const kemitraanRoutes = require("./kemitraan.routes");
const paketRoutes = require("./paket.routes");

route.use("/", menuRoutes);
route.use("/", akunRoutes);
route.use("/", authRoutes);
route.use("/", cabangRoutes);
route.use("/", kemitraanRoutes);
route.use("/", paketRoutes);

module.exports = route;
