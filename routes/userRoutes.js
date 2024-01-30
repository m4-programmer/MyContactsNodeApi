const express = require('express')

const userRouter = express.Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validations/UserValidation');
const { register, login } = require('../controllers/AuthController');


userRouter.post('/register', registerValidation, register).post('/login', loginValidation, login);


module.exports = userRouter