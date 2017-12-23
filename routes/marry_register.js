var express = require('express');
var options = require("./myhfc/org2Config");
var router = express.Router();
var mysql = require("../db/MYSQLconnection");

/* GET marryregister listing. */
router.get('/', function (req, res, next) {
  var human_detail = {};

  if (req.session.user) {
    if (req.query.regist_num) {
      console.log(req.query.regist_num);
      var query_marry = "select * from marry_check where check_id = \"" + req.query.regist_num + "\"";
      mysql.executeQuery(query_marry, function (status, result) {
        human_detail.husband_name = result.rows[0].husband_name;
        human_detail.husband_id = result.rows[0].husband_id;
        human_detail.husband_state = result.rows[0].husband_state;
        human_detail.wife_name = result.rows[0].wife_name;
        human_detail.wife_id = result.rows[0].wife_id;
        human_detail.wife_state = result.rows[0].wife_state;
        human_detail.marry_photo = result.rows[0].photo;

        var query_husband = "select photo from human where id = \"" + human_detail.husband_id + "\"";
        var query_wife = "select photo from human where id = \"" + human_detail.wife_id + "\"";

        // search for wife and husband photo
        mysql.executeQuery(query_husband, function (status, husband_detail) {
          mysql.executeQuery(query_wife, function (status, wife_detail) {
            console.log(husband_detail);
            human_detail.husband_photo = husband_detail.rows[0].photo;
            human_detail.wife_photo = wife_detail.rows[0].photo;
            console.log("successfully query human details!");
            res.render('marry_register', {
              human_detail: human_detail,
              regist_num: req.query.regist_num
            });
          });
        });
      });
    }
    else {
      res.render('marry_register', {
        human_detail: human_detail,
        regist_num: null
      });
    }
  } else {
    res.render('need_login');
  }

});

//post
router.post('/', function (req, res, next) {

  var marry = require('./myhfc/myhfcInvoke');
  var request = {
    chaincodeId: options.chaincode_id,
    fcn: 'marry',
    args: [req.body.regist_num, req.body.flag, req.body.date],
    chainId: options.channel_id
  };
  marry(request, function (str) {
    console.log(str);
    if (str.Reason) {
      res.send(str.Reason);
    }
    else {
      var query_checked = "update marry_check set if_managed = 1, if_ar = 1, if_look = 0 WHERE check_id = \"" + req.body.regist_num + "\"";
      mysql.executeQuery(query_checked, function (status, result) {

      })
    }
  });

});

module.exports = router;
