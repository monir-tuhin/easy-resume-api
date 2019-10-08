const Joi = require('joi');
const mongoose = require('mongoose');

const photographSchema = new mongoose.Schema({
    userImage: {
        type: String,
        // required: true,
    },
    user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
     }

});

const photograph = mongoose.model('Photograph', photographSchema);

function validatePhotograph(photograph) {
    const schema = {
        userImage: Joi.string().required(),
        user: Joi.required(),
    }

    return Joi.validate(photograph, schema)
}


exports.Photograph = photograph;
exports.validate = validatePhotograph;