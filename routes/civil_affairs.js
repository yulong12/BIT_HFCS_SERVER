
var express = require('express');
var router = express.Router();

/* GET civilaffairs listing. */
router.get('/', function(req, res, next) {
    res.render('civil_affairs');
});

module.exports = router;
