const Joi = require('joi');
const mongoose = require('mongoose');

const upazilaSchema = new mongoose.Schema({
    upazilaName: {
        type: String,
        required: true,
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
    }
});

const upazila = mongoose.model('Upazila', upazilaSchema);

function validateUpazila(upazila) {
    const schema = {
        upazilaName: Joi.string().required(),
        district: Joi.required(),
    }

    return Joi.validate(upazila, schema)
}


exports.Upazila = upazila;
exports.validate = validateUpazila;