var express = require('express');
var router = express.Router();
var mysql = require('../db/MYSQLconnection');

/* GET user page. */
router.get('/user', function (req, res, next) {
    if (req.session.user) {
        var user = req.session.user;
        var name = user.name;
        var data = {};
        var select = "select * from marry_check where if_managed=1 and if_look=1;";
        var select2 = "select * from create_check where if_managed=1 and if_look=1;";
        var update="update marry_check set if_look=0;"
        var update1="update create_check set if_look=0;"
        mysql.executeQuery(select, function (status, result) {
            mysql.executeQuery(select2, function (status1, result1) {
                //执行更新语句，表明已经用户已经查看
                mysql.executeQuery(update,function (status2,result2) {
                    mysql.executeQuery(update1,function (status3,result3) {

                    });
                });
                if (result1.rows[0]) {
                    var if_ar = result1.rows[0].if_ar;
                    var if_look = result1.rows[0].if_look;
                    //判断户口是否被审批，以及是否被查看
                    if (if_ar == 1 && if_look == 1) {
                        data.create_check = "户口申请被审批";
                    } else if(if_ar==0){
                        data.create_check = "户口申请未被审批";
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
                if (if_ar == 1 && if_look == 1) {
                    data.marry_check = "结婚申请被审批";
                } else {
                    data.marry_check = "结婚申请未被审批";
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