var express = require('express');
var router = express.Router();

/* GET user page. */
router.get('/user', function(req, res, next) {
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        console.log('----------------------'+name);
        res.render('user',{name:name});

    }else {
        res.send('你还没有登录，先登录下试试！');
    }
    // res.render('user');
});

module.exports = router;
