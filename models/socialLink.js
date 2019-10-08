const Joi = require('joi');
const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
    socialSite: {
        id: {
            type: String,
        },
        siteName: {
            type: String,
        },
        icon: {
            type: String,
        }
    },
    link: {
        type: String,
        required: true,
        maxlength: 60
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const socialLink = mongoose.model('SocialLink', socialLinkSchema);

function validateSocialLink(socialLink) {
    const schema = {
        socialSite: Joi.required(),
        link: Joi.string().max(60).required(),
        user: Joi.required(),
    }

    return Joi.validate(socialLink, schema)
}


exports.SocialLink = socialLink;
exports.validate = validateSocialLink;