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
                    //   res.render('user', {comment: '您的结婚申请已被审批'});
                    data.marry_check="您的结婚申请已被审批";
                } else if (if_ar == 0 && if_look == 1) {
                    data.marry_check="您的结婚申请已被拒绝";
                    //   res.render('user', {comment: '您的结婚申请已被拒绝'})
                }

            } else {
                console.log("-----------none----------------------");
                //   res.render('user', {comment: "none"});
                data.marry_check="您未申请";

            }
            mysql.executeQuery(select1,function (status1,result2) {
                //户口本申请
                if (result.rows[0]) {
                    var if_ar = result2.rows[0].if_ar;
                    var if_look = result2.rows[0].if_look;
                    //判断户口本申请是否被申请
                    if (if_ar === 1 && if_look === 1) {
                        // res.render('user', {comment2: '您的户口本申请已被审批'});
                        data.hukou="您的户口本申请已被审批";
                    } else if (if_ar == 0 && if_look == 1) {
                        // res.render('user', {comment2: '您的户口本申请已被拒绝'})
                        data.hukou="您的户口本申请已被拒绝";
                    }

                } else {
                    data.hukou="您未申请";

                }
                mysql.executeQuery(select2,function (status2, result1) {

                    //离婚申请
                    if (result.rows[0]) {
                        var if_ar = result1.rows[0].if_ar;
                        var if_look = result1.rows[0].if_look;
                        //判断户口本申请是否被申请
                        if (if_ar === 1 && if_look === 1) {
                            // res.render('user', {comment2: '您的户口本申请已被审批'});
                            data.hukou="您的户口本申请已被审批";
                        } else if (if_ar == 0 && if_look == 1) {
                            // res.render('user', {comment2: '您的户口本申请已被拒绝'})
                            data.hukou="您的户口本申请已被拒绝";
                        }

                    } else {
                        console.log("-----------none----------------------");
                        //   res.render('user', {comment2: "none"});
                        data.hukou="您未申请";

                    }


                });
            });



        });

        res.render('user',{comment:data.marry_check,comment1:data.divorce,comment2:data.hukou});

    } else {
        res.render('need_login');
    }
});

module.exports = router;
