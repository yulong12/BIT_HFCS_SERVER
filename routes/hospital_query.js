var express = require('express');
var router = express.Router();

/* GET hospital listing. */
router.get('/', function (req, res, next) {
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    res.render('hospital_query');
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
    res.send(JSON.parse(str));
  });


});

module.exports = router;