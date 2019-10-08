const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50
    },
    cvTitle: {
        type: String,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 255,
    },
    dob: {
        type: Date
    },
    phone: {
        type: String,
        minlength: 3,
        maxlength: 20,
    },
    bloodGroup: {
        type: String,
        minlength: 2,
        maxlength: 5
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50),
        cvTitle: Joi.string().max(40),
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(5).max(255),
        dob: Joi.date().allow('', null),
        // dob: Joi.date().min('1-1-1900').max('1-1-2013').required(),
        phone: Joi.string().min(3).max(20),
        bloodGroup: Joi.string().allow('', null).min(2).max(5),
    }

    return Joi.validate(user, schema)
}


exports.User = User;
exports.validate = validateUser;
