const express = require('express');
const router = express.Router();
const NewPost = require('../Schema/Post');

router.post('/userpost', (req, res) => {
    NewPost.find({})
        .then(data => {
            const gotData = data.filter(item => item._id === req.body.id)
            res.json({ value: gotData })
        })
        .catch(error => {
            res.json({ message: 'Error, Please try again...' })
        })
})

module.exports = router;