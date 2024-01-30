const express = require('express');
const userRouter = require('./userRoutes');

const router = express.Router();

router.use('/auth', userRouter);


module.exports = router;