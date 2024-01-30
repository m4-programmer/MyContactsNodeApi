const dotenv = require('dotenv')

dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
const ENV = process.env.ENV || 'local';
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

module.exports = { PORT, MONGO_URI, ENV, APP_URL }