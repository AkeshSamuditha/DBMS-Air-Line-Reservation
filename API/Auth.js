var express = require('express');
var router = express.Router();

const {ResponseHandler} = require("../Controller/ResponseController");
const Method = require("../Controller/method");

const { login, register, logout } = require("../MODEL/Authentication");

//Request No: 07
router.post("/login", async function (req, res) {
  console.log("login");
  var method = new Method(req, res);

  var status = await login(method);

  console.log(status);
  res.send({ message: ResponseHandler(status) });
});

// Request No: 08
router.post("/Register", async function (req, res) {
  console.log("register");
  var method = new Method(req, res);

  const status = await register(method);
  console.log(status);
  res.send({ message: ResponseHandler(status) });
});

// Request No: 08
router.post("/logout", async function (req, res) {
  console.log("logout");
  var method = new Method(req, res);

  const status = await logout(user);
  // console.log(status);
  res.status({ message: ResponseHandler(status) });
});

module.exports = router;
