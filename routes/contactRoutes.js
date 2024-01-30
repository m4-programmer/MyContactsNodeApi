const express = require('express')

const contactRouter = express.Router();
const Contact = require('../models/Contact');
const { success, failure } = require('../utils/Helper');
const { get, store, update, destroy, show } = require('../controllers/ContactController');
const verifyToken = require('../middlewares/verifyToken');
const { ContactValidation } = require('../validations/ContactValidation');


contactRouter.get('/', verifyToken, get);
contactRouter.
    get('/:id', verifyToken, show)    
    .post('/', verifyToken, ContactValidation, store)
    .put('/:id', verifyToken, ContactValidation, update)
    .delete('/:id', verifyToken, destroy);

module.exports = contactRouter