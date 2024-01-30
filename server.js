const express = require('express')

const Db = require('./utils/Db');
const { PORT } = require('./constants');

Db.connect();

const app = express();

app.use(express.json());
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));