var express = require('express');
var router = express.Router();

const {ResponseHandler} = require("../Controller/ResponseController");
const Method = require("../Controller/method");

const {login,register,ExtractUser} = require("../MODEL/Authentication");

router.post('/login',async function(req, res){
    console.log("login");
    var method = new Method(req,res);
    
    var status = await login(method);

    res.status(ResponseHandler(status)).send(status);

});

router.post('/register',async function(req, res){
    console.log("register");
    var method = new Method(req,res);
    
    const status = await register(method);
    
    res.status(ResponseHandler(status)).send(status);

});

module.exports = router;


/* 


const session = require('express-session');

router.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    saveUninitialized: false
}));

router.use((req, res, next) => {
    console.log(`${req.method} - ${req.url}`);
    next();
});

router.post('/login',async function(req, res){

    var method = new Method(req,res);
    
    var status = login(method);
    //res.status(ResponseHandler(status)).send(status);

});
 */