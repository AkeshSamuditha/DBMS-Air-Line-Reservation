var express = require('express');
var router = express.Router();

const { ResponseHandler } = require("../Controller/ResponseController");
const Method = require("../Controller/method");

const { login, register, logout } = require("../MODEL/Authentication");

//Request No: 06
router.post("/login", async function (req, res) {
  console.log("login......");
  var method = new Method(req, res);

  var status = await login(method);

  console.log("login status:", status);
  res.send({ status: ResponseHandler(status), data: status });
});

// Request No: 07
router.post("/Register", async function (req, res) {
  console.log("registering.....");
  var method = new Method(req, res);

  const status = await register(method);
  console.log("register status:", status);
  res.send({ status: ResponseHandler(status), data: status });
});


module.exports = router;