var express = require('express');
var router = express.Router();
var options = require('./myhfc/org1Config');
var mysql = require('../db/MYSQLconnection');
/* GET register page. */
router.get('/', function (req, res, next) {
  // res.render('register');
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    res.render('register');
  } else {
    res.render('need_login');
  }
});
router.post('/', function (req, res, next) {
  var parent_id = req.body.parent_id;
  var child_name = req.body.child_name;
  console.log(typeof(parent_id));
  var request = {
    chaincodeId: options.chaincode_id,
    fcn: 'createCheck',
    args: [parent_id, "1", child_name],
    chainId: options.channel_id
  };
  var createHuman = require('./myhfc/myhfcInvoke');

  createHuman(request, function (str) {

    var check_id = str.checkid;
    var name = str.name;
    var father_name = str.fathername;
    var father_id = str.fatherid;
    var mother_name = str.mothername;
    var mother_id = str.motherid;
    var marry_cert = str.marry_cert;
    var birth_id = str.birthid;
    var birth_date = str.birthdate;
    var sex = str.sex;
    var hospital_id = str.hosptialid;
    var checks = str.check;
    var check = checks[0] + checks[1] + checks[2] + checks[3] + checks[4] + checks[5] + checks[6] + checks[7] + checks[8];

    var query = "insert into create_check(check_id,name,father_name,father_id,mother_name,mother_id,marry_cert,birth_id,birth_date,sex,hospital_id,checkflag,if_managed,if_ar,if_look)values('" + check_id + "','" + name + "','" + father_name + "','" + father_id + "','" + mother_name + "','" + mother_id + "','" + marry_cert + "','" + birth_id + "','" + birth_date + "','" + sex + "','" + hospital_id + "','" + check + "',0,0,0" + ");";
    console.log(str);
    console.log("===========================" + query);
    mysql.executeQuery(query, function (status, result) {
      res.send("OK");
    });
  });

});

module.exports = router;
