const Joi = require('joi');
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true,
        unique: true,
    }
});

const skill = mongoose.model('Skill', skillSchema);

function validateSkill(skill) {
    const schema = {
        skill: Joi.string().required()
    }

    return Joi.validate(skill, schema)
}


exports.Skill = skill;
exports.validate = validateSkill;