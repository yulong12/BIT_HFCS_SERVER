var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

  if (req.session.user) {
    if (req.query.birth_id) {
      var options = require('./myhfc/org1Config');
      var myhfcQuery = require('./myhfc/myhfcQuery');
      var select_id = req.query.birth_id;

      var request;
      request = {
        chaincodeId: options.chaincode_id,
        fcn: 'queryID',
        args: [select_id]
      };

      myhfcQuery(request, function (str) {
        var answer = JSON.parse(str);
        var birth_detail = {};
        birth_detail.新生儿姓名 = answer.新生儿姓名;
        birth_detail.出生证书编号 = answer.出生证书编号;
        birth_detail.出生日期 = answer.出生日期;
        birth_detail.性别 = answer.性别;
        birth_detail.体重 = answer.体重;
        birth_detail.健康情况 = answer.健康情况;
        birth_detail.出生地 = answer.出生地;
        birth_detail.父亲姓名 = answer.父亲姓名;
        birth_detail.父亲身份证号 = answer.父亲身份证号;
        birth_detail.母亲姓名 = answer.母亲姓名;
        birth_detail.母亲身份证号 = answer.母亲身份证号;
        birth_detail.接生机构 = answer.接生机构;
        res.render('print_birthcard_new', {
          birth_detail: birth_detail
        })
      });
    }
  } else {
    res.render('need_login');
  }
});

module.exports = router;