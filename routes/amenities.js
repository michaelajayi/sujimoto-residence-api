const express = require("express");
const router = express.Router();
const amenityValidator = require("../middleware/validators/amenityValidator");
const auth = require("../middleware/auth");

const {
  create,
  findAll,
  update,
  deleteAmenity,
} = require("../controllers/AmenitiesController");

// Add an amenity
router.post("/", [auth, amenityValidator], create);

// Get all amenities
router.get("/", auth, findAll);

// Update amenity
router.put("/:id", auth, update);

// Delete an amenity
router.delete("/:id", auth, deleteAmenity);

module.exports = router;
