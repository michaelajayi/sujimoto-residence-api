const { Visitor } = require("../models");

// @route           // POST /api/visitors
// @sdesc           // create a visitor
// @access          // Public
exports.create = async (req, res) => {
  // Destructure fields from request body
  const { name, email, phone } = req.body;

  try {
    // check if visitor exists in db
    let visitor = await Visitor.findOne({
      where: { email },
    });

    if (visitor) {
      return res.status(400).json({ msg: "Visitor profile exists" });
    }

    // save visitor in db
    visitor = await Visitor.create({ name, email, phone });

    // return response
    return res.status(200).json(visitor);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// @route           // GET /api/visitors
// @desc            // Get all visitors
// @access          // Private
exports.findAll = async (req, res) => {
  try {
    // fetch all visitors from db
    const visitors = await Visitor.findAll();

    // return response
    return res.status(200).json(visitors);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// @route           // DELETE /api/visitors
// @desc            // Delete a visitor
// @access          // Private
exports.deleteVisitor = async (req, res) => {
  // Get visitor id from query params
  const id = req.params.id;
  try {
    // check if visitor exists in db
    const visitor = await Visitor.findByPk(id);

    if (!visitor) {
      return res.status(404).json({ msg: "User not found" });
    }

    await Visitor.destroy({
      where: { id },
    });
    return res.status(200).json({ msg: "Visitor deleted..." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};
