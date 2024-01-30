const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const { validationResult } = require('express-validator');
const { failure, success } = require('../utils/Helper');

//register user

const register = async (req,res) => {
    const { name, email, password } = req.body;
    //check validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(failure('Validation failed', errors.array(), 422));
    }
    
    //hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

   try {
    //store user
     const user = User.create( name, email, hash );
     //create session token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2m' });
     //return token
     return res.status(201).json(success('User created Successfully', { token }, 201));

   } catch (err) {
        console.log(err);
        return res.status(500).json(failure('Something went wrong', err, 500));
   }
}



//login user


//get user details/profile



//update user detail


//logout user

module.exports = {register}