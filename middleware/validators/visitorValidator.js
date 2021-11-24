const { check, validationResult } = require("express-validator");

module.exports = [
  check("name", "Please add a name").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("phone")
    .not()
    .isEmpty()
    .withMessage("Please include phone number")
    .bail()
    .isMobilePhone()
    .withMessage("Please add a valid a valid phone number")
    .bail()
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be 11 digits"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    next();
  },
];
