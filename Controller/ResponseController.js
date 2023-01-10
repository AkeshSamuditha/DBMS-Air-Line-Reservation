function ResponseHandler(status){
    console.log(status);
    if (!(status instanceof Object)){
        console.log("1");
        if (status.includes("Error")) {
          return "400";
        } else if (status.includes("AccessDenied")) {
          return "203";
        } else {
          return "200";
        }
    }
    else{
        console.log("2");
        return("200");
    }
}

module.exports =  {ResponseHandler};