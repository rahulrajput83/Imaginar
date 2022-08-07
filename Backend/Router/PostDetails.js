const express = require('express');
const router = express.Router();
const NewPost = require('../Schema/Post');



router.post('/postdetails', (req, res) => {
    NewPost.findOne({ _id: req.body.id })
        .then(data => {
            res.json({ value: data })
        })
        .catch(error => {
            res.json({ message: 'Error, Please try again...' })
        })


})

module.exports = router;