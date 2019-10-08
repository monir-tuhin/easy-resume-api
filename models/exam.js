const Joi = require('joi');
const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    exam: {
        type: String,
        required: true,
        unique: true,
    },
    educationLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EducationLevel',
    }
});

const exam = mongoose.model('Exam', examSchema);

function validateExam(exam) {
    const schema = {
        exam: Joi.string().required(),
        educationLevel: Joi.string().required(),
    }

    return Joi.validate(exam, schema)
}


exports.Exam = exam;
exports.validate = validateExam;