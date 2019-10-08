const {District, validate} = require('../models/district');
const express = require('express');
const router = express.Router();


// save district
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let district = await District.findOne({districtName: req.body.districtName});
    if (district) return res.status(400).send('District already exist');

    district = new District ({
        districtName: req.body.districtName
    })

    await district.save();

    res.send({message: 'success'});
})


// update district
router.put('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let district = await District.findOne({districtName: req.body.districtName});
    if (district) return res.status(400).send('District already exist');

    district = await District.findByIdAndUpdate(req.query.id, {
        districtName: req.body.districtName,
    }, {new: true});

    if (!district) return res.status(404).send('The district with given id was not found');

    res.send({message: 'success'});
})

// delete districts
router.delete('/', async (req, res) => {
    const district = await District.findByIdAndRemove(req.query.id);

    if (!district) return res.status(404).send('The district with given id was not found');

    res.send({ message: 'success' });
});

// get districts
router.get('/', async (req, res) => {
    const districts = await District
        .find()
        .select('-__v')
        .sort('districtName');
    res.send(districts);
});



module.exports = router;