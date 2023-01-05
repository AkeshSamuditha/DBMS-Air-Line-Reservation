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

router.get('/getReservation',async function(req, res){

    var method = new Method(req,res);
    
    const statusANDData = await uController.getReservation(method,req.user);
    console.log(statusANDData);
    
    res.status(ResponseHandler(statusANDData)).send(statusANDData);

});

////////////////////////////////////////////////////// GET Requests/////////////////////////////////////////////////////
// Request No: 01
router.get('/getFlights',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getFlights(method);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

/* Request No: 02 
Description: Given a flight no, all passengers travelling in it (next immediate flight) below age 18, above age 18
Request Type: GET
Request URL: 
Response: 
SQL Query:  */

/* 
Request No: 03
Description: Given a date range, number of passengers travelling to a given destination
Request Type: GET
Request URL: 
Response: What is given in Response
SQL Query: 
    SELECT Sum(t) FROM passengers
    WHERE Destination_ID = 'JFK' AND Date_of_travel BETWEEN '2022-01-01' AND '2022-01-31' */


/*Request No: 04
Description: Given a date range, number of bookings by each passenger type
Request Type: GET
Request URL: 
Response: What is given in Response
SQL Query: SQL query to Access DB */

//Request No: 06
router.get('/getRevenueByAircraftType',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getRevenueByAircraftType(method);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});



// Request No: 09
router.get('/AvailableSeats',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getAvailableSeats(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

// Request No: 10
router.get('/BookFlight',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getBookFlight(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});


// Request No: 12
router.get('/SeatPrice',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getSeatPrice(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});



// Request No: 14
router.get('/FlightStatus',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getFlightStatus(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

// Request No: 15
router.get('/Destinations',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getDestinations(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

////////////////////////////////////////////////////// POST Requests/////////////////////////////////////////////////////





// Request No: 11
router.post('/CancelBooking',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.postCancelBooking(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

// Request No: 13
router.post('/GuestUserLogin',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.postGuestUserSubmission(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});
////////////////////////////////////////////////////// UPDATE Requests/////////////////////////////////////////////////////









////////////////////////////////////////////////////// DELETE Requests/////////////////////////////////////////////////////

module.exports = router;








/* Request No: 05
Description: Given origin and destination, all past flights, states, passenger counts data
Request Type: GET/POST/DELETE/UPDATE 
Request URL: 
Response: What is given in Response
SQL Query: SQL query to Access DB */





