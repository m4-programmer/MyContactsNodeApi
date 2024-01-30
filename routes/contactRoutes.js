const express = require('express')

const contactRouter = express.Router();
const Contact = require('../models/Contact');
const { success, failure } = require('../utils/Helper');
const { get } = require('../controllers/ContactController');
const verifyToken = require('../middlewares/verifyToken');


contactRouter.get('/', verifyToken, get);

module.exports = contactRouter