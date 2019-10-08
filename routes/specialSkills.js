const { SpecialSkill, validate } = require('../models/specialSkill');
const express = require('express');
const router = express.Router();


// save specialSkill
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    /*let skill = await SpecialSkill.findOne({skill: req.body.skill});
    if (skill) return res.status(400).send('Skill already exist');*/

    const specialSkill = new SpecialSkill ({
        skill: req.body.skill,
        user: req.body.user,
    })

    await specialSkill.save();

    res.send({message: 'success'});
})


// update specialSkill
router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const specialSkill = await SpecialSkill.findByIdAndUpdate(req.query.id, {
        skill: req.body.skill,
        user: req.body.user,
    }, { new: true });

    if (!specialSkill) return res.status(404).send('The specialSkill with given id was not found');

    res.send({ message: 'success' });
})

// get specialSkill by user
router.get('/getByUser', async (req, res) => {
    const specialSkill = await SpecialSkill
        .find({user: req.query.user})
        .select('-__v')

    res.send(specialSkill);
});

// delete specialSkill
router.delete('/', async (req, res) => {
    const specialSkill = await SpecialSkill.findByIdAndRemove(req.query.id);

    if (!specialSkill) return res.status(404).send('The specialSkill with given id was not found');

    res.send({ message: 'success' });
});

// get specialSkill
router.get('/', async (req, res) => {
    const specialSkill = await SpecialSkill
        .find()
        .select('-__v')

    res.send(specialSkill);
});


module.exports = router;