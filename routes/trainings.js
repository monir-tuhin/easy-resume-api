const { Training, validate } = require('../models/training');
const express = require('express');
const router = express.Router();


// save training
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const training = new Training({
        trainingTitle: req.body.trainingTitle,
        country: req.body.country,
        topics: req.body.topics,
        trainingYear: req.body.trainingYear,
        institute: req.body.institute,
        duration: req.body.duration,
        location: req.body.location,
        user: req.body.user,
    })

    await training.save();

    res.send({ message: 'success' });
})

// update training
router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const training = await Training.findByIdAndUpdate(req.query.id, {
        trainingTitle: req.body.trainingTitle,
        country: req.body.country,
        topics: req.body.topics,
        trainingYear: req.body.trainingYear,
        institute: req.body.institute,
        duration: req.body.duration,
        location: req.body.location,
        user: req.body.user,
    }, { new: true });

    if (!training) return res.status(404).send('The training with given id was not found');

    res.send({ message: 'success' });
})

// get employment
router.get('/', async (req, res) => {
    const training = await Training
        .find()
        .select('-__v')

    res.send(training);
});

// get training by user
router.get('/getByUser', async (req, res) => {
    const training = await Training
        .find({user: req.query.user})
        .select('-__v')

    res.send(training);
});

// delete training
router.delete('/', async (req, res) => {
    const training = await Training.findByIdAndRemove(req.query.id);

    if (!training) return res.status(404).send('The training with given id was not found');

    res.send({ message: 'success' });
});


module.exports = router;