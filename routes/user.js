var express = require('express');
var router = express.Router();
var mysql = require('../db/MYSQLconnection');

/* GET user page. */
router.get('/user', function (req, res, next) {
  if (req.session.user) {
    var data = {};
    var query_marry = "select check_id,if_ar,if_managed from marry_check where if_look=0;";
    var query_hukou = "select check_id,if_ar,if_managed from create_check where if_look=0;";
    mysql.executeQuery(query_marry, function (status, result_marry) {
      mysql.executeQuery(query_hukou, function (status1, result_residence) {

        // check residence requirement status
        var resi_last = result_residence.rows.length - 1;
        if (result_residence.rows[resi_last]) {
          var if_ar_resi = result_residence.rows[resi_last].if_ar;
          var if_managed_resi = result_residence.rows[resi_last].if_managed;
          //判断户口是否被审批，以及是否被查看
          if (if_managed_resi === 1 && if_ar_resi === 1) {
            data.create_check = "户口申请被同意";
          } else if (if_managed_resi === 1 && if_ar_resi === 0) {
            data.create_check = "户口申请未被同意";
          } else if (if_managed_resi === 0 && if_ar_resi === 0) {
            data.create_check = "户口申请正在被处理";
          }
          data.resi_app_id = result_residence.rows[resi_last].check_id;
        } else {
          data.create_check = "";
          data.resi_app_id = "";
        }

        // check marry requirement status
        var marry_last = result_marry.rows.length - 1;
        if (result_marry.rows[marry_last]) {
          var if_ar_marry = result_marry.rows[marry_last].if_ar;
          var if_managed_marry = result_marry.rows[marry_last].if_managed;
          //判断户口是否被审批，以及是否被查看
          if (if_managed_marry === 1 && if_ar_marry === 1) {
            data.marry_check = "结婚申请被同意";
          } else if (if_managed_marry === 1 && if_ar_marry === 0) {
            data.marry_check = "结婚申请未被同意";
          } else if (if_managed_marry === 0 && if_ar_marry === 0) {
            data.marry_check = "结婚申请正在被处理";
          }
          data.marry_app_id = result_marry.rows[marry_last].check_id;
        } else {
          data.marry_check = "";
          data.marry_app_id = "";
        }

        console.log("=======data.marry_check======" + data.marry_check);
        console.log("=======data.create_check======" + data.create_check);
        console.log("==========rend=========" + data.marry_check + data.create_check);

        res.render('user', {
          comment_marry: data.marry_check,
          marry_app_id: data.marry_app_id,
          comment_create: data.create_check,
          resi_app_id: data.resi_app_id
        });

      });
    });
  }
  else {
    res.render('need_login');
  }
});

module.exports = router;