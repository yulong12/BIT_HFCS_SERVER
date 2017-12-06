var express = require('express');
var router = express.Router();

/* GET marryquery listing. */
router.get('/', function(req, res, next) {
    res.render('marry_query');
});

module.exports = router;
