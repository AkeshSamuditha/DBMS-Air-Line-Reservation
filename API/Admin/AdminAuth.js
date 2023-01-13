var express = require('express');
var router = express.Router();
var adminApiController = require("./AdminAPI")

const { ResponseHandler } = require("../../Controller/ResponseController");
const Method = require("../../Controller/method");

const { adminLogin } = require("../../MODEL/Authentication");


router.use('/api',adminApiController);

router.post('/login', async function (req, res) {
  console.log("Admin login......");
  var method = new Method(req, res);

  var status = await adminLogin(method);

  console.log("login status:", status);
  res.status(ResponseHandler(status)).send(status);
});


module.exports = router;
