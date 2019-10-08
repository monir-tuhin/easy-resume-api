const { CareerSummary, validate } = require('../models/careerSummary');
const express = require('express');
const router = express.Router();


// save careerSummary
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const careerSummary = new CareerSummary({
        careerSummary: req.body.careerSummary,
        user: req.body.user,
    })

    await careerSummary.save();

    res.send({ message: 'success' });
})

// update careerSummary
router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const careerSummary = await CareerSummary.findByIdAndUpdate(req.query.id, {
        careerSummary: req.body.careerSummary,
        user: req.body.user,
    }, { new: true });

    if (!careerSummary) return res.status(404).send('The careerSummary with given id was not found');

    res.send({ message: 'success' });
})

// get careerSummary by user
router.get('/getByUser', async (req, res) => {
    const careerSummary = await CareerSummary
        .find({user: req.query.user})
        .select('-__v')

    res.send(careerSummary);
});

// get careerSummary
router.get('/', async (req, res) => {
    const careerSummary = await CareerSummary
        .find()
        .select('-__v')

    res.send(careerSummary);
});


module.exports = router;