var express = require('express');
var router = express.Router();
var options = require('./myhfc/org1Config');
var mysql=require('../db/MYSQLconnection');
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
  }
  var createHuman = require('./myhfc/myhfcInvoke');

  createHuman(request, function (str) {

        var check_id= str.审查编号;
        var name=str.姓名;
    var father_name = str.父亲姓名;
        var father_id=str.父亲身份证号;
       var mother_name= str.母亲姓名;
      var mother_id=str.母亲身份证号;
      var marry_cert=str.父母结婚证书编号;
     var birth_id= str.出生证书编号;
      var birth_date=str.出生日期;
      var sex=str.性别;
      var hospital_id=str.接生机构;
     var checks=str.判断结果;
     var check=checks[0]+checks[1]+checks[2]+checks[3]+checks[4]+checks[5]+checks[6]+checks[7]+checks[8];

     var query="insert into create_check(check_id,name,father_name,father_id,mother_name,mother_id,marry_cert,birth_id,birth_date,sex,hospital_id,checkflag,if_managed,if_ar,if_look)values('"+check_id+"','"+name+"','"+father_name+"','"+father_id+"','"+mother_name+"','"+mother_id+"','"+marry_cert+"','"+birth_id+"','"+birth_date+"','"+sex+"','"+hospital_id+"','"+check+"',0,0,0"+");";
    console.log(str);
    console.log("==========================="+query);
      mysql.executeQuery(query,function (status, result) {

          console.log("---result-"+result);
          console.log("---status-"+status);
      });
  });

});

module.exports = router;
