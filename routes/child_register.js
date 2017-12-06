var express = require('express');
var router = express.Router();

/* GET childregister listing. */
router.get('/', function(req, res, next) {
    res.render('child_register');
});

module.exports = router;
