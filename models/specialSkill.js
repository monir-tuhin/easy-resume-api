const Joi = require('joi');
const mongoose = require('mongoose');

const specialSkillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const specialSkill = mongoose.model('SpecialSkill', specialSkillSchema);

function validateSpecialSkill(specialSkill) {
    const schema = {
        skill: Joi.string().required(),
        user: Joi.required(),
    }

    return Joi.validate(specialSkill, schema)
}


exports.SpecialSkill = specialSkill;
exports.validate = validateSpecialSkill;