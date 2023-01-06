const {hash,compare} = require("bcryptjs");
const {executeSQL} = require("../DB/db");
const uniqid = require('uniqid');

class RegUser{
    constructor(PID,UserName,type,fname,lname,sessionID,lastUsedTime){
        this.PID = PID;
        this.UserName = UserName;
        this.userTP = type;

        if(sessionID){
            this.sessionID = sessionID;
        }
        else{
            this.sessionID = uniqid();
        }
        if(lastUsedTime){
            this.lastUsedTime = lastUsedTime;
        }
        else{
            this.lastUsedTime = Number(new Date().getTime());
        }
        if(fname){
            this.fname = fname;
        }
        else{
            this.fname = null;
        }

        if(lname){
            this.lname = lname;
        }
        else{
            this.lname = null;
        }
    }

    getType(){
        return(this.userTP);
    }
    
    

    async getAstrObj(id){

        var astrObj = new spaceOBJ();
        const status = await astrObj.setDataByDB(id);

        if (status != "Error"){
            return(astrObj);
        }else{
            return("Error");
        }
    }

    async setLastUsedTime(){

        this.lastUsedTime = Number(new Date().getTime());
        try{
            await executeSQL(`UPDATE Session_table SET Last_used_time= ? WHERE User_Id = ?`,[Number(this.lastUsedTime),this.PID]);
        }catch(e){
            console.log("Error");
        }  
    }

    async changePass(CurrPassword,NewPassword){
        
        var credential,hashedPass,success;

        try{
            
            credential = await executeSQL(`SELECT UserName,Password FROM registered_users WHERE PID = ?`,[this.PID]); 
            hashedPass = credential[0].password;
            success = await compare(CurrPassword,hashedPass); 
        }
        catch(e){
            return ("Error");
        }   
        
        if(success){
            try{
                
                const hashedPassword = await hash(NewPassword,10);
                await executeSQL(`UPDATE registered_users SET Password = ? WHERE PID = ?`,[hashedPassword,this.PID]); 
                    
                return ("Password Changed");
               
            }catch(e){
                return(e);
            }   
        }else{
            return("Error");
        }  
    }

    async getBookedFlightDetails(From,To,From_Date,To_Date){
        try{
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getPastFlights(PID){
        try{
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    
}


module.exports = {RegUser};
