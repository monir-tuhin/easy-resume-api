const { Reference, validate } = require('../models/reference');
const express = require('express');
const router = express.Router();


// save reference
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const reference = new Reference({
        name: req.body.name,
        designation: req.body.designation,
        organization: req.body.organization,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        relation: req.body.relation,
        user: req.body.user,
    })

    await reference.save();

    res.send({ message: 'success' });
})

// update reference
router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   const reference = await Reference.findByIdAndUpdate(req.query.id, {
        name: req.body.name,
        designation: req.body.designation,
        organization: req.body.organization,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        relation: req.body.relation,
        user: req.body.user,
    }, { new: true });

    if (!reference) return res.status(404).send('The reference with given id was not found');

    res.send({ message: 'success' });
})

// get reference
router.get('/', async (req, res) => {
    const reference = await Reference
        .find()
        .select('-__v')

    res.send(reference);
});

// get reference by user
router.get('/getByUser', async (req, res) => {
    const reference = await Reference
        .find({user: req.query.user})
        .select('-__v')

    res.send(reference);
});

// delete reference
router.delete('/', async (req, res) => {
    const reference = await Reference.findByIdAndRemove(req.query.id);

    if (!reference) return res.status(404).send('The reference with given id was not found');

    res.send({ message: 'success' });
});


module.exports = router;