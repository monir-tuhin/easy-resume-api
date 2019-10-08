const { Certification, validate } = require('../models/certification');
const express = require('express');
const router = express.Router();


// save certification
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const certification = new Certification({
        certification: req.body.certification,
        institute: req.body.institute,
        certPeriodFrom: req.body.certPeriodFrom,
        certPeriodTo: req.body.certPeriodTo,
        user: req.body.user,
    })

    await certification.save();

    res.send({ message: 'success' });
})

// update certification
router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const certification = await Certification.findByIdAndUpdate(req.query.id, {
        certification: req.body.certification,
        institute: req.body.institute,
        certPeriodFrom: req.body.certPeriodFrom,
        certPeriodTo: req.body.certPeriodTo,
        user: req.body.user,
    }, { new: true });

    if (!certification) return res.status(404).send('The certification with given id was not found');

    res.send({ message: 'success' });
})

// get employment
router.get('/', async (req, res) => {
    const certification = await Certification
        .find()
        .select('-__v')

    res.send(certification);
});

// get certification by user
router.get('/getByUser', async (req, res) => {
    const certification = await Certification
        .find({user: req.query.user})
        .select('-__v')

    res.send(certification);
});

// delete certification
router.delete('/', async (req, res) => {
    const certification = await Certification.findByIdAndRemove(req.query.id);

    if (!certification) return res.status(404).send('The certification with given id was not found');

    res.send({ message: 'success' });
});


module.exports = router;