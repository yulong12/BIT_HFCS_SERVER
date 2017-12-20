var express = require('express');
var router = express.Router();

/* GET hospital listing. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.render('social_securityAdministration');
    }else {
        res.send('还未登录，请先登录下试试');
    }
    // res.render('hospital');
});

module.exports = router;
