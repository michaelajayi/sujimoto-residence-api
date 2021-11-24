const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const visitorValidator = require("../middleware/validators/visitorValidator");

const {
  create,
  findAll,
  deleteVisitor,
} = require("../controllers/VisitorsController");

// Register a visitor
router.post("/", visitorValidator, create);

// Get all visitors
router.get("/", auth, findAll);

// Delete a visitor
router.delete("/:id", auth, deleteVisitor);

module.exports = router;
