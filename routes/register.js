var express = require('express');
var router = express.Router();

/* GET login listing. */
router.get('/', function(req, res, next) {
    res.render('register');
});

module.exports = router;
