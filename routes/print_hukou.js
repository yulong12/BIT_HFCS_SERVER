var express = require('express');
var router = express.Router();
var mysql = require("../db/MYSQLconnection");

router.get('/', function (req, res, next) {
  if (req.session.user) {

    if (req.query.id) {
      var options = require('./myhfc/org1Config');
      var myhfcQuery = require('./myhfc/myhfcQuery');
      var select_id = req.query.id;

      var request;
      request = {
        chaincodeId: options.chaincode_id,
        fcn: 'queryCreatCheck',
        args: [select_id]
      };

      myhfcQuery(request, function (str) {
        var answer = JSON.parse(str);
        var hukou_detail = {};
        hukou_detail.id = answer.id;
        hukou_detail.sex = answer.sex;
        hukou_detail.name = answer.name;
        hukou_detail.date = answer.date;
        hukou_detail.marrystate = answer.marrystate;

        var update_if_look = "update create_check set if_look = 1;";
        mysql.executeQuery(update_if_look, function (status, result) {
          res.render('print_hukou', {
            hukou_detail: hukou_detail
          })
        });

      });
    } else {
      var hukou_detail = {};
      hukou_detail.id = "";
      hukou_detail.sex = "";
      hukou_detail.name = "";
      hukou_detail.date = "";
      hukou_detail.marrystate = "";
      res.render('print_hukou', {
        hukou_detail: hukou_detail
      })
    }
  } else {
    res.render('need_login');
  }
});

module.exports = router;