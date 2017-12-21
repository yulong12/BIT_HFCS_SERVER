var express = require('express');
var router = express.Router();
var mysql = require("../db/MYSQLconnection");

/* GET civilaffairs listing. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    var query0 = "select check_id from marry_check where if_managed = 0";
    var query1 = "select check_id from marry_check where if_managed = 1";
    var unfinished_list = [];
    var finished_list = [];
    mysql.executeQuery(query0, function (status, result) {
      result.rows.forEach(function (regist_detail) {
        unfinished_list.push(regist_detail.check_id);
      });
      console.log(unfinished_list);
      mysql.executeQuery(query1, function (status, result) {
        result.rows.forEach(function (regist_detail) {
          finished_list.push(regist_detail.check_id);
        });
        console.log(finished_list);
        res.render('civil_affairs', {
          unfinished_list: unfinished_list,
          finished_list: finished_list
        });
      });

    });

  } else {
    res.render('need_login');
  }
});

module.exports = router;
