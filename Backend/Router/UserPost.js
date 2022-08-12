const express = require('express');
const router = express.Router();
const NewPost = require('../Schema/Post');

router.post('/userpost', (req, res) => {
    NewPost.find({ _id: req.body.id })
        .then(data => {
            res.json({ value: data })
        })
        .catch(error => {
            res.json({ message: 'Error, Please try again...' })
        })
})

module.exports = router;