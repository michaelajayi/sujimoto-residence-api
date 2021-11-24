const express = require("express");
const router = express.Router();
const userValidator = require("../middleware/validators/userValidator");
const auth = require('../middleware/auth');

const { login, getCurrentUser } = require("../controllers/AuthController");

router.post("/", login);

router.get("/", auth, getCurrentUser);

module.exports = router;
