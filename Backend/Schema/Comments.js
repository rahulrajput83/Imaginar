/* Imports Mongoose */
const express = require('express');
const mongoose = require('mongoose');

const NewCommentSchema = new mongoose.Schema({
    postId: String,
    date: Number,
    author: String,
    authorName: String,
    comment: String
});


const NewComment = mongoose.model("Comments", NewCommentSchema);

/* Export Module */
module.exports = NewComment;