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
        
        return res.status(500).json(failure('Something went wrong', err, 500));
   }
}



//login user
const login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(failure('Validation failed', errors.array(), 422));
    }
    try {
        //hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = await User.getByEmail(email, true);
        
        //check password
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(404).json(failure('Incorrect Email or Password', [], 404));
        }
        
        //generate token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        //return response
        return res.status(200).json(success('User logged in successfully', { token }, 200));
    } catch (error) {
        return res.status(500).json(failure('Something went wrong', error, 500));
    }
}


//get user details/profile
const get = async (req, res) => {
    const user = req.user
    return res.status(200).json(success('User details retrieved successfully', user, 200));
}


//update user detail
const update = async (req, res) => {
    //we get the user id from the auth user
    const user = req.user;
    // we get the user body request
    const {name, email} = req.body
    //we check validation
    if (!name || !email) {
        return res.status(422).json(failure('name and email is required', [], 422));
    }
    try {
        //we update user record
        const updatedUser = await User.update(user._id, name, email);
        return res.status(200).json(success('User details updated successfully', updatedUser, 200));
    } catch (error) {   
        //we return response
        return res.status(500).json(failure('Something went wrong', error, 500));
    }

    
}

//change password
const changePassword = async(req, res) => {

}

//logout user
const logout = async(req, res) => {

}

module.exports = {register, login, get, update, changePassword, logout}