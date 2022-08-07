const express = require('express');
const NewComment = require('../Schema/Comments');
const router = express.Router();

router.get('/comments', (req, res) => {
    NewComment.find({})
    .then(data => {
        res.json({comments: data})
    })
    .catch(error => {
        res.json({message: 'Error, Please try again...'})
    })
});



router.post('/postComment', (req, res) => {
    const AddNewComment = new NewComment({
        postId: req.body.postid,
        date: Date.now(),
        author: req.body.author,
        authorName: req.body.authorName,
        comment: req.body.title
    })
    AddNewComment.save()
        .then(data => {
            res.json({ message: 'Posted...' })
        })
        .catch(error => {
            res.json({ message: 'Failed' })
        })
});

module.exports = router;