const { Amenity } = require("../models");

// Create a amenity
exports.create = async (req, res) => {
  const { description, type } = req.body;

  try {
    // check if amenity exists
    let amenity = await Amenity.findOne({
      where: { description },
    });

    if (amenity) {
      return res.status(400).json({ msg: "Amenity exists" });
    }

    amenity = {
      description,
      type,
    };

    // save amenity in db
    amenity = await Amenity.create(amenity);
    return res.status(201).json(amenity);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Get all amenities
exports.findAll = async (req, res) => {
  try {
    const amenities = await Amenity.findAll();

    return res.status(200).json(amenities);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Update amenity
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    // check if amenity exists
    let amenity = await Amenity.findByPk(id);

    if (!amenity) {
      return res.status(404).json({ msg: "amenity not found" });
    }

    await Amenity.update(req.body, {
      where: { id },
    });

    const updatedamenity = await Amenity.findByPk(id);
    return res.status(200).json(updatedamenity);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Delete a amenity
exports.deleteAmenity = async (req, res) => {
  const id = req.params.id;

  try {
    // check if amenity exists
    const amenity = await Amenity.findByPk(id);

    if (!amenity) {
      return res.status(404).json({ msg: "amenity not found" });
    }

    await Amenity.destroy({
      where: { id },
    });

    return res.status(200).json({ msg: "amenity deleted..." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};
