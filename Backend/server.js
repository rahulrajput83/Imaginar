require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routesSignup = require('./Router/Signup');
const routesSignin = require('./Router/Signin');
const routeAccount = require('./Router/Account');
const routeNewPost = require('./Router/NewPost');
const routeComment = require('./Router/Comment')
const routePostDetails = require('./Router/PostDetails');
const fileUpload = require('express-fileupload');

/* Initializes express app. */
const app = express();
app.use(express.json({limit: '50mb'}));

const DEFAULT_PORT = 2850;

const server = app.listen(process.env.PORT || DEFAULT_PORT, function () {
    // Log a message to indicate that the server was started correctly
    const port = server.address().port;
    console.log(`Server listening on port ${port}!`);
});

mongoose.connect(process.env.connectionString)
    .then(() => {
        console.log('Mongoose Connected')
    })
    .catch(() => {
        console.log('Failed');
    })


/* Cors Header to allows data access to other domain. Frontend url */
app.use(function (req, res, next) {
    const allowedOrigin = ['https://rahulrajput83-imaginar.vercel.app', 'http://localhost:3000'];
    const origin = res.header.origin;
    if(allowedOrigin.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    const originReq = req.header.origin;
    if(allowedOrigin.includes(origin)) {
        req.header("Access-Control-Allow-Origin", originReq);
    }
    
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization")
    req.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
    req.header("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization")
    next();
});
app.use(fileUpload({
    useTempFiles: true
}));

app.use('/', routesSignup);
app.use('/', routesSignin);
app.use('/', routeAccount);
app.use('/', routeNewPost);
app.use('/', routePostDetails);
app.use('/', routeComment);

app.get('/', function(req, res) {
    res.send('hello')
});