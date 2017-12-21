var express = require('express');
var router = express.Router();
var mysql=require('../db/MYSQLconnection');
var crypto=require('crypto');

/* GET marryquery listing. */
router.get('/', function (req, res, next) {
  // res.render('marry_query');
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    res.render('securityCard_application');
  } else {
    res.render('need_login');
  }
});
router.post('/',function (req, res, next) {
  var id_num=req.body.id_num;
  var pic=req.body.pic;
  var print=req.body.print;
  console.log("======id_num========"+id_num);
  console.log("=======pic======"+pic);
  console.log("=======print======="+print);

    var print_img = print.replace(/^data:image\/\w+;base64,/, "");
    var pic_img = pic.replace(/^data:image\/\w+;base64,/, "");

    var hash1=crypto.createHash('md5');
   var print_img_1= hash1.update(print_img);
   var print_hashcode=print_img1.digest('hex');

    var hash2=crypto.createHash('md5');
    var pic_img_1=hash2.update(pic_img);
    var pic_hashcode=hash2.digest('hex');

var insert="insert into security_card(id,new_photo,new_hashcode,print_photo,print_hashcode,if_managed,if_look)values()"
    res.render('securityCard_application');
});
module.exports = router;
