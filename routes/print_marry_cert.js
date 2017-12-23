var express = require('express');
var router = express.Router();

/* GET policeoffice listing. */
router.get('/', function (req, res, next) {
  // res.render('police_office');
  if (req.session.user) {

    res.render('print_marry_cert');
  } else {
    res.render('need_login');
  }
});

module.exports = router;