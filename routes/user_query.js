var express = require('express');
var router = express.Router();

/* GET userquery listing. */
router.get('/', function(req, res, next) {
    res.render('user_query');
});

module.exports = router;
