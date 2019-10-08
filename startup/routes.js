const cors = require('cors');
const express = require('express');
const resetPassword = require('../routes/resetPassword');
const pdfGenerate = require('../routes/pdfGenerate');
const socialLinks = require('../routes/socialLinks');
const academics = require('../routes/academics');
const exams = require('../routes/exams');
const educationLevels = require('../routes/educationLevels');
const trainings = require('../routes/trainings');
const certifications = require('../routes/certifications');
const photographs = require('../routes/photographs');
const specialSkills = require('../routes/specialSkills');
const skills = require('../routes/skills');
const references = require('../routes/references');
const careerSummaries = require('../routes/careerSummaries');
const employments = require('../routes/employments');
const addresses = require('../routes/addresses');
const posts = require('../routes/posts');
const upazilas = require('../routes/upazilas');
const districts = require('../routes/districts');
const users = require('../routes/users');
const auth = require('../routes/auth');
const bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(cors());

    app.use(bodyParser.json({limit: "50mb"}));
    app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

    app.use(express.json());
    app.use('/api/resetPassword', resetPassword);
    app.use('/api/pdfGenerate', pdfGenerate);
    app.use('/api/socialLinks', socialLinks);
    app.use('/api/academics', academics);
    app.use('/api/exams', exams);
    app.use('/api/educationLevels', educationLevels);
    app.use('/api/trainings', trainings);
    app.use('/api/certifications', certifications);
    app.use('/api/photographs', photographs);
    app.use('/api/specialSkills', specialSkills);
    app.use('/api/skills', skills);
    app.use('/api/references', references);
    app.use('/api/careerSummaries', careerSummaries);
    app.use('/api/employments', employments);
    app.use('/api/addresses', addresses);
    app.use('/api/posts', posts);
    app.use('/api/upazilas', upazilas);
    app.use('/api/districts', districts);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
}


