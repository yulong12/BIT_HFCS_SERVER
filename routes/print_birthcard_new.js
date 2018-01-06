var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {

  if (req.session.user) {
    if (req.query.birth_id) {
      var options = require('./myhfc/org1Config');
      var myhfcQuery = require('./myhfc/myhfcQuery');
      var select_id = req.query.birth_id;

      var request;
      request = {
        chaincodeId: options.chaincode_id,
        fcn: 'queryID',
        args: [select_id]
      };

      myhfcQuery(request, function (str) {
        var answer = JSON.parse(str);
        var birth_detail = {};
        birth_detail.birthname = answer.birthname;
        birth_detail.birthid = answer.birthid;
        birth_detail.date = answer.date;
        birth_detail.sex = answer.sex;
        birth_detail.weight = answer.weight;
        birth_detail.health = answer.health;
        birth_detail.place = answer.place;
        birth_detail.fathername = answer.fathername;
        birth_detail.fatherid = answer.fatherid;
        birth_detail.mothername = answer.mothername;
        birth_detail.motherid = answer.motherid;
        birth_detail.hosptialid = answer.hosptialid;
        res.render('print_birthcard_new', {
          birth_detail: birth_detail
        })
      });
    }
  } else {
    res.render('need_login');
  }
});

module.exports = router;