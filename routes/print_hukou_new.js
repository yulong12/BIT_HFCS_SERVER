var express = require('express');
var router = express.Router();

/* GET policeoffice listing. */
router.get('/', function (req, res, next) {
  // res.render('police_office');
  if (req.session.user) {

    if (req.query.id) {
      var options = require('./myhfc/org1Config');
      var myhfcQuery = require('./myhfc/myhfcQuery');
      var select_id = req.query.id;

      var request;
      request = {
        chaincodeId: options.chaincode_id,
        fcn: 'queryID',
        args: [select_id]
      };

      myhfcQuery(request, function (str) {
        var answer = JSON.parse(str);
        var hukou_detail = {};
        hukou_detail.id = answer.id;
        hukou_detail.sex = answer.sex;
        hukou_detail.name = answer.name;
        hukou_detail.date = answer.date;
        hukou_detail.marrystate = answer.marrystate;
        res.render('print_hukou_new', {
          hukou_detail: hukou_detail
        })
      });
    }
  } else {
    res.render('need_login');
  }
});

module.exports = router;
