var express = require('express');
var router = express.Router();
var mysql = require('../db/MYSQLconnection');

/* GET user page. */
router.get('/user', function (req, res, next) {
    if (req.session.user) {
        var user = req.session.user;
        var name = user.name;
        var data = {};
        var select = "select * from marry_check where  if_look=0;";
        var select2 = "select * from create_check where if_look=0;";
        mysql.executeQuery(select, function (status, result) {
            mysql.executeQuery(select2, function (status1, result1) {

                if (result1.rows[0]) {
                    var if_ar = result1.rows[0].if_ar;
                    var if_look = result1.rows[0].if_look;
                    var if_manage = result1.rows[0].if_managed;
                    //判断户口是否被审批，以及是否被查看
                    if (if_manage === 1 && if_ar === 1 && if_look === 0) {
                        data.create_check = "户口申请被同意";
                    } else if (if_manage === 1 && if_ar === 0 && if_look === 0) {
                        data.create_check = "户口申请未被同意";
                    } else if (if_manage === 0&&if_ar===0&&if_look===0) {
                        data.create_check = "户口申请正在被处理";

                    }
                } else {
                    data.create_check = "未申请";
                }
                console.log("=======data.create_check======" + data.create_check);
                console.log("==========rend=========" + data.marry_check + data.create_check);
                res.render('user', {comment_marry: data.marry_check, comment_create: data.create_check});

            });
            if (result.rows[0]) {
                var if_ar = result.rows[0].if_ar;
                var if_look = result.rows[0].if_look;
                var if_managed = result.rows[0].if_managed;
                console.log("=======data.if_ar======" + if_ar);
                console.log("=======if_look======" + if_look);
                console.log("=======if_manage======" + if_managed);
                //判断户口是否被审批，以及是否被查看
                if (if_managed == 1 && if_ar == 1 && if_look == 0) {
                    data.marry_check = "结婚申请被同意";
                } else if (if_managed == 1 && if_ar == 0 && if_look == 0) {
                    data.marry_check = "结婚申请未被同意";
                } else if (if_managed == 0&&if_ar==0&&if_look==0) {
                    data.marry_check = "结婚申请正在被处理";
                    console.log("=======data.结婚申请正在被处理======" + data.create_check);
                }
            } else {
                data.marry_check = "未申请";
            }

            console.log("=======data.marry_check======" + data.marry_check);

        });


    }
    else {
        res.render('need_login');
    }
});

module.exports = router;