var express = require('express');
var options = require("./myhfc/org2Config");
var router = express.Router();
var mysql = require("../db/MYSQLconnection");

/* GET marryregister listing. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    if (req.query.regist_num) {
      console.log(req.query.regist_num);
      res.render('marry_register');
    }
    res.render('marry_register');
  } else {
    res.render('need_login');
  }

});

//post
router.post('/', function (req, res, next) {
  var marry = require('./myhfc/myhfcInvoke');
  var request = {
    chaincodeId: options.chaincode_id,
    fcn: 'marry',
    args: [regist_num, "1", date],
    chainId: options.channel_id
  };
  marry(request, function (str) {
    res.send(JSON.parse(str));
  });

});

module.exports = router;
