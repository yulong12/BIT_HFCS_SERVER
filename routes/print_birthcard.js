var express = require('express');
var router = express.Router();

/* GET policeoffice listing. */
router.get('/', function(req, res, next) {
    // res.render('police_office');
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.render('print_birthcard');
    }else {
        res.send('还未登录，请先登录下试试');
    }
});

module.exports = router;