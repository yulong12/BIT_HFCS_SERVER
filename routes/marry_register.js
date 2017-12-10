
var express = require('express');
var router = express.Router();

/* GET marryregister listing. */
router.get('/', function(req, res, next) {
    // res.render('marry_register');
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.render('marry_register');
    }else {
        res.send('还未登录，请先登录下试试');
    }

});

module.exports = router;
