const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();


// reset password
router.put('/forgotPassword', async (req, res) => {
    let url;

    let user = await User.findOne({email: req.body.sendEmail});
    if (!user) return res.status(400).send('User not found !');

    if (user) {
        let token;
        token  = crypto.randomBytes(20).toString('hex');
        console.log('token', token);

        user = await User.findByIdAndUpdate(user._id, {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 86400000
        }, {new: true});
        res.send(user);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'panuahmed@gmail.com',
                pass: '11011990'
            }
        });
        url='http://localhost:4205/resetPassword?token=' + token;
        const mailOptions = {
            from: 'panuahmed@gmail.com',
            to: req.body.sendEmail,
            subject: 'Password Reset',
            html: '<h3>Dear '+ user.name +',</h3><p>You requested for a password reset, kindly use this <a href="'+ url +'">link</a> to reset your password</p>'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.send({ message: 'success' });
            }
        });
    }
})


// forgot password
router.put('/resetPasswordByToken', async (req, res) => {
    let user = await User.findOne({resetPasswordToken: req.body.resetPasswordToken});
    if (!user) return res.status(400).send('Password reset token is invalid or has expired !');

    user = await User.findByIdAndUpdate(user._id, {
        password: req.body.password,
    }, {new: true});

    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.send({message: 'success'});

})


module.exports = router;
