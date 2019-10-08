const { Photograph, validate } = require('../models/photograph');
const multer = require('multer');
// const upload = multer({ dest: "uploads" });
const express = require('express');
const router = express.Router();
const fs = require('fs')

const root = baseDirectory;


// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

/*const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};*/

const upload = multer({
    storage: storage,
    /*    limits: {
            fileSize: 1024 * 1024 * 5
        },
        fileFilter: fileFilter*/
});

// save photograph
router.post('/', upload.single('photo'), async (req, res) => {
    console.log(req.file);

    req.body.userImage = req.file.filename;

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // const filename = req.file.filename;
    // const path = req.file.path;
    
   const photograph = new Photograph({
        userImage: req.body.userImage,
        user: req.body.user,
    })

    await photograph.save();

    res.send({ message: 'success' });

})

// get photo by user
router.get('/getPhotoByUser', async (req, res) => {
    // console.log(req);
    const photograph = await Photograph
        .find({user: req.query.user})
        .select('-__v -user')

    // const fileName = root + '/uploads/' + photograph[0].userImage;
    const fileName = root +'/public/uploads/' + photograph[0].userImage;
    res.sendFile(fileName)
});

// get photo info by user
router.get('/getPhotoInfoByUser', async (req, res) => {
    // console.log(req);
    const photograph = await Photograph
        .find({user: req.query.user})
        .select('-__v -user')

    res.send(photograph)
});

// delete photo
router.delete('/', async (req, res) => {
    const photograph = await Photograph.findByIdAndRemove(req.query.id);
    console.log('photograph:',photograph);

   if (photograph != null) {
       try {
           fs.unlinkSync(root + '/public/uploads/' + photograph.userImage)
           //file removed
           console.log('file removed');
       } catch(err) {
           console.error(err)
       }
   }

    if (!photograph) return res.status(404).send('The post with given id was not found');

    res.send({ message: 'success' });
});



module.exports = router;