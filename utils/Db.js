const mongoose = require('mongoose');
const { MONGO_URI } = require('../constants');

// Suppress the DeprecationWarning for strictQuery
mongoose.set('strictQuery', false);
const connect = async () => {
   try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
   } catch (error) {
        console.log(error);
   }
}

module.exports = { connect }