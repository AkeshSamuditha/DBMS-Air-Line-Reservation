var express = require('express');
const dotenv = require('dotenv');

var apiController = require("./API/API");
var authController = require("./API/Auth");

var {RestoreSession} = require("./MODEL/Authentication");

var app = express();
dotenv.config();

RestoreSession();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT");
    next();
});

app.use('/api',apiController);
app.use('/auth',authController);

app.listen(process.env.port);
