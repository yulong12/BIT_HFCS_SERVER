var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

  if (req.session.user) {

    res.render('print_birthcard_new');
  } else {
    res.render('need_login');
  }
});

module.exports = router;