var express = require('express');
var router = express.Router();
var mysql = require("../db/MYSQLconnection");

router.get('/', function (req, res, next) {
  if (req.session.user) {

    if (req.query.cert_id) {
      var options = require('./myhfc/org2Config');
      var myhfcQuery = require('./myhfc/myhfcQuery');
      var select_id = req.query.cert_id;

      var request;
      request = {
        chaincodeId: options.chaincode_id,
        fcn: 'queryID',
        args: [select_id]
      };

      myhfcQuery(request, function (str) {
        var answer = JSON.parse(str);
        var marry_cert_detail = {};
        marry_cert_detail.marry_cert = answer.marry_cert;
        marry_cert_detail.state = answer.state;
        marry_cert_detail.husband_name = answer.husband_name;
        marry_cert_detail.husband_id = answer.husband_id;
        marry_cert_detail.wife_name = answer.wife_name;
        marry_cert_detail.wife_id = answer.wife_id;
        marry_cert_detail.date = answer.date;

        var query_cert_photo = "select photo from marry_card where marry_cert = \"" + answer.marry_cert + "\";";
        mysql.executeQuery(query_cert_photo, function (status, result) {
          marry_photo = result.rows[0].photo;
          res.render('print_marry_cert_new', {
            marry_cert_detail: marry_cert_detail,
            marry_photo: marry_photo
          })
        });

      });
    }
  } else {
    res.render('need_login');
  }
});

module.exports = router;