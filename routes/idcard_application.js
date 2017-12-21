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
    res.render('idcard_application');
  } else {
    res.render('need_login');
  }
});
router.post('/',function (req, res, next) {
   var id_Num=req.body.id_num;
   var photo=req.body.pic;
   console.log("=========id_Num==========="+id_Num);
    console.log("=========per_img==========="+photo);
    var base64Data = photo.replace(/^data:image\/\w+;base64,/, "");
    var hash1=crypto.createHash('md5');
   var hash= hash1.update(base64Data);
   var hashcode=hash.digest('hex');
   var query="insert into human(id,photo,hashcode,if_managed,if_look)values('"+id_Num+"','"+base64Data+"','"+hashcode+"',1,1"+");";
   console.log("===========query========="+query);

    mysql.executeQuery(query,function (status, result) {

    });
    res.render('idcard_application');
});
module.exports = router;
