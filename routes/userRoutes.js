const express = require('express')

const userRouter = express.Router();
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validations/UserValidation');
const { register, login, get } = require('../controllers/AuthController');
const verifyToken = require('../middlewares/verifyToken');


userRouter.post('/register', registerValidation, register).post('/login', loginValidation, login);

userRouter.get('/', verifyToken, get);

module.exports = userRouter