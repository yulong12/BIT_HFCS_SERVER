var express = require('express');
var router = express.Router();

/* GET userquery listing. */
router.get('/', function (req, res, next) {
  // res.render('user_query');
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    console.log('----------------------' + name);
    res.render('user_query')
  } else {
    res.render('need_login');
  }
});

router.post('/', function (req, res, next) {

  var options = require('./myhfc/org1Config');
  var select_id = req.body.select_id;

  var request;
  request = {
    chaincodeId: options.chaincode_id,
    fcn: 'queryID',
    args: [select_id]
  };

  var myhfcQuery = require('./myhfc/myhfcQuery');


  myhfcQuery(request, function (str) {
    res.send(str);
  });


});

module.exports = router;
