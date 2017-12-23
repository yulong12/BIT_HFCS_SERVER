var express = require('express');
var router = express.Router();
var mysql = require("../db/MYSQLconnection");

router.get('/', function (req, res, next) {
  if (req.session.user) {
  if (req.query.cert_id) {
    var options = require('./myhfc/org1Config');
    var myhfcQuery = require('./myhfc/myhfcQuery');
    var select_id = req.query.cert_id;

    var request;
    request = {
      chaincodeId: options.chaincode_id,
      fcn: 'queryMarryCheck',
      args: [select_id]
    };

    myhfcQuery(request, function (str) {
      var answer = JSON.parse(str);

      console.log(answer);

      var marry_cert_detail = {};
      marry_cert_detail.证书编号 = answer.证书编号;
      marry_cert_detail.状态 = answer.状态;
      marry_cert_detail.丈夫姓名 = answer.丈夫姓名;
      marry_cert_detail.丈夫身份证号 = answer.丈夫身份证号;
      marry_cert_detail.妻子姓名 = answer.妻子姓名;
      marry_cert_detail.妻子身份证号 = answer.妻子身份证号;
      marry_cert_detail.登记日期 = answer.登记日期;

      var query_cert_photo = "select photo from marry_card where marry_cert = \"" + answer.证书编号 + "\";";
      mysql.executeQuery(query_cert_photo, function (status, result) {
        marry_photo = result.rows[0].photo;
        res.render('print_marry_cert', {
          marry_cert_detail: marry_cert_detail,
          marry_photo: marry_photo
        })
      });

    });
  } else {
    var marry_cert_detail = {};
    marry_cert_detail.证书编号 = "";
    marry_cert_detail.状态 = "";
    marry_cert_detail.丈夫姓名 = "";
    marry_cert_detail.丈夫身份证号 = "";
    marry_cert_detail.妻子姓名 = "";
    marry_cert_detail.妻子身份证号 = "";
    marry_cert_detail.登记日期 = "";
    res.render('print_marry_cert', {
      marry_cert_detail: marry_cert_detail,
      marry_photo: null
    });
  }

  } else {
    res.render('need_login');
  }
});

module.exports = router;