var express = require('express');
var router = express.Router();

const { ResponseHandler } = require("../../Controller/ResponseController");
const Method = require("../../Controller/method");
const UserController = require("../../Controller/UserControl");

const {ExtractAdminUser,adminLogout} = require("../../MODEL/Authentication");
const uController = new UserController();
router.use(ExtractAdminUser);

// Request No: 01
router.get('/getPassengersByFlight',async function(req, res){

    var method = new Method(req,res);

    const status = await uController.getPassengersByFlight(method,req.user);
    
    res.status(ResponseHandler(status)).send(status);

});

// Request No: 02
router.get('/getPassengersByDestination',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getPassengersByDestination(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});
 
// Request No: 03
router.get('/getBookingsByPassengerType',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getBookingsByPassengerType(method,req.user);
    
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

// Request No: 04
router.get('/getPastFlights',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getPastFlights(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});


//Request No: 05
router.get('/getRevenueByAircraftType',async function(req, res){

  var method = new Method(req,res);
    
    const status = await uController.getRevenueByAircraftType(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

router.delete('/logout',async function(req, res){
    
    //var method = new Method(req,res);
    
    const status = await adminLogout(req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);
    
});


//Request NO : NEW
router.post("/newflight", async function (req, res) {
  var method = new Method(req, res);

  const status = await uController.newFlight(method, req.user);
  console.log(status);

  res.status(ResponseHandler(status)).send(status);
});

//Request NO : NEW
router.get("/passengersInTransit", async function (req, res) {
  var method = new Method(req, res);

  const status = await uController.passengersInTransit(method, req.user);
  console.log(status);

  res.status(ResponseHandler(status)).send(status);
});

router.get("/flightsInAir", async function (req, res) {
  var method = new Method(req, res);

  const status = await uController.flightsInAir(method, req.user);
  console.log(status);

  res.status(ResponseHandler(status)).send(status);
});




module.exports = router;
