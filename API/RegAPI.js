var express = require('express');

const router = express.Router();

const {ResponseHandler} = require("../Controller/ResponseController");
const Method = require("../Controller/method");
const UserController = require("../Controller/UserControl");
const {ExtractRegUser,logout} = require("../MODEL/Authentication");

router.use(ExtractRegUser)

const uController = new UserController();

////////////////////////////////////////////////////// GET Requests////////////////////////////////////////////////////
// Request No: 16
router.get('/BookedFlightDetails',async function(req, res){
    
    const status = await uController.getBookedFlightDetails(req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

// Request No: 17
router.get('/PastFlights',async function(req, res){
    
    const status = await uController.RGetPastFlights(req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

router.get('/RegUserDetails',async function(req, res){
        
        const status = await uController.getRegUserDetails(req.user);
        console.log(status);
        
        res.status(ResponseHandler(status)).send(status);
    
});



////////////////////////////////////////////////////// POST Requests/////////////////////////////////////////////////////


////////////////////////////////////////////////////// UPDATE Requests/////////////////////////////////////////////////////
// change password

/* router.update('/changePass',async function(req, res){
    console.log("register");
    var method = new Method(req,res);
    
    const status = await register(method);
    
    res.status(ResponseHandler(status)).send(status);

}); */





////////////////////////////////////////////////////// DELETE Requests/////////////////////////////////////////////////////
router.delete('/logout',async function(req, res){
    
    //var method = new Method(req,res);
    
    const status = await logout(req.user);

    console.log(status);
    
    res.send(ResponseHandler(status));
    
});


module.exports = router;
