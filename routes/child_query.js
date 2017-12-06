var express = require('express');
var router = express.Router();

/* GET childquery listing. */
router.get('/', function(req, res, next) {
    res.render('child_query');
});

module.exports = router;
