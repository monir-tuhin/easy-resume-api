const Joi = require('joi');
const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    certification: {
        type: String,
        required: true,
        maxlength: 50,
    },
    institute: {
        type: String,
        required: true,
        maxlength: 60,
    },
    certPeriodFrom: {
        type: Date,
        required: true,
    },
    certPeriodTo: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

});

const certification = mongoose.model('Certification', certificationSchema);

function validateCertification(certification) {
    const schema = {
        certification: Joi.string().max(50).required(),
        institute: Joi.string().max(60).required(),
        certPeriodFrom: Joi.date().required(),
        certPeriodTo:Joi.date().required(),
        user: Joi.required(),
    }

    return Joi.validate(certification, schema)
}


exports.Certification = certification;
exports.validate = validateCertification;