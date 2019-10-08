const Joi = require('joi');
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    details: {
        type: String,
        required: true,
        maxlength: 150,
    },
    upazila: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upazila',
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

});

const address = mongoose.model('Address', addressSchema);

function validateAddress(address) {
    const schema = {
        details: Joi.string().max(150).required(),
        upazila: Joi.required(),
        district: Joi.required(),
        post: Joi.required(),
        user: Joi.required(),
    }

    return Joi.validate(address, schema)
}


exports.Address = address;
exports.validate = validateAddress;