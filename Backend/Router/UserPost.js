const express = require('express');
const router = express.Router();
const NewPost = require('../Schema/Post');
const NewComment = require('../Schema/Comments');

router.post('/userpost', (req, res) => {
    NewPost.find({ author: req.body.id })
        .then(data => {
            res.json({ value: data })
        })
        .catch(error => {
            res.json({ message: 'Error, Please try again...' })
        })
});

router.post('/delete', (req, res) => {
    NewPost.deleteOne({ _id: req.body.id })
        .then(res.json({message: 'Successfully Deleted...'}))
        .catch(res.json({message: 'Error, Please try again...'}));
    NewComment.deleteMany({ postId: req.body.id })
        .then(console.log({message: 'Successfully Deleted...'}))
        .catch(console.log({message: 'Error, Please try again...'}));
    
});

module.exports = router;