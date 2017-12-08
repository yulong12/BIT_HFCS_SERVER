var express = require('express');
var router = express.Router();

/* GET policeoffice listing. */
router.get('/', function(req, res, next) {
    res.render('police_office');
});

module.exports = router;