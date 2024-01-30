const express = require('express')

const contactRouter = express.Router();
const Contact = require('../models/Contact');
const { success, failure } = require('../utils/Helper');
const { get, store, update } = require('../controllers/ContactController');
const verifyToken = require('../middlewares/verifyToken');
const { ContactValidation } = require('../validations/ContactValidation');


contactRouter.get('/', verifyToken, get);
contactRouter.post('/', verifyToken, ContactValidation, store).put('/:id', verifyToken, ContactValidation, update);

module.exports = contactRouter