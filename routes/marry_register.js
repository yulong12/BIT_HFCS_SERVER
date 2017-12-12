
var express = require('express');
var options = require("./myhfc/config");
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

    //get req.information
    var husband_id = req.body.husband_id;
    var wife_id = req.body.wife_id;
    var date = req.body.date;
    console.log("-----------get info------------");
    var request = {
        chaincodeId: options.chaincode_id,
        fcn: 'marry',
        args: [husband_id, wife_id, date],
        chainId: options.channel_id
    };
    console.log("------------set req ------------");
    var marry = require('./myhfc/myhfcInvoke');
    console.log("--------require marry-----------");
    marry(request);
    res.send("ok");



});

module.exports = router;
