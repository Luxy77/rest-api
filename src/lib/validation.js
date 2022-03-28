const { check, validationResult } = require('express-validator');

validate = {};

validate.register = [
  check('fullname')
  .exists()
  .not()
  .isEmpty()
  .not()
  .isNumeric()
  .isLength({min: 10})
  .withMessage('Name is required'),
  check('username')
  .not()
  .isEmpty()
  .isLength({min:3})
  .withMessage('Your password must have at least 8 carachters')
  ,check('password')
  .not()
  .isEmpty()
  .isLength({min:8}),(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

validate.login = [
  check('username')
  .not()
  .isEmpty()
  .not()
  .isNumeric()
  .withMessage('Invalid username'),
  check('password')
  .not()
  .isEmpty()
  .isLength({min:8}),(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];

module.exports = validate; 