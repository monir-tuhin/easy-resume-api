const { Employment, validate } = require('../models/employment');
const express = require('express');
const router = express.Router();


// save employment
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.jobPeriodTo == null && req.body.currentlyWorking == false) {
        return res.status(404).send('Please Select Employment Period To');
    }

    const employment = new Employment({
        companyName: req.body.companyName,
        designation: req.body.designation,
        jobPeriodFrom: req.body.jobPeriodFrom,
        jobPeriodTo: req.body.jobPeriodTo,
        currentlyWorking: req.body.currentlyWorking,
        responsibilities: req.body.responsibilities,
        user: req.body.user,
    })

    await employment.save();

    res.send({ message: 'success' });
})

// update employment
router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (req.body.jobPeriodTo == null && req.body.currentlyWorking == false) {
        return res.status(404).send('Please Select Employment Period To');
    }

    const employment = await Employment.findByIdAndUpdate(req.query.id, {
        companyName: req.body.companyName,
        designation: req.body.designation,
        jobPeriodFrom: req.body.jobPeriodFrom,
        jobPeriodTo: req.body.jobPeriodTo,
        currentlyWorking: req.body.currentlyWorking,
        responsibilities: req.body.responsibilities,
        user: req.body.user,
    }, { new: true });

    if (!employment) return res.status(404).send('The employment with given id was not found');

    res.send({ message: 'success' });
})

// get employment
router.get('/', async (req, res) => {
    const employment = await Employment
        .find()
        .select('-__v')

    res.send(employment);
});

// get employment by user
router.get('/getByUser', async (req, res) => {
    const employment = await Employment
        .find({user: req.query.user})
        .select('-__v')

    res.send(employment);
});

// delete employment
router.delete('/', async (req, res) => {
    const employment = await Employment.findByIdAndRemove(req.query.id);

    if (!employment) return res.status(404).send('The employment with given id was not found');

    res.send({ message: 'success' });
});

module.exports = router;