const {hash,compare} = require("bcryptjs");
const {executeSQL} = require("../DB/db");
const {sign, verify} = require("jsonwebtoken");
const Method = require("../Controller/method");
const {RegUser, AdminUser} = require("./User");
const { parse } = require('querystring');
const ACCESS_TOKEN_SECRECT = "Group20Project";

var RegUsers = new Map();
var AdminUsers = new Map();

async function adminLogin(method){
    const body = method.getBody();
    console.log(body);
    const admin_name = body.Admin_Name;
    const password = body.Admin_Password;

    try{
        const credential = await executeSQL(`SELECT * FROM admins WHERE admin_name =?`,[admin_name]);
        if(!credential[0]) return "Error : Invalid admin_id or Password";
        
        const status = await compare(password,credential[0].admin_password);

        if(status){
          console.log("Password Matched");
          const Admin_name = credential[0].admin_name;
          const admin_id = credential[0].admin_id;
          var adminUser = userFactory(admin_id,Admin_name,"Admin",null,null,null,null);

          AdminUsers.set(admin_id, adminUser);

          const token = getAccessToken({
            admin_id: adminUser.Admin_id,
            admin_name: adminUser.UserName
          });
    
    
          console.log("Admin: "+adminUser.UserName + " Successfully Logged In !!!");
          method.res.header("token", token);
          return { token: token, user: adminUser };
        }
    }
    catch(e){
        console.log(e);
        return "Error : login failed";
    }
}

async function register(method) {
  const body = method.getBody();
  console.log(body);
  const Title = body.Title;
  const First_Name = body.First_Name;
  const Last_Name = body.Last_Name;
  const Email = body.Email;
  const Telephone = body.Telephone;
  const Country = body.Country;
  const UserName = body.UserName;
  const Password = body.Password;
  const Date_of_Birth = body.DOB;
  const Address = body.Address;

  try {
    const data = await executeSQL(
      "SELECT username FROM registered_users WHERE UserName = ?",
      [UserName]
    );

    if (data[0]) {
      return "Error : Username already exists";
    } else {
      const hashedPassword = await hash(Password, 10);
      await executeSQL(
        `CALL New_Registered_User(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          Title,
          First_Name,
          Last_Name,
          Email,
          Telephone,
          Country,
          UserName,
          hashedPassword,
          Date_of_Birth,
          Address,
        ]
      );
      console.log(UserName + " successfuly added");
      
      const PID = await executeSQL(
        "SELECT users.PID FROM users WHERE users.email =?",
        [Email]
      ); 
      //same as login code
      var user = userFactory(PID, UserName, "Registered", First_Name, Last_Name);

      if (RegUsers.has(PID)) {
        RegUsers.delete(PID);

        await executeSQL(
          "UPDATE session_table SET session_id = ?, last_used_time=? WHERE user_Id= ?",
          [user.sessionID, Number(new Date().getTime()), user.PID]
        );

        console.log("User Already logged in, logging out previous session");
      } else {
        try {
          await executeSQL("INSERT INTO session_table VALUES (?,?,?)", [
            user.sessionID,
            user.PID,
            Number(new Date().getTime()),
          ]);
        } catch (e) {
          console.log(e);
          console.log("Error");
        }
      }

      RegUsers.set(PID, user);

      const token = getAccessToken({
        sessionID: user.sessionID,
        PID: user.PID,
      })
      console.log(UserName + " Successfully Logged In !!!");
      method.res.header("token", token);
      return { token: token, user: user };
    }
  } catch (e) {
    console.log(e);
    return "Error";
  }
}

async function login(method) {
  const body = method.getBody();

  const Email = body.Email;
  const Password = body.Password;

  try {
    const credential = await executeSQL(
      "SELECT users.PID, username, password, first_Name, last_Name FROM users JOIN registered_users on users.PID = registered_users.PID WHERE users.email =?",
      [Email]
    );
    // console.log(method.body);
    if (!credential[0]) return "Error : Invalid Email or Password";
    // console.log(credential[0].Password);

    const status = await compare(Password, credential[0].password);
    const PID = credential[0].PID;
    const UserName = credential[0].username;
    const fname = credential[0].first_Name;
    const lname = credential[0].last_Name;

    if (status) {
      console.log("Password Matched");
      var user = userFactory(PID, UserName, "Registered", fname, lname);

      if (RegUsers.has(PID)) {
        RegUsers.delete(PID);

        await executeSQL(
          "UPDATE session_table SET session_id = ?, last_used_time=? WHERE user_Id= ?",
          [user.sessionID, Number(new Date().getTime()), user.PID]
        );

        console.log("User Already logged in, logging out previous session");
      } else {
        try {
          await executeSQL("INSERT INTO session_table VALUES (?,?,?)", [
            user.sessionID,
            user.PID,
            Number(new Date().getTime()),
          ]);
        } catch (e) {
          console.log(e);
          console.log("Error");
        }
      }

      RegUsers.set(PID, user);

      const token = getAccessToken({
        sessionID: user.sessionID,
        PID: user.PID,
      });

      //method.setToken(token,true,50000000);

      console.log(UserName + " Successfully Logged In !!!");
      method.res.header("token", token);
      return { token: token, user: user };
    } else {
      console.log(e);
      return "Error";
    }
  } catch (e) {
    console.log(e);
    return "Error";
  }
}

async function logout(user){

  RegUsers.delete(user.PID);

  try {
    await executeSQL('DELETE FROM session_table WHERE user_iD = ?', [user.PID]);
  }
    catch(e){
    console.log("database error");
  }
  console.log(user.UserName + " Successfully Logged Out !!!");
    return(user.UserName + " Successfully Logged Out !!!")

}

async function adminLogout(user) {
  try {
    AdminUsers.delete(user.admin_id);
  } catch (e) {
    console.log("'logout error'");
  }
  return "Admin :" + user.UserName + " Successfully Logged Out !!!";
}



const getAccessToken = (data)=>{
  token = sign(data, ACCESS_TOKEN_SECRECT,{algorithm: "HS256",expiresIn:"500m"});
  // console.log(token);
  return token;
};


var ExtractRegUser =async function(req,res, next){

  var method = new Method(req,res);

  var token = method.getToken();
  // console.log(token);
  try {
    const { sessionID, PID } = verify(token, ACCESS_TOKEN_SECRECT);
    if (sessionID) {

      var user = RegUsers.get(PID);
      // console.log(user);
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

var ExtractAdminUser =async function(req,res, next){

  var method = new Method(req,res);
  console.log("Ane plyn bn ynna", req.headers);
  var token = method.getToken();
  console.log(token);
  try{
      const {admin_id,admin_name} = verify(token,ACCESS_TOKEN_SECRECT);
      if(admin_id){
          
          var adminUser = AdminUsers.get(admin_id);
          console.log(adminUser);
          await adminUser.setLastUsedTime();
          req.user = adminUser;

          const token = getAccessToken({admin_id:adminUser.admin_id,admin_name:adminUser.admin_name});
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
    // console.log(token);
    try{
        const {sessionID,PID} = verify(token,ACCESS_TOKEN_SECRECT);
        if(sessionID){
            
            var user = RegUsers.get(PID);
            // console.log(user);
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

  try {
    data = await executeSQL('SELECT * FROM session_table LEFT JOIN users ON session_table.User_Id = users.PID LEFT JOIN registered_users ON session_table.user_Id = registered_users.PID');
  } catch (e) {
    console.log(e);
    console.log("error");
  }
  //console.log(data);

    if (data == null){
    return;
  }
    for (const [key, value] of data.entries()){

        var user = userFactory(value.PID,value.username,"Registered",value.first_name,value.last_name,value.session_id,value.last_used_time);
        RegUsers.set(value.PID,user)

  }

  ShowCurrentUsers();
}


function userFactory(pid,username,type,fname,lname,sessionID,lastUsedTime){
  if (type=="Registered"){
    var user = new RegUser(pid,username,type,fname,lname,sessionID,lastUsedTime);
  }else if (type=="Admin"){
    var user = new AdminUser(pid,username,type);
  }
  else{
    console.log("invalid user type");
  }
  
  return(user);
}

function ShowCurrentUsers(){

  var CurrUsers = "Logged in: ";
  console.log(RegUsers.entries());
    for (const [key, value] of RegUsers.entries()){
        CurrUsers = CurrUsers + value.username + "  " ;
  }

    if (CurrUsers=="Logged in: "){
    console.log("Nobody Logged in");
    }else{
    console.log(CurrUsers);
  }
}

module.exports = {adminLogin,login,register,getAccessToken,ExtractAdminUser,ExtractRegUser,UpdateSession,RestoreSession,adminLogout,logout,ShowCurrentUsers};
