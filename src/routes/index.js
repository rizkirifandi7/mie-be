const route = require("express").Router();

const menuRoutes = require("./menu.routes");
const akunRoutes = require("./akun.routes");
const authRoutes = require("./auth.routes");
const cabangRoutes = require("./cabang.routes");
const kemitraanRoutes = require("./kemitraan.routes");
const paketRoutes = require("./paket.routes");
const feedbackRoutes = require("./feedback.routes");
const mediaRoutes = require("./media-sosial.routes");
const galeriRoutes = require("./galeri.routes");
const beritaRoutes = require("./berita.routes");
const informasiRoutes = require("./informasi.routes");
const sertifikatRoutes = require("./sertifikat.routes");

route.use("/menu", menuRoutes);
route.use("/akun", akunRoutes);
route.use("/", authRoutes);
route.use("/cabang", cabangRoutes);
route.use("/kemitraan", kemitraanRoutes);
route.use("/paket-kemitraan", paketRoutes);
route.use("/feedback", feedbackRoutes);
route.use("/media-sosial", mediaRoutes);
route.use("/galeri", galeriRoutes);
route.use("/berita", beritaRoutes);
route.use("/informasi", informasiRoutes);
route.use("/sertifikat", sertifikatRoutes);

module.exports = route;
