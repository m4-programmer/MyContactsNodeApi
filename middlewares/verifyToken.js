const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { failure } = require('../utils/Helper');

//write middleware logic to verify user token
const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret key
        // Retrieve user information from the database based on the decoded token
        const user = await User.get(decoded.id);
        // Attach user information to the request object
        req.user = user;
        // Continue with the request
        next();
      } catch (error) {
        // Handle token verification errors
        // console.log(error);
        console.log("An error occurred in verifyToken Middleware: ");
        res.status(401).json(failure('Unauthorized', error, 401));
      }
};

module.exports = verifyToken