var express = require('express');
var router = express.Router();

/* GET success listing. */
router.get('/', function (req, res, next) {
  // res.render('success');
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    res.render('success');
  } else {
    res.render('need_login');
  }
});

module.exports = router;
