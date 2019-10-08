const Joi = require('joi');
const mongoose = require('mongoose');

const academicSchema = new mongoose.Schema({
    major: {
        type: String,
        required: true,
    },
    board: {
        type: String,
    },
    institute: {
        type: String,
        maxlength: 50,
        required: true,
    },
    result: {
        type: String,
        required: true,
    },
    marks: {
        type: Number,
        max: 9999,
    },
    cgpa: {
        type: String,
        maxlength: 4,
    },
    scale: {
        type: Number,
        min: 4,
        max: 5
    },
    passingYear: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 4,
    },
    duration: {
        type: Number,
        min: 1,
        max: 10
    },
    resultType: {
        type: String,
        required: true,
        maxlength: 10,
    },
    achievement: {
        type: String,
        maxlength: 200,
    },
    educationLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EducationLevel',
    },
    exam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exam',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const academic = mongoose.model('Academic', academicSchema);

function validateAcademic(academic) {
    const schema = {
        major: Joi.string().required(),
        board: Joi.string().allow('', null),
        institute: Joi.string().max(50).required(),
        result: Joi.string().required(),
        marks: Joi.number().integer().allow('', null).max(9999),
        cgpa: Joi.string().allow('', null).max(4),
        scale: Joi.number().integer().allow('', null).min(4).max(5),
        passingYear: Joi.string().min(4).max(4).required(),
        duration: Joi.number().integer().allow('', null).min(1).max(10),
        resultType: Joi.string().max(10).required(),
        achievement: Joi.string().allow('', null).max(200),
        educationLevel: Joi.required(),
        exam: Joi.required(),
        user: Joi.required()
    }

    return Joi.validate(academic, schema)
}


exports.Academic = academic;
exports.validate = validateAcademic;