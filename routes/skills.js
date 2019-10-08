const {Skill, validate} = require('../models/skill');
const express = require('express');
const router = express.Router();


// save skill
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let skill = await Skill.findOne({skill: req.body.skill});
    if (skill) return res.status(400).send('Skill already exist');

    skill = new Skill ({
        skill: req.body.skill
    })

    await skill.save();

    res.send({message: 'success'});
})


// update skill
router.put('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let skill = await Skill.findOne({skill: req.body.skill});
    if (skill) return res.status(400).send('Skill already exist');

    skill = await Skill.findByIdAndUpdate(req.query.id, {
        skill: req.body.skill,
    }, {new: true});

    if (!skill) return res.status(404).send('The skill with given id was not found');

    res.send({message: 'success'});
})

// delete skills
router.delete('/', async (req, res) => {
    const skill = await Skill.findByIdAndRemove(req.query.id);

    if (!skill) return res.status(404).send('The skill with given id was not found');

    res.send({ message: 'success' });
});

// get skills
router.get('/', async (req, res) => {
    const skills = await Skill
        .find()
        .select('-__v')
        .sort('skill');

    res.send(skills);
});



module.exports = router;