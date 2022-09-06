/* Imports Mongoose */
const express = require('express')
const mongoose = require('mongoose');

const SignupSchema = new mongoose.Schema({
    fullName: String,
    profileImg: String,
    email: String,
    password: String,
    Joined: Number,
    bioData: String,
    currentCity: String,
    homeTown: String,
    selectRelation: String,
    website: String,
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
});


const SignupUserSchema = mongoose.model("User Data", SignupSchema);

/* Export Module */
module.exports = SignupUserSchema;