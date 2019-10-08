const { SocialLink, validate } = require('../models/sociallink');
const express = require('express');
const router = express.Router();


// save sociallink
router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    /*let socialLink = await SocialLink.findOne({link: req.body.link});
    if (socialLink) return res.status(400).send('Link already exist');*/

    socialLink = new SocialLink ({
        socialSite: req.body.socialSite,
        link: req.body.link,
        user: req.body.user,
    })

    await socialLink.save();

    res.send({message: 'success'});
})


// update sociallink
router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    /*let socialLink = await SocialLink.findOne({link: req.body.link});
    if (socialLink) return res.status(400).send('Link already exist');*/

    socialLink = await SocialLink.findByIdAndUpdate(req.query.id, {
        socialSite: req.body.socialSite,
        link: req.body.link,
        user: req.body.user,
    }, { new: true });

    if (!socialLink) return res.status(404).send('The social link with given id was not found');

    res.send({ message: 'success' });
})

// get sociallink by user
router.get('/getByUser', async (req, res) => {
    const socialLink = await SocialLink
        .find({user: req.query.user})
        .select('-__v')

    res.send(socialLink);
});

// delete sociallink
router.delete('/', async (req, res) => {
    const socialLink = await SocialLink.findByIdAndRemove(req.query.id);

    if (!socialLink) return res.status(404).send('The social link with given id was not found');

    res.send({ message: 'success' });
});

// get socialLink
router.get('/', async (req, res) => {
    const socialLink = await SocialLink
        .find()
        .select('-__v')

    res.send(socialLink);
});


module.exports = router;