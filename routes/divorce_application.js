var express = require('express');
var router = express.Router();

/* GET divorce_application listing. */
router.get('/', function(req, res, next) {
    // res.render('marry_query');
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.render('divorce_application');
    }else {
        res.send('还未登录，请先登录下试试');
    }
});

module.exports = router;
