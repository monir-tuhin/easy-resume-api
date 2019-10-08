const Joi = require('joi');
const mongoose = require('mongoose');

const careerSummarySchema = new mongoose.Schema({
    careerSummary: {
        type: String,
        required: true,
        maxlength: 500,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

});

const careerSummary = mongoose.model('CareerSummary', careerSummarySchema);

function validateCareerSummary(careerSummary) {
    const schema = {
        careerSummary: Joi.string().max(500).required(),
        user: Joi.required(),
    }

    return Joi.validate(careerSummary, schema)
}


exports.CareerSummary = careerSummary;
exports.validate = validateCareerSummary;