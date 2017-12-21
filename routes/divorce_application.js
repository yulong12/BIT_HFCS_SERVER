var express = require('express');
var router = express.Router();
var fs = require('fs');
var options = require("./myhfc/org2Config");
const crypto = require('crypto');
const hash1 = crypto.createHash('md5');
const hash2 = crypto.createHash('md5');
const hash3 = crypto.createHash('md5');
var mysql = require("../db/MYSQLconnection");

/* GET divorce_application listing. */
router.get('/', function (req, res, next) {
  // res.render('marry_query');
  // if (req.session.user){
  //     var user=req.session.user;
  //     var name=user.name;
  res.render('divorce_application');
  // }else {
  //     res.render('need_login');
  // }
});

router.post('/', function (req, res, next) {
  var men_id = req.body.men_id;
  var women_id = req.body.women_id;
  var request = {
    chaincodeId: options.chaincode_id,
    fcn: 'divorceCheck',
    args: [men_id, women_id],
    chainId: options.channel_id
  };
  console.log(men_id);
  var marry = require('./myhfc/myhfcInvoke');

  marry(request, function (str) {
    console.log(str);
    var check_id = str.审查编号;
    var husband_name = str.丈夫姓名;
    var husband_id = str.丈夫身份证号;
    var wife_name = str.妻子姓名;
    var wife_id = str.妻子身份证号;
    var marry_cert = str.结婚证书编号;
    var check0 = str.判断结果;
    var check = check0[0] + check0[1] + check0[2] + check0[3] + check0[4]

    var man_photo1 = req.body.man_photo;
    var man_photo = man_photo1.replace(/^data:image\/\w+;base64,/, "");
    var hash = hash1.update(man_photo);
    var man_hashcode = hash.digest('hex');

    var woman_photo1 = req.body.woman_photo;
    var woman_photo = woman_photo1.replace(/^data:image\/\w+;base64,/, "");
    var hash = hash2.update(woman_photo);
    var mwoman_hashcode = hash.digest('hex');

    var marry_book1 = req.body.marry_book;
    var marry_book = marry_book1.replace(/^data:image\/\w+;base64,/, "");
    var hash = hash3.update(marry_book);
    var book_hashcode = hash.digest('hex');

    console.log("---------------------man_photo---" + man_photo);
    console.log("---------------------woman_photo---" + woman_photo);
    console.log("---------------------marry_book---" + marry_book);
    var query = "insert into divorce_check(check_id ,husband_name,husband_id ,wife_name,wife_id ,marry_cert ,check_manage,man_photo1,man_hashcode,woman_photo1,mwoman_hashcode,marry_book1,book_hashcode,flag)values('" + check_id + "','" + husband_name + "','" + husband_id + "','" + wife_name + "','" + wife_id + "','" + marry_cert + "','" + check + "','" + man_photo + "','" + man_hashcode + "','" + woman_photo + "','" + mwoman_hashcode + "','" + marry_book + "','" + book_hashcode + "','1');";
    console.log("============" + query);
    mysql.executeQuery(query, function (status, result) {

    })
  })

});

module.exports = router;
