'use strict';
var express = require('express');
var router = express.Router();
var options = require("./myhfc/org3Config");

/* GET childregister listing. */
router.get('/', function(req, res, next) {
    if (req.session.user){
        var user=req.session.user;
        var name=user.name;
        console.log('----------------------'+name);
        res.render('child_register')

    }else {
        res.send('你还没有登录，先登录下试试！');
    }
    // res.render('child_register');
});

//post
router.post('/',function (req, res, next) {

    //get req.information
    var child_sex = req.body.child_sex;
    var child_date = req.body.child_date;
    var mother_ID = req.body.mother_ID;
    var father_ID = req.body.father_ID;
    var hospital = req.body.hospital;
    var request = {
        chaincodeId: options.chaincode_id,
        fcn: 'createBirth',
        args: [father_ID, mother_ID, child_sex,child_date,hospital],
        chainId: options.channel_id
    };

    console.log(request);
    var creatBirth = require('./myhfc/myhfcInvoke');

    creatBirth(request, function (str) {
        res.send(JSON.parse(str));
    });



});

module.exports = router;
