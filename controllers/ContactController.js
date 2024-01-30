const { validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const { success, failure } = require('../utils/Helper');

// get all contacts
const get = async (req, res) => {
    try {
        const contacts = await Contact.find({ user_id: req.user._id });
        return res.status(200).json(success('Contacts fetched successfully', contacts, 200));
    } catch (error) {
        return res.status(500).json(failure('Something went wrong', error, 500));
    }
};

//create contact
const store = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(failure('Validation failed', errors.array(), 422));
    }
    const { name, email, phone } = req.body;
    
    try {
        const contact = await Contact.create({ name, email, phone, user_id: req.user._id });
        return res.status(201).json(success('Contact created successfully', contact, 201));
    } catch (error) {
        return res.status(500).json(failure('Something went wrong', error, 500));
    }
}

//update contact details
const update = async (req, res) => {
    
}

//delete contact
const destroy = async (req, res) => {
    
}

//get single contact that belongs to a user
const show = async (req, res) => {
    
}


module.exports = {
    get,
    store,
    update,
    destroy,
    show
}