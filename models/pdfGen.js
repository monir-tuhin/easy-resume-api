const Joi = require('joi');
const mongoose = require('mongoose');

const pdfGenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    careerSummary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CareerSummary',
    },

});

const pdfGen = mongoose.model('PdfGenerate', pdfGenSchema);

function validatePost(pdfGen) {
    const schema = {
        pdfGenCode: Joi.number().integer().required(),
        pdfGenName: Joi.string().required(),
        upazila: Joi.required(),
        district: Joi.required()
    }

    return Joi.validate(pdfGen, schema)
}


exports.Post = pdfGen;
exports.validate = validatePost;