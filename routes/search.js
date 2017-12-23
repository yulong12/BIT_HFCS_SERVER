var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('search');
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    res.render('search');
  } else {
    res.render('need_login');
  }
});
router.post('/', function (req, res, next) {

    var options = require('./myhfc/org1Config');
    var num=req.body.num;

    var request;
    request = {
        chaincodeId: options.chaincode_id,
        fcn: 'queryID',
        args: [num]
    };

    var myhfcQuery = require('./myhfc/myhfcQuery');


    myhfcQuery(request, function (str) {
        res.send(JSON.parse(str));
    });


});
module.exports = router;
