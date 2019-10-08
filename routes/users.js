const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
// const _ = require('loadash');
const {User, validate} = require('../models/user');
const express = require('express');
const router = express.Router();


// get current user
router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// save user
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('Authorization', token).send({
        id: user.id,
        name: user.name,
        email: user.email,
    });
});

// update user
router.put('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findByIdAndUpdate(req.query.id, {
        name: req.body.name,
        cvTitle: req.body.cvTitle,
        email: req.body.email,
        dob: req.body.dob,
        phone: req.body.phone,
        bloodGroup: req.body.bloodGroup,
    }, {new: true});

    if (!user) return res.status(404).send('The user with given id was not found');

    res.send({message: 'success'});

});

// delete user
router.delete('/', [auth, admin], async (req, res) => {
   const user = await User.findByIdAndRemove(req.query.id);

   if (!user) return res.status(404).send('The user with given id was not found');

    res.send({ message: 'success' });
});

// get users
router.get('/', async (req, res) => {
    const users = await User.find().select('-password').select('-__v').sort('name');
    res.send(users);
});

module.exports = router;