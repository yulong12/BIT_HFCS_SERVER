var express = require('express');
var router = express.Router();
var mysql = require('../db/MYSQLconnection');

/* GET user page. */
router.get('/user', function (req, res, next) {
    if (req.session.user) {
        var user = req.session.user;
        var name = user.name;
        var select = "select * from marry_check where if_managed=1 and if_look=1;";
        mysql.executeQuery(select, function (status, result) {
            if (result.rows[0]) {
                var if_managed = result.rows[0].if_managed;
                var if_look = result.rows[0].if_look;
                if (if_managed === 1 && if_look === 1) {
                    res.render('user', {comment: '您的结婚申请已被审批'});
                }else {

                }
            } else {
                res.render('user', {comment: 'none'});
            }
        });


    } else {
        res.render('need_login');
    }
});

module.exports = router;
