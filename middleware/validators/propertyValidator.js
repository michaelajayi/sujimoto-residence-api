const { check, validationResult } = require("express-validator");

module.exports = [
  check("title", "Please include a title").not().isEmpty(),
  check("price", "Please include a valid amount").isDecimal(),
  check("description", "Please add a description").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    next();
  },
];
