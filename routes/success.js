var express = require('express');
var router = express.Router();

/* GET success listing. */
router.get('/', function(req, res, next) {
    res.render('success');
});

module.exports = router;
