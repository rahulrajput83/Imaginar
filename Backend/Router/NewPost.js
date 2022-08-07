const express = require('express');
const router = express.Router();
const NewPost = require('../Schema/Post');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dewxmgs8r',
    api_key: '243536242914815',
    api_secret: 'Q2YzGuRccpG6Xckof7JAqI1TGOA'
});

router.get('/post', (req, res) => {
    NewPost.find({})
    .then(data => {
        res.json({value: data})
    })
    .catch(error => {
        res.json({message: 'Error, Please try again...'})
    })


})

router.post('/post', (req, res) => {
    cloudinary.uploader.upload(req.body.img, (err, result) => {
        console.log(result, err)
    })
    /* const AddNewPost = new NewPost({
        title: req.body.title,
        img: req.body.img,
        date: Date.now(),
        author: req.body.author,
        authorName: req.body.authorName,
        visibility: 'Public',
        like: 'Not Added Yet',
        comment: [{
            NewComment: 'This is first Comment',
            user: req.body.author,
            fullName: req.body.authorName,
        }]
    })
    AddNewPost.save()
        .then(data => {
            res.json({message: 'Sussessfully Added'})
        })
        .catch(error => {
            res.json({message: 'Failed'})
        }) */


})

module.exports = router;