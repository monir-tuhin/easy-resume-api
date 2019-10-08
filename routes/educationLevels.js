const {EducationLevel, validate} = require('../models/educationLevel');
const express = require('express');
const router = express.Router();


// save educationLevel
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let educationLevel = await EducationLevel.findOne({educationLevel: req.body.educationLevel});
    if (educationLevel) return res.status(400).send('Education level already exist');

    educationLevel = new EducationLevel ({
        educationLevel: req.body.educationLevel
    })

    await educationLevel.save();

    res.send({message: 'success'});
})


// update educationLevel
router.put('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let educationLevel = await EducationLevel.findOne({educationLevel: req.body.educationLevel});
    if (educationLevel) return res.status(400).send('Education level already exist');

    educationLevel = await EducationLevel.findByIdAndUpdate(req.query.id, {
        educationLevel: req.body.educationLevel,
    }, {new: true});

    if (!educationLevel) return res.status(404).send('The education level with given id was not found');

    res.send({message: 'success'});
})

// delete educationLevels
router.delete('/', async (req, res) => {
    const educationLevel = await EducationLevel.findByIdAndRemove(req.query.id);

    if (!educationLevel) return res.status(404).send('The education level with given id was not found');

    res.send({ message: 'success' });
});

// get educationLevels
router.get('/', async (req, res) => {
    const educationLevels = await EducationLevel
        .find()
        .select('-__v')
        .sort('educationLevel');

    res.send(educationLevels);
});


module.exports = router;