const {hash,compare} = require("bcryptjs");
const {executeSQL} = require("../DB/db");
const {sign, verify} = require("jsonwebtoken");
const Method = require("../Controller/method");
const {RegUser} = require("./User");
const { parse } = require('querystring');
const ACCESS_TOKEN_SECRECT = "Group20Project";

var RegUsers = new Map();

async function register(method){

    const body = method.getBody();

    const Title = body.Title;
    const First_Name = body.First_Name;
    const Last_Name = body.Last_Name;
    const Email = body.Email;
    const Telephone = body.Telephone;
    const Country = body.Country;
    const UserName = body.UserName;
    const Password = body.pass;
    const Date_of_Birth = body.Date_of_Birth;
    const Address = body.Address;

    try{
        const data = await executeSQL('SELECT UserName FROM registered_users WHERE UserName = ?',[UserName]);
        
        if(data[0]){

            return ("Error : Username already exists");
        
        }else{
            
            const hashedPassword = await hash(Password,10);
            await executeSQL(`CALL New_Registered_User(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,[Title,First_Name,Last_Name,Email,Telephone,Country,UserName,hashedPassword,Date_of_Birth,Address]);
            console.log(UserName + " successfuly added");
            return ("User added");
        }

    }catch(e){
        console.log(e);
        return ("Error");
        
        
    }      
}

async function login(method){

    const body = method.getBody();

    const Email = body.Email;
    const Password = body.Password;    
    
    try{

        const credential = await executeSQL('SELECT users.PID, UserName , Password, First_Name, Last_Name FROM users join registered_users on users.PID = registered_users.PID WHERE users.Email =?',[Email]);
        if(!credential[0])
            return ("Error : Invalid Email or Password");
        console.log(credential[0].Password);
        
        const status = await compare(Password,credential[0].Password);
        const PID = credential[0].PID;
        const UserName = credential[0].UserName;
        const fname = credential[0].First_Name;
        const lname = credential[0].Last_Name;
        
        if (status){

            var user = userFactory(PID,UserName,"Registered",fname,lname);

            if (RegUsers.has(PID)){

                RegUsers.delete(PID);

                await executeSQL('UPDATE session_table SET Session_id = ?, Last_used_time=? WHERE User_Id= ?',[user.sessionID,Number(new Date().getTime()),user.PID]);
                
                console.log("User Already logged in, logging out previous session");

            }else{

                try{
                    await executeSQL('INSERT INTO session_table VALUES (?,?,?)',[user.sessionID,user.PID,Number(new Date().getTime())]);
                }
                catch(e){
                    console.log(e);
                    console.log("Error");
                }
            }
    
            RegUsers.set(PID,user);

            const token = getAccessToken({sessionID:user.sessionID,PID:user.PID});
    
            //method.setToken(token,true,50000000);

            console.log(UserName + " Successfully Logged In !!!");
            method.res.header("token", token);
            return ({"token":token,"user":user});

        }else{
            console.log(e)
            return("Error");
        }

    }catch(e){
        console.log(e);
        return("Error");
    }

    
    
}

async function logout(user){

    RegUsers.delete(user.PID);

    try{
        await executeSQL('DELETE FROM session_table WHERE User_ID = ?',[user.PID]);
    }
    catch(e){
        console.log("database error");
    }
    
    return(user.UserName + " Successfully Logged Out !!!")

}



const getAccessToken = (data)=>{
    token = sign(data, ACCESS_TOKEN_SECRECT,{algorithm: "HS256",expiresIn:"500m"});
    console.log(token);
    return token;
};


var ExtractRegUser =async function(req,res, next){

    var method = new Method(req,res);

    var token = method.getToken();
    console.log(token);
    try{
        const {sessionID,PID} = verify(token,ACCESS_TOKEN_SECRECT);
        if(sessionID){
            
            var user = RegUsers.get(PID);
            console.log(user);
            await user.setLastUsedTime();
            req.user = user;

            const token = getAccessToken({sessionID:user.sessionID,PID:user.PID});
            res.header("token", token);
        }

        next();
    }
    catch(err){
        console.log(err);
        console.log("Invaild token"); //when token expires
        res.sendStatus(203);
    }
}

var UpdateSession =async function(req,res, next){

    var method = new Method(req,res);

    var token = method.getToken();
    console.log(token);
    
    console.log(token);
    try{
        const {sessionID,PID} = verify(token,ACCESS_TOKEN_SECRECT);
        if(sessionID){
            
            var user = RegUsers.get(PID);
            console.log(user);
            await user.setLastUsedTime();
            req.user = user;

            const token = getAccessToken({sessionID:user.sessionID,PID:user.PID});
            res.header("token", token);
        }

        next();
    }
    catch(err){
        //console.log(err);
        console.log("Invaild token or no token"); //when token expires
        next();
    }
}


var RestoreSession = async function(){

    console.log("Restoring Sessions");

    var data = null;

    try{
        data = await executeSQL('SELECT * FROM session_table LEFT JOIN users on session_table.User_Id = users.PID LEFT JOIN registered_users on session_table.User_Id = registered_users.PID');
    }catch(e){
        console.log(e);
        console.log("error");
    }
    //console.log(data);
   
    if (data == null){
        return;
    }
    for (const [key, value] of data.entries()){

        var user = userFactory(value.PID,value.UserName,"Registered",value.First_Name,value.Last_Name,value.Session_id,value.Last_used_time);
        RegUsers.set(value.PID,user)
    
    }

    ShowCurrentUsers();
}


function userFactory(pid,username,type,fname,lname,sessionID,lastUsedTime){
    var user = new RegUser(pid,username,type,fname,lname,sessionID,lastUsedTime);
    return(user)
}

function ShowCurrentUsers(){

    var CurrUsers = "Logged in: ";
    console.log(RegUsers.entries());
    for (const [key, value] of RegUsers.entries()){
        CurrUsers = CurrUsers + value.UserName + "  " ;
    }

    if (CurrUsers=="Logged in: "){
        console.log("Nobody Logged in");
    }else{
        console.log(CurrUsers);
    }
}

module.exports = {login,register,getAccessToken,ExtractRegUser,UpdateSession,RestoreSession,logout,ShowCurrentUsers};

