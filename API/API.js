var express = require('express');

const router = express.Router();
var regApiController = require("./RegAPI");

const {ResponseHandler} = require("../Controller/ResponseController");
const Method = require("../Controller/method");
const UserController = require("../Controller/UserControl");
const {UpdateSession,logout} = require("../MODEL/Authentication");

router.use('/registered',regApiController);

router.use(UpdateSession);
const uController = new UserController();

/////////////////////sample////////////////////////
/* 
router.get('/getReservation',async function(req, res){

    var method = new Method(req,res);
    
    const statusANDData = await uController.getReservation(method);
    console.log(statusANDData);
    
    res.status(ResponseHandler(statusANDData)).send(statusANDData);

}); */

////////////////////////////////////////////////////// GET Requests/////////////////////////////////////////////////////


// Request No: 08
router.post('/getFlights',async function(req, res){

    var method = new Method(req,res);
    // console.log("method body", req);
    const status = await uController.getFlights(method);
    // console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});



// Request No: 09
router.get('/AvailableSeats',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getAvailableSeats(method);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});




// Request No: 12
router.get('/SeatPrice',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getSeatPrice(method);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});



// Request No: 14
router.get('/FlightStatus',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getFlightStatus(method);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

// Request No: 15
router.get('/Destinations',async function(req, res){
    
    const status = await uController.getDestinations();
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

////////////////////////////////////////////////////// POST Requests/////////////////////////////////////////////////////

// Request No: 10
router.post('/BookFlight',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.postBookFlight(method);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});



// Request No: 11
router.post('/CancelBooking',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.postCancelBooking(method);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

// Request No: 13
router.post('/GuestUserLogin',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.postGuestUserSubmission(method);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});
////////////////////////////////////////////////////// UPDATE Requests/////////////////////////////////////////////////////









////////////////////////////////////////////////////// DELETE Requests/////////////////////////////////////////////////////

module.exports = router;


