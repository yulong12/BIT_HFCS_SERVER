var express = require('express');
var router = express.Router();

/* GET hospital listing. */
router.get('/', function(req, res, next) {
    res.render('hospital');
});

module.exports = router;
