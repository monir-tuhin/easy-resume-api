const Joi = require('joi');
const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 40,
    },
    designation: {
        type: String,
        required: true,
        maxlength: 40,
    },
    organization: {
        type: String,
        required: true,
        maxlength: 70,
    },
    contactNumber: {
        type: String,
        maxlength: 18,
    },
    email: {
        type: String,
        maxlength: 60,
        unique: true,
    },
    relation: {
        type: String,
        maxlength: 15,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

});

const reference = mongoose.model('Reference', referenceSchema);

function validateReference(reference) {
    const schema = {
        name: Joi.string().max(40).required(),
        designation: Joi.string().max(40).required(),
        organization: Joi.string().max(70).required(),
        contactNumber: Joi.string().allow('', null).max(18),
        email: Joi.string().allow('', null).max(60).email(),
        relation: Joi.string().allow('', null).max(15),
        user: Joi.required(),
    }

    return Joi.validate(reference, schema)
}


exports.Reference = reference;
exports.validate = validateReference;