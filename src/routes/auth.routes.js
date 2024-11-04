const route = require("express").Router();

const { SignIn, SignUp, SignOut } = require("../controllers/auth.controller");

route.post("/signin", SignIn);
route.post("/signup", SignUp);
route.post("/signout", SignOut);

module.exports = route;
