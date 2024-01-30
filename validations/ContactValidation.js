const {body} = require('express-validator');

const ContactValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage("Invalid Email"),
    body('phone').notEmpty().withMessage('Phone is required')
]

module.exports = {ContactValidation}