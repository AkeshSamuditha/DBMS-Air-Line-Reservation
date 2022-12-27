var express = require('express');

const router = express.Router();

const {ResponseHandler} = require("../Controller/ResponseController");
const Method = require("../Controller/method");
const UserController = require("../Controller/UserControl");

uController = new UserController();

/////////////////////sample////////////////////////

router.get('/getReservation',async function(req, res){

    var method = new Method(req,res);
    
    const statusANDData = await uController.getReservation(method,req.user);
    console.log(statusANDData);
    
    res.status(ResponseHandler(statusANDData)).send(statusANDData);

});
router.get('/getFlights',async function(req, res){

    var method = new Method(req,res);
    
    const statusANDData = await uController.getFlights(method,req.user);
    console.log(statusANDData);
    
    res.status(ResponseHandler(statusANDData)).send(statusANDData);

});








////////////////////////////////////////////////////// GET Requests/////////////////////////////////////////////////////
router.get('/getFlights',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getFlights(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});




////////////////////////////////////////////////////// POST Requests/////////////////////////////////////////////////////






////////////////////////////////////////////////////// UPDATE Requests/////////////////////////////////////////////////////









////////////////////////////////////////////////////// DELETE Requests/////////////////////////////////////////////////////

module.exports = router;
