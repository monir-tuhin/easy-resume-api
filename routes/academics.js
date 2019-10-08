const { Academic, validate } = require('../models/academic');
const express = require('express');
const router = express.Router();


// save academic
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const academic = new Academic({
        major: req.body.major,
        board: req.body.board,
        institute: req.body.institute,
        result: req.body.result,
        marks: req.body.marks,
        cgpa: req.body.cgpa,
        scale: req.body.scale,
        passingYear: req.body.passingYear,
        duration: req.body.duration,
        resultType: req.body.resultType,
        achievement: req.body.achievement,
        educationLevel: req.body.educationLevel,
        exam: req.body.exam,
        user: req.body.user,
    })

    await academic.save();

    res.send({ message: 'success' });
})

// update academic
router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   const academic = await Academic.findByIdAndUpdate(req.query.id, {
        major: req.body.major,
        board: req.body.board,
        institute: req.body.institute,
        result: req.body.result,
        marks: req.body.marks,
        cgpa: req.body.cgpa,
        scale: req.body.scale,
        passingYear: req.body.passingYear,
        duration: req.body.duration,
        resultType: req.body.resultType,
        achievement: req.body.achievement,
        educationLevel: req.body.educationLevel,
        exam: req.body.exam,
        user: req.body.user,
    }, { new: true });

    if (!academic) return res.status(404).send('The academic with given id was not found');

    res.send({ message: 'success' });
})

// delete academic
router.delete('/', async (req, res) => {
    const academic = await Academic.findByIdAndRemove(req.query.id);

    if (!academic) return res.status(404).send('The academic with given id was not found');

    res.send({ message: 'success' });
});

// get academics
router.get('/', async (req, res) => {
    const academics = await Academic
        .find()
        .populate('educationLevel', 'educationLevel')
        .populate('exam', 'exam')
        .select('-__v')

    res.send(academics);
});

// get academic by user
router.get('/getByUser', async (req, res) => {
    const academic = await Academic
        .find({user: req.query.user})
        .populate('educationLevel', 'educationLevel')
        .populate('exam', 'exam')
        .select('-__v')

    res.send(academic);
});



module.exports = router;