var express = require('express');
var router = express.Router();

/* GET user page. */
router.get('/user', function (req, res, next) {
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    console.log('----------------------' + name);
    res.render('user', {name: name});

  } else {
    res.render('need_login');
  }
});

module.exports = router;
