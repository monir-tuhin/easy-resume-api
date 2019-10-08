const Joi = require('joi');
const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
    districtName: {
        type: String,
        required: true,
        unique: true,
    }
});

const district = mongoose.model('District', districtSchema);

function validateDistrict(district) {
    const schema = {
        districtName: Joi.string().required()
    }

    return Joi.validate(district, schema)
}


exports.District = district;
exports.validate = validateDistrict;