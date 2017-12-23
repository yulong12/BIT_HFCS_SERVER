var express = require('express');
var router = express.Router();
var mysql = require('../db/MYSQLconnection');

/* GET user page. */
router.get('/user', function (req, res, next) {
    if (req.session.user) {
        var user = req.session.user;
        var name = user.name;
        var select = "select * from marry_check where if_managed=1 and if_look=1;";
        var select1 = "select * from create_check where if_managed=1 and if_look=1;";
        var select2 = "select * from divorce_check where if_managed=1 and if_look=1;";
        var data={};
        mysql.executeQuery(select, function (status, result) {
            //结婚申请
            if (result.rows[0]) {
                var if_ar = result.rows[0].if_ar;
                var if_look = result.rows[0].if_look;
                //判断结婚申请是否被申请
                if (if_ar === 1 && if_look === 1) {
                    res.render('user', {comment: '您的结婚申请已被审批'});
                    data.marry_check="您的结婚申请已被审批";
                    console.log("-----------none----------------------"+data.marry_check);
                } else if (if_ar == 0 && if_look == 1) {
                    data.marry_check="您的结婚申请已被拒绝";
                   res.render('user', {comment: '您的结婚申请已被拒绝'});
                    console.log("-----------none----------------------"+data.marry_check);
                }

            } else {
                console.log("-----------none----------------------"+data.marry_check);
                 res.render('user', {comment: "none"});
                data.marry_check="您未申请";
                res.render('user',{comment:'您未申请'});
            }
        });
      //  res.render('user',{comment:data.marry_check});

    } else {
        res.render('need_login');
    }
});

module.exports = router;
