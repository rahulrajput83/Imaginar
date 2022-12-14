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
    NewComment.deleteMany({ postId: req.body.id })
        .then(console.log({ message: 'Successfully Deleted...' }))
        .catch(err => console.log('Error, Please try again...', err));
    NewPost.deleteOne({ _id: req.body.id })
        .then(res.json({ message: 'Successfully Deleted...' }))
        .catch(res.json({ message: 'Error, Please try again...' }));

});

router.post('/update', (req, res) => {
    NewPost.updateOne({ _id: req.body.id }, { $set: { 'title': req.body.title } })
        .then(res.json({ message: 'Updated...' }))
        .catch(res.json({ message: 'Error, Please try again...' }));
})

module.exports = router;