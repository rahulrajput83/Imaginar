const express = require('express');
const router = express.Router();
const SignupUserSchema = require('../Schema/Signup')


router.post('/signin', (req, res) => {
    let data = []
    SignupUserSchema.find({})
        .then((result) => {
            data = result.filter(item => item.email === req.body.email)
            if (data.length >= 1) {
                data.map(item => {
                    if (item.password === req.body.password) {
                        res.json({ message: 'Successfully Login', value: item })

                    }
                    else {
                        res.json({ message: 'Wrong Password...' })
                    }
                })

            }
            else {
                res.json({ message: 'User Not Registered...' })
            }
        })
        .catch((err) => res.send(err));
})


module.exports = router;