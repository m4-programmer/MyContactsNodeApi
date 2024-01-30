const {body} = require('express-validator')
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

module.exports = {registerValidation}