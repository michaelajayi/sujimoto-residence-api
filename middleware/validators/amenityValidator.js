const { check, validationResult } = require("express-validator");

module.exports = [
  check("type", "Please include a valid type").isIn(["free", "paid"]),
  check("description", "Please add a description").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    next();
  },
];
