const Joi = require('joi');
const mongoose = require('mongoose');

const employmentSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        maxlength: 60,
    },
    designation: {
        type: String,
        required: true,
        maxlength: 40,
    },
    jobPeriodFrom: {
        type: Date,
        required: true,
    },
    jobPeriodTo: {
        type: Date,
    },
    currentlyWorking: {
        type: Boolean,
        default: false,
    },
    responsibilities: {
        type: String,
        maxlength: 250,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

});

const employment = mongoose.model('Employment', employmentSchema);

function validateEmployment(employment) {
    const schema = {
        companyName: Joi.string().max(60).required(),
        designation: Joi.string().max(40).required(),
        jobPeriodFrom: Joi.date().required(),
        jobPeriodTo: Joi.date().allow('', null),
        currentlyWorking: Joi.boolean(),
        responsibilities: Joi.string().allow('', null).max(250),
        user: Joi.required(),
    }

    return Joi.validate(employment, schema)
}


exports.Employment = employment;
exports.validate = validateEmployment;