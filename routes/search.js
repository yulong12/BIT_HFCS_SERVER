var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('search');
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.render('search');
    }else {
        res.send('还未登录，请先登录下试试');
    }
});

module.exports = router;
