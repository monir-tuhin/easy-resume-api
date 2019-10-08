const Joi = require('joi');
const mongoose = require('mongoose');

const educationLevelSchema = new mongoose.Schema({
    educationLevel: {
        type: String,
        required: true,
        unique: true,
    }
});

const educationLevel = mongoose.model('EducationLevel', educationLevelSchema);

function validateEducationLevel(educationLevel) {
    const schema = {
        educationLevel: Joi.string().required()
    }

    return Joi.validate(educationLevel, schema)
}


exports.EducationLevel = educationLevel;
exports.validate = validateEducationLevel;