const {hash,compare} = require("bcryptjs");
const {executeSQL} = require("../DB/db");
const {sign, verify} = require("jsonwebtoken");
const Method = require("../Controller/method");
const {Guest,RegUser} = require("./User");
const { parse } = require('querystring');
const ACCESS_TOKEN_SECRECT = "Group20Project";

var RegUsers = new Map();

async function register(method){

    const body = method.getBody();

    const UserName = body.UserName;
    const Password = body.pass;
    const Age = body.Age;
    const Address = body.Address;

    const Title = body.Title;
    const First_Name = body.First_Name;
    const Last_Name = body.Last_Name;
    const Email = body.Email;
    const Telephone = body.Telephone;
    const Country = body.Country;

    try{
        const data = await executeSQL('SELECT UserName FROM registered_users WHERE UserName = ?',[UserName]);
        
        if(data[0]){

            return ("Error : Username already exists");
        
        }else{
            
            const hashedPassword = await hash(Password,10);
            await executeSQL('INSERT INTO users SET ?',{Title:Title,First_Name:First_Name,Last_Name:Last_Name,Email:Email,Telephone:Telephone,Country:Country});
            const PID = await executeSQL('SELECT PID FROM users WHERE Email = ?',[Email]);
            await executeSQL('INSERT INTO registered_users SET ?',{PID:PID[0].PID, UserName:UserName,Password:hashedPassword,Age:Age,Address:Address});
            
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

    const username = body.UserName;
    const password = body.pass;    
    
    try{

        const credential = await executeSQL('SELECT users.PID, UserName , Password, First_Name, Last_Name FROM users left join registered_users on users.PID = registered_users.PID WHERE registered_users.username =?',[username]);
        console.log(credential[0].Password);
        const status = await compare(password,credential[0].Password);
        const PID = credential[0].PID;
        const UserName = credential[0].UserName;
        const fname = credential[0].First_Name;
        const lname = credential[0].Last_Name;
        
        if (status){

            var user = userFactory(PID,UserName,"Registered",fname,lname);

            if (RegUsers.has(PID)){

                RegUsers.delete(username);

                await executeSQL('UPDATE Session_table SET session_id = ?, Last_used_time=? WHERE User_Id= ?',[user.sessionID,Number(new Date().getTime()),user.PID]);
                
                console.log("User Already Exists, logging out previous users");

            }else{

                try{
                    await executeSQL('INSERT INTO Session_table VALUES (?,?,?)',[user.sessionID,user.PID,Number(new Date().getTime())]);
                }
                catch(e){
                    console.log(e);
                    console.log("Error");
                }
            }
    
            RegUsers.set(PID,user);

    
            const token = getAccessToken({sessionID:user.sessionID,PID:user.PID});
    
            //method.setToken(token,true,50000000);

            console.log(username + " Successfully Logged In !!!");

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

    RegUsers.delete(user.UserName);

    try{
        await executeSQL('DELETE FROM Session_table WHERE User_ID = ?',[user.PID]);
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


var ExtractUser =async function(req,res, next){

    var method = new Method(req,res);

    var token = method.getToken();
    console.log(token);
    try{
        const {sessionID,PID} = verify(token,ACCESS_TOKEN_SECRECT);
        if(sessionID){
            
            var user = RegUsers.get(PID);
            console.log(PID);
            await user.setLastUsedTime();
            req.user = user;
        }

        next();
    }
    catch(err){
        console.log(err);
        console.log("Invaild token"); //when token expires
        res.sendStatus(203);
    }
}


var RestoreSession = async function(){

    console.log("Restoring Sessions");

    var data = null;

    try{
        data = await executeSQL('SELECT * FROM Session_table LEFT JOIN users on Session_table.User_Id = users.PID LEFT JOIN registered_users on Session_table.User_Id = registered_users.PID');
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
    if(type=="Guest"){
        var user = new Guest(pid,username,type,fname,lname,sessionID,lastUsedTime);
    }else if (type=="Registered"){
        var user = new RegUser(pid,username,type,fname,lname,sessionID,lastUsedTime);
    }
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

module.exports = {login,register,getAccessToken,ExtractUser,RestoreSession,logout,ShowCurrentUsers};
