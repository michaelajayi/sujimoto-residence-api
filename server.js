const express = require("express");
const cors = require("cors");
const db = require("./models");
const expressValidator = require("express-validator");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "http://localhost:5000",
};

app.use(cors(corsOptions));

// use Express Validator
// app.use(expressValidator());

// Create Database Tables
db.sequelize.sync();

// Parse JSON requests
app.use(express.json({ extended: false }));

// Parse x-www-form-urlencoded requests
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to Sujmoto Properties API..." })
);

// Define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/visitors", require("./routes/visitors"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/amenities", require("./routes/amenities"));
app.use("/api/properties", require("./routes/properties"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
