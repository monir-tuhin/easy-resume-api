const { Address, validate } = require('../models/address');
const express = require('express');
const router = express.Router();


// save address
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const address = new Address({
        details: req.body.details,
        upazila: req.body.upazila,
        district: req.body.district,
        post: req.body.post,
        user: req.body.user,
    })

    await address.save();

    res.send({ message: 'success' });
})

// update address
router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const address = await Address.findByIdAndUpdate(req.query.id, {
        details: req.body.details,
        upazila: req.body.upazila,
        district: req.body.district,
        post: req.body.post,
        user: req.body.user,
    }, { new: true });

    if (!address) return res.status(404).send('The address with given id was not found');

    res.send({ message: 'success' });
})

// get address
router.get('/', async (req, res) => {
    const address = await Address
        .find()
        .populate('post', ['postCode', 'postName'])
        .populate('upazila', 'upazilaName')
        .populate('district', 'districtName')
        .select('-__v')

    res.send(address);
});

// get address by user
router.get('/getByUser', async (req, res) => {
    const address = await Address
        .find({user: req.query.user})
        .populate('post', ['postCode', 'postName'])
        .populate('upazila', 'upazilaName')
        .populate('district', 'districtName')
        .select('-__v')

    res.send(address);
});

// delete address
router.delete('/', async (req, res) => {
    const address = await Address.findByIdAndRemove(req.query.id);

    if (!address) return res.status(404).send('The address with given id was not found');

    res.send({ message: 'success' });
});


module.exports = router;