const express = require('express');
const router = express.Router();
const SignupUserSchema = require('../Schema/Signup')

router.post('/profileimg', (req, res) => {
    SignupUserSchema.updateOne({ _id: req.body.id }, { $set: { 'profileImg': req.body.img } })
    .then(res.json({ message: 'Uploaded...' }))
    .catch(res.json({ message: 'Error, Please try again...' }));
})

module.exports = router;