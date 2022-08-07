const express = require('express');
const router = express.Router();
const SignupUserSchema = require('../Schema/Signup')



router.post('/account', (req, res) => {
    SignupUserSchema.findOne({ _id: req.body.id})
    .then(data => {
        res.json({detail: data})
    })
    .catch(error => {
        res.json({message: 'Error, Please try again...'})
    })


})

module.exports = router;