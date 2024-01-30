const express = require('express')

const userRouter = express.Router();
const User = require('../models/User');
const { registerValidation } = require('../validations/UserValidation');
const { register } = require('../controllers/AuthController');


userRouter.post('/register', registerValidation, register);


module.exports = userRouter