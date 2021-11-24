const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const contactValidator = require("../middleware/validators/contactValidator");

const {
  create,
  findAll,
  findOne,
  update,
  deleteContact,
} = require("../controllers/ContactsController");

// Add a contact
router.post("/", [auth, contactValidator], create);

// Get all contacts
router.get("/", auth, findAll);

// Get a contact
router.get("/:id", auth, findOne);

// Update a contact
router.put("/:id", auth, update);

// Delete a contact
router.delete("/:id", auth, deleteContact);

module.exports = router;
