const express = require('express');
const userRouter = require('./userRoutes');
const contactRouter = require('./contactRoutes');
const router = express.Router();

router.use('/auth', userRouter);
router.use('/contacts', contactRouter);

module.exports = router;