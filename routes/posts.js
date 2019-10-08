const { Post, validate } = require('../models/post');
const express = require('express');
const router = express.Router();


// save post
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let postCode = req.body.postCode;
    if (postCode.length != 4) {
        return res.status(400).send('Post code must be 4 characters long');
    }

    postCode = await Post.findOne({ postCode: req.body.postCode });
    if (postCode) return res.status(400).send('Post code already exist');

  const post = new Post({
        postCode: req.body.postCode,
        postName: req.body.postName,
        upazila: req.body.upazila,
        district: req.body.district
    })

    await post.save();

    res.send({ message: 'success' });
})

// update post
router.put('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let postCode = req.body.postCode;
    if (postCode.length !== 4) {
        return res.status(400).send('Post code must be 4 characters long');
    }

    postCode = await Post.findOne({ postCode: req.body.postCode });

    if (postCode != null) {
        if (postCode.id == req.query.id) {
            post = await Post.findByIdAndUpdate(req.query.id, {
                postCode: req.body.postCode,
                postName: req.body.postName,
                upazila: req.body.upazila,
                district: req.body.district
            }, { new: true });
        } else {
            res.status(400).send('Post code already exist');
        }

    }

    if (postCode == null) {
        post = await Post.findByIdAndUpdate(req.query.id, {
            postCode: req.body.postCode,
            postName: req.body.postName,
            upazila: req.body.upazila,
            district: req.body.district
        }, { new: true });
    }

    if (!post) return res.status(404).send('The post with given id was not found');

    res.send({ message: 'success' });
})

// delete post
router.delete('/', async (req, res) => {
    const post = await Post.findByIdAndRemove(req.query.id);

    if (!post) return res.status(404).send('The post with given id was not found');

    res.send({ message: 'success' });
});

// get posts
router.get('/', async (req, res) => {
    const posts = await Post
        .find()
        .populate('upazila', 'upazilaName')
        .populate('district', 'districtName')
        .select('-__v')
        .sort('district.districtName');

    res.send(posts);
});

// get post by district and upazila
router.get('/getByDistrictAndUpazila', async (req, res) => {
    // console.log(req.query);
    const posts = await Post.find({district:req.query.district, upazila: req.query.upazila})
        .select('-__v')

    res.send(posts);
});




module.exports = router;