const {hash,compare} = require("bcryptjs");
const {executeSQL} = require("../DB/db");
const uniqid = require('uniqid');

class Guest{
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
    
    async changePass(CurrPassword,NewPassword){
        
        
        var credential,hashedPass,success;

        try{
            
            credential = await executeSQL(`SELECT username,password FROM user_table WHERE username = ?`,[this.UserName]); 
            hashedPass = credential[0].password;
            success = await compare(CurrPassword,hashedPass); 
        }
        catch(e){
            return ("Error");
        }   
        
        if(success){
            try{
                
                const hashedPassword = await hash(NewPassword,10);
                await executeSQL(`UPDATE user_table SET password = ? WHERE username = ?`,[hashedPassword,this.UserName]); 
                    
                return ("Password Changed");
               
            }catch(e){
                return(e);
            }   
        }else{
            return("Error");
        }
                
        
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
}

class RegUser extends Guest{
    constructor(UserName,type,fname,lname,sessionID,lastUsedTime){
        super(UserName,type,fname,lname,sessionID,lastUsedTime);        
    }
    async setLastUsedTime(){

        this.lastUsedTime = Number(new Date().getTime());
        try{
            await executeSQL(`UPDATE Session_table SET Last_used_time= ? WHERE User_Id = ?`,[Number(this.lastUsedTime),this.PID]);
        }catch(e){
            console.log("Error");
        }  
    }
}

module.exports = {Guest,RegUser};
