const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../models");

// Get currently logged in user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};

// Log in user
exports.login = async (req, res) => {
  // Destructure fields from request body
  const { email, password } = req.body;

  try {
    // check if user exists
    let user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // generate token
    const payload = {
      user: {
        id: user.id,
        email,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        return res.status(200).json({ token: token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
};
