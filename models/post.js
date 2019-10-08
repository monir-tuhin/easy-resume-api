const Joi = require('joi');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postCode: {
        type: Number,
        required: true,
        unique: true,
    },
    postName: {
        type: String,
        required: true,
    },
    upazila: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upazila',
    },
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
    }
});

const post = mongoose.model('Post', postSchema);

function validatePost(post) {
    const schema = {
        postCode: Joi.number().integer().required(),
        postName: Joi.string().required(),
        upazila: Joi.required(),
        district: Joi.required()
    }

    return Joi.validate(post, schema)
}


exports.Post = post;
exports.validate = validatePost;