var express = require('express');
var router = express.Router();
var options = require('./myhfc/org1Config');

/* GET register page. */
router.get('/', function (req, res, next) {
  // res.render('register');
  if (req.session.user) {
    var user = req.session.user;
    var name = user.name;
    res.render('register');
  } else {
    res.render('need_login');
  }
});
router.post('/', function (req, res, next) {
  var parent_id = req.body.parent_id;
  var child_name = req.body.child_name;
  console.log(typeof(parent_id));
  var request = {
    chaincodeId: options.chaincode_id,
    fcn: 'createCheck',
    args: [parent_id, "1", child_name],
    chainId: options.channel_id
  }
  var createHuman = require('./myhfc/myhfcInvoke');

  createHuman(request, function (str) {
        str.审查编号;
        str.父亲姓名;
        str.父亲身份证号;
        str.母亲姓名;
      str.母亲身份证号;
      str.父母结婚证书编号;
      str.出生证书编号;
      str.出生日期;
      str.性别;
      str.接生机构;
      str.判断结果;
    console.log(str);
  });
});

module.exports = router;
