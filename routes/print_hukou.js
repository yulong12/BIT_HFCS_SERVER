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
        hukou_detail.身份证号 = answer.身份证号;
        hukou_detail.性别 = answer.性别;
        hukou_detail.姓名 = answer.姓名;
        hukou_detail.出生日期 = answer.出生日期;
        hukou_detail.婚姻状态 = answer.婚姻状态;

        var update_if_look = "update create_check set if_look = 1;";
        mysql.executeQuery(update_if_look, function (status, result) {
          res.render('print_hukou', {
            hukou_detail: hukou_detail
          })
        });

      });
    }
  } else {
    res.render('need_login');
  }
});

module.exports = router;