var express = require('express');
var router = express.Router();

/* GET policeoffice listing. */
router.get('/', function (req, res, next) {
  // res.render('police_office');
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    res.render('print_hukou');
  } else {
    res.render('need_login');
  }
});

module.exports = router;