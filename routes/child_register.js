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
  var mother_name = req.body.mother_name;
  var mother_age = req.body.mother_age;
  var father_name = req.body.father_name;
  var father_age = req.body.father_age;
  var child_name = req.body.child_name;
  var child_weight = req.body.weight;
  var child_health = req.body.health;

  var mother_insert = "insert into mother_table(mother_id,mother_name,mother_age)values(" + "'" + mother_ID + "','" + mother_name + "'," + mother_age + ");";
  mysql.executeQuery(mother_insert, function () {

  });
  var father_insert = "insert into father_table(father_id,father_name,father_age)values('" + father_ID + "','" + father_name + "'," + father_age + ");";
  var new_insert = "insert into new_table(new_id,new_name,new_weight,new_health)values(" + "'11111','" + child_name + "'," + child_weight + ",'" + child_health + "');";
  mysql.executeQuery(father_insert, function () {

  });
  mysql.executeQuery(new_insert, function () {

  });
  console.log("mother insert--------" + mother_insert);
  console.log("father_insert-----" + father_insert);
  console.log("new_insert-----" + new_insert);

  var request = {
    chaincodeId: options.chaincode_id,
    fcn: 'createBirth',
    args: [father_ID, mother_ID, child_sex, child_date, hospital],
    chainId: options.channel_id
  };

  console.log(request);
  var creatBirth = require('./myhfc/myhfcInvoke');

  creatBirth(request, function (str) {
    res.send(JSON.parse(str));
  });


});

module.exports = router;
