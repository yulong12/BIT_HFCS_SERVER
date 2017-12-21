var express = require('express');
var router = express.Router();

/* GET marryquery listing. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.render('information_modification');
    }else {
        res.send('还未登录，请先登录下试试');
    }
});

module.exports = router;
