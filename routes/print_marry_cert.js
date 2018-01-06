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
      marry_cert_detail.marry_cert = answer.marry_cert;
      marry_cert_detail.state = answer.state;
      marry_cert_detail.husband_name = answer.husband_name;
      marry_cert_detail.husband_id = answer.husband_id;
      marry_cert_detail.wife_name = answer.wife_name;
      marry_cert_detail.wife_id = answer.wife_id;
      marry_cert_detail.date = answer.date;

      var query_cert_photo = "select photo from marry_card where marry_cert = \"" + answer.marry_cert + "\";";
      mysql.executeQuery(query_cert_photo, function (status, cert_photo_result) {
        var update_if_look = "update marry_check set if_look = 1;";
        mysql.executeQuery(update_if_look, function (status, result) {
          var marry_photo = cert_photo_result.rows[0].photo;
          res.render('print_marry_cert', {
            marry_cert_detail: marry_cert_detail,
            marry_photo: marry_photo
          })
        });
      });
    });
  } else {
    var marry_cert_detail = {};
    marry_cert_detail.marry_cert = "";
    marry_cert_detail.state = "";
    marry_cert_detail.husband_name = "";
    marry_cert_detail.husband_id = "";
    marry_cert_detail.wife_name = "";
    marry_cert_detail.wife_id = "";
    marry_cert_detail.date = "";
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