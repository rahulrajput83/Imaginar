/* Imports Mongoose */
const express = require('express');
const mongoose = require('mongoose');

const NewPostSchema = new mongoose.Schema({
    title: String,
    img: String,
    date: Number,
    author: String,
    visibility: String,
    authorName: String,
});


const NewPost = mongoose.model("Posts", NewPostSchema);

/* Export Module */
module.exports = NewPost;