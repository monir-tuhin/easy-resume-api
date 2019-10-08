const mongoose = require('mongoose');
const moment = require('moment');

const auth = require('../middleware/auth');
const { User } = require('../models/user');
const { Photograph } = require('../models/photograph');
const { SpecialSkill } = require('../models/specialSkill');
const { CareerSummary } = require('../models/careerSummary');
const { Address } = require('../models/address');
const { SocialLink } = require('../models/sociallink');
const { Employment } = require('../models/employment');
const { Training } = require('../models/training');
const { Academic } = require('../models/academic');
const { Reference } = require('../models/reference');

const express = require('express');
const router = express.Router();
const fs = require('fs');
const wkhtmltopdf = require('wkhtmltopdf');

const root = baseDirectory;
wkhtmltopdf.command = 'c:/Program Files (x86)/wkhtmltopdf/bin/wkhtmltopdf.exe';


let userInfo;
let pdfInfo;

// get current user
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    userInfo = user;
    res.send(user);
});

router.get('/getInfoById', async (req, res) => {
    const careerSummary = CareerSummary.find({user: req.query.user});
    const address = Address.find({user: req.query.user})
        .populate('post', ['postCode', 'postName'])
        .populate('upazila', 'upazilaName')
        .populate('district', 'districtName')
    const socialLink = SocialLink.find({ user: req.query.user});
    const specialSkill = SpecialSkill.find({ user: req.query.user});
    const employment = Employment.find({ user: req.query.user});
    const training = Training.find({ user: req.query.user});
    const education = Academic.find({ user: req.query.user})
        .populate('exam', 'exam');
    const reference = Reference.find({ user: req.query.user});
    const photograph = Photograph.find({ user: req.query.user});

    const [
        career, addressInfo, socialLinkInfo, skills, employmentInfo, trainingInfo, educationInfo, referenceInfo, photographInfo
    ] = await Promise.all([careerSummary.exec(), address.exec(), socialLink.exec(), specialSkill.exec(),
        employment.exec(), training.exec(), education.exec(), reference.exec(), photograph.exec() ]);

    pdfInfo = {career, addressInfo, socialLinkInfo, skills, employmentInfo, trainingInfo, educationInfo, referenceInfo, photographInfo};

    res.send({career, addressInfo, socialLinkInfo, skills, employmentInfo, trainingInfo, educationInfo, referenceInfo, photographInfo});
})


// render html
let endDate;
let totalExperience = 0;
router.get('/renderView', function(req, res) {
    totalExperience = 0;
    // console.log('another vals', Object.values(pdfInfo.employmentInfo));
    const empInfoList = Object.values(pdfInfo.employmentInfo);
    empInfoList.forEach( function(element) {
        const startDate = moment(element.jobPeriodFrom);

        if (element.currentlyWorking == true) {
            endDate = moment(new Date());
        } else {
            endDate = moment(element.jobPeriodTo);
        }

        const expTemp = endDate.diff(startDate, 'years', true);
        totalExperience += expTemp;
        totalExperience = Math.round(totalExperience * 10) / 10;
    })
    // console.log('totalExperience', totalExperience);

    res.render('demo', {
        rootDir: root,
        totalExperience: totalExperience,
        moment: moment,
        user: userInfo,
        careerSummary: Object.values(pdfInfo.career),
        address: Object.values(pdfInfo.addressInfo),
        socialLink: Object.values(pdfInfo.socialLinkInfo),
        skills: Object.values(pdfInfo.skills),
        employment: Object.values(pdfInfo.employmentInfo),
        training: Object.values(pdfInfo.trainingInfo),
        education: Object.values(pdfInfo.educationInfo),
        reference: Object.values(pdfInfo.referenceInfo),
        photograph: Object.values(pdfInfo.photographInfo),
    });
})



router.get('/showPdf', (req, res) => {
    wkhtmltopdf("http://localhost:3000/api/pdfGenerate/renderView", {
        output: 'user.pdf',
        pageSize: 'letter'
    });

    // res.sendFile(path.join(root + '/pdf/demo.pdf'));
    const file = root + '/user.pdf' ;
    res.sendFile(file);
})




















// get info
/*router.get('/userInfo', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});*/

// let addressInfo;

/*router.get('/getByUser', async (req, res) => {
    const address = await Address
        .find({user: req.query.user})
        .populate('post', ['postCode', 'postName'])
        .populate('upazila', 'upazilaName')
        .populate('district', 'districtName')
        .select('-__v')

    this.addressInfo = address[0];
    console.log('vals', this.addressInfo);
    // res.render('demo', {address: this.addressInfo[0]});
    res.send(address);

    return this.addressInfo;
});*/

/*
console.log(this.addressInfo);

function render(req, res) {
    res.render('demo', {address: this.addressInfo[0]});
}
*/



/*router.get('/showPdf', (req, res) => {
    wkhtmltopdf("http://localhost:3000/api/pdfGenerate/showPdf", {
        output: 'user.pdf',
        pageSize: 'letter'
    });

    // res.sendFile(path.join(root + '/pdf/demo.pdf'));
    const file = root + '/user.pdf' ;
    res.sendFile(file);
})*/




/*const demos = [
    {name: 'Mark'},
    {name: 'Rafallo'},
    {name: 'Samir'},
]*/

/*let vals;
router.get('/values', function(req, res) {
    const demos = [
        {name: 'Mark'},
        {name: 'Rafallo'},
        {name: 'Samir'},
    ]
    this.vals = demos;
    console.log('vals', this.vals);

    res.send(demos);
})
console.log('dddddddddd', this.vals);*/

/*router.get('/info', function(req, res) {
    res.render('demo', {names: demos});
    // res.render('demo', {name: a});
})*/

/*
router.get('/getByUser', async (req, res) => {
    const address = await Address
        .find({user: req.query.user})
        .populate('post', ['postCode', 'postName'])
        .populate('upazila', 'upazilaName')
        .populate('district', 'districtName')
        .select('-__v')

    this.addressInfo = address[0];
    console.log('vals', this.addressInfo);
    // res.render('demo', {address: this.addressInfo[0]});
    res.send(address);

    return this.addressInfo;
});*/



/*let userNames;

router.get('/getByUser', async (req, res) => {
    const address = await Address
        .find({user: req.query.user})
        .populate('post', ['postCode', 'postName'])
        .populate('upazila', 'upazilaName')
        .populate('district', 'districtName')
        .select('-__v')

    userNames = address[0];
    console.log('vals', userNames);
    // res.render('demo', {address: this.addressInfo[0]});
    res.send(address);
})


router.get('/renderView', function (req, res) {
    console.log('another userValues', userNames);
    res.render('demo', {
        address: userNames,
        rootDirectory: root
    });
})*/













module.exports = router;