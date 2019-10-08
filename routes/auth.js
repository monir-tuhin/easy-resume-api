const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const bcrypt = require('bcrypt');
// const _ = require('loadash');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

// let userInfo;

// login user
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send({
        id: user._id,
        token: token
    });

    // userInfo = user;

    /*const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'), {
        expiresIn: 86400 //expires in 24 hours
    });*/
});

// validation
function validate(user) {
    const schema = {
        email: Joi.string().min(5).max(100).required().email(),
        password: Joi.string().min(5).max(255).required()
    }

    return Joi.validate(user, schema)
}


module.exports = router;