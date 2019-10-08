const Joi = require('joi');
const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
    trainingTitle: {
        type: String,
        required: true,
        maxlength: 50,
    },
    country: {
        type: String,
        required: true,
        maxlength: 30,
    },
    topics: {
        type: String,
        required: true,
        maxlength: 100,
    },
    trainingYear: {
        type: Number,
        min : 1000,
        max : 9999,
        required: true,
    },
    institute: {
        type: String,
        required: true,
        maxlength: 60,
    },
    duration: {
        type: String,
        required: true,
        maxlength: 30,
    },
    location: {
        type: String,
        maxlength: 30,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

});

const training = mongoose.model('Training', trainingSchema);

function validateTraining(training) {
    const schema = {
        trainingTitle: Joi.string().max(50).required(),
        country: Joi.string().max(30).required(),
        topics: Joi.string().max(100).required(),
        trainingYear: Joi.number().integer().min(1970).max(2020),
        institute: Joi.string().max(60).required(),
        duration: Joi.string().max(30).required(),
        location: Joi.string().max(30),
        user: Joi.required(),
    }

    return Joi.validate(training, schema)
}


exports.Training = training;
exports.validate = validateTraining;