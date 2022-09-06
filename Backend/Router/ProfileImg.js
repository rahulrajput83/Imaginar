const express = require('express');
const router = express.Router();
const SignupUserSchema = require('../Schema/Signup')
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});


router.post('/profileimg', (req, res) => {
    cloudinary.uploader.upload(req.body.img)
        .then(result => {
            SignupUserSchema.updateOne({ _id: req.body.id }, { $set: { 'profileImg': result.secure_url } })
                .then(res.json({ message: 'Uploaded...' }))
                .catch(res.json({ message: 'Error, Please try again...' }));
        })
        .catch(err => {
            res.json({ message: 'Failed' });
        });
})

router.post('/editaccount', (req, res) => {
    SignupUserSchema.updateOne({ _id: req.body._id },
        {
            $set: {
                'bioData': req.body.bioData,
                'currentCity': req.body.currentCity,
                'homeTown': req.body.homeTown,
                'selectRelation': req.body.selectRelation,
                'website': req.body.website,
                'facebook': req.body.facebook,
                'instagram': req.body.instagram,
                'twitter': req.body.twitter,
                'linkedin': req.body.linkedin,
            }
        })
        .then(res.json({ message: 'Uploaded...' }))
        .catch(res.json({ message: 'Error, Please try again...' }));
})

module.exports = router;