const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        select: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        select: true,        
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
},
{
    timestamps: true
});
const User = mongoose.model('User', userSchema);


//create user
const create = async (name, email, password) => {
    const user = new User({
        name,
        email,
        password
    });

    await user.save();
};

//get user
const get = async (id) => {
    const user = await User.findById(id);
    return user;
};

const getByEmail = async (email, withPassword = false) => {
    let user;
    if (withPassword === false || !withPassword) {
         user = await User.findOne({email});
    }else{
         user = await User.findOne({email}).select("+password");
    }
    return user;
}

//update user
const update = async (id, name, email, password) => {
    const user = await User.findByIdAndUpdate(id, {
        name,
        email,
        password
    });

    return user;
};

//delete user

const deleteUser = async (id) => {
    const user  =  await User.findByIdAndDelete(id);
    return user;
}

module.exports = {
    User,
    create,
    get,
    update,
    deleteUser,
    getByEmail
}