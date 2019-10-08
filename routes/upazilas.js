const {Upazila, validate} = require('../models/upazila');
const express = require('express');
const router = express.Router();


// save upazila
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const upazila = new Upazila ({
        upazilaName: req.body.upazilaName,
        district: req.body.district
    })

    await upazila.save();

    res.send({message: 'success'});
})

// update upazila
router.put('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const upazila = await Upazila.findByIdAndUpdate(req.query.id, {
        upazilaName: req.body.upazilaName,
        district: req.body.district
    }, {new: true});

    if (!upazila) return res.status(404).send('The upazila with given id was not found');

    res.send({message: 'success'});
})

// delete districts
router.delete('/', async (req, res) => {
    const upazila = await Upazila.findByIdAndRemove(req.query.id);

    if (!upazila) return res.status(404).send('The upazila with given id was not found');

    res.send({ message: 'success' });
});

// get upazilas
router.get('/', async (req, res) => {
    const upazilas = await Upazila
        .find()
        .populate('district', 'districtName')
        .select('-__v')
        .sort('district.districtName');
    res.send(upazilas);
});

// get upazilas by district
router.get('/getByDistrict', async (req, res) => {
    const upazilas = await Upazila.find({district:req.query.district})
        .select('-__v')
    res.send(upazilas);
});

module.exports = router;