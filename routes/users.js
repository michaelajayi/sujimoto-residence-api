const express = require("express");
const router = express.Router();
const userValidator = require("../middleware/validators/userValidator");

const {
  create,
  findOne,
  findAll,
  update,
  deleteUser,
} = require("../controllers/UsersController");

// Regiser a user
router.post("/", userValidator, create);

// Get all users
router.get("/", findAll);

// Get one user
router.get("/:id", findOne);

// Update user
router.put("/:id", update);

// Delete a user
router.delete("/:id", deleteUser);

module.exports = router;
