const express = require('express')
const route = require('./routes');
const Db = require('./utils/Db');
const { PORT } = require('./constants');

Db.connect();

const app = express();

app.use(express.json());

route.use('api/v1', route);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));