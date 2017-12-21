var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('search');
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    res.render('search');
  } else {
    res.render('need_login');
  }
});

module.exports = router;
