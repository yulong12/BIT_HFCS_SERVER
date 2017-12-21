'use strict';
var express = require('express');
var router = express.Router();
var options = require("./myhfc/org3Config");
var mysql = require('../db/MYSQLconnection');

/* GET childregister listing. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    console.log('----------------------' + name);
    res.render('child_register')

  } else {
    res.render('need_login');
  }
});

//post
router.post('/', function (req, res, next) {

  //get req.information
  var child_sex = req.body.child_sex;
  var child_date = req.body.child_date;
  var mother_ID = req.body.mother_ID;
  var father_ID = req.body.father_ID;
  var hospital = req.body.hospital;
  var child_name = req.body.child_name;
  var child_weight = req.body.weight;
  var child_health = req.body.health;
  var child_place = req.body.place;
  console.log("-----get info----");


  var request = {
    chaincodeId: options.chaincode_id,
    fcn: 'createBirth',
    args: [father_ID, mother_ID, child_sex, child_date, hospital,child_place,child_weight,child_health,req.body.child_name],
    chainId: options.channel_id
  };

  console.log(request);
  var creatBirth = require('./myhfc/myhfcInvoke');

  creatBirth(request, function (str) {
    res.send(str);
  });


});

module.exports = router;
