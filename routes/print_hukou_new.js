var express = require('express');
var router = express.Router();

/* GET policeoffice listing. */
router.get('/', function (req, res, next) {
  // res.render('police_office');
  if (req.session.user) {

    if (req.query.id) {
      var options = require('./myhfc/org1Config');
      var myhfcQuery = require('./myhfc/myhfcQuery');
      var select_id = req.query.id;

      var request;
      request = {
        chaincodeId: options.chaincode_id,
        fcn: 'queryID',
        args: [select_id]
      };

      myhfcQuery(request, function (str) {
        var answer = JSON.parse(str);
        var hukou_detail = {};
        hukou_detail.身份证号 = answer.身份证号;
        hukou_detail.性别 = answer.性别;
        hukou_detail.姓名 = answer.姓名;
        hukou_detail.出生日期 = answer.出生日期;
        hukou_detail.婚姻状态 = answer.婚姻状态;
        hukou_detail.配偶姓名 = answer.配偶姓名;

        res.render()
      });
    }
    res.render('print_hukou_new');
  } else {
    res.render('need_login');
  }
});

module.exports = router;
