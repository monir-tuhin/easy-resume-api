const {Exam, validate} = require('../models/exam');
const express = require('express');
const router = express.Router();


// save exam
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let exam = await Exam.findOne({exam: req.body.exam});
    if (exam) return res.status(400).send('Exam already exist');

    exam = new Exam ({
        exam: req.body.exam,
        educationLevel: req.body.educationLevel
    })

    await exam.save();

    res.send({message: 'success'});
})


// update exam
router.put('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let exam = await Exam.findOne({exam: req.body.exam});
    if (exam) return res.status(400).send('Exam already exist');

    exam = await Exam.findByIdAndUpdate(req.query.id, {
        exam: req.body.exam,
        educationLevel: req.body.educationLevel
    }, {new: true});

    if (!exam) return res.status(404).send('The exam with given id was not found');

    res.send({message: 'success'});
})

// delete exams
router.delete('/', async (req, res) => {
    const exam = await Exam.findByIdAndRemove(req.query.id);

    if (!exam) return res.status(404).send('The exam with given id was not found');

    res.send({ message: 'success' });
});

// get exams
router.get('/', async (req, res) => {
    const exams = await Exam
        .find()
        .populate('educationLevel', 'educationLevel')
        .select('-__v')
        .sort('educationLevel.educationLevel');

    res.send(exams);
});

// get exam by education level
router.get('/getByEducationLevel', async (req, res) => {
    const exams = await Exam.find({educationLevel:req.query.educationLevel})
        .select('-__v')
    res.send(exams);
});


module.exports = router;