var express = require('express');
var router = express.Router();

/* GET childregister listing. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        console.log('----------------------'+name);
        res.render('child_register')

    }else {
        res.send('你还没有登录，先登录下试试！');
    }
    // res.render('child_register');
});

module.exports = router;
