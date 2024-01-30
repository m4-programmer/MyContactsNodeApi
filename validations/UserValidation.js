const {body, check} = require('express-validator')
const User = require('../models/User')

const isEmailUnique = async (email) => {
    console.log(email);
    const user = await User.getByEmail(email);
    if (user) {
        throw new Error('Email already exists');
    }
    return true;
}
const registerValidation = [
    body('name').notEmpty().withMessage("Name is required"),
    body('email').notEmpty().withMessage("Email is required").custom(isEmailUnique).withMessage("Email already exists"),
    body('password').isLength({min: 5}).withMessage("Password must be at least 5 characters long").isString(),
]

const loginValidation = [
    body('email').notEmpty().withMessage("Email is required"),
    body('password').isLength({min: 5}).withMessage("Password must be at least 5 characters long").isString(),
]

const changePasswordValidation = [
    check('oldPassword').notEmpty().withMessage('Old password is required'),
    check('password')
      .notEmpty().withMessage('New password is required')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('password_confirmation')
      .notEmpty().withMessage('Password confirmation is required')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password confirmation does not match password');
        }
        return true;
      }),
  ];

module.exports = {registerValidation, loginValidation, changePasswordValidation}