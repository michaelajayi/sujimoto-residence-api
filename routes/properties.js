const express = require("express");
const router = express.Router();
const propertyValidator = require("../middleware/validators/propertyValidator");
const auth = require("../middleware/auth");

const {
  create,
  findAll,
  update,
  deleteProperty,
} = require("../controllers/PropertiesController");

// Add a property
router.post("/", [auth, propertyValidator], create);

// Get all properties
router.get("/", findAll);

// Update property
router.put("/:id", auth, update);

// Delete a property
router.delete("/:id", auth, deleteProperty);

module.exports = router;
