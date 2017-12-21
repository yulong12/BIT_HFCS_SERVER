var express = require('express');
var router = express.Router();
var options = require("./myhfc/org1Config");
var mysql = require("../db/MYSQLconnection");

/* GET hospital listing. */
router.get('/', function (req, res, next) {

  if (req.session.user) {
    var residence_detail = {};

    if (req.query.regist_num) {
      var query_create = "select * from create_check where check_id = \"" + req.query.regist_num + "\"";
      mysql.executeQuery(query_create, function (status, result) {
        residence_detail.check_id = result.rows[0].check_id;
        residence_detail.name = result.rows[0].name;
        residence_detail.father_name = result.rows[0].father_name;
        residence_detail.father_id = result.rows[0].father_id;
        residence_detail.mother_name = result.rows[0].mother_name;
        residence_detail.mother_id = result.rows[0].mother_id;
        residence_detail.marry_cert = result.rows[0].marry_cert;
        residence_detail.birth_id = result.rows[0].birth_id;
        residence_detail.birth_date = result.rows[0].birth_date;
        residence_detail.sex = result.rows[0].sex;
        residence_detail.hospital_id = result.rows[0].hospital_id;
        residence_detail.checkflag = result.rows[0].checkflag;

        res.render('add_page', {
          residence_detail: residence_detail,
          regist_num: req.query.regist_num
        });

      });
    }
    else {
      res.render('add_page', {
        residence_detail: residence_detail,
        regist_num: null
      });
    }
  } else {
    res.render('need_login');
  }
});

//post
router.post('/', function (req, res, next) {
  var createHuman = require('./myhfc/myhfcInvoke');
  var request = {
    chaincodeId: options.chaincode_id,
    fcn: 'createHuman',
    args: [req.body.regist_num, req.body.flag],
    chainId: options.channel_id
  };
  createHuman(request, function (str) {
    console.log(str);
    if (str.Reason) {
      res.send(str.Reason);
    }
    else {
      var query_checked = "update create_check set if_managed = 1, if_look = 1 WHERE check_id = \"" + req.body.regist_num + "\"";
      mysql.executeQuery(query_checked, function (status, result) {

      })
    }
  });

});

module.exports = router;
