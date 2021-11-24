const { Property } = require("../models");

// Create a property
exports.create = async (req, res) => {
  const { title, price, description, location } = req.body;

  try {
    // save property in db
    const property = await Property.create({
      title,
      price,
      description,
      location,
    });
    return res.status(201).json(property);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Get all properties
exports.findAll = async (req, res) => {
  try {
    const properties = await Property.findAll();

    return res.status(200).json(properties);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Update property
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    // check if property exists
    let property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    await Property.update(req.body, {
      where: { id },
    });

    const updatedProperty = await Property.findByPk(id);
    return res.status(200).json(updatedProperty);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Delete a property
exports.deleteProperty = async (req, res) => {
  const id = req.params.id;

  try {
    // check if property exists
    const property = await Property.findByPk(id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    await Property.destroy({
      where: { id },
    });

    return res.status(200).json({ msg: "Property deleted..." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};
