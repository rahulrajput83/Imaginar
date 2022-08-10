const express = require('express');
const router = express.Router();
const NewPost = require('../Schema/Post');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
});

router.get('/post', (req, res) => {
    NewPost.find({})
        .then(data => {
            res.json({ value: data })
        })
        .catch(error => {
            res.json({ message: 'Error, Please try again...' })
        })


})

const AddTitleImg = (req, result) => {
    const AddNewPost = new NewPost({
        title: req.body.title,
        img: result.secure_url,
        date: Date.now(),
        author: req.body.author,
        authorName: req.body.authorName,
        visibility: 'Public',
    })
    AddNewPost.save()
        .then(() => {
            return 'Successfully Added'
        })
        .catch(() => {
            return 'Failed'
        })
}
const AddImg = (req, result) => {
    const AddNewPost = new NewPost({
        img: result.secure_url,
        date: Date.now(),
        author: req.body.author,
        authorName: req.body.authorName,
        visibility: 'Public',
    })
    AddNewPost.save()
        .then(() => {
            return 'Successfully Added'
        })
        .catch(() => {
            return 'Failed'
        })
}
const AddTitle = (req, result) => {
    const AddNewPost = new NewPost({
        title: req.body.title,
        date: Date.now(),
        author: req.body.author,
        authorName: req.body.authorName,
        visibility: 'Public',
    })
    AddNewPost.save()
        .then(() => {
            return 'Successfully Added'
        })
        .catch(() => {
            return 'Failed'
        })
}

router.post('/post', (req, res) => {
    if (req.body.img && req.body.title) {
        cloudinary.uploader.upload(req.body.img)
            .then(result => {
                const alert = AddTitleImg(req, result)
                res.json({ message: alert });
                console.log('Img and Title')
            })
            .catch(err => {
                res.json({ message: 'Failed' });
            });
    }
    else if (req.body.img && !req.body.title) {
        cloudinary.uploader.upload(req.body.img)
            .then(result => {
                const alert = AddImg(req, result)
                res.json({ message: alert });
                console.log('Only Img')
            })
            .catch(err => {
                res.json({ message: 'Failed' });
            });
    }
    else {
        const alert = AddTitle(req)
        res.json({ message: alert });
        console.log('Only Text');
    }
})

module.exports = router;