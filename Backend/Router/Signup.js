const express = require('express');
const router = express.Router();
const SignupUserSchema = require('../Schema/Signup')



router.post('/signup', (req, res) => {
    let data = []
    SignupUserSchema.find({})
        .then((result) => {
            data = result.filter(item => item.email === req.body.email)
            if (data.length >= 1) {
                res.json({message: 'User Already Registered...'})
            }
            else {
                const signUpUser = new SignupUserSchema({
                    fullName: req.body.fullName,
                    profileImg: 'Not Added Yet',
                    email: req.body.email,
                    password: req.body.password,
                    Joined: Date.now(),
                    Bio: 'Not Added Yet'
                })
                signUpUser.save()
                    .then(data => {
                        res.json({message: 'User Successfully Registered...'})
                    })
                    .catch(error => {
                        res.json({message: 'Error, Please try again...'})
                    })
            }
        })
        .catch((err) => res.send(err));


})

module.exports = router;