const { Akun } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const SignIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const admin = await Akun.findOne({
			where: { email: email },
		});

		if (!admin) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		const passwordMatch = await bcrypt.compare(password, admin.password);

		if (!passwordMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		const token = jwt.sign(
			{
				id: admin.id,
				nama: admin.nama,
				email: admin.email,
				role: admin.role,
			},
			process.env.JWT_KEY,
			{ expiresIn: "12h" }
		);
		const role = admin.role;
		res.status(200).json({ token, role, message: "success" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

const SignUp = async (req, res) => {
	try {
		const { email } = req.body;

		if (await Akun.findOne({ where: { email } })) {
			return res.status(400).json({ message: "Email already exists" });
		}

		const akun = await Akun.create(req.body);
		if (!akun) {
			return res.status(400).json({ message: "Failed to create account" });
		}
		res.status(201).json(akun);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const SignOut = async (req, res) => {
	try {
		res
			.status(200)
			.json({ message: "Logout successful", success: true, code: 200 });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal Server Error" });
	}
};

module.exports = { SignIn, SignUp, SignOut };
