const express = require('express');
const router = express.Router();
const NewPost = require('../Schema/Post');

router.post('/userpost', (req, res) => {
    let gotData = [];
    NewPost.find({})
        .then(data => {
            gotData = data.filter(item => item._id === req.body.id)
            res.json({ value: gotData })
        })
        .catch(error => {
            res.json({ message: 'Error, Please try again...' })
        })
})

module.exports = router;