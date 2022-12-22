function ResponseHandler(status){
    if (status=="Error"){
        return("400");
    }else if(status == "AccessDenied"){
        return("203");
    }else{
        return("200");
    }
}

module.exports =  {ResponseHandler};