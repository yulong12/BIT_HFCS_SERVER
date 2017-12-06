
var express = require('express');
var router = express.Router();

/* GET marryregister listing. */
router.get('/', function(req, res, next) {
    res.render('marry_register');
});

module.exports = router;
