const express = require('express')

const userRouter = express.Router();
const User = require('../models/User');
const app = express()
const { registerValidation, loginValidation, changePasswordValidation } = require('../validations/UserValidation');
const { register, login, get, update, changePassword, logout } = require('../controllers/AuthController');
const verifyToken = require('../middlewares/verifyToken');


userRouter.post('/register', registerValidation, register).post('/login', loginValidation, login);

userRouter.get('/', verifyToken, get).put('/', verifyToken, update);
userRouter.put('/password', verifyToken, changePasswordValidation, changePassword);
userRouter.post('/logout', verifyToken, logout);
module.exports = userRouter