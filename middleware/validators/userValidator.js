const { check, validationResult } = require("express-validator");

module.exports = [
  check("email", "Please include a valid email").isEmail(),
  check("name", "Please include a name").not().isEmpty(),
  check("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Enter a min of 6 characters"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    next();
  },
];
