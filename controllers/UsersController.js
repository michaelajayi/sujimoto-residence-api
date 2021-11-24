const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a user
exports.create = async (req, res) => {
  // Destructure fields from req.body
  let { name, email, password } = req.body;

  try {
    let user = await User.findOne({
      where: { email },
    });

    if (user) {
      return res.status(400).json({ msg: "User exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // Save user in db
    console.log(user);
    user = await User.create({ name, email, password });

    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    // Generate jwt token
    jwt.sign(
      payload,
      process.env.DB_HOST,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        return res.status(201).json({ token: token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Get all users
exports.findAll = async (req, res) => {
  try {
    // fetch all users from db
    const users = await User.findAll();

    // return response
    return res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Check if user exists in db
exports.userExists = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  return res.status(200).json(user);
};

// Get single user
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    // Check if user exists
    this.userExists(id);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Update user
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    // check if user exists
    this.userExists(id);

    await User.update(req.body, {
      where: { id },
    });

    const updatedUser = await User.findByPk(id);

    // return updated user
    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    // check if user exists
    this.userExists(id);

    // delete user from db
    await User.destroy({
      where: { id },
    });
    return res.status(200).json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};
