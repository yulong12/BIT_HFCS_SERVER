var express = require('express');
var router = express.Router();

/* GET userquery listing. */
router.get('/', function(req, res, next) {
    // res.render('user_query');
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        console.log('----------------------'+name);
        res.render('user_query')

    }else {
        res.send('你还没有登录，先登录下试试！');
    }
});

module.exports = router;
