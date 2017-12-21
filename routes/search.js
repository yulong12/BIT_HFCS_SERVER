var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('search');
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    res.render('search');
  } else {
    res.render('need_login');
  }
});
router.post('/', function (req, res, next) {

    var options = require('./myhfc/org1Config');
    var num=req.body.num;

    var request;
    request = {
        chaincodeId: options.chaincode_id,
        fcn: 'queryID',
        args: [num]
    };

    var myhfcQuery = require('./myhfc/myhfcQuery');


    myhfcQuery(request, function (str) {
     var shen_fen_id= str.身份证号;
     var sex=   str.性别;
     var name= str.姓名;
      var date=str.出生日期;
      var father_name=str.父亲姓名;
        var father_id=str.父亲身份证号;
        var mother_name=str.母亲姓名;
        var mother_id=str.母亲身份证号;
        var marry_state=str.婚姻状态;
        var spouse_name=str.配偶姓名;
      var spouse_id=  str.配偶身份证号;
       var marry_cert= str.结婚证书;
        var child_ids=str.子女身份证号;
        var child_names=str.子女姓名;
        var new_chids=str.子女出生证明;
        res.send(JSON.parse(str));
      console.log("=================="+str);
    });


});
module.exports = router;
