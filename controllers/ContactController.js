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


module.exports = {
    get
}