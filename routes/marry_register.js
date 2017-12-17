
var express = require('express');
var options = require("./myhfc/org2Config");
var router = express.Router();

/* GET marryregister listing. */
router.get('/', function(req, res, next) {
    // res.render('marry_register');
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        res.render('marry_register');
    }else {
        res.send('还未登录，请先登录下试试');
    }

});

//post
router.post('/',function (req, res, next) {

    var husband_id = req.body.husband_id;
    var wife_id = req.body.wife_id;
    var date = req.body.date;

    var request = {
        chaincodeId: options.chaincode_id,
        fcn: 'marry',
        args: [husband_id, wife_id, date],
        chainId: options.channel_id
    };

    var marry = require('./myhfc/myhfcInvoke');

    marry(request, function (str) {
        res.send(JSON.parse(str));
    });


});

module.exports = router;
