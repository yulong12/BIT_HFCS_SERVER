var express = require('express');
var options = require("./myhfc/org2Config");
var router = express.Router();
var fs = require('fs');


var mysql = require("../db/MYSQLconnection");

/* GET marryquery listing. */
router.get('/', function (req, res, next) {
  // res.render('marry_query');
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    res.render('marry_application');
  } else {
    res.render('need_login');
  }

});


router.post('/', function (req, res, next) {
  var men_id = req.body.men_id;
  var women_id = req.body.women_id;

  var request = {
    chaincodeId: options.chaincode_id,
    fcn: 'marryCheck',
    args: [men_id, women_id],
    chainId: options.channel_id
  };
  console.log(men_id);
  var marry = require('./myhfc/myhfcInvoke');

  marry(request, function (str) {
    const crypto = require('crypto');
    const hash1 = crypto.createHash('md5');
    console.log(typeof (str));
    console.log("-----from-------")
    console.log("_________str____---" + str);
    var checkID = str.checkid;
    var Husband_Name = str.husband_name;
    var Husband_ID = str.husband_id;
    var HusbandState = str.husbandstate;
    var Wife_Name = str.wife_name;
    var Wife_ID = str.wife_id;
    var WifeState = str.wifestate;
    var check_out = str.check;
    var check = check_out[0] + check_out[1] + check_out[2] + check_out[3] + check_out[4] + check_out[5];
    var photo = req.body.marry_photo;
    var base64Data = photo.replace(/^data:image\/\w+;base64,/, "");
    var hash = hash1.update(base64Data);
    var hashcode = hash.digest('hex');
    console.log("---------------------------hash--" + hashcode);
    console.log("------------base64Data-----" + base64Data);
    //if_managed =1代表已处理，if_look=1代表已查看,if_ar=1代表接受
    var query = "insert into marry_check(check_id,husband_name,husband_id, husband_state,wife_name,wife_id,wife_state,checkflag,photo,hashcode,if_managed ,if_ar,if_look )values('" + checkID + "','" + Husband_Name + "','" + Husband_ID + "','" + HusbandState + "','" + Wife_Name + "','" + Wife_ID + "','" + WifeState + "','" + check + "','" + base64Data + "','" + hashcode + "',"+"0,"+"0,"+"0"+");";

    console.log("check----" + query);
    mysql.executeQuery(query, function (status, result) {
      res.send("OK");
    });

  });
});

module.exports = router;
